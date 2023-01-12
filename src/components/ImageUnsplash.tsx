import { Box, Button, Dialog, DialogContent, Drawer, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useGetImagesQuery } from "../redux/features/apiUnsplashSlice";
import ImagesList from "./createArticle/ImagesList";
import { useNavigate } from "react-router-dom";

const StyledImageUnsplash = styled("div")`
  margin-top: 50px;

  .choose-img {
    max-height: 500px;
    max-width: 550px;
    opacity: 1;
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
    position: relative;

    &:hover {
      opacity: 0.8;

      .btn-choose {
        display: block;
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        font-weight: 700;
        color: ${(props) => props.theme.palette.text.primary};
        font-size: 20px;
        width: 100%;
      }
    }

    img {
      max-height: 500px;
      width: 100%;
      object-fit: cover;
    }

    .btn-choose {
        display: none;
    }
`;

const StyledDrawer = styled(Drawer)`
  .search-header {
    display: flex;
    gap: 20px;
    padding: 20px;
    align-items: center;
    justify-content: center;
  }

  .search-field {
    flex-grow: 1;

    .MuiInputBase-root {
      border-radius: 30px;
      margin: 5px;

      input {
        padding: 10px;
        padding-left: 30px;
      }
    }
  }

  .form {
    display: flex;
    flex-grow: 1;
    max-width: 700px;
    position: relative;
  }

  .search-images {
    height: 500px;
    overflow: auto;
    padding: 20px;
  }
`;

const ImageUnsplash = () => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const { data: images, isLoading } = useGetImagesQuery(term);
  console.log("isLoading", isLoading, "response: ", images);

  const textInput = useRef<HTMLInputElement>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeAndReset = () => {
    setOpen(false);
    setTerm("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  return (
    <StyledImageUnsplash>
      <Box className="choose-img">
        <img src="./images/choose-photo.jpg" alt="" />
        <Button onClick={handleClickOpen} className="btn-choose">
          Click to search an image
        </Button>
      </Box>
      <StyledDrawer anchor={"top"} open={open} onClose={closeAndReset}>
        <Box className="search-header">
          <IconButton onClick={closeAndReset}>
            <ArrowBackIcon />
          </IconButton>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              inputRef={textInput}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="search image"
              className="search-field"
              variant="outlined"
              autoComplete="off"
            />
          </form>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box className="search-images">{images && <ImagesList images={images.results} />}</Box>
      </StyledDrawer>
    </StyledImageUnsplash>
  );
};

export default ImageUnsplash;
