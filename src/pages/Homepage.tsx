import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import ArticlesList from "../components/article/ArticlesList";
import HomepageArticlesList from "../components/article/HomepageArticlesList";
import Sidebar from "../components/homepage/Sidebar";
import CategoriesList from "../components/homepage/CategoriesList";
import { useGetArticlesQuery, useGetCategoriesQuery } from "../redux/features/apiSlice";
import { useEffect, useState } from "react";
import CategoriesListSkeleton from "../components/skeletons/skeletonsComponents/CategoriesListSkeleton";
import HomepageArticlesListSkeleton from "../components/skeletons/skeletonsComponents/HomepageArticlesListSkeleton";
import ArticlesSkeletonList from "../components/skeletons/skeletonsComponents/ArticlesSkeletonList";

const StyledHomePage = styled("div")`
  margin-top: 20px;

  .homepage-top {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
  }

  .middle-section {
    margin-top: 80px;

    .homepage-articles {
      margin-left: 20px;

      ${(props) => props.theme.breakpoints.down("lg")} {
        margin-right: 20px;
      }
    }

    .sidebar {
      margin-right: 20px;

      ${(props) => props.theme.breakpoints.down("lg")} {
        margin-right: 0;
        margin-left: 0;
      }
    }

    .btn {
      margin-top: 50px;
      margin-bottom: 50px;
      border-radius: 0;
    }

    .text {
      margin-bottom: 20px;
    }
  }
`;

const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablete = useMediaQuery(theme.breakpoints.down("lg"));
  const { id } = useParams();
  const {data: categories, isLoading: isLoadingCategories} = useGetCategoriesQuery();

  const {
    data: articlesResponse,
    isLoading: isLoadingArticles,
    isFetching: isFetchingArticles,
  } = useGetArticlesQuery();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);


  return (
    <StyledHomePage className="Homepage">
      <Box className="homepage-top">
        {isLoadingCategories && <CategoriesListSkeleton />}
        {categories && !isLoadingCategories && <CategoriesList activeCategoryId={id || ""} categories={categories || []}/>}
      </Box>
   
      <Box className="middle-section">
      <Grid container spacing={12}>
        <Grid item xs={12} md={12} lg={6}>
          <Box className="homepage-articles">
            <Typography variant="h6" className="text">
              Recent articles
            </Typography>
            {articlesResponse && !isLoadingArticles && !isMobile && !isTablete && (
              <HomepageArticlesList articles={articlesResponse?.articles.slice(0, 3)} isRow={true} />
            )}
            {isLoadingArticles && !isMobile && !isTablete && <HomepageArticlesListSkeleton isRow={true}/>}

            {articlesResponse && !isLoadingArticles && isTablete && !isMobile && (
              <ArticlesList articles={articlesResponse?.articles.slice(0, 3)} />
            )}
            {isLoadingArticles && isTablete && !isMobile && <ArticlesSkeletonList />}

            {articlesResponse && !isLoadingArticles && isMobile && (
              <HomepageArticlesList articles={articlesResponse?.articles.slice(0, 3)} />
            )}
            {isLoadingArticles && isMobile && <HomepageArticlesListSkeleton />}
            <Link to={"/articles"}>
              <Button className="btn" variant="contained" size="large">
                See all posts
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Box className="sidebar">
            <Sidebar />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </StyledHomePage>
  );
};

export default Homepage;
