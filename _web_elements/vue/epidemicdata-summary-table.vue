<style>
</style>

<template>
    <div style="max-width: 700px; text-align: center; margin: 0px 0px;" class="summary_outer_container">
        <b-container style="padding-right: 0px;" class="summary_container">
            <b-row class="summary_row_total summary_row" style="margin-bottom: 8px;">
                <b-col class="summary_col summary_col_TC" :style="{'color': chroma(window.ed.colors.confirmed_line).darken(1), 'background-color': chroma(window.ed.colors.confirmed_line).alpha(0.3)}">
                    <div class="summary_col_label" v-html="'<header><small>x</small></header>Total Confirmed<header><small>x</small></header>'"></div>
                    <div class="summary_col_number" v-html="this_place.TC.toLocaleString('en-UK').replace(/,/g,' ')"></div>
                </b-col>
                <b-col class="summary_col summary_col_TA" :style="{'color': chroma(window.ed.colors.active_line).darken(1), 'background-color': chroma(window.ed.colors.active_line).alpha(0.3)}">
                    <div class="summary_col_label" v-html="'<header><small>x</small></header>Total Active<header><small>x</small></header>'"></div>
                    <div class="summary_col_number" v-html="this_place.TA.toLocaleString('en-UK').replace(/,/g,' ')+(typeof(this_place.TAR)==='undefined'?'':'<br><small>'+this_place.TAR+'%</small>')"></div>
                </b-col>
                <b-col class="summary_col summary_col_TR" :style="{'color': chroma(window.ed.colors.recovered_line).darken(1), 'background-color': chroma(window.ed.colors.recovered_line).alpha(0.3)}">
                    <div class="summary_col_label" v-html="'<header><small>x</small></header>Total Recovered<header><small>x</small></header>'"></div>
                    <div class="summary_col_number" v-html="this_place.TR.toLocaleString('en-UK').replace(/,/g,' ')+(typeof(this_place.TRR)==='undefined'?'':'<br><small>'+this_place.TRR+'%</small>')"></div>
                </b-col>
                <b-col class="summary_col summary_col_TD" :style="{'color': chroma(window.ed.colors.deaths_line).darken(1), 'background-color': chroma(window.ed.colors.deaths_line).alpha(0.3)}">
                    <div class="summary_col_label" v-html="'<header><small>x</small></header>Total Deaths<header><small>x</small></header>'"></div>
                    <div class="summary_col_number" v-html="this_place.TD.toLocaleString('en-UK').replace(/,/g,' ')+(typeof(this_place.TMR)==='undefined'?'':'<br><small>'+this_place.TMR+'%</small>')"></div>
                </b-col>
            </b-row>
            <b-row class="summary_row_total summary_row" style="margin-bottom: 8px;">
                <b-col class="summary_col summary_col_DC" :style="{'color': window.ed.colors.confirmed_line, 'background-color': chroma(window.ed.colors.confirmed_line).alpha(0.1)}">
                    <div class="summary_col_label" v-html="'New Confirmed<br><small> on '+window.ed.last_day.toLocaleDateString('en-GB')+'</small>'"></div>
                    <div class="summary_col_number" v-html="this_place.DC.toLocaleString('en-UK').replace(/,/g,' ')"></div>
                </b-col>
                <b-col class="summary_col summary_col_DA" :style="{'color': window.ed.colors.active_line, 'background-color': chroma(window.ed.colors.active_line).alpha(0.1)}">
                    <div class="summary_col_label" v-html="'New Active<br><small> on '+window.ed.last_day.toLocaleDateString('en-GB')+'</small>'"></div>
                    <div class="summary_col_number" v-html="this_place.DA.toLocaleString('en-UK').replace(/,/g,' ')"></div>
                </b-col>
                <b-col class="summary_col summary_col_DR" :style="{'color': window.ed.colors.recovered_line, 'background-color': chroma(window.ed.colors.recovered_line).alpha(0.1)}">
                    <div class="summary_col_label" v-html="'New Recovered<br><small> on '+window.ed.last_day.toLocaleDateString('en-GB')+'</small>'"></div>
                    <div class="summary_col_number" v-html="this_place.DR.toLocaleString('en-UK').replace(/,/g,' ')"></div>
                </b-col>
                <b-col class="summary_col summary_col_DD" :style="{'color': window.ed.colors.deaths_line, 'background-color': chroma(window.ed.colors.deaths_line).alpha(0.1)}">
                    <div class="summary_col_label" v-html="'New Deaths<br><small> on '+window.ed.last_day.toLocaleDateString('en-GB')+'</small>'"></div>
                    <div class="summary_col_number" v-html="this_place.DD.toLocaleString('en-UK').replace(/,/g,' ')"></div>
                </b-col>
            </b-row>
        </b-container>
        <epidemicdata-info-div :chart_key="chart_key" :chart="chart"></epidemicdata-info-div>
        <epidemicdata-imagegenerating-div :chart_key="chart_key" :chart="chart"></epidemicdata-imagegenerating-div>
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
        computed:
            {
            this_place: function()
            {
            	if (typeof(window.ed.Country_iso_to[window.ed.place])!=='undefined')
                {
                	console.log('this_place A', window.ed.place, window.ed.Country_iso_to[window.ed.place]);
                	return window.ed.Country_iso_to[window.ed.place];
                }
            	else if (typeof(window.ed.Region_uri_to[window.ed.place])!=='undefined')
                {
                	console.log('this_place R', window.ed.place, window.ed.Region_uri_to[window.ed.place]);
                	return window.ed.Region_uri_to[window.ed.place];
                }
            	else
                {
					console.log('this_place B');
					return window.ed.World_iso_to[window.ed.place];
                }
            }
            },
		components: {
			'epidemicdata-info-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-info-div.vue'),
			'epidemicdata-imagegenerating-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-imagegenerating-div.vue'),
		},
		//mixins: [my_mixin],
	}
</script>
