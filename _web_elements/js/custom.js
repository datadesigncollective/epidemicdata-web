var difference = function () {
	return {
		VALUE_CREATED: 'CREATED',
		VALUE_UPDATED: 'UPDATED',
		VALUE_DELETED: 'DELETED',
		VALUE_UNCHANGED: 'UNCHANGED',
		compare: function(def_obj, cust_obj) {
			let diff = null;
			if (this.isFunction(def_obj) || this.isFunction(cust_obj))
			{
				throw 'Invalid argument. Function given, object expected.';
			}
			else if (this.isValue(def_obj) || this.isValue(cust_obj))
			{
				let type = this.compareValues(def_obj, cust_obj);
				if (
					(type===this.VALUE_CREATED) ||
					(type===this.VALUE_UPDATED)
				)
				{
					return cust_obj === undefined ? def_obj: cust_obj;
				}
				else
				{
					return null;
				}
			}
			else if (this.isObject(def_obj) || this.isObject(cust_obj))
			{
				diff = {};
				for (let key in cust_obj)
				{
					if (this.isFunction(cust_obj[key]))
					{
					continue;
					}
					
					let value2 = undefined;
					if (def_obj[key] !== undefined)
					{
					value2 = def_obj[key];
					}
					
					let new_val = this.compare(value2, cust_obj[key]);
					if ((new_val !== null) && (JSON.stringify(new_val)!=='{}'))
					{
					diff[key] = new_val;
					}
				}
			}
			else if (this.isArray(def_obj) || this.isArray(cust_obj))
			{
				diff = [];
				if (JSON.stringify(def_obj) !== JSON.stringify(cust_obj))
				{
				diff = JSON.parse(JSON.stringify(cust_obj));
				}
			}
			else if (this.isArray(def_obj) || this.isArray(cust_obj))
			{
			}
			return diff;
		},
		compareValues: function (value1, value2) {
			if (value1 === value2) {
				return this.VALUE_UNCHANGED;
			}
			if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
				return this.VALUE_UNCHANGED;
			}
			if (value1 === undefined) {
				return this.VALUE_CREATED;
			}
			if (value2 === undefined) {
				return this.VALUE_DELETED;
			}
			return this.VALUE_UPDATED;
		},
		isFunction: function (x) {
			return Object.prototype.toString.call(x) === '[object Function]';
		},
		isArray: function (x) {
			return Object.prototype.toString.call(x) === '[object Array]';
		},
		isDate: function (x) {
			return Object.prototype.toString.call(x) === '[object Date]';
		},
		isObject: function (x) {
			return Object.prototype.toString.call(x) === '[object Object]';
		},
		isValue: function (x) {
			return !this.isObject(x) && !this.isArray(x);
		}
	}
}();

plain__data = [
	['Country', 'Popu04larity'],
	['Germany', 2000],
	['United States', 300],
	['Brazil', 400],
	['Canada', 500],
	['France', 300],
	['RU', 700]
];

window.dashboard = null;

// google.charts.setOnLoadCallback(
// 	function()
//     {
//     	draw(plain__data);
//     }
// );

function drawRegionsMap(plain_data) {
	// var data = google.visualization.arrayToDataTable([
	// 	['Country', 'Popularity'],
	// 	['Germany', 200],
	// 	['United States', 800],
	// 	['Brazil', 400],
	// 	['Canada', 500],
	// 	['France', 300],
	// 	['RU', 700]
	// ]);
	
	// var data = $.ajax({
	// 	url: "json/test_countries.json",
	// 	dataType: "json",
	// 	async: false
	// }).responseText;
	
	var options = {};
	
	if ((typeof(window.global_map_plain)=='undefined') || (window.global_map_plain==null))
	{
		console.log("create new GeoChart");
		window.global_map_plain = new google.visualization.GeoChart(document.getElementById('chart_div'));
	}
	
	var data = google.visualization.arrayToDataTable(plain_data);
	// c_onsole.log("drawRegionsMap", data, plain_data);
	window.global_map_plain.draw(data, options);
}

