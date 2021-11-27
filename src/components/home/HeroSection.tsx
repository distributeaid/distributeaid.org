import { FC } from 'react'
import WordMark from '@components/brand/WordMark'

const HeroSection: FC = () => (
  <header className="mx-auto max-w-5xl px-4 lg:px-8 py-16 lg:py-36">
    <div className="lg:flex justify-between items-center">
      <div className="pb-8">
        <WordMark width={300} height="auto" />
        <h1 className="text-4xl text-navy-700 max-w-sm mt-4 leading-snug">
          Re-imagine Humanitarian Aid Delivery
        </h1>
      </div>
      <iframe
        className="max-w-full"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/msizPweg3kE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    {/* <div className="page__header col-10 col-sm-12 col-mx-auto text-center p-4 lg:p-8 mx-auto">
      <p className="intro col-7 col-lg-9 col-sm-11 col-mx-auto text-justify">
        Distribute Aid helps grassroots organizations ship humanitarian aid to
        where it's needed most. Our logistics experts, open source technology,
        and extensive partnerships allow us to operate efficiently, saving aid
        groups valuable time and money. We currently work with the Refugee Aid
        movement in Europe, and COVID-19 response groups in Europe and the US.
      </p>
    </div> */}
  </header>
)

export default HeroSection
