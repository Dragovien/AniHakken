<template>
    <q-input v-model="search" rounded outlined class="searchInput" label="Rechercher votre animé">
        <template v-slot:prepend>
            <q-btn flat dense round icon="expand_circle_down" aria-label="Settings">
                <q-menu class="menu menu__bigger" max-width="100%">
                    <q-item>
                        <q-item-section class="cursor-pointer filterWrapper">
                            <q-item-label class="filterLabel">Visionnage</q-item-label>
                            <FilterSelect :options="watch" />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="cursor-pointer filterWrapper">
                            <q-item-label class="filterLabel">Diffusion</q-item-label>
                            <FilterSelect :options="status" />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="cursor-pointer filterWrapper">
                            <q-item-label class="filterLabel">Genres</q-item-label>
                            <FilterSelect :options="genres" />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="cursor-pointer filterWrapper">
                            <q-item-label class="filterLabel">Saison</q-item-label>
                            <FilterSelect :options="season" />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="cursor-pointer filterWrapper">
                            <q-item-label class="filterLabel">Année</q-item-label>
                            <FilterSelect :useInput="true" :options="year" />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="cursor-pointer filterWrapper">
                            <q-item-label class="filterLabel">Score</q-item-label>
                            <FilterSelect :useInput="true" :options="score" />
                        </q-item-section>
                    </q-item>
                </q-menu>
            </q-btn>
        </template>
        <template v-slot:append>
            <q-btn flat dense round icon="search" aria-label="Search" />
        </template>
    </q-input>
</template>

<script>
import { defineComponent } from 'vue'
import FilterSelect from './FilterSelect.vue';

export default defineComponent({
    name: 'SearchBar',
    components: {
        FilterSelect
    },
    data() {
        return {
            search: null,
            watch: ['Plannifié', 'En cours', 'En pause', 'Terminé'],
            status: ['Terminée', 'En cours', 'Annoncée', 'Annulée'],
            genres: [],
            season: ['Printemps', 'Été', 'Automne', 'Hivers'],
            score: []
        }
    },
    computed: {
        year() {
            let array = []
            const startYear = 1950;
            const endYear = new Date().getFullYear() + 1

            for (let year = startYear; year <= endYear; year++) {
                array.push(year);
            }

            console.log(array)
            return array
        }
    }
})
</script>