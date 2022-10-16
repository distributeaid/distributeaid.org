import { getProperty } from './getProperty'

/**
 * Helper function for untyped string access
 */
export const getStringProperty = (
  o: Record<string, any> | undefined,
  property: string,
): string => getProperty<string>((v) => typeof v === 'string')(o, property)
