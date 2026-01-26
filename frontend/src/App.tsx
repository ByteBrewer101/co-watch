
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TestPage } from "./pages/testpage/Testpage";
import { Homepage } from "./pages/homepage/Homepage";

import { MainPage } from "./pages/mainpage/MainPage";
import { GlobalProvider } from "./ContextApi/GlobalProvider";



function App() {
  
 

  return (
    <GlobalProvider>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element=<Homepage /> />
          <Route path="/main" element=<MainPage /> />
          <Route path="/test" element=<TestPage /> />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
