import { useRef, useState } from "react";

import { tokens } from "components/ThemeProvider";
import { Section } from "components/Section";
import { Transition } from "components/Transition";
import { Heading } from "components/Heading";
import { DecoderText } from "components/DecoderText";
import { Divider } from "components/Divider";
import { Input } from "components/Input";
import { Icon } from "components/Icon";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { Footer } from "components/Footer";

import { useFormInput } from "hooks";
import { cssProps, msToNum, numToMs } from "utils/style";

import styles from "./_Contact.module.scss";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const errorRef = useRef();
  const email = useFormInput("");
  const message = useFormInput("");
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [statusError, setStatusError] = useState("");
  const initDelay = tokens.base.durationS;

  const { t } = useTranslation();

  const onSubmit = async e => {
    e.preventDefault();
    setStatusError("");

    if (sending) return;

    try {
      setSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          message: message.value,
        }),
      });

      const responseMessage = await response.json();

      const statusError = getStatusError({
        status: response?.status,
        errorMessage: responseMessage?.error,
        fallback: t("contactErrorMessage"),
        t,
      });

      if (statusError) throw new Error(statusError);

      setComplete(true);
      setSending(false);
    } catch (error) {
      setSending(false);
      setStatusError(error.message);
    }
  };

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!complete} timeout={1600}>
        {(_, status) => (
          <form className={styles.form} method="post" onSubmit={onSubmit}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText
                text={t("contactSayHello")}
                start={status !== "exited"}
                delay={300}
              />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label={t("contactEmail")}
              type="email"
              maxLength={512}
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label={t("contactMessage")}
              maxLength={4096}
              {...message}
            />
            <Transition
              in={statusError}
              timeout={msToNum(tokens.base.durationM)}
            >
              {errorStatus => (
                <div
                  className={styles.formError}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {statusError}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText={t("contactSending")}
              icon="send"
              type="submit"
            >
              {t("contactSend")}
            </Button>
          </form>
        )}
      </Transition>
      <Transition unmount in={complete}>
        {(_, status) => (
          <div className={styles.complete} aria-live="polite">
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              {t("contactMessageSend")}
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              {t("contactIWillBack")}
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevronRight"
            >
              {t("errorButton")}
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
}

function getStatusError({ status, errorMessage, fallback, t }) {
  if (status === 200) return false;

  const statuses = {
    500: t("problem500"),
    404: t("problem404"),
  };

  if (errorMessage) {
    return errorMessage;
  }

  return statuses[status] || fallback || t("problemYourRequest");
}

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
