import { useSelector, useDispatch } from "react-redux";
import ProviderOfferInfo from "./ProviderOfferInfo";
import ProviderOfferList from "./ProviderOfferList";
import ProviderOfferTabs from "./ProviderOfferTabs";
import SelectedCartItems from "./SelectedCartItems";
import { fetchProvider } from "../../store/student-provider-info-actions.js";
import { useEffect, useState } from "react";

function ProviderOffer({ providerData }) {
  const dispatch = useDispatch();
  const providerInfo = useSelector(
    (state) => state.studentProviderInfo.providerInfoCart
  );

  const studentId = useSelector(
    (state) => state.userProfileReducer.user.studentId
  );
  const cartInfo = useSelector((state) => state.studentCartInfo.cartInfo);

  useEffect(() => {
    console.log("indide procider");
    dispatch(fetchProvider(providerData.providerID, studentId));
  }, [dispatch]);

  return (
    <div>
      <ProviderOfferInfo providerOfferInfo={providerData}></ProviderOfferInfo>
      <div className="md:w-full h-full bg-[#f0eae3]" id="tabs-home">
        <ProviderOfferTabs></ProviderOfferTabs>
        <div className="container flex flex-wrap mx-auto">
          <div className="md:w-2/3 md:py-5 md:border-r md:border-b-0 md:mb-0 border-b border-[#d36a19]">
            <ProviderOfferList
              offeringDetailList={providerInfo.offerings}
              cartDetails={cartInfo}
              studentId={studentId}
              providerId={providerData.providerID}
            ></ProviderOfferList>
          </div>
          <SelectedCartItems
            cartDetails={cartInfo}
            classes="md:w-3/3 md:pl-12"
            studentId={studentId}
            name={providerData.providerShopName}
            providerOfferInfo={providerData}
          ></SelectedCartItems>
        </div>
      </div>
    </div>
  );
}
export default ProviderOffer;
