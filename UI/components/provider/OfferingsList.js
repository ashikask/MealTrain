import OfferingCard from "./OfferingCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchOffering } from "../../store/provider-offering-actions.js";
import { useEffect } from "react";

function OfferingList() {
  const dispatch = useDispatch();
  const providerId = useSelector(
    (state) => state.userProfileReducer.user.providerId
  );
  const offerings = useSelector((state) => state.providerOfferings.offerings);
  const loggedInUser = useSelector((state) => state.authReducer.user);

  useEffect(() => {
    dispatch(fetchOffering({id:loggedInUser.id,pId:providerId}));
  }, [dispatch]);



  return (
    <div className="flex flex-row flex-wrap justify-between">
      {offerings.map((offering) => (
        <OfferingCard offeringDetails={offering}></OfferingCard>
      ))}

      {(offerings.length==0) && (<p className="p-[2%] text-[16px] italic">You have no Offerings Start Creating One 😀!</p>)}
    </div>
  );
}

export default OfferingList;
