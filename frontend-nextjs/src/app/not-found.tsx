import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
      >
        Go Home
      </Link>
    </div>
  );
}
