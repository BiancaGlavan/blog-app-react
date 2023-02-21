import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

const StyledAdminSidebar = styled(Paper)`
  width: 280px;
  min-height: 100vh;
  background: ${(props) => props.theme.palette.secondary.main};

  .list {
    position: sticky;
    top: 0;
    padding-top: 70px;
  }

  .list-item {
    color: #fff;
  }
`;

const AdminSidebar = () => {
  return (
    <StyledAdminSidebar variant="outlined" square className="AdminSidebar">
      <List className="list" sx={{ width: "100%" }}>
        <Link className="link" to={"/admin"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="list-item">
                <HomeIcon />
              </ListItemIcon>
              <ListItemText className="list-item" primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="link" to={"/admin/categories"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="list-item">
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText className="list-item" primary="Categories" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="link" to={"/admin/articles"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="list-item">
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText className="list-item" primary="Articles" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </StyledAdminSidebar>
  );
};

export default AdminSidebar;
