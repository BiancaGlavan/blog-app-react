import { Box, Container, FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StyledEditor = styled(Container)`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .editor-input {
    height: 250px;
  }

  .preview {
    margin-top: 20px;
  }
`;

const EditorPage = () => {
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <StyledEditor>
      <Typography variant="h5">Write an article</Typography>

      <FormControl sx={{ width: "300px" }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"category1"}>Category1</MenuItem>
        </Select>
      </FormControl>

      <ReactQuill theme="snow" value={value} onChange={setValue} className="editor-input" />
      <Box className="preview">
        {value}
      </Box>
    </StyledEditor>
  );
};

export default EditorPage;
