import { classes, cssProps, numToMs } from "utils/style";

import styles from "./_Divider.module.scss";

export const Divider = ({
  lineWidth,
  lineHeight,
  notchWidth,
  notchHeight,
  collapseDelay,
  collapsed,
  className,
  style,
  ...rest
}) => (
  <div
    className={classes(styles.divider, className)}
    style={cssProps(
      {
        lineHeight: lineHeight,
        lineWidth: lineWidth,
        notchWidth: notchWidth,
        notchHeight: notchHeight,
        collapseDelay: numToMs(collapseDelay),
      },
      style
    )}
    {...rest}
  >
    <div className={styles.line} data-collapsed={collapsed} />
    <div
      className={styles.notch}
      data-collapsed={collapsed}
      style={cssProps({
        collapseDelay: numToMs(collapseDelay + 160),
      })}
    />
  </div>
);

Divider.defaultProps = {
  lineWidth: "100%",
  lineHeight: "2px",
  notchWidth: "90px",
  notchHeight: "10px",
  collapsed: false,
  collapseDelay: 0,
};
