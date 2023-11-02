import {
  getAsync,
  postAsyncWithToken,
  putAsyncWithToken,
} from "../constant/request";
export async function createService(data) {
  const url = process.env.REACT_APP_BACK_END + "/services";
  return postAsyncWithToken(url, data);
}

export async function editService(id, data) {
  const url = process.env.REACT_APP_BACK_END + "/services/" + id;
  return putAsyncWithToken(url, data);
}

export async function getServicesByHomestay(homestayId) {
  const url =
    process.env.REACT_APP_BACK_END + "/services/" + homestayId + "/all";
  return getAsync(url);
}

export async function getServiceById(id) {
  const url = process.env.REACT_APP_BACK_END + "/services/" + id;
  return getAsync(url);
}
