import { Box, Button, Container, FormControl, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateArticleMutation, useGetCategoriesQuery, useUploadImageMutation } from "../redux/features/apiSlice";
import ImageDropzone from "../components/ImageDropzone";

const StyledEditor = styled(Container)`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .editor-input {
    height: 250px;
  }

  .btn {
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 300px;
  }
`;

const EditorPage = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const [createArticle, response] = useCreateArticleMutation();
  const [uploadImage, uploadImageResponse] = useUploadImageMutation();

  const { data: categories, isLoading } = useGetCategoriesQuery();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleCreateArticle = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      uploadImage(formData);
    }
  };

  useEffect(() => {
    if (uploadImageResponse.data) {
      const img = uploadImageResponse.data;
      console.log("data ", img);

      const newArticle = {
        title,
        description,
        category,
        image: img,
      };

      console.log("new article", newArticle);
      createArticle({ article: newArticle });
    }
  }, [uploadImageResponse]);

  return (
    <StyledEditor>
      <Typography variant="h5">Write an article</Typography>

      <FormControl sx={{ width: "300px" }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} label="Category" onChange={handleChange}>
          {categories?.map((category, idx) => (
            <MenuItem key={category._id} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        variant="outlined"
        type="text"
      />

      <ImageDropzone onChange={setFile} />

      <ReactQuill theme="snow" value={description} onChange={setDescription} className="editor-input" />
      <Button onClick={handleCreateArticle} variant="contained" size="large" className="btn">
        Add article
      </Button>
    </StyledEditor>
  );
};

export default EditorPage;
