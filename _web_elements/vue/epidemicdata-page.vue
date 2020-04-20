<!--suppress ALL -->
<style>
    .hello {
        background-color: #ffe;
    }
</style>

<template>
    <div>
        <!--<div class="row ">-->
        <div class="container-fluid p-0 no-gutters" style="z-index: 10000; position: relative;">
        <div class="row bg-dark justify-content-between align-items-center no-gutters">
            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <a class="-navbar-brand" :href="window.ed.root+'/'" style="display: inline-block; padding: 12px 8px;"><img :src="window.ed.root+'/_web_elements/i/epidemicdata_logo.png'" class="logo_image" /></a>
            </div>
            <div class="col-6 col-sm-4">
                <div class="container-fluid" style>
                    <div class="row">
                        <div class="col" :class="{'invisible_by_default': 1, 'visible_if': ((window.ed.screen_size==='xs') || (window.ed.screen_size==='sm') || (window.ed.screen_size==='md')) && ($root.show_mobile_menu===0)}"><a class="topnav-link" href="#" style=" display: inline-block; padding: 12px 0px;" @click.prevent.stop="$root.toggle_mobile_menu()">Countries</a></div>
                        <!--<template v-for="(continent, continent_index) in window.ed.continents">
                            <div class="col"><a class="topnav-link" :href="window.ed.root+'/'+continent['uri']+'/'" style=" display: inline-block; padding: 12px 0px;" v-html="continent['name']"></a></div>
                        </template>-->
                        <div class="col"><a class="topnav-link" :href="window.ed.root+'/about/'" style=" display: inline-block; padding: 12px 0px;">About</a></div>
                        <div class="col"><a class="topnav-link" href="https://www.facebook.com/epidemicdata" target="_blank" style=" display: inline-block; padding: 12px 0px;"><i class="fa fa-facebook white-text mr-4"> </i></a></div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div id="mobile_menu" v-show="$root.show_mobile_menu">
            <epidemicdata-sidebar-nav></epidemicdata-sidebar-nav>
        </div>
        <div id="layoutSidenav" v-show="$root.show_mobile_menu===0">
            <epidemicdata-sidebar-nav></epidemicdata-sidebar-nav>
            <div id="layoutSidenav_content">
                <main>
                    <template v-if="window.location.pathname==='/about/'">
                        <h2 v-html="$root.page_title"></h2>
                        <div style="max-width: 800px; padding: 20px;">
                            EpidemicData.com provides continuously updated graphs and charts about the Covid-19 epidemic around the world. It includes country-specific diagrams for free which are both downloadable and easy to embed to any site. Project by the <a href="https://www.facebook.com/datadesigncollective/" target="_blank">Data&amp;Design Collective</a>.<br>
                            <br>
                            Every chart on EpidemicData.com uses <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">the data provided by John Hopkins University</a>, based on <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports">WHO</a>, <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">CDC</a>, <a href="https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases">ECDC</a>,&nbsp;<a href="http://www.nhc.gov.cn/xcs/yqtb/list_gzbd.shtml">NHC</a>,&nbsp;<a href="https://3g.dxy.cn/newh5/view/pneumonia?scene=2&amp;clicktime=1579582238&amp;enterid=1579582238&amp;from=singlemessage&amp;isappinstalled=0">DXY</a>, <a href="https://coronavirus.1point3acres.com/">1point3acres</a>, <a href="https://www.worldometers.info/coronavirus/">Worldometers.info</a>,&nbsp;<a href="https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/">BNO</a>,&nbsp;state and national government health department,&nbsp;and local media reports.<br><br>
                            We refresh our charts multiple times every day.<br><br>
                            If you have feedback, input, bugs to report, please get in touch with us at <a href="mailto:epidemicdata@gmail.com" target="_blank">epidemicdata@gmail.com</a>
                            <br><br>
                            <!--<div class="post">
                                <div class="post_date" style="font-weight: bold;">
                                    27/03/2020:
                                </div>
                                <br>
                                As John Hopkins University announced they would stop providing numbers of recovered patients on 24 March, we developed a new methodology to estimate the number of recovered and active coronavirus cases accurately.<br>
                                <br>
                                The methodology is a result of several rounds of experimentation to find the function that most closely correlates with the previously available data from the John Hopkins University (until 24 March).<br>
                                <br>
                                We found that the recovery time of new confirmed cases is a normal distribution with a mean of 24 days and a standard deviation of 12 days (the death cases subtracted). The data generated by this function has a correlation coefficient of 0.999 with the previously existing cumulative data and a correlation coefficient of 0.995 with the previously existing daily new cases data.
                            </div>-->
                        </div>
                    </template>
                    <template v-else-if="window.location.pathname==='/regions/'">
                        <h2 v-html="$root.page_title"></h2>
                        <div style="max-width: 800px; padding: 20px;">
                            <div class="row">
                                <template v-for="(continent, continent_index) in window.ed.continents">
                                    <template v-if="(typeof(continent['is_hidden'])==='undefined') || (continent['is_hidden']!==1)">
                                        <div class="col">
                                            <template v-if="typeof(continent['country_isos'])!=='undefined'">
                                                <strong><a :href="'/'+continent['uri']" v-html="continent['name']"></a></strong><br>
                                            </template>
                                            <template v-else="typeof(continent['uri'])!=='undefined'">
                                                <strong><span v-html="continent['name']"></span></strong><br>
                                            </template>
                                            <template v-for="(region, region_index) in continent['regions']">
                                                <template v-if="(typeof(region['is_hidden'])==='undefined') || (region['is_hidden']!==1)">
                                                - <a :href="'/'+region['uri']" v-html="region['name']"></a><br>
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                </template>
                            </div>

                        </div>
                    </template>
                    <template v-else-if="window.location.pathname==='/most-affected/'">
                        <h2 v-html="$root.page_title"></h2>
                        <div style="-max-width: 800px; padding: 20px;">
                            <div class="row">
                                <template v-for="(continent, continent_index) in window.ed.continents">
                                    <template v-if="continent['uri']==='most-affected'">
                                        <div class="col-4">
                                            <template v-for="(region, region_index) in continent['regions']">
                                                <template v-if="(region_index < 8)">
                                                - <a :href="'/'+region['uri']" v-html="region['name']"></a><br>
                                                </template>
                                            </template>
                                        </div>
                                        <div class="col-8">
                                            <template v-for="(region, region_index) in continent['regions']">
                                                <template v-if="(8 <= region_index) && (region_index < 80)">
                                                - <a :href="'/'+region['uri']" v-html="region['name']"></a><br>
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                </template>
                            </div>

                        </div>
                    </template>
                    <template v-else>

                        <template v-if="(!window.ed.is_chart) && (!window.ed.place_is_most) && (window.ed.place_type=='region')">
                            <div class="container" style="padding-top: 20px;">
                                <div class="row">
                                    <template v-for="(continent, continent_index) in window.ed.continents">
                                        <template v-if="(typeof(continent['is_hidden'])==='undefined') || (continent['is_hidden']!==1)">
                                            <div class="col">
                                                <template v-if="typeof(continent['country_isos'])!=='undefined'">
                                                    <strong><a :href="'/'+continent['uri']" v-html="continent['name']"></a></strong><br>
                                                </template>
                                                <template v-else="typeof(continent['uri'])!=='undefined'">
                                                    <strong><span v-html="continent['name']"></span></strong><br>
                                                </template>
                                                <template v-for="(region, region_index) in continent['regions']">
                                                    <template v-if="(typeof(region['is_hidden'])==='undefined') || (region['is_hidden']!==1)">
                                                        - <a :href="'/'+region['uri']" v-html="region['name']"></a><br>
                                                    </template>
                                                </template>
                                            </div>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="(!window.ed.is_chart) && (window.ed.place_is_most) && (window.ed.place_type=='region')">
                            <div style="-max-width: 800px; padding: 20px;">
                                <div class="row">
                                    <template v-for="(continent, continent_index) in window.ed.continents">
                                        <template v-if="continent['uri']==='most-affected'">
                                            <div class="col-4">
                                                <template v-for="(region, region_index) in continent['regions']">
                                                    <template v-if="(region_index < 8)">
                                                        - <a :href="'/'+region['uri']" v-html="region['name']"></a><br>
                                                    </template>
                                                </template>
                                            </div>
                                            <div class="col-8">
                                                <template v-for="(region, region_index) in continent['regions']">
                                                    <template v-if="(8 <= region_index) && (region_index < 80)">
                                                        - <a :href="'/'+region['uri']" v-html="region['name']"></a><br>
                                                    </template>
                                                </template>
                                            </div>
                                        </template>
                                    </template>
                                </div>

                            </div>
                        </template>

                        <template v-if="!window.ed.is_chart">
                        <h2 v-html="$root.page_title"></h2>
                        </template>

                    <div class="page_charts">
                        <template v-if="!window.ed.is_chart">
                        <epidemicdata-page-info></epidemicdata-page-info>
                        </template>

                        <template v-for="(chart, chart_key) in charts">
                            <template v-if="(window.ed.is_chart!==1) || (typeof(window.app.$route.query[chart_key])!=='undefined')">
                                <div :id="'page_chart_outer_container_'+chart_key" class="page_chart_outer_container">
                                    <div :id="'page_chart_container_'+chart_key" class="page_chart_container">
                                        <epidemicdata-chart-title :chart_key="chart_key" :chart="chart"></epidemicdata-chart-title>
                                        <template v-if="chart.chart_type==='summary_table'">
                                            <epidemicdata-summary-table :chart_key="chart_key" :chart="chart"></epidemicdata-summary-table>
                                        </template>
                                        <template v-if="chart.chart_type==='datatable_region'">
                                            <template v-if="chart.filtered_data.items.length">
                                            <epidemicdata-datatable-region :chart_key="chart_key" :chart="chart"></epidemicdata-datatable-region>
                                            </template>
                                        </template>
                                        <template v-if="chart.chart_type==='anychart_map_choropleth'">
                                            <epidemicdata-anychart-map-choropleth :chart_key="chart_key" :chart="chart"></epidemicdata-anychart-map-choropleth>
                                        </template>
                                        <template v-else-if="chart.chart_type==='anychart_area'">
                                            <epidemicdata-anychart-area :chart_key="chart_key" :chart="chart"></epidemicdata-anychart-area>
                                        </template>
                                        <template v-if="chart.chart_type==='_global_map_plain'">
                                            <epidemicdata-global-map-plain :chart_key="chart_key" :chart="chart"></epidemicdata-global-map-plain>
                                        </template>
                                        <template v-else-if="chart.chart_type==='google_area'">
                                            <epidemicdata-google-area :chart_key="chart_key" :chart="chart"></epidemicdata-google-area>
                                        </template>
                                        <template v-else-if="chart.chart_type==='google_line'">
                                            <epidemicdata-google-line :chart_key="chart_key" :chart="chart"></epidemicdata-google-line>
                                        </template>
                                        <template v-else-if="chart.chart_type==='google_line_region'">
                                            <epidemicdata-google-line-region :chart_key="chart_key" :chart="chart"></epidemicdata-google-line-region>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </template>

                        <template v-if="window.ed.is_chart">
                            <div style="padding-top: 20px;">
                            <epidemicdata-page-info></epidemicdata-page-info>
                            </div>
                        </template>
                    </div>
                    </template>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted"><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC-BY 4.0</a> EpidemicData.com</div>
                            <div>
                                <a href="/about/">About</a> &nbsp; <a class="" href="https://www.facebook.com/epidemicdata" target="_blank" style=" display: inline-block; padding: 12px 0px;"><i class="fa fa-facebook white-text mr-4"> </i></a></div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
	module.exports = {
		props: ['input'],
		data: function() {
			return Object.assign({}, this.$props.input)
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
        computed:{
        },
		components: {
			'vueSlider': window[ 'vue-slider-component' ],
			//'epidemicdataGlobalMapPlain': httpVueLoader('/vue/epidemicdata-global-map-plain.vue'),
			'epidemicdataChartTitle': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-chart-title.vue'),
			'epidemicdataPageInfo': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-page-info.vue'),
			'epidemicdataAnychartMapChoropleth': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-anychart-map-choropleth.vue'),
			'epidemicdataAnychartArea': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-anychart-area.vue'),
			'epidemicdataGoogleArea': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-google-area.vue'),
			'epidemicdataGoogleLine': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-google-line.vue'),
			'epidemicdataGoogleLineRegion': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-google-line-region.vue'),
			'epidemicdataSummaryTable': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-summary-table.vue'),
			'epidemicdataDatatableRegion': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-datatable-region.vue'),
			'epidemicdataSidebarNav': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-sidebar-nav.vue'),
		},
		//mixins: [my_mixin],
	}
</script>
