import { Fragment } from "react";
import classes from "./NavBar.module.scss";
import Link from "next/link";
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
import { logoutHandler } from "../../store/store.ts";
import { logout } from "../../store/auth";
import { useRouter } from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";
import { formStageAction } from "../../store/user-profile-slice";
import { AiOutlineLogout } from "react-icons/ai";
import {
  FiHome,
  FiShoppingCart,
  FiBell,
  FiInfo,
  FiPower,
  FiFileText,
} from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import StudentNavCartItems from "./StudentNavCartItems";
import { fetchStudentcart } from "../../store/student-cart-actions";

function NavBar() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const loggedInUser = useSelector((state) => state.authReducer.user);
  const businessImage = useSelector(
    (state) => state.userProfileReducer.user.imagePath
  );
  const firstname = useSelector(
    (state) => state.userProfileReducer.user.firstname
  );
  const lastname = useSelector(
    (state) => state.userProfileReducer.user.lastname
  );
  const studentId = useSelector(
    (state) => state.userProfileReducer.user.studentId
  );

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
  const updateDetails = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        formStageAction(1) // update formStage
      );
      router.push("/user/student");
    } catch (error) {
      console.log(error);
    }
  };
  const cartDetails = useSelector((state) => state.studentCartInfo.cartInfo);

  useEffect(() => {
    dispatch(fetchStudentcart(studentId));
  }, [dispatch]);

  return (
    <div className={classes.verticalAlign}>
      <Box
        alignItems="center"
        className="grid grid-cols-3 justify-items-center"
      >
        <BsList
          onClick={onOpen}
          size={25}
          color="white"
          className="place-self-start"
        />
        <div className="text-white text-3xl place-self-center span=cols-2 pr-18 font-Pacifico">
          MealTrain
        </div>

        <div className="flex flex-row place-self-end ">
          <Popover placement="top-start">
            <PopoverTrigger>
              <button
                className="relative float-right border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                aria-label="Cart"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 26 26"
                  stroke="white"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span className="absolute inset-0 object-right-top -mr-9">
                  <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading- bg-red-500 text-white">
                    {cartDetails != undefined ? cartDetails.cartItem.length : 0}
                  </div>
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <StudentNavCartItems
                  cartDetails={cartDetails}
                  classes=""
                  studentId={studentId}
                ></StudentNavCartItems>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <div
            className="flex py-2 px-5 text-white  hover:cursor-pointer"
            onClick={logOut}
          >
            <div className="px-2">
              <AiOutlineLogout size={20} />
            </div>
            <div> Logout</div>
          </div>
        </div>
      </Box>
      <Box>
        <Drawer size="xs" placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent w="1%" maxW="275px">
            <DrawerHeader
              borderBottomWidth="2px"
              className="flex flex-row items-center justify-around"
            >
              <div>
                <img
                  className="h-[50px] object-fill aspect-square rounded-full"
                  src={businessImage}
                />
              </div>
              <div className="p-3 text-[20px]">
                {" "}
                {`${firstname} ${lastname}`}
              </div>
            </DrawerHeader>
            <DrawerBody p={0}>
              <ul>
                <li className={classes.navItem} onClick={onClose}>
                  <Link className={classes.navLink} href="/student/">
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FiHome size={20} />
                      </div>
                      <div className="py-2 text-[18px]">Home</div>
                      <div />
                    </div>
                  </Link>
                </li>
                <li className={classes.navItem} onClick={onClose}>
                  <Link className={classes.navLink} href="/student/orders">
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FiShoppingCart size={20} />
                      </div>
                      <div className="py-2 text-[18px]">My Orders</div>
                      <div />
                    </div>
                  </Link>
                </li>
                {/* <li className={classes.navItem} onClick={onClose}>
                  <Link
                    className={classes.navLink}
                    href="/student/notifications"
                  >
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FiBell size={20} />
                      </div>
                      <div className="py-2 text-[18px]">Notifications</div>
                      <div />
                    </div>
                  </Link>
                </li> */}
                {/* <li className={classes.navItem} onClick={onClose}>
                  <Link className={classes.navLink} href="/student/expense">
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FiFileText size={20} />
                      </div>
                      <div className="py-2 text-[18px]">Expense Report</div>
                      <div />
                    </div>
                  </Link>
                </li> */}

                <li className={classes.navItem}>
                  <Link
                    onClick={(e) => updateDetails(e)}
                    href="#"
                    className={classes.navLink}
                  >
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FiInfo size={20} />
                      </div>
                      <div className="py-2 text-[18px]">Account Info</div>
                      <div />
                    </div>
                  </Link>
                </li>

                <li className={classes.navItem} onClick={logOut}>
                  <Link href="#" className={classes.navLink}>
                    <div className="flex flex-row flex-nowrap">
                      <div className="p-3">
                        <FiPower size={20} />
                      </div>
                      <div className="py-3 text-[18px]">Logout</div>
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
