import { NextPage } from "next";
import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.gif";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { MyThunkDispatch } from "../../../store/store";
import { useRouter } from "next/router";
import { resetPassword } from "../../../store/auth";
import { unwrapResult } from "@reduxjs/toolkit";
import classes from "../../../components/user-profile/layout/ProfileLayout.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

// schema
const Schema = yup.object().shape({
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
});

interface Values {
  password: string;
  confirmpassword: string;
}

const initialValues: Values = {
  password: "",
  confirmpassword: "",
};

const ResetPassword: NextPage = () => {
  const dispatch: MyThunkDispatch = useDispatch();
  const router = useRouter();
  const obj = router.query;
  console.log(obj);
  const onReset = async (values: any) => {
    try {
      const finalObj = {
        ...values,
        token:obj.token,
        id:obj.id,
      };
      const user = await dispatch(resetPassword(finalObj));
      const result = unwrapResult(user);
      console.log("Result", result);
      toast.success("Password reset successfully.Please login again!",{ autoClose: 3000 })
      router.push("/auth/login");
    } catch (err : any) {
      console.log(err);
      toast.error(err.error,{ autoClose: 3000 });
    }
  };

  return (
    <div>
      <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={onReset}
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
          <div>
            <div className={classes.image}>
             
              <div className=" h-screen ">
                <div className="flex flex-col justify-center min-h-screen overflow-hidden">
                  
                  <div className="w-full p-6 m-auto bg-white rounded shadow-lg ring-2 ring-[#ff8c40] lg:max-w-md">
                  <div className="text-black text-6xl text-center font-Pacifico">
                    MealTrain
                  </div>
                    <div className="flex flex-col justify-center mt-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="lightgray"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-[70px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    {/* <h1 className="text-2xl font-bold text-center text-[#f5b011]">
                      Reset Password
                    </h1> */}
                    <form className="mt-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="password"
                        className="block form-label mt-8 font-bold"
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
                    <div>
                      <label
                        htmlFor="confirmpassword"
                        className="block form-label mt-4 font-bold"
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
                             <path strokeLinecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />

      

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
                            ? "input-error h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                            : "h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                        }
                      />
                      {errors.confirmpassword && touched.confirmpassword && (
                        <span className="error text-red-600 ml-1 h-3">
                          {errors.confirmpassword}
                        </span>
                      )}
                      </div>
                      
                    </div>
                      <div className="mt-4 text-center">
                        <button className="px-4 py-2 tracking-wide font-bold text-[16px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]">
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
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

export default ResetPassword;
