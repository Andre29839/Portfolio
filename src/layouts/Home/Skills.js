import { Section } from "components/Section";
import { Transition } from "components/Transition";
import { skills } from "./skillsName";
import { DecoderText } from "components/DecoderText";

import styles from "./_Skills.module.scss";

export const Skills = ({ id, sectionRef, visible }) => {
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.skills}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0}>
        {visible => (
          <ul key={id} data-visible={visible} className={styles.list}>
            {skills.map(({ name }, index) => (
              <li key={index} className={styles.item}>
                <DecoderText text={name} start={visible} delay={500 * index} />
              </li>
            ))}
          </ul>
        )}
      </Transition>
    </Section>
  );
};
