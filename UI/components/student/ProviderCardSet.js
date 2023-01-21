import { Grid } from "@chakra-ui/react";
import { useElementScroll } from "framer-motion";
import { Fragment } from "react";
import { ProviderCard } from "./ProviderCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProviderList } from "./../../store/student-home-actions.js";
import LoaderCard from "./../student/PlaceOrder/LoaderCard.js";

function ProviderCardSets({ showLoader, setShowLoader }) {
  const loggedInUser = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const providerList = useSelector((state) => state.studentHome.providerList);
  if (providerList != undefined) {
    setShowLoader(false);
  }
  const [providerListFinal, setProviderListFinal] = useState(providerList);

  useEffect(() => {
    setShowLoader(true);
    dispatch(fetchProviderList({ id: loggedInUser.id }));
  }, [dispatch]);

  var searchTerm = "";

  useEffect(() => {
    setProviderListFinal(providerList);
  }, [providerList]);

  function handleEventChange(e) {
    searchTerm = e.target.value;
    console.log(searchTerm == "");

    const result = providerList.filter((provider) =>
      provider.provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProviderListFinal(result);
  }

  return (
    <Fragment>
      <div className="flex w-1/2 m-auto mt-6">
        <label for="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-white text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-100 dark:border-none dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Have something in mind? we got you!"
            required
            onChange={handleEventChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          ></button>
        </div>
        {/* <button
          type="submit"
          className="inline-flex items-center py-1.5 px-3 ml-2 text-sm font-medium text-white bg-orange-700 rounded-lg border border-orange-700 hover:bg-orange-800 
          
    focus:outline-none focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2 -ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          Search
        </button> */}
      </div>
      {showLoader && <LoaderCard />}

      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={0}
        className="mt-[30px] mx-[10px]"
      >
        {!showLoader &&
          providerListFinal.map(
            (provider) =>
              provider.providerDetails && (
                <ProviderCard key={provider._id} details={provider} />
              )
          )}
        {providerListFinal.length == 0 && searchTerm != "" && (
          <div className="flex flex-col justify-center">
            Sorry we Couldn't find it
          </div>
        )}
      </Grid>
    </Fragment>
  );
}

export default ProviderCardSets;
