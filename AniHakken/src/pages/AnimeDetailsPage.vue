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
			image: null
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
</style>
