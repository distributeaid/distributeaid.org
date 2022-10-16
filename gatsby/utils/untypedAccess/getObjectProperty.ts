import { getProperty } from './getProperty'

/**
 * Helper function for untyped object access
 */
export const getObjectProperty = (
  o: Record<string, any> | undefined,
  property: string,
): Record<string, any> =>
  getProperty<Record<string, any>>(
    (v) => typeof v === 'object' && !Array.isArray(v),
  )(o, property)
