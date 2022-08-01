import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { TaskifyBtn } from "./buttons";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

function MobileBtns() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display={"flex"} alignItems="center">
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ "&:hover": { backgroundColor: "inherit" } }}
        >
          <Link href={"/signup"}>
            <TaskifyBtn
              width="130px"
              color={"#1976D2"}
              // onClick={handleOnSubmit}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={16}
                  fontWeight={700}
                  color="white"
                >
                  Sign up
                </Typography>
              }
            />
          </Link>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ "&:hover": { backgroundColor: "inherit" } }}
        >
          <Link href={"/login"}>
            <TaskifyBtn
              width="130px"
              color="white"
              // onClick={handleClickClose}
              borderColor={"#1976D2"}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={16}
                  fontWeight={700}
                  color="#1976D2"
                >
                  Login
                </Typography>
              }
            />
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default function Navbar() {
  return (
    <Box
      bgcolor={"#FFFFFF"}
      borderBottom="1px solid #D9D9D9"
      py={2}
      px={{ xs: 2, sm: 7 }}
      display={"flex"}
      justifyContent="space-between"
    >
      <Grid container flexWrap="nowrap" alignItems={"center"}>
        <Grid item>
          <Box position={"relative"} width={50} height={50}>
            <Image src={"/icon.svg"} layout={"fill"} alt="icon.svg" />
          </Box>
        </Grid>
        <Grid item overflow={"hidden"}>
          <Typography
            fontWeight={700}
            variant="subtitle1"
            textOverflow={"ellipsis"}
            overflow="hidden"
            ml={1}
            fontSize={"24px"}
            noWrap={true}
            textAlign="center"
          >
            Taskify
          </Typography>
        </Grid>
      </Grid>
      <Box
        display={{ xs: "none", sm: "flex" }}
        flexWrap="nowrap"
        columnGap={2}
        rowGap={2}
      >
        <Link href={"/signup"}>
          <TaskifyBtn
            width="130px"
            color={"#1976D2"}
            // onClick={handleOnSubmit}
            title={
              <Typography
                variant="subtitle1"
                fontSize={16}
                fontWeight={700}
                color="white"
              >
                Sign up
              </Typography>
            }
          />
        </Link>
        <Link href={"/login"}>
          <TaskifyBtn
            width="130px"
            color="white"
            // onClick={handleClickClose}
            borderColor={"#1976D2"}
            title={
              <Typography
                variant="subtitle1"
                fontSize={16}
                fontWeight={700}
                color="#1976D2"
              >
                Login
              </Typography>
            }
          />
        </Link>
      </Box>
      <Box display={{ xs: "flex", sm: "none" }}>
        <MobileBtns />
      </Box>
    </Box>
  );
}
