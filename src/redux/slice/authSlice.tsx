import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth", // Redux 상태 구분 식별자
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});
export const { setAccessToken, clearAccessToken } = authSlice.actions; // 디스패치를 위한 액션 생성자 함수
export default authSlice.reducer; //Redux store에 리듀서를 등록하기 위함
