import { Box, Button, Container, Grid, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import classNames from "classnames";
import ArticlesList from "../components/article/ArticlesList";
import HomepageArticlesList from "../components/article/HomepageArticlesList";
import Sidebar from "../components/homepage/Sidebar";
import { useGetArticlesQuery } from "../redux/features/apiSlice";

const StyledHomePage = styled("div")`
  margin-top: 80px;

  .homepage-top {
    margin-right: 20px;
    margin-left: 20px;
    display: flex;
    gap: 20px;

    ${(props) => props.theme.breakpoints.down("sm")} {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .img-container {
      max-width: 485px;
      max-height: 500px;

      ${(props) => props.theme.breakpoints.down("sm")} {
        max-width: 400px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .middle-section {
    margin-top: 100px;

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
  }


`;

const Homepage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablete = useMediaQuery(theme.breakpoints.down("lg"));

  const {
    data: articlesResponse,
    isLoading: isLoadingArticles,
    isFetching: isFetchingArticles,
  } = useGetArticlesQuery();

  return (
    <StyledHomePage className="Homepage">
      <Box className="homepage-top">
        <Box className="img-container">
          <img src="./images/homepage-left.jpg" alt="" />
        </Box>
        <Box className="img-container">
          <img src="./images/homepage-middle.jpg" alt="" />
        </Box>
        <Box className="img-container">
          <img src="./images/homepage-right.jpg" alt="" />
        </Box>
      </Box>
      <Box className="middle-section">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6}>
           <Box className="homepage-articles">
           {articlesResponse && !isLoadingArticles && !isMobile && !isTablete && (
              <HomepageArticlesList articles={articlesResponse?.articles.slice(0, 3)} isRow={true} />
            )}
            {articlesResponse && !isLoadingArticles && isTablete && !isMobile && (
              <ArticlesList articles={articlesResponse?.articles.slice(0, 3)} />
            )}
            {articlesResponse && !isLoadingArticles && isMobile && (
              <HomepageArticlesList articles={articlesResponse?.articles.slice(0, 3)} />
            )}
            <Button className="btn" variant="contained" size="large">
              See all posts
            </Button>
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
