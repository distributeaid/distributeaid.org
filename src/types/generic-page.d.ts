import { Node } from 'gatsby'

/*
Page
================================================================================
*/
export interface PageGeneric extends Node {
  title: string
  slug: string
  /**
   * Markdown string
   */
  desc?: string
  sections: Section[]
}

/*
Sections
================================================================================
*/

/**
 * Union of page section types.
 */
export type Section = SectionGrid

export interface SectionGrid extends Node {
  options: SectionGridOptions
  blocks: Block[]
}

export type SectionGridOptions = {
  rows: Int
  cols: Int
  margin: Margin
  layout: Layout
  order: Order
}

export enum Margin {
  MARGIN = 'MARGIN',
  BANNER = 'BANNER',
}

export enum Layout {
  ROW = 'ROW',
  COL = 'COL',
}

export enum Order {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
  RANDOM = 'RANDOM',
}

/*
Content Blocks
================================================================================
*/
/**
 * Union of content block types.
 */
export type Block = BlockTitle | BlockText | BlockYoutube | BlockTimeline

export interface BlockTitle extends Node {
  text: string
}

export interface BlockText extends Node {
  /**
   * Markdown string
   */
  text: string
}

export interface BlockYoutube extends Node {
  title?: string
  embedUrl: string
}

export interface BlockTimeline extends Node {
  entries: BlockTimelineEntry[]
}

export type BlockTimelineEntry = {
  period?: string
  /**
   * Markdown string
   */
  desc?: string
}
