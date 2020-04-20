<style>
</style>

<template>
    <h4>
        <template v-if="window.ed.is_chart">
            <template v-if="window.ed.place_type==='country'">
                <a :href="'/'+window.ed.Country_iso_to[window.ed.place]['uri']" v-html="window.ed.Country_iso_to[window.ed.place]['name']"></a> &raquo; <span v-html="chart.title"></span>
            </template>
            <template v-else-if="window.ed.place_type==='region'">
                <a :href="'/'+window.ed.place" v-html="window.ed.Region_uri_to[window.ed.place]['name']"></a> &raquo; <span v-html="chart.title"></span>
            </template>
        </template>
        <template v-else>
            <a :href="chart_link" v-html="chart.title" :class="{'black':($root.charts[chart_key].image_generating!==0)}"></a>
        </template>

    </h4>
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
        computed:
            {
            },
		components: {
			'epidemicdata-info-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-info-div.vue'),
			'epidemicdata-imagegenerating-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-imagegenerating-div.vue'),
		},
		mixins: [my_mixin],
	}
</script>
