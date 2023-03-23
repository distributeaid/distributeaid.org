import { getProperty } from './getProperty'

/**
 * Helper function for untyped date access
 */
export const getDateProperty = (
  o: Record<string, any> | undefined,
  property: string,
): Date => {
  const date = getProperty<Date>((v) => v instanceof Date)(o, property)
  if (isNaN(date.valueOf())) {
    throw new Error(
      `Property '${property}' on object '${JSON.stringify(
        o,
      )}' is an invalid Date!`,
    )
  } else {
    return date
  }
}
