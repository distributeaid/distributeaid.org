import { LinksList, UpdatesList } from './list.d'

/*
Link List
------------------------------------------------------------
*/
export const getLink = (props?: Record<string, any>) => {
  return {
    label: 'Cool Zines',
    url: 'https://fillerpgh.wordpress.com/archive/',
    description: "The Filler Distro's archive.",
    ...props,
  }
}

export const getLinksList = (props?: Record<string, any>): LinksList => {
  return {
    title: 'Link List',
    links: [
      getLink(),
      getLink({
        label: "Time's 2006 Person of the Year",
        url: 'https://en.wikipedia.org/wiki/You_(Time_Person_of_the_Year)',
        description: 'You!',
      }),
    ],
    ...props,
  } as LinksList
}

/*
Update List
------------------------------------------------------------
*/
export const getUpdate = (props?: Record<string, any>) => {
  return {
    title: 'Something Happened',
    content: '',
    date: '',
    pinned: false,
    ...props,
  }
}

export const getUpdatesList = (props?: Record<string, any>): UpdatesList => {
  return {
    title: 'Update List',
    visibleCount: 3,
    updates: [
      getUpdate(),
      getUpdate({ title: 'Something Else Happened' }),
      getUpdate({ title: 'This Should Be Shown First', pinned: true }),
    ],
    ...props,
  } as UpdatesList
}
