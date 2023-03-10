import { Box, Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import { useState } from "react";
import { IImage } from "../../redux/features/apiUnsplashSlice";

interface IPropsImagesList {
  images: IImage[];
  onImageChange: (image: string) => void;
  onCloseDrawer: () => void;
  onNextPage: () => void;
  hasNext?: boolean;
}

const StyledImagesList = styled(Container)`
  .image {
    width: 230px;
    height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.selected {
      padding: 3px;
      border: 4px solid ${(props) => props.theme.palette.primary.main};
    }

    ${(props) => props.theme.breakpoints.down("md")} {
      width: 150px;
      height: 150px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .buttons {
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    gap: 20px;

    .add-btn {
      border-radius: 0;
    }
  }
`;

const ImagesList = ({ images, onImageChange, onCloseDrawer, onNextPage, hasNext = false }: IPropsImagesList) => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleSaveImage = () => {
    onImageChange(selectedImage);
    onCloseDrawer();
  };

  return (
    <StyledImagesList className="ImagesList">
      <Grid container spacing={2}>
        {images.map((image, idx) => (
          <Grid item key={idx} xs={6} sm={4} md={3} lg={3}>
            <div
              onClick={() => setSelectedImage(image.urls.regular)}
              className={classNames("image", { selected: selectedImage === image.urls.regular })}
            >
              <img src={image.urls.regular} />
            </div>
          </Grid>
        ))}
      </Grid>
      <Box className="buttons">
        {images.length > 0 && (
          <>
            <Button className="more-btn" onClick={() => onNextPage()}>
              Show more
            </Button>
            <Button disabled={!selectedImage} className="add-btn" variant="contained" onClick={handleSaveImage}>
              add image
            </Button>
          </>
        )}
      </Box>
    </StyledImagesList>
  );
};

export default ImagesList;
