import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useGetArticleByIdQuery, useGetCategoryArticlesQuery, useLikeArticleMutation } from "../redux/features/apiSlice";
import parse from "html-react-parser";
import Article from "../components/article/Article";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from "../redux/hooks";

const StyledSingleArticlePage = styled(Container)`
  margin-top: 80px;

  .single-article-img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    margin-bottom: 50px;
  }

  .single-article-details {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 30px;
    text-transform: uppercase;
    align-items: center;
  }

  .single-article-related {
    margin-bottom: 30px;
  }

  .single-article-title {
    font-weight: 600;
    font-size: 28px;
  }

  .related-article {
    margin-bottom: 30px;
  }

  .icon {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const SingleArticlePage = () => {
  const { id } = useParams();
  const { data: article, isLoading, isFetching } = useGetArticleByIdQuery(id || "");
  const {
    data: categoryArticles,
    isLoading: categoryArticlesIsLoading,
    isFetching: categoryArticlesIsFetching,
  } = useGetCategoryArticlesQuery(article?.category._id || "", { skip: !article?.category._id });

  const authState = useAppSelector(state => state.auth);

  const [likeArticle, response] = useLikeArticleMutation();
  const { isLoading: isLoadingLike, isSuccess: isSuccessLike } = response;

  const handleLike = () => {
    if(article && article._id) {
      likeArticle(article._id);
    }
  }

  return (
    <StyledSingleArticlePage>
      <Grid container spacing={10}>
        <Grid item xs={12} md={9}>
          {!isLoading && article && (
            <>
              <img className="single-article-img" src={article?.image} />
              <Typography className="single-article-title" variant="h5">
                {article?.title && article?.title}
              </Typography>
              <Box className="single-article-details">
                <Typography variant="caption">by {article?.user?.name}</Typography>
                <Typography variant="caption">{article?.category?.title}</Typography>
                <Typography variant="caption">{article.createdAt?.slice(0, 10)}</Typography>
                <IconButton onClick={handleLike} className="icon">
                 {article.likes.includes(authState.user?._id || "") ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography variant="caption">{article.likes.length} likes</Typography>
              </Box>
              <Typography variant="subtitle1">{parse(article?.description)}</Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={3}>
          {!categoryArticlesIsLoading && categoryArticles && (
            <Typography className="single-article-related" variant="h6">
              Related articles
            </Typography>
          )}
          {!categoryArticlesIsLoading &&
            !categoryArticlesIsFetching &&
            categoryArticles &&
            categoryArticles.articles.slice(0, 4).map((categArticle) => (
              <Box className="related-article">
                <Article key={categArticle.id} article={categArticle} />
              </Box>
            ))}
        </Grid>
      </Grid>
    </StyledSingleArticlePage>
  );
};

export default SingleArticlePage;
