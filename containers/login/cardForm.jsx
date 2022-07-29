import * as React from "react";
import Image from "next/image";
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
import { apis } from "../../utils/apis";
import { User } from "../../utils/user";
import { errorHandler } from "../../utils/tools";
import { toast } from "react-toastify";

const defaultError = {
  password: "",
  username: "",
};

export default function CardForm() {
  const [error, setError] = React.useState(defaultError);
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const redirectToSignupPage = () => {
    router.push("/signup");
  };

  const redirectToForgotPasswordPage = () => {
    router.push("/forgot");
  };

  const redirectToHomePage = () => {
    router.push("/");
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    const newError = { ...defaultError };
    if (username?.trim()?.length === 0) {
      newError.username = "Username or email required.";
    }
    if (password?.trim()?.length === 0) {
      newError.password = "Password required.";
    }
    if (Object.values(newError).filter((el) => !!el?.trim()).length !== 0) {
      return setError(newError);
    }
    try {
      const response = await apis.auth.login({
        credential:username,
        password,
      });
      const userInstance = new User();
      userInstance.setUserData(response.data.user);
      userInstance.setToken(response.data.access_token);
      toast("Signed in successfully.", {
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
      <Grid container={true}>
        <form onSubmit={handleOnSubmit}>
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
            <Box position={"relative"} width={55} height={55}>
              <Image src={"/icon.svg"} layout={"fill"} alt="icon.svg" />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              fontSize={19}
              mt={1}
            >
              Taskify
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              fontSize={24}
              mt={3}
            >
              Welcome to Taskify
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={14}
              fontWeight="normal"
              mb={0}
            >
              Enter your email and password below
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
              USERNAME
            </Typography>
            <TaskifyInput
              placeholder="Email address or Username"
              value={username}
              sx={!!error.username?.trim() ? { borderColor: "red" } : {}}
              onChange={handleOnChangeUsername}
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
            mt={3}
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
              onChange={handleOnChangePassword}
              sx={!!error.password?.trim() ? { borderColor: "red" } : {}}
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
            <Box
              m="0"
              p="0"
              display={"flex"}
              justifyContent={"end"}
              width={"100%"}
            >
              <Typography
                textAlign={"right"}
                width={"100%"}
                fontSize={10}
                variant="subtitle2"
              >
                <span
                  onClick={redirectToForgotPasswordPage}
                  style={{ cursor: "pointer" }}
                >
                  Forgot password?
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item={true}
            container={true}
            mt={2}
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
                  Log In
                </Typography>
              }
            />
          </Grid>
          <Grid
            item={true}
            container={true}
            mt={2}
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
                onClick={redirectToSignupPage}
              >
                Sign Up
              </span>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
}
