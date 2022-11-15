import { ResponsiveBar } from '@nivo/bar'

const BabyClothingByRegion = () => {
  let data = [
    {
      country: 'AD',
      'hot dog': 126,
      'hot dogColor': 'hsl(144, 70%, 50%)',
      burger: 18,
      burgerColor: 'hsl(263, 70%, 50%)',
      sandwich: 21,
      sandwichColor: 'hsl(217, 70%, 50%)',
      kebab: 196,
      kebabColor: 'hsl(212, 70%, 50%)',
      fries: 93,
      friesColor: 'hsl(326, 70%, 50%)',
      donut: 177,
      donutColor: 'hsl(351, 70%, 50%)',
    },
    {
      country: 'AE',
      'hot dog': 133,
      'hot dogColor': 'hsl(266, 70%, 50%)',
      burger: 85,
      burgerColor: 'hsl(43, 70%, 50%)',
      sandwich: 101,
      sandwichColor: 'hsl(334, 70%, 50%)',
      kebab: 77,
      kebabColor: 'hsl(345, 70%, 50%)',
      fries: 49,
      friesColor: 'hsl(317, 70%, 50%)',
      donut: 165,
      donutColor: 'hsl(65, 70%, 50%)',
    },
    {
      country: 'AF',
      'hot dog': 81,
      'hot dogColor': 'hsl(345, 70%, 50%)',
      burger: 181,
      burgerColor: 'hsl(325, 70%, 50%)',
      sandwich: 54,
      sandwichColor: 'hsl(38, 70%, 50%)',
      kebab: 83,
      kebabColor: 'hsl(170, 70%, 50%)',
      fries: 182,
      friesColor: 'hsl(130, 70%, 50%)',
      donut: 172,
      donutColor: 'hsl(262, 70%, 50%)',
    },
    {
      country: 'AG',
      'hot dog': 162,
      'hot dogColor': 'hsl(178, 70%, 50%)',
      burger: 14,
      burgerColor: 'hsl(33, 70%, 50%)',
      sandwich: 120,
      sandwichColor: 'hsl(91, 70%, 50%)',
      kebab: 14,
      kebabColor: 'hsl(18, 70%, 50%)',
      fries: 132,
      friesColor: 'hsl(303, 70%, 50%)',
      donut: 189,
      donutColor: 'hsl(243, 70%, 50%)',
    },
    {
      country: 'AI',
      'hot dog': 88,
      'hot dogColor': 'hsl(162, 70%, 50%)',
      burger: 20,
      burgerColor: 'hsl(31, 70%, 50%)',
      sandwich: 67,
      sandwichColor: 'hsl(194, 70%, 50%)',
      kebab: 85,
      kebabColor: 'hsl(352, 70%, 50%)',
      fries: 174,
      friesColor: 'hsl(54, 70%, 50%)',
      donut: 66,
      donutColor: 'hsl(297, 70%, 50%)',
    },
    {
      country: 'AL',
      'hot dog': 78,
      'hot dogColor': 'hsl(52, 70%, 50%)',
      burger: 54,
      burgerColor: 'hsl(122, 70%, 50%)',
      sandwich: 2,
      sandwichColor: 'hsl(328, 70%, 50%)',
      kebab: 123,
      kebabColor: 'hsl(325, 70%, 50%)',
      fries: 130,
      friesColor: 'hsl(65, 70%, 50%)',
      donut: 61,
      donutColor: 'hsl(58, 70%, 50%)',
    },
    {
      country: 'AM',
      'hot dog': 84,
      'hot dogColor': 'hsl(43, 70%, 50%)',
      burger: 29,
      burgerColor: 'hsl(337, 70%, 50%)',
      sandwich: 54,
      sandwichColor: 'hsl(20, 70%, 50%)',
      kebab: 72,
      kebabColor: 'hsl(243, 70%, 50%)',
      fries: 15,
      friesColor: 'hsl(160, 70%, 50%)',
      donut: 105,
      donutColor: 'hsl(140, 70%, 50%)',
    },
  ]
  return (
    <>
      <h1>baby-clothing-by-region</h1>
      <ResponsiveBar
        data={data}
        keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }}
      />
    </>
  )
}

export default BabyClothingByRegion
