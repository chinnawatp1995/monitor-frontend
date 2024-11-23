export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('[middleware]')
  // const config = useRuntimeConfig()
  // const cookieToken = useCookie<string>(config.public.accessToken)
  // const logout = () => {
  //   cookieToken.value = null
  //   token.value = null
  //   profile.value = null
  //   return navigateTo({ path: '/login' })
  // }
  // if (['/login'].includes(to.path)) {
  //   if (!cookieToken.value) return
  //   return navigateTo({ path: '/' })
  // }
  // const { token, profile } = useProfile()
  // if (cookieToken.value && !token.value) {
  //   token.value = cookieToken.value
  // }
  // if (token.value && profile.value) return
  // if (token.value && !profile.value) {
  //   const { data } = await useServices.profile()
  //   if (!data.value || data.value.errorCode) logout()
  //   profile.value = data
  // } else {
  //   logout()
  // }
})
