import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ICategory, useGetCategoriesQuery } from "../../redux/features/apiSlice";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const StyledAdminCategoriesPage = styled("div")`
  margin-top: 80px;

  .add-cat {
    margin-bottom: 30px;
  }

  .title {
    text-align: center;
    margin-bottom: 50px;
    font-weight: 500;
  }
`;

const AdminCategoriesPage = () => {
  const { data: categories, isLoading, isSuccess } = useGetCategoriesQuery();
  const [open, setOpen] = useState(false);
  

  const handleEditOpen = (cat: ICategory) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledAdminCategoriesPage className="AdminCategoriesPage">
      <Container>
        <Typography variant="h6" className="title">
          Manage categories
        </Typography>
        <Button className="add-cat" variant="outlined" startIcon={<AddIcon />}>
          New Category
        </Button>
        {categories && isSuccess && (
          <TableContainer sx={{ maxWidth: 650 }} component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nr</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Action</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat, idx) => (
                  <TableRow key={cat.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left">{cat.title}</TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleEditOpen(cat)}
                        className="action-btn"
                        size="small"
                        variant="contained"
                        color="warning"
                        
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button size="small" variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
          <TextField defaultValue='categ' label="Category" variant="standard" autoComplete="off"/>
          </DialogContent>
        </Dialog>
      </Container>
    </StyledAdminCategoriesPage>
  );
};

export default AdminCategoriesPage;
