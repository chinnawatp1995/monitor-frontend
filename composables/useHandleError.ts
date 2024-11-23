const useHandleError = (error: any) => {
  console.log('[HANDLE ERROR]', error)
  const err = error.data || error
  const toast = useToast()
  const { errorNoti } = useAlert()
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const { token, profile } = useProfile()
  if (err.msg) {
    if (['UNAUTHORIZED', 'JWT_INVALID_OR_EXPIRED'].includes(err.msg)) {
      const cookieToken = useCookie<string>(config.public.accessToken)
      cookieToken.value = ''
      token.value = null
      profile.value = null
      if (['/login'].includes(route.path)) {
        router.push('/login')
      }
    }
    toast.add({ title: err.msg, ...errorNoti })
  }
}

export default useHandleError
