import { api } from 'src/boot/axios'

class SearchService {
  async getAll(text = null) {
    const response = await api.get('animes', {
      params: {
        text : text
      },
    })
    return response
  }

  async getAiringAnimes(pageNumber, perPage) {
    const response = await api.post('animes/airingAnimes', {
      pageNumber,
      perPage
    })
    return response
  }

  async searchAnime(text, pageNumber, perPage) {
    const response = await api.post('animes/search/results', {
      text,
      pageNumber,
      perPage
    })
    return response
  }

  
}

export default new SearchService()
