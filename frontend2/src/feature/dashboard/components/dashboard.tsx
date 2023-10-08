import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../controllers/userController";
import { useLoginStore } from "../../user-auth/controller/loginController";
import { useRegistrationStore } from "../../user-auth/controller/registrationController";

export function Dashboard() {
  const naviagte = useNavigate();

  const updateName = useUserStore((state) => state.updateName);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);

  const updateEmailLogin = useLoginStore((state) => state.updateEmail);
  const updatePasswordLogin = useLoginStore((state) => state.updatePassword);

  const updateNameSign = useRegistrationStore((state) => state.updateName);
  const updatePasswordSign = useRegistrationStore(
    (state) => state.updatePassword
  );
  const updateConfirmPasswordSign = useRegistrationStore(
    (state) => state.updateConfirmPassword
  );
  const updateRoleSign = useRegistrationStore((state) => state.updateRole);
  const updateEmailSign = useRegistrationStore((state) => state.updateEmail);

  useEffect(() => {
    const token: string = sessionStorage.getItem("token")!;
    if (!!!token) {
      console.log("saDHasdjknads");
      naviagte("/login");
    }
    if (!!token) {
      console.log(token);
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));
      console.log(userInfo);

      updateName(userInfo.name);
      updateAddress(userInfo.address);
      updateRole(userInfo.role);
      updateDob(userInfo.dob);
      updateSkills(userInfo.skills);
      updatePhonenumber(userInfo.phonenumber);
      updateId(userInfo._id);
      updateAvailability(userInfo.availability);
      updateGender(userInfo.gender);
      updateHours(userInfo.hours);
      updateIsLoggedIn(true);

      updateEmailLogin("");
      updatePasswordLogin("");

      updateNameSign("");
      updatePasswordSign("");
      updateConfirmPasswordSign("");
      updateRoleSign("Manager");
      updateEmailSign("");
    }
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
    </>
  );
}
