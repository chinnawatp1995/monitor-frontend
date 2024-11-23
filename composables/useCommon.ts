import { isEmpty } from 'lodash'
export default function () {
  const common = {
    groupBy: (array: any[], key: string) => {
      return array.reduce((objectsByKeyValue: any, obj) => {
        const value = obj[key]
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
        return objectsByKeyValue
      }, {})
    },
    copyToClipboard: async (val: string) => {
      const loading = useLoading()
      const toast = useToast()
      const { successNoti } = useAlert()
      loading.value = { ...loading.value, ...{ copy: true } }
      const selBox = document.createElement('textarea')
      selBox.style.position = 'fixed'
      selBox.style.left = '0'
      selBox.style.top = '0'
      selBox.style.opacity = '0'
      selBox.value = val
      document.body.appendChild(selBox)
      selBox.focus()
      selBox.select()
      document.execCommand('copy')
      document.body.removeChild(selBox)
      toast.add({ title: 'Copied', ...successNoti })
      await common.sleep(1500)
      loading.value = { ...loading.value, ...{ copy: false } }
    },
    downloadFile: (content: string, fileName: string) => {
      if (isEmpty(content)) return
      var a = document.createElement('a')
      a.href = content
      a.download = fileName
      a.click()
    },
    sleep: (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    logout: (path?: string) => {
      const runtimeConfig = useRuntimeConfig()
      const { token, profile } = useProfile()
      // const socket = useSocket()
      localStorage.removeItem(runtimeConfig.public.accessToken)
      token.value = null
      profile.value = null
      // if (socket.value && socket.value.connected) {
      //   socket.value.disconnect()
      //   socket.value = null
      // }
      reloadNuxtApp({ path: path, force: true })
    },
  }
  const handleKeyPress = {
    keypressNumber: (event: {
      keyCode?: number
      which: number
      preventDefault: () => void
    }) => {
      let keyCode = event.keyCode ? event.keyCode : event.which
      let char = String.fromCharCode(keyCode)
      if (/^[0-9.]+$/.test(char)) return true
      else event.preventDefault()
    },
    keypressDigit: (event: {
      keyCode?: number
      which: number
      preventDefault: () => void
    }) => {
      let keyCode = event.keyCode ? event.keyCode : event.which
      let char = String.fromCharCode(keyCode)
      if (/^[0-9]+$/.test(char)) return true
      else event.preventDefault()
    },
  }

  return {
    ...common,
    ...handleKeyPress,
  }
}
