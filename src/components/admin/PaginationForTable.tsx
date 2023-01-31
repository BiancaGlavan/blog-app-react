import { Paper, TablePagination } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";

interface IPropsPagination {
  raws: number;
}

const StyledPaginationForTable = styled("div")`
  .table-pagination {
    display: flex;
    max-width: 650px;
    margin-bottom: 50px;
  }
`;

const PaginationForTable = ({ raws }: IPropsPagination) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <StyledPaginationForTable className="PaginationForTable">
      <TablePagination
        className="table-pagination"
        rowsPerPageOptions={[10, 25, 100]}
        component={Paper}
        square
        count={raws || -1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledPaginationForTable>
  );
};

export default PaginationForTable;
