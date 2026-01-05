import { Box, Pagination } from "@mui/material";

const CommonPagination = ({
  totalItems,
  page,
  rowsPerPage = 20,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
};

export default CommonPagination;
