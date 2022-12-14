import { Typography } from "@mui/material";
import { TaskifyInput, TaskifyTextArea } from "../inputs";

export const TableRowEditMode = ({
  property,
  value,
  nativePropName,
  onChange = null,
  isTextArea = false,
  helper,
  endAdornment = null,
  customInput = null,
  placeholder = "",
  inputType = 'text',
  inputSX = {},
}) => {
  const handleOnChange = (e) => {
    if (!onChange) return null;
    if (!!nativePropName) return onChange(e, nativePropName);
    onChange(e);
  };
  const render = () => {
    if (!!customInput) return customInput;
    if (isTextArea) {
      return (
        <TaskifyTextArea
          placeholder={placeholder}
          minRows={4}
          value={value}
          onChange={handleOnChange}
        />
      );
    }
    return (
      <TaskifyInput
        sx={inputSX}
        type={inputType}
        endAdornment={endAdornment}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    );
  };
  return (
    <tr>
      <td
        style={{ padding: "15px 10px 15px 0px", overflow: "hidden" }}
        valign={isTextArea ? "top" : "cneter"}
      >
        <Typography
          textOverflow="ellipsis"
          variant="subtitle1"
          fontWeight={700}
          fontSize={"17px"}
          lineHeight="23.85px"
          noWrap={true}
        >
          {property}
        </Typography>
      </td>
      <td
        style={{
          padding: "15px 10px 15px 15px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {render()}
        {helper}
      </td>
    </tr>
  );
};
