import { config } from "../config/config";
import { useAppSelector } from "../store";

export interface HttpResponse {
  data: any;
  message: string;
  code: string;
  error: boolean;
}

export function httpGet(path: string, headers: any = {}) {
  return fetch(`${config.API_BASE}${path}`, {
    method: "GET",
    headers: {
      accept: "application/json",
      ...headers,
    },
  })
    .then(async (res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .catch(async (err) => {
      if (!err.json) throw err;
      return err.json();
    });
}

export function httpPost(path: string, data: any, headers: any = {}) {
  return fetch(`${config.API_BASE}${path}`, {
    method: "POST",
    body: data,
    headers: {
      accept: "application/json",
      ...headers,
    },
  })
    .then(async (res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .catch(async (err) => {
      if (!err.json) throw err;
      return err.json();
    });
}

export function httpPatch(path: string, data: any, headers: any = {}) {
  return fetch(`${config.API_BASE}${path}`, {
    method: "PATCH",
    body: data,
    headers: {
      accept: "application/json",
      ...headers,
    },
  })
    .then(async (res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .catch(async (err) => {
      if (!err.json) throw err;
      return err.json();
    });
}

export function useHttpGet() {
  const token = useAppSelector((state) => state.login?.token || "");

  return (path: string, headers: any = {}) => {
    return httpGet(path, { ...headers, authorization: `bearer ${token}` });
  };
}

export function useHttpPost() {
  const token = useAppSelector((state) => state.login?.token || "");

  return (path: string, data: any, headers: any = {}) => {
    return httpPost(path, data, {
      ...headers,
      authorization: `bearer ${token}`,
    });
  };
}

export function useHttpPatch() {
  const token = useAppSelector((state) => state.login?.token || "");

  return (path: string, data: any, headers: any = {}) => {
    return httpPatch(path, data, {
      ...headers,
      authorization: `bearer ${token}`,
    });
  };
}
