import { useRouteError } from "react-router";
import { Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mb-6 text-gray-600">
          {error?.statusText ||
            error?.message ||
            "Sorry, the page you're looking for doesn't exist or has been moved."}
        </p>
        <Link
          to="/"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
