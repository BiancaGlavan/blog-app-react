import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IImage, IImageResponse } from "../../redux/features/apiUnsplashSlice";
import SingleImage from "./SingleImage";

interface IPropsImagesList {
    images: IImage[];
}

const StyledImagesList = styled(Container)`

`;

const ImagesList = ({images}: IPropsImagesList) => {
  return (
    <StyledImagesList className="ImagesList">
      <Grid container spacing={2}>
        {images.map((image, idx) => <Grid item key={idx} xs={6} sm={4} md={3} lg={3}>
          <SingleImage image={image} />
        </Grid>)}
      </Grid>
    </StyledImagesList>
  )
}

export default ImagesList;