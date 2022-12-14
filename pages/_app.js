import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import { ToastContainer } from "react-toastify";
import { RecoilRoot, useRecoilValue } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
