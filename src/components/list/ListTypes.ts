/*
Link List
================================================================================
*/
export type LinkList = {
  title: string
  links: {
    title: string
    url: string
    description: string
  }
}

/*
Update List
================================================================================
*/
export type UpdateList = {
  title: string
  visibleCount: number
  updates: {
    title: string
    content: string
    date: string
    pinned: boolean
  }
}
