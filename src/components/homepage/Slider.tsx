import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { styled } from "@mui/material/styles";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";


const StyledSlider = styled("div")`

    .swiper-container {
        width: 100%;
    }

    .img-container {
        height: 300px;
        max-width: 490px;

        ${(props) => props.theme.breakpoints.down('md')} {
            height: 250px;
        }

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .logo {
        margin-top: 20px;
        text-align: center;
    }
`;

const Slider = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledSlider className="Slider">
      <Swiper
        className="swiper-container"
        spaceBetween={4}
        slidesPerView={3}
        breakpoints={{
            0: {
            slidesPerView: 1.2,
            },
          600: {
            slidesPerView: 2.2,
          },
          900: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide className="slide">
        <Box className="img-container">
          <img src="./images/homepage-left.jpg" alt="" />
        </Box>
        </SwiperSlide>
        <SwiperSlide className="slide">
        <Box className="img-container">
          <img src="./images/homepage-middle.jpg" alt="" />
        </Box>
        </SwiperSlide>
        <SwiperSlide className="slide">
        <Box className="img-container">
          <img src="./images/homepage-right.jpg" alt="" />
        </Box>
        </SwiperSlide>
      </Swiper>
      <Typography className="logo" variant="h6">~ Keep It Simple ~</Typography>
    </StyledSlider>
  );
};

export default Slider;
