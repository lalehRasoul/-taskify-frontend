import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Select, TextareaAutosize } from "@mui/material";
import { DatePicker } from "antd";
import moment from "moment";
import { taskifyTheme } from "../styles/theme";

export const TaskifyInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "#4B506D",
  lineHeight: "20px",
  letterSpacing: 0.3,
  borderRadius: 8,
  backgroundColor: "#FCFDFE",
  border: `1px solid #F0F1F7`,
  "& .MuiInputBase-input": {
    fontSize: 14,
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "Mulish",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 8,
      boxShadow: `${alpha(
        theme.palette.text.taskifyGreen.light,
        0.25
      )} 0 0 0 0.2rem`,
      borderColor: theme.palette.text.taskifyGreen.light,
    },
  },
}));

export const TaskifyTextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  color: "#4B506D",
  letterSpacing: 0.3,
  lineHeight: "20px",
  borderRadius: 8,
  backgroundColor: "#FCFDFE",
  outline: "none",
  border: `1px solid #F0F1F7`,
  padding: 5,
  fontSize: 14,
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    "box-shadow",
  ]),
  fontFamily: [
    "Mulish",
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:focus": {
    borderRadius: 8,
    boxShadow: `${alpha(
      theme.palette.text.taskifyGreen.light,
      0.25
    )} 0 0 0 0.2rem`,
    borderColor: theme.palette.text.taskifyGreen.light,
  },
}));

export const TaskifyDatePicker = ({ ...props }) => {
  return (
    <DatePicker
      style={{
        width: "100%",
        color: "#4B506D",
        lineHeight: "20px",
        letterSpacing: 0.3,
        borderRadius: 8,
        backgroundColor: "#FCFDFE",
        border: `1px solid #F0F1F7`,
        padding: 5,
        fontSize: 14,
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        fontFamily: [
          "Mulish",
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
          borderRadius: 8,
          boxShadow: `${alpha(
            taskifyTheme.green.light,
            0.25
          )} 0 0 0 0.2rem !important`,
          borderColor: `${taskifyTheme.green.light} !important`,
        },
      }}
      {...props}
    />
  );
};
