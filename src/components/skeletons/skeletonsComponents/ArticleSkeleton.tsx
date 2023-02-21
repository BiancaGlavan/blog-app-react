import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";

interface IPropsArticleSkeleton {
  isRow?: boolean;
}

const StyledArticleSkeleton = styled("div")`
  max-width: 400px;
   display: flex;
  flex-direction: column;

  &.isRow {
    flex-direction: row;
    height: 300px;
    max-width: 600px;
    
  }

  .img-container {
    width: 100%;
    height: 200px;
    position: relative;
    margin-bottom: 10px;

    &.isRow {
      width: 250px;
      height: 298px;
    }

    ${(props) => props.theme.breakpoints.down("sm")} {
      height: 150px;
    }

    .article-img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;

      &.isRow {
        width: 250px;
        height: 298px;
      }
    }
  }

  .article-content {
    &.isRow {
      width: 700px;
      margin-top: 30px;
    }

    ${(props) => props.theme.breakpoints.down("sm")} {
      height: 200px;
    }
  }

  .article-details {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;

    .detail {
      width: 30%;
    }
  }
`;

const ArticleSkeleton = ({ isRow = false }: IPropsArticleSkeleton) => {
  return (
    <StyledArticleSkeleton  className={classNames("ArticleSkeleton", { isRow: isRow })}>
      <Box className="img-container">
        <Skeleton variant="rectangular" className={classNames("article-img", { isRow: isRow })} />
      </Box>

      <Box className={classNames("article-content", { isRow: isRow })}>
        <Box className="article-details">
          <Skeleton variant="text" className="detail" />
          <Skeleton variant="text" className="detail" />
          <Skeleton variant="text" className="detail" />
        </Box>
        <Box>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      </Box>
    </StyledArticleSkeleton>
  );
};

export default ArticleSkeleton;
