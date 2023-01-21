import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo.gif";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MyThunkDispatch } from "../../store/store";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "../../store/auth";
import Link from "next/link";
import classes from "../../components/user-profile/layout/ProfileLayout.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// schema
const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Username should be of atleast 8 characters.")
    .max(15, "Username cannot be more than 15 characters.")
    .required("Please enter the username."),
  password: yup
    .string()
    .min(8, "Password should be of atleast 8 characters.")
    .max(30, "Password cannot be more than 30 characters.")
    .required("Please enter the password."),
  confirmpassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password and Confirm Password must match"
    )
    .required("Please enter the confirm password."),
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Please enter the email."),
  role: yup.string().required("Select your role."),
});

interface Values {
  email: string;
  password: string;
  username: string;
  role: string;
  confirmpassword: string;
}

const initialValues: Values = {
  email: "",
  password: "",
  username: "",
  role: "",
  confirmpassword: "",
};

const Signup: NextPage = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const dispatch: MyThunkDispatch = useDispatch();

  const onSignup = async (values: any) => {
    try {
      const user = await dispatch(register(values));
      toast.success("User registered successfully!" , { autoClose: 3000 })
      
      // const result = unwrapResult(user);
      // toast.success("User registered successfully!" , { autoClose: 3000 })
      
      router.push("/auth/login");
    } catch (err:any) {
      toast.error(err.error, { autoClose: 2000 }); 
      console.log(err)
    }
  };

  const redirectToLogin = () => {
    router.push("./login");
  };

  return (
    <div>
       <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={onSignup}
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
            
            <div className="h-screen ">
              <div className="flex flex-col justify-center min-h-screen overflow-hidden">
                {/* <h1 className="font-extrabold mt-2  text-center text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  MEALTRAIN
                </h1> */}

                <div className="w-full p-6 m-auto bg-white rounded shadow-lg ring-2 ring-[#f5b011] lg:max-w-lg">
                <div className="text-black text-6xl text-center font-Pacifico">
                    MealTrain
                  </div>
                  <div className=" mt-4 flex flex-col justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="lightgray"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-[90px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="email" className="block form-label font-bold">
                        Email
                      </label>
                      <div className="relative">
                        <div className="flex absolute  p-[6px] pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email
                              ? "input-error h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                              : "h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                          }
                          placeholder="Enter Email Address"
                        />
                        {errors.email && touched.email && (
                          <span className="error text-red-600 ml-1 ">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="username"
                        className="block form-label font-bold mt-1"
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
                              ? "input-error h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                              : "h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                          }
                          placeholder="Enter username"
                        />
                        {errors.username && touched.username && (
                          <span className="error text-red-600 ml-1 ">
                            {errors.username}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block form-label font-bold mt-1"
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
                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />

      

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
                            ? "input-error h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                            : "h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                        }
                      />
                      {errors.password && touched.password && (
                        <span className="error text-red-600 ml-1 ">
                          {errors.password}
                        </span>
                      )}  
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="confirmpassword"
                        className="block form-label font-bold mt-1"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="flex absolute  p-[6px] pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />

      

                          </svg>
                        </div>
                        <input
                        type="password"
                        name="confirmpassword"
                        value={values.confirmpassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Confirm Password"
                        className={
                          errors.confirmpassword && touched.confirmpassword
                            ? "input-error h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                            : "h-8 block w-full px-8  mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                        }
                      />
                      {errors.confirmpassword && touched.confirmpassword && (
                        <span className="error text-red-600 ml-1 ">
                          {errors.confirmpassword}
                        </span>
                      )}
                      </div>
                      
                    </div>
                    <div>
                      <label htmlFor="role" className="block form-label font-bold mt-1">
                        You are a....
                      </label>

                      <div className="flex mt-1">
                        <div className="flex items-center h-8 pl-4 w-full rounded border border-gray-200 dark:border-gray-700 radio-width-50-per">
                          <input
                            id="bordered-radio-1"
                            type="radio"
                            value="student"
                            name="role"
                            onChange={() => setFieldValue("role", "student")}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="bordered-radio-1"
                            className="py-4 ml-2 w-full text-sm 
                      font-medium text-gray-900 dark:text-gray-300"
                          >
                            Student
                          </label>
                        </div>
                        <div className="flex items-center h-8 pl-4 w-full rounded border border-gray-200 dark:border-gray-700 radio-width-50-per">
                          <input
                            id="bordered-radio-2"
                            type="radio"
                            name="role"
                            value="provider"
                            onChange={() => setFieldValue("role", "provider")}
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="bordered-radio-2"
                            className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Provider
                          </label>
                        </div>
                      </div>

                      {errors.role && touched.role && (
                        <span className="error text-red-600 ml-1 ">
                          {errors.role}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 text-center">
                      <button className="px-4 py-2 tracking-wide font-bold text-[16px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]">
                        Register
                      </button>
                    </div>
                  </form>
                  <p className="mt-2 font-bold  text-[15px]  text-center  text-gray-700">
                    {" "}
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="font-extrabold text-[15px] text-[#f5b011] hover:text-[#d36a19]  hover:text-[18px]  focus:outline-0 focus:text-[18px]"
                    >
                      Login
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

export default Signup;
