import { getVisualizationColors } from '../../../utils/site-theme'

// docs: https://nivo.rocks/guides/colors/
export const colors = getVisualizationColors({
  swatches: ['purple', 'rosemary', 'turquoise', 'beige'],
  weights: [400, 600],
  randomize: true,
})

// docs: https://nivo.rocks/guides/theming/
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

export const nivoProps = {
  bar: {
    horizontal: {
      layout: 'horizontal' as const,
      padding: 0.25,
      innerPadding: 1,
      margin: { top: 60, right: 100, bottom: 60, left: 250 },
      valueFormat: (value: number) => `${Number(value).toLocaleString()}`,
      //style
      theme: theme,
      colors: colors,
      // labels
      labelSkipWidth: 50,
      labelSkipHeight: 18,
      // grid & axis
      enableGridX: true,
      enableGridY: false,
      axisTop: {
        tickSize: 5,
        tickPadding: 5,
        format: (value: number) => `${formatNumber(value)}`,
      },
      axisRight: null,
      axisBottom: {
        tickSize: 5,
        tickPadding: 5,
        format: (value: number) => `${formatNumber(value)}`,
      },
      axisLeft: {
        tickSize: 5,
        tickPadding: 5,
      },
    },
  },
}

const formatNumber = (value: number) => {
  if (value >= 1000000) {
    const number = value / 1000000
    return `${Number(number).toLocaleString()}m`
  } else if (value >= 1000) {
    const number = value / 1000
    return `${Number(number).toLocaleString()}k`
  }
  return Number(value).toLocaleString()
}
