const { Op } = require("sequelize")

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    // console.log(data);
}

function handleError(error) {
    console.error(error);
}

exports.getAll = async (req, res) => {
  try {
  } catch (error) {
    console.log(error)
  }
}

exports.searchAnime = async (req, res) => {
  try {

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
      `;

    var variables = {
      search: req.body.text,
      page: 1,
      perPage: 100
    };

    var url = 'https://graphql.anilist.co',
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      };

      let results = await fetch(url, options).then(handleResponse)
      .catch(handleError);

      return res.status(200).send(results.data.Page)

  } catch (error) {
    console.log(error)
  }
}