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

function get_place_name_from_iso(country_iso)
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
	else if (country_iso === 'about')
	{
		ret = 'About';
	}
	else if (country_iso === 'most-affected')
	{
		ret = 'Most Affected Countries';
	}
	else if (country_iso === 'regions')
	{
		ret = 'Regions';
	}
	else if (typeof(window.ed.Country_iso_to[country_iso])!=='undefined')
	{
		ret = window.ed.Country_iso_to[country_iso].name;
	}
	else if (typeof(window.ed.Region_uri_to[country_iso])!=='undefined')
	{
		ret = window.ed.Region_uri_to[country_iso].name;
	}
	else
	{
		console.error('get_place_name_from_iso has no place for ['+country_iso+']');
	}
	return ret;
}

function get_datetype_name_from_code(option_t)
{
	let ret = '';
	if (option_t.charAt(0)==='T')
	{
		ret += 'Total ';
	}
	else if (option_t.charAt(0)==='D')
	{
		ret += 'Daily ';
	}
	else
	{
		console.error("get_datetype_name_from_code charAt(0) unkown", option_t);
	}
	
	if (option_t.charAt(1)==='C')
	{
		ret += 'Confirmed Cases';
	}
	else if (option_t.charAt(1)==='A')
	{
		ret += 'Active Cases';
	}
	else if (option_t.charAt(1)==='R')
	{
		ret += 'Recovered Cases';
	}
	else if (option_t.charAt(1)==='D')
	{
		ret += 'Deaths';
	}
	else
	{
		console.error("get_region_type_from_option charAt(1) unkown", option_t);
	}
	return ret;
}

