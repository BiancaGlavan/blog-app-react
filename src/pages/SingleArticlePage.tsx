import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import {
  IComment,
  ICommentPayload,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetArticleByIdQuery,
  useGetArticleCommentsQuery,
  useGetCategoryArticlesQuery,
  useLikeArticleMutation,
} from "../redux/features/apiSlice";
import parse from "html-react-parser";
import Article from "../components/article/Article";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../redux/hooks";
import Comment from "../components/comments/Comment";
import CommentsList from "../components/comments/CommentsList";
import { useEffect, useState } from "react";
import SingleArticleSkeleton from "../components/skeletons/skeletonsComponents/SingleArticleSkeleton";
import SingleArticleRelatedSkeleton from "../components/skeletons/skeletonsComponents/SingleArticleRelatedSkeleton";
import CommentForm from "../components/comments/CommentForm";
import FormatDate from "../utils/FormatDate";

const StyledSingleArticlePage = styled(Container)`
  margin-top: 50px;

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
    flex-wrap: wrap;
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

  .article-desc {
    font-family: ${(props) => props.theme.typography.fontFamily};
  }

  .comments {
    margin-top: 50px;
  }

  .comments-title {
    margin-bottom: 30px;
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

  const authState = useAppSelector((state) => state.auth);

  const [likeArticle, response] = useLikeArticleMutation();
  const { isLoading: isLoadingLike, isSuccess: isSuccessLike } = response;

  const [createComment, responseComment] = useCreateCommentMutation();
  const { isLoading: isLoadingCreateComment, isSuccess: isSuccesComment } = responseComment;

  const { data: articleComments, isLoading: isLoadingArticleComments } = useGetArticleCommentsQuery(id || "");

  const [deleteComment, deleteCommmentRes] = useDeleteCommentMutation();
  const { isLoading: isLoadingDeleteComment, isSuccess: isSuccesDeleteComment } = deleteCommmentRes;


  const handleLike = () => {
    if (article && article._id) {
      likeArticle(article._id);
    }
  };

  const handleAddComment = (newComment: ICommentPayload) => {
    if (isLoadingCreateComment) {
      return;
    }
    createComment({ comment: newComment });
  };

  const handleDeleteComment = async (comment: IComment) => {
    try {
      await deleteComment(comment._id).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);

  return (
    <StyledSingleArticlePage>
      <Grid container spacing={10}>
        <Grid item xs={12} md={8}>
          {isLoading && <SingleArticleSkeleton />}
          {!isLoading && article && (
            <>
              <img className="single-article-img" src={article?.image} />
              <Typography className="single-article-title" variant="h5">
                {article?.title && article?.title}
              </Typography>
              <Box className="single-article-details">
                <Typography variant="caption">by {article?.user?.name}</Typography>
                <Typography variant="caption">{article?.category?.title}</Typography>
                {article.createdAt && <Typography variant="caption">{FormatDate(article.createdAt)}</Typography>}
                <IconButton onClick={handleLike} className="icon">
                  {article.likes.includes(authState.user?._id || "") ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                {article.likes.length === 1 ? (
                  <Typography variant="caption">{article.likes.length} like</Typography>
                ) : (
                  <Typography variant="caption">{article.likes.length} likes</Typography>
                )}
              </Box>
              <Typography className="article-desc" variant="subtitle1">
                {parse(article?.description)}
              </Typography>
            </>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          {categoryArticlesIsLoading && <SingleArticleRelatedSkeleton />}
          {!categoryArticlesIsLoading && categoryArticles && (
            <Typography className="single-article-related" variant="h6">
              Related articles
            </Typography>
          )}
          {!categoryArticlesIsLoading &&
            !categoryArticlesIsFetching &&
            categoryArticles &&
            categoryArticles.articles.slice(0, 4).map((categArticle) => (
              <Box key={categArticle._id} className="related-article">
                <Article article={categArticle} />
              </Box>
            ))}
        </Grid>
      </Grid>
      <Box className="comments">
        <Typography className="comments-title" variant="h6">
          Comments
        </Typography>
        <Typography className="comment-form-title" variant="body1">
          {authState.isAuth ? "Write comment" : "Login to write comment"}
        </Typography>
        <CommentForm onSubmit={handleAddComment} submitLabel="Write" articleId={id || ""} />
        {articleComments?.comments && <CommentsList isLoadingDeleteComment={isLoadingDeleteComment} onDelete={handleDeleteComment} comments={articleComments.comments || []} />}
      </Box>
    </StyledSingleArticlePage>
  );
};

export default SingleArticlePage;
