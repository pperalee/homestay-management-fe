import {
  postAsyncWithToken,
  getAsyncWithToken,
  getAsync,
} from "../constant/request";
export async function yourChats() {
  const url = process.env.REACT_APP_BACK_END + "/chats/your-chats";
  return getAsyncWithToken(url);
}