function get_chart_shown_start_date()
{
	if (typeof(window.ed.chart_shown_start_date)==='undefined')
	{
	let moving_date = new Date(window.ed.last_day_iso);
	let days_back = 30;
	switch (window.ed.screen_size)
	{
		case "xs":
		days_back = 28;
		break;
		case "sm":
		days_back = 35;
		break;
		case "md":
		case "lg":
		case "xl":
		days_back = 42;
		break;
	}
	moving_date.setDate(moving_date.getDate()-days_back);
	window.ed.chart_shown_start_date = moving_date.toISOString().slice(0,10);
		if (window.ed.chart_shown_start_date < window.ed.first_day_iso)
		{
		window.ed.chart_shown_start_date = window.ed.first_day_iso;
		}
	}
return window.ed.chart_shown_start_date;
}


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
			title: 'Covid-19 Cases in %P% on %dp%',
			title_template: 'Covid-19 Cases in %P% on %dp%',
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
			title: 'Covid-19 Cases - %P%',
			title_template: 'Covid-19 Cases - %P%',
		},
	world_graph_area_rad:
		{
			chart_type: 'google_area',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					l: 'n', // 'l'='log', 'm'='mirrorLog', unset=null='linear'
					f: 'a',
					// d: window.ed.last_day.toISOString().slice(0,10), //?
					// c: 'Total Confirmed', //?
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Combined_DARC.js",
			data_source_var: "sum_by_world_Total_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered, window.ed.colors.confirmed],
			title: 'Covid-19 Cases by Type - %P%',
			title_template: 'Covid-19 Cases by Type - %P%',
			is_stacked: true,
			hide_columns: [4],
			image_generating: 0,
			show_embed: false,
			format_custom: false,
			log_scale_custom: false,
		},
	country_graph_area_total:
		{
			chart_type: 'google_area',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			filter_columns_by_label: ['Total Deaths', 'Total Active', 'Total Recovered'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			title: 'Covid-19 Cases by Type - %P%',
			title_template: 'Covid-19 Cases by Type - %P%',
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
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [...Array(10).keys()],
					l: 'n', // 'l'='log', 'm'='mirrorLog', unset=null='linear'
					f: 'l',
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Combined_DARC.js",
			data_source_var: "sum_by_world_Total_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			filter_columns_by_label: [
				'Total Deaths',
				'Total Active',
				// 'Total Active_Est',
				'Total Recovered',
				// 'Total Recovered_Est',
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
			title: 'Covid-19 Cases by Type - %P%',
			title_template: 'Covid-19 Cases by Type - %P%',
			image_generating: 0,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
		},
	country_graph_line_total:
		{
			chart_type: 'google_line',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3,4,5],
					l: 'n',
					f: 'l',
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			filter_columns_by_label: [
				'Total Deaths',
				'Total Active',
				// 'Total Active_Est',
				'Total Recovered',
				// 'Total Recovered_Est',
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
			title: 'Covid-19 Cases by Type - %P%',
			title_template: 'Covid-19 Cases by Type - %P%',
			hide_columns: [],
			image_generating: 0,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
			// ["index", "Total Confirmed", "Total Deaths", "Total Recovered", "Total Active", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	world_graph_area_daily:
		{
			chart_type: 'google_area',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					//c: [0,1,2,3],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Daily_Combined_DARC.js",
			data_source_var: "sum_by_world_Daily_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered, window.ed.colors.confirmed],
			title: 'Daily Changes in Covid-19 Cases - %P%',
			title_template: 'Daily Changes in Covid-19 Cases - %P%',
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
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			filter_columns_by_label: ['Change in Deaths', 'Change in Active', 'Change in Recovered'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			title: 'Daily Changes in Covid-19 Cases - %P%',
			title_template: 'Daily Changes in Covid-19 Cases - %P%',
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
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3,4,5],
					l: 'n',
					f: 'l',
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Daily_Combined_DARC.js",
			data_source_var: "sum_by_world_Daily_Combined_DARC",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			filter_columns_by_label: [
				'Daily New Deaths',
				'Daily New Active',
				//'Daily New Active_Est',
				'Daily New Recovered',
				//'Daily New Recovered_Est',
				'Daily New Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [
				window.ed.colors.deaths_line,
				window.ed.colors.active_line,
				//chroma(window.ed.colors.active_line).brighten(2).hex(),
				window.ed.colors.recovered_line,
				//chroma(window.ed.colors.recovered_line).brighten(2).hex(),
				window.ed.colors.confirmed_line
			],
			title: 'Daily Changes in Covid-19 Cases - %P%',
			title_template: 'Daily Changes in Covid-19 Cases - %P%',
			image_generating: 0,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
		},
	country_graph_line_daily:
		{
			chart_type: 'google_line',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3],
					l: 'n',
					f: 'l',
					// l: 'n', // 'l'='log', 'm'='mirrorLog', unset=null='linear'
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			// filter_columns_by_label: ['Change in Deaths', 'Change in Active', 'Change in Recovered', 'Change in Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			filter_columns_by_label: [
				'Daily New Deaths',
				'Daily New Active',
				//'Daily New Active_Est',
				'Daily New Recovered',
				//'Daily New Recovered_Est',
				'Daily New Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [
				window.ed.colors.deaths_line,
				window.ed.colors.active_line,
				//chroma(window.ed.colors.active_line).brighten(2).hex(),
				window.ed.colors.recovered_line,
				//chroma(window.ed.colors.recovered_line).brighten(2).hex(),
				window.ed.colors.confirmed_line
			],
			title: 'Daily Changes in Covid-19 Cases - %P%',
			title_template: 'Daily Changes in Covid-19 Cases - %P%',
			image_generating: 0,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
			// ["index", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	world_graph_area_total_rate:
		{
			chart_type: 'google_area',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Rates_Combined_MAR.js",
			data_source_var: "sum_by_world_Total_Rates_Combined_MAR",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			title: 'Rates of Covid-19 Cases - %P%',
			title_template: 'Rates of Covid-19 Cases - %P%',
			is_stacked: 'percent',
			image_generating: 0,
			show_embed: false,
		},
	world_graph_line_total_rate:
		{
			chart_type: 'google_line',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3],
					l: 'n',
					f: 'l',
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Total_Rates_Combined_MAR.js",
			data_source_var: "sum_by_world_Total_Rates_Combined_MAR",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line],
			title: 'Rates of Covid-19 Cases - %P%',
			title_template: 'Rates of Covid-19 Cases - %P%',
			is_stacked: 'percent',
			image_generating: 0,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
		},
	country_graph_area_total_rate:
		{
			chart_type: 'google_area',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3],
					// l: 'n', // 'l'='log', 'm'='mirrorLog', unset=null='linear'
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			// filter_columns_by_label: ['Change in Deaths', 'Change in Active', 'Change in Recovered', 'Change in Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			filter_columns_by_label: [
				"Total Mortality_Rate", "Total Activity_Rate", "Total Recovery_Rate"
			],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			//column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line],
			title: 'Rates of Covid-19 Cases - %P%',
			title_template: 'Rates of Covid-19 Cases - %P%',
			is_stacked: 'percent',
			image_generating: 0,
			show_embed: false,
			// log_scale_custom: true,
			// ["index", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	country_graph_line_total_rate:
		{
			chart_type: 'google_line',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3],
					l: 'n',
					f: 'l',
					// l: 'n', // 'l'='log', 'm'='mirrorLog', unset=null='linear'
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			// filter_columns_by_label: ['Change in Deaths', 'Change in Active', 'Change in Recovered', 'Change in Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			filter_columns_by_label: [
				"Total Mortality_Rate", "Total Activity_Rate", "Total Recovery_Rate"
			],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			// column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line],
			title: 'Rates of Covid-19 Cases - %P%',
			title_template: 'Rates of Covid-19 Cases - %P%',
			image_generating: 0,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
			// ["index", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	// world_graph_area_daily_rate:
	// 	{
	// 		chart_type: 'google_area',
	// 		options:
	// 			{
	// 				dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
	// 			},
	// 		original_data: [],
	// 		filtered_data: [[]],
	// 		data_source: "global_sum_by_world/js/sum_by_world_Daily_Change_In_Rates_Combined_MAR.js",
	// 		data_source_var: "sum_by_world_Daily_Change_In_Rates_Combined_MAR",
	// 		//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
	// 		column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
	// 		title: 'Daily Changes in Rates of Covid-19 Cases - %P%',
	// 		title_template: 'Daily Changes in Rates of Covid-19 Cases - %P%',
	// 		image_generating: 0,
	// 		show_embed: false,
	// 	},
	world_graph_line_daily_rate:
		{
			chart_type: 'google_line',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3],
					l: 'n',
					f: 'l',
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "global_sum_by_world/js/sum_by_world_Daily_Change_In_Rates_Combined_MAR.js",
			data_source_var: "sum_by_world_Daily_Change_In_Rates_Combined_MAR",
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line],
			title: 'Daily Changes in Rates of Covid-19 Cases - %P%',
			title_template: 'Daily Changes in Rates of Covid-19 Cases - %P%',
			image_generating: 0,
			remove_first_dates: 1,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
		},
	
	country_graph_line_daily_rate:
		{
			chart_type: 'google_line',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					c: [0,1,2,3],
					l: 'n',
					// l: 'n', // 'l'='log', 'm'='mirrorLog', unset=null='linear'
					f: 'l',
				},
			original_data: [],
			filtered_data: [[]],
			data_source: "countries/js/country_%p%_T.js",
			data_source_var: "country_%p%_T",
			// filter_columns_by_label: ['Change in Deaths', 'Change in Active', 'Change in Recovered', 'Change in Confirmed'],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			filter_columns_by_label: [
				"Change in Mortality_Rate", "Change in Activity_Rate", "Change in Recovery_Rate"
			],
			//column_labels: ['Total Recovered', 'Total Active', 'Total Deaths'],
			// column_colors: [window.ed.colors.deaths, window.ed.colors.active, window.ed.colors.recovered],
			column_colors: [window.ed.colors.deaths_line, window.ed.colors.active_line, window.ed.colors.recovered_line],
			title: 'Daily Changes in Rates of Covid-19 Cases - %P%',
			title_template: 'Daily Changes in Rates of Covid-19 Cases - %P%',
			image_generating: 0,
			show_embed: false,
			format_custom: true,
			log_scale_custom: true,
			// ["index", "Change in Confirmed", "Change in Deaths", "Change in Recovered", "Change in Active"]
		},
	
	region_graph_line_total_absolute:
		{
			chart_type: 'google_line_region',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					l: 'n',
					t: 'TCa',
					c: [],
					f: 'l'
					// co: 'jet',
				},
			pora: 'a',
			original_data: [],
			filtered_data: [[]],
			data_source_template: "regions/js/region_%p%_%t%.js",
			data_source: "regions/js/region_%p%_%t%.js",
			data_source_var_template: "region_%p%_%t%",
			data_source_var: "region_%p%_%t%",
			// filter_columns_by_label: [
			// 	'Total Deaths',
			// 	'Total Active',
			// 	'Total Recovered',
			// 	'Total Confirmed'],
			// column_colors: [
			// 	window.ed.colors.deaths_line,
			// 	window.ed.colors.active_line,
			// 	// chroma(window.ed.colors.active_line).brighten(2).hex(),
			// 	window.ed.colors.recovered_line,
			// 	// chroma(window.ed.colors.recovered_line).brighten(2).hex(),
			// 	window.ed.colors.confirmed_line
			// ],
			column_colors: [],
			title: 'Covid-19 %T% in selected %P% Countries',
			title_template: 'Covid-19 Cases in selected %P% Countries',
			full_title_template: 'Covid-19 %T% in selected %P% Countries',
			most_title: 'Covid-19 %T% in selected Countries with %P%',
			most_title_template: 'Covid-19 Cases in selected Countries with %P%',
			most_full_title_template: 'Covid-19 %T% in selected Countries with %P%',
			image_generating: 0,
			show_embed: false,
			log_scale_custom: true,
			color_custom: false,
			format_custom: true
		},
	world_datatable_total_absolute:
		{
			chart_type: 'datatable_region',
			options:
				{
					sc: 'TC',
					scd: true,
					r: [],
					// co: 'jet',
				},
			pora: 'a',
			p: 'most-confirmed-cases',
			original_data: [],
			filtered_data: {"fields":[], "items": []},
			column_colors: [],
			// data_source_template: "regions/js/region_%p%_combined.js", // we only need the countries
			// data_source: "regions/js/region_%p%_combined.js",
			data_source_var_template: "region_%p%_combined",
			data_source_var: "region_%p%_combined",
			title: 'Covid-19 %T% in selected Countries with Most Confirmed Cases',
			title_template: 'Covid-19 Cases in selected Countries with Most Confirmed Cases',
			full_title_template: 'Covid-19 %T% in selected Countries with Most Confirmed Cases',
			most_title: 'Covid-19 %T% in selected Countries with Most Confirmed Cases',
			most_title_template: 'Covid-19 Cases in selected Countries with Most Confirmed Cases',
			most_full_title_template: 'Covid-19 %T% in selected Countries with Most Confirmed Cases',
			image_generating: 0,
			show_embed: false,
		},
	region_datatable_total_absolute:
		{
			chart_type: 'datatable_region',
			options:
				{
					sc: 'TC',
					scd: true,
					r: [],
					// co: 'jet',
				},
			pora: 'a',
			original_data: [],
			filtered_data: {"fields":[], "items": []},
			column_colors: [],
			// data_source_template: "regions/js/region_%p%_combined.js", // we only need the countries
			// data_source: "regions/js/region_%p%_combined.js",
			data_source_var_template: "region_%p%_combined",
			data_source_var: "region_%p%_combined",
			title: 'Covid-19 %T% in selected %P% Countries',
			title_template: 'Covid-19 Cases in selected %P% Countries',
			full_title_template: 'Covid-19 %T% in selected %P% Countries',
			most_title: 'Covid-19 %T% in selected Countries with %P%',
			most_title_template: 'Covid-19 Cases in selected Countries with %P%',
			most_full_title_template: 'Covid-19 %T% in selected Countries with %P%',
			image_generating: 0,
			show_embed: false,
		},
	
	region_graph_line_total_per_population:
		{
			chart_type: 'google_line_region',
			options:
				{
					dr: [get_chart_shown_start_date(), window.ed.last_day_iso],
					l: 'n',
					t: 'TCp',
					c: [],
					f: 'l',
					// co: 'rainbow',
				},
			pora: 'p',
			original_data: [],
			filtered_data: [[]],
			data_source_template: "regions/js/region_%p%_%t%.js",
			data_source: "regions/js/region_%p%_%t%.js",
			data_source_var_template: "region_%p%_%t%",
			data_source_var: "region_%p%_%t%",
			// filter_columns_by_label: [
			// 	'Total Deaths',
			// 	'Total Active',
			// 	'Total Recovered',
			// 	'Total Confirmed'],
			// column_colors: [
			// 	window.ed.colors.deaths_line,
			// 	window.ed.colors.active_line,
			// 	// chroma(window.ed.colors.active_line).brighten(2).hex(),
			// 	window.ed.colors.recovered_line,
			// 	// chroma(window.ed.colors.recovered_line).brighten(2).hex(),
			// 	window.ed.colors.confirmed_line
			// ],
			column_colors: [],
			title: 'Covid-19 %T% per 1M People in selected %P% Countries',
			title_template: 'Covid-19 Cases per 1M People in selected %P% Countries',
			full_title_template: 'Covid-19 %T% per 1M People in selected %P% Countries',
			most_title: 'Covid-19 %T% per 1M People in selected Countries with %P%',
			most_title_template: 'Covid-19 Cases per 1M People in selected Countries with %P%',
			most_full_title_template: 'Covid-19 %T% per 1M People in selected Countries with %P%',
			image_generating: 0,
			show_embed: false,
			log_scale_custom: true,
			color_custom: false,
			format_custom: true,
		},
	
	region_datatable_total_per_population:
		{
			chart_type: 'datatable_region',
			options:
				{
					sc: 'TC',
					scd: true,
					r: [],
					// co: 'jet',
				},
			pora: 'p',
			original_data: [],
			filtered_data: {"fields":[], "items": []},
			column_colors: [],
			// data_source_template: "regions/js/region_%p%_combined.js", // we only need the countries
			// data_source: "regions/js/region_%p%_combined.js",
			data_source_var_template: "region_%p%_pop_combined",
			data_source_var: "region_%p%_pop_combined",
			title: 'Covid-19 %T% in selected %P% Countries',
			title_template: 'Covid-19 Cases per 1M People in selected %P% Countries',
			full_title_template: 'Covid-19 %T% per 1M People in selected %P% Countries',
			most_title: 'Covid-19 %T% per 1M People in selected Countries with %P%',
			most_title_template: 'Covid-19 Cases per 1M People in selected Countries with %P%',
			most_full_title_template: 'Covid-19 %T% per 1M People in selected Countries with %P%',
			image_generating: 0,
			show_embed: false,
		},
	
	world_datatable_total_per_population:
		{
			chart_type: 'datatable_region',
			options:
				{
					sc: 'TC',
					scd: true,
					r: [],
					// co: 'jet',
				},
			pora: 'p',
			p: 'most-confirmed-cases',
			original_data: [],
			filtered_data: {"fields":[], "items": []},
			column_colors: [],
			// data_source_template: "regions/js/region_%p%_combined.js", // we only need the countries
			// data_source: "regions/js/region_%p%_combined.js",
			data_source_var_template: "region_%p%_pop_combined",
			data_source_var: "region_%p%_pop_combined",
			title: 'Covid-19 %T% per 1M People in selected Countries with Most Confirmed Cases',
			title_template: 'Covid-19 Cases per 1M People in selected Countries with Most Confirmed Cases',
			full_title_template: 'Covid-19 %T% per 1M People in selected Countries with Most Confirmed Cases',
			most_title: 'Covid-19 %T% per 1M People in selected Countries with Most Confirmed Cases',
			most_title_template: 'Covid-19 Cases per 1M People in selected Countries with Most Confirmed Cases',
			most_full_title_template: 'Covid-19 %T% per 1M People in selected Countries with Most Confirmed Cases',
			image_generating: 0,
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

path = window.location.pathname.split('/');
console.log("path", window.location.pathname, path);
if (path[path.length-1]==='')
{
	path.pop();
}
console.log("path[path.length-1]", path[path.length-1]);
let used_path = path[path.length-1];
if (used_path === 'chart')
{
	used_path = path[path.length-2];
}
if(used_path.substr(0, 5)==='most-')
{
	switch (used_path)
	{
	default:
	case 'most-confirmed-cases':
	case 'most-confirmed-cases-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'TCa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'TCp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'TC';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'TC';
		break;
	case 'most-active-cases':
	case 'most-active-cases-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'TAa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'TAp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'TA';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'TA';
		break;
	case 'most-recovered-cases':
	case 'most-recovered-cases-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'TRa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'TRp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'TR';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'TR';
		break;
	case 'most-total-deaths':
	case 'most-total-deaths-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'TDa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'TDp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'TD';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'TD';
		break;
	case 'most-daily-new-confirmed-cases':
	case 'most-daily-new-confirmed-cases-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'DCa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'DCp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'DC';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'DC';
		break;
	case 'most-daily-new-active-cases':
	case 'most-daily-new-active-cases-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'DAa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'DAp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'DA';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'DA';
		break;
	case 'most-daily-new-recovered-cases':
	case 'most-daily-new-recovered-cases-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'DRa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'DRp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'DR';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'DR';
		break;
	case 'most-daily-new-deaths':
	case 'most-daily-new-deaths-per-million':
		window.ed.chart_templates['region_graph_line_total_absolute'].options.t = 'DDa';
		window.ed.chart_templates['region_graph_line_total_per_population'].options.t = 'DDp';
		window.ed.chart_templates['region_datatable_total_absolute'].options.sc = 'DD';
		window.ed.chart_templates['region_datatable_total_per_population'].options.sc = 'DD';
		break;
	}
}

for (let [chart_key, chart] of Object.entries(window.ed.chart_templates))
{
	window.ed.chart_templates[chart_key]['default_option'] = Object.assign({}, {}, window.ed.chart_templates[chart_key]['option']);
	window.ed.chart_templates[chart_key]['range_date_list'] = [];
	window.ed.chart_templates[chart_key]['range_date_labels'] = {};
	
	if(path[path.length-1].substr(0, 5)==='most-')
	{
		window.ed.chart_templates[chart_key]['title'] = window.ed.chart_templates[chart_key]['most_title'];
		window.ed.chart_templates[chart_key]['title_template'] = window.ed.chart_templates[chart_key]['most_title_template'];
		window.ed.chart_templates[chart_key]['full_title_template'] = window.ed.chart_templates[chart_key]['most_full_title_template'];
	}
	window.ed.chart_templates[chart_key]['title'] = window.ed.chart_templates[chart_key]['title_template'];
		if (typeof(window.ed.chart_templates[chart_key]['full_title_template'])==='undefined')
		{
		window.ed.chart_templates[chart_key]['full_title_template'] = window.ed.chart_templates[chart_key]['title_template'];
		}
	window.ed.chart_templates[chart_key]['full_title_template'] += '<br> %dr0% - %dr1%';
	//window.ed.chart_templates[chart_key]['full_title_template'] += window.ed.first_day.toLocaleDateString('en-GB')+' - '+window.ed.last_day.toLocaleDateString('en-GB');
	window.ed.chart_templates[chart_key]['full_title'] = window.ed.chart_templates[chart_key]['full_title_template'];
}

console.log("window.ed.chart_templates['world_graph_line_total'].options", window.ed.chart_templates['world_graph_line_total'].options);