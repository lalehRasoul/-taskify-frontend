import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Box, MenuItem } from "@mui/material";
import { Card } from "@mui/material";
import { TableRowEditMode } from "../../components/dashboard/tableRow";
import { TaskifyInput } from "../../components/inputs";
import { errorHandler } from "../../utils/tools";
import { apis } from "../../utils/apis";
import { TaskifyBtn } from "../../components/buttons";
import { toast } from "react-toastify";

const defaultValues = {
  title: "",
  note: "",
  checked: false,
};

const NewTask = () => {
  const [assignTo, setAssignTo] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [fields, setFields] = useState(defaultValues);
  const handleOnChangeEditFields = (e, prop) => {
    const newEditFields = { ...fields };
    newEditFields[prop] = e.target.value;
    if (prop === "checked") {
      newEditFields[prop] = e.target.value === "done" ? true : false;
    }
    setFields(newEditFields);
  };
  const handleOnChangeAssignTo = (e) => {
    setAssignTo(e.target.value);
  };
  const handleOnChangeProject = (e) => {
    setSelectedProject(e.target.value);
  };
  const fetchMyProjects = async () => {
    try {
      const response = await apis.projects.getMyProjects();
      setProjects(response.data);
      if (response.data instanceof Array && !!response.data[0]) {
        setSelectedProject(response.data[0]?.id);
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleOnSubmit = async () => {
    const body = { ...fields, assignUser: assignTo };
    try {
      await apis.tasks.createTask(selectedProject, body);
      toast("The task has been successfully created.", {
        type: "success",
        autoClose: 2000,
        position: "bottom-left",
      });
    } catch (error) {
      errorHandler(error);
    }
  };
  useEffect(() => {
    fetchMyProjects();
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
        Create New Task
      </Typography>
      <form>
        <table>
          <TableRowEditMode
            property={"Title:"}
            placeholder="Task title"
            nativePropName="title"
            inputSX={{
              "& .MuiInputBase-input": {
                height: "42px",
              },
            }}
            value={fields.title}
            onChange={handleOnChangeEditFields}
          />
          <TableRowEditMode
            property={"Note:"}
            nativePropName="note"
            value={fields.note}
            onChange={handleOnChangeEditFields}
            isTextArea={true}
          />
          <TableRowEditMode
            property={"Status:"}
            isSelectable={true}
            customInput={
              <Select
                value={fields.checked ? "done" : "inProgress"}
                input={
                  <TaskifyInput
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "42px",
                      },
                    }}
                  />
                }
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
          />
          <TableRowEditMode
            property={"Projects:"}
            isSelectable={true}
            customInput={
              <Select
                value={String(selectedProject)}
                input={
                  <TaskifyInput
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "42px",
                      },
                    }}
                  />
                }
                onChange={handleOnChangeProject}
              >
                {projects.map((el, i) => (
                  <MenuItem key={i} value={String(el.id)}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            }
          />
          <TableRowEditMode
            property={"Assigned‌To:"}
            placeholder="Username or Email Address"
            value={assignTo}
            inputSX={{
              "& .MuiInputBase-input": {
                height: "42px",
              },
            }}
            onChange={handleOnChangeAssignTo}
          />
        </table>
        <Box px={1.5} py={2} display={"flex"} justifyContent="end">
          <TaskifyBtn
            width="130px"
            color="white"
            onClick={() => {
              setFields(defaultValues);
              setAssignTo("");
              if (projects instanceof Array && !!projects[0]) {
                setSelectedProject(projects[0]?.id);
              }
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
                Create
              </Typography>
            }
          />
        </Box>
      </form>
    </Card>
  );
};

export default NewTask;
