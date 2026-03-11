/**
 * Helper function for untyped date access.
 * Handles dates in string form.
 */
export const getDateProperty = (
  o: Record<string, any> | undefined,
  property: string,
): Date => {
  if (o === undefined) {
    throw new Error(
      `Received undefined when trying to access property '${property}'!`,
    )
  }
  if (!(property in o)) {
    throw new Error(
      `Object '${JSON.stringify(o)}' has no property '${property}'!`,
    )
  }

  const v = o[property]
  if (!(v instanceof Date) && !(typeof v === 'string')) {
    throw new Error(
      `Property '${property}' on object '${JSON.stringify(
        o,
      )}' does not match expected type!`,
    )
  }

  const date = new Date(v)
  if (isNaN(date.valueOf())) {
    throw new Error(
      `Property '${property}' on object '${JSON.stringify(
        o,
      )}' is an invalid Date!`,
    )
  }
  return date
}
