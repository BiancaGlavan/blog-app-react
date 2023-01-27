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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { IArticle, useDeleteArticleMutation, useGetArticlesQuery } from "../../redux/features/apiSlice";
import { useState } from "react";
import AlertComponent from "../../components/admin/AlertComponent";

const StyledAdminArticlesPage = styled("div")`
  margin-top: 50px;

  .title,
  .new-art-btn {
    margin-bottom: 30px;
  }

  .table-pagination {
    display: flex;
    justify-content: flex-start;
    max-width: 650px;
    margin-bottom: 50px;
  }

  .divider {
    max-width: 650px;
    background: #d3d3d3;
  }
`;

const StyledDialog = styled(Dialog)`
  .delete-buttons {
    display: flex;
    justify-content: space-around;
  }
`;

const AdminArticlesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [artId, setArtId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [artTitle, setArtTitle] = useState("");

  const { data: articlesResponse, isLoading, isSuccess } = useGetArticlesQuery();

  const [deleteArticle, response] = useDeleteArticleMutation();
  const { isLoading: isLoadingDeleteArticle, isSuccess: isSuccesDeleteArticle } = response;

  const navigate = useNavigate();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditOpen = (art: IArticle) => {
    setArtId(art?._id);
    navigate(`/admin/articles/${art._id}/edit`);
  };

  const handleDeleteOpen = (art: IArticle) => {
    setArtId(art?._id);
    setArtTitle(art?.title);
    setOpenDialog(true);
  };

  const handleDeleteArticle = async () => {
    try {
      const deletedArticle = await deleteArticle(artId).unwrap();

      if (deletedArticle) {
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //article id to delete
 // 63b336b2647dd2918c3f21e1
 // 63b337d6e6b012c6b4953cec
 // 63b47d844c3db2538aa51217
 // 63c16563edd4db65f58c1e14
 // 63b339f799bfb21234c18f13

  return (
    <StyledAdminArticlesPage>
      <Container>
        <Typography variant="h6" className="title">
          Manage Articles
        </Typography>
        <Link to={"/admin/articles/add"}>
          <Button className="new-art-btn" variant="outlined" startIcon={<AddIcon />}>
            New Article
          </Button>
        </Link>
        {isSuccesDeleteArticle && <AlertComponent alertTitle="The article was deleted!" />}
        {articlesResponse?.articles && isSuccess && (
          <>
            <TableContainer sx={{ maxWidth: 650 }} component={Paper} square>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nr.</TableCell>
                    <TableCell align="left">Article</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Author</TableCell>
                    <TableCell align="left">Likes</TableCell>
                    <TableCell align="left">Action</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articlesResponse.articles.map((art, idx) => (
                    <TableRow key={art._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {idx + 1}
                      </TableCell>
                      <TableCell align="left">{art.title}</TableCell>
                      <TableCell align="center">{art.category?.title}</TableCell>
                      <TableCell align="center">{art.user?.name}</TableCell>
                      <TableCell align="center">{art.likes.length}</TableCell>
                      <TableCell align="left">
                        <Button onClick={() => handleEditOpen(art)} className="action-btn" size="small" color="warning">
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => handleDeleteOpen(art)} size="small" color="error">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider className="divider" />

            <TablePagination
              className="table-pagination"
              rowsPerPageOptions={[10, 25, 100]}
              component={Paper}
              square
              count={(articlesResponse?.articles && articlesResponse?.articles.length) || -1}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
            <Typography variant="body1">Are you sure you want to delete article: "{artTitle}"?</Typography>
            <Box className="delete-buttons">
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button onClick={handleDeleteArticle} variant="contained" color="error">
                Delete article
              </Button>
            </Box>
          </DialogContent>
        </StyledDialog>
      </Container>
    </StyledAdminArticlesPage>
  );
};

export default AdminArticlesPage;
