import axios from "../lib/axios";
import { studentHomeActions } from "./student-home-slice.js";

const User = {
  name: "",
};

export const fetchProviderList = (data) => {
  return async (dispatch) => {
    const fetchProviderHandler = async (data) => {
      // const res = await fetch(`http://localhost:3000/mealtrain/providers/`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // });
      console.log("data", data);
      const response = await axios
        .get("providers", {
          params: {
            userAccountId: data.id,
          },
        })
        .then((res) => {
          return res.data;
        });

      // const data =  response.data;
      return response;
    };

    try {
      const providerList = await fetchProviderHandler(data);
      dispatch(studentHomeActions.replaceProviderList(providerList));

      const myPromise = new Promise((resolve, reject) => {
        resolve("API Call Successfull");
      });
      return myPromise;

      //dispatch(studentCartActions.addCart(newOfferingAdded));
    } catch (err) {
      const myPromise = new Promise((resolve, reject) => {
        reject("API Call Unsuccessfull");
      });
      return myPromise;
      console.log(err);
    }
  };
};
