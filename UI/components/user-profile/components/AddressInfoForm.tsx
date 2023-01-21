import React, { useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MyThunkDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import {
  addUserDetails,
  formStageAction,
  formUserAddressAction,
  formUserProfileAction,
  updateUserDetails,
} from "../../../store/user-profile-slice";
import classes from "../layout/ProfileLayout.module.scss";
import FileBase64 from "react-file-base64";
import dynamic from "next/dynamic";
import { unwrapResult } from "@reduxjs/toolkit";
import { updateUserDetailsId } from "../../../store/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

const Maps = dynamic(() => import("../../Map"), {ssr:false});

interface Values {
  streetName: string;
  city: string;
  state?: string;
  zipcode?: string;
  aptNo?: string;
  name?: string;
}

const AddressInfoForm = ({
  role,
  previousButton,
}: {
  role: String;
  previousButton: boolean;
}) => {
  const dispatch: MyThunkDispatch = useDispatch();
  const currentStage = useSelector(
    (state: any) => state.userProfileReducer.formStage
  ); // for previous button
  const userPersonalDetails = useSelector(
    (state: any) => state.userProfileReducer.formUserProfile
  );
  const userAddressDetails = useSelector(
    (state: any) => state.userProfileReducer.formUserAddress
  ); // for populating the data
  const loggedInUser = useSelector((state: any) => state.authReducer.user);
  const userDetails = useSelector(
    (state: any) => state.userProfileReducer.user
  );
  const existingUser = loggedInUser.userDetailsId ? true : false;

  const submit = async (values: any) => {
    dispatch(
      formUserAddressAction({
        // update formAdress
        ...values,
      })
    );

    try {
      let userObj: any = {
        ...userPersonalDetails,
        address: {
          ...values,
        },
      };
      userObj.userAccountId = loggedInUser.id;
      userObj.name = values.name;
      delete userObj.address.name;
      let user: any;
      if (existingUser) {
        userObj.id = userDetails.id;
        if (loggedInUser.role == "provider") {
          userObj.providerId = userDetails.providerId;
        } else {
          userObj.studentId = userDetails.studentId;
        }
        user = await dispatch(updateUserDetails(userObj));
        const result = unwrapResult(user);
      toast.success("Profile updated successfully!",{ autoClose: 5000 })
      } else {
        user = await dispatch(addUserDetails(userObj));
        const result = unwrapResult(user);
        dispatch(
          updateUserDetailsId({
            userDetailsId: result.id,
          })
        );
        toast.success("Profile created successfully!" ,{ autoClose: 5000 })
      }
     

      dispatch(
        formStageAction(3) // update formStage
      );
    } catch (err : any) {
      console.log(err);
      toast.error("Something went wrong. Please try again",{ autoClose: 2000 });
    }
  };

  // initial form values
  const initialValues: Values = {
    streetName: userAddressDetails.streetName || "",
    city: userAddressDetails.city || "",
    state: userAddressDetails.state || "",
    zipcode: userAddressDetails.zipcode || "",
    aptNo: userAddressDetails.aptNo || "",
    name: userAddressDetails.name || "",
  };

  // schema
  const PersonalInfoSchema = yup.object().shape({
    streetName: yup
      .string()
      .min(5, "Street Name should be of atleast 5 characters.")
      .max(40, "Street Name cannot be more than 40 characters.")
      .required("Please enter your street name."),
    city: yup
      .string()
      .min(3, "City should be of atleast 3 characters.")
      .max(20, "City cannot be more than 20 characters.")
      .required("Please enter your city."),
    state: yup
      .string()
      .min(3, "State should be of atleast 3 characters.")
      .max(20, "State cannot be more than 20 characters.")
      .required("Please enter your state."),
    zipcode: yup
      .string()
      .min(5, "Zip Code should be of 5 digits.")
      .max(6, "Please enter a valid zip code.")
      .required("Please enter your zip code."),
    name: yup.string().when(" ", {
      is: () => role == "provider",
      then: yup
        .string()
        .min(5, "Business Name should be of atleast 5 characters.")
        .max(40, "Business Name cannot be more than 40 characters.")
        .required("Enter your business name"),
      otherwise: yup.string.notRequired,
    }),
    aptNo: yup
      .string()
      .max(20, "Number cannot be more than 20 characters.")
      .required("Please enter the number."),
  });

  return (


    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalInfoSchema}
        onSubmit={submit}
        enableReinitialize={true}
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
            <div className="flex flex-row">
              <div className="w-full ">
                <div className="flex flex-col justify-center">
                  <div className="w-full p-6 m-auto mt-6 bg-white  max-w-7xl">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-16 mt-1">
                        <div>
                          <label
                            htmlFor="streetName"
                            className="block form-label font-bold"
                          >
                            Street Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="streetName"
                              value={values.streetName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.streetName && touched.streetName
                                  ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                  : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                              }
                              placeholder="Enter Street Name"
                            />
                            {errors.streetName && touched.streetName && (
                              <span className="error text-red-600 ml-1 ">
                                {errors.streetName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="aptNo" className="block form-label font-bold">
                            {role == "student"
                              ? "Apartment Number"
                              : "Building Number"}
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="aptNo"
                              value={values.aptNo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.aptNo && touched.aptNo
                                  ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                  : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                              }
                              placeholder="Enter number"
                            />
                            {errors.aptNo && touched.aptNo && (
                              <span className="error text-red-600 ml-1 ">
                                {errors.aptNo}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-16 mt-1">
                        <div>
                          <label htmlFor="city" className="block form-label font-bold">
                            City
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.city && touched.city
                                  ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                  : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                              }
                              placeholder="Enter City Name"
                            />
                            {errors.city && touched.city && (
                              <span className="error text-red-600 ml-1 ">
                                {errors.city}
                              </span>
                            )}
  
                          </div>
                        </div>
                        <div>
                          <label htmlFor="state" className="block form-label font-bold">
                            State
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.state && touched.state
                                  ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                  : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                              }
                              placeholder="Enter State Name"
                            />
                            {errors.state && touched.state && (
                              <span className="error text-red-600 ml-1 ">
                                {errors.state}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-16 mt-1">
                        <div>
                          <label htmlFor="zipcode" className="block form-label font-bold">
                            Zip Code
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="zipcode"
                              value={values.zipcode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.zipcode && touched.zipcode
                                  ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                  : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                              }
                              placeholder="Enter zip code"
                            />
                            {errors.zipcode && touched.zipcode && (
                              <span className="error text-red-600 ml-1 ">
                                {errors.zipcode}
                              </span>
                            )}
                          </div>
                        </div>
                        {role == "provider" && (
                          <div>
                            <label
                              htmlFor="name"
                              className="block form-label font-bold mt-4"
                            >
                              Business Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.name && touched.name
                                    ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                    : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                                }
                                placeholder="Enter business name"
                              />
                              {errors.name && touched.name && (
                                <span className="error text-red-600 ml-1 ">
                                  {errors.name}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-1">
                        <Maps sendData={setFieldValue} />
                      </div>

                      <div
                        className="inline-flex rounded-md w-full gap-20"
                        role="group"
                      >
                        {previousButton && (
                          <button
                            onClick={() =>
                              dispatch(formStageAction(currentStage - 1))
                            }
                            className="p-2  w-[200px]   font-700 text-[18px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]"
                          >
                            Back
                          </button>
                        )}

                        {existingUser && (
                          <button
                          
                          className="p-2  w-[200px]   font-700 text-[18px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]"
                          >
                            Update Details
                          </button>
                        )}
                        {!existingUser && (
                          <button
                           
                          className="p-2  w-[200px]   font-700 text-[18px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]"
                          >
                            Submit Details
                          </button>
                        )}
                      </div>
                    </form>
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

export default AddressInfoForm;
