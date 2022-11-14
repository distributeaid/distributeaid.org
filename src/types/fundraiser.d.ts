import { Photo } from './photo.d'

export type Fundraiser = {
  id: string
  name: string
  title: string
  /**
   * Markdown
   */
  body: string
  /**
   * Image URLs
   */
  gallery: Photo[]
  /**
   * Describes the funds allocated for this fundraisers.
   */
  allocations: {
    /**
     * The date when the allocation was made.
     */
    date: Date
    /**
     * The allocated amount in EUR
     */
    amountEUR: number
    /**
     * Describes the purpose the allocated funds will be used for.
     */
    purpose: string
  }[]
}
