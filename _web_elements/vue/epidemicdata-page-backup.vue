<!--suppress ALL -->
<style>
    .hello {
        background-color: #ffe;
    }
</style>

<template>
    <div>
        <nav class="sb-topnav navbar -navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" :href="window.ed.root+'/'"><img :src="window.ed.root+'/_web_elements/i/epidemicdata-logo.png'" style="max-width: 230px;" /></a><!--<button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button
        >-->
            <!-- Navbar-->
            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown"><a class="nav-link" :href="window.ed.root+'/about/'">About</a></li>
                <!--<li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">Settings</a><a class="dropdown-item" href="#">Activity Log</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="login.html">Logout</a>
                    </div>
                </li>-->
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">
                                <input class="form-control" type="text" placeholder="Search for Country, Region etc" aria-label="Search" aria-describedby="basic-addon2" style="width: 100%;" v-model="$root.search_value" @change="$root.search_refreshed()" />
                            </div>

                            <div class="sb-sidenav-menu-heading" v-show="Object.keys($root.menu_world).length">World</div>
                            <template v-for="(place, place_key) in this.$root.menu_world">
                                <a class="nav-link" :href="window.ed.root+'/'+place.uri" v-html="place.name"></a>
                            </template>

                            <div class="sb-sidenav-menu-heading"v-show="Object.keys($root.menu_countries).length">Countries</div>
                            <template v-for="(country, country_iso) in this.$root.menu_countries">
                                <a class="nav-link" :href="window.ed.root+'/'+country.uri"><span class="nav-link-label" v-html="country.name"></span> &nbsp;
                                    <span class="nav-link-number" v-html="country.TA+'/'+country.TC" title="Currently Active / Total Confirmed"></span></a>
                            </template>




                            <!--<div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth"
                                    >Authentication
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div
                                        ></a>
                                    <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav class="sb-sidenav-menu-nested nav"><a class="nav-link" href="login.html">Login</a><a class="nav-link" href="register.html">Register</a><a class="nav-link" href="password.html">Forgot Password</a></nav>
                                    </div>
                                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError"
                                    >Error
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div
                                        ></a>
                                    <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav class="sb-sidenav-menu-nested nav"><a class="nav-link" href="401.html">401 Page</a><a class="nav-link" href="404.html">404 Page</a><a class="nav-link" href="500.html">500 Page</a></nav>
                                    </div>
                                </nav>
                            </div>-->

                        </div>
                    </div>
                    <!--<div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        Start Bootstrap
                    </div>-->
                </nav>
            </div>
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
                            <div class="post">
                                <div class="post_date" style="font-weight: bold;">
                                27/03/2020:
                                </div>
                                <br>
                                As John Hopkins University announced they would stop providing numbers of recovered patients on 24 March, we developed a new methodology to estimate the number of recovered and active coronavirus cases accurately.<br>
                                <br>
                                The methodology is a result of several rounds of experimentation to find the function that most closely correlates with the previously available data from the John Hopkins University (until 24 March).<br>
                                <br>
                                We found that the recovery time of new confirmed cases is a normal distribution with a mean of 24 days and a standard deviation of 12 days (the death cases subtracted). The data generated by this function has a correlation coefficient of 0.999 with the previously existing cumulative data and a correlation coefficient of 0.995 with the previously existing daily new cases data.
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <h2 v-html="$root.page_title"></h2>

                    <div class="page_charts">
                        <template v-for="(chart, chart_key) in charts">
                            <div :id="'page_chart_container_'+chart_key">
                                <h4 v-html="chart.title"></h4>
                                <template v-if="chart.chart_type==='summary_table'">
                                    <epidemicdata-summary-table :chart_key="chart_key" :chart="chart"></epidemicdata-summary-table>
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
                                <a href="/about/">About</a>
                            </div>
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
		components: {
			'vueSlider': window[ 'vue-slider-component' ],
			//'epidemicdataGlobalMapPlain': httpVueLoader('/vue/epidemicdata-global-map-plain.vue'),
			'epidemicdataAnychartMapChoropleth': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-anychart-map-choropleth.vue'),
			'epidemicdataAnychartArea': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-anychart-area.vue'),
			'epidemicdataGoogleArea': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-google-area.vue'),
			'epidemicdataGoogleLine': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-google-line.vue'),
			'epidemicdataSummaryTable': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-summary-table.vue'),
		},
		//mixins: [my_mixin],
	}
</script>
