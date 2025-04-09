import api from "@/api/axiosInterceptApi";

// 북마크 리스트
export const bookmarkListApi = async () => {
  try {
    const response = await api.get("/cabinet/bookmark/list");
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error;
  }
};

// 북마크 추가
export const addBookmarkApi = async (cabinetId: number) => {
  try {
    const response = await api.post("/cabinet/bookmark/add", { cabinetId });
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error;
  }
};

// 북마크 제거
export const removeBookmarkApi = async (cabinetId: number) => {
  try {
    const response = await api.post("/cabinet/bookmark/remove", { cabinetId });
    return { status: response.status, data: response.data };
  } catch (error) {
    throw error;
  }
};
