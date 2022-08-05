import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { TaskifyInput } from "../../components/inputs";
import { TaskifyBtn } from "../../components/buttons";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { apis } from "../../utils/apis";
import { User } from "../../utils/user";
import { errorHandler } from "../../utils/tools";

const defaultError = {
  repeatPassword: "",
  password: "",
  username: "",
  email: "",
};

export default function CardForm() {
  const [error, setError] = React.useState(defaultError);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const redirectToLoginPage = () => {
    router.push("/login");
  };

  const redirectToHomePage = () => {
    router.push("/");
  };

  const handleOnChangeEmail = (e) => {
    const newError = { ...error };
    newError.email = "";
    setError(newError);
    setEmail(e.target.value);
  };

  const handleOnChangeUsername = (e) => {
    const newError = { ...error };
    newError.username = "";
    setError(newError);
    setUsername(e.target.value);
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    const newError = { ...defaultError };
    if (username?.trim()?.length === 0) {
      newError.username = "Username required.";
    }
    if (email?.trim()?.length === 0) {
      newError.email = "Email required.";
    }
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
      return setError(newError);
    }
    try {
      const response = await apis.auth.signup({ username, password, email });
      const userInstance = new User();
      userInstance.setUserData(response.data.user);
      userInstance.setToken(response.data.access_token);
      toast("Signed up successfully.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (e) {
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
            mt={5}
            flexDirection={"column"}
            alignItems={"center"}
            position={"relative"}
          >
            <Box
              onClick={redirectToHomePage}
              position={"absolute"}
              left={25}
              sx={{ cursor: "pointer" }}
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
              Sign up to Taskify
            </Typography>
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
              USERNAME
            </Typography>
            <TaskifyInput
              placeholder="Username"
              value={username}
              onChange={handleOnChangeUsername}
              sx={!!error.username?.trim() ? { borderColor: "red" } : {}}
            />
            {!!error.username?.trim() && (
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
                {error.username}
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
              EMAIL
            </Typography>
            <TaskifyInput
              value={email}
              onChange={handleOnChangeEmail}
              sx={!!error.email?.trim() ? { borderColor: "red" } : {}}
              type="email"
              placeholder="Email address"
            />
            {!!error.email?.trim() && (
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
                {error.email}
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
            mt={2.5}
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
                  Sign up
                </Typography>
              }
            />
          </Grid>
          <Grid
            item={true}
            container={true}
            mt={1}
            justifyContent={"center"}
            px={4}
            flexWrap={true}
            height={54}
          >
            <Typography
              variant="subtitle2"
              fontSize={14}
              fontWeight={400}
              textAlign={"center"}
            >
              Don&apos;t have an account?
              <span
                style={{
                  marginLeft: 8,
                  cursor: "pointer",
                  color: "#3751FF",
                  fontWeight: 600,
                }}
                onClick={redirectToLoginPage}
              >
                Login
              </span>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
