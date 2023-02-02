import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const StyledCommentsList = styled('div')`
  .comments-title {
    margin-bottom: 30px;
  }
`;

const CommentsList = () => {

  const addComment = () => {

  };

  return (
    <StyledCommentsList className="CommentsList">
      <Typography className="comments-title" variant="h6">Comments</Typography>
      <Typography className="comment-form-title" variant="body1">Write comment</Typography>
      <CommentForm handleSubmit={addComment} submitLabel="Write"/>
      <Box className="comments-container">
        <Comment />
      </Box>
    </StyledCommentsList>
  )
}

export default CommentsList;