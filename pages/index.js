import { Box, Grid, Typography } from "@mui/material";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <Box overflow={"hidden !important"} height="100vh">
      <Navbar />
      <Box zIndex={2} position="absolute" top={90} width={"100%"}>
        <Box
          display={"flex"}
          justifyContent="center"
          width={"100%"}
          alignItems="end"
          flexWrap={"wrap"}
          px={3}
        >
          <Box width={"100%"} display={"flex"} justifyContent="center">
            <Typography
              maxWidth={"700px"}
              variant="subtitle1"
              fontSize={"54px"}
              fontWeight={700}
              textAlign="center"
            >
              Organize your{" "}
              <p style={{ padding: 0, margin: 0 }}>tasks and works, Finally</p>
            </Typography>
          </Box>
          <Box width={"100%"} display={"flex"} justifyContent="center">
            <Typography
              maxWidth={"700px"}
              variant="subtitle1"
              fontSize={"30px"}
              fontWeight={400}
              textAlign="center"
            >
              Become focused, organized, and calm with Taskify. Taskify helps
              you to be accurate and organize!
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <img
        style={{
          zIndex: 0,
          position: "absolute",
          bottom: "-100px",
          left: "10%",
        }}
        width={"1326.34px"}
        src={"/images/home/circle-botton.svg"}
        layout={"fill"}
        alt="circle-botton.svg"
      /> */}
      <img
        style={{ zIndex: 1, position: "absolute", bottom: "-100px", left: 0 }}
        width={"100%"}
        src={"/images/home/home-botton.svg"}
        layout={"fill"}
        alt="home-botton.svg"
      />
      <Box zIndex={2} position="absolute" bottom={0} width={"100%"}>
        <Box
          display={"flex"}
          justifyContent="center"
          width={"100%"}
          alignItems="end"
        >
          <Box display={{ lg: "block", xs: "none" }}>
            <img
              src={"/images/home/person1.svg"}
              layout={"fill"}
              alt="person1.svg"
            />
          </Box>
          <Box display={{ sm: "block", xs: "none" }}>
            <img
              width={"100%"}
              src={"/images/home/home-sample.svg"}
              layout={"fill"}
              alt="home-sample.svg"
            />
          </Box>
          <Box display={{ lg: "block", xs: "none" }}>
            <img
              src={"/images/home/person2.svg"}
              layout={"fill"}
              alt="person2.svg"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
