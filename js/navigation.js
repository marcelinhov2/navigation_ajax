$(document).ready(function(){
	SWFAddress.addEventListener(SWFAddressEvent.CHANGE, route);
	$('#menu a').click( redirect )
})

var path;

function redirect()
{
	window.location = "#/" + $(this).attr('href').replace( ".html" , "" );
	return false;
}

function route()
{
	path = document.location.hash;
	path = path.replace('#/' , '');
	path += '.html';
	
	// console.log( path );
	// Busca o conteúdo na página correta;
	// console.log( window.location.toString() );
	
	if( path != '.html' )
		load( path );
}

function destroy()
{
	// FadeOut na page atual;
	// No callback, carrega a próxima página e exibe o preloader;
}

function render()
{
	// console.log( 'render content' );
	//FadeIn do conteúdo
}

function show_preloader()
{
	// console.log( 'show_preloader' );
	//FadeIn Loader
}

function hide_preloader()
{
	// console.log( 'hide_preloader' );
	//FadeOut Loader
}

function load( url )
{
	// console.log( 'load' );
	show_preloader();
	$('#header_content').load( url +' #header_content', after_load );
	$('#content').load( url +' #content', after_load );
}

function after_load()
{
	// console.log( 'after_load' );
	hide_preloader();
	render();
}
