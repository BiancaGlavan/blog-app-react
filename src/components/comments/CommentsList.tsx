import { styled } from "@mui/material/styles";
import { IComment } from "../../redux/features/apiSlice";
import Comment from "./Comment";

interface IPropsCommentsList {
  comments: IComment[];
  onDelete: (comment: IComment) => void;
  isLoadingDeleteComment: boolean;

}

const StyledCommentsList = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentsList = ({ comments, onDelete, isLoadingDeleteComment = false }: IPropsCommentsList) => {
  return (
    <StyledCommentsList className="CommentsList">
      {comments.map((comment, idx) => (
        <Comment isLoadingDeleteComment={isLoadingDeleteComment} onDelete={onDelete} key={idx} comment={comment} />
      ))}
    </StyledCommentsList>
  );
};

export default CommentsList;
