<template>
	<q-page class="page">
		<section class="filter-section">
			<q-btn no-caps flat class="filter-btn" label="Filtrer">
				<q-menu class="filter-menu">
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
							<q-item-label class="item-label"> Diffusion </q-item-label>
							<q-item-section class="item-section">
								<q-select v-model="airingStatus" label="Diffusion" :options="airingOptions" emit-value map-options @update:model-value="filterAnime">
								</q-select>
							</q-item-section>
						</q-item>

						<q-item class="filter-item">
							<q-item-label class="item-label"> Genre(s) </q-item-label>
							<q-item-section class="item-section">
								<q-select
									v-model="genre"
									label="Genres"
									:options="genreOptions"
									multiple
									emit-value
									map-options
									class="genre-select"
									popup-content-class="genre-list"
									@update:model-value="filterAnime"
								>
								</q-select>
							</q-item-section>
						</q-item>

						<q-item class="filter-item">
							<q-item-label class="item-label"> Saison </q-item-label>
							<q-item-section class="item-section">
								<q-select v-model.number="season" label="Saison" :options="seasonOptions" emit-value map-options @update:model-value="filterAnime"> </q-select>
							</q-item-section>
						</q-item>

						<q-item class="filter-item">
							<q-item-label class="item-label"> Année </q-item-label>
							<q-item-section class="item-section">
								<q-select v-model.number="year" :options="yearOptions" label="Année" @update:model-value="filterAnime"> </q-select>
							</q-item-section>
						</q-item>

						<q-item class="filter-item">
							<q-item-label class="item-label"> Score </q-item-label>
							<q-item-section class="item-section">
								<q-select v-model.number="score" :options="scoreOptions" label="Score" @update:model-value="filterAnime"> </q-select>
							</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</q-btn>
			<q-input rounded standout v-model="text" class="searchbar" label="Titre de l'animé">
				<template v-slot:append>
					<q-icon name="search" @click="searchAnime(text)" class="cursor-pointer"></q-icon>
				</template>
			</q-input>
		</section>

		<!-- TODO: add loading for list retrieval and only display Aucun résultat after loading -->

		<section class="animes-section">
			<div v-if="list.length > 0" class="">
				<div v-if="userSearch" class="list">
					<h1>Résultats de votre recherche</h1>
					<q-virtual-scroll class="list" :items="filterAnime" v-slot="{ item, index }">
						<q-item :key="index" class="list-item">
							<AnimeCard :result="item" />
						</q-item>
					</q-virtual-scroll>
				</div>
				<div v-else class="list">
					<h1>Animés en cours de parution</h1>
					<q-virtual-scroll class="list" :items="filterAnime" v-slot="{ item, index }">
						<q-item :key="index" class="list-item">
							<AnimeCard :result="item" />
						</q-item>
					</q-virtual-scroll>
				</div>
			</div>
			<div v-else class="no-result">
				<h1>Aucun résultat</h1>
			</div>
		</section>
	</q-page>
</template>

<script>
import { defineComponent } from 'vue'
import searchService from '../services/search.service.js'
import AnimeCard from '../components/main/AnimeCard.vue'
import { useGlobalStore } from 'src/stores/globalStore.js'
const globalStore = useGlobalStore()

export default defineComponent({
	name: 'IndexPage',
	components: {
		AnimeCard
	},
	data() {
		return {
			text: null,
			list: [],
			// watchingOptions: ['A regarder', 'En cours', 'Terminé', 'Abandonné'],
			// watchingStatus: null,
			airingOptions: [
				{ label: 'A venir', value: 'NOT_YET_RELEASED' },
				{ label: 'En cours', value: 'RELEASING' },
				{ label: 'Terminé', value: 'FINISHED' }
			],
			airingStatus: null,
			genreOptions: [
				{ label: 'Action', value: 'Action' },
				{ label: 'Aventure', value: 'Adventure' },
				{ label: 'Comédie', value: 'Comedy' },
				{ label: 'Drame', value: 'Drama' },
				{ label: 'Ecchi', value: 'Ecchi' },
				{ label: 'Fantasy', value: 'Fantasy' },
				{ label: 'Horreur', value: 'Horror' },
				{ label: 'Mahou Shoujo', value: 'Mahou Shoujou' },
				{ label: 'Mecha', value: 'Mecha' },
				{ label: 'Musique', value: 'Music' },
				{ label: 'Mystère', value: 'Mystery' },
				{ label: 'Psychologique', value: 'Psychological' },
				{ label: 'Romance', value: 'Romance' },
				{ label: 'Sci-Fi', value: 'Sci-Fi' },
				{ label: 'Tranche de vie', value: 'Slice of Life' },
				{ label: 'Sports', value: 'Sport' },
				{ label: 'Supernaturel', value: 'Supernaturel' },
				{ label: 'Thriller', value: 'Thriller' }
			],
			genre: [],
			season: null,
			seasonOptions: [
				{ label: 'Hiver', value: 'WINTER' },
				{ label: 'Printemps', value: 'SPRING' },
				{ label: 'Été', value: 'SUMMER' },
				{ label: 'Automne', value: 'FALL' }
			],
			year: null,
			score: null,
			filters: [],
			userSearch: false
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
			const list = this.list
				.filter((anime) => {
					return (
						(!this.airingStatus || anime.status === this.airingStatus) &&
						(!this.season || anime.season === this.season) &&
						(!this.genre.length || this.genre.every((genre) => anime.genres.includes(genre))) &&
						(!this.year || anime.seasonYear === this.year) &&
						(!this.score || anime.averageScore >= this.score) &&
						!anime.genres.includes('Hentai') &&
						(!this.text || anime.title.romaji.toLowerCase().includes(this.text.toLowerCase()))
					)
				})
				.sort((a, b) => a.title.romaji.localeCompare(b.title.romaji))
			return list
		}
	},
	methods: {
		async searchAnime(text) {
			let response = await searchService.searchAnime(text)

			if (response.status === 200) {
				this.list = response.data.media
				this.userSearch = true
				this.airingStatus = null
			}
		},

		async getAiringAnimes() {
			let response = await searchService.getAiringAnimes()

			if (response.status === 200) {
				this.list = response.data.media
				this.airingStatus = 'RELEASING'
			}
		}
	},
	created() {
		this.getAiringAnimes()
	}
})
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.list,
.no-result {
	max-height: 60vh;
	width: 100%;
	padding: 1em;
}

:deep(.q-virtual-scroll__content) {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	overflow-y: auto;
	row-gap: 1em;
	column-gap: 1em;
}

.animes-section {
	max-width: 100%;
}

.list-item {
	width: 47%;
	max-width: 47%;
	padding: 0;
	display: flex;
	justify-content: center;
}

.filter-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.item-section {
	flex: 1;
	max-width: 70%;
}

.no-result {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.filter-section {
	display: flex;
	justify-content: space-between;
	margin-top: 1em;
	align-items: center;
	width: 95%;
	column-gap: 1em;
}

.filter-btn {
	background-color: $bgDarkest;
	color: white;
}

:deep(.q-menu .filter-menu) {
	margin-top: 1em;
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
}

@media only screen and (min-width: 1024px) and (max-width: 1200px) {
}

@media only screen and (min-width: 1201px) {

	.list-item {
	width: 10%;
	max-width: 10%;
}

:deep(.q-virtual-scroll__content) {
	justify-content: flex-start;
}
}
</style>
