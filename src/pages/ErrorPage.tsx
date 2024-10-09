import { useNavigate } from "react-router";
const ErrorPage = () => {
  const nav = useNavigate();
  return (
    <div>
      <h1>어허이 여기로 오시면 안됩니다.</h1>
      <button onClick={() => nav("./main")}>돌아가주세요</button>
    </div>
  );
};

//  그냥 강의에서 가르쳐줘서 만들어봤습니다

export default ErrorPage;
