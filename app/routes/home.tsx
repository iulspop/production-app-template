import type { Route } from "./+types/home";
import { useHints } from "~/utils/client-hints";

export function loader() {
  return { name: "React Router", serverTime: new Date().toISOString() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const hints = useHints();

  const formattedTime = new Date(loaderData.serverTime).toLocaleString(
    "en-US",
    {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: hints.timeZone,
    },
  );

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl">Hello, {loaderData.name}</h1>
      <p className="mt-2 text-gray-600">
        Server time in your timezone: {formattedTime}
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Theme preference: {hints.theme}
      </p>
      <a
        className="mt-2 block text-blue-500 underline hover:text-blue-600"
        href="https://reactrouter.com/docs"
      >
        React Router Docs
      </a>
    </div>
  );
}
