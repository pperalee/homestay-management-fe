import {
  postAsyncWithHeader,
  getCookie,
  postAsyncWithToken,
  getAsyncWithToken,
  putAsyncWithToken,
  getAsync,
} from "../constant/request";
import axios from "axios";
export async function createHomestay(data, image) {
  const url = process.env.REACT_APP_BACK_END + "/homestays";
  return postAsyncWithToken(url, data);
}

export async function deleteHomestay(id) {
  const url = process.env.REACT_APP_BACK_END + `/homestays/${id}/delete`;
  return postAsyncWithToken(url);
}

export async function editHomestay(id, data) {
  const url = process.env.REACT_APP_BACK_END + "/homestays/" + id;
  return putAsyncWithToken(url, data);
}

export async function getListHomestay(userid) {
  const url = process.env.REACT_APP_BACK_END + `/homestays?userid=${userid}`;
  return getAsyncWithToken(url);
}

export async function getHomestay(id) {
  const url = process.env.REACT_APP_BACK_END + `/homestays/${id}`;
  return getAsync(url);
}
