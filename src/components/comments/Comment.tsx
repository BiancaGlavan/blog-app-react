import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IComment } from "../../redux/features/apiSlice";
import FormatDate from "../../utils/FormatDate";

interface IPropsComment {
  comment: IComment;
}

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

    .date {
      margin-top: 4px;
    }
  }

  .comment-text {
    margin-bottom: 30px;
  }

`;

const Comment = ({comment}: IPropsComment) => {
  

  return (
    <StyledComment className="Comment">
      <Box className="comment-image-container">
        <Avatar alt="user avatar" src={comment.user.image || "/images/choose-photo.jpg"} />
      </Box>
      <Box className="comment-right-part">
        <Box className="comment-content">
          <Typography variant="body1" className="comment-author">
            {comment.user.name}
          </Typography>
          <Typography className="date" variant="caption">{FormatDate(comment.createdAt)}</Typography>
        </Box>
        <Typography variant="body2" className="comment-text">
          {comment.text}
        </Typography>
      </Box>
    </StyledComment>
  );
};

export default Comment;
