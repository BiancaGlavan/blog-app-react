import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/navigation/Navigation";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import ArticlesByCategory from "./pages/ArticlesByCategory";
import ArticlesPage from "./pages/ArticlesPage";
import EditorPage from "./pages/EditorPage";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import SingleArticlePage from "./pages/SingleArticlePage";
import blogTheme from "./theme/blogTheme";

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
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/articles/:id" element={<SingleArticlePage />} />
          </Route>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/admin" element={<div>admin page</div>} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
