export const onRenderBody = ({
  setHtmlAttributes,
}: {
  /**
   * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/#onRenderBody
   */
  setHtmlAttributes: (
    /**
     * props which will spread into the <html> component
     */
    attributes: Record<string, string>,
  ) => void
}) => {
  setHtmlAttributes({ lang: 'en' })
}
