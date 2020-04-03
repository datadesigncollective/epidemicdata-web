<style>
</style>

<template>
    <div>
    <div style="-border: 1px solid cyan; margin: 4px; padding: 4px;">
        <b-container fluid >
            <b-row style="">
                <b-col class="main_bar" cols="10">
                    <div :id="'google_chart_'+chart_key+'_container'" class="chart_container">
                        <div :id="'google_chart_'+chart_key+'_outer'" style="position: relative;" class="chart_outer">
                            <div :id="'google_chart_'+chart_key+''" v-html="'google_chart_'+chart_key+''" style="width: 100%; height: 600px; -outline: 1px solid lightgreen;" class="chart_div"></div>
                            <div :id="'google_chart_'+chart_key+'_overlay'" style="position: absolute; top: 0px; left: 0px; right: 0px; text-align: center;" class="chart_overlay">
                                <div class="overlay_map_title" style="font-size: 14px; font-weight: bold; display: inline-block; padding-top: 8px;" v-html="chart.full_title"></div>
                            </div>
                        </div>
                        <epidemicdata-info-div :chart_key="chart_key" :chart="chart"></epidemicdata-info-div>

                    </div>
                </b-col>
                <b-col class="side_bar" cols="2">
                    <template v-for="(column_key, column_index) in $root.charts[chart_key].filtered_data[0]">
                        <template v-if="column_index >= 1">
                            <b-form-row :style="{'margin-bottom': '8px', 'padding-bottom':'0px', 'border-bottom-width':'3px', 'border-bottom-style': 'solid', 'border-bottom-color': $root.charts[chart_key].column_colors[column_index-1]}">
                                <b-col cols="2"><input type="checkbox" :name="chart_key+'_type_active'" v-model="$root.charts[chart_key].options.c" :value="(column_index-1)" @change="$root.reload_google_chart_data(chart_key)" :id="chart_key+'_type_active_'+(column_index-1)" /></b-col>
                                <b-col cols="10"><label :for="chart_key+'_type_active_'+(column_index-1)" v-html="column_key" style="margin-bottom: 0px;"></label></b-col>
                            </b-form-row>
                        </template>
                    </template>
                </b-col>
            </b-row>
            <b-row v-show="chart.show_embed">
                <b-col class="main_bar" cols="12">
                    {{chart.embed_url}}
                    <!--<input type="radio" :name="chart.chart_type+'embed_fixed_date'" v-model="chart.embed_options.fixed_date" :value="1" @change="$root.recalculate_embed_url(chart.chart_type)" :id="chart.chart_type+'embed_fixed_date'" /><label :for="chart.chart_type+'embed_fixed_date'" v-html="'Show Selected Date'"></label>
                    <input type="radio" :name="chart.chart_type+'embed_fixed_date'" v-model="chart.embed_options.fixed_date" :value="0" @change="$root.recalculate_embed_url(chart.chart_type)" :id="chart.chart_type+'embed_fixed_date'" /><label :for="chart.chart_type+'embed_fixed_date'" v-html="'Always Show Actual Date in the Future'"></label><br>
                    <input type="text" v-model="chart.embed_url" style="width:100%" readonly />-->
                </b-col>
            </b-row>
            <epidemicdata-imagegenerating-div :chart_key="chart_key" :chart="chart"></epidemicdata-imagegenerating-div>
        </b-container>
    </div>
    </div>
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
			// 	googlechart.onDocumentReady(function ()
			// 	{
			// 		vue.$root.get_chart_data_for_source(vue.chart_key);
			// 	});
			// });
        },
		components: {
			'epidemicdata-info-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-info-div.vue'),
			'epidemicdata-imagegenerating-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-imagegenerating-div.vue'),
		},
		//mixins: [my_mixin],
	}
</script>
