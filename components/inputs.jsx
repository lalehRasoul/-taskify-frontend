import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const TaskifyInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "#4B506D",
  lineHeight: 20,
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
