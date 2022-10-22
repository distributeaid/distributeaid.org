import { FC, useState } from 'react'
import Select from 'react-select'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import { NeedsBarChart, sortOptions } from './needs-bar-chart'

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

const buildSelectOptions = (values: string[]) => {
  return values.map((value) => {
    return {
      value: value,
      label: value,
    }
  })
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const quarterOptions = buildSelectOptions(getQuarters(needs))
  const [quarter, setQuarter] = useState<string | null>(null)

  const regionOptions = buildSelectOptions(getRegions(needs))
  const [region, setRegion] = useState<string | null>(null)

  const categoryOptions = buildSelectOptions(getCategories(needs))
  const [category, setCategory] = useState<string | null>(null)

  const sortByOptions = buildSelectOptions(sortOptions.by)
  const [sortBy, setSortBy] = useState<string | null>('Label')

  const sortOrderOptions = buildSelectOptions(sortOptions.order)
  const [sortOrder, setSortOrder] = useState<string | null>('Ascending')

  return (
    <div>
      <form
        className="w-min prose"
        style={{
          marginLeft: `${nivoProps.bar.horizontal.margin.left}px`,
          marginRight: `${nivoProps.bar.horizontal.margin.right}px`,
        }}
      >
        <h2>Filters</h2>
        <div className="flex">
          <div className="flex items-center pr-5">
            <label className="pr-2">Survey:</label>
            <Select
              className="w-64"
              options={quarterOptions}
              defaultValue={null}
              onChange={(option, actionMeta) => {
                setQuarter(option?.value || null)
              }}
              isClearable={true}
            />
          </div>
          <div className="flex items-center pr-5">
            <label className="pr-2">Region:</label>
            <Select
              className="w-64"
              options={regionOptions}
              defaultValue={null}
              onChange={(option, actionMeta) => {
                setRegion(option?.value || null)
              }}
              isClearable={true}
            />
          </div>
          <div className="flex items-center pr-5">
            <label className="pr-2">Category:</label>
            <Select
              className="w-64"
              options={categoryOptions}
              defaultValue={null}
              onChange={(option, actionMeta) => {
                setCategory(option?.value || null)
              }}
              isClearable={true}
            />
          </div>
        </div>

        <h2>Sort</h2>
        <div className="flex">
          <div className="flex items-center pr-5">
            <label className="pr-2">Sort&nbsp;By:</label>
            <Select
              className="w-64"
              options={sortByOptions}
              defaultValue={sortByOptions[0]}
              onChange={(option, actionMeta) => {
                setSortBy(option?.value || null)
              }}
            />
          </div>
          <div className="flex items-center pr-5">
            <label className="pr-2">Order:</label>
            <Select
              className="w-64"
              options={sortOrderOptions}
              defaultValue={sortOrderOptions[0]}
              onChange={(option, actionMeta) => {
                setSortOrder(option?.value || null)
              }}
            />
          </div>
        </div>
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
