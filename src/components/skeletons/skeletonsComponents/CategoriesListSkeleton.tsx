import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCategoriesListSkeleton = styled("div")`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  overflow: auto;

  .cat {
    width: 60px;
  }
`;

const CategoriesListSkeleton = () => {
  return (
    <StyledCategoriesListSkeleton className="CategoriesListSkeleton">
      <Skeleton variant="text" className="cat" />
      <Skeleton variant="text" className="cat" />
      <Skeleton variant="text" className="cat" />
      <Skeleton variant="text" className="cat" />
    </StyledCategoriesListSkeleton>
  );
};

export default CategoriesListSkeleton;
