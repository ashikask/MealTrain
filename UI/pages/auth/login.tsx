import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo.gif";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MyThunkDispatch } from "../../store/store";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../store/auth";
import Link from "next/link";
import { getUserDetails } from "../../store/user-profile-slice";
import classes from "../../components/user-profile/layout/ProfileLayout.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
// schema
const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Username should be of atleast 8 characters.")
    .max(15, "Username cannot be more than 15 characters.")
    .required("Please enter the username."),
  password: yup
    .string()
    // .min(8, "Password should be of atleast 8 characters.")
    // .max(30, "Password cannot be more than 30 characters.")
    .required("Please enter the password."),
});

interface Values {
  username: string;
  password: string;
}

const initialValues: Values = {
  username: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const dispatch: MyThunkDispatch = useDispatch();

  const onLogin = async (values: any) => {
    try {
      const user: any = await dispatch(login(values));
      const result = unwrapResult(user);
      if (result && result.user.userDetailsId) {
        const userDetails = dispatch(
          getUserDetails({
            id: result.user.userDetailsId,
            userAccountId: result.user.id,
          })
        );
        toast.success("Successfully Logged In!",{ autoClose: 4000 })
        router.push(`/${result.user.role}`);
      } else {
        toast.success("Successfully Logged In!",{ autoClose: 4000 })
        router.push(`/user/${result.user.role}`);
      }
    } catch (err : any) {
      toast.error(err.error)
      console.log(err);
    }
  };

  return (
  <div>
     <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onLogin}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
          setFieldValue,
        } = formik;
        return (
          <div className={classes.image}>
            <div className=" h-screen">
              <div className="flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded shadow-lg ring-2 ring-[#ff8c40] lg:max-w-md">
                  
                  <div className="text-black text-6xl text-center font-Pacifico">
                    MealTrain
                  </div>
                  <div className=" mt-8 flex flex-col justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="lightgray"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-[100px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  {/* <h1 className="text-2xl font-bold text-center text-[#f5b011]">
                    Login
                  </h1> */}
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="username"
                        className="block form-label font-bold mt-6"
                      >
                        Username
                      </label>
                      <div className="relative">
                        <div className="flex absolute  p-[6px] pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="username"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.username && touched.username
                              ? "input-error h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                              : "h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                          }
                          placeholder="Enter username"
                        />
                        {errors.username && touched.username && (
                          <span className="error text-red-600 ml-1 h-3">
                            {errors.username}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block form-label font-bold mt-6"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <div className="flex absolute  p-[6px] pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                             <path strokeLinecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />

      

                          </svg>
                        </div>
                        <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Password"
                        className={
                          errors.password && touched.password
                            ? "input-error h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                            : "h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                        }
                      />
                      {errors.password && touched.password && (
                        <span className="error text-red-600 ml-1 h-3">
                          {errors.password}
                        </span>
                      )}  
                      </div>
                      
                    </div>
                    <div className="mt-4 text-center">
                      <button className=" px-4 py-2 tracking-wide font-bold text-[16px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]">
                        Log In
                      </button>
                      <p className="mt-2 text-right">
                        <Link
                          href="/auth/forgot-password"
                          className="font-extrabold text-[16px] text-gray-500 hover:text-gray-600 hover:text-[17px]  focus:outline-0 focus:text-[17px]"
                        >
                          Forget Password?
                        </Link>
                      </p>
                    </div>
                  </form>
                  <p className="mt-2 font-bold  text-[17px]  text-center  text-gray-700">
                    {" "}
                    Not a member?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-extrabold text-[15px] text-[#f5b011] hover:text-[#d36a19] hover:text-[18px]  focus:outline-0 focus:text-[18px]"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
    <ToastContainer />
  </div>

   
  );
};

export default Login;
