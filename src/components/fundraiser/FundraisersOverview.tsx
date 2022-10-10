import { Link } from 'gatsby'
import { FC } from 'react'
import type { Fundraiser } from './Fundraiser'
import { FundraiserCard as FundraiserComponent } from './Fundraiser'

export const FundraisersOverview: FC<{ fundraisers: Fundraiser[] }> = ({
  fundraisers,
}) => (
  <article className="fundraisers">
    {fundraisers.map((fundraiser) => (
      <Link key={fundraiser.id} to={`/donate/${fundraiser.name}`}>
        <FundraiserComponent fundraiser={fundraiser} />
      </Link>
    ))}
  </article>
)
