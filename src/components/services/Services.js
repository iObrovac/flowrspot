import axios from "axios";
import Cookies from "js-cookie";
import { has, omit } from "lodash-es";
import mixpanel from "mixpanel-browser";

import { refreshAccessToken } from "@app/services/auth";
import { history } from "@app/utils/history";

let isRefreshing = false;
let refreshSubscribers = [];

async function refreshTokenIfExpired(error) {
  // If the error was caused by cancelling the request, just rethrow.
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }

  const {
    config,
    response: { status },
  } = error;
  const originalRequest = config;

  const refreshToken = Cookies.get("refresh_token");

  if (status !== 401) {
    return Promise.reject(error);
  }

  if (!isRefreshing) {
    isRefreshing = true;

    refreshAccessToken(refreshToken)
      .then((newToken) => {
        onRefreshed(newToken);
      })
      .catch(() => {
        mixpanel.reset();
        history.push("/login");
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  return new Promise((resolve) => {
    subscribeToTokenRefresh((token) => {
      if (token) {
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        resolve(privateApi(originalRequest));
      }
    });
  });
}

/////////////////////////////////////

function subscribeToTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  // Timeout needed in case the `onRefreshed` function is called before all the failed requests are subscribed.
  setTimeout(() => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
  }, 250);
}

function normalize(response) {
  let data = {};

  if (has(response, "data.data")) {
    data = response.data.data;
  } else if (has(response, "data")) {
    data = response.data;
  }

  return { ...response, data, ...omit(response.data, ["data"]) };
}

function reject(error) {
  return Promise.reject(error);
}

export const apiUrlVersion = (version) =>
  `${process.env.REACT_APP_SERVICE_BASE_URL}/api/${version}`;
export const apiURLv1 = apiUrlVersion("v1");

/**
 * Axios instance for public endpoints.
 */
export const publicApi = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_BASE_URL,
  "Content-Type": "application/json",
  withCredentials: true,
});

/**
 * Axios instance for protected endpoints.
 */
export const privateApi = axios.create({
  baseURL: apiURLv1,
  headers: {
    "Content-Type": "application/json",
  },
});

export const analyticsApi = axios.create({
  baseURL: process.env.REACT_APP_ANALYTICS_BASE_URL,
  headers: {
    "x-api-key": process.env.REACT_APP_ANALYTICS_API_KEY,
    "Content-Type": "application/json",
  },
});

export const monetizationAnalyticsApi = axios.create({
  baseURL: process.env.REACT_APP_MONETIZATION_ANALYTICS_BASE_URL,
  headers: {
    "x-api-key": process.env.REACT_APP_MONETIZATION_ANALYTICS_API_KEY,
    "Content-Type": "application/json",
  },
});

publicApi.interceptors.response.use(normalize, reject);
privateApi.interceptors.response.use(normalize, refreshTokenIfExpired);
analyticsApi.interceptors.response.use(normalize, reject);
monetizationAnalyticsApi.interceptors.response.use(normalize, reject);

/**
 * Attaches the provided token as an axios Authorization header.
 *
 * @param {string} token
 */
export function attachAuthorizationHeader(token) {
  publicApi.defaults.headers.common["Authorization"] = `Bearer ${token}`.trim();
  privateApi.defaults.headers.common["Authorization"] =
    `Bearer ${token}`.trim();
}

attachAuthorizationHeader(Cookies.get("access_token") || "");

export function removeAuthorizationHeader() {
  publicApi.defaults.headers.common["Authorization"] = `Bearer `;
}

export function removeCookies() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("token_type");
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////

export async function fetchOrganizations() {
  const { data: organizations } = await privateApi.get("/organizations");
  return organizations;
}

export async function importPodcastOnOrganization(organizationId, data) {
  try {
    const response = await privateApi.post(
      `/organizations/${organizationId}/import`,
      data
    );
    return response.data;
  } catch ({ response }) {
    return {
      error: response.data,
    };
  }
}

export async function createShowOnOrganization(organizationId, data) {
  const response = await privateApi.post(
    `/organizations/${organizationId}/shows`,
    data
  );

  if (responseOk(response)) {
    return response.data;
  }
}

export async function fetchOrganizationShows(organizationId, params) {
  return await privateApi.get(`/organizations/${organizationId}/shows`, {
    params,
  });
}

export async function createOrganization(data) {
  const response = await privateApi.post("/organizations", data);

  if (responseOk(response)) {
    return response.data;
  }
}

export async function addPodcastsToOrganization({ organizationId, showIds }) {
  const response = await privateApi.post(
    ` /organizations/${organizationId}/shows/migrate`,
    { shows: showIds }
  );

  if (responseOk(response)) {
    return response.data;
  }
}

export async function fetchOrganizationUsers(organizationId, params) {
  return await privateApi.get(`/organizations/${organizationId}/users`, {
    params,
  });
}

export async function addUsersToOrganization(organizationId, data) {
  const response = await privateApi.post(
    `/organizations/${organizationId}/invites`,
    data
  );

  if (responseOk(response)) {
    return response.data;
  }
}
