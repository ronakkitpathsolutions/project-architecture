import client, { METHODS } from './client';

export const api = {
  auth: {
    register: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: '/auth/register',
        method: METHODS.POST,
        data,
        ...configs,
      }),
    login: ({ auth, ...configs }: { auth: any; [key: string]: any }) =>
      client({
        url: '/auth/login',
        method: METHODS.POST,
        auth,
        ...configs,
      }),
    forgotPassword: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: '/auth/forgot-password',
        method: METHODS.POST,
        data,
        ...configs,
      }),
    restPassword: ({
      data,
      params,
      ...configs
    }: {
      data: any;
      params?: any;
      [key: string]: any;
    }) =>
      client({
        url: '/auth/reset-password',
        method: METHODS.POST,
        data,
        params,
        ...configs,
      }),
    getAuthToken: ({
      params,
      ...configs
    }: {
      params?: any;
      [key: string]: any;
    }) =>
      client({
        url: '/auth/verify-email',
        method: METHODS.GET,
        params,
        ...configs,
      }),
  },
  user: {
    get: ({ id, ...configs }: { id: string; [key: string]: any }) =>
      client({
        url: `/users/${id}`,
        method: METHODS.GET,
        ...configs,
      }),
  },
};
