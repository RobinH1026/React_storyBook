import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  isValid,
  format,
  formatDistance,
  toDate,
  isAfter,
  isBefore,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInYears,
} from "@eGroupAI/utils/dateUtils";
import Typography from "@eGroupAI/material/Typography";
import Link from "@eGroupAI/material/Link";

export default {
  title: "Utils/dateUtils",
} as Meta;

const today = new Date();

export const Default: Story = () => (
  <>
    <Typography variant="body1" gutterBottom>
      DateUtils is extends from date-fns library primary to solve when date is
      undefined or null cant be used and set the locale automatly.
    </Typography>
    <Typography variant="body1" gutterBottom>
      The api is nothing different with date-fns but more convenience.
    </Typography>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/isValid"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        isValid
      </Link>
      <br />
      {today.toISOString()}: {String(isValid(today))}
      <br />
      1990-01-01: {String(isValid("1990-01-01"))}
      <br />
      undefined: {String(isValid(undefined))}
      <br />
      null: {String(isValid(null))}
      <br />
      abc: {String(isValid("abc"))}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/toDate"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        toDate
      </Link>
      <br />
      {toDate("1990-01-01")?.toISOString()}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/format"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        format
      </Link>
      <br />
      {format(today, "yyyy-MM-dd HH:mm")}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/formatDistance"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        formatDistance
      </Link>
      <br />
      {formatDistance(
        new Date(1986, 3, 4, 10, 32, 0),
        new Date(1986, 3, 4, 11, 32, 0)
      )}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/isAfter"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        isAfter
      </Link>
      <br />
      {String(isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11)))}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/isBefore"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        isBefore
      </Link>
      <br />
      {String(isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11)))}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/differenceInHours"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        differenceInHours
      </Link>
      <br />
      {differenceInHours(
        new Date(2014, 6, 2, 19, 0),
        new Date(2014, 6, 2, 6, 50)
      )}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/differenceInDays"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        differenceInDays
      </Link>
      <br />
      {differenceInDays(
        new Date(2011, 6, 3, 0, 1),
        new Date(2011, 6, 2, 23, 59)
      )}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/differenceInWeeks"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        differenceInWeeks
      </Link>
      <br />
      {differenceInWeeks(new Date(2020, 5, 1), new Date(2020, 2, 6))}
    </div>
    <div>
      <Link
        href="https://date-fns.org/v2.28.0/docs/differenceInYears"
        variant="h6"
        fontWeight="700"
        gutterBottom
        target="_blank"
      >
        differenceInYears
      </Link>
      <br />
      {differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))}
    </div>
  </>
);
