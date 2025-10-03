import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-9xl font-extrabold text-red-600">404</h1>
      <p className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
        Oops! Page not found.
      </p>
      <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
