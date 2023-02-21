import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import AdminArticlesPage from "./pages/adminPages/AdminArticlesPage";
import AdminCategoriesPage from "./pages/adminPages/AdminCategoriesPage";
import AdminPage from "./pages/adminPages/AdminPage";
import ArticlesByCategory from "./pages/ArticlesByCategory";
import ArticlesPage from "./pages/ArticlesPage";
import AddArticlePage from "./pages/AddArticlePage";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import SingleArticlePage from "./pages/SingleArticlePage";
import blogTheme from "./theme/blogTheme";
import AdminEditArticlePage from "./pages/adminPages/AdminEditArticlePage";
import SkeletonPage from "./pages/SkeletonPage";

function App() {
  return (
    <ThemeProvider theme={blogTheme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/categories/:id/articles" element={<ArticlesByCategory />} />
            <Route path="/articles/add" element={<AddArticlePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/articles/:id" element={<SingleArticlePage />} />
            <Route path="/skeleton" element={<SkeletonPage />} />
            
          </Route>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/articles" element={<AdminArticlesPage />} />
            <Route path="/admin/articles/add" element={<AddArticlePage />} />
            <Route path="/admin/articles/:id/edit" element={<AdminEditArticlePage />} />

            
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
