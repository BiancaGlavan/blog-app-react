import { styled } from "@mui/material/styles";
import { ICategory } from "../../redux/features/apiSlice";
import { Button } from "@mui/material";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface IPropsCategories {
  categories: ICategory[];
  activeCategoryId: string;
}
const StyledCategories = styled("div")`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  overflow: auto;

  ::-webkit-scrollbar {
    height: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: none;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.palette.grey[800]};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.palette.grey[700]};
  }

  .category {
    color: ${(props) => props.theme.palette.text.primary};
    font-weight: 600;

    &.active {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const Categories = ({ categories, activeCategoryId }: IPropsCategories) => {
  return (
    <StyledCategories className="Categories">
      {categories.map((category) => (
        <Link to={`/categories/${category._id}/articles`} key={category._id}>
          <Button className={classNames("category", { active: activeCategoryId === category._id })}>
            {category.title}
          </Button>
        </Link>
      ))}
    </StyledCategories>
  );
};

export default Categories;
