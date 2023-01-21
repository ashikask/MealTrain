import { Grid, GridItem } from "@chakra-ui/react";
import { Fragment } from "react";
import NavBar from "../NavBar";
import { ProviderFilter } from "../ProviderFilter";

function DashboardLayout(props) {
  return (
    <Fragment>
      <div className="font-Roboto">
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
          <GridItem pl="4" bg="#620A15" area={"header"} pt="15px" className="sticky top-0 z-50">
            <NavBar />
          </GridItem>
          <GridItem bg="#F0EAE3" pl="2" area={"main"}>
            {props.children}
          </GridItem>
        </Grid>
      </div>
    </Fragment>
  );
}

export default DashboardLayout;
