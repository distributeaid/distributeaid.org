import slugify from 'slugify'

export default function (name: string): string {
  return slugify(name, {
    lower: true,
    strict: true,
  })
}
