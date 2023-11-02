import { postAsyncWithToken, getAsync } from "../constant/request";
export async function review(bookingId, data) {
  const url = process.env.REACT_APP_BACK_END + "/reviews/" + bookingId;
  return postAsyncWithToken(url, data);
}

export async function getReviewsByHomestayId(id) {
  const url = process.env.REACT_APP_BACK_END + `/reviews/${id}`;
  return getAsync(url);
}
