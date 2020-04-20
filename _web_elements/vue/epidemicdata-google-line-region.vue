<style>
</style>

<template>
    <div>
    <div style="-border: 1px solid cyan; margin: 4px; padding: 4px;">
        <b-container fluid >
            <b-row style="">
                <b-col class="main_bar col-12 col-lg-10">
                    <div :id="'google_chart_'+chart_key+'_container'" class="chart_container">
                        <div :id="'google_chart_'+chart_key+'_outer'" style="position: relative;" class="chart_outer">
                            <div :id="'google_chart_'+chart_key+''" v-html="'google_chart_'+chart_key+''" style="width: 100%; -height: 600px; -outline: 1px solid lightgreen;" class="chart_div"></div>
                            <div :id="'google_chart_'+chart_key+'_overlay'" style="position: absolute; top: 0px; left: 0%; right: 0px; -bottom: 0px; text-align: center;" class="chart_overlay">
                                <div class="overlay_map_title" style="font-size: 14px; font-weight: bold; display: inline-block; padding-top: 8px;" v-html="chart.full_title"></div>
                            </div>
                            <div class="overlay_legend_container" :style="{'left': window.ed.size_settings.chart_legend_left[window.ed.screen_size]+'%'}">
                                <!--<template v-for="(column_key, column_index) in $root.charts[chart_key].filtered_data[0]">
                                    <template v-if="column_index >= 1">
                                        <b-form-row class="chart_sidebar_checkbox_row" :style="{'margin-bottom': '8px', 'padding-bottom':'0px', 'border-bottom-width':'3px', 'border-bottom-style': 'solid', 'border-bottom-color': $root.charts[chart_key].column_colors[column_index-1]}">
                                            <b-col  class="chart_sidebar_checkbox_cell_label col"><label :for="chart_key+'_type_active_'+(column_index-1)" v-html="column_key" style="margin-bottom: 0px;"></label></b-col>
                                        </b-form-row>
                                    </template>
                                </template>-->
                            </div>
                        </div>
                        <epidemicdata-info-div :chart_key="chart_key" :chart="chart"></epidemicdata-info-div>

                    </div>
                    <div :id="'chart_'+chart_key+'_slider'" class="chart_slider" v-if="typeof($root.charts[chart_key].options.dr)!=='undefined'" style="height: 100px;">
                        <vue-slider
                                ref="slider"
                                :min-range="5"
                                v-model="$root.charts[chart_key].options.dr"
                                :data="$root.charts[chart_key].range_date_list"
                                :marks="$root.charts[chart_key].range_date_labels"
                                :process-dragable="true"
                                @change="$root.range_date_slider_changed(chart_key)"
                                v-bind="$root.range_slider_options"
                        ></vue-slider><!-- -->
                    </div>
                </b-col>
                <b-col class="chart_sidebar col-12 col-lg-2">

                    <template v-if="chart.log_scale_custom">
                        <hr>
                        <b-form-group label="">
                            <b-form-radio-group
                                    v-model="chart.options.l"
                                    :options="[{ text: 'Linear', value: 'n' },{ text: 'Logarithmic', value: 'm' }]"
                                    buttons
                                    :name="chart_key+'_scaletype'"
                                    :id="chart_key+'_scaletype'"
                                    button-variant="outline-secondary"
                                    stacked
                                    @change="$root.scale_type_changed(chart_key)"
                            ></b-form-radio-group><!---->
                        </b-form-group>
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


        <template v-if="chart_key==='region_graph_line_total_per_population'">
            <template v-for="(continent, continent_index) in window.ed.continents">
                <br>
                <template v-if="typeof(continent['uri'])!=='undefined'">
                    <strong><a :href="'/'+continent['uri']" v-html="continent['name']"></a></strong><br>
                </template>
                <template v-else="typeof(continent['uri'])!=='undefined'">
                    <strong><span v-html="continent['name']"></span></strong><br>
                </template>
                <template v-for="(region, region_index) in continent['regions']">
                    - <a :href="'/'+region['uri']" v-html="region['name']"></a><br>
                </template>
            </template>
        </template>
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
			'vueSlider': window[ 'vue-slider-component' ],
			'epidemicdata-info-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-info-div.vue'),
			'epidemicdata-imagegenerating-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-imagegenerating-div.vue'),
		},
		//mixins: [my_mixin],
	}
</script>
