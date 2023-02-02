import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormEvent, useState } from "react";

interface IPropsCommentForm {
  handleSubmit: (text: string) => void;
  submitLabel: string;
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

const CommentForm = ({ handleSubmit, submitLabel }: IPropsCommentForm) => {
  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <StyledCommentForm className="CommentForm">
      <form className="form-container" onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          autoComplete="off"
          multiline
          placeholder="What's in your mind..."
          className="comment-form-textfield"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" className="comment-form-button" disabled={isTextareaDisabled}>
          {submitLabel}
        </Button>
      
      </form>
    </StyledCommentForm>
  );
};

export default CommentForm;
