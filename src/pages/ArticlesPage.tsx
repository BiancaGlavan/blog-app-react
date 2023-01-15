import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArticlesList from "../components/article/ArticlesList";
import { useGetArticlesQuery } from "../redux/features/apiSlice";

const StyledArticlePage = styled(Container)`
margin-top: 80px;

.articles-feed {
  text-align: center;
  margin-bottom: 50px;
  font-weight: 600;
  color: ${(props) => props.theme.palette.text.primary};
}
`;


const ArticlesPage = () => {
  const {data: articlesResponse, isLoading} = useGetArticlesQuery();

  return (
    <StyledArticlePage className="ArticlesPage">
      <Typography className="articles-feed" variant="h5">The Feed</Typography>
      {!isLoading && articlesResponse && <ArticlesList articles={articlesResponse.articles}/>}
    </StyledArticlePage>
  )
}

export default ArticlesPage;