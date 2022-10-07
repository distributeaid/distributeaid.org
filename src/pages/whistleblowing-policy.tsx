import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { HeadProps, Link } from 'gatsby'
import PageData from '@components/PageData'

const WhistleblowingPolicy: FC = () => (
  <SimpleLayout>
    <div className="pt-8 md:pt-20">
      <h1 className="text-center text-gray-800 text-3xl font-medium mb-20">
        Whistleblowing Policy
      </h1>

      <section>
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <p>
            Distribute Aid requires directors, coordinators, and other
            volunteers to observe high standards of organisational and personal
            ethics in the conduct of their duties and responsibilities. As
            representatives of Distribute Aid, we must practice honesty and
            integrity in fulfilling our responsibilities and comply with all
            applicable laws, regulations, and internal ethical policies. Doing
            this helps us be as effective as possible at pursuing our mission!
          </p>

          <p>
            This Whistleblower Policy is intended to encourage and enable
            individuals to raise serious concerns without retribution so that
            Distribute Aid can address and correct inappropriate conduct and
            actions. It is the responsibility of all board members, directors,
            coordinators, and volunteers to report concerns about violations of{' '}
            <Link className="link" to="/code-of-conduct">
              Distribute Aid’s Code of Conduct
            </Link>{' '}
            or suspected violations of law or regulations that govern Distribute
            Aid’s operations. Such violations could include using racist,
            sexist, ableist, or otherwise derogatory and discriminatory
            language, or graver violations such as putting the safety of people
            on the move at risk by willfully exposing locations or publicising
            photographs with sensitive information.
          </p>

          <p>
            It is the policy of Distribute Aid that a Whistleblower shall
            receive no retaliation or retribution for a report that was provided
            in good faith. Anyone who retaliates against the Whistleblower (who
            reported an event in good faith) at any point in the process
            described below will be subject to discipline.
          </p>

          <p>
            The following outlines the procedure for anyone to raise concerns
            about the conduct of any member of Distribute Aid or practice
            carried out by the organisation.
          </p>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Internal Reporting Procedure for Individuals with a Concern is as
            Such:
          </h2>

          <ol className="list-decimal ml-6">
            <li className="mb-4">
              The Whistleblower begins the process when they have good faith,
              reasonable grounds for believing that a violation has occurred.
              <ol
                className="list-decimal ml-6 mt-2"
                style={{ listStyle: 'lower-alpha' }}
              >
                <li className="mb-4">
                  If the person is not acting in good faith and offers
                  unsubstantiated allegations made maliciously or knowingly to
                  be false, this can be viewed as a disciplinary offence.
                </li>
              </ol>
            </li>
            <li className="mb-4">
              Assuming they are acting in good faith, the Whistleblower should
              first decide if they wish for their report to be anonymous or not.
              <ol
                className="list-decimal ml-6 mt-2"
                style={{ listStyle: 'lower-alpha' }}
              >
                <li className="mb-4">
                  If they do not wish to report anonymously, they may use any
                  written medium (email, document, etc.) to file the report with
                  the proper individual, per step 3.
                </li>
                <li className="mb-4">
                  If they do wish to report anonymously, they should create an
                  account on ProtonMail{' '}
                  <a className="link" href="#note1">
                    <abbr
                      title="ProtonMail is an anonymous, end-to-end encrypted,
              Swiss-based email service that does not require personal
              information and does not log IP addresses. It has a reputation for
              true anonymity and security. Setting up an account can be done
              quickly and easily."
                      className="px-1 mx-1"
                    >
                      &sup1;
                    </abbr>
                  </a>{' '}
                  with an anonymous address, such as a random sequence of
                  numerals. See{' '}
                  <a className="link" href="#appendixB">
                    Appendix B
                  </a>{' '}
                  of this document for instructions on how to set up a Proton
                  Mail Account to <em>File a Report</em>{' '}
                  <a className="link" href="#note2">
                    <abbr
                      title="The Whistleblower should take care to record their login
              details for ProtonMail so that they can log back in and see when a
              response comes in, since DA will not be able to see or reset their
              password."
                      className="px-1 mx-1"
                    >
                      &sup2;
                    </abbr>
                  </a>
                  .
                </li>
              </ol>
            </li>
            <li className="mb-4">
              If the Whistleblower is uncomfortable or otherwise reluctant to
              report to the relevant director (for example, if said director is
              the source of the concern), then the Whistleblower may report the
              event to the next highest level of management, which is the
              Executive Director (see{' '}
              <a className="link" href="#appendixA">
                Appendix A
              </a>{' '}
              of this document for contact information). If the Whistleblower is
              uncomfortable or otherwise reluctant to report to the relevant
              director and the Executive Director, then the Whistleblower may
              report the event to an appropriate board member (see{' '}
              <a className="link" href="#appendixA">
                Appendix A
              </a>{' '}
              of this document for contact information). For financial concerns
              the Whistleblower may contact the Auditor (see{' '}
              <a className="link" href="#appendixA">
                Appendix A
              </a>{' '}
              of this document for contact information).
            </li>
            <li className="mb-4">
              It is the responsibility of the person who receives a report to
              promptly investigate and/or resolve the issue.
              <ol
                className="list-decimal ml-6 mt-2"
                style={{ listStyle: 'lower-alpha' }}
              >
                <li className="mb-4">
                  Throughout this investigation and the entire process, the
                  identity of the Whistleblower, if known, shall remain
                  confidential to all persons directly involved in applying this
                  policy, unless the issue requires investigation by law
                  enforcement, in which case members of the organisation may be
                  required to disclose this information to law enforcement.
                </li>
              </ol>
            </li>
            <li className="mb-4">
              The investigating individual shall send a report to the
              Whistleblower within seven days of the initial report, regarding
              the investigation, disposition, or resolution of the issue. This
              report must be in writing.
              <ol
                className="list-decimal ml-6 mt-2"
                style={{ listStyle: 'lower-alpha' }}
              >
                <li className="mb-4">
                  If the initial report was not filed anonymously, then the
                  investigative report may be issued by email or print to the
                  Whistleblower.
                </li>
                <li className="mb-4">
                  If the initial report was filed anonymously, then the
                  investigative report must be sent via ProtonMail to the same
                  address that the initial report came from.
                </li>
              </ol>
            </li>
            <li className="mb-4">
              If the Whistleblower is not satisfied with the report from the
              internal investigator, then they have the right to report the
              event to the next highest level of authority within the
              organisation for another 7-day investigation or to the appropriate
              legal or investigative agency. If the Whistleblower chooses to
              report internally, then the process returns to step 2.
              <ol
                className="list-decimal ml-6 mt-2"
                style={{ listStyle: 'lower-alpha' }}
              >
                <li className="mb-4">
                  For example, if someone is unsatisfied with the Operations
                  Leads’ resolution, they could file a second report with the
                  Executive Director.
                </li>
              </ol>
            </li>
          </ol>

          <aside className="text-sm text-gray-700">
            <p id="note1" className="mb-2">
              &sup1; ProtonMail is an anonymous, end-to-end encrypted,
              Swiss-based email service that does not require personal
              information and does not log IP addresses. It has a reputation for
              true anonymity and security. Setting up an account can be done
              quickly and easily.
            </p>
            <p id="note2">
              &sup2; The Whistleblower should take care to record their login
              details for ProtonMail so that they can log back in and see when a
              response comes in, since DA will not be able to see or reset their
              password.
            </p>
          </aside>
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2 className="text-2xl font-semibold mb-8 text-gray-800">
            Reporting to Authorities
          </h2>

          <p>
            At any point during the process, a Whistleblower may choose to file
            a report with the appropriate legal or investigative agency, outside
            of Distribute Aid. Crimes against persons or property, such as
            assault, burglary, etc., should immediately be reported to local law
            enforcement personnel. Sweden does not have a dedicated agency for
            overseeing non-profit organisations.
          </p>

          <p>
            The following agencies may be helpful depending on the nature of the
            issue:
          </p>

          <ul className="list-disc ml-6">
            <li className="mb-2">
              Swedish Tax Agency,{' '}
              <a
                className="link"
                href="https://www.skatteverket.se/"
                target="_blank"
                rel="noreferrer noopener"
              >
                skatteverket.se
              </a>
              ,{' '}
              <a className="link" href="tel:+46771567567">
                +46 771 567 567
              </a>
            </li>
            <li className="mb-2">
              Swedish Consumer Agency,{' '}
              <a
                className="link"
                href="https://www.konsumentverket.se/languages/english-engelska/this-is-how-you-file-a-complaint/"
                target="_blank"
                rel="noreferrer noopener"
              >
                report form
              </a>
              ,{' '}
              <a
                className="link"
                href="mailto:konsumentverket@konsumentverket.se"
              >
                konsumentverket@konsumentverket.se
              </a>
            </li>
            <li className="mb-2">
              Swedish Police,{' '}
              <a
                className="link"
                href="https://polisen.se/en/victims-of-crime/making-a-report/"
                target="_blank"
                rel="noreferrer noopener"
              >
                report form
              </a>
              ,{' '}
              <a className="link" href="tel:+771141400">
                +46 77 114 14 00
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2
            className="text-2xl font-semibold mb-8 text-gray-800"
            id="appendixA"
          >
            Appendix A: Contact Information for Relevant Parties
          </h2>

          <h3 className="text-xl font-semibold mb-8 text-gray-800">
            Coordinators
          </h3>

          <ContactInfo
            name="Taylor Fairbank"
            role="Operations Lead"
            email="taylor@distributeaid.org"
            protonMail="taylordistributeaid@proton.me"
          />

          <ContactInfo
            name="Nicole Tingle"
            role="European Director"
            email="nicole@distributeaid.org"
            protonMail="NicoleDistributeAid@proton.me"
          />

          <h3 className="text-xl font-semibold mb-8 text-gray-800">Director</h3>

          <ContactInfo
            name="Sara Lönegård"
            email="sara@distributeaid.org"
            protonMail="saradistributeaid@proton.me"
          />

          <h3 className="text-xl font-semibold mb-8 text-gray-800">
            Board Members
          </h3>

          <ContactInfo
            name="Rudayna Abdo"
            email="rudayna@thaki.org"
            protonMail="rudaynadistributeaid@proton.me"
          />

          <ContactInfo
            name="Stephanie Fairbank"
            email="stephanie@distributeaid.org"
            protonMail="stephaniedistributeaid@proton.me"
          />
        </div>
      </section>

      <section>
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
          <h2
            className="text-2xl font-semibold mb-8 text-gray-800"
            id="appendixB"
          >
            Appendix B: Instructions for Setting Up Proton Mail Account to{' '}
            <em>File a Report</em>
          </h2>

          <ol className="list-decimal ml-6">
            <li className="mb-4">
              Go to{' '}
              <a
                className="link"
                href="https://protonmail.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                protonmail.com
              </a>
              .
            </li>
            <li className="mb-4">Select “Sign Up” in the top right.</li>
            <li className="mb-4">
              Select the “Free” option and then click “Select Free Account.”
            </li>
            <li className="mb-4">
              Select a username that is not personally identifiable, like a
              meaningless string of numerals. Select a password, and record it
              somewhere so that you can access your account later.
            </li>
            <li className="mb-4">
              You may choose to add a recovery method. If you do not do this and
              lose your password, then you will be unable to log into your
              account later to check on the status of your report and receive
              your 7 day investigative report. If you do choose to add a
              recovery method, this information will not be visible to
              Distribute Aid at any point during the reporting process.
              <ol
                className="list-decimal ml-6 mt-2"
                style={{ listStyle: 'lower-alpha' }}
              >
                <li className="mb-4">
                  If you do not wish to add a recovery method, click “Skip”.
                </li>
              </ol>
            </li>
            <li className="mb-4">Select the free plan once again.</li>
            <li className="mb-4">
              Verify that you are a human via Captcha or one of the other
              options.
            </li>
            <li className="mb-4">
              You should be redirected to an email inbox. You can now compose a
              message.
            </li>
          </ol>

          <p>
            Note: Take care to record your login details for ProtonMail so that
            you can log back in and see when a response comes in, since DA will
            not be able to see or reset your password.
          </p>
        </div>
      </section>

      <footer className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-sm text-gray-700">
          <p>
            This policy was adapted from sample whistleblower policies from the{' '}
            <a
              className="link"
              href="https://www.councilofnonprofits.org/sites/default/files/Sample WhistleblowerPolicy 2.2010.pdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              National Council of Nonprofits
            </a>{' '}
            and{' '}
            <a
              className="link"
              href="https://managementhelp.org/misc/Sample-Whistleblower-Policy.pdf"
              target="_blank"
              rel="noreferrer noopener"
            >
              Authenticity Consulting, LLC
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  </SimpleLayout>
)

const ContactInfo = ({
  role,
  name,
  email,
  protonMail,
}: {
  role?: string
  name: string
  email: string
  protonMail: string
}) => (
  <>
    {role !== undefined && (
      <h4 className="text-l font-semibold mb-8 text-gray-800">{role}</h4>
    )}
    <p>
      <strong>{name}</strong>
      <br />
      Email:{' '}
      <a className="link" href={`mailto:${email}`}>
        {email}
      </a>
      <br />
      ProtonMail:{' '}
      <a className="link" href={`mailto:${protonMail}`}>
        {protonMail}
      </a>
    </p>
  </>
)

export default WhistleblowingPolicy

export function Head(props: HeadProps) {
  return (
    <>
      <title>Whistleblowing Policy - Distribute Aid</title>
      <PageData />
    </>
  )
}
