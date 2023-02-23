import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArticlePayload, useCreateArticleMutation, useGetCategoriesQuery } from "../redux/features/apiSlice";
import ManageArticle from "../components/article/ManageArticle";
import NavigateBack from "../components/navigation/NavigateBack";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const StyledAddArticlePage = styled(Container)`
  margin-top: 20px;
`;

const AddArticlePage = () => {
  const [createArticle, response] = useCreateArticleMutation();
  const { isLoading: isLoadingCreateArticle, isSuccess: isSuccesArticle } = response;

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { id } = useParams();

  const handleCreateArticle = (newArticle: IArticlePayload) => {
    if (isLoadingCreateArticle) {
      return;
    }
    createArticle({ article: newArticle });
  };


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [id]);


  return (
    <StyledAddArticlePage className="AddArticlePage">
      <NavigateBack />
      <Typography variant="h5">Write an article</Typography>
      <ManageArticle
        articleSaved={isSuccesArticle}
        onSubmit={handleCreateArticle}
        isLoading={isLoadingCreateArticle}
        categories={categories || []}
        alertTitle="Your article was created!"
      />
    </StyledAddArticlePage>
  );
};

export default AddArticlePage;
