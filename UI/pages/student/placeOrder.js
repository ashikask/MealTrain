import DashboardLayout from "../../components/student/layouts/DashboardLayout";
import { Fragment } from "react";
import { useRouter } from "next/router";
import StudentOrderPlacing from "../../components/student/PlaceOrder/StudentOrderPlacing";

const PlaceOrder = (props) => {
  const router = useRouter();
  const data = router.query;
  return (
    <Fragment>
      <StudentOrderPlacing providerData={data}></StudentOrderPlacing>
    </Fragment>
  );
};

PlaceOrder.layout = DashboardLayout;
export default PlaceOrder;
