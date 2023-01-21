import { useSelector, useDispatch } from "react-redux";
import ProviderOfferingCard from "./ProviderOfferingCard";
import { studentProviderOfferingTabActions } from "./../../store/student-provider-tab-slice.js";

function ProviderOfferList({
  offeringDetailList,
  cartDetails,
  studentId,
  providerId,
}) {
  const providerInfo = useSelector(
    (state) => state.studentProviderInfo.providerInfoCart
  );
  const tabIndex = useSelector((state) => state.offerTab.tabIndex);

  function getOffering() {
    return providerInfo.offerings.filter(
      (offer) => offer.offeredAt === tabIndex
    );
  }

  return (
    <div>
      {getOffering().map((offering) => (
        <ProviderOfferingCard
          key={offering._id}
          offeringDetails={offering}
          cartInfo={cartDetails}
          studentId={studentId}
          providerId={providerId}
        ></ProviderOfferingCard>
      ))}
    </div>
  );
}
export default ProviderOfferList;
