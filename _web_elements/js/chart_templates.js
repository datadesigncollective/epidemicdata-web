window.ed.global_map_columns = {
	// TODO: blue: #053061
	// TODO: ez template-ből jöjjön, hogy ne kelljen többször megcsináljuk
	'Total Confirmed':{display_name: 'Total Confirmed', column_key: 'Total_Confirmed', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	'Total Deaths':{display_name: 'Total Deaths', column_key: 'Total_Deaths', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	'Total Recovered':{display_name: 'Total Recovered', column_key: 'Total_Recovered', min_color: '#67001f', zero_color: '#f5f5f5', max_color: '#006837'},
	'Total Active':{display_name: 'Total Active', column_key: 'Total_Active', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	'Daily Confirmed':{display_name: 'Daily Confirmed', column_key: 'Daily_Confirmed', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	'Daily Deaths':{display_name: 'Daily Deaths', column_key: 'Daily_Deaths', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	'Daily Recovered':{display_name: 'Daily Recovered', column_key: 'Daily_Recovered', min_color: '#67001f', zero_color: '#f5f5f5', max_color: '#006837'},
	'Daily Active':{display_name: 'Daily Active', column_key: 'Daily_Active', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	'Total_Rates_Mortality_Rate':{display_name: 'Mortality Rate', column_key: 'Total_Rates_Mortality_Rate', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	'Total_Rates_Recovery_Rate':{display_name: 'Recovery Rate', column_key: 'Total_Rates_Recovery_Rate', min_color: '#67001f', zero_color: '#f5f5f5', max_color: '#006837'},
	'Total_Rates_Activity_Rate':{display_name: 'Activity Rate', column_key: 'Total_Rates_Activity_Rate', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	// 'Daily_Change_In_Rates_Mortality_rate':{display_name: 'Daily Change in Mortality Rate', column_key: 'Daily_Change_In_Rates_Mortality_rate', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
	// 'Daily_Change_In_Rates_Recovery_rate':{display_name: 'Daily Change in Recovery Rate', column_key: 'Daily_Change_In_Rates_Recovery_rate', min_color: '#67001f', zero_color: '#f5f5f5', max_color: '#006837'},
	// 'Daily_Change_In_Rates_Activity_rate':{display_name: 'Daily Change in Activity Rate', column_key: 'Daily_Change_In_Rates_Activity_rate', min_color: '#006837', zero_color: '#f5f5f5', max_color: '#67001f'},
};

window.ed.colors = {
	'deaths': '#333333',
	'active': '#67001f',
	'recovered': '#006837',
	'confirmed': '#999999',
	
	'deaths_line': '#333333',
	'active_line': '#b30036',
	'recovered_line': '#00b35f',
	'confirmed_line': '#999999',
};

window.ed.chart_templates = {
	summary_table:
		{
			chart_type: 'summary_table',
			options:
				{
				},
			image_generating: 0,
			show_embed: false,
			embed_options:
				{
					fixed_date: 1
				},
			embed_url: '',
			title: 'Covid-19 Cases in %P% on %d%',
		},
	global_map_plain_new:
		{
			chart_type: 'anychart_map_choropleth',
			map_type: 'world',
			options:
				{
					d: window.ed.last_day_iso,
					c: 'Total Confirmed',
				},
			default_options:
				{
					d: window.ed.last_day_iso,
					c: 'Total Confirmed',
				},
			original_data: [],
			data_source: "global_sum_by_country/csv/sum_by_country_%c%",
			filtered_data: [],
			columns: copy_object(window.ed.global_map_columns),
			locale_d: '',
			min_value: null,
			max_value: null,
			image_generating: 0,
			show_embed: false,
			embed_options:
				{
					fixed_date: 1
				},
			embed_url: '',
			title: 'Covid-19 Cases',
		},
	world_graph_area_rad:
		{
			chart_type: 'google_area',
			options:
				{
					// d: window.ed.last_day.toISOString().slice(0,10), //?
					// c: 'Total Confirmed', //?
				},
			original_data: [],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Combined_DARC.js",
			data_source_var: "sum_by_world_Total_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered, window.ed.colors.confirmed],
			title: 'Covid-19 Cases by Type',
			is_stacked: true,
			hide_columns: [4],
			image_generating: 0,
			show_embed: false,
		},
	country_graph_area_total:
		{
			chart_type: 'google_area',
			options:
				{
					c: [0,1,2,3],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			filter_columns_by_label: ['Total Deaths', 'Total Active', 'Total Recovered'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			title: 'Covid-19 Cases by Type',
			is_stacked: true,
			image_generating: 0,
			show_embed: false,
			// ["index", "Total Confirmed", "Total Deaths", "Total Recovered", "Total Active", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	world_graph_line_total:
		{
			chart_type: 'google_line',
			options:
				{
					//c: [0,1,2,3],
					c: [...Array(10).keys()]
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Combined_DARC.js",
			data_source_var: "sum_by_world_Total_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			filter_columns_by_label: [
				'Total Deaths',
				// 'Total Active_Old',
				'Total Active',
				// 'Total Recovered_Old',
				'Total Recovered',
				'Total Confirmed'],
			column_colors: [
				window.ed.colors.deaths_line,
				window.ed.colors.active_line,
				// chroma(window.ed.colors.active_line).brighten(2).hex(),
				window.ed.colors.recovered_line,
				// chroma(window.ed.colors.recovered_line).brighten(2).hex(),
				window.ed.colors.confirmed_line
				// window.ed.colors.confirmed_line, window.ed.colors.deaths_line, window.ed.colors.recovered_line, 'purple',
				// 'yellow', 'orange', 'brown',
				// window.ed.colors.active_line,
			],
			title: 'Covid-19 Cases by Type',
			image_generating: 0,
			show_embed: false,
		},
	country_graph_line_total:
		{
			chart_type: 'google_line',
			options:
				{
					c: [0,1,2,3,4,5],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			filter_columns_by_label: [
				'Total Deaths',
				// 'Total Active_Old',
				'Total Active',
				// 'Total Recovered_Old',
				'Total Recovered',
				'Total Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [
				window.ed.colors.deaths_line,
				window.ed.colors.active_line,
				// chroma(window.ed.colors.active_line).brighten(2).hex(),
				window.ed.colors.recovered_line,
				// chroma(window.ed.colors.recovered_line).brighten(2).hex(),
				window.ed.colors.confirmed_line
			],
			title: 'Covid-19 Cases by Type',
			hide_columns: [],
			image_generating: 0,
			show_embed: false,
			// ["index", "Total Confirmed", "Total Deaths", "Total Recovered", "Total Active", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	world_graph_area_daily:
		{
			chart_type: 'google_area',
			options:
				{
					//c: [0,1,2,3],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Daily_Combined_DARC.js",
			data_source_var: "sum_by_world_Daily_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered, window.ed.colors.confirmed],
			title: 'Daily Changes in Covid-19 Cases',
			is_stacked: true,
			hide_columns: [4],
			image_generating: 0,
			show_embed: false,
		},
	country_graph_area_daily:
		{
			chart_type: 'google_area',
			options:
				{
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			filter_columns_by_label: ['Change in Deaths', 'Change in Active', 'Change in Recovered'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			title: 'Daily Changes in Covid-19 Cases',
			is_stacked: true,
			image_generating: 0,
			show_embed: false,
			// ["index", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	world_graph_line_daily:
		{
			chart_type: 'google_line',
			options:
				{
					c: [0,1,2,3,4,5],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Daily_Combined_DARC.js",
			data_source_var: "sum_by_world_Daily_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [
				window.ed.colors.deaths_line, window.ed.colors.active_line, chroma(window.ed.colors.active_line).brighten(2).hex(), window.ed.colors.recovered_line, chroma(window.ed.colors.recovered_line).brighten(2).hex(), window.ed.colors.confirmed_line
			],
			title: 'Daily Changes in Covid-19 Cases',
			image_generating: 0,
			show_embed: false,
		},
	country_graph_line_daily:
		{
			chart_type: 'google_line',
			options:
				{
					c: [0,1,2,3],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			filter_columns_by_label: ['Change in Deaths', 'Change in Active', 'Change in Recovered', 'Change in Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line, window.ed.colors.confirmed_line],
			title: 'Daily Changes in Covid-19 Cases',
			image_generating: 0,
			show_embed: false,
			// ["index", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	world_graph_area_total_rate:
		{
			chart_type: 'google_area',
			options:
				{
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Rates_Combined_MAR.js",
			data_source_var: "sum_by_world_Total_Rates_Combined_MAR",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			title: 'Rates of Covid-19 Cases',
			is_stacked: 'percent',
			image_generating: 0,
			show_embed: false,
		},
	world_graph_line_total_rate:
		{
			chart_type: 'google_line',
			options:
				{
					c: [0,1,2,3],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Rates_Combined_MAR.js",
			data_source_var: "sum_by_world_Total_Rates_Combined_MAR",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line],
			title: 'Rates of Covid-19 Cases',
			is_stacked: 'percent',
			image_generating: 0,
			show_embed: false,
		},
	world_graph_area_daily_rate:
		{
			chart_type: 'google_area',
			options:
				{
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Daily_Change_In_Rates_Combined_MAR.js",
			data_source_var: "sum_by_world_Daily_Change_In_Rates_Combined_MAR",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			title: 'Daily Changes in Rates of Covid-19 Cases',
			image_generating: 0,
			show_embed: false,
		},
	world_graph_line_daily_rate:
		{
			chart_type: 'google_line',
			options:
				{
					c: [0,1,2,3],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Daily_Change_In_Rates_Combined_MAR.js",
			data_source_var: "sum_by_world_Daily_Change_In_Rates_Combined_MAR",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line],
			title: 'Daily Changes in Rates of Covid-19 Cases',
			image_generating: 0,
			remove_first_dates: 1,
			show_embed: false,
		},
	
	
	
	world_graph_area_total:
		{
			chart_type: 'anychart_area',
			options:
				{
					// d: window.ed.last_day.toISOString().slice(0,10), //?
					// c: 'Total Confirmed', //?
				},
			original_data: [],
			data_source: "countries/country_%p%",
			column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: ['#006837', '#67001f', '#333333'],
			column_hatches: ['Confetti', 'Weave', 'Zigzag'],
			image_generating: 0,
			show_embed: false,
		}
};

for (let [chart_key, chart] of Object.entries(window.ed.chart_templates))
{
	window.ed.chart_templates[chart_key]['default_option'] = Object.assign({}, {}, window.ed.chart_templates[chart_key]['option']);
	window.ed.chart_templates[chart_key]['full_title'] = window.ed.chart_templates[chart_key]['title'] + ' - %P%<br>' + window.ed.first_day_iso+' - '+window.ed.last_day_iso;
}