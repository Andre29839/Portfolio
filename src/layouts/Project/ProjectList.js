import { useDictionary } from "components/DictionaryContext/DictionaryContext";
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
} from "./Project";
import { media } from "utils/style";

const ProjectList = ({ projects }) => {
  const dict = useDictionary();
  const linkLabel = "visitButton";

  return (
    <>
      {projects.map(
        (
          { img, headingProject, url, roles, textProject, title, description },
          index
        ) => (
          <ProjectContainer key={index}>
            <ProjectBackground src={img} placeholder={img} opacity={0.8} />
            <ProjectHeader
              title={title}
              description={dict[description]}
              url={url}
              roles={roles.map(role => dict[role])}
              linkLabel={dict[linkLabel]}
            />
            <ProjectSection padding="top">
              <ProjectSectionContent>
                <ProjectImage
                  src={img}
                  alt={dict[description]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
                />
              </ProjectSectionContent>
            </ProjectSection>
            <ProjectSection>
              <ProjectSectionContent>
                <ProjectSectionHeading>
                  {dict[headingProject]}
                </ProjectSectionHeading>
                <ProjectSectionText
                  textProject={textProject.map(text => dict[text])}
                />
              </ProjectSectionContent>
            </ProjectSection>
          </ProjectContainer>
        )
      )}
    </>
  );
};

export default ProjectList;
