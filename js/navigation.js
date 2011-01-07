$(document).ready(function(){
	SWFAddress.addEventListener(SWFAddressEvent.CHANGE, route);
	$('#menu a').click( redirect )
})

var path;

var response;
var response_header;
var response_content;

var default_page = 'cases.html';

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
	else
	 load( default_page )	
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
	show_preloader();
	
	$.ajax({ url: url, success: function( text ){
	    // response = Variavel com toda resposta da página 
      response = $(text);
	    // response_header = Variavel com a resposta da página( Header ) 
      response_header = response.filter('#header_content').text();
	    // response_content = Variavel com a resposta da página( Content ) 
      response_content = response.filter('#content').text();
      
      if( response_header != '' )
        $( '#header_content' ).text( response_header );
      else
        $( '#header_content' ).load( default_page + ' #header_content' );

      if( response_content != '' )
        $( '#content' ).text( response_content );
      else
        $( '#content' ).load( default_page + ' #content' );
  }});

	// $('#header_content').load( url +' #header_content', after_load );
	// $('#content').load( url +' #content', after_load );
}

function after_load()
{
	// console.log( 'after_load' );
	hide_preloader();
	render();
}
