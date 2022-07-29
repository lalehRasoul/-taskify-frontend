import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Box } from "@mui/system";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { taskifyTheme } from "../../styles/theme";
import { Grid, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TaskIcon from "@mui/icons-material/Task";
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Assigned to me", "1", <UserOutlined />),
  getItem("List 1", "6", <TaskIcon />),
  getItem("List 2", "8", <TaskIcon />),
  getItem("Create New List", "9", <AddBoxIcon />),
];

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: taskifyTheme.green.darker }}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Box position="sticky" top={0}>
          <Box py={3} px={1}>
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
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
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
                  noWrap={true}
                >
                  Laleh Rasoul
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
                  Laleh.rasoul80@gmail.com
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
