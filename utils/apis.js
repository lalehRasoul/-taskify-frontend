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
    createTask: (projectId, data) => {
      return requestApi.request({
        url: `task/${projectId}`,
        method: "POST",
        data,
      });
    },
    updateTask: (taskId, data) => {
      return requestApi.request({ url: `task/${taskId}`, method: "PUT", data });
    },
    assignUser: (taskId, credential) => {
      return requestApi.request({
        url: `task/${taskId}/${credential}`,
        method: "PATCH",
      });
    },
    deleteTask: (id) => {
      return requestApi.request({ url: `task/${id}`, method: "DELETE" });
    },
  },
  projects: {
    createProject: (data) => {
      return requestApi.request({ url: "project", method: "POST", data });
    },
    getProjectById: (projectId) => {
      return requestApi.request({ url: `project/${projectId}`, method: "GET" });
    },
    updateProject: (projectId, data) => {
      return requestApi.request({
        url: `project/${projectId}`,
        method: "PUT",
        data,
      });
    },
    deleteProject: (projectId) => {
      return requestApi.request({
        url: `project/${projectId}`,
        method: "DELETE",
      });
    },
    getMyProjects: () => {
      return requestApi.request({ url: "project", method: "GET" });
    },
  },
};

export const cancelRequest = () => {
  requestApi.abort();
};
