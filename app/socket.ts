"use client";

import { io } from "socket.io-client";
import Cookie from 'js-cookie';

const token = Cookie.get("token");

export const socket = io(`${process.env.NEXT_PUBLIC_HOST_DOMAIN}/watch`, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });