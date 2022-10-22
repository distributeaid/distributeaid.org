import { FC, useState } from 'react'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import { axisOptionValues, NeedsBarChart, sortOptions } from './needs-bar-chart'

import { ControlSection, InputControl, SelectControl } from '../vis-controls'

type Props = {
  needs: Need[]
}

const getQuarters = (needs: Need[]): string[] => {
  const quarters: Set<string> = new Set()

  for (const need of needs) {
    quarters.add(`${need.survey.year} ${need.survey.quarter}`)
  }

  return Array.from(quarters).sort().reverse()
}

const getRegions = (needs: Need[]): string[] => {
  const regions: Set<string> = new Set()

  for (const need of needs) {
    regions.add(need.place.region?.name || 'Other')
  }

  return Array.from(regions).sort()
}

const getCategories = (needs: Need[]): string[] => {
  const categories: Set<string> = new Set()

  for (const need of needs) {
    categories.add(need.product.category)
  }

  return Array.from(categories).sort()
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const [indexBy, setIndexBy] = useState<string | null>(
    axisOptionValues[0] || null,
  )
  const [groupBy, setGroupBy] = useState<string | null>(
    axisOptionValues[1] || null,
  )

  const [search, setSearch] = useState<string>('')

  const [quarter, setQuarter] = useState<string | null>(null)
  const [region, setRegion] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  const [sortBy, setSortBy] = useState<string | null>(sortOptions.by[0] || null)
  const [sortOrder, setSortOrder] = useState<string | null>(
    sortOptions.order[0] || null,
  )

  const barProps = nivoProps.bar.horizontal

  return (
    <div>
      <form className="flex flex-col gap-10 prose max-w-none">
        <ControlSection label="Display" margin={barProps.margin}>
          <SelectControl
            label="Index By"
            values={axisOptionValues}
            defaultValue={indexBy || undefined}
            setValue={setIndexBy}
          />
          <SelectControl
            label="Group By"
            values={axisOptionValues}
            defaultValue={groupBy || undefined}
            setValue={setGroupBy}
          />
        </ControlSection>

        <ControlSection label="Search" margin={barProps.margin}>
          <InputControl label="Term" setValue={setSearch} />
        </ControlSection>

        <ControlSection label="Filter" margin={barProps.margin}>
          <SelectControl
            label="Survey"
            values={getQuarters(needs)}
            setValue={setQuarter}
            isClearable={true}
          />
          <SelectControl
            label="Category"
            values={getCategories(needs)}
            setValue={setCategory}
            isClearable={true}
          />
          <SelectControl
            label="Region"
            values={getRegions(needs)}
            setValue={setRegion}
            isClearable={true}
          />
        </ControlSection>

        <ControlSection label="Sort" margin={barProps.margin}>
          <SelectControl
            label="Sort&nbsp;By"
            values={sortOptions.by}
            defaultValue={sortBy || undefined}
            setValue={setSortBy}
          />
          <SelectControl
            label="Order"
            values={sortOptions.order}
            defaultValue={sortOrder || undefined}
            setValue={setSortOrder}
          />
        </ControlSection>
      </form>

      <NeedsBarChart
        needs={needs}
        options={{
          axis: {
            indexBy: indexBy || undefined,
            groupBy: groupBy || undefined,
          },
          filters: {
            search: search || undefined,
            quarter: quarter || undefined,
            region: region || undefined,
            category: category || undefined,
          },
          sort: {
            by: sortBy || undefined,
            order: sortOrder || undefined,
          },
        }}
      />
    </div>
  )
}

export default InteractiveNeedsBarChart
