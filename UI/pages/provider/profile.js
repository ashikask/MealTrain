import DashboardLayout from "../../components/provider/Layouts/DashboardLayout.js";
import ProfileSection from "../../components/provider/ProfileSection.js";
function Profile(props) {
  return (
    <div>
      <ProfileSection></ProfileSection>
    </div>
  );
}

Profile.layout = DashboardLayout;

export default Profile;