function drawToolbar() {
	var components = [
		//{type: 'igoogle', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA', gadget: 'https://www.google.com/ig/modules/pie-chart.xml', userprefs: {'3d': 1}},
		{type: 'html', datasource: '/json/test.json'},
		{type: 'csv', datasource: '/json/test.json'},
		{type: 'htmlcode', datasource: 'https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALA',gadget: 'https://www.google.com/ig/modules/pie-chart.xml',userprefs: {'3d': 1}, style: 'width: 800px; height: 700px; border: 3px solid purple;'}
	];
	
	var container = document.getElementById('toolbar_div');
	google.visualization.drawToolbar(container, components);
}

function draw(plain_data)
{
	// c_onsole.log("plain_data", plain_data)
	// drawDashboard(plain_data);
	// drawToolbar();
	
}

function drawDashboard(plain_data) {
	
	// Create our data table.
	// var data = google.visualization.arrayToDataTable([
	// 	['Country', 'Popularity'],
	// 	['Germany', 200],
	// 	['United States', 300],
	// 	['Brazil', 400],
	// 	['Canada', 500],
	// 	['France', 300],
	// 	['RU', 700]
	// ]);
	
	var ajax_ret = $.ajax({
		url: "json/test.json",
		dataType: "json",
		async: false
	}).responseText;
	console.log("ajax_ret", ajax_ret);
	//var ajax_data = new google.visualization.DataTable(ajax_ret);
	
	var ajax_data = google.visualization.arrayToDataTable(plain_data);
	
	// setTimeout(function(){
	// 	ajax_data.setCell(2, 1, 2000);
	// 	console.log("ajax_data", ajax_data);
	// 	geoChart.draw();
	// },2000);
	
	// Create a dashboard.
	if (window.dashboard==null)
	{
		window.dashboard = new google.visualization.Dashboard(
			document.getElementById('dashboard_div'), {
				'width': 300,
				'height': 300,
				title: "options.title",
				hAxis: {title: "options.hAxis.title"},
				vAxis: {title: "options.vAxis.title"},
			});
	}
	
	// Create a range slider, passing some options
	var popularityRangeSlider = new google.visualization.ControlWrapper({
		'controlType': 'NumberRangeFilter',
		'containerId': 'filter_div',
		'options': {
			'filterColumnLabel': 'Active'
		}
	});
	
	// Create a pie chart, passing some options
	if (window.geoChart==null)
	{
		window.geoChart = new google.visualization.ChartWrapper({
			'chartType': 'GeoChart',
			'containerId': 'chart_div',
			'options': {
				'width': 300,
				'height': 300,
				title: "options.title",
				hAxis: {title: "options.hAxis.title"},
				vAxis: {title: "options.vAxis.title"},
			}
		});
	}
	
	image_div = document.getElementById('image_div');
	image_canvas = document.getElementById('image_canvas');
	image_outer_div = document.getElementById('image_outer_div');
	image2_div = document.getElementById('image2_div');
	
	google.visualization.events.addListener(window.geoChart, 'ready', function () {
		image_div.innerHTML = '<img src="' + window.geoChart.getChart().getImageURI() + '">';
		setTimeout(function(){
			html2canvas(document.getElementById('image_outer_div'), {'width': 700, 'height': 700}).then(canvas => {
				console.log("canvas", canvas);
				document.getElementById('image2_div').innerHTML = '';
				document.getElementById('image2_div').appendChild(canvas);
			});
		},1000);
		
		//image2_div.innerHTML = '<img src="' + window.geoChart.getChart().getImageURI() + '">';
	});
	
	
	// Establish dependencies, declaring that 'filter' drives 'window.geoChart',
	// so that the pie chart will only display entries that are let through
	// given the chosen slider range.
	window.dashboard.bind(popularityRangeSlider, window.geoChart);
	
	// Draw the dashboard.
	window.dashboard.draw(ajax_data);
}


// TODO ASAP: Rates, fájlátalakítás
// TODO ASAP: lehessen választani, hogy a színek adott napra vagy egész időszakra minmaxok

// TODO v1: embed with scrollbar, radios
// TODO v1: date switching, stored in url and embed

// TODO v2: weekly bontás

let dt = new Date(window.ed.last_refresh_time_iso);
window.ed.last_refresh_time_locale = dt.toLocaleString('en-GB', {});

