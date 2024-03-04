<template>
    <q-header elevated>
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" />
            <q-toolbar-title>
                AniHakken
            </q-toolbar-title>
            <q-btn flat dense round icon="settings" aria-label="Settings">
                <q-menu class="menu" max-width="50%">
                    <q-item>
                        <q-item-section class="cursor-pointer">
                            <div>
                                <q-icon name="home" class="menuIcon" />
                                <p>Accueil</p>
                            </div>

                        </q-item-section>
                        <q-item-section class="cursor-pointer">
                            <div>
                                <q-icon name="search" class="menuIcon" />
                                <p>Chercher</p>
                            </div>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section class="cursor-pointer">
                            <div>
                                <q-icon name="contact_support" class="menuIcon" />
                                <p>Contact</p>
                            </div>
                        </q-item-section>
                        <q-item-section class="cursor-pointer">
                            <div>
                                <q-icon name="account_box" class="menuIcon" />
                                <p>Profile</p>
                            </div>
                        </q-item-section>
                    </q-item>
                </q-menu>
            </q-btn>
        </q-toolbar>


    </q-header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AppHeader',


})
</script>
