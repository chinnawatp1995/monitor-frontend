export type UITable =
  | {
      [key: string]: any
      key: string
      sortable?: boolean | undefined
      direction?: 'desc' | 'asc' | undefined
      class?: string | undefined
    }[]
  | undefined
