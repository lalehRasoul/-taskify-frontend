import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { taskifyTheme } from "../../styles/theme";
import { Grid, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TaskIcon from "@mui/icons-material/Task";
import { User } from "../../utils/user";
import { toast } from "react-toastify";
import { apis } from "../../utils/apis";
import PersonIcon from "@mui/icons-material/Person";
import { errorHandler } from "../../utils/tools";
import { useRouter } from "next/router";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRecoilState } from "recoil";
import { projectState } from "../../store/atoms";
const { Content, Sider } = Layout;

function getItem(label, key, icon, tab, onclick) {
  return {
    key,
    icon,
    label,
    tab,
    onclick,
  };
}

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [projects, setProjects] = useRecoilState(projectState);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState("1");
  const router = useRouter();

  const generateItems = (items) => {
    return [
      getItem("Assigned to me", "1", <PersonIcon fontSizes={"small"} />, null),
      ...items,
      getItem(
        "Create New Task",
        "9",
        <AddBoxIcon fontSize={"small"} />,
        "newTask"
      ),
      getItem(
        "Project management",
        "10",
        <CreateNewFolderIcon fontSize={"small"} />,
        "projectManagement"
      ),
      getItem(
        "Logout",
        "11",
        <LogoutIcon fontSize={"small"} />,
        null
        // (onclick = () => {
        //   console.log("ok");
        // })
      ),
    ];
  };

  const setUser = async () => {
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
    setUsername(userData.username);
    setEmail(userData.email);
  };

  const fetchMyProjects = async () => {
    try {
      const response = await apis.projects.getMyProjects();
      const newItems = generateItems(
        (response.data || []).map((el, index) =>
          getItem(
            el?.name,
            `item${index}`,
            <TaskIcon fontSize={"small"} />,
            String(el?.id)
          )
        )
      );
      setProjects(response.data);
      setItems(newItems)
      const target = newItems.find((el) => el.tab === router.query?.tab || null);
      setSelected(target?.key || "1");
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    setUser();
    fetchMyProjects();
  }, []);

  useEffect(() => {
    const newItems = generateItems(
      (projects || []).map((el, index) =>
        getItem(
          el?.name,
          `item${index}`,
          <TaskIcon fontSize={"small"} />,
          String(el?.id)
        )
      )
    );
    setItems(newItems)
  }, [projects]);

  useEffect(() => {
    const target = items.find((el) => el.tab === router.query?.tab || null);
    setSelected(target?.key || "1");
  }, [router.query]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        // collapsible
        collapsed={collapsed}
        style={{ backgroundColor: taskifyTheme.green.darker }}
        onCollapse={(value) => setCollapsed(value)}
        width={230}
      >
        <Box position="sticky" top={0}>
          <Box
            py={3}
            px={1}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/");
            }}
          >
            <Grid
              container
              flexWrap="nowrap"
              alignItems={"center"}
              justifyContent={collapsed ? "center" : "start"}
              ml={collapsed ? 0 : 3}
            >
              <Grid item>
                <Box position={"relative"} width={50} height={50}>
                  <Image src={"/icon.svg"} layout={"fill"} alt="icon.svg" />
                </Box>
              </Grid>
              <Grid
                item
                overflow={"hidden"}
                display={collapsed ? "none" : "block"}
              >
                <Typography
                  color={"#FFFFFF"}
                  fontWeight={700}
                  variant="subtitle1"
                  textOverflow={"ellipsis"}
                  overflow="hidden"
                  ml={1}
                  noWrap={true}
                  textAlign="center"
                >
                  Taskify
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Menu
            theme="dark"
            style={{ backgroundColor: taskifyTheme.green.darker }}
            selectedKeys={[selected]}
            mode="inline"
          >
            {items.map((el) => (
              <Menu.Item
                key={el.key}
                onClick={() => {
                  if (!!el.onclick) return el.onclick();
                  if (!!el.tab) router.push(`/dashboard?tab=${el.tab}`);
                  else router.push(`/dashboard`);
                }}
              >
                <Box
                  display={"flex"}
                  alignItems="center"
                  width={"100%"}
                  overflow="hidden"
                  color={"#B7EBEC"}
                  justifyContent="space-around"
                >
                  {el.icon}
                  <Typography
                    textOverflow={"ellipsis"}
                    width={"100%"}
                    overflow="hidden"
                    fontSize={14}
                    ml={1}
                  >
                    {el.label}
                  </Typography>
                </Box>
              </Menu.Item>
            ))}
          </Menu>
        </Box>
      </Sider>

      <Layout className="site-layout">
        <Content
          style={{
            margin: "20px 20px",
          }}
        >
          <Box maxWidth={350} overflow="hidden" flexWrap={"nowrap"}>
            <Grid container alignItems={"center"}>
              <Grid item>
                <Box height={"100%"} display="flex" alignItems={"center"}>
                  <AccountCircleIcon fontSize="large" />
                </Box>
              </Grid>
              <Grid item>
                <Typography
                  fontWeight={700}
                  variant="subtitle1"
                  textOverflow={"ellipsis"}
                  overflow="hidden"
                  ml={1.5}
                  textTransform="capitalize"
                  noWrap={true}
                >
                  {username}
                </Typography>
                <Typography
                  fontWeight={700}
                  variant="subtitle1"
                  textOverflow={"ellipsis"}
                  overflow="hidden"
                  ml={1.5}
                  noWrap={true}
                  mt={-0.7}
                  fontSize={12}
                >
                  {email}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
