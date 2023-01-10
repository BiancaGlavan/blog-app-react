import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import ArticlesPage from "./pages/ArticlesPage";
import CategoriesPage from "./pages/CategoriesPage";
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
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/articles/:id" element={<SingleArticlePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
