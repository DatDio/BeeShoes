import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const get = async (api: any, option = {}) => {
  const response = await httpRequest.get(api, option);
  return response.data;
};

export const remove = async (api: any) => {
  const response = await httpRequest.delete(api);
  return response;
};

export const post = async (api: any, data: any, config: any) => {
  const response = await httpRequest.post(api, data, config);
  return response;
};

export const put = async (api: any, data = {}) => {
  const response = await httpRequest.put(api, data);
  return response;
};

export default httpRequest;
