import { Box, Container, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticlesSkeletonList from "../skeletonsComponents/ArticlesSkeletonList";
import CategoriesListSkeleton from "../skeletonsComponents/CategoriesListSkeleton";

const StyledArticlesPageSkeleton = styled(Container)`
  margin-top: 60px;

  .feed {
    font-size: 40px;
    width: 150px;
    margin: 0 auto;
    margin-bottom: 40px;
  }

  .articles-feed {
    width: 100%;
  }

  .categories {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
 
`;

const ArticlesPageSkeleton = () => {
  return (
    <StyledArticlesPageSkeleton className="ArticlesPageSkeleton">
      <Box className="categories">
        <CategoriesListSkeleton />
      </Box>
      <Box className="feed">
        <Skeleton variant="text" className="articles-feed" />
      </Box>
      <ArticlesSkeletonList />
    </StyledArticlesPageSkeleton>
  );
};

export default ArticlesPageSkeleton;
