import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import 'antd/dist/antd.css';
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
