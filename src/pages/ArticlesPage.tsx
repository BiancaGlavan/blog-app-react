import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Article from "../components/article/Article";

const StyledArticlePage = styled(Container)``;

const ArticlesPage = () => {
  return (
    <StyledArticlePage className="ArticlesPage">
      <Article />
    </StyledArticlePage>
  )
}

export default ArticlesPage;