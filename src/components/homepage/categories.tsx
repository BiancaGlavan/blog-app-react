import { styled } from "@mui/material/styles";
import { Box, Button, IconButton, Menu } from "@mui/material";
import { useGetCategoriesQuery } from "../../redux/features/apiSlice";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const StyledCategories = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  ${(props) => props.theme.breakpoints.down("sm")} {
    gap: 5px;
  }

  .cat {
    color: black;
    font-weight: 600;
    font-size: 15px;

    ${(props) => props.theme.breakpoints.down("sm")} {
      font-size: 14px;
    }

    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const StyledCategoryMenu = styled(Menu)`
  .cat {
    color: black;
    font-weight: 600;
    font-size: 15px;

    ${(props) => props.theme.breakpoints.down("sm")} {
      font-size: 14px;
    }

    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledCategories className="Categories">
      {categories &&
        categories?.slice(0, 3).map((category) => (
          <Link key={category._id} to={`/categories/${category._id}/articles`}>
            <Button className="cat"> {category.title}</Button>
          </Link>
        ))}
      {categories && categories.length > 3 && (
        <>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, margin: "0 10px" }}>
              <MoreVertIcon />
            </IconButton>
            <StyledCategoryMenu
              sx={{ mt: "50px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                className="dropdown-cat"
                sx={{
                  padding: "10px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                {categories.slice(3).map((category) => (
                  <Link key={category._id} to={`/categories/${category._id}/articles`}>
                    <Button className="cat"> {category.title}</Button>
                  </Link>
                ))}
              </Box>
            </StyledCategoryMenu>
          </Box>
        </>
      )}
    </StyledCategories>
  );
};

export default Categories;
