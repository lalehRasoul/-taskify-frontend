import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Box, IconButton, InputAdornment, MenuItem } from "@mui/material";
import { Card } from "@mui/material";
import { TableRowEditMode } from "../../components/dashboard/tableRow";
import { TaskifyInput } from "../../components/inputs";
import { errorHandler } from "../../utils/tools";
import { apis } from "../../utils/apis";
import { TaskifyBtn } from "../../components/buttons";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { projectSelectorState } from "../../store/selectors";
import { User } from "../../utils/user";
import { useRouter } from "next/router";

const defaultValues = {
  repeatPassword: "",
  username: "",
  password: "",
  email: "",
};

const defaultError = {
  repeatPassword: "",
  password: "",
  username: "",
  email: "",
};

const UserProfile = () => {
  const [error, setError] = React.useState(defaultError);
  const [fields, setFields] = useState(defaultValues);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  const router = useRouter();
  const handleOnChangeEditFields = (e, prop) => {
    const newEditFields = { ...fields };
    newEditFields[prop] = e.target.value;
    if (prop === "checked") {
      newEditFields[prop] = e.target.value === "done" ? true : false;
    }
    setFields(newEditFields);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError(defaultError);
    const newError = { ...defaultError };
    if (fields.username?.trim()?.length === 0) {
      newError.username = "Username required.";
    }
    if (fields.email?.trim()?.length === 0) {
      newError.email = "Email required.";
    }
    if (fields.password?.trim()?.length === 0) {
      newError.password = "Password required.";
    }
    if (fields.repeatPassword?.trim()?.length === 0) {
      newError.repeatPassword = "Password repeat required.";
    }
    if (fields.password !== fields.repeatPassword) {
      newError.password = "Password and repeat password inputs are not same.";
    }
    if (Object.values(newError).filter((el) => !!el?.trim()).length !== 0) {
      return setError(newError);
    }
    try {
      const { username, password, email } = fields;
      await apis.user.updateProfile({ username, password, email });
      const userInstance = new User();
      userInstance.logout();
      toast("updated successfully.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (e) {
      errorHandler(e);
    }
  };
  const handleOnDeleteAccount = async () => {
    try {
      await apis.user.deleteAccount();
      const userInstance = new User();
      userInstance.logout();
      toast("Deleted successfully.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "success",
      });
      setTimeout(() => {
        router.push("/signup");
      }, 2000);
    } catch (e) {
      errorHandler(e);
    }
  };
  useEffect(() => {
    const userInstance = new User();
    const userData = userInstance.getUserData();
    if (!userData) return router.push("/login");
    const data = { ...defaultValues };
    console.log(userData);
    if (!!userData.username) data.username = userData.username;
    if (!!userData.email) data.email = userData.email;
    setFields(data);
  }, []);
  return (
    <Card sx={{ paddingX: 5, paddingY: 4, mx: 7, my: 9 }}>
      <Typography
        variant="subtitle2"
        fontSize={"32px"}
        fontWeight={700}
        lineHeight={"40.16px"}
        letterSpacing="0.4"
        mb={5}
      >
        Profile
      </Typography>
      <form>
        <table>
          <TableRowEditMode
            property={"Username:"}
            placeholder="Username"
            nativePropName="username"
            helper={
              !!error.username?.trim() ? (
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
              ) : (
                <div></div>
              )
            }
            inputSX={!!error.username?.trim() ? { borderColor: "red" } : {}}
            sx={!!error.username?.trim() ? { borderColor: "red" } : {}}
            value={fields.username}
            onChange={handleOnChangeEditFields}
          />

          <TableRowEditMode
            property={"Email:"}
            placeholder="Email address"
            nativePropName="email"
            helper={
              !!error.email?.trim() ? (
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
              ) : (
                <div></div>
              )
            }
            inputSX={!!error.email?.trim() ? { borderColor: "red" } : {}}
            value={fields.email}
            onChange={handleOnChangeEditFields}
          />
          <TableRowEditMode
            property={"Password:"}
            placeholder="New password"
            nativePropName="password"
            inputType={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            helper={
              !!error.password?.trim() ? (
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
              ) : (
                <div></div>
              )
            }
            inputSX={!!error.password?.trim() ? { borderColor: "red" } : {}}
            value={fields.password}
            onChange={handleOnChangeEditFields}
          />
          <TableRowEditMode
            property={"Repeat Password:"}
            placeholder="Repeat new password"
            inputType={showRepeatPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowRepeatPassword}
                >
                  {!showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            helper={
              !!error.repeatPassword?.trim() ? (
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
              ) : (
                <div></div>
              )
            }
            nativePropName="repeatPassword"
            inputSX={
              !!error.repeatPassword?.trim() ? { borderColor: "red" } : {}
            }
            value={fields.repeatPassword}
            onChange={handleOnChangeEditFields}
          />
        </table>
        <Box pr={1.5} py={2} display={"flex"} justifyContent="space-between">
          <Box>
            <TaskifyBtn
              width="130px"
              color={"#B02761"}
              onClick={handleOnDeleteAccount}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={16}
                  fontWeight={700}
                  color="white"
                >
                  Delete
                </Typography>
              }
            />
          </Box>
          <Box>
            <TaskifyBtn
              width="130px"
              color="white"
              onClick={() => {
                setFields(defaultValues);
              }}
              borderColor={"#1976D2"}
              sx={{ marginRight: 3 }}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={16}
                  fontWeight={700}
                  color="#1976D2"
                >
                  Clear
                </Typography>
              }
            />
            <TaskifyBtn
              width="130px"
              color={"#1976D2"}
              onClick={handleOnSubmit}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={16}
                  fontWeight={700}
                  color="white"
                >
                  Submit
                </Typography>
              }
            />
          </Box>
        </Box>
      </form>
    </Card>
  );
};

export default UserProfile;
