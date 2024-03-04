<template>
    <q-select class="filterSelect" item-aligned multiple v-model="option" :options="filteredOptions"
        :use-input="useInput ? true : false" input-debounce="0" clearable fill-input @filter="filterFnAutoselect"
        @filter-abort="abortFilterFn">
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="filterOptionText">
                    Pas de résultats
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'FilterSelect',
    data() {
        return {
            option: []
        }
    },
    props: ['options', 'useInput'],
    computed: {
        filteredOptions() {
            return this.options
        }
    },
    methods: {
        filterFnAutoselect(val, update, abort) {
            // call abort() at any time if you can't retrieve data somehow

            setTimeout(() => {
                update(
                    () => {
                        if (val === '') {
                            this.options.value = this.filteredOptions
                        }
                        else {
                            const needle = val.toLowerCase()
                            this.options.value = this.filteredOptions.filter(v => {
                                console.log(v)
                                return v.indexOf(needle) > -1
                            })
                        }
                    },

                    // "ref" is the Vue reference to the QSelect
                    ref => {
                        if (val !== '' && ref.options.length > 0 && ref.getOptionIndex() === -1) {
                            ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
                            ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
                        }
                    }
                )
            }, 300)
        },

        abortFilterFn() {
            // console.log('delayed filter aborted')
        }
    },
    mounted() {
        console.log(this.options)
    }
})
</script>