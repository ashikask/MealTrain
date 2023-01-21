import { useDispatch, useSelector } from "react-redux";
import { MyThunkDispatch, logoutHandler } from "../../../store/store.ts";
import { logout } from "../../../store/auth";
import { useRouter } from "next/router";
import { unwrapResult } from "@reduxjs/toolkit";
import { AiOutlineLogout } from "react-icons/ai";
import Header from '../components/Header';
import { Grid, GridItem } from "@chakra-ui/react";
import { Fragment } from "react";
import classes from './ProfileLayout.module.scss';

const ProfileLayout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loggedInUser = useSelector((state) => state.authReducer.user);

  const logOut = async () => {
    try {
      const logOutObj = {
        userAccountId: loggedInUser.id,
      };
      const data = await dispatch(logout(logOutObj));
      const result = unwrapResult(data);
      dispatch(logoutHandler());
      router.push("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
    <div>
      <Grid
        templateAreas={`
                "header header"
                "main main"`}
        gridTemplateRows={"62px 1fr"}
        gridTemplateColumns={"1fr"}
        h="99vh"
        gap="0"
        m={0}
        
      >
        <GridItem
          className="fixed w-[100%]"
          pl="4"
          bg="#620A15"
          area={"header"}
          pt="15px"
          pb="20px"
          zIndex={1000}
        >
          <Header className="z-10" />
        </GridItem>
        <GridItem bg="#FFFFFF" pl="2" area={"main"} className={classes.container}>
          {props.children}
        </GridItem>
      </Grid>
    </div>
  </Fragment>
  );
};

export default ProfileLayout;
