import React, { useMemo } from "react";
import DashboardLayout from "../../containers/dashboard/layout";
import Assigned from "../../containers/dashboard/assigned";
import { useRouter } from "next/router";
import NewTask from "../../containers/dashboard/newTask";
import ProjectManagement from "../../containers/dashboard/projectManagement";
import Project from "../../containers/dashboard/project";
import UserProfile from "../../containers/dashboard/updateProfile";

const Dashboard = () => {
  const { query } = useRouter();
  const render = useMemo(() => {
    switch (query?.tab) {
      case "newTask":
        return <NewTask />;
      case "projectManagement":
        return <ProjectManagement />;
      case "profile":
        return <UserProfile />;
      default:
        if (!!query?.tab) return <Project projectId={query.tab} />;
        return <Assigned />;
    }
  }, [query]);
  return <DashboardLayout>{render}</DashboardLayout>;
};

export default Dashboard;
