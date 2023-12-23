import { useState } from "react";

import { Heading } from "components/Heading";
import { DecoderText } from "components/DecoderText";
import { Text } from "components/Text";
import { Section } from "components/Section";
import { Transition } from "components/Transition";
import { Button } from "components/Button";
import { Divider } from "components/Divider";
import { Image } from "components/Image";

import profileImg from "assets/profile-image.jpg";

import { media } from "utils/style";

import styles from "./_Profile.module.scss";

const ProfileText = ({ visible, titleId }) => (
  <>
    <Heading
      className={styles.title}
      data-visible={visible}
      level={3}
      id={titleId}
    >
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="1" as="p">
      I’m Andrii
    </Text>
  </>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImg}
                  srcSet={profileImg}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="I'm posing at a wedding photo shoot"
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
