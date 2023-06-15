"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <div
          id="registerBox"
          className="max-w-md mx-auto bg-white rounded p-8 shadow"
        >
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block font-bold mb-2">
                Username:
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                  placeholder="ArtieTheOneManParty"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <label className="block font-bold mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="test@gmail.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="block font-bold mb-2">
              Password:
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="t0p$3crEt!"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </label>
            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Register
              </button>
            </div>
            <div className="text-center">
              <p>
                Already have an account?{" "}
                <Link href="#" className="text-blue-500">
                  Sign-in here.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
