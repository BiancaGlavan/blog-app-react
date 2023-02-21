import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticleSkeleton from "./ArticleSkeleton";

const StyledArticlesSkeleton = styled('div')``;

const ArticlesSkeletonList = () => {
  return (
    <StyledArticlesSkeleton className="ArticlesSkeletonList">
         <Grid  container spacing={2} >
           <Grid item  xs={6} sm={6}  md={4} lg={3}>
                <ArticleSkeleton />
            </Grid>
            <Grid item  xs={6} sm={6}  md={4} lg={3}>
                <ArticleSkeleton />
            </Grid>
            <Grid item  xs={6} sm={6}  md={4} lg={3}>
                <ArticleSkeleton />
            </Grid>
            <Grid item  xs={6} sm={6}  md={4} lg={3}>
                <ArticleSkeleton />
            </Grid>
        </Grid>
    </StyledArticlesSkeleton>
  )
}

export default ArticlesSkeletonList;