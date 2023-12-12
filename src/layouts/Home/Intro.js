import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import RouterLink from "next/link";
import { Fragment, useEffect, useState } from "react";

import { useInterval, usePrevious, useScrollToHash } from "hooks";
import { cssProps } from "utils/style";

import ArrowDown from "assets/arrow-down.svg";

import styles from "./_Intro.module.scss";

const DisplacementSphere = dynamic(() =>
  import("layouts/Home/DisplacementSphere").then(mod => mod.DisplacementSphere)
);

export function Intro() {
  return <DisplacementSphere />;
}
