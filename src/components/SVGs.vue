<template>
<div v-if="svgs">
	<v-row>
		<v-col
			v-for="(item, index) in svgs"
			:key="index"
			cols="1"
		>
			<div class="svg">
				<v-img
					:src="imageRoot + folder + '/' + item"
					max-height="50"
					max-width="50"
					min-height="50"
					min-width="50"
				/>
			</div>
				<p class="charCode" v-html="getUnicode(index)"></p>
		</v-col>
	</v-row>
	<v-row>
		<v-btn @click="generateJSON()">Generate JSON</v-btn>
	</v-row>
</div>
</template>

<script>
import { saveAs } from 'file-saver';
import { mapState } from 'vuex'

export default {
	name: 'SVGs',
	props:['svgs', 'folder'],
	data: () => ({
		imageRoot: `./icons/`,
	}),
	methods: {
		...mapState(['folder']),

		getUnicode(index) {
			if(index >= 0 && index < 26) {
				return `&#${97+index};`
			} else if (index >= 26 && index < 52 ) {
				return `&#${39+index};`
			} else {
				return `&#${-4+index};`
			}
		},
		generateJSON() {
			let json = {
				id: this.folder,
				familyname: this.folder,
				charmap:[]
			};
			for (let i = 0; i < this.svgs.length; i++) {	
				 json.charmap.push({
					file: this.svgs[i],
					unicode: this.getUnicode(i)
				})	 	
			}
			console.log('json',json);
			this.saveFile(json)
		},
		saveFile(json) {
			let fileName = 'config.json'
			let file = new Blob([JSON.stringify(json)], {
				type:'application/json',
				name:fileName
			})
			saveAs(file, fileName)
		}
	},
	mounted() {
	},
	watch: {
		svgs(val) {
			console.log('svgs',val);
		}
	}
};
</script>

<style lang="scss">

	.svg {
		background: #999;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		border-radius: 5px 5px 0 0;
	}

	.charCode {
		text-align: center;
		background: #111;
		color: #fff;
		border-radius: 0 0 5px 5px;
	}

</style>