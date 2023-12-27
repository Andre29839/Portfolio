// import { useEffect, useState } from "react";

// import { useDictionary } from "components/DictionaryContext/DictionaryContext";
import { educationProjects } from "./educationProject";
import ProjectList from "layouts/Project/ProjectList";

const EducationProjects = () => {
  // const dict = useDictionary();
  // const [translatedProjects, setTranslatedProjects] = useState([]);

  // useEffect(() => {
  //   const newProjects = educationProjects.map(project => ({
  //     ...project,
  //     roles: project.roles.map(role => dict[role]),
  //   }));
  //   setTranslatedProjects(newProjects);
  // }, [dict]);

  // const translatedProjects = educationProjects.map(project => ({
  //   ...project,
  //   roles: project.roles.map(role => dict[role]),
  // }));

  return <ProjectList projects={educationProjects} />;
};

export default EducationProjects;
