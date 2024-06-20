<template>
  <q-page class="page">
    <section class="filter-section">
      <q-btn no-caps flat class="filter-btn" label="Filtrer">
        <q-menu ref="menu" class="filter-menu">
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
                <q-select
                  v-model="airingStatus"
                  label="Diffusion"
                  :options="airingOptions"
                  emit-value
                  map-options
                  @update:model-value="filterAnime"
                >
                </q-select>
              </q-item-section>
            </q-item>

            <q-item class="filter-item">
              <q-item-label class="item-label"> Genre(s) </q-item-label>
              <q-item-section class="item-section">
                <q-select
                  v-model="genre"
                  label="Genres"
                  :options="filteredGenreOptions"
                  use-input
                  multiple
                  emit-value
                  map-options
                  class="genre-select"
                  popup-content-class="genre-list"
                  @update:model-value="filterAnime"
                  @filter="(val, update, abort) => filterFn(val, update, abort, 'genres')"
                >
                </q-select>
              </q-item-section>
            </q-item>

            <q-item class="filter-item">
              <q-item-label class="item-label"> Saison </q-item-label>
              <q-item-section class="item-section">
                <q-select
                  v-model.number="season"
                  label="Saison"
                  :options="seasonOptions"
                  emit-value
                  map-options
                  @update:model-value="filterAnime"
                >
                </q-select>
              </q-item-section>
            </q-item>

            <q-item class="filter-item">
              <q-item-label class="item-label"> Année </q-item-label>
              <q-item-section class="item-section">
                <q-select
                  v-model.number="year"
                  :options="filteredYearOptions"
                  label="Année"
                  @update:model-value="filterAnime"
                  use-input
                  @filter="(val, update, abort) => filterFn(val, update, abort, 'year')"
                >
                </q-select>
              </q-item-section>
            </q-item>

            <q-item class="filter-item">
              <q-item-label class="item-label"> Score </q-item-label>
              <q-item-section class="item-section">
                <q-select
                  v-model.number="score"
                  :options="filteredScoreOptions"
                  label="Score"
                  @update:model-value="filterAnime"
                  use-input
                  @filter="(val, update, abort) => filterFn(val, update, abort, 'score')"
                >
                </q-select>
              </q-item-section>
            </q-item>
          </q-list>

          <!-- TODO: gérer autrement le filtering (uniquement au clic bouton) -->

          <div class="filter-btn-wrapper">
            <q-btn
              class="filter-btn"
              label="Réinitialiser"
              @click="reinitializeFilters"
            />
            <q-btn class="filter-btn" label="Filtrer" @click="applyFilters" />
          </div>
        </q-menu>
      </q-btn>
      <q-input
        rounded
        standout
        v-model="text"
        class="searchbar"
        label="Titre de l'animé"
      >
        <template v-slot:append>
          <q-icon
            name="search"
            @click="searchAnime(text, pageNumber, perPage)"
            class="cursor-pointer"
          ></q-icon>
        </template>
      </q-input>
    </section>

    <section
      class="animes-section"
      :class="list.length === 0 ? 'animes-section--loading' : ''"
    >
      <div v-if="list.length > 0" class="">
        <div v-if="userSearch" class="userSearch">
          <h1>Résultats de votre recherche</h1>
          <q-virtual-scroll
            class="list list--margin-top"
            :items="filtering ? filterAnime : list"
            v-slot="{ item, index }"
          >
            <q-item :key="index" class="list-item">
              <AnimeCard :result="item" />
            </q-item>
          </q-virtual-scroll>
        </div>
        <div v-else class="airingAnimes">
          <h1>Animés en cours de parution</h1>
          <q-virtual-scroll
            class="list list--margin-top"
            :items="filtering ? filterAnime : list"
            v-slot="{ item, index }"
          >
            <q-item :key="index" class="list-item">
              <AnimeCard :result="item" />
            </q-item>
          </q-virtual-scroll>
        </div>
      </div>
      <div v-else class="no-result">
        <q-spinner color="primary" size="3em" :thickness="10" v-if="loading" />
        <h1 v-else class="no-result-text">Aucun résultat</h1>
      </div>
    </section>

    <section class="pagination-section" v-if="!loading">
      <q-btn @click="changePage('previous')" v-if="previousPageInStore">
        <q-icon name="chevron_left"></q-icon>
      </q-btn>

      <p v-if="currentPageInStore?.pageInfo?.currentPage">
        Résultats
        {{ 1 + perPage * (currentPageInStore.pageInfo.currentPage - 1) }} -
        {{
          currentPageInStore.pageInfo.hasNextPage
            ? perPage * currentPageInStore.pageInfo.currentPage
            : currentPageInStore.pageInfo.total
        }}
      </p>

      <q-btn
        @click="changePage('next')"
        v-if="currentPageInStore?.pageInfo?.hasNextPage"
      >
        <q-icon name="chevron_right"></q-icon>
      </q-btn>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import searchService from "../services/search.service.js";
