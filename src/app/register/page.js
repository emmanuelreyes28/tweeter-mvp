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
    <>
      <div id="registerBox">
        <div>
          <h1>Register</h1>
        </div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="ArtieTheOneManParty"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="test@gmail.com"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <button>Register</button>
        </div>
        <div>
          <p>
            Already have an account? <Link href="#">Sign-in here.</Link>
          </p>
        </div>
      </div>
    </>
  );
}
