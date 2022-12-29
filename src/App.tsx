import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import ArticlesPage from "./components/pages/ArticlesPage";
import CategoriesPage from "./components/pages/CategoriesPage";
import EditorPage from "./components/pages/EditorPage";
import Homepage from "./components/pages/Homepage";
import blogTheme from "./theme/blogTheme";


function App() {
  

  return (
    <ThemeProvider theme={blogTheme}>
    <CssBaseline />
    <div className="App">
      <Navigation />
      <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/articles' element={<ArticlesPage />} />
      <Route path='/categories' element={<CategoriesPage />} />
      <Route path='/editor' element={<EditorPage />} />
      </Routes>
    </div>
    </ThemeProvider>
  )
}

export default App;
