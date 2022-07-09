import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigation = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigation("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
