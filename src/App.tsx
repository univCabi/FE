import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/Login/LoginPage";
import ErrorPage from "@/pages/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*로그인 페이지 라우터 설정*/}
          <Route path="*" element={<ErrorPage />} />
          {/* 혹시나 해서 만들어 보는 에러페이지입니다 */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
