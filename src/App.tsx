import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@/App.css";
import AdminLoginPage from "@/pages/Admin/AdminLoginPage";
import AdminMainPage from "@/pages/Admin/AdminMainPage";
import AdminSearchPage from "@/pages/Admin/AdminSearchPage";
import AvailablePage from "@/pages/AvailablePage";
import ErrorPage from "@/pages/ErrorPage";
import HistoryPage from "@/pages/HistoryPage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import ProfilePage from "@/pages/ProfilePage";
import SearchPage from "@/pages/SearchPage";
import MainLayout from "@/layouts/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 일반 사용자 라우터 */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/available" element={<AvailablePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />

          {/* Admin 라우터 */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/login" replace />}
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<MainLayout />}>
            <Route path="/admin/main" element={<AdminMainPage />} />
            <Route path="/admin/search" element={<AdminSearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
