import { useSelector } from "react-redux";
import { formStageAction } from "../../store/user-profile-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

function ProfileSection() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userProfileReducer.user);
  const email = useSelector((state) => state.authReducer.user.email);
  const router = useRouter();

  const updateDetails = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        formStageAction(1) // update formStage
      );
      router.push("/user/provider");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-rows-[50px,1fr] pl-[6%] mt-[1%] w-[95%]">
      <div className="flex flex-row justify-between border-b-[1.75px] border-[#b1b5b6]">
        <div>
          <h1 className="text-[24px] pl-[4px] ">Your Profile</h1>
        </div>
      </div>
      <div>
        <section className="text-gray-600 body-font relative">
          <div className="container px-1 py-12 mx-auto flex sm:flex-nowrap flex-wrap">
            <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                frameBorder="0"
                title="map"
                marginHeight="0"
                marginWidth="0"
                scrolling="no"
                src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              ></iframe>

              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                frameBorder="0"
                title="map"
                marginHeight="0"
                marginWidth="0"
                scrolling="no"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCp2HqnxVNILYQCJfVijRdZR_4HPPs2TEo
                &q=${userDetails?.address?.aptNo} ${userDetails?.address?.streetName} ${userDetails?.address?.city} ${userDetails?.address?.state} ${userDetails?.address?.zipcode}`}
              ></iframe>

              <div className="bg-[#ffffff] relative flex flex-wrap py-6 rounded shadow-md">
                <div className="lg:w-1/2 px-6">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                    ADDRESS
                  </h2>
                  <h4>{userDetails.name}</h4>
                  <p className="mt-1">
                    {+userDetails?.address?.aptNo +
                      " " +
                      userDetails?.address?.streetName +
                      ", " +
                      userDetails?.address?.city +
                      ", " +
                      userDetails?.address?.state +
                      " " +
                      userDetails?.address?.zipcode}
                  </p>
                </div>
                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                    EMAIL
                  </h2>
                  <a className="text-indigo-500 leading-relaxed">{email}</a>
                  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                    PHONE
                  </h2>
                  <p className="leading-relaxed">{userDetails.phoneNumber}</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-0 mt-8 md:mt-0 p-[0px] rounded-[10px]">
              {/* <h2 className="text-gray-900 text-xl mb-1 font-semibold title-font">
                Update Your contact and address
              </h2>
              <p className="leading-relaxed mb-5 text-gray-600"></p> */}
              {/* <div className="relative mb-4 py-[20px]">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-[#fb923c] focus:ring-1 focus:ring-[#fb923c] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
              <div className="relative mb-4 py-[20px]">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 focus:border-[#fb923c] focus:ring-1 focus:ring-[#fb923c] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div> */}
              <div className="flex flex-col lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-[10%]">
                <img
                  className="object-fill object-center h-[100%] rounded"
                  alt="hero"
                  src={userDetails.imagePath}
                />
                <h1 className="text-[25px] font-semibold text-center pt-[6%]">
                  {userDetails.name}
                </h1>
              </div>

              <button
                onClick={(e) => updateDetails(e)}
                className="text-white bg-[#ea580c] border-0 py-2 px-6 focus:outline-none hover:bg-[#f97316] rounded text-md"
              >
                Update Your profile Details
              </button>
              <p className="text-xs text-gray-500 mt-3">
                <i>*You will be redirected to other Page</i>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileSection;
