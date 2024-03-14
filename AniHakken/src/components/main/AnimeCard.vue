<template>
	<q-card class="anime-card" @click="goToAnimeDetails(result)">
		<img :src="result.coverImage.extraLarge" alt="Anime cover image" class="cover-image" />
		<q-card-section class="title-section">
			{{ result.title.romaji }}
		</q-card-section>
	</q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useGlobalStore } from 'src/stores/globalStore.js';
const globalStore = useGlobalStore()

export default defineComponent({
	data() {
		return {}
	},
	props: {
		result: {
			type: Object,
			required: true
		}
	},
	methods: {
		goToAnimeDetails(anime) {
			globalStore.selectedAnime = anime
			this.$router.push({ name: 'AnimeShow', params: { id: anime.id} });
		}
	},
	created() {
	}
})
</script>

<style lang="scss" scoped>
.anime-card {
	height: 25vh;
	border-radius: $mediumBorderRadius;
	width: 100%;
	cursor: pointer;
}

.cover-image {
	width: 100%;
	height: 80%;
}

.title-section {
	height: 20%;
	background-color: $titleBg;
	color: $titleColor;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
