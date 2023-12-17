import { useEffect, useRef, useState } from "react";

import { Intro } from "./Intro";
import { ProjectSummary } from "./ProjectSummary";
import { Profile } from "./Profile";

import languageCoach from "assets/language-coach.jpg";
import cinemania from "assets/cinemania.jpg";

import styles from "./_Home.module.scss";

const disciplines = ["React", "Next.js", "Vite"];

export const Home = () => {
  const [visibleSections, setVisibleSection] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, details];

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
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Commercial projects"
        description="Projects that were created for business"
        buttonText="View project"
        buttonLink="/projects/commercial"
        model={{
          type: "laptop",
          alt: "Commercial projects",
          textures: [
            {
              srcSet: [languageCoach],
              placeholder: languageCoach,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Mobile application"
        disciplines="Mobile application in React Native"
        buttonText="View projects"
        buttonLink="/projects/mobile"
        model={{
          type: "phone",
          alt: "Mobile App",
          textures: [
            {
              srcSet: [languageCoach],
              placeholder: languageCoach,
            },
            {
              srcSet: [languageCoach],
              placeholder: languageCoach,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
    </div>
  );
};
