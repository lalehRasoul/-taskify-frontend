import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CircularProgress, Grid } from "@mui/material";
import { TaskifyInput } from "../../components/inputs";
import { TaskifyBtn } from "../../components/buttons";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import { apis } from "../../utils/apis";
import { toast } from "react-toastify";
import { errorHandler } from "../../utils/tools";

const defaultError = {
  email: "",
};

export default function CardForm() {
  const [error, setError] = React.useState(defaultError);
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const router = useRouter();

  const redirectToLoginPage = () => {
    router.push("/login");
  };

  const redirectToHomePage = () => {
    router.push("/");
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (submitted) {
      return toast("Your request sent. please wait.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
    }
    setError(defaultError);
    const newError = { ...defaultError };
    if (email?.trim()?.length === 0) {
      newError.email = "Email required.";
    }
    if (Object.values(newError).filter((el) => !!el?.trim()).length !== 0) {
      setSubmitted(false);
      return setError(newError);
    }
    try {
      toast("Your request sent. please wait.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
      await apis.auth.recovery({ credential: email });
      toast("Email sent.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
      setSent(true);
    } catch (e) {
      setSubmitted(false);
      errorHandler(e);
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <form onSubmit={handleOnSubmit}>
        <Grid container={true} display={sent ? "block" : "none"}>
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
              onClick={redirectToHomePage}
            >
              <ArrowBackIosNewIcon color="action" fontSize="small" />
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              fontSize={{ md: 24, xs: 16, sm: 20 }}
            >
              Email Sent
            </Typography>
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
            <Typography variant="subtitle1" fontWeight={"bold"} fontSize={18}>
              Check your email. If it&apos;s invisible, check your spam box.
            </Typography>
          </Grid>
          <Grid
            item={true}
            container={true}
            mt={9}
            mb={3}
            justifyContent={"start"}
            px={4}
            flexWrap={true}
            height={54}
          >
            <TaskifyBtn
              onClick={redirectToHomePage}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={14}
                  fontWeight={600}
                  color="white"
                >
                  Back to home page
                </Typography>
              }
            />
          </Grid>
        </Grid>
        <Grid container={true} display={sent ? "none" : "block"}>
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
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              fontSize={{ md: 24, xs: 16, sm: 20 }}
            >
              Forgot Password
            </Typography>
            <Box position={"relative"} width={230} height={272}>
              <Image
                src={"/images/forgot.svg"}
                layout={"fill"}
                alt="icon.svg"
              />
            </Box>
          </Grid>
          <Grid
            item={true}
            container={true}
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
              onChange={handleOnChangeEmail}
              value={email}
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
            <Typography
              width={"100%"}
              fontWeight={400}
              fontSize={11}
              lineHeight={"20px"}
              letterSpacing={0.3}
              variant="subtitle2"
              color={"#9A9A9A"}
              mt={1}
            >
              Enter your email address to send you verification email.
            </Typography>
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
                  padding={2}
                >
                  {submitted ? (
                    <CircularProgress size={30} sx={{ color: "#FFFFFF" }} />
                  ) : (
                    "Send an Email"
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
