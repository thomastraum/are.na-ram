(function() {
  var addImagePost, addMediaPost, addPost, addTextPost, buildQuery, getTemplate, loadPosts, page, posts_per_page, renderFooter;

  $(function() {
    return loadPosts(buildQuery());
  });

  page = 1;

  posts_per_page = 15;

  buildQuery = function() {
    var url;
    return url = "http://api.are.na/v2/channels/arena-influences/contents?page=" + page + "&per=" + posts_per_page;
  };

  loadPosts = function(url) {
    return $.getJSON(url, function(response) {
      var i, len, post, ref;
      ref = response.contents;
      for (i = 0, len = ref.length; i < len; i++) {
        post = ref[i];
        addPost(post);
      }
      return renderFooter();
    });
  };

  addPost = function(post) {
    var mediacontainer, template;
    template = getTemplate("#postTemplate");
    console.log(template);
    template.attr("id", post.id);
    $("#titel", template).html(post.generated_title);
    mediacontainer = $("#mediacontainer", template);
    switch (post["class"]) {
      case "Image":
        addImagePost(post, mediacontainer);
        break;
      case "Text":
        addTextPost(post, mediacontainer);
        break;
      case "Media":
        addMediaPost(post, mediacontainer);
        break;
      default:
        console.log("unknown post type", post["class"], post);
    }
    return $("#posts-container").append(template);
  };

  addImagePost = function(post, container) {
    var imageTemplate;
    imageTemplate = getTemplate("#imageTemplate");
    $("img", imageTemplate).attr("src", post.image.large.url);
    return container.html(imageTemplate);
  };

  addTextPost = function(post, container) {
    var textTemplate;
    textTemplate = getTemplate("#textTemplate");
    $("#content", textTemplate).html(post.content_html);
    return container.html(textTemplate);
  };

  addMediaPost = function(post, container) {
    var mediaTemplate;
    mediaTemplate = getTemplate("#mediaTemplate");
    $("#video", mediaTemplate).html(post.embed.html);
    return container.html(mediaTemplate);
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

  getTemplate = function(type) {
    var template;
    template = $(type).clone();
    return template.attr("id", null);
  };

}).call(this);
