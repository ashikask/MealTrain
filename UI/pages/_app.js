import "../styles/globals.scss";
// import type { AppProps } from "next/app";
import { wrapper } from "../store/store.ts";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import DefaultLayout from "../components/DefaultLayout";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { makeStore } from "../store/store.ts";

const theme = extendTheme({
  components: {
    Steps,
  },
});
function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || DefaultLayout;
  // const persistor = persistStore(makeStore());
  return (
    <ChakraProvider theme={theme}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </PersistGate> */}
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
// export default MyApp;
