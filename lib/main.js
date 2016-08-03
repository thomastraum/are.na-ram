(function() {
  var addImagePost, addMediaPost, addPost, addTextPost, buildQuery, getTemplate, loadPosts, loading, nextPage, page, posts, posts_per_page, updateFooter;

  $(function() {
    return nextPage();
  });

  page = 0;

  posts = [];

  posts_per_page = 15;

  loading = false;

  nextPage = function() {
    page++;
    return loadPosts(buildQuery());
  };

  buildQuery = function() {
    var url;
    return url = "http://api.are.na/v2/channels/arena-influences/contents?page=" + page + "&per=" + posts_per_page;
  };

  loadPosts = function(url) {
    return $.getJSON(url, function(response) {
      var i, len, post, ref;
      console.log('results received', response);
      ref = response.contents;
      for (i = 0, len = ref.length; i < len; i++) {
        post = ref[i];
        addPost(post);
      }
      return loading = false;
    });
  };

  addPost = function(post) {
    var mediacontainer, template;
    template = getTemplate("#postTemplate");
    template.attr("id", post.id);
    mediacontainer = $("#mediacontainer", template);
    switch (post["class"]) {
      case "Image":
        mediacontainer.html(addImagePost(post));
        break;
      case "Text":
        mediacontainer.html(addTextPost(post));
        break;
      case "Media":
        mediacontainer.html(addMediaPost(post));
        break;
      default:
        console.log("unknown post type", post["class"], post);
    }
    posts.push(post);
    return $("#posts-container").append(template);
  };

  addImagePost = function(post) {
    var imageTemplate;
    imageTemplate = getTemplate("#imageTemplate");
    $("img", imageTemplate).attr("src", post.image.large.url);
    return imageTemplate;
  };

  addTextPost = function(post) {
    var textTemplate;
    textTemplate = getTemplate("#textTemplate");
    $("#title", textTemplate).text(post.generated_title);
    $("#content", textTemplate).html(post.content_html);
    return textTemplate;
  };

  addMediaPost = function(post) {
    var mediaTemplate;
    mediaTemplate = getTemplate("#mediaTemplate");
    $("#video", mediaTemplate).html(post.embed.html);
    return mediaTemplate;
  };

  updateFooter = function(page, posts_per_page) {
    var footerTemplate;
    footerTemplate = getTemplate("#footer");
    if (page <= 2) {
      $('#prev').hide();
    } else {
      $('#prev').show();
    }
    return $('#pager').html(html);
  };

  getTemplate = function(type) {
    var template;
    template = $(type).clone();
    return template.attr("id", null);
  };

  window.addEventListener("scroll", (function(_this) {
    return function(e) {
      var dif, docHeight, scrollTop, winHeight;
      if (posts.length) {
        scrollTop = $(window).scrollTop();
        docHeight = $(document).height();
        winHeight = $(window).height();
        dif = docHeight - winHeight;
        if (scrollTop > dif - winHeight * 2) {
          if (!loading) {
            loading = true;
            nextPage();
            return console.log('sex');
          }
        }
      }
    };
  })(this));

}).call(this);
