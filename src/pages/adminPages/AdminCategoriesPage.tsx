import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Divider,
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
import {
  ICategory,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} from "../../redux/features/apiSlice";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AlertComponent from "../../components/admin/AlertComponent";
import PaginationForTable from "../../components/admin/PaginationForTable";

const StyledAdminCategoriesPage = styled("div")`
  margin-top: 50px;

  .add-new-cat {
    margin-top: 20px;
  }

  .title {
    text-align: center;
    margin-bottom: 30px;
  
  }

  .new-cat {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    margin-bottom: 50px;
  }

  .divider {
    max-width: 650px;
    background: #d3d3d3;
  }
`;

const AdminCategoriesPage = () => {
  const [open, setOpen] = useState(false);
  const [catId, setCatId] = useState("");
  const [catTitle, setCatTitle] = useState("");
  const [createCatTitle, setCreateCatTitle] = useState("");

  const { data: categories, isLoading, isSuccess } = useGetCategoriesQuery();

  const [updateCat, response] = useUpdateCategoryMutation();
  const { isLoading: isLoadingUpdateCat, isSuccess: isSuccessUpdateCat } = response;

  const [createCategory, createCatResponse] = useCreateCategoryMutation();
  const { isLoading: isLoadingCreateCat, isSuccess: isSuccesCreateCat } = createCatResponse;

  const handleEditOpen = (cat: ICategory) => {
    setCatId(cat?._id);
    setCatTitle(cat.title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateCategory = () => {
    const newCategory = {
      title: catTitle,
    };
    updateCat({ category: newCategory, id: catId });
    setOpen(false);
  };

  const handleCreateCategory = () => {
    const newCategory = {
      title: createCatTitle,
    };
    createCategory({ category: newCategory });
  };

  useEffect(() => {
    if (isSuccesCreateCat) {
      setCreateCatTitle("");
    }
  }, [createCatResponse]);

  return (
    <StyledAdminCategoriesPage className="AdminCategoriesPage">
      <Container>
        <Typography variant="h6" className="title">
          Manage categories
        </Typography>
        <Box className="new-cat">
          <TextField
            autoComplete="off"
            label="category title..."
            value={createCatTitle}
            onChange={(e) => setCreateCatTitle(e.target.value)}
          />
          <Button
            onClick={handleCreateCategory}
            className="add-new-cat"
            size="large"
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Category
          </Button>
          {isSuccesCreateCat && <AlertComponent alertTitle="Category was created!" />}
          {isSuccessUpdateCat && <AlertComponent alertTitle="Category was updated!" />}
        </Box>
        {categories && isSuccess && (
          <>
            <TableContainer sx={{ maxWidth: 650, }} component={Paper} square>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Nr.</TableCell> */}
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Nr. of Articles</TableCell>
                    <TableCell align="left">Action</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories &&
                    categories.map((cat, idx) => (
                      <TableRow key={cat._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        {/* <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell> */}
                        <TableCell align="left">{cat.title}</TableCell>
                        <TableCell align="left">{cat.articles.length}</TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => handleEditOpen(cat)}
                            className="action-btn"
                            size="small"
                            color="warning"
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell align="left">
                          <Button size="small" color="error">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Divider className="divider" />
            <PaginationForTable raws={categories && categories.length}/>
          </>
        )}
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "20px", padding: "30px" }}>
            <TextField
              value={catTitle}
              onChange={(e) => setCatTitle(e.target.value)}
              label="Category"
              variant="standard"
              autoComplete="off"
            />
            <Button sx={{ marginTop: "20px", marginBottom: "20px" }} variant="contained" onClick={handleUpdateCategory}>
              Update category
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </StyledAdminCategoriesPage>
  );
};

export default AdminCategoriesPage;
