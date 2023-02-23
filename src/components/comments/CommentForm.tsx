import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormEvent, useState } from "react";
import { ICommentPayload } from "../../redux/features/apiSlice";
import { useAppSelector } from "../../redux/hooks";

interface IPropsCommentForm {
  onSubmit: (newComment: ICommentPayload) => void;
  submitLabel: string;
  articleId: string;
}

const StyledCommentForm = styled("div")`

  margin-bottom: 30px;
  max-width: 500px;

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .comment-form-button {
    max-width: 150px;
  }

`;

const CommentForm = ({ onSubmit, submitLabel, articleId }: IPropsCommentForm) => {
  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;
  const authState = useAppSelector((state) => state.auth);

  const addComment = () => {
    const newComment: ICommentPayload = {
      text: text,
      article: articleId,
    };
    onSubmit(newComment);

    setText("");
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addComment();
  };


  return (
    <StyledCommentForm className="CommentForm">
      <form className="form-container" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          autoComplete="off"
          multiline
          placeholder="What's in your mind..."
          className="comment-form-textfield"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!authState.isAuth}
        />
        <Button onClick={addComment} variant="contained" className="comment-form-button" disabled={isTextareaDisabled}>
          {submitLabel}
        </Button>
      
      </form>
    </StyledCommentForm>
  );
};

export default CommentForm;
