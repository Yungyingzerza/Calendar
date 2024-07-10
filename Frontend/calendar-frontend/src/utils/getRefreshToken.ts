import { API } from "constants/API";

export function getRefreshToken(abort : AbortController) {
    return fetch(`${API.auth}/refreshToken`, {
        credentials: 'include',
        signal: abort.signal
      })
        .then(res => {
          if (res.status === 200) {
            return res.json()
          } else {
            return null
          }
        })
        .then(data => {
          if (data) {
            return data.access_token
          }
        })
}