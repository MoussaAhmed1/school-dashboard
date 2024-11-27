"use client";

import { io } from "socket.io-client";
import Cookie from 'js-cookie';

const token = Cookie.get("token");

export const socket = io(`http://31.220.73.176:8080/watch`, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });