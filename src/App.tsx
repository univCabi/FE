import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/Login/LoginPage";
import ErrorPage from "@/pages/ErrorPage";
import SearchPage from "@/pages/SearchPage";
import HistoryPage from "@/pages/HistoryPage";
import ProfilePage from "@/pages/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
          {/* 혹시나 해서 만들어 보는 에러페이지입니다 */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
