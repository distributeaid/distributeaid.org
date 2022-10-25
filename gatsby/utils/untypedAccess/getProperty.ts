/**
 * Helper function for untyped access
 */
export const getProperty =
  <Returns>(is: (v: unknown) => boolean) =>
  (o: Record<string, any> | undefined, property: string): Returns => {
    if (o === undefined)
      throw new Error(
        `Received undefined when trying to access property '${property}'!`,
      )
    if (!(property in o))
      throw new Error(
        `Object '${JSON.stringify(o)}' has no property '${property}'!`,
      )
    const v = o[property]
    if (!is(v))
      throw new Error(
        `Property '${property}' on object '${JSON.stringify(
          o,
        )}' does not match expected type!`,
      )
    return v
  }
