import { providerOfferingsActions } from "./provider-offering-slice.js";
import axios from "../lib/axios";

export const fetchOffering = (data) => {
  return async (dispatch) => {
    const fetchHandler = async (data) => {
      // const res = await fetch(
      //   `http://localhost:3000/mealtrain/providers/${providerId}/offerings`
      // );
      // const data = await res.json();
      // return data;
      console.log("data", data);
      const response = await axios
        .get(`providers/${data.pId}/offerings`, {
          params: {
            userAccountId: data.id,
          },
        })
        .then((res) => {
          return res.data;
        });
      return response;
    };

    try {
      const offeringsData = await fetchHandler(data);
      dispatch(providerOfferingsActions.replaceOffering(offeringsData));
    } catch (err) {
      console.log(err);
    }
  };
};

// {
//   providerId
//   offering
// }

export const deleteOffering = (deleteOfferingParams) => {
  return async (dispatch) => {
    const deleteHandler = async (deleteOfferingParams) => {
      //   const res = await fetch(
      //     `http://localhost:3000/mealtrain/providers/${deleteOfferingParams.providerId}/offerings/`,
      //     {
      //       method: "DELETE",
      //       body: JSON.stringify(deleteOfferingParams.offering),
      //       headers: {
      //         "Content-Type": "application/json",
      //         // 'Content-Type': 'application/x-www-form-urlencoded',
      //       },
      //     }
      //   );
      //   const data = await res.json();
      //   return data;
      // };
      //userAccountId: deleteOfferingParams.id,

      const response = await axios
        .delete(`providers/${deleteOfferingParams.providerId}/offerings`, {
          data: {
            ...deleteOfferingParams.offering,
            userAccountId: deleteOfferingParams.id,
          },
        })
        .then((res) => {
          return res.data;
        });
      return response;
    };

    try {
      const deleteStatus = await deleteHandler(deleteOfferingParams);
      dispatch(
        providerOfferingsActions.deleteOffering(deleteOfferingParams.offering)
      );
    } catch (err) {
      console.log(err);
    }
  };
};

// {
//   providerId,
//   offering
// }
export const addOffering = (addOfferingParams) => {
  return async (dispatch) => {
    const postHandler = async (addOfferingParams) => {
      // const res = await fetch(
      //   `http://localhost:3000/mealtrain/providers/${addOfferingParams.providerId}/offerings/`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       ...addOfferingParams.offering,
      //       userAccountId: addOfferingParams.userAccountId,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //   }
      // );
      // const data = await res.json();
      // return data;
      console.log(addOfferingParams.userAccountId);
      const response = await axios
        .post(`providers/${addOfferingParams.providerId}/offerings/`, {
          ...addOfferingParams.offering,
          userAccountId: addOfferingParams.userAccountId,
        })
        .then((res) => {
          return res.data;
        });
      return response;
    };

    try {
      const newOfferingAdded = await postHandler(addOfferingParams);

      dispatch(providerOfferingsActions.addOffering(newOfferingAdded));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateOffering = (updatedOfferingParams) => {
  return async (dispatch) => {
    const putHandler = async (updatedOfferingParams) => {
      // const res = await fetch(
      //   `http://localhost:3000/mealtrain/providers/${updatedOfferingParams.providerId}/offerings/${updatedOfferingParams.updatedOfferingDetails._id}`,
      //   {
      //     method: "PUT",
      //     body: JSON.stringify(updatedOfferingParams.updatedOfferingDetails),
      //     headers: {
      //       "Content-Type": "application/json",
      //       // 'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //   }
      // );
      // const data = await res.json();
      // return data;

      const response = await axios
        .put(
          `providers/${updatedOfferingParams.providerId}/offerings/${updatedOfferingParams.updatedOfferingDetails._id}`,
          {
            ...updatedOfferingParams.updatedOfferingDetails,
            userAccountId: updatedOfferingParams.userAccountId,
          }
        )
        .then((res) => {
          return res.data;
        });
      return response;
    };

    try {
      const updatedOffering = await putHandler(updatedOfferingParams);
      dispatch(
        providerOfferingsActions.updateOffering(
          updatedOfferingParams.updatedOfferingDetails
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
};
