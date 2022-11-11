import {
  BlockCardNode,
  BlockCardNodeInput,
  BlockImageNode,
  BlockImageNodeInput,
  BlockNode,
  BlockNodeInput,
  BlockTextNode,
  BlockTextNodeInput,
  BlockTimelineNode,
  BlockTimelineNodeInput,
  BlockTitleNode,
  BlockTitleNodeInput,
  BlockYoutubeNode,
  BlockYoutubeNodeInput,
  PageGenericNode,
  PageGenericNodeInput,
  SectionGridNode,
  SectionGridNodeInput,
  SectionNode,
  SectionNodeInput,
} from './generic-page.d'

/*
Page
------------------------------------------------------------
*/
export const getPageData = (props?: Record<string, any>) => {
  return {
    title: 'My Page Title',
    slug: 'my-page',
    desc: 'A custom test page.',
    sections: [] as any[],

    ...props,

    template: 'DAPageGeneric',
  }
}

export const getPageNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    slug: 'my-page',
    path: '/my-page/',
    title: 'My Page Title',
    description: 'A custom test page.',
    sections: [] as SectionNodeInput[],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DAPageGeneric',
    },
  } as PageGenericNodeInput
}

export const getPageNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    slug: 'my-page',
    path: '/my-page/',
    title: 'My Page Title',
    description: 'A custom test page.',
    sections: [] as SectionNode[],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DAPageGeneric',
    },
  } as PageGenericNode
}

/*
Section: Grid
------------------------------------------------------------
*/
export const getSectionGridData = (props?: Record<string, any>) => {
  return {
    contentBlocks: [] as any[],

    ...props,

    metadata: {
      margins: 'Margined',
      numCols: 1,
      numRows: 1,
      colOrRowBound: 'Column-Bound',
      order: 'top-to-bottom',
      ...props?.metadata,
    },

    template: 'section-grid',
  }
}

export const getSectionGridNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    blocks: [] as BlockNodeInput[],

    ...props,

    options: {
      rows: 1,
      cols: 1,
      margin: 'MARGIN',
      layout: 'COL',
      order: 'VERTICAL',
      ...props?.options,
    },

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DASectionGrid',
    },
  } as SectionGridNodeInput
}

export const getSectionGridNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    blocks: [] as BlockNode[],

    ...props,

    options: {
      rows: 1,
      cols: 1,
      margin: 'MARGIN',
      layout: 'COL',
      order: 'VERTICAL',
      ...props?.options,
    },

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DASectionGrid',
    },
  } as SectionGridNode
}

/*
Section: Unknown
------------------------------------------------------------
*/
export const getSectionUnknownData = (props?: Record<string, any>) => {
  return {
    contentBlocks: [] as any[],

    ...props,

    template: 'section-unknown',
  }
}

export const getSectionUnknownNodeInput = (props?: Record<string, any>) => {
  // NOTE: Intentionally does not map to a valid SectionNodeInput type.
  //       Useful for testing error handling when functionality.
  // @ts-ignore
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    blocks: [] as BlockNodeInput[],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DASectionUnknown',
    },
  } as SectionNodeInput
}

export const getSectionUnknownNode = (props?: Record<string, any>) => {
  // NOTE: Intentionally does not map to a valid SectionNode type.
  //       Useful for testing error handling when functionality.
  // @ts-ignore
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    blocks: [] as BlockNode[],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DASectionUnknown',
    },
  } as SectionNode
}

/*
Block: Title
------------------------------------------------------------
*/
export const getBlockTitleData = (props?: Record<string, any>) => {
  return {
    text: 'General Inquiries',
    ...props,

    template: 'block-title',
  }
}

export const getBlockTitleNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    text: 'General Inquiries',

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockTitle',
    },
  } as BlockTitleNodeInput
}

export const getBlockTitleNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    text: 'General Inquiries',

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockTitle',
    },
  } as BlockTitleNode
}

/*
Block: Text
------------------------------------------------------------
*/
export const getBlockTextData = (props?: Record<string, any>) => {
  return {
    text: 'The best way to get in touch with Distribute Aid is to email us at [me@example.org](mailto:me@example.org)!',
    ...props,

    template: 'block-text',
  }
}

export const getBlockTextNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    text: 'The best way to get in touch with Distribute Aid is to email us at [me@example.org](mailto:me@example.org)!',

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockText',
    },
  } as BlockTextNodeInput
}

