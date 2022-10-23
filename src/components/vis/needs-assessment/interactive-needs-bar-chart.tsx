import { FC, useState } from 'react'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import { axisOptionValues, NeedsBarChart, sortOptions } from './needs-bar-chart'
import { getCategories, getQuarters, getRegions } from './needs-helpers'

import { ControlSection, InputControl, SelectControl } from '../vis-controls'

type Props = {
  needs: Need[]
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const [indexBy, setIndexBy] = useState<string | undefined>(
    axisOptionValues[0],
  )
  const [groupBy, setGroupBy] = useState<string | undefined>(
    axisOptionValues[1],
  )

  const [search, setSearch] = useState<string>('')

  const [quarter, setQuarter] = useState<string>()
  const [region, setRegion] = useState<string>()
  const [category, setCategory] = useState<string>()

  const [sortBy, setSortBy] = useState<string | undefined>(sortOptions.by[0])
  const [sortOrder, setSortOrder] = useState<string | undefined>(
    sortOptions.order[0],
  )

  const barProps = nivoProps.bar.horizontal

  return (
    <div>
      <form className="flex flex-col gap-10 prose max-w-none">
        <ControlSection label="Display" margin={barProps.margin}>
          <SelectControl
            label="Index By"
            values={axisOptionValues}
            defaultValue={indexBy}
            setValue={setIndexBy}
          />
          <SelectControl
            label="Group By"
            values={axisOptionValues}
            defaultValue={groupBy}
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
            defaultValue={sortBy}
            setValue={setSortBy}
          />
          <SelectControl
            label="Order"
            values={sortOptions.order}
            defaultValue={sortOrder}
            setValue={setSortOrder}
          />
        </ControlSection>
      </form>

      <NeedsBarChart
        needs={needs}
        options={{
          axis: {
            indexBy,
            groupBy,
          },
          filters: {
            search,
            quarter,
            region,
            category,
          },
          sort: {
            by: sortBy,
            order: sortOrder,
          },
        }}
      />
    </div>
  )
}

export default InteractiveNeedsBarChart
