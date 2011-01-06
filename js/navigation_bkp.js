$(document).ready(function(){
	SWFAddress.addEventListener(SWFAddressEvent.CHANGE, route);
	$('#menu a').click( redirect )
})

var path;

function redirect()
{
	path = $(this).attr('href');
	
	window.location = "#/" + path.replace( ".html" , "" );
	return false;
}

function route()
{
	// Busca o conteúdo na página correta;
	console.log( window.location.toString() );
}

function destroy()
{
	// FadeOut na page atual;
	// No callback, carrega a próxima página e exibe o preloader;
}

function render()
{
	//FadeIn do conteúdo
}

function show_preloader()
{
	//FadeIn Loader
}

function hide_preloader()
{
	//FadeOut Loader
}

function load( url )
{
	show_preloader();
	$.ajax({ url: url, context: document.body, success: after_load });
}

function after_load()
{
	hide_preloader();
	render();
}
