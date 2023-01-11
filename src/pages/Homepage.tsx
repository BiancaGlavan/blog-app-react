import { Box, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
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

    .btn {
      margin-top: 50px;
      border-radius: 0;
    }
  }
`;

const Homepage = () => {
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
      <Container className="middle-section">
        <Grid container spacing={14}>
          <Grid item xs={12} md={6}>
            {articlesResponse && !isLoadingArticles && (
              <HomepageArticlesList articles={articlesResponse?.articles.slice(0, 3)} isRow={true} />
            )}
            <Button className="btn" variant="contained" size="large">See all posts</Button>
          </Grid>
          <Grid item xs={12} md={6}>
              <Sidebar />
          </Grid>  
        </Grid>
      </Container>
    </StyledHomePage>
  );
};

export default Homepage;
