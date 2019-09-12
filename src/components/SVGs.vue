<template>
<div>
	<v-row justify="center" align="center">
		<v-col
			v-for="(item, index) in svgs"
			:key="index"
		>
			<div class="svg">
				<!-- <v-img
					:src="imageRoot + item.name"
					max-height="50"
					max-width="50"
				/> -->
				<p v-html="getUnicode(index)"></p>
			</div>
		</v-col>
	</v-row>
	<v-row>
		<v-btn @click="generateJSON()">Generate JSON</v-btn>
	</v-row>
</div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import { saveAs } from 'file-saver';

export default {
	name: 'SVGs',
	props:['svgs'],
	data: () => ({
		imageRoot: './icons/SVGs/',
	}),
	methods: {
		...mapGetters(['getSvgs']),

		getUnicode(index) {
			console.log(index);
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
				id: 'ATC-Font',
				familyname: 'ATC Font',
				charmap:[]
			};
			for (let i = 0; i < this.svgs.length; i++) {	
				json.charmap.push({
					file: this.svgs[i].name,
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

	}

</style>