import { useEffect, useRef, useState } from "react";

import styles from "./_Home.module.scss";
import { Intro } from "./Intro";

const disciplines = ["React", "Next.js", "Vite"];

export const Home = () => {
  const [visibleSections, setVisibleSection] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const datails = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, datails];

    const sectionObserver = new IntersectionObserver(
      (enteries, observer) => {
        enteries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSection(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: "-100% 0px 0px 0px" }
    );

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    if (intro.current) {
      indicatorObserver.observe(intro.current);
    }

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
    </div>
  );
};
