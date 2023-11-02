import {
  postAsyncWithToken,
  getAsyncWithToken,
  getAsync,
} from "../constant/request";
export async function createDiscount(data) {
  const url = process.env.REACT_APP_BACK_END + "/discounts";
  return postAsyncWithToken(url, data);
}

export async function deactivateDiscount(id) {
  const url = process.env.REACT_APP_BACK_END + "/discounts/" + id;
  return postAsyncWithToken(url, {});
}

export async function getListDiscount() {
  const url = process.env.REACT_APP_BACK_END + "/discounts";
  return getAsyncWithToken(url);
}

export async function getDiscountsByHomestay(id, params = {}) {
  console.log({ params });
  const url = process.env.REACT_APP_BACK_END + "/discounts/homestays/" + id;
  return getAsync(url, params);
}
