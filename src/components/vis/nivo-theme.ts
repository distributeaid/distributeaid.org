export const colors = []

// docs: https://nivo.rocks/guides/theming/
// You can pass this object to the `theme` property on Nivo components.
export const theme = {
  background: '#ffffff',
  textColor: '#374151', // same as @tailwind/typeography's body text color
  fontSize: 16,

  axis: {
    domain: {
      line: {
        stroke: '#777777',
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: 18,
        fontWeight: 600,
        fill: '#374151',
      },
    },
    ticks: {
      line: {
        stroke: '#777777',
        strokeWidth: 1,
      },
      text: {
        fontSize: 16,
        fill: '#374151',
      },
    },
  },

  grid: {
    line: {
      stroke: '#dddddd',
      strokeWidth: 1,
    },
  },

  legends: {
    title: {
      text: {
        fontSize: 18,
        fill: '#374151',
      },
    },
    text: {
      fontSize: 16,
      fill: '#374151',
    },
    ticks: {
      link: {},
      text: {
        fontSize: 16,
        fill: '#374151',
      },
    },
  },

  annotations: {
    text: {
      fontSize: 14,
      fill: '#333333',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    link: {
      stroke: '#000000',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    outline: {
      stroke: '#000000',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
    symbol: {
      fill: '#000000',
      outlineWidth: 2,
      outlineColor: '#ffffff',
      outlineOpacity: 1,
    },
  },

  tooltip: {
    container: {
      background: '#ffffff',
      color: '#374151',
      fontSize: 18,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
}
