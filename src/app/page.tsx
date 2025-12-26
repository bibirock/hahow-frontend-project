/*
 * @Author: JoeChen
 * @Date: 2025-12-23 15:25:53
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25 12:18:33
 * @Description: Redirect root to /heroes
 */
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/heroes");
}
