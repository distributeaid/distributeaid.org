import { Node, NodeInput } from 'gatsby'

/*
Page
================================================================================
*/
/**
 * T should be SectionNodeInput or SectionNode
 */
interface PageGeneric<T> {
  title: string
  slug: string
  /**
   * Markdown string
   */
  desc?: string
  sections: T[]
}

export interface PageGenericNodeInput
  extends PageGeneric<SectionNodeInput>,
    NodeInput {}
export interface PageGenericNode extends PageGeneric<SectionNode>, Node {}

/*
Sections
================================================================================
*/

/**
 * Union of page section types.
 */
export type SectionNodeInput = SectionGridNodeInput
export type SectionNode = SectionGridNode

/**
 * T should be BlockNode or BlockNodeInput
 */
interface SectionGrid<T> {
  options: SectionGridOptions
  blocks: T[]
}

export interface SectionGridNodeInput
  extends SectionGrid<BlockNodeInput>,
    NodeInput {}
export interface SectionGridNode extends SectionGrid<BlockNode>, Node {}

export type SectionGridOptions = {
  rows: Int
  cols: Int
  margin: SectionGridOptionMargin
  layout: SectionGridOptionLayout
  order: SectionGridOptionOrder
}

export enum SectionGridOptionMargin {
  MARGIN = 'MARGIN',
  BANNER = 'BANNER',
}

export enum SectionGridOptionLayout {
  ROW = 'ROW',
  COL = 'COL',
}

export enum SectionGridOptionOrder {
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
export type BlockNodeInput =
  | BlockTitleNodeInput
  | BlockTextNodeInput
  | BlockYoutubeNodeInput
  | BlockTimelineNodeInput
export type BlockNode =
  | BlockTitleNode
  | BlockTextNode
  | BlockYoutubeNode
  | BlockTimelineNode

/*
Block Title
------------------------------------------------------------
*/
interface BlockTitle {
  text: string
}

export interface BlockTitleNodeInput extends BlockTitle, NodeInput {}
export interface BlockTitleNode extends BlockTitle, Node {}

/*
Block Text
------------------------------------------------------------
*/
interface BlockText {
  /**
   * Markdown string
   */
  text: string
}

export interface BlockTextNodeInput extends BlockText, NodeInput {}
export interface BlockTextNode extends BlockText, Node {}

/*
Block Youtube
------------------------------------------------------------
*/
interface BlockYoutube {
  title?: string
  embedUrl: string
}

export interface BlockYoutubeNodeInput extends BlockYoutube, NodeInput {}
export interface BlockYoutubeNode extends BlockYoutube, Node {}

/*
Block Timeline
------------------------------------------------------------
*/
interface BlockTimeline {
  entries: {
    period?: string
    /**
     * Markdown string
     */
    desc?: string
  }[]
}

export interface BlockTimelineNodeInput extends BlockTimeline, NodeInput {}
export interface BlockTimelineNode extends BlockTimeline, Node {}
