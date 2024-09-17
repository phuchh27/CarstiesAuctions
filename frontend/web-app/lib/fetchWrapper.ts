import { auth } from "@/auth";

const baseUrl = "http://localhost:6001/";

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getHeader()
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: object) {
  const requestOptions = {
    method: "POST",
    headers: await getHeader(),
    body: JSON.stringify(body)
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
}

async function put(url: string, body: object) {
  const requestOptions = {
    method: "PUT",
    headers: await getHeader(),
    body: JSON.stringify(body)
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getHeader()
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return handleResponse(response);
}

async function getHeader() {
  const session = await auth();
  const headers: Record<string, string> = {
    "Content-type": "application/json"
  };

  if (session?.accessToken) {
    headers.Authorization = "Bearer " + session.accessToken;
  }
  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  // const data = text && JSON.parse(text);
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    data = text;
  }

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message:
        typeof data === "string" && data.length > 0 ? data : response.statusText
    };
    return { error };
  }
}

export const fetchWrapper = {
  get,
  post,
  put,
  del
};
