/*
Jquery SPA without hash example. A simple code!
Version: 0.1.0.
Written by: Sedem stickx <sedemdatsa69@gmail.com>
*/
var _google_sheet_url = {
   'ban-chay': 'https://docs.google.com/spreadsheets/d/1MPNTNmSOtGPTszMC4w4yAJRCnKF8cOQAG6gYHcS3QAU/edit',
   'cham-soc-da-mat': 'https://docs.google.com/spreadsheets/d/1MPNTNmSOtGPTszMC4w4yAJRCnKF8cOQAG6gYHcS3QAU/edit',
}

function _load_sheet(categoryId, onLoaded) {
   websheet(categoryId, {  // <-- data source name

      // URL of the spreadsheet
      url: _google_sheet_url[categoryId],

      // Spreadsheet tab name
      sheet: categoryId,
      onLoaded: onLoaded,

      aliases: {
         link_slug: function (row) {
            return "san-pham/" + categoryId + '/chi-tiet/' + row['slug'].value;
         },
         thumbnails_html: function (row) {
            return row['thumbnails'].value.split(/\s+/).map(function (item, i) {
               return "<img src='" + item + "' alt='' class='img" + (i + 1) + "'></img>";
            }).join('');
         },
         review_count_text: function (row) {
            return '(' + row['review_count'].value + ')';
         },
         rating_icon_html: function (row) {
            return '<li><i class="bi bi-star-fill"></i></li>'.repeat(row['rating'].value);
         }
      }
   })
}
var router = new PathParser();

