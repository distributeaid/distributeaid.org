import { FC, useState } from 'react'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import { NeedsBarChart, sortOptions } from './needs-bar-chart'

import { ControlSection, SelectControl } from '../vis-controls'

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
        <ControlSection label="Filters" margin={barProps.margin}>
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
            defaultValue={sortOptions.by[0]}
            setValue={setSortBy}
          />
          <SelectControl
            label="Order"
            values={sortOptions.order}
            defaultValue={sortOptions.order[0]}
            setValue={setSortOrder}
          />
        </ControlSection>
      </form>

      <NeedsBarChart
        needs={needs}
        options={{
          filters: {
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
