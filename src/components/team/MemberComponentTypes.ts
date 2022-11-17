/*
Member
================================================================================
*/

export type Members = {
  data: {
    allDaTeamMember: {
      nodes: {
        bio: string
        name: string
        profilePhoto: {
          gatsbyImageData: {
            height: number
            aspectRatio: number
            transformOptions: { cropFocus: string }
          }
        }
        link: string
        roles: {
          role: {
            title: string
            commitment: string
            domain: string
          }[]
        }
      }
    }
  }
}
