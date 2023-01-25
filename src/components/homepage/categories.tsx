import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { useGetCategoriesQuery } from "../../redux/features/apiSlice";
import { Link } from "react-router-dom";

const StyledCategories = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    ${(props) => props.theme.breakpoints.down('sm')} {
      gap: 5px;
    }

    .cat {
      color: black;
      font-weight: 600;
      font-size: 15px;

      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 14px;
      }

      &:hover {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
 

`;

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <StyledCategories className="Categories">
      {categories?.map((category) => (
          <Link key={category._id} to={`/categories/${category._id}/articles`}>
              <Button className="cat"> {category.title}</Button>
          </Link>
      ))}
    </StyledCategories>
  );
};

export default Categories;
