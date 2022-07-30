import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

export default function ProjectList({
  onSelect = () => null,
  selected,
  info,
  projects = [],
}) {
  return (
    <TableContainer>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                fontSize={"18px"}
                lineHeight="28px"
                letterSpacing={"0.4px"}
              >
                Project Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="subtitle1"
                fontWeight={400}
                fontSize={"18px"}
                lineHeight="28px"
                letterSpacing={"0.4px"}
              >
                Role
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row, i) => (
            <TableRow
              key={i}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    selected === row?.id
                      ? "rgba(25, 118, 210, 0.1) !important"
                      : `rgba(108, 190, 191, 0.1) !important`,
                  border: 0,
                },
                backgroundColor:
                  selected === row?.id ? "rgba(25, 118, 210, 0.1) !important" : "inherit",
              }}
              onClick={onSelect.bind({}, row.id)}
            >
              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell>
                {row?.owner?.id === info.id ? "Owner" : "Editor"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {projects.length === 0 && (
        <Typography
          variant="subtitle1"
          fontWeight={400}
          fontSize={"18px"}
          lineHeight="28px"
          letterSpacing={"0.4px"}
          textAlign="center"
          py={3}
        >
          No project
        </Typography>
      )}
    </TableContainer>
  );
}
