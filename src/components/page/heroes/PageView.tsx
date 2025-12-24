/*
 * @Author: JoeChen
 * @Date: 2025-12-24
 * @LastEditors: JoeChen bibirock0104@gmail.com
 * @LastEditTime: 2025-12-24 17:39:16
 * @Description: Heroes page view component
 */

// types
import { IPageViewProps } from "@/app/heroes/page";

export default function PageView({ data }: { data: IPageViewProps }) {
  const { heroes } = data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Heroes List</h1>

      {heroes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No heroes found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{hero.name}</h2>
                <p className="text-sm text-gray-600">ID: {hero.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
