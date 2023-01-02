import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { IArticle } from "../../redux/features/apiSlice";
import { baseURL } from "../../utils/config";

interface IPropsArticle {
  article: IArticle;
}

const StyledArticle = styled('div')``;

const Article = ({article}: IPropsArticle) => {
  return (
    <StyledArticle className="Article">
       <Card sx={{ maxWidth: 345 }}>
        <CardMedia image={'./default-thumbnail.jpg'} />
      <img style={{width: '100%'}} src={article.image ? baseURL+article.image : './default-thumbnail.jpg'} alt="" />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html: article.description.slice(0, 40)}}>
        </Typography>

        <Typography variant="h6" color="text.secondary">
          {article.category.title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
       
    </StyledArticle>
  )
}

export default Article;