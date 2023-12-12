import { forwardRef } from "react";
import styles from "./_Section.module.scss";
import { classes } from "utils/style";

export const Section = forwardRef(
  ({ as: Component = "div", children, className, ...rest }, ref) => (
    <Component
      className={classes(styles.section, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  )
);
