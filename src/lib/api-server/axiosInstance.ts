/*
 * @Author: Joe.Chen
 * @Date:  2025-12-23 21:08:18
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 23:03:33
 * @Description:
 */

// modules
import axios, { AxiosInstance } from "axios";
import { AxiosConfig } from "@/utils/server/axiosConfig.ts";

/** HahowAPI */
const createHahowAPIAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.HAHOW_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  new AxiosConfig(instance);

  return instance;
};

const hahowAPIAxiosInstance = createHahowAPIAxiosInstance();

export { hahowAPIAxiosInstance };
