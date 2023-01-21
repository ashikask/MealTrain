import { Fragment } from "react";
import classes from "./NavBar.module.scss";
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
import { formStageAction } from "../../store/user-profile-slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { logoutHandler } from "../../store/store.ts";
import { logout } from "../../store/auth.ts";
import { unwrapResult } from "@reduxjs/toolkit";

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authReducer.user);
  const userDetails = useSelector((state) => state.userProfileReducer.user);

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
      router.push("/auth/login");
      dispatch(logoutHandler());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.verticalAlign}>
      {/* <li>Orders</li>
      <div>This is Nav Bar</div> */}
      <Box
        alignItems="center"
        className="grid grid-cols-3 justify-items-center hover:cursor-pointer"
      >
        <BsList
          onClick={onOpen}
          size={30}
          color="white"
          className="place-self-start"
        />
        <div className="text-[25px] text-white text-xl place-self-center span=cols-2 pr-18 font-Pacifico">
          MealTrain
        </div>
        <div
          className="flex flex-nowrap hover:cursor-pointer text-[30px] text-white text-lg font-semibold place-self-end span=cols-2 pr-6 items-center"
          onClick={logOut}
        >
          <div className="px-2">
            <AiOutlineLogout size={20} />
          </div>
          <div> Logout</div>
        </div>
      </Box>
      <Box>
        <Drawer
          size="xs"
          placement="left"
          onClose={onClose}
          isOpen={isOpen}
          z-index={1001}
        >
          <DrawerOverlay />
          <DrawerContent w="5%" maxW="250px">
            <DrawerHeader
              borderBottomWidth="2px"
              className="flex flex-row items-center"
            >
              <div>
                <img
                  className="h-[50px] object-fill aspect-square rounded-full"
                  src={userDetails.imagePath}
                />
              </div>
              <div className="p-3 text-[20px]">{userDetails.name}</div>
            </DrawerHeader>
            <DrawerBody p={0} m={0}>
              <ul className="flex flex-col justify-start">
                <li className={classes.navItem} onClick={onClose}>
                  <Link className={classes.navLink} href="/provider">
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FcHome size={25} />
                      </div>
                      <div className="p-3 text-[20px]">Home</div>
                      <div />
                    </div>
                  </Link>
                </li>
                <li className={classes.navItem} onClick={onClose}>
                  <Link className={classes.navLink} href="/provider/offering">
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FcInspection size={25} />
                      </div>
                      <div className="p-3 text-[20px] ">Offerings</div>
                      <div />
                    </div>
                  </Link>
                </li>
                <li className={classes.navItem} onClick={onClose}>
                  <Link className={classes.navLink} href="/provider/profile">
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FcManager size={25} />
                      </div>
                      <div className="p-3 text-[20px]">Profile</div>
                      <div />
                    </div>
                  </Link>
                </li>
                {/* <li className={classes.navItem} onClick={onClose}>
                  <Link className={classes.navLink} href="/provider/calender">
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FcCalendar size={25} />
                      </div>
                      <div className="p-3 text-[20px]">Calender</div>
                      <div />
                    </div>
                  </Link>
                </li> */}
                <li className={classes.navItem} onClick={onClose}>
                  <Link
                    className={
                      classes.navLink + classes.navLast + " justify-end"
                    }
                    href="#"
                  >
                    <div className="flex flex-row flex-nowrap" onClick={logOut}>
                      <div className="p-3">
                        <AiOutlineLogout size={25} />
                      </div>
                      <div className="p-3 text-[20px]">Logout</div>
                      <div />
                    </div>
                  </Link>
                </li>
              </ul>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </div>
  );
}

export default NavBar;
