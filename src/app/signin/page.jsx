"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SingIn() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message);
      }

      // valid signin navigate user to timeline
      router.push("/timeline");
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow">
          <h1 className="text-3xl text-center font-bold mb-4">Twitter-MVP</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block font-bold mb-2">
                Username:
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  // placeholder="ArtieTheOneManParty"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">
                Password:
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  // placeholder="t0p$3crEt!"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Sign-in
              </button>
            </div>
            <div className="text-center">
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-500">
                  Register here.
                </Link>
              </p>
            </div>
          </form>
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    </div>
  );
}
