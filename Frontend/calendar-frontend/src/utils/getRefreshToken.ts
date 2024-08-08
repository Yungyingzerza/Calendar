import { API } from "constants/API";

export function getRefreshToken(abort : AbortController, callback? : () => void) {
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
            if(callback) callback()
            return data.access_token
          }
        })
}