function copy_object(obj)
{
	return JSON.parse(JSON.stringify(obj));
}

function load_script(src, onload_function)
{
	var script = document.createElement('script');
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

window.ed = {};
window.ed.source_location = ''; // TODO: github or local depending on uri
window.ed.data_folder = '/p/data/'; // TODO: github or local depending on uri

load_style('//unpkg.com/bootstrap/dist/css/bootstrap.min.css');
load_style('//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css');
load_style('https://cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css');
load_style('https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,500i,600,600i,700,700i&display=swap');
load_style(window.ed.source_location+'/css/bootstrap.min.css');
load_style(window.ed.source_location+'/css/style.css');

// load_fetch(window.ed.source_location+'/vue/epidemicdata-anychart-map-choropleth.vue');
// load_fetch(window.ed.source_location+'/vue/epidemicdata-anychart-area.vue');
// load_fetch(window.ed.source_location+'/vue/epidemicdata-info-div.vue');


window.ed.scripts_to_load = [
	'//polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver',
	'//unpkg.com/vue@latest/dist/vue.min.js',
	'//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js',
	'//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js',
	'//unpkg.com/vue-router/dist/vue-router.js',
	//'//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js',
	'https://www.gstatic.com/charts/loader.js',
	'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
	"https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.8/jquery.csv.min.js",
	"https://cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js",
	"https://cdn.anychart.com/releases/8.7.1/js/anychart-bundle.min.js",
	//"https://cdn.anychart.com/geodata/2.0.0/countries/australia/australia.js",
	"https://cdn.anychart.com/releases/8.7.1/geodata/custom/world/world.js",
	"https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js",
	"https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.0/chroma.min.js",
	"https://unpkg.com/http-vue-loader",
	"https://cdn.jsdelivr.net/npm/vue-slider-component@latest/dist/vue-slider-component.umd.min.js",
	window.ed.source_location+"/js/variables.js",
	window.ed.source_location+"/js/chart_templates.js",
	window.ed.source_location+"/js/custom.js",
	window.ed.source_location+"/js/mixin.js",
];

window.ed.number_of_scripts = window.ed.scripts_to_load.length;
window.ed.scripts_loaded_so_far = 0;

for (let i=0, c=window.ed.scripts_to_load.length; i<c; i++)
{
	load_script(window.ed.scripts_to_load[i]);
}