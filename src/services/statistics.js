import { getAsyncWithToken } from "../constant/request";
export async function getStatisticsByHomestay(url) {
  return getAsyncWithToken(url);
}
