import { FC, useState } from 'react'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import {
  AxisOption,
  NeedsBarChart,
  NeedsBarChartOptions,
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

import {
  getDefaultOptions,
  OptionUpdater,
  setOption,
  updateAxisGroupByOption,
  updateAxisIndexByOption,
  updateFilterCategoryOption,
  updateFilterItemOption,
  updateFilterQuarterOption,
  updateFilterRegionOption,
  updateFilterSearchOption,
  updateFilterSubregionOption,
  updateSortByOption,
  updateSortOrderOption,
} from './needs-options-helpers'

type Props = {
  needs: Need[]
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const startingOptions: NeedsBarChartOptions = getDefaultOptions()
  const [options, setOptions] = useState<NeedsBarChartOptions>(startingOptions)
  const setOptionPartial = (updateOption: OptionUpdater) => {
    return setOption(needs, options, setOptions, updateOption)
  }

  const barProps = nivoProps.bar.horizontal

  return (
    <div>
      <form className="flex flex-col gap-10 prose max-w-none">
        <ControlSection label="Display" margin={barProps.margin}>
          <SelectControl
            label="Index By"
            values={Object.values(AxisOption)}
            value={options?.axis?.indexBy}
            setValue={setOptionPartial(updateAxisIndexByOption)}
          />
          <SelectControl
            label="Group By"
            values={Object.values(AxisOption)}
            value={options?.axis?.groupBy}
            setValue={setOptionPartial(updateAxisGroupByOption)}
          />
        </ControlSection>

        <ControlSection label="Search" margin={barProps.margin}>
          <TextInputControl
            label="Term"
            setValue={setOptionPartial(updateFilterSearchOption)}
          />
        </ControlSection>

        <ControlSection label="Filter" margin={barProps.margin}>
          <SelectControl
            label="Survey"
            values={getQuarters(needs)}
            value={options?.filters?.quarter}
            setValue={setOptionPartial(updateFilterQuarterOption)}
            isClearable={true}
          />
          <SelectControl
            label="Region"
            values={getRegions(needs)}
            value={options?.filters?.region}
            setValue={setOptionPartial(updateFilterRegionOption)}
            isClearable={true}
          />
          <SelectControl
            label="Subregion"
            values={getSubregions(
              options.filters?.region
                ? filterByRegion(needs, options.filters.region)
                : needs,
            )}
            value={options?.filters?.subregion}
            setValue={setOptionPartial(updateFilterSubregionOption)}
            isClearable={true}
          />
          <SelectControl
            label="Category"
            values={getCategories(needs)}
            value={options?.filters?.category}
            setValue={setOptionPartial(updateFilterCategoryOption)}
            isClearable={true}
          />
          <SelectControl
            label="Item"
            values={getItems(
              options.filters?.category
                ? filterByCategory(needs, options.filters?.category)
                : needs,
            )}
            value={options?.filters?.item}
            setValue={setOptionPartial(updateFilterItemOption)}
            isClearable={true}
          />
        </ControlSection>

        <ControlSection label="Sort" margin={barProps.margin}>
          <SelectControl
            label="Sort&nbsp;By"
            values={Object.values(SortByOption)}
            value={options.sort?.by}
            setValue={setOptionPartial(updateSortByOption)}
          />
          <SelectControl
            label="Order"
            values={Object.values(SortOrderOption)}
            value={options.sort?.order}
            setValue={setOptionPartial(updateSortOrderOption)}
          />
        </ControlSection>
      </form>

      <NeedsBarChart needs={needs} options={options} />
    </div>
  )
}

export default InteractiveNeedsBarChart