window.ed.format_codes_to_labels = {
	'l': 'Line',
	'a': 'Area',
	'b': 'Bars',
};

window.ed.Regions = {
	'world-without-china': {'name': 'World (without China)', 'data_source': 'global_sum_by_country/sum_by_country_without_china_%c%'},
};



window.ed.is_chart = 0;
if( (typeof(path[path.length-1])!=='undefined') && path[path.length-1]==='chart')
{
window.ed.is_chart = 1;
let path_chart = path.pop();
console.log('new path', path);
}

if( (typeof(path[path.length-1])==='undefined') || path[path.length-1]==='')
{
window.ed.place='world';
window.ed.place_type='world';
}
else if(path[path.length-1].substr(0, 5)==='world')
{
window.ed.place=path[path.length-1];
window.ed.place_type='world';
}
else if (window.location.pathname==='/about/')
{
window.ed.place='about';
window.ed.place_type=null;
}
else if (window.location.pathname==='/most-affected/')
{
window.ed.place='most-affected';
window.ed.place_type=null;
}
else if (window.location.pathname==='/regions/')
{
window.ed.place='regions';
window.ed.place_type=null;
}
else if (typeof(window.ed.Country_uri_to_iso[path[path.length-1]])!=='undefined')
{
window.ed.place=window.ed.Country_uri_to_iso[path[path.length-1]];
window.ed.place_type='country';
}
else if (typeof(window.ed.Region_uri_to[path[path.length-1]])!=='undefined')
{
window.ed.place=path[path.length-1];
window.ed.place_type='region';
	if(path[path.length-1].substr(0, 5)==='most-')
	{
	window.ed.place_is_most=true;
	}
}
else
{
window.ed.place='world';
}
console.log("window.ed.place", window.ed.place_type, window.ed.place);

window.ed.charts = {};

