import React, { useState } from "react";

import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  Tag,
  ShieldCheck,
  Truck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Home,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [credentails, setCredentails] = useState({
    email: "",
    password: "",
  });

  

  const onChange = (e) => {
    setCredentails({
      ...credentails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", credentails);

      //save token
      localStorage.setItem("token", response.data.token);
      console.log("success login", response.data.token);
     

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="flex justify-center mt-30 md:mt-40">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-6 rounded-xl"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <button
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div> */}

      <div className="min-h-screen flex">
        {/* left side */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#f8f9ff] via-[#eef2ff] to-[#e4e9ff] px-16 py-14 ">
          <div className="max-w-7xl mx-auto">
            {/* Background Blur */}
            <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl"></div>

            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-lg">
                  <ShoppingBag className="text-white" size={24} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">Shopello</h2>
              </div>

              {/* Center */}
              <div className="max-w-lg">
                <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
                  Welcome
                  <span className="block text-indigo-600">Back!</span>
                </h1>

                <p className="mt-5 text-lg leading-8 text-gray-600">
                  Sign in to continue shopping and discover amazing deals,
                  secure payments, and lightning-fast delivery.
                </p>

                {/* Features */}

                <div className="mt-12 space-y-5">
                  {/* Feature 1 */}

                  <div className="flex items-center gap-5 rounded-2xl bg-white/80 p-5 shadow-md backdrop-blur transition-all duration-300 hover:shadow-xl">
                    <div className="rounded-xl bg-indigo-100 p-3">
                      <Tag className="text-indigo-600" size={26} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Best Deals
                      </h3>

                      <p className="text-gray-500">
                        Grab exciting offers on top brands.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}

                  <div className="flex items-center gap-5 rounded-2xl bg-white/80 p-5 shadow-md backdrop-blur transition-all duration-300 hover:shadow-xl">
                    <div className="rounded-xl bg-indigo-100 p-3">
                      <ShieldCheck className="text-indigo-600" size={26} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Secure Payments
                      </h3>

                      <p className="text-gray-500">
                        Your payments are protected with industry-grade
                        security.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}

                  <div className="flex items-center gap-5 rounded-2xl bg-white/80 p-5 shadow-md backdrop-blur transition-all duration-300 hover:shadow-xl">
                    <div className="rounded-xl bg-indigo-100 p-3">
                      <Truck className="text-indigo-600" size={26} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Fast Delivery
                      </h3>

                      <p className="text-gray-500">
                        Receive your orders quickly at your doorstep.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Illustration */}

              <div className="mt-10 flex justify-end">
                <img
                  src="/shopping-bag2.png"
                  alt="Shopping"
                  className="w-90 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-10">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex justify-center mb-10 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
                  <ShoppingBag className="text-white" size={24} />
                </div>

                <h2 className="text-2xl font-bold">Shopello</h2>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-slate-900">Sign In</h2>

            <p className="mt-2 text-gray-500">
              Welcome back! Please login to your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email */}

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Email
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 px-4 py-3 transition focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-200">
                  <Mail size={20} className="text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={credentails.email}
                    onChange={onChange}
                    className="ml-3 w-full border-none bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 px-4 py-3 transition focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-200">
                  <Lock size={20} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={credentails.password}
                    onChange={onChange}
                    className="ml-3 w-full border-none bg-transparent outline-none"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-indigo-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:underline hover:cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:cursor-pointer"
              >
                Sign In
              </button>

  
            </form>

            {/* Divider */}

            <div className="my-8 flex items-center">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="mx-4 text-sm text-gray-400">OR</span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            {/* Google */}

            <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50 hover:cursor-pointer">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>

            {/* continue shopping */}
            <div className="mb-6 lg:hidden mt-5">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-indigo-600 font-semibold"
                >
                  <Home size={18} />
                  Continue Shopping
                </button>
              </div>

            {/* Register */}

            <p className="mt-8 text-center text-gray-500">
              Don't have an account?
              <span
                onClick={() => navigate("/register")}
                className="ml-2 cursor-pointer font-semibold text-indigo-600 hover:underline"
              >
                Register
              </span>
            </p>
          </div>
        </div>

        {/* Floating Button */}
        <button
          onClick={() => navigate("/")}
          className="fixed bottom-6 right-6 z-50 hidden  md:flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
        >
          <Home size={20} />
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default Login;
