window.ed = {};
window.ed.screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
window.ed.screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
window.ed.screen_smallest = (window.ed.screen_width < window.ed.screen_height)?window.ed.screen_width:window.ed.screen_height;

var html_element = document.getElementsByTagName( 'html' )[0];
window.ed.screen_size_classes = '';
	if (window.ed.screen_width >= 1200)
	{
	window.ed.screen_size = 'xl';
	window.ed.screen_size_classes = 'size_xl size_lte_xl size_gte_xs size_gte_sm size_gte_md size_gte_normal size_gte_xl';
	}
	else if (window.ed.screen_width >= 992)
	{
	window.ed.screen_size = 'lg';
	window.ed.screen_size_classes = 'size_lg size_lte_lg size_lte_xl size_gte_xs size_gte_sm size_gte_md size_gte_lg';
	}
	else if (window.ed.screen_smallest >= 768)
	{
	window.ed.screen_size = 'md';
	window.ed.screen_size_classes = 'size_md size_lte_md size_lte_lg size_lte_xl size_gte_xs size_gte_sm size_gte_md';
	}
	else if (window.ed.screen_smallest >= 576)
	{
	window.ed.screen_size = 'sm';
	window.ed.screen_size_classes = 'size_sm size_lte_sm size_lte_md size_lte_lg size_lte_xl size_gte_xs size_gte_sm';
	}
	else
	{
	window.ed.screen_size = 'xs';
	window.ed.screen_size_classes = 'size_xs size_lte_xs size_lte_sm size_lte_md size_lte_lg size_lte_xl size_gte_xs';
	}
html_element.className += ' width_'+window.ed.screen_width+' height_'+window.ed.screen_height+' smallest_'+window.ed.screen_smallest+' '+window.ed.screen_size_classes;

window.ed.size_settings = {
	chart_width: {'xs': '80', 'sm': '85', 'md': '90', 'lg': '90', 'xl': '90'},
	chart_legend_left: {'xs': '20', 'sm': '15', 'md': '10', 'lg': '10', 'xl': '10'},
};

function copy_object(obj)
{
	return JSON.parse(JSON.stringify(obj));
}

function load_script(src, onload_function, attribs)
{
	var script = document.createElement('script');
	// if (typeof(attribs)!=='undefined')
	// {
	// 	for (let prop in attribs)
	// 	{
	// 		script[prop] = attribs[prop];
	// 	}
	// }
	// if ((typeof(onload_function)!=='undefined') && (onload_function!==false))
	// {
	// 	script.onload = onload_function;
	// }
	if (typeof(onload_function)!=='undefined')
	{
		script.onload = onload_function;
	}
	else
	{
		script.onload = function()
		{
			// console.log("["+src+"] LOADED");
			script_loaded();
		};
	}
	script.async = false;
	script.src = src;
	document.head.appendChild(script);
}
function load_style(href, attrs, onload_function)
{
	var link = document.createElement('link');
	if (typeof(onload_function)!=='undefined')
	{
		link.onload = onload_function;
	}
	link.href = href;
	link.type='text/css';
	link.rel='stylesheet';
	document.head.appendChild(link);
}
function load_fetch(href, attrs, onload_function)
{
	var link = document.createElement('link');
	if (typeof(onload_function)!=='undefined')
	{
		link.onload = onload_function;
	}
	link.href = href;
	link.rel='preload';
	link.as='fetch';
	document.head.appendChild(link);
}

function script_loaded()
{
	window.ed.scripts_loaded_so_far++;
	if (window.ed.scripts_loaded_so_far >= window.ed.number_of_scripts)
	{
		load_app()
	}
}
function load_app()
{
	console.log('ALL SCRIPTS LOADED');
	window.router = new VueRouter({
		mode: 'history'
	});
	load_script(window.ed.source_location+'/js/vue_app.js', function(){console.log('vue_app loaded');});
}


////////////////////////////////////////////////////////////////////////////////////////////

//window.ed.source_location = 'https://cdn.jsdelivr.net'+'/gh/datadesigncollective/epidemicdata-web/'; // TODO: github or local depending on uri
path = window.location.pathname.split('/');
window.ed.root = '';
	if ((typeof(path[1]!=='undefined') && (path[1]==='__test')))
	{
	window.ed.root = '/'+path[1];
	}
window.ed.source_location = window.ed.root+'/_web_elements'; // TODO: github or local depending on uri
window.ed.source_css_location = window.ed.source_location + '/css';
window.ed.source_js_location = window.ed.source_location + '/js';
window.ed.source_vue_location = window.ed.source_location + '/vue';

window.ed.data_folder = '/_data/'; // TODO: github or local depending on uri

load_style('//cdn.jsdelivr.net/gh/datadesigncollective/epidemicdata-web/__static/css/bootstrap.min.css');
load_style('//cdn.jsdelivr.net/gh/datadesigncollective/epidemicdata-web/__static/css/bootstrap-vue.min.css');
load_style('//cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css');
load_style('//fonts.googleapis.com/css?family=Montserrat:400,400i,500,500i,600,600i,700,700i&display=swap');
load_style('//gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css');
load_style(window.ed.source_css_location+'/bootstrap.min.css');
load_style(window.ed.source_css_location+'/style.css');
load_style('//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

// load_fetch(window.ed.source_location+'/vue/epidemicdata-anychart-map-choropleth.vue');
// load_fetch(window.ed.source_location+'/vue/epidemicdata-anychart-area.vue');
// load_fetch(window.ed.source_location+'/vue/epidemicdata-info-div.vue');


window.ed.scripts_to_load = [
	'//polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver',
	//'//cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js',
	'//cdn.jsdelivr.net/gh/datadesigncollective/epidemicdata-web/__static/js/vue.min.js',
	'//cdn.jsdelivr.net/gh/datadesigncollective/epidemicdata-web/__static/js/bootstrap-vue.min.js',
	'//cdn.jsdelivr.net/gh/datadesigncollective/epidemicdata-web/__static/js/vue-router.js',
	//'//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js',
	'https://www.gstatic.com/charts/loader.js',
	'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
	"https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.8/jquery.csv.min.js",
	"//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js",
	 "https://cdn.anychart.com/releases/8.7.1/js/anychart-bundle.min.js",
	//"https://cdn.anychart.com/geodata/2.0.0/countries/australia/australia.js",
	 "//cdn.anychart.com/releases/8.7.1/geodata/custom/world/world.js",
	 "//cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js",
	 "//cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.0/chroma.min.js",
	"//cdn.jsdelivr.net/gh/datadesigncollective/epidemicdata-web/__static/js/httpVueLoader.js",
	"//cdn.jsdelivr.net/npm/vue-slider-component@latest/dist/vue-slider-component.umd.min.js",
	"//gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js",
	window.ed.data_folder+"variables.js",
	window.ed.source_js_location+"/chart_templates.js",
	window.ed.source_js_location+"/custom.js",
	window.ed.source_js_location+"/mixin.js",
];

window.ed.number_of_scripts = window.ed.scripts_to_load.length;
window.ed.scripts_loaded_so_far = 0;

for (let i=0, c=window.ed.scripts_to_load.length; i<c; i++)
{
	load_script(window.ed.scripts_to_load[i]);
}