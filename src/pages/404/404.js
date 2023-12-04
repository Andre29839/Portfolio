import Link from "next/link";

import { Heading } from "components/Heading";
import { Transition } from "components/Transition";
import { DecoderText } from "components/DecoderText";
import { Text } from "components/Text";
import { Button } from "components/Button";

import notFound from "assets/notfound.mp4";
import notFoundPoster from "assets/notfound.jpg";

import styles from "./_404.module.scss";

export default function PageNotFound() {
  return (
    <section className={styles.page}>
      <Transition in>
        {visible => (
          <>
            <div className={styles.details}>
              <div className={styles.text}>
                <Heading
                  className={styles.title}
                  data-visible={visible}
                  level={0}
                  weight="bold"
                >
                  404
                </Heading>
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h2"
                  level={3}
                >
                  <DecoderText
                    text="Error: Redacted"
                    start={visible}
                    delay={300}
                  />
                </Heading>
                <Text
                  className={styles.description}
                  data-visible={visible}
                  as="p"
                >
                  This page could not be found. It either doesn’t exist or was
                  deleted. Or perhaps you don’t exist.
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-visible={visible}
                  href="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div className={styles.videoContainer} data-visible={visible}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                data-visible={visible}
                poster={notFoundPoster.src}
              >
                <source src={notFound} type="video/mp4" />
              </video>
              <Link
                className={styles.credit}
                data-visible={visible}
                href="https://www.imdb.com/title/tt0113568/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animation from Ghost in the Shell (1995)
              </Link>
            </div>
          </>
        )}
      </Transition>
    </section>
  );
}
