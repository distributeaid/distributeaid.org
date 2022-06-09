export function getOxfordCommaSeparator(index: number, array: any[]): string {
  if (index === 0) {
    return ''
  } else if (index === 1 && array.length == 2) {
    return ' & '
  } else if (index === array.length - 1) {
    return ', & '
  } else {
    return ', '
  }
}
