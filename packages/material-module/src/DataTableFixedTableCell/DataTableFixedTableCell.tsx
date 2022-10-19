import React, {
  FC,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";

import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

import TableCell, { TableCellProps } from "@mui/material/TableCell";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#fafafa",
  },
}));

export interface DataTableFixedTableCellProps extends TableCellProps {
  direction: "left" | "right";
  zIndex?: number;
}

const DataTableFixedTableCell: FC<DataTableFixedTableCellProps> = (props) => {
  const { className, direction, style, zIndex = 3, ...other } = props;
  const classes = useStyles(props);
  const targetRef = useRef<HTMLTableCellElement>(null);
  const [position, setPosition] = useState({ left: 0, right: 0 });
  const [layoutReady, setLayoutReady] = useState(false);

  useLayoutEffect(() => {
    const handleLayoutDone = () => {
      setLayoutReady(false);
      if (targetRef.current && !layoutReady) {
        const left = targetRef.current.offsetLeft;
        const elWidth = targetRef.current.scrollWidth;
        const containerWidth = (targetRef.current.parentElement as HTMLElement)
          .scrollWidth;
        setPosition({
          left,
          right: containerWidth - left - elWidth,
        });
        setLayoutReady(true);
      }
    };
    handleLayoutDone();
    window.addEventListener("resize", handleLayoutDone);
    return () => {
      window.removeEventListener("resize", handleLayoutDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStyle = useCallback(() => {
    let reslut = {};

    if (layoutReady) {
      reslut = {
        ...style,
        position: "sticky",
        left: direction === "left" ? position.left : undefined,
        right: direction === "right" ? position.right : undefined,
        zIndex,
      };
    }

    return reslut;
  }, [direction, layoutReady, position.left, position.right, style, zIndex]);

  return (
    <TableCell
      ref={targetRef}
      className={clsx(className, classes.root)}
      style={getStyle()}
      {...other}
    />
  );
};

export default DataTableFixedTableCell;
