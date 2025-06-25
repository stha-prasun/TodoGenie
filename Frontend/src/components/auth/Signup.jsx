import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../../utils/constants";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  
  const [input, setinput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/signup`,
        {
          fullname: input.fullname,
          email: input.email,
          password: input.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setinput({
          fullname: "",
          email: "",
          password: "",
        });
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-base-100 shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6">
        {/* App Branding */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Create Account</h1>
          <p className="text-sm mt-1 text-gray-500">
            Join TodoGenie and organize smarter 🧠
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="label font-medium">Fullname</label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              value={input.fullname}
              name="fullname"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-medium">Email</label>
            <input
              type="text"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={input.email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={input.password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full text-base">
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Continue with Google (Mock) */}
        <button className="btn btn-outline w-full">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
