<style>
</style>

<template>
    <div>
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div style="text-align: right; padding: 8px;" v-show="(window.ed.screen_size==='xs') || (window.ed.screen_size==='sm') || (window.ed.screen_size==='md')"><a href="#" @click.prevent.stop="$root.toggle_mobile_menu()" class="btn btn-secondary">Close menu</a></div>

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
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
	module.exports = {
		props: [
		//	'input'
        ],
		data: function() {
		//	return Object.assign({}, this.$props.input)
		},
        mounted: function(){
        },
		components: {
		},
		//mixins: [my_mixin],
	}
</script>
