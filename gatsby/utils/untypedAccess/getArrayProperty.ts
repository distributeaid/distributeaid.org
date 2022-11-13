import { getProperty } from './getProperty'

/**
 * Helper function for untyped array access
 */
export const getArrayProperty = (
  o: Record<string, any> | undefined,
  property: string,
): Array<any> =>
  getProperty<Array<any>>((v) => typeof v === 'object' && Array.isArray(v))(
    o,
    property,
  )
