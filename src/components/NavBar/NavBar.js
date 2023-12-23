import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { tokens, useTheme } from "components/ThemeProvider";
import { Icon } from "components/Icon";
import { Transition } from "components/Transition";
import { Monogram } from "components/Monogram";
import { TranslationPanel } from "components/TranslationPanel";

import { useAppContext, useScrollToHash, useWindowSize } from "hooks";
import { cssProps, media, msToNum, numToMs } from "utils/style";

import { NavToggle } from "./NavToggle";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks, socialLinks } from "./navData";

import styles from "./_NavBar.module.scss";

export const NavBar = () => {
  const [current, setCurrent] = useState();
  const [target, setTarget] = useState();

  const { themeId } = useTheme();
  const { menuOpen, dispatch } = useAppContext();
  const { route, asPath } = useRouter();

  const headerRef = useRef();
  const windowSize = useWindowSize();
  const scrollToHash = useScrollToHash();

  const { t } = useTranslation();

  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;

  useEffect(() => {
    setCurrent(asPath);
  }, [asPath]);

  useEffect(() => {
    if (!target || route !== "/") return;
    setCurrent(`${route}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [route, scrollToHash, target]);

  useEffect(() => {
    const navItems = document.querySelectorAll("[data-navbar-item");
    const inverseTheme = themeId === "dark" ? "light" : "dark";
    const { innerHeight } = window;

    let inverseMeasurements = [];
    let navItemMeasurements = [];

    const isOverlap = (rect1, rect2, scrollY) => {
      return !(
        rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom
      );
    };

    const resetNavTheme = () => {
      for (const measurement of navItemMeasurements) {
        measurement.element.dataset.theme = "";
      }
    };

    const handleInversion = () => {
      const invertedElements = document.querySelectorAll(
        `[data-theme="${inverseTheme}"][data-invert]`
      );

      if (!invertedElements) return;

      inverseMeasurements = Array.from(invertedElements).map(item => ({
        element: item,
        top: item.offsetTop,
        bottom: item.offsetTop + item.offsetHeight,
      }));

      const { scrollY } = window;

      resetNavTheme();

      for (const inverseMeasurement of inverseMeasurements) {
        if (
          inverseMeasurement.top - scrollY > innerHeight ||
          inverseMeasurement.bottom - scrollY < 0
        ) {
          continue;
        }

        for (const measurement of navItemMeasurements) {
          if (isOverlap(inverseMeasurement, measurement, scrollY)) {
            measurement.element.dataset.theme = inverseTheme;
          } else {
            measurement.element.dataset.theme = "";
          }
        }
      }
    };

    if (themeId === "light") {
      navItemMeasurements = Array.from(navItems).map(item => {
        const rect = item.getBoundingClientRect();

        return {
          element: item,
          top: rect.top,
          bottom: rect.bottom,
        };
      });

      document.addEventListener("scroll", handleInversion);
      handleInversion();
    }

    return () => {
      document.removeEventListener("scroll", handleInversion);
      resetNavTheme();
    };
  }, [themeId, windowSize, asPath]);

  const getCurrent = (url = "") => {
    const nonTrailing = current?.endsWith("/")
      ? current?.slice(0, -1)
      : current;

    if (url === nonTrailing) {
      return "page";
    }

    return "";
  };

  const handleNavItemClick = e => {
    const hash = e.currentTarget.href.split("#")[1];
    setTarget(null);

    if (hash && route === "/") {
      setTarget(`#${hash}`);
      e.preventDefault();
    }
  };

  const handleMobileNavClick = e => {
    handleNavItemClick(e);
    if (menuOpen) dispatch({ type: "toggleMenu" });
  };

  return (
    <header className={styles.navbar} ref={headerRef}>
      <div className={styles.logoWrapper}>
        <Link
          href={route === "/" ? "/#intro" : "/"}
          scroll={false}
          data-navbar-item
          className={styles.logo}
          aria-label="Andrii Nepomniashchyi, Frontend Developer"
          onClick={handleMobileNavClick}
        >
          <Monogram highlight={true.toString()} />
        </Link>
        <TranslationPanel />
      </div>
      <NavToggle
        onClick={() =>
          dispatch({
            type: "toggleMenu",
          })
        }
        menuOpen={menuOpen}
      />
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname }) => (
            <Link
              href={pathname}
              scroll={false}
              key={label}
              data-navbar-item
              className={styles.navLink}
              aria-current={getCurrent(pathname)}
              onClick={handleNavItemClick}
            >
              {t(label)}
            </Link>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>

      <Transition
        unmount
        in={menuOpen}
        timeout={msToNum(tokens.base.durationL)}
      >
        {visible => (
          <nav className={styles.mobileNav} data-visible={visible}>
            {navLinks.map(({ label, pathname }, index) => (
              <Link
                href={pathname}
                scroll={false}
                key={label}
                className={styles.mobileNavLink}
                data-visible={visible}
                aria-current={getCurrent(pathname)}
                onClick={handleMobileNavClick}
                style={cssProps({
                  transitionDelay: numToMs(
                    Number(msToNum(tokens.base.durationS)) + index * 50
                  ),
                })}
              >
                {label}
              </Link>
            ))}
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>
      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  );
};

const NavbarIcons = ({ desktop }) => (
  <div className={styles.navIcons}>
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        data-navbar-item={desktop || undefined}
        className={styles.navIconLink}
        aria-label={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} icon={icon} />
      </a>
    ))}
  </div>
);
