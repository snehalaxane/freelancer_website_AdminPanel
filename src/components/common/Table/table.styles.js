import {
  TableCell,
  TableRow,
  TableHead,
  Box,
  Table,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const PRIMARY_BLUE = "#1b2f74";
const ACCENT_RED = "#ff0000";

export const TableWrapper = styled(Box)({
  height: "calc(100vh - 250px)",
  overflow: "auto", // Change overflowY to auto
  position: "relative",
  borderRadius: "12px", // Increased to match your professional look
  backgroundColor: "#fff",
  border: "1px solid #e2e8f0",
  width: "100%",
  overflowX: "auto",

  // Custom Scrollbar
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#fff", // Light grey is more professional than white
    borderRadius: "10px",
  },
});

// Styled Header Section
export const StyledTableHead = styled(TableHead)({
  backgroundColor: PRIMARY_BLUE,
  "& th:first-of-type": {
    borderTopLeftRadius: "8px",
  },
  "& th:last-of-type": {
    borderTopRightRadius: "8px",
  },
});

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: "100%", // Ensures it always fills the container
  tableLayout: "fixed", // Forces consistent column spacing
  borderCollapse: "separate",
  borderSpacing: "0",

  [theme.breakpoints.down("md")]: {
    minWidth: 900, // forces horizontal scroll
    tableLayout: "auto", // ONLY on mobile
  },
}));

export const HeadCell = styled(TableCell)({
  fontWeight: 700,
  color: "#ffffff",
  backgroundColor: PRIMARY_BLUE,
  fontSize: "0.85rem",
  textAlign: "center",
  verticalAlign: "middle",

  // STICKY CORE
  position: "sticky",
  top: 0,
  zIndex: 10, // Increased zIndex to stay above everything

  padding: "18px 16px", // Added slightly more height for that "middle" look
  borderBottom: `2px solid ${ACCENT_RED}`,
  textTransform: "uppercase",
  letterSpacing: "0.05rem",
});

// Styled Body Section
export const BodyCell = styled(TableCell)({
  fontSize: 14,
  padding: "14px 16px",
  color: "#334155",
  borderBottom: "1px solid #e2e8f0",
  // Professional text handling:
  whiteSpace: "nowrap",
  textAlign: "center", // Ensures the data rows match the header alignment
  verticalAlign: "middle",
  overflow: "hidden",
  textOverflow: "ellipsis", // Adds "..." if text is too long
});

export const StyledTableRow = styled(TableRow)({
  transition: "background-color 0.2s ease",
  "&:nth-of-type(even)": {
    backgroundColor: "rgba(27, 47, 116, 0.02)", // Extremely faint navy for zebra striping
  },
  "&:hover": {
    backgroundColor: "rgba(255, 0, 0, 0.02)", // Very subtle red tint on hover
    cursor: "pointer",
    "& td": {
      color: "#000",
    },
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
});
