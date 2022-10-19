import React, { forwardRef, Key, ReactNode } from "react";

import {
  List,
  ListItem,
  ListItemProps,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemIconProps,
  ListItemTextProps,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

type MuiListItemProps = ListItemProps & ListItemButtonProps;
export interface CusListItemProps extends MuiListItemProps {
  button?: boolean;
}

export type NestedItems = {
  key?: Key;
  icon?: ReactNode;
  MuiListItemProps?: CusListItemProps;
  MuiListItemTextProps?: ListItemTextProps;
};

export interface NestedListItemProps {
  /**
   * Mui `ListItem` Props
   */
  MuiListItemProps?: CusListItemProps;
  /**
   * Mui `ListItemText` props
   */
  MuiListItemTextProps?: ListItemTextProps;
  /**
   * Mui `ListItemIcon` props
   */
  MuiListItemIconProps?: ListItemIconProps;
  /**
   * Set icon before text.
   */
  icon?: ReactNode;
  /**
   * If has items will auto generate nested list.
   */
  items?: NestedItems[];
  /**
   * Set default `isOpen` state.
   */
  defaultIsOpen?: boolean;
}

const NestedListItem = forwardRef<any, NestedListItemProps>((props, ref) => {
  const {
    icon: iconProp,
    items,
    defaultIsOpen = false,
    MuiListItemProps,
    MuiListItemIconProps,
    MuiListItemTextProps,
  } = props;
  const { onClick, button, ...otherMuiListItemProps } = MuiListItemProps || {};
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  const classes = useStyles(props);
  const hasItems = items && items.length > 0;

  const handleClick = (e) => {
    if (!hasItems && onClick) {
      onClick(e);
    }
    if (hasItems) {
      setIsOpen((value) => !value);
    }
  };

  const renderIcon = (icon) => {
    if (icon) {
      return <ListItemIcon {...MuiListItemIconProps}>{icon}</ListItemIcon>;
    }
    return undefined;
  };

  const renderExpendIcon = () => {
    if (hasItems) {
      return isOpen ? <ExpandLess /> : <ExpandMore />;
    }
    return undefined;
  };

  const renderCollapse = () => {
    if (hasItems) {
      return (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List disablePadding>
            {items &&
              items.map((item: NestedItems) => {
                const { key, icon, MuiListItemTextProps, MuiListItemProps } =
                  item;
                // Pending issue waiting for solved.
                // https://github.com/mui-org/material-ui/issues/14971
                const { button, ...otherMuiListItemProps } =
                  MuiListItemProps || {};
                const itemProps = {
                  key,
                  className: clsx(MuiListItemProps?.className, classes.nested),
                  ...otherMuiListItemProps,
                };
                if (button) {
                  return (
                    <ListItemButton {...itemProps}>
                      {renderIcon(icon)}
                      <ListItemText {...MuiListItemTextProps} />
                    </ListItemButton>
                  );
                }
                return (
                  <ListItem {...itemProps}>
                    {renderIcon(icon)}
                    <ListItemText {...MuiListItemTextProps} />
                  </ListItem>
                );
              })}
          </List>
        </Collapse>
      );
    }
    return undefined;
  };

  const itemProps = {
    ref,
    onClick: handleClick,
    ...otherMuiListItemProps,
  };

  if (button) {
    return (
      <>
        <ListItemButton {...itemProps}>
          {renderIcon(iconProp)}
          <ListItemText {...MuiListItemTextProps} />
          {renderExpendIcon()}
        </ListItemButton>
        {renderCollapse()}
      </>
    );
  }
  return (
    <>
      <ListItem {...itemProps}>
        {renderIcon(iconProp)}
        <ListItemText {...MuiListItemTextProps} />
        {renderExpendIcon()}
      </ListItem>
      {renderCollapse()}
    </>
  );
});

export default NestedListItem;
