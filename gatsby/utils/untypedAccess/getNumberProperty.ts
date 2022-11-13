import { getProperty } from './getProperty'

/**
 * Helper function for untyped number access
 */
export const getNumberProperty = (
  o: Record<string, any> | undefined,
  property: string,
): number => getProperty<number>((v) => typeof v === 'number')(o, property)
