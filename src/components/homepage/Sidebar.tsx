import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledSidebar = styled("div")`
  margin-right: 20px;

  ${(props) => props.theme.breakpoints.down("lg")} {
    margin-left: 20px;
  }

  .text {
    margin-bottom: 20px;
  }

  .sidebar-content {
    display: flex;
    gap: 30px;
    align-items: center;
    flex-direction: column;

    ${(props) => props.theme.breakpoints.down("lg")} {
      flex-direction: row;
    }

    @media screen and (max-width: 700px) {
      flex-direction: column;
    }
  }

  .img-container {
    height: 500px;
    width: 100%;

    ${(props) => props.theme.breakpoints.down("lg")} {
      height: 400px;
    }

    img {
      height: 500px;
      object-fit: cover;
      width: 100%;

      ${(props) => props.theme.breakpoints.down("lg")} {
        height: 400px;
      }
    }
  }

  .aboutme-info {
    margin-bottom: 30px;
  }

  .aboutme-btn {
    border-radius: 0;
    width: 200px;
  }
`;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <StyledSidebar className="Sidebar">
      <Typography className="text" variant="h6">
        About me
      </Typography>
      <Box className="sidebar-content">
        <Box className="img-container">
          <img src="../images/aboutme.jpg" alt="" />
        </Box>
        <Box className="about-me">
          <Typography className="aboutme-info" variant="body1">
            Welcome to my blog! I'm Bianca and and I'm a writer who's passionate about photography, traveling, writing,
            and reading.
          </Typography>
          {!isMobile && (
            <>
              <Typography className="aboutme-info" variant="body1">
                As a writer, I strive to create content that's engaging, informative, and thought-provoking.
              </Typography>
              <Typography className="aboutme-info" variant="body1">
                In this blog, I'll be sharing my thoughts and experiences on all of these topics and more. Whether
                you're a fellow photography enthusiast, a fellow traveler, or just someone who loves to read, I hope
                you'll find something of value here. Thanks for stopping by!
              </Typography>
            </>
          )}
          <Link to={`/articles/add`}><Button className="aboutme-btn" variant="contained" size="large">Write</Button></Link>
        </Box>
      </Box>
    </StyledSidebar>
  );
};

export default Sidebar;