router.add('danh-muc/:categoryId', function () {
   console.log("router level 2");
   var categoryId = this.categoryId;

   console.log("categoryId:" + this.categoryId);
   var category = 'danh-muc';
   var page = 'part/' + category + '/' + categoryId + '.html';
   console.log("page:" + page);
   $.get(page, function (pageContent) {//return selected page content trough ajax.
      $("#container").html(pageContent).promise().done(function () {
         _load_sheet(categoryId, function (data) {
            console.log('data =', data);
         });
         _load_scripts();
      });

   });
});
router.add('san-pham/:categoryId/:product/:productId', function () {
   console.log("router level 3");
   var categoryId = this.categoryId;
   var productId = this.productId;
   console.log("categoryId:" + this.categoryId);
   console.log("productId:" + this.productId);
   var category = 'danh-muc';
   var page = 'part/' + category + '/' + this.product + '.html';
   $.get(page, function (pageContent) {
      $("#container").html(pageContent).promise().done(function () {
         _load_sheet(categoryId, function (data) {
            console.log('data =', data);
            var product = data.find(function (item) {
               return item.slug.value.trim() == productId.trim();
            }).__value;
            product.images_arr = product.images.trim().split(/\s+/).map(function (item) {
               return item.trim();
            });
            product.images_nav_arr = product.images_nav.trim().split(/\s+/).map(function (item) {
               return item.trim();
            });
            product.category_html = product.category.split(/\s+/).map(function (item) {
               var _arr = item.trim().split('|');
               return '<a href="' + _arr[1] + '" data-link>' + _arr[0] + '</a>';
            }).join(',');
            console.log('product =', product);
            $("#breadcrumb-section").html(doT.template($('#breadcrumb-section-tmpl').text(), undefined, {})(product));
            $("#shop-details-top-section").html(doT.template($('#shop-details-top-section-tmpl').text(), undefined, {
               rating_icon: function () {
                  let icon = [];
                  for (let i = 0; i < product.rating; i++) {
                     icon.push("<i class='bi bi-star-fill'></i>");
                  }
                  return icon.join('');
               }
            })(product));
            _load_scripts();
         });

      });
   });
});
router.add(':category', function () {
   console.log("router level 1");
   var category = this.category;
   var page = 'part/' + category
   console.log("page:" + page);
   $.get(page, function (pageContent) {//return selected page content trough ajax.
      $("#container").html(pageContent).promise().done(function () {
         // _load_sheet(categoryId, function (data) {
         //    console.log('data =', data);
         // });
         _load_scripts();
      });

   });
});
function _websheet() {
   console.log("load sheets");
   websheet('shop-list', {  // <-- data source name

      // URL of the spreadsheet
      url: 'https://docs.google.com/spreadsheets/d/1MPNTNmSOtGPTszMC4w4yAJRCnKF8cOQAG6gYHcS3QAU/edit',

      // Spreadsheet tab name
      sheet: 'shop-list',
      onLoaded: data => console.log('data =', data),

      aliases: {
         thumbnails_html: function (row) {
            return row['thumbnails'].value.split('|').map(function (item, i) {
               return "<img src='" + item + "' alt='' class='img" + (i + 1) + "'></img>";
            }).join('');
         },
         review_count_text: function (row) {
            return '(' + row['review_count'].value + ')';
         },
         rating_icon_html: function (row) {
            return '<li><i class="bi bi-star-fill"></i></li>'.repeat(row['rating'].value);
         }
      }
   })
   websheet('categories', {  // <-- data source name

      // URL of the spreadsheet
      url: 'https://docs.google.com/spreadsheets/d/1MPNTNmSOtGPTszMC4w4yAJRCnKF8cOQAG6gYHcS3QAU/edit',

      // Spreadsheet tab name
      sheet: 'categories',

   })
}
// _websheet();
function _form_submit() {
   // The URL you got from the form action attribute
   let formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSe6pX_L94HjJ-Rr7sCQD_JejE9jv9-7S5Ilo_j7I79T9Gn2xQ/formResponse";

   // Your own form implementation
   let form = $('.payment-form');
   let checkout_section = $('.checkout-section');

   // An object that lets easily translate our own form's name fields with the name fields from the google form
   let nameTranslationTable = {
      'fname': 'entry.293784113',

   };

   // Override the form submit action
   form.off().on('submit', function (e) {
      // Prevent default action
      e.preventDefault()

      // If you want to do any client side validation, do it here.

      // Use the name translation table to convert our own form's response with google form's expected response
      var params = {};
      Object.keys(nameTranslationTable).forEach(e => {
         params[nameTranslationTable[e]] = checkout_section.find(`[name='${e}']:first`).val();
      });

      // Serialize
      let serializedData = $.param(params);
      console.log(serializedData);
      // Submit the form


      $.ajax({
         url: 'https://proxy.cors.sh/' + formURL,
         headers: {
            "x-cors-api-key": "live_6d72cde365cc109c4065e1519f51dd3e6c944840990a89a9"
         },
         method: 'POST',
         data: serializedData,
      })
         // Get a response. This response will ALWAYS BE A CORS ERROR.
         .always(function (r) {
            console.log('Form submitted!')
            // Display thank you page, fire a pixel, or show a message.
         });
   });
}
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
      _form_submit();
      // _websheet();
   });
}
//deprecated method but is very useful in showing type of page load action a user has taken.
//For testing purposes.
console.log(performance.navigation.type);
$.get('part/topheader.html', function (pageContent) {//return selected page content trough ajax.
   $("#topheader").html(pageContent);//load content into main div
});
$.get('part/footergif.html', function (pageContent) {//return selected page content trough ajax.
   $("#footergif").html(pageContent);//load content into main div
});
function _load_default() {
   //when user clicks on any anchor tag with a data-link attribute fire this event.
   $(document).off().on('click', '[data-link]', function (e) {
      // console.log("test");
      e.preventDefault();//prevent anchor click default behaviour.

      var url = $(this).attr('href');//get url from clicked link.
      if (window.location.hash)
         url = window.location.hash.replace('#', '');

      var routes = url.substring(url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/') - 1) - 1) - 1) + 1);//return page route from url.
      console.log(routes)
      router.run(routes);


      // routes = routes != '' ? routes : "index.html";
      // console.log(routes);
      var url_state = window.location.origin + '/' + routes;
      console.log(url_state);
      window.history.pushState(null, null, url_state);//assign new url to address bar and add page in browser history without reloading the page.

      // var page = 'part/' + routes;
      // console.log(page);
      // // var routes = page.substring(0, page.lastIndexOf('.'));//remove file extension that shows up in the url bar.
      // // console.log(routes);

      // console.log("Ajax loaded: " + page);

      // $.get(page, function (pageContent) {//return selected page content trough ajax.
      //    $("#container").html(pageContent);//load content into main div
      //    _load_default();
      //    _load_scripts();
      // });

   });
}
_load_default();



//when window's history changes fire this event.
//e.g When user goes back or forward in a session browser.
$(window).on('popstate', function () {

   var url = window.location.pathname;//get page url from address bar.

   if (window.location.hash)
      url = window.location.hash.replace('#', '');
   var routes = url.substring(url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/') - 1) - 1) - 1) + 1);//return page route from url.
   console.log(routes)
   router.run(routes);
   // var routes = url.substring(url.lastIndexOf('/') + 1);//return page route from url.
   // console.log(routes);
   // var page = 'part/' + (routes != '' ? routes : "index.html");//if route is empty assign home.html to page to ajax load the default content.

   // console.log(page);


   // $.get(page, function (pageContent) {//return selected page content trough ajax.
   //    $("#container").html(pageContent);//load content into main div
   //    _load_scripts();
   // });
});



//.htaccess for apache or any other web server edit file has to be edited 
//to ensure that index.html file loads even if url in browser has been changed to maintain SPA system. 
//e.g When user reloads the page or enters or paste a url with the same domain name but different path in the browser.
$(window).on('load', function () {

   var url = window.location.pathname;//get page url from address bar.

   if (window.location.hash)
      url = window.location.hash.replace('#', '');
   var routes = url.substring(url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/', url.lastIndexOf('/') - 1) - 1) - 1) + 1);//return page route from url.
   console.log(routes)
   router.run(routes);


   // router.run(routes);
   // var page = 'part/' + (routes != '' ? routes : "index.html");//if route is empty assign home.html to page to ajax load the default content.

   // console.log(page);

   // $.get(page, function (pageContent) {//return selected page content trough ajax.
   //    $("#container").html(pageContent);//load content into main div
   //    _load_scripts();
   // });

});