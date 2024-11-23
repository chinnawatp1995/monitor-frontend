export const useAlert = () => {
  const errorNoti = <Partial<Notification>>{
    color: 'error',
    icon: 'i-lucide-alert-triangle',
  }
  const successNoti = <Partial<Notification>>{
    color: 'success',
    icon: 'i-lucide-check-circle-2',
  }
  return { errorNoti, successNoti }
}

export const useLoading = () =>
  useState<Record<string, boolean>>('loading', () => {
    return {}
  })
export const useProfile = () => {
  const token = useState<string | null>('token', () => null)
  const profile = useState<any>('profile', () => null)
  return { token, profile }
}
