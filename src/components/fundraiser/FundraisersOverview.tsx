import { FC } from 'react'
import type { Fundraiser } from './Fundraiser'
import { FundraiserCard as FundraiserComponent } from './Fundraiser'

export const FundraisersOverview: FC<{ fundraisers: Fundraiser[] }> = ({
  fundraisers,
}) => (
  <article className="fundraisers">
    {fundraisers.map((fundraiser) => (
      <FundraiserComponent key={fundraiser.id} fundraiser={fundraiser} />
    ))}
  </article>
)
