import {
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TaskifyInput } from "../../components/inputs";
import { TaskifyBtn } from "../../components/buttons";
import FaceIcon from "@mui/icons-material/Face";
import AddIcon from "@mui/icons-material/Add";
import ProjectList from "../../components/dashboard/projectList";
import { apis } from "../../utils/apis";
import { errorHandler } from "../../utils/tools";
import { User } from "../../utils/user";
import { toast } from "react-toastify";
import { projectState } from "../../store/atoms";
import { useRecoilState } from "recoil";

const ProjectManagement = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [myInfo, setMyInfo] = useState("");
  const [projects, setProjects] = useRecoilState(projectState);
  const [projectName, setProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState();
  const handleOnRemoveUser = (value) => {
    let newUsers = [...users];
    if (!!value?.trim()) {
      newUsers = newUsers.filter((el) => el !== value?.trim());
      setUsers(newUsers);
    }
  };
  const handleOnAddUser = () => {
    const value = userInput;
    const newUsers = [...users];
    if (!!value?.trim()) {
      if (newUsers.find((el) => el === value?.trim())) return null;
      newUsers.push(value?.trim());
      setUsers(newUsers);
    }
  };
  const handleChangeUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const handleOnChangeProjectName = (e) => {
    setProjectName(e.target.value);
  };
  const handleClear = () => {
    setUsers([]);
    setUserInput("");
    setSelectedProjectId(undefined);
    setProjectName("");
  };
  const getMyInfo = async () => {
    const user = new User();
    const userData = user.getUserData();
    if (!userData || !userData.username || !userData.email) {
      toast("Please login.", {
        autoClose: 2000,
        position: "bottom-left",
        type: "error",
      });
      return setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
    setMyInfo(userData);
  };
  const handleSelect = (id) => {
    setSelectedProjectId(id);
    const targetProject = projects.find((el) => el.id === id);
    setProjectName(targetProject.name);
    setUsers(targetProject?.users?.map((el) => el.username) || []);
    setUserInput("");
  };
  const handleOnSubmit = async () => {
    try {
      if (!!selectedProjectId) {
        const response = await apis.projects.updateProject(selectedProjectId, {
          name: projectName,
          users,
        });
        toast("The project has been successfully updated.", {
          autoClose: 2000,
          position: "bottom-left",
          type: "success",
        });
        if (!!response.data) {
          const updatedProject = response.data;
          let newProjects = [...projects];
          newProjects = newProjects.map((el) => {
            if (el.id === updatedProject.id) {
              return { ...updatedProject };
            }
            return el;
          });
          setProjects(newProjects);
        }
      } else {
        const response = await apis.projects.createProject({
          name: projectName,
          users,
        });
        toast("The project has been successfully created.", {
          autoClose: 2000,
          position: "bottom-left",
          type: "success",
        });
        if (!!response.data) {
          const newProjects = [...projects];
          newProjects.push(response.data);
          setProjects(newProjects);
        }
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleOnDelete = async () => {
    try {
      if (!!selectedProjectId) {
        await apis.projects.deleteProject(selectedProjectId, {
          name: projectName,
          users,
        });
        toast("The project has been successfully deleted.", {
          autoClose: 2000,
          position: "bottom-left",
          type: "success",
        });
        let newProjects = [...projects];
        newProjects = newProjects.filter((el) => el.id !== selectedProjectId);
        console.log(newProjects);
        setProjects(newProjects);
        handleClear()
      }
    } catch (error) {
      errorHandler(error);
    }
  };
  useEffect(() => {
    getMyInfo();
  }, []);
  return (
    <Box mx={6} my={8}>
      <Typography
        variant="sbtitle2"
        fontSize={"32px"}
        fontWeight={700}
        lineHeight={"40.16px"}
        letterSpacing="0.4"
        mb={5}
      >
        Project Management
      </Typography>
      <Grid container columnGap={2} mt={3}>
        <Grid item lg={5.7} xs={12} mb={{ xs: 3, lg: 0 }}>
          <Card>
            <Box sx={{ paddingY: 2, paddingX: 3 }}>
              <Typography
                variant="sbtitle1"
                fontSize={"24px"}
                fontWeight={600}
                lineHeight={"40.16px"}
                letterSpacing="0.4"
                mb={5}
              >
                Project List
              </Typography>
            </Box>
            <Box mt={3}>
              <ProjectList
                projects={projects}
                info={myInfo}
                onSelect={handleSelect}
                selected={selectedProjectId}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12} sm={12}>
          <Card>
            <Box py={2} px={3}>
              <Typography
                variant="sbtitle1"
                fontSize={"24px"}
                fontWeight={600}
                lineHeight={"40.16px"}
                letterSpacing="0.4"
                mb={5}
              >
                {!!selectedProjectId ? "Edit" : "Create New"} Project
              </Typography>
            </Box>
            <Divider sx={{ borderWidth: 1, borderColor: "#C1C1C1" }} />
            <Box py={2} px={3}>
              <Grid container flexWrap={"nowrap"} alignItems="center">
                <Grid item>
                  <Typography
                    variant="sbtitle1"
                    fontSize={"19px"}
                    fontWeight={700}
                    lineHeight={"24px"}
                    letterSpacing="0.4px"
                    mb={5}
                  >
                    Name:
                  </Typography>
                </Grid>
                <Grid item width={"100%"} ml={2}>
                  <TaskifyInput
                    placeholder="Name of project"
                    value={projectName}
                    onChange={handleOnChangeProjectName}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "42px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container flexWrap={"nowrap"} alignItems="center" mt={3}>
                <Grid item>
                  <Typography
                    variant="sbtitle1"
                    fontSize={"19px"}
                    fontWeight={700}
                    lineHeight={"24px"}
                    letterSpacing="0.4px"
                    mb={5}
                    noWrap
                  >
                    Add person:
                  </Typography>
                </Grid>
                <Grid item width={"100%"} ml={2}>
                  <TaskifyInput
                    placeholder="Username or Email Address"
                    onChange={handleChangeUserInput}
                    value={userInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleOnAddUser}
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      "& .MuiInputBase-input": {
                        height: "42px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                display={"flex"}
                mt={2}
                columnGap={2}
                rowGap={2}
                width="100%"
                flexWrap={"wrap"}
              >
                {users.map((el, i) => (
                  <Chip
                    key={i}
                    label={el}
                    variant="outlined"
                    onDelete={handleOnRemoveUser.bind({}, el)}
                    icon={<FaceIcon />}
                  />
                ))}
              </Box>
              <Box
                display={"flex"}
                justifyContent="end"
                mt={3}
                columnGap={2}
                rowGap={2}
                flexWrap="wrap"
              >
                {!!selectedProjectId && (
                  <TaskifyBtn
                    width="130px"
                    color={"#B02761"}
                    onClick={handleOnDelete}
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
                )}
                <TaskifyBtn
                  width="130px"
                  color="white"
                  onClick={handleClear}
                  borderColor={"#1976D2"}
                  title={
                    <Typography
                      variant="subtitle1"
                      fontSize={16}
                      fontWeight={700}
                      color="#1976D2"
                    >
                      {!!selectedProjectId ? "Cancel" : "Clear"}
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
                      {!!selectedProjectId ? "Edit" : "Create"}
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectManagement;
