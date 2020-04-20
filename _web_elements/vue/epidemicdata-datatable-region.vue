<style>
</style>

<template>
    <div>
    <div style="-border: 1px solid cyan; margin: 4px; padding: 4px;" :class="{'image_generating': chart.image_generating}">
        <b-container fluid >
            <b-row class="no-gutters">
                <b-col class="main_bar col-12 col-lg-10">
                    <div :id="'datatable_'+chart_key+'_container'" :class="'chart_container chart_container_type_'+chart.chart_type" style="padding-left: 10px; padding-right: 20px; padding-bottom: 20px;">
                        <div class="datatable_small_title" v-html="chart.title" v-show="chart.image_generating"></div>
                        <div :id="'datatable_'+chart_key+'_outer'" style="-position: relative; overflow-y: auto; max-height: 610px;" class="datatable_outer">
                            <div :id="'datatable_'+chart_key+'_div'" style="width: 100%; -height: 610px; -outline: 1px solid lightgreen;" class="datatable_div">
                                <b-table small :id="'datatable_'+chart_key" :fields="chart.filtered_data.fields" :items="chart.filtered_data.items" responsive="sm" striped class="datatable" bordered hover selectable select-mode="multi" :sort-by.sync="dt_sort_by" :sort-desc.sync="dt_sort_desc">
                                    <template v-slot:thead-top="data">
                                        <b-tr>
                                            <b-th :colspan="chart.pora==='p'?'2':'1'"><span class="sr-only">Name and ID</span></b-th>
                                            <b-th variant="total" colspan="4" class="text-center" v-html="'Total'+(chart.pora==='p'?' / 1M People':'')"></b-th>
                                            <b-th variant="daily" colspan="4" class="text-center" v-html="'Daily'+(chart.pora==='p'?' / 1M People':'')"></b-th>
                                            <b-th variant="rates" colspan="3" class="text-center">Rates</b-th>
                                        </b-tr>
                                    </template>
                                    <template v-slot:cell(country)="data">
                                        <a :href="'/'+data.item.country.uri" v-html="data.item.country.name"></a>
                                    </template>


                                    <template v-slot:cell(TRR)="data">
                                        <span v-html="data.value+'%'">
                                    </template>
                                    <template v-slot:cell(TAR)="data">
                                        <span v-html="data.value+'%'">
                                    </template>
                                    <template v-slot:cell(TMR)="data">
                                        <span v-html="data.value.toFixed(2)+'%'">
                                    </template>

                                    <!-- Optional default data cell scoped slot -->
                                    <template v-slot:cell()="data">
                                        <span v-html="chart.pora==='p'?data.value.toFixed(2).toLocaleString('en-UK').replace(/,/g,'&nbsp;'):data.value.toLocaleString('en-UK').replace(/,/g,'&nbsp;')">
                                    </template>
                                </b-table>
                            </div>
                            <div :id="'datatable_'+chart_key+'_overlay'" style="position: absolute; top: 0px; left: 0%; right: 0px; -bottom: 0px; text-align: center;" class="chart_overlay">
                                <!--<div class="overlay_map_title" style="font-size: 14px; font-weight: bold; display: inline-block; padding-top: 8px;" v-html="chart.full_title"></div>-->
                            </div>
                        </div>
                        <epidemicdata-info-div :chart_key="chart_key" :chart="chart"></epidemicdata-info-div>

                    </div>
                </b-col>
                <b-col class="chart_sidebar col-12 col-lg-2">



                    <template v-if="1">
                        <b-form-group label="">
                            <!--<b-form-radio-group
                                    v-model="chart.options.t"
                                    :options="[
                                    {text: 'Total Confirmed', value:'TC'+chart.pora},
                                    {text: 'Total Active', value:'TA'+chart.pora},
                                    {text: 'Total Recovered', value:'TR'+chart.pora},
                                    {text: 'Total Deaths', value:'TD'+chart.pora},
                                    {text: 'Daily Confirmed', value:'DC'+chart.pora},
                                    {text: 'Daily Active', value:'DA'+chart.pora},
                                    {text: 'Daily Recovered', value:'DR'+chart.pora},
                                    {text: 'Daily Deaths', value:'DD'+chart.pora},
                                    ]"
                                    buttons
                                    :name="chart_key+'_datatype'"
                                    :id="chart_key+'_datatype'"
                                    button-variant="outline-primary"
                                    size="sm"
                                    stacked
                                    @change="$root.region_datatype_changed(chart_key)"
                            ></b-form-radio-group>-->
                        </b-form-group>
                    </template>

                    <div style="max-height: 610px; overflow-y: auto; overflow-x: hidden; margin-bottom: 12px;">
                        <b-form-row class="chart_sidebar_checkbox_row" :style="{'margin-bottom': '8px', 'padding-bottom':'0px', 'border-bottom-width':'3px', 'border-bottom-style': 'solid', 'border-bottom-color': '#eeeeee'}">
                            <b-col  class="chart_sidebar_checkbox_cell_checkbox col-2"><input type="checkbox" :name="chart_key+'_type_active_all'" :id="chart_key+'_type_active_all'" v-model="toggle_all_countries"  @change="countries_changed" /></b-col>
                            <b-col  class="chart_sidebar_checkbox_cell_label col-10"><label :for="chart_key+'_type_active_all'" v-html="'Toggle All'" style="margin-bottom: 0px;"></label></b-col>
                        </b-form-row>
                        <template v-for="(row, row_index) in $root.charts[chart_key].original_data.items">
                            <template v-if="row_index >= 0">
                                <b-form-row class="chart_sidebar_checkbox_row" :style="{'margin-bottom': '8px', 'padding-bottom':'0px', 'border-bottom-width':'3px', 'border-bottom-style': row_index === $root.charts[chart_key].column_colors.length?'solid':'solid', 'border-bottom-color': $root.charts[chart_key].column_colors[row_index]}">
                                    <b-col  class="chart_sidebar_checkbox_cell_checkbox col-2"><input type="checkbox" :name="chart_key+'_type_active'" v-model="$root.charts[chart_key].options.r" :value="(row_index)" @change="countries_changed" :id="chart_key+'_type_active_'+(row_index)" /></b-col>
                                    <b-col  class="chart_sidebar_checkbox_cell_label col-10"><label :for="chart_key+'_type_active_'+(row_index)" v-html="row['country']['name']" style="margin-bottom: 0px;"></label></b-col>
                                </b-form-row>
                            </template>
                        </template>
                    </div>

                    <template v-if="chart.log_scale_custom">
                        <!--<hr>
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
                            ></b-form-radio-group>
                        </b-form-group>-->
                        <input type="checkbox" :checked="chart.options.l==='m'" :id="chart_key+'_is_lin_or_log'" v-bind="scale_type" onchange="window.app.$root.scale_type_changed($(this).data('chart-key'), $(this).prop('checked'))" data-toggle="toggle"  data-off="Linear" data-on="Logarithmic"  data-size="small" data-onstyle="secondary" data-offstyle="secondary" :data-chart-key="chart_key">
                    </template>

                    <template v-if="chart.color_custom">
                        <hr>
                        <b-form-group label="">
                            <b-form-radio-group
                                    v-model="chart.options.co"
                                    :options="[
                                    {text: 'jet', value:'jet'},
                                    {text: 'rainbow', value:'rainbow'},
                                    {text: 'brg', value:'brg'},
                                    {text: 'nipy_spectral', value:'nipy_spectral'}
                                    ]"
                                    buttons
                                    :name="chart_key+'_colormap'"
                                    :id="chart_key+'_colormap'"
                                    button-variant="outline-secondary"
                                    stacked
                                    @change="$root.colormap_changed(chart_key)"
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


        <template v-if="chart_key==='xxx_region_graph_line_total_per_population'">
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
				// dt_sort_desc: true,
			}
		},
        mounted: function(){
			console.log("mounted chart_key, chart", this.chart_key, this.chart);
			let temp = this.chart.options.sc;
			this.chart.options.sc = '';
            this.dt_sort_by_changed();
			this.chart.options.sc = temp;
			this.dt_sort_by_changed();
			this.countries_changed();
			// let vue = this;
			// this.$nextTick(function ()
			// {
			// 	googlechart.onDocumentReady(function ()
			// 	{
			// 		vue.$root.get_chart_data_for_source(vue.chart_key);
			// 	});
			// });
        },
        methods:
        {
			dt_sort_by_changed: function()
			{
				let val = this.chart.options.sc;
				console.log("watch dt_sort_by START, val, length", val, this.chart.filtered_data['fields'].length);

				for (let i=0, c=this.chart.filtered_data['fields'].length; i<c; i++)
				{
					console.log("watch dt_sort_by removing selected from ", this.chart.filtered_data['fields'][i]['key']);
					if (typeof(this.chart.filtered_data['fields'][i]['class'])==='undefined')
					{
						this.chart.filtered_data['fields'][i]['class'] = '';
					}
					this.chart.filtered_data['fields'][i]['class'] = this.chart.filtered_data['fields'][i]['class'].replace(/ selected/g, '');
				}
				for (let i=0, c=this.chart.filtered_data['fields'].length; i<c; i++)
				{
					console.log("watch dt_sort_by looking at ", '|'+val+'|', '|'+this.chart.filtered_data['fields'][i]['key']+'|');
					if (this.chart.filtered_data['fields'][i]['key']===val)
					{
						console.log("watch dt_sort_by ADDING selected TO ", '|'+val+'|', '|'+this.chart.filtered_data['fields'][i]['key']+'|');
						this.chart.filtered_data['fields'][i]['class'] += ' selected';
					}
				}
			},
            countries_changed: function()
            {
            let ret_items = [];
            console.log("countries_changed this.chart.options.r", this.chart.options.r, this.chart.original_data.items.length);
                if (!this.chart.options.r.length)
                {
					this.chart.options.r = [0];
                }
                for (let i=0, c=this.chart.original_data['items'].length; i<c; i++)
                {
                	if (this.chart.options.r.indexOf(i)!==-1)
                    {
						ret_items.push(this.chart.original_data['items'][i]);
                    }
                }
                if (!ret_items.length)
                {
					ret_items.push(this.chart.original_data['items'][0]);
                }
            this.chart.filtered_data.items = ret_items;
            }
        },
		components: {
			'epidemicdata-info-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-info-div.vue'),
			'epidemicdata-imagegenerating-div': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-imagegenerating-div.vue'),
		},
        computed:
            {
				toggle_all_countries:
                    {
						get: function () {
							return (this.chart.options.r.length!==0);
						},
						set: function (v) {
							console.log("this.$root.charts[this.chart_key].filtered_data[0].length", this.$root.charts[this.chart_key].filtered_data['items'].length);
							this.$root.charts[this.chart_key].options.r = v?[...Array(300).keys()]:[0];

						}
                    },
				dt_sort_by:
                    {
						get: function () {
							return this.chart.options.sc;
						},
						set: function (v) {
							this.chart.options.sc = v;
							this.$root.set_route_query();
							this.dt_sort_by_changed();
						}
                    },
				dt_sort_desc:
                    {
						get: function () {
							return this.chart.options.scd;
						},
						set: function (v) {
							this.chart.options.scd = v;
							this.$root.set_route_query();
						}
                    }

            },
        watch:
            {

            }
		//mixins: [my_mixin],
	}
</script>
