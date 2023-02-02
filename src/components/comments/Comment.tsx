import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CommentForm from "./CommentForm";

// interface IPropsComment {
//     comment,
//     replies,
//     setActiveComment,
//     activeComment,
//     updateComment,
//     deleteComment,
//     addComment,
//     parentId = null,
//     currentUserId,
// }

const StyledComment = styled("div")`
  display: flex;
  gap: 10px;

  .comment-content {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    align-items: center;

    ${(props) => props.theme.breakpoints.down('sm')} {
      flex-direction: column;
      align-items: flex-start;
    }

    .comment-author {
      font-weight: 500;
    }
  }

  .comment-text {
    margin-bottom: 30px;
  }

`;

const Comment = () => {
  //   const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";
  //   const fiveMinutes = 300000;
  //   const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  //   const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed;
  //   const canReply = Boolean(currentUserId);
  //   const replyId = parentId ? parentId : comment.id;
  //   const createdAt = new Date(comment.createdAt).toLocaleDateString();
  

  return (
    <StyledComment className="Comment">
      <Box className="comment-image-container">
        <Avatar alt="user avatar" src="/images/homepage-middle.jpg" />
      </Box>
      <Box className="comment-right-part">
        <Box className="comment-content">
          <Typography variant="body1" className="comment-author">
            Maria
          </Typography>
          <Typography variant="caption">03-02-2023</Typography>
        </Box>
        <Typography variant="body2" className="comment-text">
          This is first comment!
        </Typography>
        <Box className="comment-actions">
          {/* canReplay
            canDelete */}
        </Box>

        <Box className="comment-form">
          <CommentForm submitLabel="Reply" handleSubmit={() => {}} />
        </Box>

        <Box className="replies" sx={{ display: "flex", gap: "10px" }}>
          {/* <Comment /> */}
          <Box className="comment-image-container">
            <Avatar alt="user avatar" src="/images/homepage-middle.jpg" />
          </Box>
          <Box className="comment-right-part">
            <Box className="comment-content">
              <Typography variant="body1" className="comment-author">
                Maria
              </Typography>
              <Typography variant="caption">03-02-2023</Typography>
            </Box>
            <Typography variant="body2" className="comment-text">
              This is first child comment!
            </Typography>
          </Box>
          <Box className="comment-actions">
            {/* canReplay
            canDelete */}
          </Box>
        </Box>
      </Box>
    </StyledComment>
  );
};

export default Comment;
