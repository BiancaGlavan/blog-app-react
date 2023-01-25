import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetArticleByIdQuery } from "../../redux/features/apiSlice";

const StyledAdminEditArticlePage = styled("div")``;

const AdminEditArticlePage = () => {
  const { id } = useParams();
  const { data: article, isLoading, isFetching } = useGetArticleByIdQuery(id || "");
  const [title, setTitle] = useState('');


  useEffect(() => {
    if(article) {
    //   setIsArticleCreated(true);
    //   setDescription('');
    //   setCategory('');
      setTitle(article.title);
    //   setImage('');
    }

  }, [article]);

  return (
    <StyledAdminEditArticlePage className="AdminEditArticlePage">
       {isLoading && 'is loading...'}
       
    </StyledAdminEditArticlePage>
  );
};

export default AdminEditArticlePage;
