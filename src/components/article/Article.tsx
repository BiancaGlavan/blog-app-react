import { styled } from "@mui/material/styles";
import { IArticle } from "../../redux/features/apiSlice";
import classNames from "classnames";
import { baseURL } from "../../utils/config";
import { Box, Button, Typography } from "@mui/material";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

interface IPropsArticle {
  article: IArticle;
  isRow?: boolean;
  isMobile?: boolean;
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
      height: 298px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      height: 150px;
    }
  }

  .article-content {
    padding: 20px;
    height: 240px;

    &.isRow {
      width: 300px;
    }

    ${(props) => props.theme.breakpoints.down('sm')} {
      height: 200px;
      padding: 5px;
    }

    .article-title {
      cursor: pointer;
      font-weight: 600;
      &:hover {
        color: ${(props) => props.theme.palette.primary.main};
      }

      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 16px;
        overflow: hidden;
        line-height: 1.2rem;
        max-height: 4rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        overflow: hidden !important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
      }
    }
  }

  .article-details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;

    ${(props) => props.theme.breakpoints.down('sm')} {
      gap: 5px;
    }

    .detail {
      ${(props) => props.theme.breakpoints.down('sm')} {
        font-size: 10px;
      }
    }

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
      font-size: 14px;
    }
  }

  .cat {
    font-size: 12px;
    color: ${(props) => props.theme.palette.text.primary};
    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const Article = ({ article, isRow = false, isMobile = false }: IPropsArticle) => {
  return (
    <StyledArticle className={classNames("Article", { isRow: isRow })}>
      <Link to={`/articles/${article._id}`}>
        <img className={classNames("article-img", { isRow: isRow })} src={article.image ? article.image : "./default-thumbnail.jpg"} />
      </Link>
      <Box className={classNames("article-content", { isRow: isRow })}>
        <Box className="article-details">
          <Typography className="user detail" variant="caption">
            by {article.user?.name}
          </Typography>
          <Typography className="detail" variant="caption">{article.createdAt?.slice(0, 10)}</Typography>
          <Link to={`/categories/${article.category._id}/articles`}>
          <Typography className="detail cat" >{article.category.title}</Typography>
          </Link>
        </Box>
        <Link to={`/articles/${article._id}`}>
          <Typography className="article-title" variant="subtitle1">
            {article.title}
          </Typography>
        </Link>
        <Typography className="article-desc" variant="body2" component='div'>
          {parse(article?.description)}
        </Typography>
      </Box>
    </StyledArticle>
  );
};

export default Article;
