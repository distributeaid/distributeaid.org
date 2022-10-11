export const onRenderBody = (gatsbyUtils) => {
  const { setHtmlAttributes } = gatsbyUtils

  setHtmlAttributes({ lang: 'en' })
}
