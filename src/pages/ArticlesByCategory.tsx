import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticlesList from "../components/article/ArticlesList";
import CategoriesList from "../components/homepage/CategoriesList";
import ArticlesSkeletonList from "../components/skeletons/skeletonsComponents/ArticlesSkeletonList";
import CategoriesListSkeleton from "../components/skeletons/skeletonsComponents/CategoriesListSkeleton";

import { useGetCategoriesQuery, useGetCategoryArticlesQuery } from "../redux/features/apiSlice";

const StyledArticlesByCategory = styled(Container)`
 
  margin-top: 20px;

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);


  return (
    <StyledArticlesByCategory>
      <Box className="categories">
        {isLoadingCategories && <CategoriesListSkeleton />}
        {!isLoadingCategories && categories && <CategoriesList activeCategoryId={id || ""} categories={categories || []}/>}
      </Box>
      {categoryArticlesIsLoading && <ArticlesSkeletonList/>}
        {!categoryArticlesIsLoading && !categoryArticlesIsFetching && categoryArticles && (
          <ArticlesList articles={categoryArticles.articles} />
        )}
    </StyledArticlesByCategory>
  );
};

export default ArticlesByCategory;
