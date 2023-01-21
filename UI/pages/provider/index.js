// import type { NextPage } from "next";
import DashboardLayout from "../../components/provider/layouts/DashboardLayout";
import { Fragment } from "react";
import OrderLayout from "../../components/provider/layouts/OrderLayout";
import ProviderLoaderCard from "../../components/provider/utility/ProviderLoaderCard.js";
import { useState } from "react";

const ProviderHome = (props) => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <Fragment>
      {showLoader && (
        <div className="p-10 ">
          <ProviderLoaderCard />
          <ProviderLoaderCard />
          <ProviderLoaderCard />
        </div>
      )}
      <OrderLayout
        showLoader={showLoader}
        setShowLoader={setShowLoader}
      ></OrderLayout>
    </Fragment>
  );
};
ProviderHome.layout = DashboardLayout;
export default ProviderHome;
