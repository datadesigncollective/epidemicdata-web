<style>
</style>

<template>
        <div class="info_div"><span class="hide_for_image" v-show="chart.image_generating===0"><!--<a href="#" @click.prevent.stop="$root.show_hide_embed(chart_key)">Embed Chart</a> &nbsp;|&nbsp; --><a href="#" @click.prevent.stop="$root.save_as_image(chart_key)" :disabled="(chart.image_generating===0?1:0)">Save as Image</a> &nbsp;|&nbsp;</span> Data: JHU, Chart: <a href="https://epidemicdata.com" target="_blank">EpidemicData.com</a> by <!--<a href="https://datadesigncollective.com" target="_blank">-->Data&amp;Design Collective<!--</a>-->, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC-BY 4.0</a></div>
</template>

<script>
	module.exports = {
		props: ['chart_key', 'chart'],
		data: function() {
			return {
				who: 'world'
			}
		},
        mounted: function(){
			// let vue = this;
			// this.$nextTick(function ()
			// {
			// 	anychart.onDocumentReady(function ()
			// 	{
			// 		vue.$root.get_chart_data_for_source(vue.chart_key);
			// 	});
			// });
        },
		components: {
		},
		//mixins: [my_mixin],
	}
</script>
