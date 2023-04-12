export function getBaseURL(): URL {
  // HACK: made prod build
  //  return new URL('/', window.location.origin)
  return new URL('/', 'https://distributeaid.org')
}

export function originsMatch(
  input1: URL | string,
  input2: URL | string,
): boolean {
  const url1 = new URL(input1)
  const url2 = new URL(input2)

  return url1.origin === url2.origin
}
