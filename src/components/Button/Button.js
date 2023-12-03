import { forwardRef } from "react";
import RouterLink from "next/link";
import Link from "next/link";

import { classes } from "utils/style";

import { Icon } from "components/Icon";
import { Transition } from "components/Transition";
import { Loader } from "components/Loader";

import styles from "./_Button.module.scss";

function isExternalLink(href) {
  return href?.includes("://");
}

export const Button = forwardRef(({ href, ...rest }, ref) => {
  if (isExternalLink(href) || !href) {
    return <ButtonContent href={href} ref={ref} {...rest} />;
  }

  return (
    <RouterLink passHref href={href} scroll={false}>
      <ButtonContent href={href} ref={ref} {...rest} />
    </RouterLink>
  );
});

const ButtonContent = forwardRef(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = "loading",
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isExternal = isExternalLink(href);
    const defaultComponent = href ? Link : "button";
    const Component = as || defaultComponent;

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-icon={icon}
        href={href}
        rel={rel || isExternal ? "noopener noreferrer" : undefined}
        target={target || isExternal ? "_blank" : undefined}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className="icon"
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className="text">{children}</span>}
        {!!iconEnd && (
          <Icon
            className="icon"
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        <Transition unmount in={loading}>
          {visible => (
            <Loader
              className="loader"
              size={32}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    );
  }
);
