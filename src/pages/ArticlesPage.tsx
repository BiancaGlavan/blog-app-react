import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticlesList from "../components/article/ArticlesList";
import { useGetArticlesQuery } from "../redux/features/apiSlice";

const StyledArticlePage = styled(Container)`
margin-top: 80px;
`;


const ArticlesPage = () => {
  const {data: articlesResponse, isLoading} = useGetArticlesQuery();

  return (
    <StyledArticlePage className="ArticlesPage">
      {!isLoading && articlesResponse && <ArticlesList articles={articlesResponse.articles}/>}
    </StyledArticlePage>
  )
}

export default ArticlesPage;