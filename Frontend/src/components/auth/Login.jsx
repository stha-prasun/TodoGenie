import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-base-100 shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6">
        {/* App Branding */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">TodoGenie</h1>
          <p className="text-sm mt-1 text-gray-500">Smart Todo Management with AI ✨</p>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
            />
            <label className="label justify-end">
              <Link to="/forgot" className="text-sm text-primary font-medium hover:underline">
                Forgot password?
              </Link>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-full text-base">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Continue with Google (Mock) */}
        <button className="btn btn-outline w-full">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        {/* Register Redirect */}
        <p className="text-sm text-center">
          New here?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
