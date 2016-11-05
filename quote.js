
$(document).ready(function() {
  $("#button").click(function() {
    //this will be implementing JSON for random quotes
    $.getJSON("https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function (data){
            var author = data.quoteAuthor;
      if (author !== "") {
      //for the fadeout effect using jquery
        $("#random-content").fadeOut(500, function() {
          $("#random-quote").text(data.quoteText);
          $("#credit").text(data.quoteAuthor);
          console.log("https://api.duckduckgo.com/?q=" + author + "&callback=?&format=json")
          $.getJSON("https://api.duckduckgo.com/?q=" + author + "&format=json", function(data2){
                          var success = false;
              if (data2.Image !== "") {
                console.log(data2.Image);
                $("#image").html("<img src='" + data2.Image + "' class='img img-responsive'>");
              } else {
                for (var i = 0; i < data2.RelatedTopics.length; i++) {
                  console.log(data2.RelatedTopics[i]);
                  if (data2.RelatedTopics[i].Icon.URL !== "") {
                    console.log(data2.RelatedTopics[i].Icon.URL);
                    $("#image").html("<img src=\"" + data2.RelatedTopics[i].Icon.URL + "\" class='img img-responsive'><br>");
                    success = true;
                    break;
                  }
                }
                if (!success) {
                  $("#image").html("<div class='no-image'>no image</div>");
                }
              }
          })
          //this is for tweeting current quote
          console.log("\"" + data.quoteText + "\" - " + data.quoteAuthor)

          var encodedTweet = $("<div />").text("\"" + $.trim(data.quoteText) + "\" — " + data.quoteAuthor).html();
          console.log(encodedTweet);
          $("#random-content").fadeIn(500);
          $("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + encodedTweet)
        });
      }
    });

});

  });
var touch = 'ontouchstart' in document.documentElement
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0);

if (touch) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
};
