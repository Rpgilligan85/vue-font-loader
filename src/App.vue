<template>
	<v-app>
		<AppHeader />
		<v-container>
			<v-row justify="center">
				<v-col cols="4">
					<v-select
						:items="folderNames"
						v-on:change="updateValue"
						label="Folder Name"
					/>
				</v-col>
			</v-row>
			<SVGs :svgs="svgs" :folder="folder" />
		</v-container>
	</v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppHeader from './components/AppHeader'
import SVGs from './components/SVGs'

export default {
  name: 'App',
  components: {
	  AppHeader,
	  SVGs
  },
  data: () => ({
	  files:null,
	  folderNames:['SVGs','FontAwesome']
  }),
  computed: {
	...mapActions(['updateSvgs','updateFolder']),
	...mapState(['svgs', 'folder'])
  },
  methods: {
	  updateValue: function(value) {
	  this.$store.dispatch("updateFolder", value);
	  this.loadLocal(value)
	},
	loadLocal(folder) {
		this.$store.dispatch("updateSvgs", []);
		$.ajax({
			url : `${window.location.protocol}//${window.location.hostname}/public/php/scandir.php`,
			type: 'POST',
			data: { folder },
			success: (data) => {
				let json = JSON.parse(data);
				let arr = [];
				for (let i = 0; i < json.length; i++) {
					json[i].indexOf('svg') != -1 ? arr.push(json[i]) : null;
				}
					this.$store.dispatch("updateSvgs", arr);
			}
		});
	}
  },
};
</script>

<style lang="scss">
	html {
		overflow: hidden !important;
	}

</style>