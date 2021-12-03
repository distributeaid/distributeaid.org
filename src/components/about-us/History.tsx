import { FC } from 'react'

const historyContent = [
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

const History: FC = () => {
  return (
    <section>
      <div className="history-container">
        {historyContent.map((item, i) => (
          <div key={`item-${i}`} className="history-item">
            <p className="text-xl text-navy-600 font-bold">{item.period}</p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default History
