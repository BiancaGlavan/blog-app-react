import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useGetArticleByIdQuery, useGetCategoryArticlesQuery } from "../redux/features/apiSlice";
import parse from "html-react-parser";
import Article from "../components/article/Article";

const StyledSingleArticlePage = styled(Container)`
margin-top: 80px;
`;

const SingleArticlePage = () => {
  const { id } = useParams();
  const { data: article, isLoading, isFetching } = useGetArticleByIdQuery(id || "");
  const {
    data: categoryArticles,
    isLoading: categoryArticlesIsLoading,
    isFetching: categoryArticlesIsFetching,
  } = useGetCategoryArticlesQuery(article?.category._id || "", {skip: !article?.category._id});

  return (
    <StyledSingleArticlePage>
      <Grid container spacing={10}>
        <Grid item xs={12} md={9}>
          {!isLoading && !isFetching && article && (
            <>
              <img src={article?.image} alt="" />
              <Typography variant="h6">{article?.title && article?.title}</Typography>
              <Typography variant="caption">Article created by {article?.user.name} | </Typography>
              <Typography variant="caption">Category: {article?.category.title}</Typography>
              <Typography>{article?.description && parse(article?.description)}</Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6">Related articles</Typography>
          {!categoryArticlesIsLoading && !categoryArticlesIsFetching && categoryArticles &&
            categoryArticles.articles.map((categArticle) => <Article key={categArticle.id} article={categArticle} />)}
        </Grid>
      </Grid>
    </StyledSingleArticlePage>
  );
};

export default SingleArticlePage;
