let url = 'https://graphql.anilist.co'
let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: null
}

exports.searchAnimeQuery = (req, res) => {
  var query = `
      query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
          media (id: $id, search: $search, type: ANIME) {
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
            synonyms
            averageScore
            meanScore
            popularity
            favourites
          }
        }
      }
      `

  let variables = {
    search: req.body.text,
    page: 1,
    perPage: 100
  }

  options.body = JSON.stringify({ query, variables })

    return { url, options }
}