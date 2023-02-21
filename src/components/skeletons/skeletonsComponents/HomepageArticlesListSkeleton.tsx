import { styled } from "@mui/material/styles";
import ArticleSkeleton from "./ArticleSkeleton";

interface IPropsHomeArticlesLists {
  isRow?: boolean;
}

const StyledHomepageArticlesListSkeleton = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const HomepageArticlesListSkeleton = ({isRow}: IPropsHomeArticlesLists) => {
  return (
    <StyledHomepageArticlesListSkeleton className="HomepageArticlesListSkeleton">
      <ArticleSkeleton isRow={isRow}/>
      <ArticleSkeleton isRow={isRow}/>
      <ArticleSkeleton isRow={isRow}/>
    </StyledHomepageArticlesListSkeleton>
  );
};

export default HomepageArticlesListSkeleton;
