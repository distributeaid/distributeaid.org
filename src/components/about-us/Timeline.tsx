import { FC } from 'react'

type TimelineItem = {
  period: string
  description: string
}

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
