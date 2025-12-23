/*
 * @Author: Joe.Chen
 * @Date:  2025-12-23 21:08:18
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 23:00:10
 * @Description:
 */

import axios, { AxiosInstance } from "axios";

/** Next.js 內部 API */
const createNextAPIAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const nextAPIaxiosInstance = createNextAPIAxiosInstance();

export { nextAPIaxiosInstance };
