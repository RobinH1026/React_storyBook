import React, { FC, useCallback } from "react";

import axios from "axios";
import { Meta } from "@storybook/react";
import makeInfinitePostHook from "@eGroupAI/hooks/apis/makeInfinitePostHook";
import useDetectScrollAtBottom from "@eGroupAI/hooks/useDetectScrollAtBottom";
import { Button, Card, CardContent } from "@mui/material";

export default {
  title: "Hooks/makeInfinitePostHook",
} as Meta;

const fetcher = axios.create({
  baseURL: "https://reqres.in/api",
});

export interface Data {
  id: number;
  name: string;
  job: string;
}

const useCreateUser = makeInfinitePostHook<Data>(
  "/users/{{userId}}",
  fetcher,
  undefined,
  {
    userId: "1234",
  },
  {
    name: "morpheus",
    job: "leader",
    userList: [
      {
        name: "leo",
        job: "chief",
      },
      {
        name: "amy",
        job: "director",
        date: new Date("1990-01-01"),
      },
    ],
  },
  undefined,
  {
    revalidateFirstPage: false,
  },
  "page"
);

export const Default: FC = () => {
  const { data: users, setSize, mutate, isValidating } = useCreateUser();

  // Use callback to avoid duplicate api
  const handleScrollAtBottom = useCallback(() => {
    if (!isValidating) {
      setSize((v) => v + 1);
    }
  }, [isValidating, setSize]);
  useDetectScrollAtBottom(handleScrollAtBottom);

  return (
    <>
      {users?.map((el) => (
        <Card style={{ width: 240 }}>
          <CardContent>
            {el.name}
            <br />
            {el.job}
          </CardContent>
        </Card>
      ))}
      <Button
        onClick={() => {
          mutate();
        }}
      >
        Create
      </Button>
    </>
  );
};
