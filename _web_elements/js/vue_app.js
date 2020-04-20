console.log('vue app loaded');
function debounce (fn, delay) {
	var timeoutID = null;
	return function () {
		clearTimeout(timeoutID);
		var args = arguments;
		var that = this;
		timeoutID = setTimeout(function () {
			fn.apply(that, args)
		}, delay)
	}
}

window.app = new Vue({
	router,
	el: '#app',
	data: {
		name: '',
		show_mobile_menu: 0,
		date_list: [],
		date_labels: {},
		show_labels_on_every_nth_day: {'xs': 7, 'sm': 7, 'md': 5, 'lg': 3, 'xl': 3},
		start_date: '2020-01-22',
		end_date: '2020-03-12',
		moving_date: '',
		embedded: false,
		search_value: '',
		slider_value: ["2020-03-02", "2020-03-08"],
		slider_data: ['2020-02-29', '2020-03-01', '2020-03-02', '2020-03-03', '2020-03-04', '2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11'],
		slider_options: {
			dotSize: 14,
			width: 'auto',
			height: 4,
			contained: false,
			direction: 'ltr',
			data: null,
			min: 2,
			max: 100,
			interval: 3,
			disabled: false,
			clickable: true,
			duration: 0.5,
			adsorb: true,
			lazy: false,
			tooltip: 'active',
			tooltipPlacement: 'top',
			tooltipFormatter: void 0,
			useKeyboard: false,
			keydownHook: null,
			dragOnClick: false,
			enableCross: true,
			fixed: false,
			minRange: 3,
			maxRange: void 0,
			order: true,
			marks: false,
			dotOptions: void 0,
			process: true,
			dotStyle: void 0,
			railStyle: void 0,
			processStyle: void 0,
			tooltipStyle: void 0,
			stepStyle: void 0,
			stepActiveStyle: void 0,
			labelStyle: void 0,
			labelActiveStyle: void 0,
		},
		range_slider_options: {
			// dotSize: 14,
			// width: 'auto',
			// height: 4,
			// contained: false,
			// direction: 'ltr',
			// data: null,
			// min: 2,
			// max: 100,
			// interval: 3,
			// disabled: false,
			// clickable: true,
			// duration: 0.5,
			// adsorb: true,
			// lazy: false,
			// tooltip: 'active',
			// tooltipPlacement: 'top',
			// tooltipFormatter: void 0,
			// useKeyboard: false,
			// keydownHook: null,
			// dragOnClick: false,
			// enableCross: true,
			// fixed: false,
			// minRange: 3,
			// maxRange: void 0,
			// order: true,
			// marks: false,
			// dotOptions: void 0,
			// process: true,
			processDragable: true,
			processDraggable: true,
			// dotStyle: void 0,
			// railStyle: void 0,
			// processStyle: void 0,
			// tooltipStyle: void 0,
			// stepStyle: void 0,
			// stepActiveStyle: void 0,
			// labelStyle: void 0,
			// labelActiveStyle: void 0,
		},
		data_from_source: {},
		plain_data: [
			['Country', 'Popu01larity'],
			['Germany', 2000],
			['United States', 300],
			['Brazil', 400],
			['Canada', 500],
			['France', 300],
			['RU', 700]
		],
		charts: window.ed.charts,
	},
	created: function()
	{
		if (window.ed.is_chart)
		{
		let this_chart_key = Object.keys(this.$route.query)[0];
		let charts_copy = Object.assign({}, {}, this.charts);
		this.charts = {};
		this.charts[this_chart_key] = charts_copy[this_chart_key];
		//console.log("this_chart_key", this_chart_key);
		}
		console.log("window.app.$route.query", this.$route.query, );
		this.date_slider_changed = debounce(
			function(chart_key)
			{
				console.log("date_slider_changed START", chart_key);
				this.$root.recalculate_local_d(chart_key);
				this.$root.reload_chart_data(chart_key);
				console.log("date_slider_changed END", chart_key);
			}, 10);
		this.region_datatype_changed = debounce(
			function(chart_key)
			{
				console.log("region_datatype_changed START", chart_key);
				this.$root.reload_chart_data(chart_key);
				console.log("region_datatype_changed END", chart_key);
			}, 10);
		this.range_date_slider_changed = debounce(
			function(chart_key)
			{
				console.log("range_date_slider_changed START", chart_key);
				this.$root.recalculate_local_dr(chart_key);
				this.$root.set_route_query();
				replace_title_vars(chart_key);
				this.$root.refilter_chart_data_by_start_and_end_dates(chart_key);
				console.log("range_date_slider_changed END", chart_key);
			}, 10);
		this.scale_type_changed = debounce(
			function(chart_key, scale_type_tf)
			{
				console.log("scale_type_changed START", chart_key, scale_type_tf);
				// this.$root.recalculate_local_l(chart_key);
				// TODO: the url is broken now
				// this.$root.reload_google_chart_data(chart_key)
				this.$root.charts[chart_key].options.l = scale_type_tf?'m':'n';
				this.$root.set_route_query();
				this.$root.redraw(chart_key);
				console.log("scale_type_changed END", chart_key);
			}, 10);
		this.colormap_changed = debounce(
			function(chart_key)
			{
				console.log("scale_type_changed START", chart_key);
				// this.$root.recalculate_local_l(chart_key);
				// TODO: the url is broken now
				// this.$root.reload_google_chart_data(chart_key)
				this.$root.redraw(chart_key);
				console.log("scale_type_changed END", chart_key);
			}, 10);
		this.chart_format_changed = debounce(
			function(chart_key, new_format)
			{
				console.log("chart_format_changed START", chart_key);
				// this.$root.recalculate_local_l(chart_key);
				// TODO: the url is broken now
				// this.$root.reload_google_chart_data(chart_key)
				this.$root.charts[chart_key].options.f = new_format;
				this.$root.set_route_query();
				this.$root.redraw(chart_key);
				console.log("chart_format_changed END", chart_key);
			}, 10);
		
		console.log("vue created START");
		this.get_iso_countries_from_ajax_csv();
		console.log("vue created AFTER get_iso_countries_from_ajax_csv");
		
		
		
		for (chart_key in window.app.charts)
		{
			let chart = window.app.charts[chart_key];
			switch (chart.chart_type)
			{
			case "anychart_map_choropleth":
				switch (chart.map_type)
				{
				case 'world':
					load_script('https://cdn.anychart.com/releases/8.7.1/geodata/custom/world/world.json');
					break;
				}
				break;
			case "anychart_area":
				break;
			}
		}
		console.log("vue created AFTER for (chart_key in window.app.charts)");
		this.moving_date = new Date(window.ed.first_day_iso);
		let moving_date_string = window.ed.first_day_iso;
		let index = 0;
		while (moving_date_string < window.ed.last_day_iso)
		{
			// c_onsole.log('moving_date_string <= window.ed.last_day_iso', moving_date_string, window.ed.last_day_iso);
			moving_date_string = this.moving_date.toISOString().slice(0,10);
			this.date_list.push(moving_date_string);
			if (index % this.show_labels_on_every_nth_day[window.ed.screen_size] === 0)
			{
				this.date_labels[moving_date_string] = this.moving_date.toLocaleDateString('en-GB', {});
			}
			else
			{
				this.date_labels[moving_date_string] = '';
			}
			this.moving_date.setDate(this.moving_date.getDate()+1);
			index ++;
		}
		this.moving_date.setDate(this.moving_date.getDate()-1);
		moving_date_string = this.moving_date.toISOString().slice(0,10);
		this.date_labels[moving_date_string] = this.moving_date.toLocaleDateString('en-GB', {}); // the last one
		// c_onsole.log("this.date_list", this.date_list);
		// c_onsole.log("this.date_labels", this.date_labels);
		// c_onsole.log("vue created AFTER dates");
		
		google.charts.load('current', {
			'packages':['geochart', 'corechart', 'controls'],
			// Note: you will need to get a mapsApiKey for your project.
			// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
			//'mapsApiKey': 'AIzaSyB1tvCMsRfQjKT6Sfr5tnJ3nN2rUsEB4Q8'
			//'mapsApiKey': 'AIzaSyDNqmWZY267S933nSTe0gWK91_wzz7KseU'
		});
		console.log("vue created AFTER google load");
		for (let chart_key_index in this.charts)
		{
			if (this.charts.hasOwnProperty(chart_key_index))
			{
				let chart = this.charts[chart_key_index];
				console.log("chart.options", chart_key_index, chart.options);
				if (typeof(chart.options)!=='undefined')
				{
					chart.default_options = copy_object(chart.options);
				}
			}
		}
		console.log("vue created AFTER default_options");
		this.update_chart_options_from_query();
		console.log("vue created AFTER update_chart_options_from_query");
		console.log("vue created END");
	},
	mounted: function()
	{
		console.log("vue mounted START");
		this.$nextTick(function ()
		{
			setTimeout(function(){ // TODO: check if target div exists if not repeat with short timeout
				anychart.onDocumentReady(function ()
				{
					for (chart_key in window.app.charts)
					{
						if (window.app.charts.hasOwnProperty(chart_key))
						{
							if (typeof (window.app.charts[chart_key].force_place) !== 'undefined')
							{
								window.ed.place = window.app.charts[chart_key].force_place
							}
							//c_onsole.warn("CHART LOOP START", chart_key);
							window.app.get_chart_data_for_source(chart_key);
							//c_onsole.warn("CHART LOOP END", chart_key);
						}
					}
				});
			}, 1000);
		});
		console.log("vue mounted AFTER get_chart_data_for_source");
		google.charts.setOnLoadCallback(
			function()
			{
				console.warn('setOnLoadCallback');
				chart_key = '';
				for (chart_key in window.app.charts)
				{
					
					if (window.app.charts.hasOwnProperty(chart_key))
					{
						let chart = window.app.charts[chart_key];
						//////window.app.get_chart_data_for_source(chart_key);
						
						
						
						
						
						// window.app.redraw('global_map_plain');
						//
						// console.log('chart.options', chart.options, this.charts[chart_key].options);
						// let json_data = get_data_from_ajax_json("json/"+this.charts[chart_key]["data_json"]+".json");
						// console.log("json_data loaded on startup", json_data);
						// let filtered_data = filter_data_by_column_labels(json_data, this.charts[chart_key]["filter_by_columns"]);
						// console.log("filtered_data", filtered_data);
						// this.charts[chart_key].data = Object.assign([], this.charts[chart_key].data, json_data);
						// this.charts[chart_key].filtered_data = Object.assign([], this.charts[chart_key].filtered_data, filtered_data);
						// console.log("this.charts[chart_key].filtered_data", this.charts[chart_key].filtered_data)
						// // this.$set(this.someObjectOrArray, 'KeyorIndex', 'value)
					}
				}
			}
		);
		console.log("vue mounted AFTER google setOnLoadCallback");
		console.log("vue mounted END");
	},
	computed:
	{
		menu_countries: function () {
			return this.$root.search_place(window.ed.Country_iso_to);
			/*if(this.$root.search_value!=='')
			{
				let search_value = this.$root.search_value.toLowerCase();
				let ret = {};
				for (let [country_iso, country] of Object.entries(window.ed.Country_iso_to)) {
					if (country.iso.toLowerCase().includes(search_value) || country.name.toLowerCase().includes(search_value))
					{
						ret[country_iso] = country;
					}
				}
				return ret;
			}else{
				return window.ed.Country_iso_to;
			}*/
		},
		menu_world: function () {
			let worlds = {
				'world': {'uri': '', 'iso': '', 'name': 'World'},
				//'world-without-china': {'uri': 'world-without-china', 'iso': 'world-without-china', 'name': 'World w/o China'},
			};
			return this.$root.search_place(worlds);
			
			// if(this.$root.search_value!=='')
			// {
			// 	let search_value = this.$root.search_value.toLowerCase();
			// 	let ret = {};
			// 	for (let [country_iso, country] of Object.entries(window.ed.Country_iso_to)) {
			// 		if (country.iso.toLowerCase().includes(search_value) || country.name.toLowerCase().includes(search_value))
			// 		{
			// 			ret[country_iso] = country;
			// 		}
			// 	}
			// 	return ret;
			// }else{
			// 	return window.ed.Country_iso_to;
			// }
		}
	},
	methods:
		{
			search_place(source)
			{
				if(this.$root.search_value!=='')
				{
					let search_value = this.$root.search_value.toLowerCase();
					let ret = {};
					for (let [country_iso, country] of Object.entries(source))
					{
						if (country.iso.toLowerCase().includes(search_value) || country.name.toLowerCase().includes(search_value))
						{
							ret[country_iso] = country;
						}
					}
				return ret;
				}
				else
				{
				return source;
				}
			},
			search_refreshed: function()
			{
			console.log("search_refreshed", this.$root.search_value, this.$root.menu_countries);
			},
			torolheto: function()
			{
				
				
				
				if (this.embedded && typeof(this.$route.query.usa)!='undefined')
				{
					this.plain_data[2][1] =this.$route.query.usa;
				}
				
				
				// router.push({ path: 'testmap.html', query: { plan: 'private' } });
				console.log(this.$route.query);
				defaults = {test: 'val', plain_data: JSON.parse(JSON.stringify(this.plain_data)), obj: {a:'A',b:'B'}};
				this.plain_data[2][1] = 123;
				item2 = {test: 'val', plain_data: this.plain_data, obj: {a:'Ax',b:'B'}};
				result = difference.compare(this.chart_defaults, this.charts);
				console.log('********');
				console.log("chart_defaults", JSON.stringify(this.chart_defaults));
				console.log("charts", JSON.stringify(this.charts));
				console.log("result", JSON.stringify(result));
				console.log('********');
				item2_string = JSON.stringify(item2);
				//item2_string = item2_string.replace('[', '(').replace(']', ']').replace('=', ']');
				//router.push({ path: 'testmap.html', query: { item2: item2_string } });
				//history.replaceState(item2, "title 3", "?item2="+item2_string);
				console.log(this.$route.query);
			}
		},
	watch:
		{
			// page_title: {
			// 	immediate: true,
			// 	handler() {
			// 		document.title = this.page_title + ' - EpidemicData.com';
			// 	}
			// }
		},
	components: {
		'epidemicdataPage': httpVueLoader(window.ed.source_vue_location + '/epidemicdata-page.vue'),
	},
	mixins: [my_mixin],
});