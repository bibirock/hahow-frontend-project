/*
 * @Author: JoeChen
 * @Date: 2025-12-25
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-25
 * @Description: 404 page - redirects to /heroes
 */
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/heroes");
}
