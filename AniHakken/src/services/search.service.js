import { api } from 'src/boot/axios'

class SearchService {
  async getAll(text = null) {
    const response = await api.post('/search', {
      params: {
        text : text
      },
    })
    return response
  }

  async searchAnime(text) {
    const response = await api.post('/search/results', {
        text
    })
    return response
  }
}

export default new SearchService()
