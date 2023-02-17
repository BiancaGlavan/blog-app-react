import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArticlePayload, useCreateArticleMutation, useGetCategoriesQuery } from "../redux/features/apiSlice";
import ManageArticle from "../components/article/ManageArticle";
import NavigateBack from "../components/navigation/NavigateBack";

const StyledAddArticlePage = styled(Container)`
  margin-top: 80px;
`;

const AddArticlePage = () => {
  const [createArticle, response] = useCreateArticleMutation();
  const { isLoading: isLoadingCreateArticle, isSuccess: isSuccesArticle } = response;

  const { data: categories, isLoading } = useGetCategoriesQuery();

  const handleCreateArticle = (newArticle: IArticlePayload) => {
    if (isLoadingCreateArticle) {
      return;
    }
    createArticle({ article: newArticle });
  };

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