import AnimeCard from "../components/main/AnimeCard.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    AnimeCard,
  },
  data() {
    return {
      text: null,
      list: [],
      // watchingOptions: ['A regarder', 'En cours', 'Terminé', 'Abandonné'],
      // watchingStatus: null,
      airingOptions: [
        { label: "A venir", value: "NOT_YET_RELEASED" },
        { label: "En cours", value: "RELEASING" },
        { label: "Terminé", value: "FINISHED" },
      ],
      airingStatus: null,
      genreOptions: [
        { label: "Action", value: "Action" },
        { label: "Aventure", value: "Adventure" },
        { label: "Comédie", value: "Comedy" },
        { label: "Drame", value: "Drama" },
        { label: "Ecchi", value: "Ecchi" },
        { label: "Fantasy", value: "Fantasy" },
        { label: "Horreur", value: "Horror" },
        { label: "Mahou Shoujo", value: "Mahou Shoujou" },
        { label: "Mecha", value: "Mecha" },
        { label: "Musique", value: "Music" },
        { label: "Mystère", value: "Mystery" },
        { label: "Psychologique", value: "Psychological" },
        { label: "Romance", value: "Romance" },
        { label: "Sci-Fi", value: "Sci-Fi" },
        { label: "Tranche de vie", value: "Slice of Life" },
        { label: "Sports", value: "Sport" },
        { label: "Supernaturel", value: "Supernaturel" },
        { label: "Thriller", value: "Thriller" },
      ],
      filteredGenreOptions: [],
      filteredYearOptions: [],
      filteredScoreOptions: [],
      genre: [],
      season: null,
      seasonOptions: [
        { label: "Hiver", value: "WINTER" },
        { label: "Printemps", value: "SPRING" },
        { label: "Été", value: "SUMMER" },
        { label: "Automne", value: "FALL" },
      ],
      year: null,
      score: null,
      userSearch: false,
      filtering: false,
      loading: false,
      pageInfo: null,
      pageNumber: 1,
      perPage: 50,
      lastPage: 0,
      previousSearch: null,
      previousPageNumber: null,
    };
  },
  computed: {
    yearOptions() {
      const startYear = 1940;
      const currentYear = new Date().getFullYear();
      const years = Array.from(
        { length: currentYear - startYear + 2 },
        (_, index) => startYear + index
      );

      return years;
    },

    scoreOptions() {
      const startScore = 0;
      const endScore = 100;
      const score = Array.from(
        { length: endScore + 1 },
        (_, index) => startScore + index
      );

      return score;
    },

    filterAnime() {
      if(this.filtering) {
        const list = this.list
        .filter((anime) => {
          return (
            (!this.airingStatus || anime.status === this.airingStatus) &&
            (!this.season || anime.season === this.season) &&
            (!this.genre.length ||
              this.genre.every((genre) => anime.genres.includes(genre))) &&
            (!this.year || anime.seasonYear === this.year) &&
            (!this.score || anime.averageScore >= this.score) &&
            (!this.text ||
              anime.title.romaji
                .toLowerCase()
                .includes(this.text.toLowerCase()))
          );
        })
        .sort((a, b) => a.title.romaji.localeCompare(b.title.romaji));
      return list;
      } else {
        return this.list;
      }
    },

    currentPageInStore() {
      return this.$store.pages[this.pageNumber - 1];
    },
    previousPageInStore() {
      return this.$store.pages[this.pageNumber - 2];
    },
  },
  methods: {
    async searchAnime(text, pageNumber, perPage) {
      this.loading = true;

      // case: user search is different from previous search
      if (text !== this.previousSearch) {
        this.$store.pages = [];
        this.previousSearch = text;
        this.previousPageNumber = pageNumber;
      }
      // case: user search is the same as previous search and page number is same as previous page number
      else if (pageNumber === this.previousPageNumber) {
        this.loading = false;
        return;
      }

      let response = await searchService.searchAnime(text, pageNumber, perPage);

      if (response.status === 200) {
        this.pageInfo = response.data.pageInfo;
        this.list = response.data.media;
        this.$store.pages.push({
          pageInfo: {
            currentPage: response.data.pageInfo.currentPage,
            hasNextPage: response.data.pageInfo.hasNextPage,
            total: !response.data.pageInfo.hasNextPage
              ? response.data.pageInfo.total
              : null,
          },
          media: response.data.media,
        });
        this.userSearch = true;
        this.airingStatus = null;
        this.loading = false;
      }
    },

    async getAiringAnimes(pageNumber, perPage) {
      this.loading = true;
      let response = await searchService.getAiringAnimes(pageNumber, perPage);

      if (response.status === 200) {
        this.list = response.data.media;
        if (
          this.$store.pages.length === 0 ||
          pageNumber > this.$store.pages.length
        )
          this.$store.pages.push({
            pageInfo: {
              currentPage: response.data.pageInfo.currentPage,
              hasNextPage: response.data.pageInfo.hasNextPage,
              total: !response.data.pageInfo.hasNextPage
                ? response.data.pageInfo.total
                : null,
            },
            media: response.data.media,
          });
        console.log(this.$store.pages);
        this.pageInfo = response.data.pageInfo;
        this.airingStatus = "RELEASING";
        this.loading = false;
      }
    },

    applyFilters() {
      this.filtering = true;
      this.$refs.menu.hide();
    },

    reinitializeFilters() {
      this.airingStatus = null;
      this.genre = [];
      this.season = null;
      this.year = null;
      this.score = null;
      this.text = null;
      this.userSearch = false;
      this.filtering = false;
    },

    changePage(position) {
      if (position === "next") {
        if (
          this.currentPageInStore &&
          this.currentPageInStore.pageInfo.hasNextPage
        ) {
          this.pageNumber++;
        }
      } else {
        if (this.previousPageInStore) this.pageNumber--;
      }

      this.list = [];
      let savedPage = this.$store.pages.find(
        (page) => page.pageInfo.currentPage === this.pageNumber
      );

      if (savedPage) {
        this.list = savedPage.media;
      } else {
        if (this.userSearch) {
          this.searchAnime(this.text, this.pageNumber, this.perPage);
        } else {
          this.getAiringAnimes(this.pageNumber, this.perPage);
        }
      }
    },

    // voir si passage en utils
    filterFn(val, update, abort, type) {
      update(() => {
        const needle = val.toLowerCase()
        switch(type) {
          case 'genres':
            this.filteredGenreOptions = this.genreOptions.filter((v) => {
              return (
                v.label.toLowerCase().indexOf(needle) > -1
              );
            });
            break;
          case 'year':
            this.filteredYearOptions = this.yearOptions.filter((v) => {
              return (
                v.toString().indexOf(needle) > -1
              );
            });
            break;
          case 'score':
            this.filteredScoreOptions = this.scoreOptions.filter((v) => {
              return (
                v.toString().indexOf(needle) > -1
              );
            });
            break;
        }
        
      })
    },
  },
  created() {
    this.$store.pages = [];
    this.getAiringAnimes(this.pageNumber, this.perPage);
    this.filteredGenreOptions = this.genreOptions;
    this.filteredYearOptions = this.yearOptions;
    this.filteredScoreOptions = this.scoreOptions;
  },
});
</script>

<style lang="scss" scoped>
.list,
.no-result {
  max-height: 68vh;
  width: 100%;
  padding: 1em;
}

.list--margin-top {
  margin-top: 1em;
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
  flex: 1;
}

.animes-section--loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.filter-btn-wrapper {
  display: flex;
  justify-content: center;
  column-gap: 1em;
  width: 100%;
  margin: 1em;
}

.pagination-section {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1em;
  margin-bottom: 1em;
}

.airingAnimes,
.userSearch {
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
