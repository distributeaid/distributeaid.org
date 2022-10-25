import { FC, ReactNode } from 'react'
import PhotoCredit from './PhotoCredit'
import { RouteDeadlines, RouteImages } from './RouteComponentTypes'
import RoutesSectionImage from './RoutesSectionImage'
import TextWithVisual from './TextWithVisual'

type ReservationsProps = {
  deadlines: RouteDeadlines
  images: RouteImages
  aidRequestFormUrl: string
}

function formatDate(date: string) {
  const actualDate = new Date(date)
  const timeDiff = actualDate.getTimezoneOffset() * 60000
  const adjustedDate = new Date(actualDate.valueOf() + timeDiff)

  return adjustedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const ReservationInstruction = ({
  subHeading,
  deadline,
  children,
}: {
  subHeading: string
  deadline: string
  children: ReactNode
}) => {
  return (
    <li className="">
      <h3 className="text-lg font-semibold mb-4">{subHeading}</h3>
      {children}
      <p className="h5">{deadline}</p>
    </li>
  )
}

const Reservations: FC<ReservationsProps> = ({
  deadlines,
  images,
  aidRequestFormUrl,
}) => {
  return (
    <TextWithVisual
      id="reserve-your-spot"
      positionOfVisual="left"
      visual={
        <RoutesSectionImage
          ariaLabel="An aisle in a warehouse with shelves stacked high with pallets of boxes."
          image={images.reservationSection}
        />
      }
    >
      <header className="mb-4 text-center">
        <h2 className="section__title">Reserve Your Spot!</h2>
      </header>

      <div className="section__body">
        <ol className="space-y-8">
          <ReservationInstruction
            subHeading="1. Submit Your Aid Delivery Request"
            deadline={`Submissions close: ${formatDate(
              deadlines.submissionsDeadline,
            )}`}
          >
            <>
              <p className="mb-4">
                Download the{' '}
                <a
                  className="font-bold underline"
                  href={aidRequestFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aid Delivery Request Form
                </a>{' '}
                and fill it in.
              </p>
              <p className="mb-4">
                Email the completed form to{' '}
                <a
                  className="font-bold underline"
                  href="mailto:hubs@distributeaid.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hubs@distributeaid.org
                </a>
                . Your local Staging Hub will receive it and follow up if there
                are any questions.
              </p>
            </>
          </ReservationInstruction>
          <ReservationInstruction
            subHeading="2. Consult Frontline Groups"
            deadline={`Latest confirmation date: ${formatDate(
              deadlines.confirmationDate,
            )}`}
          >
            <p className="mb-4">
              We'll check in with the frontline groups during the offer period,
              to confirm which offered donations they want and to prioritise
              deliveries that meet their biggest needs. Then we can confirm if
              you have a place reserved on the next truck.
            </p>
          </ReservationInstruction>
          <ReservationInstruction
            subHeading="3. Drop Off @ Staging Hubs"
            deadline={`Staging period: ${formatDate(
              deadlines.stagingBegins,
            )} - ${formatDate(deadlines.stagingEnds)}`}
          >
            <p className="mb-4">
              Schedule a drop-off appointment with your local Staging Hub, pay
              them the flat-rate{' '}
              <a href="#storage-and-shipping-charge">
                Storage &amp; Shipping charge
              </a>
              , and deliver the boxes of aid at the agreed time.
            </p>
          </ReservationInstruction>
          <ReservationInstruction
            subHeading="4. Deliver The Aid"
            deadline={`Shipment departs: ${formatDate(
              deadlines.shipmentDeparture,
            )}`}
          >
            <p className="mb-4">
              And that's it! Take an evening off to celebrate a job well done,
              we got it from here. Once your aid is delivered we'll follow up
              with an after-shipment report, including photos and
              acknowledgments from the frontline groups.
            </p>
          </ReservationInstruction>
        </ol>
      </div>

      <PhotoCredit
        url="https://unsplash.com/@ruchindra?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
        description="Ruchindra Gunasekara on Unsplash"
      />
    </TextWithVisual>
  )
}

export default Reservations
