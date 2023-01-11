import { styled } from "@mui/material/styles";
import { IArticle } from "../../redux/features/apiSlice";
import classNames from "classnames";
import { baseURL } from "../../utils/config";
import { Box, Typography } from "@mui/material";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

interface IPropsArticle {
  article: IArticle;
  isRow?: boolean;
}

const StyledArticle = styled("div")`
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;

  &.isRow {
    flex-direction: row;
    height: 300px;
  }

  .article-img {
    width: 100%;
    height: 200px;
    object-fit: cover;

    &.isRow {
      width: 250px;
      height: 300px;
    }
  }

  .article-content {
    padding: 20px;
    height: 240px;

    &.isRow {
      width: 300px;
    }

    .article-title {
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
  }

  .article-details {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;

    .user {
      text-transform: uppercase;
    }
  }

  .article-desc {
    margin-top: 10px;
    overflow: hidden;
    line-height: 1.5rem;
    max-height: 6rem;
    -webkit-box-orient: vertical;
    display: block;
    display: -webkit-box;
    overflow: hidden !important;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;

    ${(props) => props.theme.breakpoints.down("sm")} {
      -webkit-line-clamp: 2;
    }
  }
`;

const Article = ({ article, isRow = false }: IPropsArticle) => {
  return (
    <StyledArticle className={classNames("Article", { isRow: isRow })}>
      <Link to={`/articles/${article._id}`}>
        <img className={classNames("article-img", { isRow: isRow })} src={article.image ? baseURL + article.image : "./default-thumbnail.jpg"} />
      </Link>
      <Box className={classNames("article-content", { isRow: isRow })}>
        <Box className="article-details">
          <Typography className="user" variant="caption">
            by {article.user.name}
          </Typography>
          <Typography variant="caption">{article.createdAt?.slice(0, 10)}</Typography>
          <Typography variant="caption">{article.category.title}</Typography>
        </Box>
        <Link to={`/articles/${article._id}`}>
          <Typography className="article-title" variant="h6">
            {article.title}
          </Typography>
        </Link>
        <Typography className="article-desc" variant="body1">
          {parse(article?.description)}
        </Typography>
      </Box>
    </StyledArticle>
  );
};

export default Article;
