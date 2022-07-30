import React, { useEffect, useState } from "react";
import { DatePicker, Modal } from "antd";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TaskifyBtn } from "../buttons";
import {
  TaskifyDatePicker,
  TaskifyInput,
  TaskifySelect,
  TaskifyTextArea,
} from "../inputs";
import moment from "moment";
import { MenuItem } from "@mui/material";
import { errorHandler } from "../../utils/tools";
import { apis } from "../../utils/apis";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { TableRowEditMode } from "./tableRow";

const TableRow = ({ property, value }) => {
  return (
    <tr>
      <td
        style={{ padding: "15px 10px 15px 0px", overflow: "hidden" }}
        valign="top"
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
          padding: "15px 10px 15px 10px",
          overflow: "hidden",
          width: "100%",
        }}
        valign="top"
      >
        <Typography
          variant="subtitle1"
          fontWeight={400}
          textOverflow="ellipsis"
          fontSize={"16px"}
          width="100%"
          noWrap={true}
          lineHeight="26.59px"
        >
          {value}
        </Typography>
      </td>
    </tr>
  );
};

const MoreOptions = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMore] = useState(false);
  const [assignTo, setAssignTo] = useState(data.org?.asign?.username || "");
  const [needReload, setNeedReload] = useState(false);
  const [editFields, setEditFields] = useState({
    title: data?.title || "",
    note: data?.note || "",
    checked: !!data?.checked,
  });
  const handleClickOpen = () => {
    setVisible(true);
  };
  const handleClickClose = () => {
    if (needReload) return window.location.reload();
    setEditMore(false);
    setVisible(false);
  };
  const handleEdit = () => {
    setEditMore(true);
  };
  const handleOnChangeEditFields = (e, prop) => {
    const newEditFields = { ...editFields };
    newEditFields[prop] = e.target.value;
    if (prop === "checked") {
      newEditFields[prop] = e.target.value === "done" ? true : false;
    }
    setEditFields(newEditFields);
  };
  const handleOnChangeAssignTo = (e) => {
    setAssignTo(e.target.value);
  };
  const handleDeleteBtn = async () => {
    try {
      await apis.tasks.deleteTask(data.id);
      toast("The task has been successfully deleted.", {
        type: "success",
        autoClose: 2000,
        position: "bottom-left",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      errorHandler(error);
    }
  }
  const handleOnSubmit = async () => {
    try {
      await apis.tasks.updateTask(data.id, editFields);
      toast("The task has been successfully updated.", {
        type: "success",
        autoClose: 2000,
        position: "bottom-left",
      });
      await apis.tasks.updateTask(data.id, editFields);
      setNeedReload(true);
      if (!!assignTo && data.org?.asign?.username !== assignTo) {
        await apis.tasks.assignUser(data.id, assignTo);
        toast("The task has been successfully assigned.", {
          type: "success",
          autoClose: 2000,
          position: "bottom-left",
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <Modal
        centered
        visible={visible}
        onOk={handleClickClose}
        onCancel={handleClickClose}
        width={1000}
        footer={
          <div>
            <Box px={2} py={2} display={editMode ? "none" : "block"}>
              <TaskifyBtn
                width="130px"
                color="white"
                onClick={handleEdit}
                borderColor={"#B02761"}
                sx={{ marginRight: 3 }}
                title={
                  <Typography
                    variant="subtitle1"
                    fontSize={16}
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
                onClick={handleDeleteBtn}
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
            <Box px={2} py={2} display={editMode ? "block" : "none"}>
              <TaskifyBtn
                width="130px"
                color="white"
                onClick={handleClickClose}
                borderColor={"#1976D2"}
                sx={{ marginRight: 3 }}
                title={
                  <Typography
                    variant="subtitle1"
                    fontSize={16}
                    fontWeight={700}
                    color="#1976D2"
                  >
                    Cancel
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
          </div>
        }
        title={
          <Box overflowX={"hidden"}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              fontSize={"20px"}
              height="100%"
              textOverflow={"ellipsis"}
              noWrap={true}
            >
              {editMode && <span>Edit</span>} {data.title}
            </Typography>
          </Box>
        }
      >
        <Box display={editMode ? "none" : "block"}>
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
        <Box display={editMode ? "block" : "none"} width="100%">
          <table>
            <TableRowEditMode
              property={"Title:"}
              nativePropName="title"
              value={editFields.title}
              onChange={handleOnChangeEditFields}
            />
            <TableRowEditMode
              property={"Note:"}
              nativePropName="note"
              value={editFields.note}
              onChange={handleOnChangeEditFields}
              isTextArea={true}
            />
            <TableRowEditMode
              property={"Status:"}
              isSelectable={true}
              customInput={
                <Select
                  value={editFields.checked ? "done" : "inProgress"}
                  input={<TaskifyInput />}
                  onChange={(e) => handleOnChangeEditFields(e, "checked")}
                >
                  <MenuItem key={1} value={"inProgress"}>
                    In Progress
                  </MenuItem>
                  <MenuItem key={2} value={"done"}>
                    Done
                  </MenuItem>
                </Select>
              }
              value={!data.checked ? "In progress" : "Done"}
            />
            <TableRowEditMode
              property={"Assigned To:"}
              value={assignTo}
              onChange={handleOnChangeAssignTo}
            />
          </table>
        </Box>
      </Modal>
    </>
  );
};

export default MoreOptions;
