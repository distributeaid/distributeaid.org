export const baseUrl = (): string => {
  const port = process.env.PORT ?? '8000'
  const hostname = process.env.HOSTNAME ?? 'localhost'
  const baseUrl = `http://${'localhost'}:${port}`
  return baseUrl
}
