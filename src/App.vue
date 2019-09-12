<template>
	<v-app>
		<AppHeader />
		<v-container>
			<v-row justify="center">
				<v-col cols="4">
					<v-file-input 
						label="Load SVGs" 
						v-model="files"
						multiple
						outlined
					/>
				</v-col>
			</v-row>
			<SVGs :svgs="svgs" />
		</v-container>
	</v-app>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AppHeader from './components/AppHeader'
import SVGs from './components/SVGs'

export default {
  name: 'App',
  components: {
	  AppHeader,
	  SVGs
  },
  data: () => ({
	  files:null
  }),
  computed: {
	...mapActions(['updateSvgs']),
	...mapState(['svgs'])
  },
  watch: {
	  files(val) {
		  this.$store.dispatch("updateSvgs", val);
	  }
  }
};
</script>

<style lang="scss">
	html {
		overflow: hidden !important;
	}

</style>