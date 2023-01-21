import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfoForm from "../../components/user-profile/components/PersonalInfoForm";
import ProfileLayout from "../../components/user-profile/layout/ProfileLayout";
import classes from '../../components/user-profile/layout/ProfileLayout.module.scss';
import { MyThunkDispatch, OurStore } from "../../store/store";
import { getUserDetails } from "../../store/user-profile-slice";


const ProfileInfoForm = dynamic(() => import('../../components/user-profile/components/PersonalInfoForm'), {
  suspense: true,
})
const AddressInfoForm = dynamic(() => import('../../components/user-profile/components/AddressInfoForm'))

const UserInfoCompleted = dynamic(() => import('../../components/user-profile/components/UserInfoCompleted'), {
 
})




const UserProfile = () => {
  const router = useRouter();
  const dispatch: MyThunkDispatch = useDispatch();

  const pageStage = useSelector(
    (state: any) => state.userProfileReducer.formStage
  );
  const loggedInUser = useSelector((state: any) => state.authReducer.user);
  const userDetails = useSelector((state: any) => state.userProfileReducer.user);


  const { role }= router.query;

	// dispatching get user details on refresh
	useEffect(() => {
    if(userDetails.id){
      dispatch(getUserDetails(userDetails));
    }
	}, []);

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        

        <section>
          {/* Updating the progress bar on adding/removing components */}
          <div className={classes.progressbar}>
            <div
              className={
                pageStage === 1
                  ? classes.progressStep +" "+ classes.progressStepActive
                  : classes.progressStep
              }
              data-title="Personal Details"
            ></div>
            <div
              className={
                pageStage === 2
                  ? classes.progressStep +" "+ classes.progressStepActive
                  : classes.progressStep
              }
              data-title="Address Details"
            ></div>
            <div
              className={
                pageStage === 3
                  ? classes.progressStep +" "+ classes.progressStepActive
                  : classes.progressStep
              }
              data-title="Completed"
            ></div>
          </div>

          <div>
            {pageStage === 1 && (

              // Personal Details
              <div className={classes.wrap}>
                <PersonalInfoForm
                role={role}
                  previousButton={false} // show/hide previous button
                />
              </div>
            )}

            {pageStage === 2 && (
              
              // Address Details
              <div className={classes.wrap}>
                <AddressInfoForm
                  role={role}
                  previousButton={true}// show/hide previous button
                />
              </div>
            )}

            {pageStage === 3 && (

              // Completed Stage
              <div className={classes.wrap}>
                <UserInfoCompleted
                   role={role}
                  successMessage={
                    "Please verify your email address, you should have recieved an email from us already!"
                  } // page success message
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

UserProfile.layout = ProfileLayout;
export default UserProfile;
