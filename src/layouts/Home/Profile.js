import { useState } from "react";

import { Heading } from "components/Heading";
import { DecoderText } from "components/DecoderText";
import { Text } from "components/Text";
import { Section } from "components/Section";
import { Transition } from "components/Transition";
import { Button } from "components/Button";
import { Divider } from "components/Divider";
import { Image } from "components/Image";
import { useDictionary } from "components/DictionaryContext/DictionaryContext";

import profileImg from "assets/profile-image.jpg";

import { media } from "utils/style";

import styles from "./_Profile.module.scss";

const ProfileText = ({ visible, titleId }) => {
  const dict = useDictionary();
  const profileTexts = ["profileText1", "profileText2", "profileText3"];

  return (
    <>
      <Heading
        className={styles.title}
        data-visible={visible}
        level={3}
        id={titleId}
      >
        <DecoderText text={dict?.hiHere} start={visible} delay={500} />
      </Heading>
      {profileTexts.map(textKey => (
        <Text
          key={textKey}
          className={styles.description}
          data-visible={visible}
          size="l"
          as="p"
        >
          {dict?.[textKey]}
        </Text>
      ))}
    </>
  );
};

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  const dict = useDictionary();

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
                {dict?.sendMessage}
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
                  {dict?.aboutMe}
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
