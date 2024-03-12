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

  async getAiringAnimes() {
    const response = await api.get('animes/airingAnimes')
    return response
  }

  async searchAnime(text) {
    const response = await api.post('animes/search/results', {
        text
    })
    return response
  }

  
}

export default new SearchService()
