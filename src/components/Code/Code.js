import { useRef, useState } from "react";

import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { Text } from "components/Text";
import { useTheme } from "components/ThemeProvider";
import { Transition } from "components/Transition";

import styles from "./_Code.module.scss";

export const Code = props => {
  const [copied, setCopied] = useState(false);
  const elementRef = useRef();
  const copyTimeout = useRef();
  const theme = useTheme();
  const lang = props.className?.split("-")[1];

  const handleCopy = () => {
    clearTimeout(copyTimeout);
    navigator.clipboard.writeText(elementRef.current.textContent);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.code} data-theme={theme.themeId}>
      {!!lang && (
        <Text secondary size="s" className={styles.lang}>
          {lang}
        </Text>
      )}
      <pre ref={elementRef} {...props} />
      <div className={styles.actions}>
        <Button iconOnly onClick={handleCopy} aria-label="Copy">
          <span className={styles.copyIcon}>
            <Transition in={!copied}>
              {visible => <Icon icon="copy" data-visible={visible} />}
            </Transition>
            <Transition in={copied}>
              {visible => <Icon icon="check" data-visible={visible} />}
            </Transition>
          </span>
        </Button>
      </div>
    </div>
  );
};
