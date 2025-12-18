import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  StyledTableHead,
  HeadCell,
  StyledTableRow,
  StyledTable,
  TableWrapper,
} from "./table.styles";

const PRIMARY_BLUE = "#1b2f74";

const CommonTable = ({ columns, rows, renderRow, loading }) => {
  // 1. Guard Clause: If rows is undefined or null, default to empty array
  const safeRows = rows || [];

  return (
    <TableWrapper>
      <StyledTable stickyHeader>
        {/* Use the fixed layout table here */}
        <StyledTableHead>
          <StyledTableRow>
            {columns.map((col, index) => (
              <HeadCell
                key={index}
                // Optional: You can give specific columns (like S.No) less width
                sx={{ width: col === "S.No" ? "60px" : "auto" }}
              >
                {col}
              </HeadCell>
            ))}
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          {loading ? (
            // 2. Loading State
            <StyledTableRow>
              <HeadCell
                colSpan={columns.length}
                sx={{ backgroundColor: "transparent", border: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 8,
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <CircularProgress size={24} sx={{ color: PRIMARY_BLUE }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Loading data...
                  </Typography>
                </Box>
              </HeadCell>
            </StyledTableRow>
          ) : safeRows.length > 0 ? (
            // 3. Data Rendering
            safeRows.map((row, index) => (
              <React.Fragment key={index}>
                {renderRow(row, index)}
              </React.Fragment>
            ))
          ) : (
            // 4. Empty State
            <StyledTableRow>
              <HeadCell
                colSpan={columns.length}
                sx={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  py: 10,
                  color: "text.secondary",
                }}
              >
                No records found.
              </HeadCell>
            </StyledTableRow>
          )}
        </TableBody>
      </StyledTable>
      {/* </TableContainer> */}
    </TableWrapper>
  );
};

export default CommonTable;
