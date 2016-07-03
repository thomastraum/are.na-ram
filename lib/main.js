(function() {
  var buildQuery, page, parseResponse, postsHtml, posts_per_page, queryApi, renderFooter, renderImagePost, renderMediaPost, renderPage, renderPostType, renderTextPost;

  $(function() {
    return queryApi(buildQuery());
  });

  page = 1;

  posts_per_page = 2;

  buildQuery = function() {
    var url;
    return url = "http://api.are.na/v2/channels/arena-influences/contents?page=" + page + "&per=" + posts_per_page;
  };

  queryApi = function(url) {
    return $.getJSON(url, function(response) {
      parseResponse(response.contents);
      renderPage(postsHtml);
      return renderFooter();
    });
  };

  postsHtml = "";

  parseResponse = function(response) {
    var i, len, post, results;
    results = [];
    for (i = 0, len = response.length; i < len; i++) {
      post = response[i];
      results.push(renderPostType(post));
    }
    return results;
  };

  renderPostType = function(post) {
    switch (post["class"]) {
      case "Image":
        return postsHtml += renderImagePost(post);
      case "Text":
        return postsHtml += renderTextPost(post);
      case "Media":
        return postsHtml += renderMediaPost(post);
      default:
        return console.log("unknown post type", post["class"], post);
    }
  };

  renderImagePost = function(post) {
    var html;
    return html = "<div id='" + post.id + "' class='post imagepost col-md-12'> <img src='" + post.image.large.url + "' class='img-responsive' /> </div>";
  };

  renderTextPost = function(post) {
    var html;
    return html = "<div id='" + post.id + "' class='post textpost col-md-10 col-md-offset-1'> <h1>" + post.generated_title + "</h1> " + post.content_html + " </div>";
  };

  renderMediaPost = function(post) {
    var html;
    return html = "<div id='" + post.id + "' class='col-md-6 col-md-offset-3'> " + post.embed.html + " </div>";
  };

  renderPage = function(html) {
    return $('#posts-container').append(html);
  };

  renderFooter = function(page, posts_per_page) {
    var html;
    html = "";
    if (page > 1) {
      html = "<li><a id='prev' href='#''>Previous</a></li>";
    }
    html += "<li><a id='next' href='#''>Next</a></li>";
    return $('#pager').html(html);
  };

}).call(this);
