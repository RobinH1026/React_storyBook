import React, {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";

import {
  PopoverProps,
  IconButton,
  Popover,
  InputAdornment,
} from "@mui/material";

import TextField, { TextFieldProps } from "@eGroupAI/material/TextField";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchBarBaseProps {
  /**
   * Popover container.
   */
  container?: PopoverProps["container"];
  /**
   * A function called when search button is clicked.
   */
  onSearchClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * To customized search options.
   */
  renderOptions?: ({ handleDropDownOpen, handleDropDownClose }) => ReactNode;
}

export type SearchBarProps = SearchBarBaseProps & TextFieldProps;

const SearchBar: FC<SearchBarProps> = ({
  container,
  onSearchClick,
  renderOptions,
  variant,
  ...others
}) => {
  const [open, setOpen] = useState(false);
  const rootEl = useRef(null);

  const handleDropDownOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDropDownClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <TextField
        variant={variant}
        {...others}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" onClick={onSearchClick} size="large">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {renderOptions && (
        <>
          <>
            <IconButton onClick={handleDropDownOpen} size="large">
              <FilterListIcon />
            </IconButton>
          </>
          <Popover
            open={open}
            container={container}
            anchorEl={rootEl.current}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handleDropDownClose}
          >
            {renderOptions({ handleDropDownOpen, handleDropDownClose })}
          </Popover>
        </>
      )}
    </>
  );
};

export default SearchBar;
