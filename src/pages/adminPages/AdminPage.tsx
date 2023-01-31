import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useGetArticlesQuery, useGetCategoriesQuery } from "../../redux/features/apiSlice";

const StyledAdminPage = styled(Container)`
  margin-top: 50px;

  .greeting {
    text-align: center;
    margin-bottom: 30px;
  }

  .info-container {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
  }

  .info {
    border: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const AdminPage = () => {
  const { data: articlesResponse, isLoading, isSuccess } = useGetArticlesQuery();
  const { data: categories, isLoading: isLoadingCategories, isSuccess: isSuccessCategories } = useGetCategoriesQuery();

  return (
    <StyledAdminPage className="AdminPage">
      <Typography className="greeting" variant="h6">
        Welcome!
      </Typography>
      <Box className="info-container">
        <Box className="info">
          <Typography>Articles</Typography>
          <Typography>{articlesResponse?.articles.length}</Typography>
        </Box>
        <Box className="info">
          <Typography>Categories</Typography>
          <Typography>{categories?.length}</Typography>
        </Box>
      </Box>
    </StyledAdminPage>
  );
};

export default AdminPage;
