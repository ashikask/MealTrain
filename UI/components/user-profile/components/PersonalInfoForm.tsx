import React, { useState } from "react";
import Image from "next/image";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { MyThunkDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import handleInputChange from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  formStageAction,
  formUserProfileAction,
} from "../../../store/user-profile-slice";

import FileBase64 from "react-file-base64";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BsArrowDownCircleFill } from "react-icons/bs";

interface Values {
  firstname: string;
  lastname: string;
  isProvider?: boolean;
  phoneNumber?: string;
  name?: string;
  imagePath?: string;
  shortDescription?: string;
  description?: string;
}

const PersonalInfoForm = ({
  role,
  previousButton,
}: {
  role: String;
  previousButton: boolean;
}) => {
  const dispatch: MyThunkDispatch = useDispatch();
  const [item, setItem] = useState({ name: "", image: "" });
  const currentStage = useSelector(
    (state: any) => state.userProfileReducer.formStage
  ); // for previous button
  const userDetails = useSelector(
    (state: any) => state.userProfileReducer.formUserProfile
  ); // for populating the data

  const onSubmit = async (values: any) => {
    dispatch(
      formUserProfileAction({
        // update formProfile
        ...values,
      })
    );
    dispatch(
      formStageAction(2) // update formStage
    );
  };

  // initial form values
  const initialValues: Values = {
    firstname: userDetails.firstname || "",
    lastname: userDetails.lastname || "",
    phoneNumber: userDetails.phoneNumber || "",
    imagePath: userDetails.imagePath || "",
    shortDescription: userDetails.shortDescription || "",
    description: userDetails.description || "",
  };

  // schema
  const PersonalInfoSchema = yup.object().shape({
    firstname: yup
      .string()
      .min(3, "First Name should be of atleast 3 characters.")
      .max(20, "First Name cannot be more than 20 characters.")
      .required("Please enter your first name."),
    lastname: yup
      .string()
      .min(3, "Last Name should be of atleast 3 characters.")
      .max(20, "Last Name cannot be more than 20 characters.")
      .required("Please enter your last name."),
    phoneNumber: yup
      .string()
      .min(11, "Phone Number should be of 10 digits.")
      .max(15, "Please enter a valid phone number.")
      .required("Please enter your phone number."),

    imagePath: yup.mixed().required("Upload the image"),
    shortDescription: yup.string().when(" ", {
      is: () => role == "provider",
      then: yup
        .string()
        .min(30, "Short Description should be of atleast 30 characters.")
        .max(60, "Short Description cannot be more than 60 characters.")
        .required("Enter your company's short description"),
      otherwise: yup.string.notRequired,
    }),
    description: yup.string().when(" ", {
      is: () => role == "provider",
      then: yup
        .string()
        .min(60, "Description should be of atleast 30 characters.")
        // .max(50, "Description cannot be more than 50 characters.")
        .required("Enter your description"),
      otherwise: yup.string.notRequired,
    }),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalInfoSchema}
        onSubmit={onSubmit}
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
                            htmlFor="firstname"
                            className="block form-label font-bold"
                          >
                            First Name
                          </label>
                          <div className="relative">
                            <input
                              type="firstname"
                              name="firstname"
                              value={values.firstname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.firstname && touched.firstname
                                  ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                  : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                              }
                              placeholder="Enter first name"
                            />
                            {errors.firstname && touched.firstname && (
                              <span className="error text-red-600 ml-1 ">
                                {errors.firstname}
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="lastname"
                            className="block form-label font-bold"
                          >
                            Last Name
                          </label>
                          <div className="relative">
                            <input
                              type="lastname"
                              name="lastname"
                              value={values.lastname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.lastname && touched.lastname
                                  ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                  : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                              }
                              placeholder="Enter last name"
                            />
                            {errors.lastname && touched.lastname && (
                              <span className="error text-red-600 ml-1 ">
                                {errors.lastname}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-16 mt-1">
                        <div>
                          <label
                            htmlFor="phoneNumber"
                            className="block form-label font-bold mt-4"
                          >
                            Phone Number
                          </label>
                          <PhoneInput
                            name="phoneNumber"
                            placeholder="Enter phone number"
                            value={values.phoneNumber}
                            onChange={(phone) => {
                              setFieldValue("phoneNumber", phone);
                            }}
                            onBlur={handleBlur}
                            className={
                              errors.phoneNumber && touched.phoneNumber
                                ? "input-error h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                : "h-8 block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                            }
                          />

                          {errors.phoneNumber && touched.phoneNumber && (
                            <span className="error text-red-600 ml-1 ">
                              {errors.phoneNumber}
                            </span>
                          )}
                        </div>
                        {role == "provider" && (
                          <div>
                            <label
                              htmlFor="shortDescription"
                              className="block form-label font-bold mt-4"
                            >
                              Short Description of your Company
                            </label>
                            <div className="relative">
                              <textarea
                                name="shortDescription"
                                id="shortDescription"
                                value={values.shortDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={2}
                                className={
                                  errors.shortDescription &&
                                  touched.shortDescription
                                    ? "input-error block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                    : " block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                                }
                                placeholder="Enter short description of your company"
                              ></textarea>

                              {errors.shortDescription &&
                                touched.shortDescription && (
                                  <span className="error text-red-600 ml-1 ">
                                    {errors.shortDescription}
                                  </span>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                       <div className="">
                       {role == "provider" && (
                          <div>
                            <label
                              htmlFor="description"
                              className="block form-label font-bold"
                            >
                               Description about yourself
                            </label>
                            <div className="relative">
                              <textarea
                                name="description"
                                id="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows={2}
                                className={
                                  errors.description &&
                                  touched.description
                                    ? "input-error block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40"
                                    : " block w-full px-[6px] py-2 mt-1  bg-white border rounded-md focus:border-[#f5b011] focus:ring-[#f5b011] focus:outline-none focus:ring focus:ring-opacity-40"
                                }
                                placeholder="Enter description about yourself"
                              ></textarea>

                              {errors.description &&
                                touched.description && (
                                  <span className="error text-red-600 ml-1 ">
                                    {errors.description}
                                  </span>
                                )}
                            </div>
                          </div>
                        )}
                        </div>           
                      <div className="grid grid-cols-2 gap-16 mt-1">
                        <div className="text-white">
                          <label
                            htmlFor="label"
                            
                            className="mb-4 text-black block form-label font-bold mt-10 text-[15px] font-bold"
                          >
                            <MdOutlineAddPhotoAlternate size={20} />
                            Click To Upload Image
                           
                           {errors.imagePath && touched.imagePath &&
                           <span>
                           <BsArrowDownCircleFill className="text-orange mt-1 animate-bounce w-6 h-6" size={20}/>
                         </span> }
                           
                            
                          </label>
                          <FileBase64
                            type="file"
                           
                            multiple={false}
                            id="imagePath"
                            title=" "
                            onDone={({ base64 }: { base64: any }) => {
                              setItem({ ...item, image: base64 });
                              setFieldValue("imagePath", base64);
                            }}
                          />
                           {errors.imagePath && touched.imagePath && (
                            <div className="error text-red-600">
                              {errors.imagePath}
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          {values.imagePath && (
                            <Image
                              src={values.imagePath}
                              width={20}
                              height={20}
                              alt="Business Image"
                              className="p-1 w-[190px] h-[150px]"
                            />
                          )}
                         
                        </div>
                      </div>

                      <div
                        className="inline-flex rounded-md w-1/3 mt-1 gap-20"
                        role="group"
                      >
                        {previousButton && (
                          <button
                            onClick={() =>
                              dispatch(formStageAction(currentStage - 1))
                            }
                            className="w-full mt-1 px-4 py-2  tracking-wide font-bold text-[18px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]"
                          >
                            Back
                          </button>
                        )}
                        <button
                          type="submit"
                          className="p-2 mt-1 w-[200px]   font-700 text-[18px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]"
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalInfoForm;
