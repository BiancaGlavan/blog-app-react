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
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IArticle, useDeleteArticleMutation, useGetArticlesQuery } from "../../redux/features/apiSlice";
import { useEffect, useState } from "react";
import AlertComponent from "../../components/admin/AlertComponent";
import PaginationForTable from "../../components/admin/PaginationForTable";

const StyledAdminArticlesPage = styled("div")`
  margin-top: 50px;

  .title {
    text-align: center;
  }

  .title,
  .new-art-btn {
    margin-bottom: 30px;
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
  const [artId, setArtId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [artTitle, setArtTitle] = useState("");

  const { data: articlesResponse, isLoading, isSuccess } = useGetArticlesQuery();

  const [deleteArticle, response] = useDeleteArticleMutation();
  const { isLoading: isLoadingDeleteArticle, isSuccess: isSuccesDeleteArticle } = response;

  const navigate = useNavigate();

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

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);


  return (
    <StyledAdminArticlesPage>
      <Container>
        <Typography variant="h6" className="title">
          Manage Articles
        </Typography>
        <Link to={"/admin/articles/add"}>
          <Button className="new-art-btn" variant="contained" size="large" startIcon={<AddIcon />}>
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
                    <TableCell align="left">Article</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Author</TableCell>
                    <TableCell align="left">Action</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articlesResponse.articles.map((art, idx) => (
                    <TableRow key={art._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="left">{art.title}</TableCell>
                      <TableCell align="left">{art.category?.title}</TableCell>
                      <TableCell align="left">{art.user?.name}</TableCell>
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
            <PaginationForTable raws={articlesResponse?.articles && articlesResponse?.articles.length} />
          </>
        )}
        <StyledDialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
            <Typography variant="body1">Are you sure you want to delete article: "{artTitle}"?</Typography>
            <Box className="delete-buttons">
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button onClick={handleDeleteArticle} variant="contained" color="error">
                {isLoadingDeleteArticle ? "is loading..." : "Delete Article"}
              </Button>
            </Box>
          </DialogContent>
        </StyledDialog>
      </Container>
    </StyledAdminArticlesPage>
  );
};

export default AdminArticlesPage;
