import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ManageArticle from "../../components/article/ManageArticle";
import {
  IArticlePayload,
  useGetArticleByIdQuery,
  useGetCategoriesQuery,
  useUpdateArticleMutation,
} from "../../redux/features/apiSlice";

const StyledAdminEditArticlePage = styled(Container)``;

const AdminEditArticlePage = () => {
  const { id } = useParams();
  const { data: article, isLoading, isFetching } = useGetArticleByIdQuery(id || "");
  const [title, setTitle] = useState("");

  const articlePayload: IArticlePayload = {
    category: article?.category._id || "",
    title: article?.title || "",
    description: article?.description || "",
    image: article?.image || '',
  };

  const [updateArticle, response] = useUpdateArticleMutation();
  const { isLoading: isLoadingUpdateArticle, isSuccess: isSuccesUpdateArticle } = response;

  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

  const handleUpdateArticle = (newArticle: IArticlePayload) => {
    if (isLoadingUpdateArticle) {
      return;
    }
    updateArticle({ article: newArticle, id: id || "" });
  };

  return (
    <StyledAdminEditArticlePage className="AdminEditArticlePage">
      {article && !isFetching && (
        <ManageArticle
          articleSaved={isSuccesUpdateArticle}
          onSubmit={handleUpdateArticle}
          isLoading={isLoadingUpdateArticle}
          categories={categories || []}
          alertTitle="Your article was updated!"
          article={articlePayload}
          textButton="Update article"
        />
      )}
    </StyledAdminEditArticlePage>
  );
};

export default AdminEditArticlePage;
