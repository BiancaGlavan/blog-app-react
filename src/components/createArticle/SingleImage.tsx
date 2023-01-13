import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import { IImage, IImageResponse } from "../../redux/features/apiUnsplashSlice";

interface IPropsSingleImage {
  image: IImage;
  selected?: boolean;
}

const StyledSingleImage = styled("div")`
  width: 230px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.selected {
    border: 3px solid red;
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
`;

const SingleImage = ({ image, selected = false }: IPropsSingleImage) => {
  return (
    <StyledSingleImage className={classNames("SingleImage", { selected: selected })}>
      <img src={image.urls.regular} />
    </StyledSingleImage>
  );
};

export default SingleImage;
