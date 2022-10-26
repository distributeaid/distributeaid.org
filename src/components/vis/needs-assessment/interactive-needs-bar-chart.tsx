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

type Props = {
  needs: Need[]
}

export const InteractiveNeedsBarChart: FC<Props> = ({ needs }) => {
  const url = new URL(window.location.href)

  const optionsParam =
    url.searchParams.get('InteractiveNeedsBarChartOptions') || '{}'
  const savedOptions = JSON.parse(optionsParam)
  let startingOptions = getDefaultOptions()
  startingOptions = updateAxisIndexByOption(
    needs,
    startingOptions,
    savedOptions?.axis?.indexBy || startingOptions?.axis?.indexBy,
  )
  startingOptions = updateAxisGroupByOption(
    needs,
    startingOptions,
    savedOptions?.axis?.groupBy || startingOptions?.axis?.groupBy,
  )
  startingOptions = updateFilterSearchOption(
    needs,
    startingOptions,
    savedOptions?.filters?.search || startingOptions?.filters?.search,
  )
  startingOptions = updateFilterQuarterOption(
    needs,
    startingOptions,
    savedOptions?.filters?.quarter || startingOptions?.filters?.quarter,
  )
  startingOptions = updateFilterRegionOption(
    needs,
    startingOptions,
    savedOptions?.filters?.region || startingOptions?.filters?.region,
  )
  startingOptions = updateFilterSubregionOption(
    needs,
    startingOptions,
    savedOptions?.filters?.subregion || startingOptions?.filters?.subregion,
  )
  startingOptions = updateFilterCategoryOption(
    needs,
    startingOptions,
    savedOptions?.filters?.category || startingOptions?.filters?.category,
  )
  startingOptions = updateFilterItemOption(
    needs,
    startingOptions,
    savedOptions?.filters?.item || startingOptions?.filters?.item,
  )
  startingOptions = updateSortByOption(
    needs,
    startingOptions,
    savedOptions?.sort?.by || startingOptions?.sort?.by,
  )
  startingOptions = updateSortOrderOption(
    needs,
    startingOptions,
    savedOptions?.sort?.order || startingOptions?.sort?.order,
  )

  const [options, setOptions] = useState<NeedsBarChartOptions>(startingOptions)

  const setOptionPartial = (updateOption: NeedsOptionUpdater) => {
    return (value: string) => {
      const newOptions = updateOption(needs, options, value)
      url.searchParams.set(
        'InteractiveNeedsBarChartOptions',
        JSON.stringify(newOptions),
      )
      history.replaceState(null, '', url)
      setOptions(newOptions)
    }
  }

  const startingTitle =
    url.searchParams.get('InteractiveNeedsBarChartTitle') || 'Needs Bar Chart'
  const [title, setTitle] = useState(startingTitle)

  const setTitlePartial = (value: string) => {
    url.searchParams.set('InteractiveNeedsBarChartTitle', title)
    history.replaceState(null, '', url)
    setTitle(value)
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
            value={options?.filters?.search}
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

        <ControlSection label="Share" margin={barProps.margin}>
          <TextInputControl
            label="Title"
            value={title}
            setValue={setTitlePartial}
          />
          <TextInputControl label="Link" value={url.href} disabled />
        </ControlSection>
      </form>

      <NeedsBarChart title={title} needs={needs} options={options} />
    </div>
  )
}

export default InteractiveNeedsBarChart
