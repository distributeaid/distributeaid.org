import { Fundraiser } from '@components/fundraiser/Fundraiser'
import { FundraiserPage } from '@components/fundraiser/FundraiserPage'
import { PageHeader } from '@components/PageHeader'

export function Head({ pageContext: fundraiser }: { pageContext: Fundraiser }) {
  return (
    <PageHeader
      title={`Donate to ${fundraiser.title}`}
      description={`Support Distribute Aid's project ${fundraiser.title} by donating`}
    />
  )
}

export default FundraiserPage
