import React, { FC } from "react";

import axios from "axios";
import { Meta } from "@storybook/react";
import makeInfiniteGetHook from "@eGroupAI/hooks/apis/makeInfiniteGetHook";
import useDetectScrollAtBottom from "@eGroupAI/hooks/useDetectScrollAtBottom";
import { Card, CardContent, CardMedia } from "@mui/material";

export default {
  title: "Hooks/makeInfiniteGetHook",
} as Meta;

const fetcher = axios.create({
  baseURL: "https://reqres.in/api",
});

export interface EntityList<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface User {
  data: Data;
  support: Support;
}

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

const useUsers = makeInfiniteGetHook<EntityList<Data>>(
  "/users",
  fetcher,
  (data) => data?.data.data.length === 0,
  undefined,
  {
    page: 2,
  },
  undefined,
  "page"
);

export const Default: FC = () => {
  const { data, setSize } = useUsers();
  const users = data?.reduce<Data[]>((a, b) => [...a, ...b.data], []);

  useDetectScrollAtBottom(() => {
    setSize((v) => v + 1);
  });

  return (
    <>
      {users?.map((el) => (
        <Card style={{ width: 240 }} key={el.id}>
          <CardMedia image={el.avatar} style={{ height: 140 }} />
          <CardContent>
            {el.first_name}
            {el.email}
          </CardContent>
        </Card>
      ))}
    </>
  );
};
