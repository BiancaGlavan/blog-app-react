import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticlesList from "../components/article/ArticlesList";
import CategoriesList from "../components/homepage/CategoriesList";
import ArticlesPageSkeleton from "../components/skeletons/skeletonsPages/ArticlesPageSkeleton";
import { useGetArticlesQuery, useGetCategoriesQuery } from "../redux/features/apiSlice";

const StyledArticlePage = styled(Container)`
  margin-top: 20px;

  .articles-feed {
    text-align: center;
    margin-bottom: 50px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.text.primary};
  }

  .categories {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
`;

const ArticlesPage = () => {
  const { data: articlesResponse, isLoading } = useGetArticlesQuery();
  const { id } = useParams();
  const {data: categories, isLoading: isLoadingCategories} = useGetCategoriesQuery();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);

  return (
    <StyledArticlePage className="ArticlesPage">
      {isLoadingCategories && isLoading && <ArticlesPageSkeleton />}
     {!isLoadingCategories && categories && <Box className="categories">
        <CategoriesList activeCategoryId={id || ""} categories={categories || []}/>
      </Box>}
      {!isLoading && articlesResponse && <><Typography className="articles-feed" variant="h5">
        The Feed
      </Typography>

       <ArticlesList articles={articlesResponse.articles} /></>}
    </StyledArticlePage>
  );
};

export default ArticlesPage;
