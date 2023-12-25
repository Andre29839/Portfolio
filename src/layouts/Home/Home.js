import { useEffect, useRef, useState } from "react";

import { Intro } from "./Intro";
import { ProjectSummary } from "./ProjectSummary";
import { Profile } from "./Profile";

import { Footer } from "components/Footer";

import languageCoach from "assets/language-coach.jpg";
import moneyGuard from "assets/money-guard.jpg";

import styles from "./_Home.module.scss";
import { Skills } from "./Skills";
import { useTranslation } from "react-i18next";

const disciplines = ["React", "Next.js", "Vite"];

export const Home = () => {
  const [visibleSections, setVisibleSection] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  const skills = useRef();

  const { t } = useTranslation();

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      details,
      skills,
    ];

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
        title={t("commercialProjects")}
        description={t("commercialProjectDesc")}
        buttonText={t("buttonProject")}
        buttonLink="/projects/commercial"
        model={{
          type: "laptop",
          alt: t("commercialProjects"),
          textures: [
            {
              srcSet: [languageCoach],
              placeholder: languageCoach,
            },
          ],
        }}
      />
      {/* <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title={t("mobileApplication")}
        description={t("mobileDesc")}
        buttonText={t("buttonProject")}
        buttonLink="/projects/mobile"
        model={{
          type: "phone",
          alt: t("mobileApplication"),
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
      /> */}
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={2}
        title={t("educationProjects")}
        description={t("educationProjectDesc")}
        buttonText={t("buttonProject")}
        buttonLink="/projects/education"
        model={{
          type: "laptop",
          alt: t("educationProjects"),
          textures: [
            {
              srcSet: [moneyGuard],
              placeholder: moneyGuard,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Skills
        id="skills"
        sectionRef={skills}
        visible={visibleSections.includes(skills.current)}
      />
      <Footer />
    </div>
  );
};
