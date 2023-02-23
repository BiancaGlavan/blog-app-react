import { Avatar, Box, Button, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IComment } from "../../redux/features/apiSlice";
import FormatDate from "../../utils/FormatDate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

interface IPropsComment {
  comment: IComment;
  onDelete: (comment: IComment) => void;
  isLoadingDeleteComment: boolean;
}

const StyledComment = styled("div")`
  display: flex;
  gap: 10px;

  .comment-content {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    align-items: center;

    ${(props) => props.theme.breakpoints.down("sm")} {
      flex-direction: column;
      align-items: flex-start;
      gap: 0px;
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

  .icon-delete {
    width: 20px;
  }
`;

const StyledDialog = styled(Dialog)`
  .delete-buttons {
    display: flex;
    justify-content: space-around;
  }
`;

const Comment = ({ comment, onDelete, isLoadingDeleteComment = false }: IPropsComment) => {
  const authState = useAppSelector((state) => state.auth);
  const [commentId, setCommentId] = useState("");
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleDeleteOpen = (comment: IComment) => {
    setCommentId(comment._id);
    setOpenDialogDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDialogDelete(false);
  };

  return (
    <StyledComment className="Comment">
      <Box className="comment-image-container">
        <Avatar alt="user avatar" src={comment.user.image}>
          {comment.user.name.slice(0, 1)}
        </Avatar>
      </Box>
      <Box className="comment-right-part">
        <Box className="comment-content">
          <Typography variant="body1" className="comment-author">
            {comment.user.name}
          </Typography>
          <Box>
            <Typography className="date" variant="caption">
              {FormatDate(comment.createdAt)}
            </Typography>
            {authState.isAuth && authState.user?._id === comment.user._id && (
              <IconButton onClick={() => handleDeleteOpen(comment)}>
                <DeleteIcon className="icon-delete" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography variant="body2" className="comment-text">
          {comment.text}
        </Typography>
      </Box>

      <StyledDialog open={openDialogDelete} onClose={handleCloseDelete}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
          <Typography variant="body1">Are you sure you want to delete your comment?</Typography>
          <Box className="delete-buttons">
            <Button onClick={handleCloseDelete}>Close</Button>
            <Button onClick={() => onDelete(comment)} variant="contained" color="error" size="small">
              {isLoadingDeleteComment ? "is loading..." : "Delete Comment"}
            </Button>
          </Box>
        </DialogContent>
      </StyledDialog>
    </StyledComment>
  );
};

export default Comment;
