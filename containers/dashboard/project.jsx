import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import TaskList from "../../components/dashboard/taskList";
import { errorHandler } from "../../utils/tools";
import { apis } from "../../utils/apis";

function dataFormatter(org) {
  return {
    id: org.id,
    title: org.title,
    owner: org.owner?.username,
    date: org.created_at,
    checked: org.checked,
    note: org.note,
    org,
  };
}

const Project = ({projectId}) => {
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const fetchAssignedTasks = async () => {
    try {
      const response = await apis.projects.getProjectById(projectId);
      const data = [...(response.data?.tasks || [])];
      if (data instanceof Array) {
        const doneTasks = data
          .filter((el) => !!el.checked)
          .map((el) => dataFormatter({ ...el }));
        const insProgressTasks = data
          .filter((el) => !el.checked)
          .map((el) => dataFormatter({ ...el }));
          console.log(insProgressTasks);
        setInProgress(insProgressTasks);
        setCompleted(doneTasks);
      } else {
        throw new Error();
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  const moveTaskToChecked = (task) => {
    const newCompleted = [...completed];
    const newInProgress = [...inProgress];
    newCompleted.unshift(dataFormatter({ ...task }));
    newInProgress = newInProgress.filter((el) => el?.id !== task?.id);
    setCompleted(newCompleted);
    setInProgress(newInProgress);
  };

  const moveTaskToUnchecked = (task) => {
    const newCompleted = [...completed];
    const newInProgress = [...inProgress];
    newInProgress.unshift(dataFormatter({ ...task }));
    newCompleted = newCompleted.filter((el) => el?.id !== task?.id);
    setCompleted(newCompleted);
    setInProgress(newInProgress);
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, [projectId]);

  return (
    <>
      <Box mt={3}>
        <TaskList
          tableTitle={"All Tasks"}
          rows={inProgress}
          changeTaskList={moveTaskToChecked}
        />
      </Box>
      <Box mt={3}>
        <TaskList
          tableTitle={"Completed"}
          rows={completed}
          changeTaskList={moveTaskToUnchecked}
        />
      </Box>
    </>
  );
};

export default Project;
