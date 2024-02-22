import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../../server/API";

const axiosBaseQuery = () => async ({url, method, data}) => {
    try {
        const result = await api({
            url: url,
            method: method,
            data: data,
        })
        return { data: result.data }
    } catch (e) {
        return {
            error: {
                status: e.response?.status,
                data: e.response?.data || e.message,
            },
        }
    }
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/api/v1/login',
                method: 'POST',
                data: body
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/api/v1/register',
                method: 'POST',
                data: body
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/v1/logout',
                method: 'POST',
            }),
        }),
        confirmLogin: builder.mutation({
            query: (body) => ({
                url: '/userlogin',
                method: 'PUT',
                data: body
            }),
        }),
    })
})

export const { useConfirmLoginMutation, useLogoutMutation, useLoginMutation, useRegisterMutation } = authApi