import Link from "next/link";
import { forwardRef } from "react";

import { classes } from "utils/style";

import styles from "./_LinkPersonal.module.scss";

const VALID_EXT = ["txt", "png", "jpg"];

function isAnchor(href) {
  const isValidExtension = VALID_EXT.includes(href?.split(".").pop());
  return href?.includes("://") || href?.[0] === "#" || isValidExtension;
}

export const LinkPersonal = forwardRef(({ href, ...rest }, ref) => {
  if (isAnchor(href)) {
    return <LinkContent href={href} ref={ref} {...rest} />;
  }

  return (
    <Link passHref href={href} scroll={false}>
      <LinkContent ref={ref} {...rest} />
    </Link>
  );
});

export const LinkContent = forwardRef(
  ({ rel, target, children, secondary, className, href, ...rest }, ref) => {
    const isExternal = href?.includes("://");
    const relValue = rel || (isExternal ? "noreferrer noopener" : undefined);
    const targetValue = target || (isExternal ? "_blank" : undefined);

    return (
      <a
        className={classes(styles.link, className)}
        data-secondary={secondary}
        rel={relValue}
        href={href}
        target={targetValue}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
