import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { HeadProps, Link } from 'gatsby'
import { PageHeader } from '@components/PageHeader'

export function Head() {
  return <PageHeader title={'Code of Conduct'} />
}

const CodeOfConduct: FC = () => (
  <SimpleLayout>
    <div className="pt-8 md:pt-20">
      <h1 className="text-center text-gray-800 text-3xl font-medium mb-20">
        Code of Conduct
      </h1>

      <section>
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Our Pledge
          </h2>

          <p>
            We as members, contributors, and leaders pledge to make
            participation in our community a harassment-free experience for
            everyone, regardless of age, body size, visible or invisible
            disability, ethnicity, sex characteristics, gender identity and
            expression, level of experience, education, socio-economic status,
            nationality, personal appearance, race, religion, or sexual identity
            and orientation.
          </p>
          <p>
            We pledge to act and interact in ways that contribute to an open,
            welcoming, diverse, inclusive, and healthy community.
          </p>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Our Standards
          </h2>
          <p>
            Examples of behavior that contributes to a positive environment for
            our community include:
          </p>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              Demonstrating empathy and kindness toward other people
            </li>
            <li className="mb-2">
              Being respectful of differing opinions, viewpoints, and
              experiences
            </li>
            <li className="mb-2">
              Giving and gracefully accepting constructive feedback
            </li>
            <li className="mb-2">
              Accepting responsibility and apologizing to those affected by our
              mistakes, and learning from the experience
            </li>
            <li className="mb-2">
              Focusing on what is best not just for us as individuals, but for
              the overall community
            </li>
          </ul>
          <p>Examples of unacceptable behavior include:</p>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              The use of sexualized language or imagery, and sexual attention or
              advances of any kind
            </li>
            <li className="mb-2">
              Trolling, insulting or derogatory comments, and personal or
              political attacks
            </li>
            <li className="mb-2">Public or private harassment</li>
            <li className="mb-2">
              Publishing others’ private information, such as a physical or
              email address, without their explicit permission
            </li>
            <li className="mb-2">
              Other conduct which could reasonably be considered inappropriate
              in a professional setting
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Enforcement Responsibilities
          </h2>
          <p>
            Community leaders are responsible for clarifying and enforcing our
            standards of acceptable behaviour and will take appropriate and fair
            corrective action in response to any behaviour that they deem
            inappropriate, threatening, offensive, or harmful.
          </p>
          <p>
            In our online communities, community leaders have the right and
            responsibility to remove, edit, or reject comments, commits, code,
            wiki edits, issues, and other contributions that are not aligned to
            this Code of Conduct, and will communicate reasons for moderation
            decisions when appropriate.
          </p>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">Scope</h2>
          <p>
            This Code of Conduct applies within all community spaces, and also
            applies when an individual is officially representing the community
            in public spaces. Examples of representing our community include
            using an official e-mail address, posting via an official social
            media account, or acting as an appointed representative at an online
            or offline event.
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Enforcement
          </h2>
          <p>
            Instances of abusive, harassing, or otherwise unacceptable behavior
            may be reported to the community leaders responsible for enforcement
            as outlined in our{' '}
            <Link className="link" to="/whistleblowing-policy">
              Whistleblowing Policy
            </Link>
            . All complaints will be reviewed and investigated promptly and
            fairly.
          </p>
          <p>
            All community leaders are obligated to respect the privacy and
            security of the reporter of any incident.
          </p>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Enforcement Guidelines
          </h2>
          <p>
            Community leaders will follow these Community Impact Guidelines in
            determining the consequences for any action they deem in violation
            of this Code of Conduct:
          </p>
          <h3 className="text-xl font-semibold mb-8 text-gray-800">
            1. Correction
          </h3>
          <p>
            <strong>Community Impact</strong>: Use of inappropriate language or
            other behavior deemed unprofessional or unwelcome in the community.
          </p>
          <p>
            <strong>Consequence</strong>: A private, written warning from
            community leaders, providing clarity around the nature of the
            violation and an explanation of why the behavior was inappropriate.
            A public apology may be requested.
          </p>
          <h3 className="text-xl font-semibold mb-8 text-gray-800">
            2. Warning
          </h3>
          <p>
            <strong>Community Impact</strong>: A violation through a single
            incident or series of actions.
          </p>
          <p>
            <strong>Consequence</strong>: A warning with consequences for
            continued behavior. No interaction with the people involved,
            including unsolicited interaction with those enforcing the Code of
            Conduct, for a specified period of time. This includes avoiding
            interactions in community spaces as well as external channels like
            social media. Violating these terms may lead to a temporary or
            permanent ban.
          </p>
          <h3 className="text-xl font-semibold mb-8 text-gray-800">
            3. Temporary Ban
          </h3>
          <p>
            <strong>Community Impact</strong>: A serious violation of community
            standards, including sustained inappropriate behavior.
          </p>
          <p>
            <strong>Consequence</strong>: A temporary ban from any sort of
            interaction or public communication with the community for a
            specified period of time. No public or private interaction with the
            people involved, including unsolicited interaction with those
            enforcing the Code of Conduct, is allowed during this period.
            Violating these terms may lead to a permanent ban.
          </p>
          <h3 className="text-xl font-semibold mb-8 text-gray-800">
            4. Permanent Ban
          </h3>
          <p>
            <strong>Community Impact</strong>: Demonstrating a pattern of
            violation of community standards, including sustained inappropriate
            behavior, harassment of an individual, or aggression toward or
            disparagement of classes of individuals.
          </p>
          <p>
            <strong>Consequence</strong>: A permanent ban from any sort of
            public interaction within the community.{' '}
          </p>
        </div>
      </section>

      <footer>
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-sm text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Attribution
          </h2>
          <p>
            This Code of Conduct is adapted from the 
            <a className="link" href="https://www.contributor-covenant.org/">
              Contributor Covenant
            </a>
            , version 2.0, available at 
            <a
              className="link"
              href="https://www.contributor-covenant.org/version/2/0/code_of_conduct.html"
            >
              https://www.contributor-covenant.org/version/2/0/code_of_conduct.html
            </a>
            .
          </p>
          <p>
            Community Impact Guidelines were inspired by 
            <a className="link" href="https://github.com/mozilla/diversity">
              Mozilla’s code of conduct enforcement ladder
            </a>
            .
          </p>
          <p>
            For answers to common questions about this code of conduct, see the
            FAQ at 
            <a className="link" href="https://www.contributor-covenant.org/faq">
              https://www.contributor-covenant.org/faq
            </a>
            . Translations are available at 
            <a
              className="link"
              href="https://www.contributor-covenant.org/translations"
            >
              https://www.contributor-covenant.org/translations
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  </SimpleLayout>
)

export default CodeOfConduct
