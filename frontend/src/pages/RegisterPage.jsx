import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function resigterUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. You can log in to the account now.");
    } catch (e) {
      alert("Registration failed. Try again later.");
    }
  }
  return (
    <div className=" mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className=" text-4xl text-center mb-4">Registration Page</h1>
        <form className=" max-w-md mx-auto" onSubmit={resigterUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className=" text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link className=" text-primary underline" to={"/login"}>
              Login Now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
