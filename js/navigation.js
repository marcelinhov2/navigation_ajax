$(document).ready( initialize )

var initialized = false;
var first_time = false;

var loading;

var header_content_height;
var header_mask_height_default;
var header_mask_height_current;


function initialize(){
	SWFAddress.addEventListener(SWFAddressEvent.CHANGE, route);
	$('#menu a').click( redirect );
	
	loading = '<span class="load">Loading</span>';
	
	header_mask_height_default = $( '#header_mask' ).css('min-height').replace('px' , '');
	header_mask_height_current = header_mask_height_default;
}

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
	
	
	// Desmonta pagina atual e no callback busca o conteúdo na página correta;
    destroy( proxy( this, load, path ) );
}

function destroy( callback )
{
    if( ! initialized )
    {
        initialized = true;
        header_mask_actual = $( '#header_mask' ).css('min-height').replace('px' , '');
        callback();
    }
	else
	{
		// FadeOut na page atual;
		// No callback, carrega a próxima página e exibe o preloader;
		$( '#header_content' ).fadeOut( "slow" );
		$( '#content' ).fadeOut( "slow", callback );
	}
}

function render()
{
	//Remove Loader
	$('.load').remove();
	
	//FadeIn do conteúdo
    $( '#header_content' ).fadeIn();
    $( '#content' ).fadeIn();
    
	header_content_height = $( '#header_content' ).height();
		
	if( header_content_height >= header_mask_height_current )
		animate_header_down();
	else
		animate_header_up();
		
	header_mask_height_current = $( '#header_mask' ).height();
}

function animate_header_down()
{
    $('#header_mask').animate({ height: header_content_height }, { duration: 500 });	
}

function animate_header_up()
{
    $('#header_mask').animate({ height: header_mask_height_default }, { duration: 500 });	
}

function show_preloader()
{
	//FadeIn Loader
    $('#header').append( loading );
    $('#container_content').append( loading );
    
    $( '.load' ).fadeIn();
}

function hide_preloader()
{
	//FadeOut Loader
    $('#header .load').fadeOut();
    $('#container_content .load').fadeOut('slow', render );
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