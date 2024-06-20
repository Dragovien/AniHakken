<template>
	<q-header elevated>
		<q-toolbar>
			<q-toolbar-title class="app-title"> AniHakken </q-toolbar-title>
			<q-btn flat dense round icon="menu" aria-label="Settings">
				<q-menu class="header-menu" max-width="50%">
					<q-item>
						<q-item-section class="cursor-pointer" @click="$router.push({name:'LoginPage'})">
							<div>
								<q-icon name="login" class="menu-icon" />
								<p>Se connecter</p>
							</div>
						</q-item-section>
						<q-item-section class="cursor-pointer">
							<div>
								<q-icon name="app_registration" class="menu-icon" />
								<p>S'inscrire</p>
							</div>
						</q-item-section>
						<q-item-section class="cursor-pointer" @click="$router.push({name:'ThreeJSPage'})">
							<div>
								<q-icon name="three" class="menu-icon" />
								<q-icon name="cruelty_free" class="menu-icon" />
								<p>Three JS</p>
							</div>
						</q-item-section>
					</q-item>

					<!-- TODO: rajouter redirect et display icone si logged ou pas -->

					<q-item>
						<q-item-section class="cursor-pointer" @click="$router.push('/')">
							<div>
								<q-icon name="home" class="menu-icon" />
								<p>Accueil</p>
							</div>
						</q-item-section>
						<!-- <q-item-section class="cursor-pointer">
							<div>
								<q-icon name="search" class="menu-icon" />
								<p>Chercher</p>
							</div>
						</q-item-section> -->
					</q-item>
					<q-item v-if="isLogged">
						<q-item-section class="cursor-pointer">
							<div>
								<q-icon name="contact_support" class="menu-icon" />
								<p>Contact</p>
							</div>
						</q-item-section>
						<q-item-section class="cursor-pointer">
							<div>
								<q-icon name="account_box" class="menu-icon" />
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
	data() {
		return {
			isLogged: false
		}
	}
})
</script>

<style lang="scss" scoped>
.app-title {
		margin-inline: auto;
	}

.header-menu {
	width: 50%;

	.q-item__section {
		div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	.filterWrapper {
		display: flex;
		flex-direction: row;
		align-items: center;

		.filterLabel {
			width: 30%;
		}

		.filterSelect {
			width: 70%;

			.q-field__inner {
				display: initial; /* Reset display property */
				flex-direction: initial; /* Reset flex-direction property */

				.q-field__control {
					flex-direction: row;
				}
			}
		}
	}

	.menu-icon {
		font-size: 2em;
	}
}
</style>
