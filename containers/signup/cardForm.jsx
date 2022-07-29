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

export default function CardForm() {
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

  return (
    <Card sx={{ width: "100%" }}>
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
          <Box position={"relative"} width={55} height={55}>
            <Image src={"/icon.svg"} layout={"fill"} alt="icon.svg" />
          </Box>
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
          <TaskifyInput placeholder="Username" />
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
          <TaskifyInput type="email" placeholder="Email address" />
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
    </Card>
  );
}