export const getBlockTextNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    text: 'The best way to get in touch with Distribute Aid is to email us at [me@example.org](mailto:me@example.org)!',

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockText',
    },
  } as BlockTextNode
}

/*
Block: Youtube
------------------------------------------------------------
*/
export const getBlockYoutubeData = (props?: Record<string, any>) => {
  return {
    title: 'youtube',
    embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',

    ...props,

    template: 'block-youtube',
  }
}

export const getBlockYoutubeNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    title: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockYoutube',
    },
  } as BlockYoutubeNodeInput
}

export const getBlockYoutubeNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    title: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockYoutube',
    },
  } as BlockYoutubeNode
}

/*
Block: Timeline
------------------------------------------------------------
*/
export const getBlockTimelineData = (props?: Record<string, any>) => {
  return {
    timelineItems: [
      {
        period: '2020',
        description: 'Our *COVID-19* response began.',
      },
      {
        period: '2021',
        description: 'Our *Afghan Resettlement* response began.',
      },
    ],

    ...props,

    template: 'block-timeline',
  }
}

export const getBlockTimelineNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    entries: [
      {
        period: '2020',
        desc: 'Our *COVID-19* response began.',
      },
      {
        period: '2021',
        desc: 'Our *Afghan Resettlement* response began.',
      },
    ],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockTimeline',
    },
  } as BlockTimelineNodeInput
}

export const getBlockTimelineNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    entries: [
      {
        period: '2020',
        desc: 'Our *COVID-19* response began.',
      },
      {
        period: '2021',
        desc: 'Our *Afghan Resettlement* response began.',
      },
    ],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockTimeline',
    },
  } as BlockTimelineNode
}

/*
Block: Image
------------------------------------------------------------
*/
export const getBlockImageData = (props?: Record<string, any>) => {
  return {
    ...props,

    template: 'block-card',
  }
}

export const getBlockImageNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockImage',
    },
  } as BlockImageNodeInput
}

export const getBlockImageNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockTimeline',
    },
  } as BlockImageNode
}

/*
Block: Card
------------------------------------------------------------
*/
export const getBlockCardData = (props?: Record<string, any>) => {
  return {
    ...props,

    template: 'block-card',
  }
}

export const getBlockCardNodeInput = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockCard',
    },
  } as BlockCardNodeInput
}

export const getBlockCardNode = (props?: Record<string, any>) => {
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockCard',
    },
  } as BlockCardNode
}

/*
Block: Unknown
------------------------------------------------------------
*/
export const getBlockUnknownData = (props?: Record<string, any>) => {
  return {
    ...props,
    template: 'block-unknown',
  }
}

export const getBlockUnknownNodeInput = (props?: Record<string, any>) => {
  // NOTE: Intentionally does not map to a valid BlockNodeInput type.
  //       Useful for testing error handling when functionality.
  // @ts-ignore
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockUnknown',
    },
  } as BlockNodeInput
}

export const getBlockUnknownNode = (props?: Record<string, any>) => {
  // NOTE: Intentionally does not map to a valid BlockNode type.
  //       Useful for testing error handling when functionality.
  // @ts-ignore
  return {
    id: 'node-id',
    parent: 'parent-id',
    children: [],

    ...props,

    internal: {
      contentDigest: 'content digest',
      ...props?.internal,

      type: 'DABlockUnknown',
    },
  } as BlockNode
}

/*
Factory
------------------------------------------------------------
Make it easy to import many test data creation functions at once.
*/
export const factory = {
  getPageData,
  getPageNodeInput,
  getPageNode,
  getSectionGridData,
  getSectionGridNodeInput,
  getSectionGridNode,
  getSectionUnknownData,
  getSectionUnknownNodeInput,
  getSectionUnknownNode,
  getBlockTitleData,
  getBlockTitleNodeInput,
  getBlockTitleNode,
  getBlockTextData,
  getBlockTextNodeInput,
  getBlockTextNode,
  getBlockYoutubeData,
  getBlockYoutubeNodeInput,
  getBlockYoutubeNode,
  getBlockTimelineData,
  getBlockTimelineNodeInput,
  getBlockTimelineNode,
  getBlockImageData,
  getBlockImageNodeInput,
  getBlockImageNode,
  getBlockCardData,
  getBlockCardNodeInput,
  getBlockCardNode,
  getBlockUnknownData,
  getBlockUnknownNodeInput,
  getBlockUnknownNode,
}
