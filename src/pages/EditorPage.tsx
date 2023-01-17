import { Alert, Backdrop, Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateArticleMutation, useGetCategoriesQuery } from "../redux/features/apiSlice";
import ImageUnsplash from "../components/ImageUnsplash";

const StyledEditor = styled(Container)`
  margin-top: 80px;

  .create-article {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .editor-input {
    height: 285px;
  }

  .btn-create {
    margin-top: 60px;
    max-width: 300px;
    border-radius: 0;
  }

  .alert {
    margin-top: 20px;
  }
`;

const EditorPage = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState('');
  const [isArticleCreated, setIsArticleCreated] = useState(false);


  const [createArticle, response] = useCreateArticleMutation();
  const { isLoading: isLoadingCreateArticle } = response;
  
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleCreateArticle = () => {

    const newArticle = {
      title,
      description,
      category,
      image: image,
    };

    console.log("new article", newArticle);
    createArticle({ article: newArticle });
  };

  useEffect(() => {
    if(response.isSuccess) {
      setIsArticleCreated(true);
      setDescription('');
      setCategory('');
      setTitle('');
      setImage('');
    }

  }, [response]);

  return (
    <StyledEditor>
      <Typography variant="h5">Write an article</Typography>
      {isArticleCreated ? <Alert severity="success">Your article was created!</Alert> : null}
      <Grid container spacing={10}>
        <Grid className="create-article" item xs={12} md={6}>
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
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="outlined"
            type="text"
          />
          <ReactQuill theme="snow" value={description} onChange={setDescription} className="editor-input" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageUnsplash currentImage={image} onImageChange={setImage}/>
        </Grid>
      </Grid>

      {/* <ImageDropzone onChange={setFile} /> */}

      <Button onClick={handleCreateArticle} variant="contained" size="large" className="btn-create">
        Add article
      </Button>
      {isLoadingCreateArticle && (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
      
    </StyledEditor>
  );
};

export default EditorPage;
