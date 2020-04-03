<style>
</style>

<template>
    <div>
    <div style="border: 1px solid cyan; margin: 4px; padding: 4px;">
        <b-container fluid >
            <b-row style="">
                <b-col class="main_bar" cols="10">
                    <div :id="'any_chart_'+chart_key+'_container'">
                        <div :id="'any_chart_'+chart_key+'_outer'" style="position: relative;">
                            <div :id="'any_chart_'+chart_key+''" style="height: 800px;" ></div>
                        </div>
                        <epidemicdata-info-div :chart_key="chart_key" :chart="chart"></epidemicdata-info-div>

                    </div>
                        <div :id="'any_chart_'+chart_key+'_slider'" class="any_chart_type_global_map_plain_slider map_slider">
                            <vue-slider
                                    ref="slider"
                                    v-model="$root.charts[chart_key].options.d"
                                    :data="$root.date_list"
                                    :marks="$root.date_labels"
                                    v-bind="$root.slider_options"
                                    @change="$root.date_slider_changed(chart_key)"
                            ></vue-slider>
                        </div>
                </b-col>
                <b-col class="side_bar" cols="2">
                    <template v-for="(column_data, column_key) in $root.charts[chart_key].columns">
                        <b-form-row>
                            <b-col cols="1"><input type="radio" :name="chart_key+'_type'" v-model="$root.charts[chart_key].options.c" :value="column_key" @change="$root.reload_chart_data(chart_key)" :id="chart_key+'_type_'+column_data.column_key" /></b-col>
                            <b-col cols="11"><label :for="chart_key+'_type_'+column_data.column_key" v-html="column_data.display_name"></label></b-col>
                        </b-form-row>
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
            <b-row v-show="chart.image_generating !== 0">
                <b-col class="main_bar" cols="10">
                    <div v-show="chart.image_generating === 1">
                        Step 1: create image from Chart
                        <div :id="'any_chart_'+chart_key+'_image_container_outer'" style="position: relative;">
                            <div :id="'any_chart_'+chart_key+'_image_container'">
                            </div>
                        </div>
                    </div>
                    <div v-show="chart.image_generating === 2">
                        Step 2: add overlay to image and create new image, Right Click to Save:
                        <div :id="'any_chart_'+chart_key+'_canvas_container'">
                        </div>
                        <b-button @click="$root.save_canvas_to_image(chart_key, 'something')">Save</b-button>
                    </div>
                </b-col>
            </b-row>
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
			// 	anychart.onDocumentReady(function ()
			// 	{
			// 		vue.$root.get_chart_data_for_source(vue.chart_key);
			// 	});
			// });
        },
		components: {
			'epidemicdata-info-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-info-div.vue'),
		},
		//mixins: [my_mixin],
	}
</script>
