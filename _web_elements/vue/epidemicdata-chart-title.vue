<style>
</style>

<template>
    <h4>
        <template v-if="1">
            <a :href="'/'+window.ed.Country_iso_to[window.ed.place]['uri']" v-html="window.ed.Country_iso_to[window.ed.place]['name']"></a> &raquo;
        </template>
        <a :href="chart_link" v-html="chart.title"></a></h4>
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
                chart_link: function()
                {
                    let chart_options_to_url = {'p': window.ed.place};
                    if (
                        (typeof(this.$root.charts[this.chart_key])!=='undefined') &&
                        (typeof(this.$root.charts[this.chart_key].options)!=='undefined')  &&
                        (typeof(this.$route.query[this.chart_key])!=='undefined')
                    )
                    {
						// let chart_options_from_url = {};
						console.log("this.$route.query[this.chart_key]", this.chart_key, this.$route.query[this.chart_key]);
                        let chart_options_from_url = JSON.parse(this.$route.query[this.chart_key]);
                        chart_options_to_url = Object.assign({}, chart_options_to_url, chart_options_from_url);
                    }
                    let ret = '/chart/?'+this.chart_key+'='+JSON.stringify(chart_options_to_url);
                    return ret;
                }
            },
		components: {
			'epidemicdata-info-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-info-div.vue'),
			'epidemicdata-imagegenerating-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-imagegenerating-div.vue'),
		},
		//mixins: [my_mixin],
	}
</script>
