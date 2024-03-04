<template>
  <q-page class="page">
    <q-input rounded standout v-model="text" class="searchbar" label="Titre de l'animé">
      <template v-slot:prepend>
        <q-btn flat round icon="expand_more" class="cursor-pointer">
          <q-menu class="filter-menu" :offset="[60, 20]">
            <q-list>
              <!-- <q-item class="filter-item">
                <q-item-label class="item-label">
                  Visionnage
                </q-item-label>
                <q-item-section class="item-section">
                  <q-select 
                  v-model="watchingStatus"
                  label="Visionnage"
                  :options="watchingOptions">

                  </q-select>
                </q-item-section>
              </q-item> -->

              <q-item class="filter-item">
                <q-item-label class="item-label">
                  Diffusion
                </q-item-label>
                <q-item-section class="item-section">
                  <q-select v-model="airingStatus" label="Diffusion" :options="airingOptions" emit-value map-options
                    @update:model-value="filterAnime">
                  </q-select>
                </q-item-section>
              </q-item>

              <q-item class="filter-item">
                <q-item-label class="item-label">
                  Genre(s)
                </q-item-label>
                <q-item-section class="item-section">
                  <q-select v-model="genre" label="Genres" :options="genreOptions" multiple emit-value map-options
                    class="genre-select" popup-content-class="genre-list" @update:model-value="filterAnime">
                  </q-select>
                </q-item-section>
              </q-item>

              <q-item class="filter-item">
                <q-item-label class="item-label">
                  Saison
                </q-item-label>
                <q-item-section class="item-section">
                  <q-select v-model.number="season" label="Saison" :options="seasonOptions" emit-value map-options
                    @update:model-value="filterAnime">
                  </q-select>
                </q-item-section>
              </q-item>

              <q-item class="filter-item">
                <q-item-label class="item-label">
                  Année
                </q-item-label>
                <q-item-section class="item-section">
                  <q-select v-model.number="year" :options="yearOptions" label="Année" @update:model-value="filterAnime">
                  </q-select>
                </q-item-section>
              </q-item>

              <q-item class="filter-item">
                <q-item-label class="item-label">
                  Score
                </q-item-label>
                <q-item-section class="item-section">
                  <q-select v-model.number="score" :options="scoreOptions" label="Score"
                    @update:model-value="filterAnime">
                  </q-select>
                </q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-btn>
      </template>

      <template v-slot:append>
        <q-icon name="search" @click="searchAnime(text)" class="cursor-pointer"></q-icon>
      </template>
    </q-input>

    <div v-if="list.length > 0" class="list">
      <q-card v-for="result in filterAnime" :key="result.id" class="anime-card">
        <img :src="result.coverImage.extraLarge" alt="Anime cover image" class="cover-image" />
        <q-card-section class="title-section">
          {{ result.title.romaji }}
        </q-card-section>
      </q-card>
    </div>
    <div v-else class="no-result">
      <p>Aucun résultat</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import searchService from '../services/search.service.js'

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      text: null,
      list: [],
      // watchingOptions: ['A regarder', 'En cours', 'Terminé', 'Abandonné'],
      // watchingStatus: null,
      airingOptions: [{ label: 'A venir', value: 'NOT_YET_RELEASED' }, { label: 'En cours', value: 'RELEASING' }, { label: 'Terminé', value: 'FINISHED' }],
      airingStatus: null,
      genreOptions: [{ label: 'Action', value: 'Action' }, { label: 'Aventure', value: 'Adventure' }, { label: 'Comédie', value: 'Comedy' }, { label: 'Drame', value: 'Drama' }, { label: 'Ecchi', value: 'Ecchi' }, { label: 'Fantasy', value: 'Fantasy' }, { label: 'Horreur', value: 'Horror' }, { label: 'Mahou Shoujo', value: 'Mahou Shoujou' }, { label: 'Mecha', value: 'Mecha' }, { label: 'Musique', value: 'Music' }, { label: 'Mystère', value: 'Mystery' }, { label: 'Psychologique', value: 'Psychological' }, { label: 'Romance', value: 'Romance' }, { label: 'Sci-Fi', value: 'Sci-Fi' }, { label: 'Tranche de vie', value: 'Slice of Life' }, { label: 'Sports', value: 'Sport' }, { label: 'Supernaturel', value: 'Supernaturel' }, { label: 'Thriller', value: 'Thriller' }],
      genre: [],
      season: null,
      seasonOptions: [{ label: 'Hiver', value: 'WINTER' }, { label: 'Printemps', value: 'SPRING' }, { label: 'Été', value: 'SUMMER' }, { label: 'Automne', value: 'FALL' }],
      year: null,
      score: null,
      filters: []
    }
  },
  computed: {
    yearOptions() {
      const startYear = 1940
      const currentYear = new Date().getFullYear()
      const years = Array.from({ length: currentYear - startYear + 2 }, (_, index) => startYear + index)

      return years
    },

    scoreOptions() {
      const startScore = 0
      const endScore = 100
      const score = Array.from({ length: endScore + 1 }, (_, index) => startScore + index)

      return score
    },

    filterAnime() {
      if (this.list.length > 0) {
        const list = this.list.filter(anime => {
          return (!this.airingStatus || anime.status === this.airingStatus)
            && (!this.season || anime.season === this.season)
            && (!this.genre.length || this.genre.every(genre => anime.genres.includes(genre)))
            && (!this.year || anime.seasonYear === this.year)
            && (!this.score || anime.averageScore >= this.score)
            && (!anime.genres.includes('Hentai')
            && (anime.title.romaji.toLowerCase().includes(this.text.toLowerCase()))
            )
        }).sort((a,b) => a.title.romaji.localeCompare(b.title.romaji))
        console.log(list)
        return list;
      }
      return this.list
    },
  },
  methods: {
    async searchAnime(text) {
      let response = await searchService.searchAnime(text)

      if (response.status === 200) {
        this.list = response.data.media
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchbar {
  margin-top: 2rem;
}

.list {
  display: flex;
  width: 95%;
  height: 60vh;
  overflow-y: auto;
  row-gap: 1rem;
  column-gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  flex-wrap: wrap;
}

.anime-card {
  width: 47%;
}

.item-label {}

.filter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-section {
  flex: 1;
  max-width: 70%;
}

.cover-image {
  max-width: 100%;
}

.title-section {
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
}

.no-result {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
