import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useGetArticlesQuery, useGetCategoriesQuery } from "../../redux/features/apiSlice";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import ArticlesList from "../../components/article/ArticlesList";

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
    align-items: center;
    justify-content: center;
  }

  .info {
    background: ${(props) =>props.theme.palette.primary.main};
    display: flex;
    width: 250px;
    height: 150px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .text, .icon {
      color: ${(props) =>props.theme.palette.background.default};
    }
  }

  .recent-posts {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .title {
    margin-bottom: 30px;
  }
`;

const AdminPage = () => {
  const { data: articlesResponse, isLoading, isSuccess } = useGetArticlesQuery();
  const { data: categories, isLoading: isLoadingCategories, isSuccess: isSuccessCategories } = useGetCategoriesQuery();

  return (
    <StyledAdminPage className="AdminPage">
      <Typography className="greeting" variant="h6">
        Hi, Welcome back
      </Typography>
      <Box className="info-container">
        <Box className="info">
          <ArticleIcon className="icon"/>
          <Typography variant="h6" className="text">Articles</Typography>
          <Typography variant="h6" className="text">{articlesResponse?.articles.length}</Typography>
        </Box>
        <Box className="info">
          <CategoryIcon className="icon"/>
          <Typography variant="h6" className="text">Categories</Typography>
          <Typography variant="h6" className="text">{categories?.length}</Typography>
        </Box>
      </Box>
      <Box className="recent-posts">
        <Typography variant="h6" className="title">Most recent posts</Typography>
        {articlesResponse?.articles && <ArticlesList articles={articlesResponse?.articles.slice(0, 4)} />}
      </Box>
    </StyledAdminPage>
  );
};

export default AdminPage;
