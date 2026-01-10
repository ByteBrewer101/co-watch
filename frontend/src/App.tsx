
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TestPage } from "./pages/testpage/Testpage";
import { NavBar } from "./components/NavBar";
import { Homepage } from "./pages/homepage/Homepage";
import { Toaster } from "sonner";
import { SocketManager } from "./sockets/socketManager";

function App() {

     SocketManager.getSocketInstance();
     


  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster/>
        <NavBar />
        <Routes>
          <Route path="/" element=<Homepage/> />
          <Route path="/test" element=<TestPage /> />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
