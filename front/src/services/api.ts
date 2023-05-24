import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { parseCookies, setCookie } from 'nookies'

interface RefreshTokenResponse {
  token: string
  refreshToken: string
}

interface FailedRequest {
  onSucess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

// interface ApiError {
//   code: string;
//   message: string;
// }

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: FailedRequest[] = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['pind.token']}`,
  },
})

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies()

      const { 'pind.refreshToken': refreshToken } = cookies
      const originalConfig = error.config as AxiosRequestConfig
      const regreshh = cookies['pind.refreshToken']

      if (!isRefreshing) {
        isRefreshing = true
        console.log('cehgou', cookies['pind.refreshToken'])

        api
          .patch<RefreshTokenResponse>(
            '/token/refresh',
            {
              regreshh,
            },
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          )
          .then((response) => {
            const { token } = response.data

            setCookie(undefined, 'pind.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            })
            setCookie(
              undefined,
              'pind.refreshToken',
              response.data.refreshToken,
              {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              },
            )

            api.defaults.headers.Authorization = `Bearer ${token}`

            failedRequestsQueue.forEach((request) => request.onSucess(token))
            failedRequestsQueue = []
          })
          .catch((err) => {
            failedRequestsQueue.forEach((request) => request.onFailure(err))
            failedRequestsQueue = []
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSucess: (token: string) => {
            originalConfig.headers = originalConfig.headers || {}
            originalConfig.headers.Authorization = `Bearer ${token}`

            resolve(api(originalConfig))
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          },
        })
      })
      // } else {
      //   //deslogar usuario

      // }
    }

    return Promise.reject(error)
  },
)

// interface ErrorResponse {
//   code?: string
// }

// let cookies = parseCookies()
// let isRefreshing = false
// const failedRequestsQueue = []

// export const api = axios.create({
//   baseURL: "http://localhost:3333",
//   headers: {
//     Authorization: `Bearer ${cookies['pind.token']}`
//   }
// });

// api.interceptors.response.use(response => {
//   return response
// }, (error: AxiosError<ErrorResponse>) => {
//   if (error.response?.status === 401) {
//     if (error.response.data?.code === 'token.expired') {
//       cookies = parseCookies()

//       const { 'pind.refreshToken': refreshToken } = cookies
//       const originalConfig = error.config

//       if (!isRefreshing) {
//         isRefreshing = true

//         api.post('/refresh', {
//           refreshToken,
//         }).then(response => {
//           const { token } = response.data

//           setCookie(undefined, 'pind.token', token, {
//             maxAge: 60 * 60 * 24 * 30, // 30 days
//             path: ';'
//           })

//           setCookie(undefined, 'pind.refreshToken', response.data.refreshToken, {
//             maxAge: 60 * 60 * 24 * 30, // 30 days
//             path: ';'
//           })

//           api.defaults.headers['Authorization'] = `Bearer ${token}`

//           failedRequestsQueue.forEach(request => request.onSuccess(token))
//           failedRequestsQueue = []
//         }).catch(err => {
//           failedRequestsQueue.forEach(request => request.onFailure(err))
//           failedRequestsQueue = []
//         }).finally(() => {
//           isRefreshing = false
//         });
//       }

//       return new Promise((resolve, reject) => {
//         failedRequestsQueue.push({
//           onSuccess: (token: string) => {
//             originalConfig.headers['Authorization'] = `Bearer ${token}`

//             resolve(api(originalConfig))
//           },
//           onFailure: (err: AxiosError) => {
//             reject(err)
//           }
//         })
//       });
//     } else {
//       //deslogar  usuario
//     }
//   }

//   return Promise.reject(error)
// });
