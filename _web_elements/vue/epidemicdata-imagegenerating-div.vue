<style>
</style>

<template>
    <div class="image_generating" v-show="chart.image_generating !== 0">
        <div class="_main_bar" style="position: absolute; top: 0; left: -4500px; background-color: white;">
            <!--<div>
                Step 1a: create Clone
                <div :id="'google_chart_'+chart_key+'_clone_container_outer'" style="position: relative; top: 0px; left: 0px; width: 1024px; height: 750px; outline: 1px solid pink;">
                    <div :id="'google_chart_'+chart_key+'_clone_container'">
                    </div>
                </div>
            </div>-->
            <div v-show="chart.image_generating > 0">
                <!--Step 1b: create image from Chart-->
                <div :id="'google_chart_'+chart_key+'_image_container_outer'" style="position: relative; outline: 1px solid cyan;">
                    <div :id="'google_chart_'+chart_key+'_image_container'" style="margin-right: 40px; outline: 1px solid red;">
                    </div>
                    <div :id="'google_chart_'+chart_key+'_image_overlay'" style="position: absolute; top: 0px; left: 0px; right: 0px; text-align: center;">
                        <div class="overlay_map_title" style="font-size: 14px; font-weight: bold; display: inline-block; padding-top: 8px;" v-html="chart.full_title"></div>
                    </div>
                    <epidemicdata-info-div :chart_key="chart_key" :chart="chart"></epidemicdata-info-div>
                </div>
            </div>
            <div v-show="chart.image_generating > 1">
                <!--Step 2: add overlay to image and create new image, Right Click to Save:-->
                <div :id="'chart_'+chart_key+'_canvas_container'"></div>
                <!--<b-button @click="$root.save_canvas_to_image(chart_key, 'something')">Save</b-button>-->
            </div>
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
