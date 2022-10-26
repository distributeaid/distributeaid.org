import { FC, useState } from 'react'

import { Need } from '../../../types/need-types'
import { nivoProps } from '../nivo-theme'
import { NeedsBarChart } from './needs-bar-chart'

import {
  ControlSection,
  SelectControl,
  TextInputControl,
} from '../vis-controls'

import {
  getAxisGroupByOptions,
  getAxisIndexByOptions,
  getDefaultOptions,
  getFilterCategoryOptions,
  getFilterItemOptions,
  getFilterQuarterOptions,
  getFilterRegionOptions,
  getFilterSubregionOptions,
  NeedsBarChartOptions,
  NeedsOptionUpdater,
  updateAxisGroupByOption,
  updateAxisIndexByOption,
  updateFilterCategoryOption,
  updateFilterItemOption,
  updateFilterQuarterOption,
  updateFilterRegionOption,
  updateFilterSearchOption,
  updateFilterSubregionOption,
} from './needs-options-helpers'

import {
  getSortByOptions,
  getSortOrderOptions,
  updateSortByOption,
  updateSortOrderOption,
} from '../nivo-options-helpers'

const setOption = (
  needs: Need[],
  currentOptions: NeedsBarChartOptions,
  setState: React.Dispatch<React.SetStateAction<NeedsBarChartOptions>>,
  updateOption: NeedsOptionUpdater,
): ((value: string) => void) => {
  return (value) => {
    const newOptions = updateOption(needs, currentOptions, value)
    setState(newOptions)
  }
}

type Props = {
  needs: Need[]
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const startingOptions = getDefaultOptions()
  const [options, setOptions] = useState<NeedsBarChartOptions>(startingOptions)
  const setOptionPartial = (updateOption: NeedsOptionUpdater) => {
    return setOption(needs, options, setOptions, updateOption)
  }

  const barProps = nivoProps.bar.horizontal

  return (
    <div>
      <form className="flex flex-col gap-10 prose max-w-none">
        <ControlSection label="Display" margin={barProps.margin}>
          <SelectControl
            label="Index By"
            values={getAxisIndexByOptions(needs, options)}
            value={options?.axis?.indexBy}
            setValue={setOptionPartial(updateAxisIndexByOption)}
          />
          <SelectControl
            label="Group By"
            values={getAxisGroupByOptions(needs, options)}
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
            values={getFilterQuarterOptions(needs, options)}
            value={options?.filters?.quarter}
            setValue={setOptionPartial(updateFilterQuarterOption)}
            isClearable={true}
          />
          <SelectControl
            label="Region"
            values={getFilterRegionOptions(needs, options)}
            value={options?.filters?.region}
            setValue={setOptionPartial(updateFilterRegionOption)}
            isClearable={true}
          />
          <SelectControl
            label="Subregion"
            values={getFilterSubregionOptions(needs, options)}
            value={options?.filters?.subregion}
            setValue={setOptionPartial(updateFilterSubregionOption)}
            isClearable={true}
          />
          <SelectControl
            label="Category"
            values={getFilterCategoryOptions(needs, options)}
            value={options?.filters?.category}
            setValue={setOptionPartial(updateFilterCategoryOption)}
            isClearable={true}
          />
          <SelectControl
            label="Item"
            values={getFilterItemOptions(needs, options)}
            value={options?.filters?.item}
            setValue={setOptionPartial(updateFilterItemOption)}
            isClearable={true}
          />
        </ControlSection>

        <ControlSection label="Sort" margin={barProps.margin}>
          <SelectControl
            label="Sort&nbsp;By"
            values={getSortByOptions(needs, options)}
            value={options.sort?.by}
            setValue={setOptionPartial(updateSortByOption)}
          />
          <SelectControl
            label="Order"
            values={getSortOrderOptions(needs, options)}
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
