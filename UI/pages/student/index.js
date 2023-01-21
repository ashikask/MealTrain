import DashboardLayout from "../../components/student/layouts/DashboardLayout";
import { Fragment } from "react";
import ProviderCardSets from "../../components/student/ProviderCardSet.js";
import { useState } from "react";
import LoaderCard from "./../../components/student/PlaceOrder/LoaderCard";

const ProviderList = (props) => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <Fragment>
      {/* {showLoader && <LoaderCard />} */}

      <ProviderCardSets showLoader={showLoader} setShowLoader={setShowLoader} />
    </Fragment>
  );
};

ProviderList.layout = DashboardLayout;
export default ProviderList;

// www.domain.com/student   (index.js)
// www.domain.com/student/njdvlkfvfvnfuvfu2344    "[providerId]"
// www.    /provider-detail
