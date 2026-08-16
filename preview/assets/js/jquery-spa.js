/*
Jquery SPA without hash example. A simple code!
Version: 0.1.0.
Written by: Sedem stickx <sedemdatsa69@gmail.com>
*/
function loadScripts(urls, length, success) {
   if (length > 0) {
      script = document.createElement("script");
      script.src = urls[length - 1];
      console.log();
      script.onload = function () {
         console.log('%c Script: ' + urls[length - 1] + ' loaded!', 'color: #4CAF50');
         loadScripts(urls, length - 1, success);
      };
      document.getElementsByTagName("head")[0].appendChild(script);
   }
   else {
      if (success) {
         success();
      }
   }
}
function _load_scripts() {
   /* Write links sorted from last one to first to load */
   /* Here, jquery will be loaded first, then materialize and then wow libray. */
   urls = ['assets/js/main.js'];

   loadScripts(urls, urls.length, function () {
      /* Codes inside of here will be executed after js files load */

   });
}
//deprecated method but is very useful in showing type of page load action a user has taken.
//For testing purposes.
console.log(performance.navigation.type);
$.get('part/footergif.html', function (pageContent) {//return selected page content trough ajax.
   $("#footergif").html(pageContent);//load content into main div
});
function _load_default() {
   //when user clicks on any anchor tag with a data-link attribute fire this event.
   $(document).off().on('click', '[data-link]', function (e) {
      // console.log("test");
      e.preventDefault();//prevent anchor click default behaviour.

      var routes = $(this).attr('href');//get url from clicked link.
      routes = routes != '' ? routes : "index.html";
      console.log(routes);
      var url_state = window.location.origin + '/' + routes;
      console.log(url_state);
      window.history.pushState(null, null, url_state);//assign new url to address bar and add page in browser history without reloading the page.

      var page = 'part/' + routes;
      console.log(page);
      // var routes = page.substring(0, page.lastIndexOf('.'));//remove file extension that shows up in the url bar.
      // console.log(routes);

      console.log("Ajax loaded: " + page);

      $.get(page, function (pageContent) {//return selected page content trough ajax.
         $("#container").html(pageContent);//load content into main div
         _load_default();
         _load_scripts();
      });

   });
}
_load_default();



//when window's history changes fire this event.
//e.g When user goes back or forward in a session browser.
$(window).on('popstate', function () {

   var url = window.location.href;//get page url from address bar.
   console.log(url);
   var routes = url.substring(url.lastIndexOf('/') + 1);//return page route from url.
   console.log(routes);
   var page = 'part/' + (routes != '' ? routes : "index.html");//if route is empty assign home.html to page to ajax load the default content.

   console.log(page);


   $.get(page, function (pageContent) {//return selected page content trough ajax.
      $("#container").html(pageContent);//load content into main div
      _load_scripts();
   });
});



//.htaccess for apache or any other web server edit file has to be edited 
//to ensure that index.html file loads even if url in browser has been changed to maintain SPA system. 
//e.g When user reloads the page or enters or paste a url with the same domain name but different path in the browser.
$(window).on('load', function () {

   var url = window.location.href;//get page url from address bar.
   var routes = url.substring(url.lastIndexOf('/') + 1);//return page route from url.
   console.log(routes);

   var page = 'part/' + (routes != '' ? routes : "index.html");//if route is empty assign home.html to page to ajax load the default content.

   console.log(page);

   $.get(page, function (pageContent) {//return selected page content trough ajax.
      $("#container").html(pageContent);//load content into main div
      _load_scripts();
   });

});