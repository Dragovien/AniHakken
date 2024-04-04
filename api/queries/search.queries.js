let url = "https://graphql.anilist.co"
let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: null,
}

exports.getAiringAnimeQuery = (req, res) => {
  var query = `
      query ($id: Int, $page: Int, $perPage: Int, $status: MediaStatus) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
          media (id: $id, type: ANIME, status: $status, isAdult: false) {
            id
            title {
              romaji
              english
              native
            }
            type
            format
            status
            description
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            season
            seasonYear
            episodes
            duration
            countryOfOrigin
            source
            trailer {
              id
              site
              thumbnail
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            genres
            averageScore
            popularity
            favourites
          }
        }
      }
      `

  let variables = {
    page: req.body.pageNumber,
    perPage: req.body.perPage,
    status: "RELEASING",
  }

  options.body = JSON.stringify({query, variables})

  return {url, options}
}

//info dispos

// tags {
//   id
//   name
//   description
//   category
//   rank
//   isGeneralSpoiler
//   isMediaSpoiler
//   isAdult
// }

// stats {
//   scoreDistribution {
//     score
//     amount
//   }
//   statusDistribution {
//     status
//     amount
//   }

// }
// rankings {
//   rank
//   type
//   format
//   year
//   season
//   allTime
//   context
// }

exports.searchAnimeQuery = (req, res) => {
  var query = `
      query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
          media (id: $id, search: $search, type: ANIME, isAdult: false) {
            id
            title {
              romaji
              english
              native
            }
            type
            format
            status
            description
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            season
            seasonYear
            episodes
            duration
            countryOfOrigin
            source
            trailer {
              id
              site
              thumbnail
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            genres
            averageScore
            popularity
            favourites
          }
        }
      }
      `

  let variables = {
    search: req.body.text,
    page: req.body.pageNumber,
    perPage: req.body.perPage,
  }

  options.body = JSON.stringify({query, variables})

  return {url, options}
}
