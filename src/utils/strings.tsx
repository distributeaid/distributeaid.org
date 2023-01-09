export function getOxfordCommaSeparator(
  index: number,
  array: any[],
): JSX.Element {
  if (index === 0) {
    return <></>
  } else if (index === 1 && array.length == 2) {
    return <>, &amp;&nbsp;</>
  } else if (index === array.length - 1) {
    return <>, &amp;&nbsp;</>
  } else {
    return <>, </>
  }
}
