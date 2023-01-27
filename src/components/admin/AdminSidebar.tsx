import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

const StyledAdminSidebar = styled(Paper)`
  width: 280px; 
  height: 100vh;

  .list {
    position: sticky;
    top: 0;
    padding-top: 70px;
  }
`;

const AdminSidebar = () => {
  return (
    <StyledAdminSidebar variant="outlined" square className="AdminSidebar">
      <List className="list" sx={{ width: "100%" }}>
        <Link className="link" to={"/admin"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="link" to={"/admin/categories"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="link" to={"/admin/articles"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Articles" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="link" to={"/admin/users"}>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </StyledAdminSidebar>
  );
};

export default AdminSidebar;
