import React from "react";
import { Box } from "@mui/system";
import TaskList from "../../components/dashboard/taskList";
import DashboardLayout from "../../containers/dashboard/layout";

function createData2(date, id, title, owner, note, checked = false) {
  return {
    id,
    title,
    owner,
    date,
    checked,
    note,
  };
}
const note =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt dignissimos inventore nihil quisquam ipsum tenetur repudiandae repellendus accusantium laudantium, exercitationem similique aperiam consequuntur illo fuga dolores unde vero provident. Magni.";
const rows = [
  createData2(new Date().toISOString(), 3, "Lollipop", "Cupcake", note),
  createData2(new Date().toISOString(), 1, "Lollipop", "Donut", note),
  createData2(new Date().toISOString(), 2, "Marshmallow", "Eclair", note),
  createData2(new Date().toISOString(), 4, "Nougat", "Frozen yoghurt", note),
  createData2(new Date().toISOString(), 5, "Oreo", "Gingerbread", note),
  createData2(new Date().toISOString(), 6, "Lollipop", "Honeycomb", note),
  createData2(
    new Date().toISOString(),
    7,
    "Marshmallow",
    "Ice cream sandwich",
    note
  ),
  createData2(new Date().toISOString(), 8, "Nougat", "Jelly Bean", note),
  createData2(new Date().toISOString(), 9, "Oreo", "KitKat", note),
  createData2(new Date().toISOString(), 10, "Lollipop", "Lollipop", note),
  createData2(new Date().toISOString(), 11, "Marshmallow", "Marshmallow", note),
  createData2(new Date().toISOString(), 12, "Nougat", "Nougat", note),
  createData2(new Date().toISOString(), 31, "Oreo", "Oreo", note),
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box mt={3}>
        <TaskList tableTitle={"All Tasks"} rows={rows} />
      </Box>
      <Box mt={3}>
        <TaskList
          tableTitle={"Completed"}
          rows={rows.map((el) => {
            const newEl = {...el}
            newEl.checked = true;
            return newEl;
          })}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
