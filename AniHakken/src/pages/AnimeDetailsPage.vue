<template>
  <q-page class="page">
  <section class="return-section">
    <q-btn no-caps icon="chevron_left" label="Retour à la liste d'animés" @click="$router.push({name: 'IndexPage'})"></q-btn>
  </section>
    

    <section class="image-section">
      <img
        :src="image"
        :alt="selectedAnime?.title?.romaji || 'Anime Image'"
        class="anime-image"
      />
      <h1 class="anime-title">{{ selectedAnime?.title?.romaji }}</h1>
    </section>

    <section class="details-section">
      <div class="button-section">
        <q-btn no-caps flat label="Ajouter à ma liste" class="generic-button" />
        <q-icon name="favorite" class="favorite-icon"></q-icon>
      </div>

      <q-tabs
        v-model="tab"
        dense
        class="details-tabs"
        active-color="bgRed"
        indicator-color="bgRed"
        align="justify"
        narrow-indicator
      >
        <q-tab name="synopsis" label="Synopsis" />
        <q-tab name="infos" label="Informations" />
        <q-tab name="stats" label="Statistiques" />
      </q-tabs>

      <q-tab-panels v-model="tab" class="details-tab-panels" animated>
        <q-tab-panel name="synopsis" class="details-tab-panel">
          <div class="tab-insert">
            <h2 class="tab-insert-title">Synopsis</h2>
            <p v-if="selectedAnime.description">
              {{ formattedDescription(selectedAnime.description) }}
            </p>
            <p v-else class="no-synopsis">Aucun synopsis trouvé</p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="infos" class="details-tab-panel">
          <div class="tab-insert">
            <h2 class="tab-insert-title">Informations</h2>
            <div class="title-infos">
              <p v-if="selectedAnime.title.english?.length > 0">
                <span class="category-info">Anglais:</span>
                {{ selectedAnime.title.english }}
              </p>
              <p v-if="selectedAnime.title.native?.length > 0">
                <span class="category-info">Native:</span>
                {{ selectedAnime.title.native }}
              </p>
            </div>

            <div class="airing-infos">
              <p>
                <span class="category-info">Format:</span>
                {{ selectedAnime.format }}
              </p>
              <p>
                <span class="category-info">Status:</span>
                {{ formattedStatus(selectedAnime.status) }}
              </p>
              <p>
                <span class="category-info">Dates de diffusion:</span>
                {{
                  formattedAiringDates(
                    selectedAnime.startDate,
                    selectedAnime.endDate
                  )
                }}
              </p>
              <p>
                <span class="category-info">Saison:</span>
                {{ formattedSeason(selectedAnime.season) }}
              </p>
              <p>
                <span class="category-info">Année de la saison:</span>
                {{ selectedAnime.seasonYear }}
              </p>
              <p>
                <span class="category-info">Nombre d'épisodes:</span>
                {{ selectedAnime.episodes }}
              </p>
              <p>
                <span class="category-info">Durée:</span>
                {{ selectedAnime.duration }} minutes
              </p>
            </div>

            <div class="misc-infos">
              <p>
                <span class="category-info">Pays d'origine:</span>
                {{ selectedAnime.countryOfOrigin }}
              </p>
              <p>
                <span class="category-info">Média source:</span>
                {{ selectedAnime.source }}
              </p>
              <div v-if="selectedAnime.trailer">
                <span class="category-info">Trailer:</span>
								<!-- todo: voir gestion erreur avec adblocker -->
                <q-video
                  :src="`https://www.youtube.com/embed/${selectedAnime.trailer.id}?rel=0`"
                  loading="easy"
                  title="Anime trailer"
                  frameborder="0"
                  allowfullscreen
                />
              </div>
              <p v-if="selectedAnime.genres.length > 0">
                <span class="category-info">Genres:</span>
                {{ selectedAnime.genres.join(", ") }}
              </p>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="stats" class="details-tab-panel">
          <div class="tab-insert">
            <h2 class="tab-insert-title">Statistiques</h2>
            <p>
              <span class="category-info">Note moyenne:</span>
              {{ selectedAnime.averageScore ? `${selectedAnime.averageScore} %` : 'Aucune note moyenne' }} 
            </p>
            <p>
              <span class="category-info">Popularité:</span>
              {{ selectedAnime.popularity }}
            </p>
            <p>
              <span class="category-info">Favoris:</span>
              {{ selectedAnime.favourites }}
            </p>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </section>

    <CommentSection/>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CommentSection from "../components/main/CommentSection.vue";

export default defineComponent({
  name: "AnimeDetailsPage",
	components: {
		CommentSection,
	},
  data() {
    return {
      selectedAnime: null,
      image: null,
      tab: "synopsis",
    };
  },
  methods: {
    formattedDescription(description) {
      // Replace <br> tags with newline characters
      return description
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<(\/)?[ib]>/gi, "");
    },

    formattedStatus(status) {
      switch (status) {
        case "FINISHED":
          return "Terminé";
        case "RELEASING":
          return "En cours";
        case "NOT_YET_RELEASED":
          return "Pas encore sorti";
        case "CANCELLED":
          return "Annulé";
        default:
          return "Inconnu";
      }
    },
    formattedSeason(season) {
      switch (season) {
        case "WINTER":
          return "Hiver";
        case "SPRING":
          return "Printemps";
        case "SUMMER":
          return "Été";
        case "FALL":
          return "Automne";
        default:
          return "Inconnu";
      }
    },
    formattedAiringDates(startDate, endDate) {
      if (endDate.year && endDate.month && endDate.day) {
        return `${startDate.day}/${startDate.month}/${startDate.year} - ${endDate.day}/${endDate.month}/${endDate.year}`;
      } else {
        return `${startDate.day}/${startDate.month}/${startDate.year} - ?`;
      }
    },
  },
  created() {
    this.selectedAnime = this.$store.selectedAnime;
    if (
      this.selectedAnime &&
      this.selectedAnime.coverImage &&
      this.selectedAnime.coverImage.extraLarge
    ) {
      this.image = this.selectedAnime.coverImage.extraLarge;
    }

  },
});
</script>

<style lang="scss" scoped>

  .return-section,
  .image-section,
  .details-section,
  .comment-section {
    width: 100%;
    padding: 1em;
  }

.image-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-height: 20vh;

  .anime-image {
    max-width: 50%;
    max-height: 20vh;
  }

  .anime-title {
		flex: 1;
    font-size: 1.5em;
  }
}

.return-section {
  display: flex;
  justify-content: flex-start;
}

.button-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 1em;

  .favorite-icon {
    font-size: 2em;
    color: $bgRed;
  }
}

.details-tabs,
.details-tab-panels {
  margin-top: 1em;
}

.details-tab-panels {
  background-color: transparent;
}

.details-tab-panel {
  padding: 0;
}

.tab-insert {
  background-color: $bgLightRed;
  height: 40vh;
  padding: 1em;
  overflow-y: auto;
  white-space: pre-line;
}

.tab-insert-title {
  margin-bottom: 1em;
}

.no-synopsis {
  text-align: center;
}

.title-infos,
.airing-infos {
  margin-bottom: 1em;
}

.category-info {
  font-weight: bold;
}
</style>
