import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { TaskifyBtn } from "../buttons";

const TableRow = ({ property, value }) => {
  return (
    <tr>
      <td style={{ padding: "25px 20px 25px 0px" }} valign="top">
        <Typography
          variant="subtitle1"
          fontWeight={700}
          fontSize={"19px"}
          lineHeight="23.85px"
        >
          {property}
        </Typography>
      </td>
      <td style={{ padding: "25px 20px 25px 0px" }} valign="top">
        <Typography
          variant="subtitle1"
          fontWeight={400}
          fontSize={"16px"}
          lineHeight="26.59px"
        >
          {value}
        </Typography>
      </td>
    </tr>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function MoreOptions({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Box overflowX={"hidden"} pl={2} paddingRight={10}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              fontSize={"30px"}
              height="100%"
              textOverflow={"ellipsis"}
              noWrap={true}
            >
              {data.title}
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box px={2}>
            <table>
              <TableRow property={"Note:"} value={data.note} />
              <TableRow property={"Owner:"} value={data.owner} />
              <TableRow property={"Date:"} value={data.date} />
              <TableRow
                property={"Status:"}
                value={!data.checked ? "In progress" : "Done"}
              />
            </table>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box px={3} py={2}>
            <TaskifyBtn
              width="130px"
              color="white"
              borderColor={"#B02761"}
              sx={{ marginRight: 3 }}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={20}
                  fontWeight={700}
                  color="#B02761"
                >
                  Edit
                </Typography>
              }
            />
            <TaskifyBtn
              width="130px"
              color={"#B02761"}
              title={
                <Typography
                  variant="subtitle1"
                  fontSize={20}
                  fontWeight={700}
                  color="white"
                >
                  Delete
                </Typography>
              }
            />
          </Box>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