if (!window.ed.place_is_most)
{
	window.ed.charts['summary_table'] = Object.assign({}, {}, window.ed.chart_templates['summary_table']);
}

	switch (window.ed.place_type)
	{
		case "world":
			window.ed.charts['global_map_plain_new'] = Object.assign({}, {}, window.ed.chart_templates['global_map_plain_new']);
			window.ed.charts['world_graph_area_rad'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_area_rad']);
			window.ed.charts['world_graph_line_total'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_line_total']);
			window.ed.charts['world_datatable_total_absolute'] = Object.assign({}, {}, window.ed.chart_templates['world_datatable_total_absolute']);
			window.ed.charts['world_datatable_total_per_population'] = Object.assign({}, {}, window.ed.chart_templates['world_datatable_total_per_population']);
			window.ed.charts['world_graph_area_daily'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_area_daily']);
			window.ed.charts['world_graph_line_daily'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_line_daily']);
			window.ed.charts['world_graph_area_total_rate'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_area_total_rate']);
			window.ed.charts['world_graph_line_total_rate'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_line_total_rate']);
			// window.ed.charts['world_graph_area_daily_rate'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_area_daily_rate']);
			window.ed.charts['world_graph_line_daily_rate'] = Object.assign({}, {}, window.ed.chart_templates['world_graph_line_daily_rate']);

			if (window.ed.place==='world')
			{
			
			}
			else if (window.ed.place==='world-without-china')
			{
				for (let [chart_key, chart] of Object.entries(window.ed.charts))
				{
					console.log("data source chart_key, chart", chart_key, window.ed.charts[chart_key]);
					console.log("data source old values", window.ed.charts[chart_key].data_source, window.ed.charts[chart_key].data_source_var);
					window.ed.charts[chart_key].data_source = window.ed.charts[chart_key].data_source.replace('sum_by_world_', 'sum_by_world_without_china_').replace('sum_by_country_', 'sum_by_country_without_china_');
					if (typeof(window.ed.charts[chart_key].data_source_var)!=='undefined')
					{
						window.ed.charts[chart_key].data_source_var = window.ed.charts[chart_key].data_source_var.replace('sum_by_world_', 'sum_by_world_without_china_').replace('sum_by_country_', 'sum_by_country_without_china_');
					}
					console.log("data source new values", window.ed.charts[chart_key].data_source, window.ed.charts[chart_key].data_source_var);
					//window.ed.charts['global_map_plain_new']['data_source'] = window.ed.Regions[window.ed.place];
				}
				
			}
		break;
		
		case "country":
			window.ed.charts['country_graph_area_total'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_area_total']);
			window.ed.charts['country_graph_line_total'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_line_total']);
			window.ed.charts['country_graph_line_daily'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_line_daily']);
			window.ed.charts['country_graph_area_total_rate'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_area_total_rate']);
			window.ed.charts['country_graph_line_total_rate'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_line_total_rate']);
			window.ed.charts['country_graph_line_daily_rate'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_line_daily_rate']);
		break;
		
		case "region":
			window.ed.charts['region_graph_line_total_absolute'] = Object.assign({}, {}, window.ed.chart_templates['region_graph_line_total_absolute']);
			window.ed.charts['region_datatable_total_absolute'] = Object.assign({}, {}, window.ed.chart_templates['region_datatable_total_absolute']);
			window.ed.charts['region_graph_line_total_per_population'] = Object.assign({}, {}, window.ed.chart_templates['region_graph_line_total_per_population']);
			window.ed.charts['region_datatable_total_per_population'] = Object.assign({}, {}, window.ed.chart_templates['region_datatable_total_per_population']);
			// window.ed.charts['country_graph_line_total'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_line_total']);
			// window.ed.charts['country_graph_line_daily'] = Object.assign({}, {}, window.ed.chart_templates['country_graph_line_daily']);
		break;
	}

function replace_title_vars(chart_key)
{
	console.log("window.ed.charts[chart_key].options.t", window.ed.charts[chart_key].options.t);
	window.ed.charts[chart_key].title = window.ed.charts[chart_key].title_template;
	window.ed.charts[chart_key].full_title = window.ed.charts[chart_key].full_title_template;
	
	window.ed.charts[chart_key].title = window.ed.charts[chart_key].title.replace('%P%', get_place_name_from_iso(window.ed.place)).replace('%d%', window.ed.last_day.toLocaleDateString('en-GB')).replace('%dp%', window.ed.last_partial_day.toLocaleDateString('en-GB'));
	window.ed.charts[chart_key].full_title = window.ed.charts[chart_key].full_title.replace('%P%', get_place_name_from_iso(window.ed.place)).replace('%d%', window.ed.last_day.toLocaleDateString('en-GB')).replace('%dp%', window.ed.last_partial_day.toLocaleDateString('en-GB'));
	if (typeof(window.ed.charts[chart_key].options.t)!=='undefined')
	{
		window.ed.charts[chart_key].title = window.ed.charts[chart_key].title.replace('%T%', get_datetype_name_from_code(window.ed.charts[chart_key].options.t));
		window.ed.charts[chart_key].full_title = window.ed.charts[chart_key].full_title.replace('%T%', get_datetype_name_from_code(window.ed.charts[chart_key].options.t));
	}
	if (typeof(window.ed.charts[chart_key].options.dr)!=='undefined')
	{
		let dt0 = new Date(window.ed.charts[chart_key].options.dr[0]);
		let dt1 = new Date(window.ed.charts[chart_key].options.dr[1]);
		window.ed.charts[chart_key].title = window.ed.charts[chart_key].title.replace('%dr0%', dt0.toLocaleDateString('en-GB'));
		window.ed.charts[chart_key].title = window.ed.charts[chart_key].title.replace('%dr1%', dt1.toLocaleDateString('en-GB'));
		window.ed.charts[chart_key].full_title = window.ed.charts[chart_key].full_title.replace('%dr0%', dt0.toLocaleDateString('en-GB'));
		window.ed.charts[chart_key].full_title = window.ed.charts[chart_key].full_title.replace('%dr1%', dt1.toLocaleDateString('en-GB'));
	}
}

for (let [chart_key, chart] of Object.entries(window.ed.charts))
{
	replace_title_vars(chart_key);
	// window.ed.charts[chart_key]['full_title'] = window.ed.charts[chart_key]['title'] + '<br>' + window.ed.first_day.toLocaleDateString('en-GB')+' - '+window.ed.last_day.toLocaleDateString('en-GB');
}
// Vue.prototype.google = google;
