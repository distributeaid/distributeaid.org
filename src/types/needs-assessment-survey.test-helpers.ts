import { Survey } from './needs-assessment-survey.d'

/*
Needs Assessment Survey
------------------------------------------------------------
*/
export const getSurvey = (props?: Record<string, any>): Survey => {
  return {
    id: 'big-long-survey-hash-from-needs-assessment-tool',
    year: '2023',
    quarter: 'Q3',
    ...props,
  }
}
