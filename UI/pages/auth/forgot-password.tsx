import { NextPage } from "next";
import Image from "next/image";
import logo from "../../public/logo.gif";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MyThunkDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { forgotPassword } from "../../store/auth";
import classes from "../../components/user-profile/layout/ProfileLayout.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

// schema
const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email.")
    .required("Please enter the email."),
})

interface Values {
  email: string;
  
}

const initialValues: Values = {
  email: "",
  
};


const ForgetPassword: NextPage = () => {
  const dispatch: MyThunkDispatch = useDispatch();

  const forgotPasswordEvent = async (values: any) => {
    try {
      const resultObj: any = await dispatch(forgotPassword(values));
      const result = unwrapResult(resultObj);
      toast.success("Mail sent to your email!",{ autoClose: 3000 })
      console.log(result.message)
      
    } catch (err:any) {
      toast.error(err.error,{ autoClose: 2000 });
      console.log(err);
    }
  };


  return (
    <div>
       <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={forgotPasswordEvent}
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
            
              <div className="h-screen ">
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
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                    {/* <h1 className="text-2xl font-bold text-center text-[#f5b011]">
                      Forgot Your Password
                    </h1> */}
                    <p className="mt-6 font-extrabold text-[16px] text-gray-600 hover:text-black">
      
                            Lost your Password? Please enter your email address. You will
                            receive a link to create a new password via mail.
                         
                        </p>
                    <form className="mt-6" onSubmit={handleSubmit}>
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
                              ? "input-error h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                              : "h-8 block w-full px-8 py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                          }
                          placeholder="Enter Email Address"
                        />
                        {errors.email && touched.email && (
                          <span className="error text-red-600 ml-1 h-3">
                            {errors.email}
                          </span>
                        )}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <button className="px-4 py-2 tracking-wide font-bold text-[16px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]">
                          Send Mail
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="black"
                            className="pl-3 h-5 inline-block"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                            />
                          </svg>
                        </button>
                       
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      }
    </Formik>
      <ToastContainer />
    </div>
 
  )  
};

export default ForgetPassword;
