import { Grid, GridItem } from "@chakra-ui/react";
import { Fragment } from "react";
import NavBar from "../NavBar";

function DashboardLayout(props) {
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
          fontWeight="bold"
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
            <NavBar className="z-10" />
          </GridItem>
          <GridItem bg="#FFFFFF" pl="0" area={"main"}>
            {props.children}
          </GridItem>
        </Grid>
      </div>
    </Fragment>
  );
}

export default DashboardLayout;
