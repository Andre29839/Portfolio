import { Heading } from "components/Heading";
import { Transition } from "components/Transition";

// import notFound from "assets/notfound.mp4";
import { DecoderText } from "components/DecoderText";
import { Text } from "components/Text";

export function Page404() {
  return (
    <section>
      <Transition in>
        {visible => (
          <>
            <div className="details">
              <Heading
                className="title"
                data-visible={visible}
                level={0}
                weight="bold"
              >
                404
              </Heading>
              <Heading
                aria-hidden
                className="subheading"
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
              <Text className="description" data-visible={visible} as="p">
                This page could not be found. It either doesn’t exist or was
                deleted. Or perhaps you don’t exist.
              </Text>
            </div>
          </>
        )}
      </Transition>
    </section>
  );
}
