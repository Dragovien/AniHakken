<template>
	<q-header elevated>
		<q-toolbar>
			<q-btn flat dense round icon="menu" aria-label="Menu" />
			<q-toolbar-title> AniHakken </q-toolbar-title>
			<q-btn flat dense round icon="settings" aria-label="Settings">
				<q-menu class="header-menu" max-width="50%">
					<q-item>
						<q-item-section class="cursor-pointer">
							<div>
								<q-icon name="home" class="menu-icon" />
								<p>Accueil</p>
							</div>
						</q-item-section>
						<q-item-section class="cursor-pointer">
							<div>
								<q-icon name="search" class="menu-icon" />
								<p>Chercher</p>
							</div>
						</q-item-section>
					</q-item>
					<q-item>
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
	name: 'AppHeader'
})
</script>

<style lang="scss" scoped>
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
