import { commercialProjects } from "./commercialProject";
import ProjectList from "layouts/Project/ProjectList";

const CommercialProjects = () => {
  return <ProjectList projects={commercialProjects} />;
};

export default CommercialProjects;
