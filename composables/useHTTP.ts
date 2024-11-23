import { cloneDeep } from 'lodash'
const http = async <T>(
  functionName: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  body?: Record<string, any>,
  handleError: boolean = true,
) => {
  const runtimeConfig = useRuntimeConfig()
  const { token } = useProfile()
  const loading = useLoading()
  let defaultName = 'unknown'
  let callerService = new Error().stack?.split(/\r\n|\r|\n/g)[2]?.trim()
  if (callerService) {
    let found = callerService.match(/Object\.(.*)\s/)
    if (found && found[1]) defaultName = found[1]
  }
  const name = functionName ?? defaultName
  loading.value = { ...loading.value, ...{ [name]: true } }
  const response = await useFetch<
    T,
    Error,
    string,
    'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  >(() => `${runtimeConfig.public.apiUrl}/${path}`, {
    key: `${method}-${runtimeConfig.public.apiUrl}/${path}`, // prevent replace data or data duplicate
    method: method,
    headers: {
      'content-type': 'application/json',
      ...(token.value && { authorization: `Bearer ${token.value}` }),
    },
    ...(body && cloneDeep({ body })),
    onRequestError() {
      loading.value = { ...loading.value, ...{ [name]: false } }
    },
    onResponse({ response }) {
      if (response._data.errorCode && handleError)
        useHandleError(response._data)
      loading.value = { ...loading.value, ...{ [name]: false } }
      return response._data
    },
    onResponseError({ response }) {
      if (handleError) useHandleError(response._data)
      loading.value = { ...loading.value, ...{ [name]: false } }
    },
  })
  loading.value = { ...loading.value, ...{ [name]: false } }
  return response
}

export default http
