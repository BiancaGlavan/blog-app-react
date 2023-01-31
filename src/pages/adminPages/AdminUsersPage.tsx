import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";

const StyledAdminUsersPage = styled('div')``;

const AdminUsersPage = () => {
  return (
    <StyledAdminUsersPage className="AdminUsersPage">
      <Container>
      <TableContainer sx={{ maxWidth: 650, marginBottom: '50px' }} component={Paper} square>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nr.</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Nr. of Articles</TableCell>
                  <TableCell align="left">Action</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {categories && categories.map((cat, idx) => ( */}
                  <TableRow key={1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {}
                    </TableCell>
                    <TableCell align="left">{}</TableCell>
                    <TableCell align="center">{}</TableCell>
                    <TableCell align="left">
                      <Button size="small" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
      </Container>
    </StyledAdminUsersPage>
  )
}

export default AdminUsersPage;