/*
 * @Author: JoeChen
 * @Date: 2025-12-23 15:25:53
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-23 22:55:29
 * @Description:
 */
"use client";

// modules
import { useEffect } from "react";

// api
import { NextHahowApi } from "@/lib/api-client/endpoints";

export default function Home() {
  useEffect(() => {
    async function fetchHeroes() {
      const response = await NextHahowApi.Heroes.ListHeroes();
      console.log("Heroes Response:", response);
    }

    fetchHeroes();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <main className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
          Hahow Heroes
        </h1>
      </main>
    </div>
  );
}
