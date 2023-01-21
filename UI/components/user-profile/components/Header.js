import classes from "./Header.module.scss";
import Link from "next/link";
import { FcHome, FcInspection, FcManager, FcCalendar } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BsList } from "react-icons/bs";
import { formStageAction } from "../../../store/user-profile-slice";
import { useDispatch,useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../../store/auth.ts";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { unwrapResult } from "@reduxjs/toolkit";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authReducer.user);
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
  const logOut = async () => {
    try {
      const logOutObj = {
        userAccountId: loggedInUser.id,
      };
      const data = await dispatch(logout(logOutObj));
      const result = unwrapResult(data);
      toast.success("Logged Out successfully!" , { autoClose: 3000 })
      router.push("/auth/login");
      dispatch(logout);
    } catch (err) {
      // toast.error(err.error, { autoClose: 2000 }); 
      toast.error("Something went wrong. Please try again",{ autoClose: 2000 });
      console.log(err);
    }
  };
  return (
    <div className={classes.verticalAlign}>
      <ToastContainer />
      <Box
        alignItems="center"
        className="grid grid-cols-3 justify-items-center hover:cursor-pointer"
      >
        <div className="text-[17px] py-1  text-white place-self-start">{loggedInUser.username}</div>
        <div className="text-white text-3xl place-self-center span=cols-2 pr-18 font-Pacifico">
          MealTrain
        </div>
        <div  onClick={logOut} className="flex flex-nowrap hover:cursor-pointer  text-white text-xl place-self-end span=cols-2 pr-6 items-center">
          <div className="px-2">
            <AiOutlineLogout size={25} />
          </div>
          <div className="text-[17px]"> Logout</div>
        </div>
      </Box>
    
    </div>
  );
}

export default Header;
