import { requestApi } from "./requestHandler";

export const apis = {
  auth: {
    signup: (data) => {
      return requestApi.request({ url: "auth/signup", method: "POST", data });
    },
    login: (data) => {
      return requestApi.request({ url: "auth/signin", method: "POST", data });
    },
  },
  tasks: {
    getAssignedTasks: () => {
      return requestApi.request({ url: "task/assigned", method: "GET" });
    },
    checkOrUncheckTask: (taskId) => {
      return requestApi.request({ url: `task/${taskId}`, method: "PATCH" });
    },
  },
  projects: {
    getMyProjects: () => {
      return requestApi.request({ url: "project", method: "GET" });
    },
  },
};

export const cancelRequest = () => {
  requestApi.abort();
};
