import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Login from "../navigation/Login";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import data from "../../utils/data.json";
import InfoIcon from "@mui/icons-material/Info";

const StyledSidebar = styled("div")`
  background: ${(props) => props.theme.palette.background.paper};
  padding: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) => props.theme.breakpoints.down("lg")} {
    padding: 10px;
  }

  .sidebar-login {
    .text {
      color: ${(props) => props.theme.palette.primary.main};
      margin-bottom: 30px;
      text-align: center;
    }
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .sidebar-social-media {
    display: flex;
    justify-content: center;

    img {
      max-width: 220px;
      height: 200px;
      object-fit: cover;

      ${(props) => props.theme.breakpoints.down("sm")} {
        height: 150px;
        max-width: 200px;
      }
    }

    .list-image-title {
      color: ${(props) => props.theme.palette.primary.main};
      text-align: center;
      font-size: 20px;
    }

    .image-list-bar {
      max-width: 220px;

      ${(props) => props.theme.breakpoints.down("sm")} {
        max-width: 200px;
      }
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar className="Sidebar">
      <Box className="sidebar-login">
        <Typography className="text" variant="h6">
          Login to start your own journey!
        </Typography>
        <Typography className="text" variant="h6">
          Write articles and make this blog awesome.
        </Typography>
        <Box className="login">
          <ArrowRightAltIcon />
          <Login />
        </Box>
      </Box>
      <Box className="sidebar-social-media">
        <ImageList sx={{ maxWidth: 450 }}>
          <ImageListItem cols={2}>
            <ListSubheader className="list-image-title" component="div">
              Find me on Instagram
            </ListSubheader>
          </ImageListItem>

          {data.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                className="image-list-bar"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </StyledSidebar>
  );
};

export default Sidebar;
