import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";

const StyledAdminSidebar = styled("div")`
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid #e0d1c3;
  height: 100vh;

  .sidebar-btn {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    width: 90%;
  }

  .link {
    width: 100%;
  }
`;

const AdminSidebar = () => {
  return (
    <StyledAdminSidebar className="AdminSidebar">
      <Link className="link" to={"/admin"}>
        <Button className="sidebar-btn" startIcon={<HomeIcon />}>
          Dashboard
        </Button>
      </Link>
      <Link className="link" to={"/admin/categories"}>
        <Button className="sidebar-btn" startIcon={<CategoryIcon />}>
          Categories
        </Button>
      </Link>
      <Link className="link" to={"/admin/articles"}>
        <Button className="sidebar-btn" startIcon={<ArticleIcon />}>
          Articles
        </Button>
      </Link>
      <Link className="link" to={"/admin/users"}>
        <Button className="sidebar-btn" startIcon={<AccountBoxIcon />}>
          Users
        </Button>
      </Link>
    </StyledAdminSidebar>
  );
};

export default AdminSidebar;
