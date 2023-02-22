import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticleSkeleton from "./ArticleSkeleton";

const StyledSingleArticleRelatedSkeleton = styled("div")`
  .related-articles {
    display: flex;
    flex-direction: column;
    gap: 30px;

    .article-skeleton {
      ${(props) => props.theme.breakpoints.down("lg")} {
        max-width: 900px;
      }
    }
  }

  .single-article-related {
    margin-bottom: 30px;
    width: 150px;
  }
`;

const SingleArticleRelatedSkeleton = () => {
  return (
    <StyledSingleArticleRelatedSkeleton className="SingleArticleRelatedSkeleton">
      <Skeleton variant="rectangular" className="single-article-related" />

      <Box className="related-articles">
        <Box className="article-skeleton">
          <ArticleSkeleton />
        </Box>
        <Box className="article-skeleton">
          <ArticleSkeleton />
        </Box>
        <Box className="article-skeleton">
          <ArticleSkeleton />
        </Box>
      </Box>
    </StyledSingleArticleRelatedSkeleton>
  );
};

export default SingleArticleRelatedSkeleton;
