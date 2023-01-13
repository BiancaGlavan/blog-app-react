import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArticle } from "../../redux/features/apiSlice";
import Article from "./Article";

interface IPropsHomepageArticlesList {
    articles: IArticle[];
    isRow?: boolean;
}

const StyledHomepageArticlesList = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 30px;

`;

const HomepageArticlesList = ({articles, isRow}: IPropsHomepageArticlesList) => {
  return (
    <StyledHomepageArticlesList className="HomepageArticleList">
        {articles.map((article, idx) => <Article key={idx} article={article} isRow={isRow}/>)}
    </StyledHomepageArticlesList>
  )
}

export default HomepageArticlesList;