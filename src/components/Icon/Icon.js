import { classes } from "utils/style";

import ArrowLeft from "./svg/arrow-left.svg";
import ArrowRight from "./svg/arrow-right.svg";
import Check from "./svg/check.svg";
import ChevronRight from "./svg/chevron-right.svg";
import Close from "./svg/close.svg";
import Copy from "./svg/copy.svg";
import Error from "./svg/error.svg";
import Github from "./svg/github.svg";
import Link from "./svg/link.svg";
import Menu from "./svg/menu.svg";
import Pause from "./svg/pause.svg";
import Play from "./svg/play.svg";
import Send from "./svg/send.svg";
import LinkedIn from "./svg/linkedin.svg";
import CV from "./svg/cv.svg";

import styles from "./_Icon.module.scss";

export const icons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  check: Check,
  chevronRight: ChevronRight,
  close: Close,
  copy: Copy,
  error: Error,
  github: Github,
  link: Link,
  menu: Menu,
  pause: Pause,
  play: Play,
  send: Send,
  linkedIn: LinkedIn,
  cv: CV,
};

export const Icon = ({ icon, className, ...rest }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent
      aria-hidden
      className={classes(styles.icon, className)}
      {...rest}
    />
  );
};
