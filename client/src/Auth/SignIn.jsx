import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-zinc-800 p-8 shadow-2xl md:p-10">
        {/* Header */}
        <div className="text-center">
          {/* Logo removed */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white sm:text-4xl">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-zinc-400">Welcome back!</p>
        </div>

        {/* Form */}
        <form action="login" method="POST" className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="block w-full rounded-md border border-zinc-700 bg-zinc-700 px-4 py-2 text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="block w-full rounded-md border border-zinc-700 bg-zinc-700 px-4 py-2 text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2.5 font-semibold text-white shadow-lg transition duration-200 ease-in-out hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
