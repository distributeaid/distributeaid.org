import slugify from 'slugify'

// gatsby uses @sindresorhus/slugify internally
// ensure same settings are used to match functionality
export default function (name: string): string {
  return slugify(name, {
    lower: true,
    strict: true,
  })
}
