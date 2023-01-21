import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { MyThunkDispatch } from "../../../store/store";
import classNamees from "../layout/ProfileLayout.module.scss";
// import IMGgreentick from "../../../public/green-tick.svg"; // load image
import Image from "next/image";
import providerIcon from "../../../public/provider-icon.jpg";
import money from "../../../public/money.jpg";
import cook from '../../../public/cook.jpg';
import lunch from '../../../public/lunch.jpg';

const UserInfoCompleted = ({
  role,
  successMessage,
}: {
  role: String;
  successMessage: String;
}) => {
  const dispatch: MyThunkDispatch = useDispatch();
  const loggedInUser = useSelector((state: any) => state.authReducer.user);
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push(`/${loggedInUser.role}`);
  };

  return (
    <div>
      <div className={classNamees.formComplete}>
        <div className="text-center text-[#dd6b20]  my-0 mx-auto font-bold w-fit text-2xl bg-white">
          Congratulations!!! You are all set.
        </div>
        {  role == "provider" && (
          <div>
            <div className="grid mb-8 mt-6 border bg-orange-100 border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
              <div className="flex flex-col md:flex-row m-8 rounded-lg bg-white border-b border-gray-200 rounded-tr-lg  dark:border-gray-700">
                <Image
                  src={providerIcon}
                  alt="MealTrain"
                  className="w-full h-96 md:h-auto object-cover md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg "
                />
                <div className="p-6 flex flex-col justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Add your offerings
                  </h5>
                  <p className="text-gray-700 text-base mb-4">
                    By sitting at home, you can showcase your cooking skills to
                    the world. Add your famous recipies..
                  </p>
                </div>
              </div>
              <div className="flex flex-col m-8 md:flex-row  rounded-lg bg-white border-b border-gray-200 rounded-tr-lg  dark:border-gray-700">
                <Image
                  src={money}
                  alt="MealTrain"
                  className="w-full h-96 md:h-auto object-cover md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg "
                />
                <div className="p-6 flex flex-col justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    Take Bulk Orders
                  </h5>
                  <p className="text-gray-700 text-base mb-4">
                    You can take any number of orders and earn.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center font-bold">
              <button
                 onClick={navigateToDashboard}
                className="p-2 w-[200px]  bg-[#dd6b20] font-700 text-[18px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]"
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        )}
        {
          role == "student" &&
          (
            <div>
               <div className="grid mb-8 mt-6 border bg-orange-100 border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
              <div className="flex flex-col md:flex-row m-8 rounded-lg bg-white border-b border-gray-200 rounded-tr-lg  dark:border-gray-700">
                <Image
                  src={lunch}
                  alt="MealTrain"
                  className="w-full h-96 md:h-auto object-cover md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg "
                />
                <div className="p-6 flex flex-col justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                   Get ready to eat home cooked food
                  </h5>
                  <p className="text-gray-700 text-base mb-4">
                    You can now eat delicious home made food anytime without any hassle. 
                  </p>
                </div>
              </div>
              <div className="flex flex-col m-8 md:flex-row  rounded-lg bg-white border-b border-gray-200 rounded-tr-lg  dark:border-gray-700">
                <Image
                  src={cook}
                  alt="MealTrain"
                  className="w-full h-96 md:h-auto object-cover md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg "
                />
                <div className="p-6 flex flex-col justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    No more stress to cook
                  </h5>
                  <p className="text-gray-700 text-base mb-4">
                    You can now relax and concentrate on your studies as   your food is one click away. 
                                        
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center font-bold">
              <button
                onClick={navigateToDashboard}
                className="p-2 w-[200px]   font-700 text-[18px] text-white transition-colors duration-200 transform bg-[#f5b011] rounded-md hover:bg-[#d36a19] focus:outline-none focus:bg-[#d36a19]"
              >
                Go To Dashboard
              </button>
            </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UserInfoCompleted;
