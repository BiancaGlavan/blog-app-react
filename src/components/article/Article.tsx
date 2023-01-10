import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IArticle } from "../../redux/features/apiSlice";
import { baseURL } from "../../utils/config";
import parse from "html-react-parser";

interface IPropsArticle {
  article: IArticle;
}

// ${props => props.theme.breakpoints.down("sm")} {

// }

const StyledArticle = styled("div")`
  margin-bottom: 30px;

  .article-card {
    max-width: 348px;
    display: flex;
    flex-direction: column;
  }

  .article-img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-bottom: 20px;
  }

  .truncate {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .article-cat {
    text-transform: uppercase;
    text-align: center;
  }

  .article-title {
    text-align: center;
  }
`;

const Article = ({ article }: IPropsArticle) => {
  return (
    <StyledArticle className="Article">
      <Box className="article-card">
        <img className="article-img" src={article.image ? baseURL + article.image : "./default-thumbnail.jpg"} />

        <Typography className="article-cat" variant="subtitle2" color="text.secondary">
          {article.category.title}
        </Typography>

        <Typography className="article-title"  gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" className="truncate">
          {parse(article.description)}
        </Typography> */}
        <Typography className="article-cat" variant="subtitle2" color="text.secondary">
          by {article.user.name}
        </Typography>
      </Box>
    </StyledArticle>
  );
};

export default Article;
