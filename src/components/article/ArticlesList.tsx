import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArticle } from "../../redux/features/apiSlice";
import Article from "./Article";

interface IPropsArticlesList {
    articles: IArticle[];
}

const StyledArticlesList = styled('div')`
`;

const ArticlesList = ({articles}: IPropsArticlesList) => {

  return (
    <StyledArticlesList className="ArticlesList">
        <Grid  container spacing={2} >
            {articles.map((article, idx) => <Grid item key={article?._id}  xs={6} sm={6}  md={4} lg={3}>
                <Article article={article}/>
            </Grid>)}
        </Grid>
    </StyledArticlesList>
  )
}

export default ArticlesList;