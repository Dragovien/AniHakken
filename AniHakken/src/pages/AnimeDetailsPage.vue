<template>
	<q-page class="page">
		<section class="image-section">
			<img :src="image" :alt="selectedAnime?.title?.romaji || 'Anime Image'" class="anime-image" />
		</section>

		<section class="details-section">
			<h1 class="anime-title">{{ selectedAnime?.title?.romaji }}</h1>
			<div class="button-section">
				<q-btn no-caps flat label="Ajouter à ma liste" class="generic-button" />
				<q-icon name="favorite" class="favorite-icon"></q-icon>
			</div>

			<q-tabs v-model="tab" dense class="details-tabs" active-color="bgRed" indicator-color="bgRed" align="justify" narrow-indicator>
				<q-tab name="synopsis" label="Synopsis" />
				<q-tab name="infos" label="Informations" />
				<q-tab name="stats" label="Statistiques" />
			</q-tabs>

			<q-tab-panels v-model="tab" class="details-tab-panels" animated>
				<q-tab-panel name="synopsis" class="details-tab-panel">
					<div class="tab-insert">
						<h2 class="tab-insert-title">Synopsis</h2>
						<p>{{ formatDescription(selectedAnime.description) }}</p>
					</div>
				</q-tab-panel>

				<q-tab-panel name="infos" class="details-tab-panel">
					<div class="tab-insert">
						<h2 class="tab-insert-title">Informations</h2>
					</div>
				</q-tab-panel>

				<q-tab-panel name="stats" class="details-tab-panel">
					<div class="tab-insert">
						<h2 class="tab-insert-title">Statistiques</h2>
					</div>
				</q-tab-panel>
			</q-tab-panels>
		</section>
		{{ selectedAnime }}
	</q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AnimeDetailsPage',
	data() {
		return {
			selectedAnime: null,
			image: null,
			tab: 'synopsis'
		}
	},
	methods: {
		formatDescription(description) {
			// Replace <br> tags with newline characters
			return description.replace(/<br\s*\/?>/gi, '\n').replace(/<(\/)?[ib]>/gi, '')
		}
	},
	created() {
		this.selectedAnime = this.$store.selectedAnime
		if (this.selectedAnime && this.selectedAnime.coverImage && this.selectedAnime.coverImage.extraLarge) {
			this.image = this.selectedAnime.coverImage.extraLarge
		}
	}
})
</script>

<style lang="scss" scoped>
.anime-image {
	max-width: 100%;
	// max-height: 20vh;
}

.details-section {
	margin: 1rem;

	.anime-title {
		margin-bottom: 1rem;
	}
}

.button-section {
	display: flex;
	justify-content: end;
	align-items: center;
	column-gap: 1rem;

	.favorite-icon {
		font-size: 2rem;
		color: $bgRed;
	}
}

.details-tabs,
.details-tab-panels {
	margin-top: 1rem;
}

.details-tab-panels {
	background-color: transparent;
}

.details-tab-panel {
}

.tab-insert {
	background-color: $bgLightRed;
	height: 40vh;
	padding: 1rem;
	overflow-y: auto;
	white-space: pre-line;
}

.tab-insert-title {
	margin-bottom: 1rem;
}
</style>
