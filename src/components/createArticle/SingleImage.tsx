import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IImage, IImageResponse } from "../../redux/features/apiUnsplashSlice";

interface IPropsSingleImage {
  image: IImage;
}

const StyledSingleImage = styled("div")`
  .image-container {
    width: 230px;
    height: 230px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) => props.theme.breakpoints.down("md")} {
        width: 150px;
        height: 150px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SingleImage = ({ image }: IPropsSingleImage) => {
  return (
    <StyledSingleImage className="SingleImage">
      <Box className="image-container">
        <img src={image.urls.regular} />
      </Box>
    </StyledSingleImage>
  );
};

export default SingleImage;
