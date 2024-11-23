import http from '@/composables/useHTTP'
type Response<T> = T & {
  errorCode: number
  msg: string
  abbr: string
  params: Record<string, string>
}
const cq = (queryObj?: Record<string, number | string>) => {
  // ex. {id:1, text:'test'}
  if (!queryObj) return ''
  const queryArray = Object.entries(queryObj)
    .map(([k, v]) => {
      if (!v) return ''
      return `${k}=${v}`
    })
    .filter((k) => k)
  if (queryArray.length === 0) return ''
  return `?${queryArray.join('&')}`
}

const auth = {
  login: (body: { username: string; password: string }) =>
    http<Response<{ token: string }>>('login', 'POST', 'auth/login', body),
  profile: () => http<any>('profile', 'GET', 'user'),
  allConfig: () => http<any>('allConfig', 'GET', `GET_CONFIGS`),
}

export default {
  ...auth,
}
