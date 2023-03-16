import { getProperty } from './getProperty'

/**
 * Helper function for untyped date access
 */
export const getDateProperty = (
  o: Record<string, any> | undefined,
  property: string,
): Date => getProperty<Date>((v) => v instanceof Date)(o, property)
