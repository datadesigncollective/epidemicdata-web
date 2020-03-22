console.log('my_mixin loaded');
var my_mixin = {
	created: function() {
	
	},
	methods: {
		to_locale_string: function(datestring)
		{
		let dt = new Date(datestring);
		let ret = dt.toLocaleDateString('en-GB', {});
		return ret;
		},
		update_chart_options_from_query: function ()
		{
			for (let chart_key_index in this.$route.query)
			{
				if (
					(typeof(this.$root.charts[chart_key_index])!=='undefined') &&
					(typeof(this.$root.charts[chart_key_index].options!=='undefined'))
				)
				{
					let chart_options_from_url = JSON.parse(this.$route.query[chart_key_index]);
					this.$root.charts[chart_key_index].options = Object.assign({}, this.$root.charts[chart_key_index].options, chart_options_from_url);
				}
				
				
				this.$root.recalculate_local_d(chart_key_index);
			}
		},
		recalculate_local_d: function(chart_key)
		{
			this.$root.charts[chart_key].local_d = this.$root.to_locale_string(this.$root.charts[chart_key].options.d);
		},
		get_query_from_chart_options: function ()
		{
		ret = {};
			for (let chart_key_index in this.$root.charts)
			{
			let chart = this.$root.charts[chart_key_index];
				if (typeof(chart.options)!=='undefined')
				{
					// todo: create default and compare
					diff = difference.compare(chart.default_options, chart.options);
					console.log("get_query_from_chart_options", "diff", diff, "default_options", chart.default_options, "options", chart.options);
					for (let [var_key, var_val] of Object.entries(diff))
					{
						if (Array.isArray(var_val) && (var_val.length===0))
						{
						delete(diff[var_key])
						}
					}
					if (Object.keys(diff).length)
					{
					ret[chart_key_index] = JSON.stringify(diff); // .replace('"c"', 'c').replace('"d"', 'd');
					}
				}
			}
		//ret_json = JSON.stringify(ret);
		//c_onsole.log("options", ret, ret_json, ret_json_w);
		return ret;
		},
		reload_chart_data: function(chart_key)
		{
			query = this.$root.get_query_from_chart_options();
			if (Object.keys(query).length)
			{
				try{
					router.replace({ path: window.location.pathname, query: query });
				}
				catch(error)
				{
					console.error("Catch:", error);
				}
			}
			else
			{
				try{
					router.replace({ path: window.location.pathname});
				}
				catch(error)
				{
					console.error("Catch:", error);
				}
			}
			// history.replaceState(item2, "title 3", "?item2="+item2_string);
		this.$root.get_chart_data_for_source(chart_key);
		this.$root.recalculate_embed_url(chart_key);
		},
		reload_google_chart_data: function(chart_key, replace_router=true)
		{
			let query = this.$root.get_query_from_chart_options();
			console.log("reload_google_chart_data", "query", query);
			if (Object.keys(query).length)
			{
				let has_diff = true;
				// let has_diff = false;
				// console.log('this.$route.query', this.$route.query);
				// for ([var_key, var_json] of Object.entries(this.$route.query))
				// {
				// 	let var_val = JSON.parse(var_json);
				// 	if (typeof(query[var_key])==='undefined')
				// 	{
				// 	has_diff = 1;
				// 	}
				// 	else
				// 	{
				// 		let diff = difference.compare(query[var_key], var_val);
				// 		if (Object.keys(diff).length)
				// 		{
				// 		has_diff = 2;
				// 		}
				// 	}
				// }
				
				console.log("router.replace", window.location.search, query, has_diff);
				if (has_diff && replace_router)
				{
					router.replace({ path: window.location.pathname, query: query });
				}
			}
			else
			{
				if (replace_router)
				{
					router.replace({ path: window.location.pathname});
				}
			}
		this.$root.recalculate_embed_url(chart_key);
		let chart = this.$root.charts[chart_key];
		let view = new google.visualization.DataView(chart.google.datatable);
		let number_of_original_columns = chart.filtered_data[0].length - 1;
		// let hide_columns = [...Array(number_of_original_columns-1).keys()];
		// view.hideColumns(hide_columns);
		// view.showColumns(chart.options.c);
		
		let colors = Object.assign([], [], chart.column_colors);
		let hide_columns = [];
		console.log("number_of_original_columns, colors, chart.options.c", number_of_original_columns, Object.assign([], [], colors), chart.options.c);
		for (let i=1, c=number_of_original_columns; i<=c; i++)
		{
			let j = i-1;
			console.log("j", j);
			if (chart.options.c.indexOf(j)===-1)
			{
				console.log("j", j, "HIDE");
				hide_columns.push(j+1);
				colors[j] = null;
			}
			else
			{
				console.log("j", j, "ok");
			}
		}
			view.hideColumns(hide_columns);
		console.log("hide_columns, new 1 colors", hide_columns, Object.assign([], [], colors));
		
		chart.google.options.colors = [];
		for (let i=0, c=colors.length; i<c; i++)
		{
			if (colors[i]!==null)
			{
				chart.google.options.colors.push(colors[i]);
			}
		}
			console.log("hide_columns, chart.google.options.colors", hide_columns, Object.assign([], [], chart.google.options.colors));
		
		chart.google.graph.draw(view, chart.google.options);
		},
		get_place_name_from_iso: function(country_iso)
		{
			let ret = '';
			if (country_iso === 'world')
			{
			ret = 'World';
			}
			else if (country_iso === 'world-without-china')
			{
			ret = 'World Without China';
			}
			else if (country_iso === 'data-source')
			{
			ret = 'Data';
			}
			else if (typeof(window.ed.Country_iso_to[country_iso])!=='undefined')
			{
			ret = window.ed.Country_iso_to[country_iso].name;
			}
			else
			{
			console.error('get_place_name_from_iso has no place for ['+country_iso+']');
			}
		return ret;
		},
		get_chart_data_for_source: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			console.log("get_chart_data_for_source START chart_key", chart_key, chart.chart_type);
			let data_source = chart.data_source;
			let data_source_type = 'js';
				switch (chart.chart_type)
				{
					// case "global_map_plain":
					// data_source = data_source.replace('%c%', chart.options.c.replace(/ /g, '_')).replace('%d%', chart.options.d);
					// break;
					case "anychart_map_choropleth":
					data_source = data_source.replace('%c%', chart.options.c.replace(/ /g, '_')).replace('%d%', chart.options.d);
					data_source_type = 'csv';
					chart.full_title = chart.title;
					break;
					case "anychart_area":
					data_source = data_source.replace('%p%', window.ed.place);
					data_source_type = 'csv';
					break;
					case "google_area":
					case "google_line":
						chart.full_title = chart.full_title.replace('%P%', this.$root.get_place_name_from_iso(window.ed.place));
						data_source = chart.data_source = chart.data_source.replace('%p%', window.ed.place.toLowerCase());
						chart.data_source_var = chart.data_source_var.replace('%p%', window.ed.place.toLowerCase());
						console.log("get_chart_data_for_source chart.data_source", chart.data_source);
					break;
					default:
						console.trace();
						console.error("chart_type doesnt exist ["+chart.chart_type+"]");
					break;
				}
			chart.full_filename = chart.full_title.replace(/ /g, '_').replace(/\<br\>/g, '_').replace(/[^A-Za-z0-9-_]/g, '');
				
				if (1 || typeof(chart.original_data)=='undefined')
				{
					switch (data_source_type)
					{
						case "js":
						console.log("BEFORE js data source loading starts", chart_key);
						if (typeof(window.ed[chart.data_source_var])==='undefined')
						{
							console.log("data source loading needed", chart_key, data_source, chart.data_source_var);
							load_script(window.ed.data_folder+data_source, function(){
								console.log("js data source loaded", chart_key, window.ed.sum_by_world_Total_Combined_DARC);
								chart.original_data = Object.assign([], [], window.ed[chart.data_source_var]);
								chart.filtered_data = Object.assign([], [], window.ed[chart.data_source_var]);
								window.app.$root.refilter_chart_data_by_columns(chart_key);
							});
						}
						else
						{
							console.log("data source loading NOT needed", chart_key);
							chart.original_data = Object.assign([], [], window.ed[chart.data_source_var]);
							chart.filtered_data = Object.assign([], [], window.ed[chart.data_source_var]);
							this.$root.refilter_chart_data_by_columns(chart_key);
						}
						console.log("AFTER js data source  loading starts");
						break;
						
						case 'csv':
						console.log("BEFORE csv loading");
						let data_source_url = window.ed.data_folder+data_source+".csv";
						this.$root.data_from_source[data_source] = this.$root.get_data_from_ajax_csv(data_source_url);
						chart.original_data =  this.$root.data_from_source[data_source]['original_data'];
						chart.min_value =  this.$root.data_from_source[data_source]['min_value'];
						chart.max_value =  this.$root.data_from_source[data_source]['max_value'];
						chart.second_min_value =  this.$root.data_from_source[data_source]['second_min_value'];
						chart.second_max_value =  this.$root.data_from_source[data_source]['second_max_value'];
							
							if ((chart.min_value - Math.round(chart.min_value) === 0) && (chart.second_min_value - Math.round(chart.second_min_value) === 0))
							{
								chart.used_min_value = Math.round((chart.min_value + chart.second_min_value * 3) / 4);
							}
							else
							{
								chart.used_min_value = (chart.min_value + chart.second_min_value * 3) / 4;
							}
							if ((chart.max_value - Math.round(chart.max_value) === 0) && (chart.second_max_value - Math.round(chart.second_max_value) === 0))
							{
								chart.used_max_value = Math.round((chart.max_value + chart.second_max_value * 3) / 4);
							}
							else
							{
								chart.used_max_value = (chart.max_value + chart.second_max_value * 3) / 4;
							}
							
							//c_onsole.log("chart.original_data", chart.options.c, chart.original_data, chart.min_value, chart.second_min_value, chart.used_min_value, chart.max_value, chart.second_max_value, chart.used_max_value);
							this.$root.refilter_chart_data_by_columns(chart_key)
						break;
						
					}
					
				}
		},
		ensure_epidemicdata: function()
		{
			if (typeof(window.epidemicdata)==='undefined')
			{
				window.epidemicdata = {};
			}
		},
		get_country_name: function(country_iso)
		{
			country_iso = country_iso.toUpperCase();
			this.$root.ensure_epidemicdata();
			if (typeof(window.epidemicdata.countries_iso_to)==='undefined')
			{
				window.epidemicdata.countries_iso_to = this.$root.get_iso_countries_from_ajax_csv();
			}
			if (typeof(window.epidemicdata.countries_iso_to[country_iso])==='undefined')
			{
				return 'Unkown Country ['+country_iso+']';
			}
			else
			{
				return window.epidemicdata.countries_iso_to[country_iso]['name'];
			}
		},
		get_iso_countries_from_ajax_csv: function()
		{
			// let url = '/p/data/variables/Country_iso_to.csv';
			// let arr = $.csv.toArrays($.ajax({
			// 	url: url,
			// 	dataType: "csv",
			// 	async: false
			// }).responseText);
			// console.log("get_iso_countries_from_ajax_csv arr", arr);
			// let arr = window.ed.Country_iso_to;
			// let arr_header = arr[0];
			// let arr_content = arr.slice(1);
			// let fullobj = {};
			// 	for (let ri=0, rl=arr_content.length; ri<rl; ri++)
			// 	{
			// 		let row_obj = {};
			// 		for (let ci=1, cl=arr_content[ri].length; ci<cl; ci++)
			// 		{
			// 			row_obj[arr_header[ci]] = arr_content[ri][ci];
			// 		}
			// 		fullobj[arr_content[ri][0].toUpperCase()] = row_obj;
			// 	}
			let fullobj = window.ed.Country_iso_to;
			console.log("get_iso_countries_from_ajax_csv fullobj", fullobj);
			return fullobj;
		},
		get_data_from_ajax_csv: function(url)
		{
			arr = $.csv.toArrays($.ajax({
				url: url,
				dataType: "csv",
				async: false
			}).responseText);
			let min_value = null;
			let max_value = null;
			let second_min_value = null;
			let second_max_value = null;
			let row_index_where_min_value_is = null;
			let row_index_where_max_value_is = null;
			for (ri=1, rl=arr.length; ri<rl; ri++)
			{
				for (ci=1, cl=arr[ri].length; ci<cl; ci++)
				{
				let current_number = parseFloat(arr[ri][ci]);
				arr[ri][ci] = current_number;
					if ((min_value===null) || (min_value > current_number))
					{
					min_value = current_number;
					row_index_where_min_value_is = ri;
					}
					if ((max_value===null) || (max_value < current_number))
					{
					max_value = current_number;
					row_index_where_max_value_is = ri;
					}
				}
			}
			for (ri=1, rl=arr.length; ri<rl; ri++)
			{
				for (ci=1, cl=arr[ri].length; ci<cl; ci++)
				{
				let current_number = parseFloat(arr[ri][ci]);
				arr[ri][ci] = current_number;
					if ((row_index_where_min_value_is!==ri) && ((second_min_value===null) || (second_min_value > current_number)))
					{
					second_min_value = current_number;
					}
					if ((row_index_where_max_value_is!==ri) && ((second_max_value===null) || (second_max_value < current_number)))
					{
					second_max_value = current_number;
					}
				}
			}
			
			return {'original_data': arr, 'min_value': min_value, 'max_value': max_value, 'second_min_value': second_min_value, 'second_max_value': second_max_value};
		},
		redraw: function (chart_key)
		{
			let chart = this.$root.charts[chart_key];
			switch (chart.chart_type)
			{
			case "global_map_plain":
				this.$root.draw_geo_chart(chart_key);
			break;
			case "anychart_map_choropleth":
				// c_onsole.log("redraw, anychart_map_choropleth");
				window.app.$root.draw_anychart_choropleth_map(chart_key);
				// anychart.onDocumentReady(function ()
				// {
				//
				// });
			break;
			case "anychart_area":
				window.app.$root.draw_anychart_area(chart_key);
			break;
			case "google_area":
				google.charts.setOnLoadCallback(function(){
					window.app.$root.draw_google_area(chart_key);
				});
			break;
			case "google_line":
				google.charts.setOnLoadCallback(function(){
					window.app.$root.draw_google_line(chart_key);
				});
			break;
			
			default:
				console.trace();
				console.error("chart_type doesnt exist ["+chart.chart_type+"]");
			break;
			}
			
			// query = JSON.parse(JSON.stringify(this.$route.query));
			// query.usa=this.plain_data[2][1];
			// router.replace({ path: this.$route.path, query: query });
		},
		draw_google_area: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			let data = chart.filtered_data;
			console.log("draw_google_area chart_key data", chart_key, data);
			var datatable = google.visualization.arrayToDataTable(data);
			//let container = document.getElementById('google_chart_'+chart_key);
			
			var options = {
				title: '',
				titlePosition: 'none',
				isStacked: true,
				legend: {position: 'top', maxLines: 3},
				hAxis: {titleTextStyle: {color: '#333'}},
				vAxis: {titleTextStyle: {color: '#333'}},
				// vAxis: {
				// 	// minValue: 0,
				// 	// textPosition: 'in'
				// },
				// selectionMode: 'multiple',
				// tooltip: {trigger: 'selection'},
				// //aggregationTarget: 'category',
				// aggregationTarget: 'series',
				areaOpacity: 0.7,
				colors: chart.column_colors,
				seriesType: 'area',
				//series: {3: {type: 'line'}},
				//width: container.offsetWidth,
				chartArea: {right: 0, width: '90%', top: '15%', height: '75%', },
				curveType: 'function',
			};
			console.log("options", options);
			
			//var graph = new google.visualization.ComboChart(container);
			
			var wrapper = new google.visualization.ChartWrapper({
				chartType: 'ComboChart',
				dataTable: datatable,
				options: options,
				containerId: 'google_chart_'+chart_key
			});
			
			//let view = new google.visualization.DataView(datatable);
			if ((typeof(chart.hide_columns)!=='undefined') && (chart.hide_columns.length))
			{
				wrapper.setView({'columns': [0,1,2,3]});
			}
			//graph.draw(view, options);
			wrapper.draw();
			console.log("wrapper.getOptions()", wrapper.getOptions());
			
			
			chart.google = {datatable: datatable, wrapper: wrapper, options: options};
		},
		draw_google_area_backup: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			let data = chart.filtered_data;
			console.log("draw_google_area chart_key data", chart_key, data);
			var datatable = google.visualization.arrayToDataTable(data);
			
			//$container = $();
			let container = document.getElementById('google_chart_'+chart_key);
			
			var options = {
				title: '',
				titlePosition: 'none',
				isStacked: true,
				legend: {position: 'top', maxLines: 3},
				hAxis: {titleTextStyle: {color: '#333'}},
				vAxis: {titleTextStyle: {color: '#333'}},
				// vAxis: {
				// 	// minValue: 0,
				// 	// textPosition: 'in'
				// },
				// selectionMode: 'multiple',
				// tooltip: {trigger: 'selection'},
				// //aggregationTarget: 'category',
				// aggregationTarget: 'series',
				areaOpacity: 0.7,
				colors: chart.column_colors,
				seriesType: 'area',
				//series: {3: {type: 'line'}},
				//width: container.offsetWidth,
				chartArea: {right: 0, width: '90%', top: '15%', height: '75%', },
				curveType: 'function',
			};
			console.log("options", options);
			
			//var graph = new google.visualization.AreaChart(document.getElementById('google_chart_'+chart_key));
			var graph = new google.visualization.ComboChart(container);
			let view = new google.visualization.DataView(datatable);
			if (typeof(chart.hide_columns)!=='undefined')
			view.hideColumns(chart.hide_columns);
			graph.draw(view, options);
			chart.google = {datatable: datatable, graph: graph, options: options, container: container};
		},
		draw_google_line: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			let data = chart.filtered_data;
			var datatable = google.visualization.arrayToDataTable(data);
			
			//$container = $();
			let container_id = 'google_chart_'+chart_key;
			let container = document.getElementById(container_id);
			console.log("container", container_id, container.length, container);
			var options = {
				title: '',
				titlePosition: 'none',
				//isStacked: true,
				legend: {position: 'top', maxLines: 3},
				hAxis: {titleTextStyle: {color: '#333'}},
				vAxis: {titleTextStyle: {color: '#333'}},
				vAxis: {
					// minValue: 0,
					// textPosition: 'in'
				},
				// selectionMode: 'multiple',
				// tooltip: {trigger: 'selection'},
				// //aggregationTarget: 'category',
				// aggregationTarget: 'series',
				//areaOpacity: 0.7,
				colors: chart.column_colors,
				seriesType: 'line',
				//series: {3: {type: 'line'}},
				//width: container.offsetWidth,
				chartArea: {right: '0%', width: '90%', top: '15%', height: '75%', },
				curveType: 'function'
			};
			console.log("options", options);
			
			//var graph = new google.visualization.AreaChart(document.getElementById('google_chart_'+chart_key));
			var graph = new google.visualization.ComboChart(container);
			graph.draw(datatable, options);
			chart.google = {datatable: datatable, graph: graph, options: options, container: container};
			this.reload_google_chart_data(chart_key, false);
		},
		draw_geo_chart: function(chart_key)
		{
			return false;
			console.warn('draw_geo_chart', chart_key);
			let chart = this.$root.charts[chart_key];
			let min_color = chart.columns[chart.options.c].min_color;
			let zero_color = chart.columns[chart.options.c].zero_color;
			let max_color = chart.columns[chart.options.c].max_color;
			let color_axis = {};
			// TODO: check min and max values, if min_value<0, add 3 colors
			// TODO: different colors for different charts as Recovered vs Deaths
			// https://plot.ly/python/builtin-colorscales/
				if (chart.used_min_value < 0)
				{
					color_axis = {
						colors: [min_color, min_color, zero_color, max_color, max_color],
						values: [chart.min_value, chart.used_min_value, 0, chart.used_max_value, chart.max_value]
					};
				}
				else
				{
					color_axis = {
						colors: [zero_color, max_color, max_color],
						values: [0, chart.used_max_value, chart.max_value]
					};
				}
			var options = {
				// TODO: if there is an option, put it here
				colorAxis: color_axis,
				backgroundColor: '#f7fcfd',
				datalessRegionColor: 'white',
				defaultColor: '#f5f5f5',
			};
				
				if ((typeof(chart.google.graph)=='undefined') || (chart.google.graph==null))
				{
					let element_id = "google_chart_"+chart_key;
					// c_onsole.log("create new GeoChart", element_id, google, google.visualization);
					// c_onsole.log("document.getElementById(element_id)", document.getElementById(element_id));
					chart.google.graph = new google.visualization.GeoChart(document.getElementById(element_id));
				}
			let partial_filtered_data = [];
				for (ri=0, rl=chart.filtered_data.length; ri<3; ri++)
				{
					partial_filtered_data.push(chart.filtered_data[ri]);
				}
			// c_onsole.log("chart.filtered_data", chart.filtered_data, "partial_filtered_data", partial_filtered_data);
			var data_table = google.visualization.arrayToDataTable(chart.filtered_data);
			chart.google.graph.draw(data_table, options);
		},
		draw_anychart_choropleth_map: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			if ((typeof(chart.anychart)=='undefined') || (chart.anychart==null))
			{
				var data = chart.filtered_data;
				var dataset = anychart.data.set(data);
				
				var map = anychart.map();
				console.log("anychart.maps['world']", anychart.maps['world']);
				map.geoData(anychart.maps['world']); // TODO: from map_type
				
				// stroke the undefined regions
				//map.unboundRegions().stroke('green');
				
				map.title().useHtml(true).hAlign('center');
				map.title('<span class="graph_title">'+this.$root.charts[chart_key].options.c+' on '+this.$root.charts[chart_key].options.d+'</span>'); // [].local_d
				
				// set the colorRange preferences
				// var cr = map.colorRange();
				// cr.colorLineSize(15);
				// cr.align('center');
				// cr.stroke(null);
				// cr.ticks().stroke('rgb(216,216,216)');
				// cr.ticks().position('center').length(15);
				
				let series = map.choropleth(dataset);
				//series = map.choropleth(data);
				series.stroke('#000 .3');
				series.labels().fontColor('black');
				
				// define the color of the hovered district
				series.selected().fill('#5588ff');
				
				// making of the ordinal colorRange
				// ocs = anychart.scales.ordinalColor([
				// 	{less: 100},
				// 	{from: 100, to: 150},
				// 	{from: 150, to: 200},
				// 	{from: 200, to: 350},
				// 	{greater: 250}
				// ]);
				// ocs.colors(['rgb(253,225,86)', 'rgb(248,196,57)', 'rgb(244,168,19)', 'rgb(198,109,1)', 'rgb(152,58,0)']);
				// tell the series what to use as a colorRange (colorScale)
				//series.colorScale(ocs);
				
				// series.colorScale(anychart.scales.linearColor('#deebf7', '#3182bd'));
				
				// series.fill(coloringFunction);

// custom coloring function
				
				function coloring_function()
				{
					if (typeof(this.iterator.f)==='undefined')
					{
						return '#ff0000'; // TODO: remove
					}
					else
					{
						let chart_key = window.last_chart_key;
						let val = this.iterator.f.value;
						let chart = window.app.$root.charts[chart_key];
						let min_color = chart.columns[chart.options.c].min_color;
						let zero_color = chart.columns[chart.options.c].zero_color;
						let max_color = chart.columns[chart.options.c].max_color;
						let positive_scale = chroma.scale([zero_color, max_color], );
						let sc = '';
						if (chart.min_value < 0)
						{
							sc = chroma.scale([min_color, min_color, zero_color, max_color, max_color]).domain([chart.min_value, chart.used_min_value, 0, chart.used_max_value, chart.max_value], 7,'log').mode('lab');
						}
						else
						{
							sc = chroma.scale([zero_color, max_color]).domain([0, chart.max_value], 7,'log').mode('lab');
						}
						
						let ret = sc(val).hex();
						// c_onsole.log("color scale(val)", val, ret, chart.min_value, 0, chart.max_value, min_color, zero_color, max_color);
						return ret;
					}
				}
				
				window.last_chart_key = chart_key;
				series.fill(coloring_function); // anychart.scales.linearColor(chart.columns[chart.options.c].zero_color, chart.columns[chart.options.c].max_color)
				// c_onsole.log("before series.colorScale");
				series.colorScale(coloring_function); // anychart.scales.linearColor(chart.columns[chart.options.c].zero_color, chart.columns[chart.options.c].max_color)
				// c_onsole.log("after series.colorScale");
				
				var colorRange = map.colorRange();
				colorRange.enabled(true);
				colorRange.length('90%');
				// series.hovered().fill('#addd8e');
				series.hovered().stroke('#333333', 2, '4 4', 'round');
				series.hovered().fill(function () {
					return this.sourceColor;
				});
				map.unboundRegions().fill('#fcfcfc');
				
				// let container_id = 'any_chart_global_map_plain_new';
				let container_id = 'any_chart_'+chart_key;
				// c_onsole.log("any_chart container " + container_id + " element", document.getElementById('container_id'));
				// setTimeout(function ()
				// {
				// 	//c_onsole.log("any_chart container " + container_id + " element", document.getElementById('container_id'))
				// }, 1000);
				//anychart.data.set(data);
				map.container(container_id);
				// c_onsole.log("before map.draw()");
				map.draw();
				// c_onsole.log("after map.draw()");
				chart.anychart = {'dataset': dataset, 'map': map, 'series': series};
				this.$root.anychart_chropleth_set_scale(chart_key);
			}
			else
			{
				// c_onsole.log("before chart.anychart.dataset.data");
				chart.anychart.dataset.data(chart.filtered_data);
				chart.anychart.map.title('<span class="graph_title">'+this.$root.charts[chart_key].options.c+' on '+this.$root.charts[chart_key].local_d+'</span>');;
				this.$root.anychart_chropleth_set_scale(chart_key);
			}
		},
		draw_anychart_area: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			if ((typeof(chart.anychart)=='undefined') || (chart.anychart==null))
			{
				//var data = chart.filtered_data;
				
				console.log('area chart.filtered_data;', chart.filtered_data);
				
				let data_header = chart.filtered_data[0];
				data_header.shift();
				let data_content = chart.filtered_data.slice(1);
				let first_day = data_content[0][0];
				let last_day = data_content[data_content.length-1][0];
				
				// create a data set
				var data = anychart.data.set(
					data_content
				// 	[
				// 	["Winter", 20000, 40000, 20000],
				// 	["Spring", 20000, 40000, 40000],
				// 	["Summer", 40000, 30000, 30000],
				// 	["Autumn", 20000, 20000, 40000]
				// ]
				);
				
				// map the data
				
				// var seriesData_2 = data.mapAs({x: 0, value: 2});
				// var seriesData_3 = data.mapAs({x: 0, value: 3});
				
				// create a chart
				var graph = anychart.area();
				
				// enable the value stacking mode
				graph.yScale().stackMode("value");
				
				let data_series_list = [];
				let area_series_list = [];
				for (let i=1, c=chart.filtered_data.length; i<c; i++)
				{
					if (i===chart.filtered_data.length-1)
					{
						console.log("creating data_series_list, i=", i, chart.filtered_data[i]);
					}
					data_series_list[i-1] = data.mapAs({x: 0, value: i});
					area_series_list[i-1] = graph.area(data_series_list[i-1]);
					area_series_list[i-1].name(data_header[i-1]);
					area_series_list[i-1].normal().fill(chart.column_colors[i-1], 0.9);
					area_series_list[i-1].normal().hatchFill(chart.column_hatches[i-1], chart.column_colors[i-1], 1, 15);
					//area_series_list[i-1].hover().hatchFill(chart.column_hatches[i-1], chart.column_colors[i-1], 1, 15);
					// area_series_list[i-1].hovered().fill(chart.column_colors[i-1], 0.9);
					//area_series_list[i-1].selected().fill(chart.column_colors[i-1], 0.5);
					area_series_list[i-1].normal().stroke(chart.column_colors[i-1], 2);
					area_series_list[i-1].markers(false);
					let scale = area_series_list[i-1].xScale();
					let ticks = scale.ticks();
					// ticks.set([this.$root.to_locale_string('2020-02-02'), this.$root.to_locale_string('2020-02-09'), this.$root.to_locale_string('2020-02-16'), this.$root.to_locale_string('2020-02-23'), this.$root.to_locale_string('2020-03-01'), this.$root.to_locale_string('2020-03-08'), this.$root.to_locale_string('2020-03-15')]);
					ticks.interval(7);
					// area_series_list[i-1].hovered().stroke(chart.column_colors[i-1], 1);
					//area_series_list[i-1].selected().stroke(chart.column_colors[i-1], 4, "10 5", "round");
					// c_onsole.log("data_series_list["+(i-1)+"]", data_series_list[i-1]);
					// c_onsole.log("area_series_list["+(i-1)+"]", area_series_list[i-1]);
				}
				
				// create area series, set the data
				// var series1 = graph.area(seriesData_1);
				// var series2 = graph.area(seriesData_2);
				// var series3 = graph.area(seriesData_3);
				
				// configure tooltips
				graph.tooltip().format("{%seriesName}: {%value} ({%yPercentOfCategory}{decimalsCount:2}%)");
				
				graph.xGrid().enabled(true);
				graph.yGrid().enabled(true);
				
				// configure labels on the y-axis
				graph.yAxis().labels().format("{%value}");
				
				// set the chart title
				graph.title().useHtml(true).hAlign('center');
				graph.title('<span class="graph_title">Recovered Cases, Active Cases and Deaths in '+this.$root.get_country_name(window.ed.place)+'<br>'
					+ first_day+' - '+last_day);
				
				// set the container id
				let container_id = 'any_chart_'+chart_key;
				graph.container(container_id);
				
				// initiate drawing the chart
				graph.draw();
			}
			else
			{
				// c_onsole.log("before chart.anychart.dataset.data");
				// chart.anychart.dataset.data(chart.filtered_data);
				// this.$root.anychart_chropleth_set_scale(chart_key);
			}
		},
		anychart_chropleth_set_scale: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			let lc = anychart.scales.linearColor(chart.columns[chart.options.c].zero_color, chart.columns[chart.options.c].max_color);
			// c_onsole.log("anychart.scales.linearColor", lc);
			chart.anychart.series.colorScale(lc);
			let colorscale = chart.anychart.series.colorScale();
			colorscale.min = chart.local_min_value;
			colorscale.ticks().interval(Math.round((colorscale.max - colorscale.min)/10));
			let colorscale_min = colorscale.min;
			let colorscale_max = colorscale.max;
			
			// let $scale_path = $("#any_chart_global_map_plain_new svg path[fill^='url']").first();
			// let gradient_selector_url = $scale_path.attr("fill");
			// let gradient_selector_url_parts = gradient_selector_url.split('"');
			// let linear_scale_selector = gradient_selector_url_parts[1];
			let linear_scale_selector = '#any_chart_global_map_plain_new svg > defs > linearGradient';
			let $linear_scales = $(linear_scale_selector);
			$linear_scales.each(
				function(index, linear_scale)
				{
					let $linear_scale = $(linear_scale);
					// if (!index)
					// {
					// 	// c_onsole.log("$linear_scales", index, $linear_scale.attr('id'), $linear_scale);
					// }
					let stop_settings = [];
					if (colorscale_min < 0)
					{
						let range = colorscale_max - colorscale_min; // min_value is negative, so this is adding
						let used_min_diff = chart.local_used_min_value - colorscale_min; // adding
						let zero_diff = 0 - colorscale_min; // adding
						let used_max_diff = chart.local_used_max_value - colorscale_min; // adding
						let used_min_position = Math.round(used_min_diff / range * 100);
						let used_zero_position = Math.round(zero_diff / range * 100);
						let used_max_position = Math.round(used_max_diff / range * 100);
						if (chart.local_used_min_value < (colorscale_min / 5))
						{
							// if (!index)
							// {
							// 	c_onsole.log('colorscale_min NEGATIVE NEGATIVE',
							// 		{
							// 			'min_value': colorscale_min,
							// 			'original min_value': chart.local_min_value,
							// 			'used_min_value': chart.local_used_min_value,
							// 			'zero_value': 0,
							// 			'used_max_value': chart.local_used_max_value,
							// 			'max_value': colorscale_max,
							// 			'original max_value': chart.local_max_value,
							// 			'range': range,
							// 			'used_min_diff': used_min_diff,
							// 			'zero_diff': zero_diff,
							// 			'used_max_diff': used_max_diff,
							// 			'used_min_position': used_min_position,
							// 			'used_zero_position': used_zero_position,
							// 			'used_max_position': used_max_position,
							// 		}
							// 	);
							// }
							stop_settings[0] = {'id': 'used_min', 'offset': used_min_position+'%', 'stop-color': chart.columns[chart.options.c].min_color};
							stop_settings[1] = {'id': 'zero', 'offset': used_zero_position+'%', 'stop-color': chart.columns[chart.options.c].zero_color};
							stop_settings[2] = {'id': 'used_max', 'offset': used_max_position+'%', 'stop-color': chart.columns[chart.options.c].max_color};
							stop_settings[3] = {'id': 'max', 'offset': '100%', 'stop-color': chart.columns[chart.options.c].max_color};
						}
						else
						{
							// if (!index)
							// {
							// 	c_onsole.log('colorscale_min NEGATIVE POSITIVE',
							// 		{
							// 			'min_value': colorscale_min,
							// 			'original min_value': chart.local_min_value,
							// 			'used_min_value': chart.local_used_min_value,
							// 			'zero_value': 0,
							// 			'used_max_value': chart.local_used_max_value,
							// 			'max_value': colorscale_max,
							// 			'original max_value': chart.local_max_value,
							// 			'range': range,
							// 			'used_min_diff': used_min_diff,
							// 			'zero_diff': zero_diff,
							// 			'used_max_diff': used_max_diff,
							// 			'used_min_position': used_min_position,
							// 			'used_zero_position': used_zero_position,
							// 			'used_max_position': used_max_position,
							// 		}
							// 	);
							// }
							stop_settings[0] = {'id': 'min', 'offset': '0%', 'stop-color': chart.columns[chart.options.c].min_color};
							stop_settings[1] = {'id': 'zero', 'offset': used_zero_position+'%', 'stop-color': chart.columns[chart.options.c].zero_color};
							stop_settings[2] = {'id': 'used_max', 'offset': used_max_position+'%', 'stop-color': chart.columns[chart.options.c].max_color};
							stop_settings[3] = {'id': 'max', 'offset': '100%', 'stop-color': chart.columns[chart.options.c].max_color};
						}
					}
					else
					{
						let range = colorscale_max; // min_value is positive, so this is deducting
						let used_max_diff = chart.local_used_max_value; // deducting
						let used_max_position = Math.round(used_max_diff / range * 100);
						// if (!index)
						// {
						// 	c_onsole.log('colorscale_min POSITIVE',
						// 		{
						// 			'min_value': colorscale_min,
						// 			'used_min_value': chart.local_used_min_value,
						// 			'zero_value': 0,
						// 			'used_max_value': chart.local_used_max_value,
						// 			'max_value': colorscale_max,
						// 			'range': range,
						// 			'used_max_diff': used_max_diff,
						// 			'used_max_position': used_max_position,
						// 		}
						// 	);
						// }
						stop_settings[0] = {'id': 'min', 'offset': '0%', 'stop-color': chart.columns[chart.options.c].zero_color};
						stop_settings[1] = {'id': 'used_max', 'offset': used_max_position+'%', 'stop-color': chart.columns[chart.options.c].max_color};
						stop_settings[2] = {'id': 'max', 'offset': '100%', 'stop-color': chart.columns[chart.options.c].max_color};
					}
					
					//$linear_scale.empty();
					let $stops = $linear_scale.find('stop');
					for (let i=0, c=stop_settings.length; i<c; i++)
					{
						
						$linear_scale.append($stops.first().clone().attr('id', $linear_scale.attr('id')+'_'+i+'_'+stop_settings[i]['id']).attr('offset', stop_settings[i]['offset']).css({'stop-color': stop_settings[i]['stop-color'], 'stop-opacity': 1}));
					}
					$stops.remove();
					$linear_scale.attr('x1', '0%').attr('x2', '100%');
					// if (!index)
					// {
					// 	// c_onsole.log("innerHTML", index, $linear_scale.attr('id'), $linear_scale[0].outerHTML);
					// }
				}
			);
			
			// c_onsole.log("after chart.anychart.dataset.data", chart.anychart.series.colorScale());
		},
		coloring_function: function(chart_key)
		{
			//c_onsole.log("coloring_function", chart_key, this.value, this);
			return '#B2E3E8';
			let chart = window.app.$root.charts[chart_key];
			let min_color = chart.columns[chart.options.c].min_color;
			let zero_color = chart.columns[chart.options.c].zero_color;
			let max_color = chart.columns[chart.options.c].max_color;
			// TODO: check min and max values, if min_value<0, add 3 colors
			// TODO: different colors for different charts as Recovered vs Deaths
			// https://plot.ly/python/builtin-colorscales/
			if (chart.used_min_value < 0)
			{
				color_axis = {
					colors: [min_color, min_color, zero_color, max_color, max_color],
					values: [chart.min_value, chart.used_min_value, 0, chart.used_max_value, chart.max_value]
				};
			} else
			{
				color_axis = {
					colors: [zero_color, max_color, max_color],
					values: [0, chart.used_max_value, chart.max_value]
				};
			}
			// anychart.scales.linearColor(chart.columns[chart.options.c].zero_color, chart.columns[chart.options.c].max_color)
			return '#B2E3E8';
			// color the maximal value
			if (this.value === this.series.getStat('seriesMax')) return '#94353C';
			
			// color elements depending on the argument
			var x = this.x;
			if  ((x === 'Jan') || (x === 'Feb') || (x === 'Dec')) return '#B2E3E8';
			if  ((x === 'Jul') || (x === 'Jun') || (x === 'Aug')) return '#D94330';
			
			// get the default otherwise
			return this.sourceColor;
		},
		refilter_chart_data_by_columns: function(chart_key)
		{
			console.log('refilter_chart_data_by_columns', chart_key);
			// TODO: cache this, but beware: the original_data can change and we have to make the cache obsolate
			let chart = this.$root.charts[chart_key];
			let column_labels = [];
			let replace_labels = '';
			let filtered_data = [];
			let ret = '';
				switch (chart.chart_type)
				{
				case "global_map_plain":
					column_labels = [chart.options.d];
					replace_labels = chart.options.c;
					filtered_data = this.$root.filter_data_by_column_labels(chart.original_data, column_labels, replace_labels);
					chart.filtered_data = Object.assign([], [], filtered_data);
				break;
				
				case "anychart_map_choropleth":
					column_labels = [chart.options.d];
					console.log("refilter_chart_data_by_columns", "column_labels", column_labels);
					//replace_labels = chart.options.c;
					ret = this.$root.filter_data_by_column_labels_anychart(chart.original_data, column_labels);
					chart.filtered_data = Object.assign([], [], ret['filtered_data']);
					chart.local_min_value = ret['local_min_value'];
					chart.local_used_min_value = ret['local_used_min_value'];
					chart.local_used_max_value = ret['local_used_max_value'];
					chart.local_max_value = ret['local_max_value'];
				break;
				
				case "anychart_area":
					column_labels = chart.column_labels;
					replace_labels = []; //chart.options.c;
					ret = this.$root.filter_data_by_column_labels_anychart(chart.original_data, column_labels, 'array', true);
					chart.filtered_data = Object.assign([], [], ret);
					// chart.local_min_value = ret['local_min_value'];
					// chart.local_used_min_value = ret['local_used_min_value'];
					// chart.local_used_max_value = ret['local_used_max_value'];
					// chart.local_max_value = ret['local_max_value'];
				break;
				
				case "google_area":
				case "google_line":
					if (typeof(chart.filter_columns_by_label)!=='undefined')
					{
						
						column_labels = chart.filter_columns_by_label;
						//replace_labels = []; //chart.options.c;
						ret = this.$root.filter_data_by_column_labels_anychart(chart.original_data, column_labels, 'array', true);
						chart.filtered_data = Object.assign([], [], ret);
					}
				break;
				
				default:
					console.trace();
					console.error("chart_type doesnt exist ["+chart.chart_type+"]");
				break;
				}
			
			console.log('chart.filtered_data', chart.filtered_data);
			this.$root.redraw(chart_key);
		},
		filter_data_by_column_labels: function(data, column_labels, replace_labels='', use_first_column=true)
		{
			//c_onsole.warn('filter_data_by_column_labels', data, column_labels, use_first_column);
			let column_indices = [];
			let new_labels = ['Country'];
			for (let i=0, c=data[0].length; i<c; i++)
			{
				if (column_labels.includes(data[0][i]))
				{
					let this_column_number = column_labels.indexOf(data[0][i]);
					column_indices[this_column_number] = i;
					new_labels[this_column_number] = replace_labels;
					new_labels.push(replace_labels); // TODO temp hack, only works with one column
				}
			}
			let ret = this.$root.filter_data_by_column_indices(data, column_indices, use_first_column);
			// c_onsole.log("new_labels", new_labels);
			ret[0] = new_labels;
			
			return ret;
		},
		filter_data_by_column_indices: function(data, column_indices, start_with_nonzero=false, use_first_column=true)
		{
			console.log("filter_data_by_column_indices", column_indices, start_with_nonzero, use_first_column, data);
			let ret = [];
			let arr = [];
			// let firsthas_nonzero = false;
			for (let ri=0, rl=data.length; ri<rl; ri++)
			{
				if (ri < 2)
				{
				console.log("data[ri], ri", ri, data[ri]);
				}
				let row = [];
				for (let ci=0, cl=data[ri].length; ci<cl; ci++)
				{
					if ((ci===0)&&(use_first_column))
					{
						let this_column_number = 0;
						row[this_column_number] = this.$root.to_locale_string(data[ri][ci]);
						if (ri < 2)
						{
							console.log("data[ri], ri, ci=0", ri, ci, data[ri][ci]);
						}
					}
					else if (column_indices.includes(ci))
					{
						let this_column_number = column_indices.indexOf(ci)+1;
						row[this_column_number] = data[ri][ci];
						if (ri < 2)
						{
							console.log("data[ri], ri, ci", ri, ci, data[ri][ci]);
						}
						//row.push(data[ri][ci]);
						// if (!has_nonzero && data[ri][ci]!=0)
						// {
						// has_nonzero = true
						// }
					}
				}
				if (ri < 2)
				{
					console.log("row, ri", ri, row);
				}
				arr.push(row);
			}
			
			if (start_with_nonzero)
			{
			let first_nonzero_row = null;
				
				for (let ri=1, rl=arr.length; ri<rl; ri++)
				{
					for (let ci=1, cl=arr[ri].length; ci<cl; ci++)
					{
						if ((first_nonzero_row === null) && (arr[ri][ci] != 0))
						{
							console.log("first_nonzero_row FOUND", first_nonzero_row, arr[ri][ci], arr[ri])
							first_nonzero_row = ri;
						}
					}
				}
				console.log("first_nonzero_row", first_nonzero_row);
				if (first_nonzero_row ===  null)
				{
				ret = arr;
				}
				else
				{
				ret = arr.slice(0, 1).concat(arr.slice(first_nonzero_row)); // keeping the header
				}
			}
			else
			{
			ret = arr;
			}
			return ret;
		},
		filter_data_by_column_labels_anychart: function(data, column_labels, return_type='object', start_with_nonzero=false, use_first_column=true)
		{
			// c_onsole.warn('filter_data_by_column_labels_anychart', data, column_labels, return_type, use_first_column);
			let column_indices = [];
			// let new_labels = ['Country'];
			for (let i=0, c=data[0].length; i<c; i++)
			{
				if (column_labels.includes(data[0][i]))
				{
					let this_column_number = column_labels.indexOf(data[0][i]);
					column_indices[this_column_number] = i;
					//column_indices.push(i);
					// new_labels.push(replace_labels);
				}
			}
			let ret = '';
			if (return_type==='object')
			{
				console.log("before filter_data_by_column_indices_anychart_to_object column_labels, column_indices", column_labels, column_indices);
				ret = this.$root.filter_data_by_column_indices_anychart_to_object(data, column_indices, start_with_nonzero, use_first_column);
			}
			else
			{
				console.log("before filter_data_by_column_indices column_labels, column_indices", column_labels, column_indices);
				ret = this.$root.filter_data_by_column_indices(data, column_indices, start_with_nonzero, use_first_column);
			}
			
			return ret;
		},
		filter_data_by_column_indices_anychart_to_object: function(data, column_indices, start_with_nonzero=false, use_first_column=true)
		{
			let ret = [];
			let local_min_value = 9999999;
			let local_second_min_value = 9999999;
			let local_used_min_value = 99999999;
			let local_used_max_value = -99999999;
			let local_max_value = -99999999;
			let local_second_max_value = -99999999;
			for (let ri=0, rl=data.length; ri<rl; ri++)
			{
				let row = {};
				for (let ci=0, cl=data[ri].length; ci<cl; ci++)
				{
					if ((ci===0)&&(use_first_column))
					{
						row['id'] = data[ri][ci];
					}
					else if (column_indices.includes(ci))
					{
						row['value'] = data[ri][ci];
						if (row['value'] <= local_min_value)
						{
						local_second_min_value = local_min_value;
						local_min_value = row['value'];
						}
						else if (row['value'] <= local_second_min_value)
						{
						local_second_min_value = row['value'];
						}
						
						if (row['value'] >= local_max_value)
						{
						local_second_max_value = local_max_value;
						local_max_value = row['value'];
						}
						else if (row['value'] >= local_second_max_value)
						{
						local_second_max_value = row['value'];
						}
					}
				}
				ret.push(row);
			}
			
			if ((local_min_value - Math.round(local_min_value) === 0) && (local_second_min_value - Math.round(local_second_min_value) === 0))
			{
				local_used_min_value = Math.round((local_min_value + local_second_min_value * 3) / 4);
			}
			else
			{
				local_used_min_value = (local_min_value + local_second_min_value * 3) / 4;
			}
			if ((local_max_value - Math.round(local_max_value) === 0) && (local_second_max_value - Math.round(local_second_max_value) === 0))
			{
				local_used_max_value = Math.round((local_max_value + local_second_max_value * 3) / 4);
			}
			else
			{
				local_used_max_value = (local_max_value + local_second_max_value * 3) / 4;
			}
			
			ret.shift();
			
			return {'filtered_data': ret,
				'local_min_value': local_min_value,
				'local_second_min_value': local_second_min_value,
				'local_used_min_value': local_used_min_value,
				'local_used_max_value': local_used_max_value,
				'local_max_value': local_max_value,
				'local_second_max_value': local_second_max_value,
			};
		},
		save_as_image_anychart: function(chart_key)
		{
		console.log("save_as_image_anychart");
		// let chart = this.$root.charts[chart_key];
		// 	chart.anychart.map.saveAsPng({
		// 		"width": 1600,
		// 		// "height": 500,
		// 		"quality": 1,
		// 		"filename": "My Chart PNG"});
			let chart = window.app.charts[chart_key];
			chart.image_generating = 1;
			let container_element_id = 'any_chart_'+chart_key+'_container';
			let container_element = document.getElementById(container_element_id);
			// let $container_element = $(container_element);
			// $container_element.css({'border': '1px solid red'});
			// let $info_hide = $(container_element).find(".info_div .hide_for_image");
			// $info_hide.addClass("display_none");
			// let image_element_id = 'any_chart_'+chart_key+'_image';
			// let image_container_element_id = 'any_chart_'+chart_key+'_image_container';
			// let image_container_element = document.getElementById(image_container_element_id);
			// let image_container_outer_element_id = 'any_chart_'+chart_key+'_image_container_outer';
			// let image_container_outer_element = document.getElementById(image_container_outer_element_id);
			// c_onsole.log("window.app.charts[chart_key]", chart);
			// image_container_element.innerHTML = '<img src="' + chart.any_chart.getImageURI() + '" id="'+image_element_id+'">';
			// let image_element = document.getElementById(image_element_id);
			setTimeout(function(){
				chart.image_generating = 2;
				let options = {}; // {'width': image_element.offsetWidth, 'height': image_element.offsetHeight};
				console.log("html2canvas options", options);
				let canvas_container_element_id = 'any_chart_'+chart_key+'_canvas_container';
				let canvas_container = document.getElementById(canvas_container_element_id);
				let current_scroll_top = document.documentElement.scrollTop;
				let current_scroll_left = document.documentElement.scrollLeft;
				window.scrollTo(0,0);
				html2canvas(container_element, options).then(canvas => {
					console.log("canvas", canvas);
					canvas.id = 'any_chart_'+chart_key+'_canvas';
					canvas_container.innerHTML = '';
					canvas_container.appendChild(canvas);
					canvas.toBlob(function(blob) {
						saveAs(blob, chart.full_filename+"_saved-on-"+window.app.get_iso_filename_datetime()+".png");
					});
					//chart.image_generating = 0;
					// $info_hide.removeClass("display_none");
				});
				window.scrollTo(current_scroll_left, current_scroll_top);
			},10);
		},
		save_as_image: function(chart_key)
		{
			let chart = window.app.charts[chart_key];
			switch (chart.chart_type)
			{
				case "anychart_map_choropleth":
					this.$root.save_as_image_anychart(chart_key);
				break;
				default:
					this.$root.save_as_image_google(chart_key);
				break;
			}
		},
		save_as_image_google: function(chart_key)
		{
			console.log("save_as_image");
			let chart = window.app.charts[chart_key];
			chart.image_generating = 1;
			let outer_element_id = 'google_chart_'+chart_key+'_outer';
			
			// var clone_graph  = chart.google.wrapper.clone()
			// clone_graph.setContainerId('google_chart_'+chart_key+'_clone_container');
			// clone_graph.setOption('width', 1600);
			// clone_graph.setOption('height', 1200);
			// clone_graph.draw();
			let image_element_id = 'google_chart_'+chart_key+'_image';
			let image_container_element_id = 'google_chart_'+chart_key+'_image_container';
			let image_container_element = document.getElementById(image_container_element_id);
			let image_container_outer_element_id = 'google_chart_'+chart_key+'_image_container_outer';
			let image_container_outer_element = document.getElementById(image_container_outer_element_id);
			console.log("window.app.charts[chart_key]", chart);
			let image_uri = '';
			switch (chart.chart_type)
			{
				case "google_area":
					image_uri = chart.google.wrapper.getChart().getImageURI();
				break;
				case "google_line":
					image_uri = chart.google.graph.getImageURI();
				break;
			}
			$(image_container_outer_element).width($("#"+outer_element_id).width());
			image_container_element.innerHTML = '<img src="' + image_uri + '" id="'+image_element_id+'">';
			let image_element = document.getElementById(image_element_id);
			setTimeout(function(){
				chart.image_generating = 2;
				let options = {'scale': 1}; // scale is useless as we already have the image above, we need a bigger chart to create a bigger image first
				console.log("html2canvas options", options);
				let canvas_container_element_id = 'google_chart_'+chart_key+'_canvas_container';
				let canvas_container = document.getElementById(canvas_container_element_id);
				let current_scroll_top = document.documentElement.scrollTop;
				let current_scroll_left = document.documentElement.scrollLeft;
				window.scrollTo(0,0);
				html2canvas(image_container_outer_element, options).then(canvas => {
					console.log("image_container_outer_element, canvas", image_container_outer_element, canvas);
					canvas.id = 'google_chart_'+chart_key+'_canvas';
					canvas_container.innerHTML = '';
					canvas_container.appendChild(canvas);
					canvas.toBlob(function(blob) {
						saveAs(blob, chart.full_filename+"_saved-on-"+window.app.get_iso_filename_datetime()+".png");
					});
				});
				window.scrollTo(current_scroll_left, current_scroll_top);
			},1000);
		},
		get_iso_filename_datetime: function()
		{
			let now = new Date();
			let now_iso_base = now.toISOString();
			let ret = now_iso_base.replace(/[^A-Za-z0-9-_]/g, '-');
			return ret;
		},
		save_canvas_to_image: function (chart_key, filename)
		{
		canvas_element_id = 'google_chart_'+chart_key+'_canvas';
		canvas = document.getElementById(canvas_element_id);
			canvas.toBlob(function(blob) {
				saveAs(blob, filename+".png");
			});
		},
		recalculate_embed_url: function(chart_key)
		{
			let chart = this.$root.charts[chart_key];
			let this_options = copy_object(chart.options);
				if ((typeof(chart.embed_options)!='undefined') && !chart.embed_options.fixed_date)
				{
					this_options['d'] = 'x';
				}
			chart.embed_url = encodeURI('https://epidemicdata.com/embed/?'+chart_key+'='+JSON.stringify(this_options));
		},
		show_hide_embed: function(chart_key)
		{
			this.$root.charts[chart_key].show_embed = !this.$root.charts[chart_key].show_embed;
			this.$root.recalculate_embed_url(chart_key)
		},
		/*date_slider_changed: function(chart_key)
		{
			_.debounce(() => {
				console.log("date_slider_changed START");
				this.$root.recalculate_local_d(chart_key);
				this.$root.reload_chart_data(chart_key);
				console.log("date_slider_changed END");
			}, 2000);
		}*/
	},
	computed:
	{
		page_title: function()
		{
			return this.get_place_name_from_iso(window.ed.place);
		}
	}
};