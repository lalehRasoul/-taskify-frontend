import { Button } from "@mui/material";
import { taskifyTheme } from "../styles/theme";

export const TaskifyBtn = ({
  title,
  width = "100%",
  color = taskifyTheme.green.light,
  borderColor = color,
  sx = {},
}) => {
  return (
    <Button
      sx={{
        width,
        lineHeight: "20px",
        letterSpacing: "0.2px",
        backgroundColor: color,
        borderRadius: "8px",
        border: "1px solid #f0f1f7",
        height: "48px",
        cursor: "pointer",
        borderColor,
        textTransform: "none",
        "&:hover": {
          boxShadow: "0px 4px 12px rgba(55, 81, 255, 0.24)",
          backgroundColor: color,
          //   boxShadow: `${alpha(taskifyTheme.green.light, 0.25)} 0 0 0 0.2rem`,
        },
        ...sx,
      }}
    >
      {title}
    </Button>
  );
};
