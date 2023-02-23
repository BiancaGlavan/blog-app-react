import { Box, Button, Drawer, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetImagesQuery } from "../redux/features/apiUnsplashSlice";
import ImagesList from "./createArticle/ImagesList";
import { useNavigate } from "react-router-dom";
import useDebounce from "../utils/useDebounce";
import defaultImage from '../assets/choose-photo.jpg';

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

    
    ${(props) => props.theme.breakpoints.down("sm")} {
      opacity: 0.8;
    }

    img {
      max-height: 500px;
      width: 100%;
      object-fit: cover;
    }

    .btn-choose {
      display: none;

      ${(props) => props.theme.breakpoints.down("sm")} {
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

interface IPropsImageUnsplash {
  currentImage: string;
  onImageChange: (image: string) => void;
}

const ImageUnsplash = ({ currentImage, onImageChange }: IPropsImageUnsplash) => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const debouncedTerm = useDebounce(term, 300);
  
  const { data: images, isLoading } = useGetImagesQuery({ term: debouncedTerm, page: page }, { skip: debouncedTerm.length < 2 });

  const textInput = useRef<HTMLInputElement>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeAndReset = () => {
    setOpen(false);
    setTerm("");
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <StyledImageUnsplash>
      <Box className="choose-img">
        <img src={currentImage || defaultImage} alt="" />
        <Button onClick={handleClickOpen} className="btn-choose">
          Click to search an image
        </Button>
      </Box>
      <StyledDrawer anchor={"top"} open={open} onClose={closeAndReset}>
        <Box className="search-header">
          <IconButton onClick={closeAndReset}>
            <ArrowBackIcon />
          </IconButton>
          <form className="form">
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
        </Box>
        <Box className="search-images">
          {images && (
            <ImagesList
              onNextPage={handleNextPage}
              onImageChange={onImageChange}
              images={images.results}
              onCloseDrawer={closeAndReset}
              hasNext={images.total_pages > page}
            />
          )}
        </Box>
      </StyledDrawer>
    </StyledImageUnsplash>
  );
};

export default ImageUnsplash;
