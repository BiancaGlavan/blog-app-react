import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ArticlesList from "../components/article/ArticlesList";
import CategoriesList from "../components/homepage/CategoriesList";
import { useGetArticleByIdQuery, useGetCategoriesQuery, useGetCategoryArticlesQuery } from "../redux/features/apiSlice";

const StyledArticlesByCategory = styled(Container)`
 
  margin-top: 80px;

  .categories {
    margin-bottom: 80px;
  }
`;

const ArticlesByCategory = () => {
  const { id } = useParams();

  const {
    data: categoryArticles,
    isLoading: categoryArticlesIsLoading,
    isFetching: categoryArticlesIsFetching,
  } = useGetCategoryArticlesQuery(id || "", { skip: !id });

  const {data: categories, isLoading: isLoadingCategories} = useGetCategoriesQuery();
  return (
    <StyledArticlesByCategory>
      <Box className="categories">
        <CategoriesList activeCategoryId={id || ""} categories={categories || []}/>
      </Box>
      
        {!categoryArticlesIsLoading && !categoryArticlesIsFetching && categoryArticles && (
          <ArticlesList articles={categoryArticles.articles} />
        )}
    </StyledArticlesByCategory>
  );
};

export default ArticlesByCategory;
