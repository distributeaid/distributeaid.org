/*
Links List
================================================================================
*/
export type LinksList = {
  title: string
  links: {
    label: string
    url: string
    description: string
  }[]
}

/*
Updates List
================================================================================
*/
export type UpdatesList = {
  title: string
  visibleCount: number
  updates: {
    title: string
    content: string
    date: string
    pinned: boolean
  }[]
}
