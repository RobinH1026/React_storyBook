import React, { FC, forwardRef } from "react";
import { List, ListProps, ListSubheader } from "@mui/material";

import { RouteConfig } from "react-router-config";
import { NavLink, NavLinkProps } from "react-router-dom";
import NestedListItem, {
  NestedItems,
  NestedListItemProps,
} from "@eGroupAI/material/NestedListItem";

export interface EgRouteConfig extends RouteConfig {
  /**
   * If breadcrumbName defined it'll display in Breadcrumbs.
   */
  breadcrumbName?: string;
}

export interface NestedSideMenuProps extends ListProps {
  /**
   * react router config routes.
   */
  routes: EgRouteConfig[];
  /**
   * current pathname
   */
  pathname: string;
  /**
   * `NestedListItem` props.
   */
  NestedListItemProps?: NestedListItemProps;
  /**
   * `NestedListItem` items props.
   */
  NestedListItemItemsProps?: NestedItems;
}

const NavLinkWrapper = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => <NavLink innerRef={ref} {...props} />
);

const NestedSideMenu: FC<NestedSideMenuProps> = (props) => {
  const {
    classes,
    className,
    pathname,
    routes,
    NestedListItemProps,
    NestedListItemItemsProps,
    style,
    ...other
  } = props;
  const {
    MuiListItemProps,
    MuiListItemTextProps,
    ...otherNestedListItemProps
  } = NestedListItemProps || {};
  return (
    <List style={{ width: 240, ...style }} {...other}>
      {routes.map((route) => {
        if (route.routes && route.routes.length > 0) {
          let items = route.routes.filter((el) => Boolean(el.breadcrumbName));

          // If routes do not exist any breadcrumbName means it doesn't need openable NestedListItem.
          // Therefore we can simply return a `NestedListItem` wrapped by `Link`.
          if (items.length === 0) {
            return (
              <NestedListItem
                key={route.key ?? (route.path as string)}
                icon={route.icon}
                MuiListItemProps={{
                  button: true,
                  selected: route.path === pathname,
                  // TODO: Need fixed ts-ignore
                  // @ts-ignore
                  to: route.path,
                  component: NavLinkWrapper,
                  ...MuiListItemProps,
                }}
                MuiListItemTextProps={{
                  primary: route.breadcrumbName,
                  ...MuiListItemTextProps,
                }}
                {...otherNestedListItemProps}
              />
            );
          }

          const {
            MuiListItemProps: NestedMuiListItemProps,
            MuiListItemTextProps: NestedMuiListItemTextProps,
            ...otherNestedListItemItemsProps
          } = NestedListItemItemsProps || {};
          let defaultIsOpen = false;
          items = items.map((el) => {
            const selected = el.path === pathname;
            if (selected) {
              defaultIsOpen = true;
            }
            return {
              key: el.key ?? (el.path as string),
              icon: el.icon,
              path: el.path,
              MuiListItemProps: {
                button: true,
                selected,
                to: el.path,
                component: NavLinkWrapper,
                ...NestedMuiListItemProps,
              },
              MuiListItemTextProps: {
                primary: el.breadcrumbName,
                ...NestedMuiListItemTextProps,
              },
              ...otherNestedListItemItemsProps,
            };
          });
          return (
            <NestedListItem
              key={route.key ?? (route.path as string)}
              icon={route.icon}
              MuiListItemProps={{
                button: true,
                ...MuiListItemProps,
              }}
              MuiListItemTextProps={{
                primary: route.breadcrumbName,
                ...MuiListItemTextProps,
              }}
              items={items}
              defaultIsOpen={defaultIsOpen}
              {...otherNestedListItemProps}
            />
          );
        }

        if (route.breadcrumbName) {
          return (
            <NestedListItem
              key={route.key ?? (route.path as string)}
              icon={route.icon}
              MuiListItemProps={{
                button: true,
                selected: route.path === pathname,
                // TODO: Need fixed ts-ignore
                // @ts-ignore
                to: route.path,
                component: NavLinkWrapper,
                ...MuiListItemProps,
              }}
              MuiListItemTextProps={{
                primary: route.breadcrumbName,
                ...MuiListItemTextProps,
              }}
              {...otherNestedListItemProps}
            />
          );
        }

        if (route.subheader) {
          return (
            <ListSubheader key={route.key}>{route.subheader}</ListSubheader>
          );
        }

        return null;
      })}
    </List>
  );
};

export default NestedSideMenu;
