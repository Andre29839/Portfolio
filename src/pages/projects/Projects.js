import { useEffect, useRef, useState } from "react";

import { ProjectSummary } from "layouts/Home/ProjectSummary";

import { Footer } from "components/Footer";
import { useDictionary } from "components/DictionaryContext/DictionaryContext";

import languageCoach from "assets/language-coach.jpg";
import moneyGuard from "assets/money-guard.jpg";

const Projects = () => {
  const [visibleSections, setVisibleSection] = useState([]);

  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();

  const dict = useDictionary();

  useEffect(() => {
    const sections = [projectOne, projectTwo, projectThree];

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

    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });
  }, [visibleSections]);

  return (
    <>
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title={dict?.commercialProjects}
        description={dict?.commercialProjectDesc}
        buttonText={dict?.buttonProject}
        buttonLink="/projects/commercial"
        model={{
          type: "laptop",
          alt: dict?.commercialProjects,
          textures: [
            {
              srcSet: [languageCoach],
              placeholder: languageCoach,
            },
          ],
        }}
      />
      ;
      {/* <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title={dict?.mobileApplication")}
        description={dict?.mobileDesc")}
        buttonText={dict?.buttonProject")}
        buttonLink="/projects/mobile"
        model={{
          type: "phone",
          alt: dict?.mobileApplication"),
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
        title={dict?.educationProjects}
        description={dict?.educationProjectDesc}
        buttonText={dict?.buttonProject}
        buttonLink="/projects/education"
        model={{
          type: "laptop",
          alt: dict?.educationProjects,
          textures: [
            {
              srcSet: [moneyGuard],
              placeholder: moneyGuard,
            },
          ],
        }}
      />
      <Footer />
    </>
  );
};

export default Projects;
