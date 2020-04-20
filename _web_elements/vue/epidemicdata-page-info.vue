<!--suppress ALL -->
<style>

</style>

<template>
    <div>
        <div class="data_last_refreshed_block text_block">Data last refreshed: <span v-html="window.ed.last_refresh_time_locale+' (UTC)'"></span>, source: John Hopkins University (WHO, CDC, ECDC).</div>

        <template v-if="window.ed.place_type==='country'">
            <div class="text_block" style="margin-top: 12px;">
                <span v-html="$root.get_place_name_from_iso(window.ed.place)"></span> is part of:
                <span class="regions_of_countries">
                                    <template v-for="(continent, continent_index) in window.ed.continents">
                                        <template v-if="(typeof(continent['countries'])!=='undefined') && (continent['countries'].indexOf(window.ed.place)!==-1)">
                                            <span>, </span>
                                            <a :href="'/'+continent['uri']" v-html="continent['name']"></a>
                                        </template>
                                        <template v-for="(region, region_index) in continent['regions']">
                                            <template v-if="(typeof(region['countries'])!=='undefined') && (region['countries'].indexOf(window.ed.place)!==-1)">
                                                <span>, </span>
                                                <a :href="'/'+region['uri']" v-html="region['name']"></a>
                                            </template>
                                        </template>
                                    </template>
                                </span>
            </div>
        </template>
        <template v-else-if="window.ed.place_type==='region'">
            <div class="text_block" style="margin-top: 12px;">
                <span v-html="$root.get_place_name_from_iso(window.ed.place)"></span> contains:
                <span class="regions_of_countries">
                    <template v-for="(continent, continent_index) in window.ed.continents">
                        <template v-if="continent['uri']===window.ed.place">
                            <template v-for="region in continent['regions']">
                            <span>, </span>
                                <a :href="'/'+region['uri']" v-html="region['name']"></a>
                            </template>

                            as regions

                            <template v-for="country_code in continent['countries']">
                            <span>, </span>
                                <template v-if="typeof(window.ed.Country_iso_to[country_code])!=='undefined'">
                                <a :href="'/'+window.ed.Country_iso_to[country_code]['uri']" v-html="window.ed.Country_iso_to[country_code]['name']"></a>
                                </template>
                                <!--<template v-else>
                                <span v-html="country_code"></span>
                                </template>-->
                            </template>
                        </template>
                        <template v-for="(region, region_index) in continent['regions']">
                            <template v-if="region['uri']===window.ed.place">
                                <template v-for="country_code in region['countries']">
                                <span>, </span>
                                    <template v-if="typeof(window.ed.Country_iso_to[country_code])!=='undefined'">
                                    <a :href="'/'+window.ed.Country_iso_to[country_code]['uri']" v-html="window.ed.Country_iso_to[country_code]['name']"></a>
                                    </template>
                                    <!--<template v-else>
                                    <span v-html="country_code"></span>
                                    </template>-->
                                </template>
                            </template>
                        </template>
                    </template>
                            as countries.
                </span>
            </div>
        </template>
    </div>
</template>

<script>
	module.exports = {
		props: [],
		data: function() {

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
		},
		//mixins: [my_mixin],
	}
</script>
