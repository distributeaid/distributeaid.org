import { FC } from 'react'

type TimelineItem = {
  period: string
  description: string
}

const timelineContent = [
  {
    period: 'Summer 2018',
    content:
      'When sorting donations in Scotland Sara had the idea for Distribute Aid to make it easier for people to help',
  },
  {
    period: 'Fall 2018',
    content:
      'Sara and Taylor (co-founders) spent 3 months visiting and volunteering with 50+ aid organisations in Europe to discover the most effective ways to help',
  },
  {
    period: 'January 2019',
    content: 'Distribute Aid became a registered charity in Sweden',
  },
  {
    period: 'October 2019',
    content: 'Distribute Aid facilitated its first large in-kind donation',
  },
  {
    period: 'January 2020',
    content:
      'Distribute Aid received the "Most Direct Human Impact" award by the UN Technology and Innovation Lab',
  },
  {
    period: 'March 2020',
    content:
      'Flexport.org rewarded Distribute Aid with a $50,000 grant to provide emergency aid shipments',
  },
  {
    period: 'Fall 2020',
    content:
      'Distribute Aid facilitated the international response to the Moria fire, tripling its number of aid shipments to date',
  },
  {
    period: 'Spring 2021',
    content:
      'Distribute Aid set up aid hubs and regular routes from the U.K. to help grassroots organisations continue to send aid after Brexit.',
  },
]

type Props = {
  items: TimelineItem[]
}

const Timeline: FC<Props> = ({ items }) => (
  <section className="px-4 pt-20 max-w-6xl mx-auto">
    <h2 className="text-4xl font-semibold mb-4">Our history</h2>
    <div className="timeline-container">
      {items.map((item, i) => (
        <div
          key={`item-${i}`}
          className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
        >
          <p className="text-xl text-navy-600 font-bold mb-2 timeline-title">
            {item.period}
          </p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  </section>
)

export default Timeline
