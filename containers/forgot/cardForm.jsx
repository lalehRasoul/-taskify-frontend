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
  const router = useRouter();

  const redirectToLoginPage = () => {
    router.push("/login");
  };

  return (
    <Card sx={{ width: "100%" }}>
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
          <Typography
            variant="subtitle2"
            fontWeight={"bold"}
            fontSize={{ md: 24, xs: 16, sm: 20 }}
          >
            Forgot Password
          </Typography>
          <Box position={"relative"} width={230} height={272}>
            <Image src={"/images/forgot.svg"} layout={"fill"} alt="icon.svg" />
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
          <TaskifyInput type="email" placeholder="Email address" />
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
            title={
              <Typography
                variant="subtitle1"
                fontSize={14}
                fontWeight={600}
                color="white"
              >
                Send an Email
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Card>
  );
}