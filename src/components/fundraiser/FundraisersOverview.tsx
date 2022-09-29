import { FC } from 'react'
import { Link } from 'gatsby'
import type { FundraiserCard } from './Fundraiser'
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
