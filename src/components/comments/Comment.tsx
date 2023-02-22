import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CommentForm from "./CommentForm";


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
  

  return (
    <StyledComment className="Comment">
      <Box className="comment-image-container">
        <Avatar alt="user avatar" src="/images/choose-photo.jpg" />
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
      </Box>
    </StyledComment>
  );
};

export default Comment;
