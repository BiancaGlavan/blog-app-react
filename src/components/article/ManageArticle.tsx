import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArticlePayload, ICategory } from "../../redux/features/apiSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUnsplash from "../ImageUnsplash";
import { useEffect, useState } from "react";
import AlertComponent from "../admin/AlertComponent";

interface IPropsManageArticle {
  article?: IArticlePayload;
  onSubmit: (article: IArticlePayload) => void;
  categories: ICategory[];
  isLoading?: boolean;
  articleSaved?: boolean;
  alertTitle: string;
  textButton?: string;
}

const StyledManageArticle = styled("div")`
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
    margin-bottom: 50px;
  }
`;

const ManageArticle = ({
  article,
  categories,
  onSubmit,
  isLoading = false,
  articleSaved = false,
  alertTitle,
  textButton = 'Add article'
}: IPropsManageArticle) => {
  const [category, setCategory] = useState(article?.category || "");
  const [description, setDescription] = useState(article?.description || "");
  const [title, setTitle] = useState(article?.title || "");
  const [image, setImage] = useState(article?.image || "");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleSubmit = () => {
    const newArticle: IArticlePayload = {
      title,
      description,
      category,
      image: image,
    };

    onSubmit(newArticle);
  };

  useEffect(() => {
    if (articleSaved) {
      setDescription("");
      setCategory("");
      setTitle("");
      setImage("");
    }
  }, [articleSaved]);

  return (
    <StyledManageArticle className="ManageArticle">
      {articleSaved && (
        <AlertComponent alertTitle={alertTitle}/>
      )}
      <Grid container spacing={10}>
        <Grid className="create-article" item xs={12} md={6}>
          <FormControl sx={{ width: "300px" }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={handleCategoryChange}>
              {categories.map((category, idx) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            label="Title"
            variant="outlined"
            type="text"
            autoComplete="off"
          />
          <ReactQuill theme="snow" value={description} onChange={setDescription} className="editor-input" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ImageUnsplash currentImage={image} onImageChange={setImage} />
        </Grid>
      </Grid>
      <Button disabled={isLoading} onClick={handleSubmit} variant="contained" size="large" className="btn-create">
        {isLoading ? "loading..." : textButton}
      </Button>
    </StyledManageArticle>
  );
};

export default ManageArticle;
