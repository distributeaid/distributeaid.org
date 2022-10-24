import { FC, useState } from 'react'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import {
  AxisOption,
  NeedsBarChart,
  SortByOption,
  SortOrderOption,
} from './needs-bar-chart'
import {
  filterByCategory,
  filterByRegion,
  getCategories,
  getItems,
  getQuarters,
  getRegions,
  getSubregions,
} from './needs-helpers'

import {
  ControlSection,
  SelectControl,
  TextInputControl,
} from '../vis-controls'

type Props = {
  needs: Need[]
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const [indexBy, setIndexBy] = useState<AxisOption>(AxisOption.Category)
  const [groupBy, setGroupBy] = useState<AxisOption>(AxisOption.Region)

  const [search, setSearch] = useState<string>('')

  const [quarter, setQuarter] = useState<string>()
  const [region, setRegion] = useState<string>()
  const [subregion, setSubregion] = useState<string>()
  const [category, setCategory] = useState<string>()
  const [item, setItem] = useState<string>()

  const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.Label)
  const [sortOrder, setSortOrder] = useState<SortOrderOption>(
    SortOrderOption.Asc,
  )

  const barProps = nivoProps.bar.horizontal

  return (
    <div>
      <form className="flex flex-col gap-10 prose max-w-none">
        <ControlSection label="Display" margin={barProps.margin}>
          <SelectControl
            label="Index By"
            values={Object.values(AxisOption)}
            defaultValue={indexBy}
            setValue={(value: string) => {
              setIndexBy(value as AxisOption)
            }}
          />
          <SelectControl
            label="Group By"
            values={Object.values(AxisOption)}
            defaultValue={groupBy}
            setValue={(value: string) => {
              setGroupBy(value as AxisOption)
            }}
          />
        </ControlSection>

        <ControlSection label="Search" margin={barProps.margin}>
          <TextInputControl label="Term" setValue={setSearch} />
        </ControlSection>

        <ControlSection label="Filter" margin={barProps.margin}>
          <SelectControl
            label="Survey"
            values={getQuarters(needs)}
            setValue={setQuarter}
            isClearable={true}
          />
          <SelectControl
            label="Region"
            values={getRegions(needs)}
            setValue={(value: string) => {
              setRegion(value)

              if (
                value &&
                subregion &&
                !getSubregions(filterByRegion(needs, value)).includes(subregion)
              ) {
                setSubregion(undefined)
              }
            }}
            isClearable={true}
          />
          <SelectControl
            label="Subregion"
            values={getSubregions(
              region ? filterByRegion(needs, region) : needs,
            )}
            setValue={setSubregion}
            isClearable={true}
          />
          <SelectControl
            label="Category"
            values={getCategories(needs)}
            setValue={setCategory}
            isClearable={true}
          />
          <SelectControl
            label="Item"
            values={getItems(
              category ? filterByCategory(needs, category) : needs,
            )}
            setValue={setItem}
            isClearable={true}
          />
        </ControlSection>

        <ControlSection label="Sort" margin={barProps.margin}>
          <SelectControl
            label="Sort&nbsp;By"
            values={Object.values(SortByOption)}
            defaultValue={sortBy}
            setValue={(value: string) => {
              setSortBy(value as SortByOption)
            }}
          />
          <SelectControl
            label="Order"
            values={Object.values(SortOrderOption)}
            defaultValue={sortOrder}
            setValue={(value: string) => {
              setSortOrder(value as SortOrderOption)
            }}
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
            subregion,
            category,
            item,
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
