import { Node, NodeInput } from 'gatsby'
import { LinksList, UpdatesList } from './list.d'

/*
Page
================================================================================
*/
/**
 * T should be / extend Section
 */
interface PageGenericBase<T> {
  title: string
  slug: string
  /**
   * Markdown string
   */
  desc?: string
  sections: T[]
}

export interface PageGeneric extends PageGenericBase<Section> {}
export interface PageGenericNodeInput
  extends PageGenericBase<SectionNodeInput>,
    NodeInput {}
export interface PageGenericNode extends PageGenericBase<SectionNode>, Node {}

/*
Sections
================================================================================
*/

/**
 * Union of page section types.
 */
export type Section = SectionGrid
export type SectionNodeInput = SectionGridNodeInput
export type SectionNode = SectionGridNode

/*
Section: Grid
------------------------------------------------------------
*/

/**
 * T should be / extend Block
 */
interface SectionGridBase<T> {
  options: SectionGridOptions
  blocks: T[]
}

export interface SectionGrid extends SectionGridBase<Block> {}

export interface SectionGridNodeInput
  extends SectionGridBase<BlockNodeInput>,
    NodeInput {}
export interface SectionGridNode extends SectionGridBase<BlockNode>, Node {}

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
export type Block =
  | BlockTitle
  | BlockText
  | BlockYoutube
  | BlockTimeline
  | BlockLinksList
  | BlockUpdatesList
  | BlockImage
  | BlockCard
export type BlockNodeInput =
  | BlockTitleNodeInput
  | BlockTextNodeInput
  | BlockYoutubeNodeInput
  | BlockTimelineNodeInput
  | BlockLinksListNodeInput
  | BlockUpdatesListNodeInput
  | BlockImageNodeInput
  | BlockCardNodeInput
export type BlockNode =
  | BlockTitleNode
  | BlockTextNode
  | BlockYoutubeNode
  | BlockTimelineNode
  | BlockLinksListNode
  | BlockUpdatesListNode
  | BlockImageNode
  | BlockCardNode

/*
Block: Title
------------------------------------------------------------
*/
export interface BlockTitle {
  text: string
}
export interface BlockTitleNodeInput extends BlockTitle, NodeInput {}
export interface BlockTitleNode extends BlockTitle, Node {}

/*
Block: Text
------------------------------------------------------------
*/
export interface BlockText {
  /**
   * Markdown string
   */
  text: string
}
export interface BlockTextNodeInput extends BlockText, NodeInput {}
export interface BlockTextNode extends BlockText, Node {}

/*
Block: Youtube
------------------------------------------------------------
*/
export interface BlockYoutube {
  title?: string
  embedUrl: string
}
export interface BlockYoutubeNodeInput extends BlockYoutube, NodeInput {}
export interface BlockYoutubeNode extends BlockYoutube, Node {}

/*
Block: Timeline
------------------------------------------------------------
*/
export interface BlockTimeline {
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

/*
Block: Links List
------------------------------------------------------------
*/
export interface BlockLinksList extends LinksList {}
export interface BlockLinksListNodeInput extends BlockLinksList, NodeInput {}
export interface BlockLinksListNode extends BlockLinksList, Node {}

/*
Block: Updates List
------------------------------------------------------------
*/
export interface BlockUpdatesList extends UpdatesList {}
export interface BlockUpdatesListInput extends BlockUpdatesList, NodeInput {}
export interface BlockUpdatesListNode extends BlockUpdatesList, Node {}

/*
Block: Image
------------------------------------------------------------
Stub.
*/
export interface BlockImage {}
export interface BlockImageNodeInput extends BlockImage, NodeInput {}
export interface BlockImageNode extends BlockImage, Node {}

/*
Block: Card
------------------------------------------------------------
Stub.
*/
export interface BlockCard {}
export interface BlockCardNodeInput extends BlockCard, NodeInput {}
export interface BlockCardNode extends BlockCard, Node {}
