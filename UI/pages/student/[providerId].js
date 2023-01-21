import DashboardLayout from "../../components/student/layouts/DashboardLayout";
import { Fragment } from "react";
import { useRouter } from "next/router";
import ProviderOfferInfo from "../../components/student/ProviderOfferInfo";
import SelectedCartItems from "../../components/student/SelectedCartItems";
import ProviderOfferList from "../../components/student/ProviderOfferList";
import ProviderOffer from "../../components/student/ProviderOffer";

const ProviderDetail = (props) => {
  const router = useRouter();
  const { providerId } = router.query;
  const data = router.query;
  // data is an object contains
  // data={
  //         businessImageURL
  //         providerDescription
  //         phoneNumber
  //         address_aptNo
  //         address_streetName
  //         address_city
  //         address_state
  //         address_zip
  //         providerId   };

  return (
    <Fragment>
      <section className="text-gray-600 body-font overflow-hidden">
        <ProviderOffer providerData={data}></ProviderOffer>
      </section>
    </Fragment>
  );
};

ProviderDetail.layout = DashboardLayout;
export default ProviderDetail;
