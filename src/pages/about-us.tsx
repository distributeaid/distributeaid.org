import { FC, useState } from 'react'
import SimpleLayout from '@layouts/Simple'

const cardClasses = 'p-4 max-w-xl mx-auto flex flex-col items-center space-y-4'

const AboutUs: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <SimpleLayout pageTitle="About us">
      <div className="pt-8 md:pt-20" style={{ minHeight: '80vh' }}>
        <h1 className="text-center text-gray-800 text-3xl font-medium mb-20">
          About us
        </h1>
      </div>
    </SimpleLayout>
  )
}

export default AboutUs
