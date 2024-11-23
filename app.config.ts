export default defineAppConfig({
  ui: {
    icons: {
      dynamic: true,
    },
    primary: 'royal-blue',
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-auto',
    },
    button: {
      default: {
        size: 'lg',
      },
    },
    input: {
      default: {
        size: 'lg',
      },
    },
    select: {
      default: {
        size: 'lg',
      },
    },
    checkbox: {
      base: 'h-5 w-5',
    },
    radio: {
      base: 'h-5 w-5',
      wrapper: 'mb-1',
    },
    toggle: {
      default: {
        size: 'lg',
      },
    },
  },
})
