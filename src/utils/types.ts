/**
 * Returns an array with all the keys in an enum
 * @example
 * enum Status {
 *   InProgress = 'IN_PROGRESS',
 *   Complete = 'COMPLETE',
 * }
 * enumKeys(Status) // ['InProgress', 'Complete']
 */
export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O,
): K[] {
  return Object.keys(obj) as K[]
}

/**
 * Returns an array with the values of each key in an enum
 * @param obj
 * @returns
 * @example
 * enum Status {
 *   InProgress = 'IN_PROGRESS',
 *   Complete = 'COMPLETE',
 * }
 * enumKeys(Status) // ['IN_PROGRESS', 'COMPLETE']
 */
export function enumValues<O extends object, K extends keyof O = keyof O>(
  obj: O,
): K[] {
  return Object.values(obj) as K[]
}

export function getAttributeValue<T>(object: any, attributeName: string): T {
  return object[attributeName]
}
