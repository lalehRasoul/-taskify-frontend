import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { TaskifyInput } from "../../components/inputs";
import { TaskifyBtn } from "../../components/buttons";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { apis } from "../../utils/apis";
import { toast } from "react-toastify";
import { User } from "../../utils/user";
import { errorHandler } from "../../utils/tools";

const defaultError = {
  repeatPassword: "",
  password: "",
};

export default function CardForm() {
  const [error, setError] = React.useState(defaultError);
  const [submitted, setSubmitted] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const router = useRouter();
  const { rcode } = router.query;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOnChangePassword = (e) => {
    const newError = { ...error };
    newError.password = "";
    setError(newError);
    setPassword(e.target.value);
  };

  const handleOnChangeRepeatPassword = (e) => {
    const newError = { ...error };
    newError.repeatPassword = "";
    setError(newError);
    setRepeatPassword(e.target.value);
  };

  const redirectToLoginPage = () => {
    router.push("/");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    setSubmitted(true);
    if (submitted) {
      return toast("Your request sent. please wait.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
    }
    const newError = { ...defaultError };
    if (password?.trim()?.length === 0) {
      newError.password = "Password required.";
    }
    if (repeatPassword?.trim()?.length === 0) {
      newError.repeatPassword = "Password repeat required.";
    }
    if (password !== repeatPassword) {
      newError.password = "Password and repeat password inputs are not same.";
    }
    if (Object.values(newError).filter((el) => !!el?.trim()).length !== 0) {
      setSubmitted(false);
      return setError(newError);
    }
    try {
      await apis.auth.submitNewRecoveryPassword(rcode, { password });
      toast("Password updated.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
      setTimeout(() => {
        setSubmitted(false);
        router.push("/login");
      }, 2000);
    } catch (e) {
      setSubmitted(false);
      errorHandler(e);
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <form onSubmit={handleOnSubmit}>
        <Grid container={true}>
          <Grid
            item={true}
            container={true}
            mt={4}
            flexDirection={"column"}
            alignItems={"center"}
            position={"relative"}
          >
            <Box
              position={"absolute"}
              left={25}
              top={9}
              sx={{ cursor: "pointer" }}
              onClick={redirectToLoginPage}
            >
              <ArrowBackIosNewIcon color="action" fontSize="small" />
            </Box>
            <img width={55} height={55} src={"/icon.svg"} alt="icon.svg" />
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              fontSize={19}
              mt={1}
            >
              Recovery Password
            </Typography>
          </Grid>
          <Grid
            item={true}
            container={true}
            mt={5}
            justifyContent={"start"}
            px={4}
            flexWrap={true}
          >
            <Typography
              width={"100%"}
              fontWeight={"bold"}
              fontSize={12}
              mb={1}
              variant="subtitle2"
            >
              PASSWORD
            </Typography>
            <TaskifyInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              sx={!!error.password?.trim() ? { borderColor: "red" } : {}}
              onChange={handleOnChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!!error.password?.trim() && (
              <Typography
                width={"100%"}
                fontWeight={400}
                fontSize={11}
                lineHeight={"20px"}
                letterSpacing={0.3}
                variant="subtitle2"
                color={"red"}
                mt={0.5}
              >
                {error.password}
              </Typography>
            )}
          </Grid>
          <Grid
            item={true}
            container={true}
            mt={2}
            justifyContent={"start"}
            px={4}
            flexWrap={true}
          >
            <Typography
              width={"100%"}
              fontWeight={"bold"}
              fontSize={12}
              mb={1}
              variant="subtitle2"
            >
              RE-PASSWORD
            </Typography>
            <TaskifyInput
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repeat Password"
              value={repeatPassword}
              sx={!!error.repeatPassword?.trim() ? { borderColor: "red" } : {}}
              onChange={handleOnChangeRepeatPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRepeatPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {!showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!!error.repeatPassword?.trim() && (
              <Typography
                width={"100%"}
                fontWeight={400}
                fontSize={11}
                lineHeight={"20px"}
                letterSpacing={0.3}
                variant="subtitle2"
                color={"red"}
                mt={0.5}
              >
                {error.repeatPassword}
              </Typography>
            )}
          </Grid>
          <Grid
            item={true}
            container={true}
            mt={5}
            mb={3}
            justifyContent={"start"}
            px={4}
            flexWrap={true}
            height={54}
          >
            <TaskifyBtn
              type="submit"
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={14}
                  fontWeight={600}
                  color="white"
                >
                  {submitted ? (
                    <CircularProgress size={30} sx={{ color: "#FFFFFF" }} />
                  ) : (
                    "Submit"
                  )}
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
