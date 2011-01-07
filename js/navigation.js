$(document).ready(function(){
	SWFAddress.addEventListener(SWFAddressEvent.CHANGE, route);
	$('#menu a').click( redirect )
})

var default_url = 'cases.html';
var initialized = false;

function redirect()
{
	window.location = $(this).attr('href');
	return false;
}

function route()
{
    var path, controller, action, params;
    
	path = document.location.hash;
	path = path.replace('#/' , '');
	path = path.split( "/" );
	
	controller = path.shift();
	action = path.shift();
	params = path.join( "|" );
	
	path = "drupal.php?controller="+ controller;
	path += "&action="+ action;
	path += "&params="+ params;
	
	// console.log( path );
	// Busca o conteúdo na página correta;
	// console.log( window.location.toString() );
	
    destroy( proxy( this, load, path ) );
	// else
	//  load( default_url )	
}

function destroy( callback )
{
    if( ! initialized )
    {
        initialized = true;
        callback();
    }
	else
	{
		$( '#header_content' ).fadeOut( "slow" );
		$( '#content' ).fadeOut( "slow", callback );
	}
	// FadeOut na page atual;
	// No callback, carrega a próxima página e exibe o preloader;
}

function render()
{
    $( '#header_content' ).fadeIn();
    $( '#content' ).fadeIn();
	// console.log( 'render content' );
	//FadeIn do conteúdo
}

function show_preloader()
{
    $('#header').append('<p class="load">Loading</p>')
    $('#container_content').append('<p class="load">Loading</p>')
	// console.log( 'show_preloader' );
	//FadeIn Loader
}

function hide_preloader()
{
	console.log( 'hide_preloader' );
    $('#header .load').fadeOut();
    $('#container_content .load').fadeOut();
	//FadeOut Loader
	render();
}

function load( url )
{
	show_preloader();
	$.ajax({ url: url, success: after_load });
}

function after_load( text )
{
	// response = Variavel com toda resposta da página 
	var response = $(text);
	// response_header = Variavel com a resposta da página( Header ) 
	var response_header = response.filter('#header_content').text();
	// response_content = Variavel com a resposta da página( Content ) 
	var response_content = response.filter('#content').text();
	  
	if( response_header != '' )
	$( '#header_content' ).text( response_header );
	// else
	//   \$( '#header_content' ).load( default_url + ' #header_content' );
	
	if( response_content != '' )
	$( '#content' ).text( response_content );
	// else
	//   \$( '#content' ).load( default_url + ' #content' );
	
	hide_preloader();
	render();
}


function proxy( scope, method, params )
{
    params = [].concat( params );
    return function ()
    {
        params = params.concat( Array.prototype.slice.call( arguments ) );
        method.apply( ( scope || window ), params );
    }
}