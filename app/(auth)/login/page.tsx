"use client";
import React, { useState } from "react";
import { loginFormData } from "@/app/types/dtos";
import { loginSchema } from "@/app/validation/login";
import { handleLogin } from "@/app/api/login";
import { InputField } from "@/app/appComponents/dashboard/input/inputField";
import { Form } from "@/app/appComponents/dashboard/forms";

const login = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: loginFormData) => {
    await handleLogin(data, setLoading);
  };
  return (
    <section className="bg-services1 dark:bg-gray-900">
      <div className="flex flex-col  items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img src="/logos/cpgLogo.webp" width={200} height={200} alt="logos" />
        <div className="w-full bg-white rounded-lg ring-1 ring-secondary dark:border md:mt-[4rem] sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <Form<loginFormData, typeof loginSchema>
              schema={loginSchema}
              onSubmit={onSubmit}
              className="mt-10"
            >
              {({ register, formState }) => (
                <div className="space-y-3 text-left">
                  <InputField
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    registration={register("email")}
                    error={formState.errors.email}
                    autoFocus
                    className="h-10 rounded-md w-full  border  border-gray-200 py-2.5 p-10  shadow-sm sm:text-sm"
                  />

                  <InputField
                    type="password"
                    label="Password"
                    placeholder="Enter Password"
                    registration={register("password")}
                    error={formState.errors.password}
                    className="h-10 w-full rounded-md border border-gray-200 py-2.5 p-10 shadow-sm sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium transition-colors duration-300 text-sm px-5 py-2.5 text-center dark:bg-first-color dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
                  >
                    {loading ? "Sign in..." : "Sign in"}
                  </button>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default login;
