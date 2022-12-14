import React, { ReactNode } from "react";

import { storiesOf } from "@storybook/react";

import getNavigatorLanguage from "@eGroupAI/utils/getNavigatorLanguage";
import IntlControlProvider, {
  useIntlControl,
} from "@eGroupAI/material-intl/IntlControlProvider";
import {
  useIntl,
  FormattedRelativeTime,
  FormattedMessage,
  FormattedNumber,
  FormattedDisplayName,
  FormattedDate,
} from "react-intl";
import { Typography, Button } from "@mui/material";
import messages from "./locales/zh-TW.json";
import intlControlProviderText from "./intlControlProvider.md";

const IntlShowMessage = () => {
  const intl = useIntl();
  return (
    <>
      <Typography variant="h1">{intl.messages.title}</Typography>
      <FormattedRelativeTime unit="second" />
      <br />
      <FormattedRelativeTime numeric="auto" />
      <br />
      <FormattedRelativeTime value={-1} unit="second" />
      <br />
      <FormattedRelativeTime value={2} unit="second" />
      <br />
      <FormattedRelativeTime
        value={2}
        numeric="auto"
        unit="second"
        updateIntervalInSeconds={1}
      />
      <br />
      <FormattedDisplayName type="currency" value="TWD" />
      {/* eslint-disable-next-line react/style-prop-object */}
      <FormattedNumber value={100000} style="currency" currency="TWD" />
      <br />
      <FormattedDate
        value={new Date()}
        year="numeric"
        month="long"
        day="numeric"
        weekday="long"
      />
      <br />
      <FormattedMessage
        id="intro"
        defaultMessage={intl.messages.intro}
        values={{
          link: (msg: ReactNode) => <a href="https://www.shoe.com/">{msg}</a>,
          cta: (msg: ReactNode) => <strong>{msg}</strong>,
        }}
      />
    </>
  );
};

const IntlChangeLocal = () => {
  const intl = useIntl();
  const { setLocale, locale } = useIntlControl();

  return (
    <Button
      onClick={() => {
        if (locale === "zh-TW") {
          setLocale("en");
        } else {
          setLocale("zh-TW");
        }
      }}
    >
      HOOK: {intl.messages.button}
    </Button>
  );
};

storiesOf("intl/IntlControlProvider", module).add(
  "default",
  () => (
    <IntlControlProvider
      defaultLocale="en"
      locale={getNavigatorLanguage()}
      messages={messages}
      onUpdateLocale={(locale, setMessages) => {
        // load messages
        import(`./locales/${locale}.json`).then((res) => {
          setMessages(res.default);
        });
      }}
    >
      <IntlShowMessage />
      <br />
      <IntlChangeLocal />
    </IntlControlProvider>
  ),
  {
    notes: intlControlProviderText,
    info: {
      propTables: [IntlControlProvider],
      propTablesExclude: [IntlShowMessage, IntlChangeLocal],
    },
  }
);
