import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ArticlesList from "../components/article/ArticlesList";
import Categories from "../components/homepage/categories";
import { useGetArticleByIdQuery, useGetCategoryArticlesQuery } from "../redux/features/apiSlice";

const StyledArticlesByCategory = styled(Container)`
 
  margin-top: 80px;

  .categories {
    margin-bottom: 80px;
  }
`;

const ArticlesByCategory = () => {
  const { id } = useParams();
  const { data: article, isLoading, isFetching } = useGetArticleByIdQuery(id || "");
  const {
    data: categoryArticles,
    isLoading: categoryArticlesIsLoading,
    isFetching: categoryArticlesIsFetching,
  } = useGetCategoryArticlesQuery(id || "", { skip: !id });

  return (
    <StyledArticlesByCategory>
      <Box className="categories">
        <Categories />
      </Box>
      
        {!categoryArticlesIsLoading && !categoryArticlesIsFetching && categoryArticles && (
          <ArticlesList articles={categoryArticles.articles} />
        )}
    </StyledArticlesByCategory>
  );
};

export default ArticlesByCategory;
