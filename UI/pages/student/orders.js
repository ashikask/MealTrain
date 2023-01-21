import DashboardLayout from "../../components/student/layouts/DashboardLayout";
import { Fragment } from "react";
import StudentOrderPageSet from "../../components/student/StudentOrderPageSet";
import LoaderCard from "./../../components/student/PlaceOrder/LoaderCard";
import { useState } from "react";
const OrderListing = (props) => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <Fragment>
      {showLoader && <LoaderCard />}

      <StudentOrderPageSet
        showLoader={showLoader}
        setShowLoader={setShowLoader}
      />
    </Fragment>
  );
};

OrderListing.layout = DashboardLayout;
export default OrderListing;
