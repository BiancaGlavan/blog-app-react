import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSingleArticleSkeleton = styled("div")`
  .single-article-img {
    width: 100%;
    height: 400px;
    margin-bottom: 50px;
  }

  .single-article-title {
    width: 60%;
  }

  .single-article-details {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 30px;
    align-items: center;
  }
`;

const SingleArticleSkeleton = () => {
  return (
    <StyledSingleArticleSkeleton className="SingleArticleSkeleton">
      <Skeleton variant="rectangular" className="single-article-img" />
      <Skeleton variant="rectangular" className="single-article-title" />
      <Box className="single-article-details">
        <Skeleton variant="text" width="10%" />
        <Skeleton variant="text" width="10%" />
        <Skeleton variant="text" width="10%" />
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="text" width="10%" />
      </Box>
      <Skeleton variant="rectangular" className="article-desc" height={950} />
    </StyledSingleArticleSkeleton>
  );
};

export default SingleArticleSkeleton;
