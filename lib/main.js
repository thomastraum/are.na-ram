(function() {
  var addImagePost, addMediaPost, addPost, addTextPost, buildQuery, getTemplate, loadPosts, loading, nextPage, posts, queryOptions, settings, updateFooter;

  $(function() {
    return nextPage();
  });

  settings = {
    channelslug: "random-access-memory"
  };

  posts = [];

  queryOptions = {
    page: 0,
    direction: "desc",
    sort: "position",
    per: 6
  };

  loading = false;

  nextPage = function() {
    queryOptions.page++;
    return loadPosts(buildQuery());
  };

  buildQuery = function() {
    var query;
    return query = "https://api.are.na/v2/channels/" + settings.channelslug + "/contents?" + ($.param(queryOptions));
  };

  loadPosts = function(url) {
    $("#loading").addClass("is-visible");
    return $.getJSON(url, function(response) {
      var i, len, post, ref;
      ref = response.contents;
      for (i = 0, len = ref.length; i < len; i++) {
        post = ref[i];
        addPost(post);
      }
      loading = false;
      return $("#loading").removeClass("is-visible").addClass("not-visible");
    }).fail(function(jqxhr, textStatus, error) {
      console.log(textStatus);
      return $("#loading > h1").text(textStatus + ", " + error);
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
    $("img", imageTemplate).attr("src", post.image.original.url);
    return imageTemplate;
  };

  addTextPost = function(post) {
    var textTemplate;
    textTemplate = getTemplate("#textTemplate");
    if (post.generated_title !== "Untitled") {
      $("#title", textTemplate).text(post.generated_title);
    }
    $("#content", textTemplate).html(post.content_html);
    return textTemplate;
  };

  addMediaPost = function(post) {
    var mediaTemplate;
    mediaTemplate = getTemplate("#mediaTemplate");
    $("#title", mediaTemplate).text(post.generated_title);
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
            return nextPage();
          }
        }
      }
    };
  })(this));

}).call(this);

(function() {
  $(function() {
    var $backtotop;
    $backtotop = $(".cd-top");
    window.addEventListener("scroll", (function(_this) {
      return function(e) {
        var offset, scrollTop;
        scrollTop = $(window).scrollTop();
        offset = 600;
        if (scrollTop > offset) {
          return $backtotop.addClass('cd-is-visible');
        } else {
          return $backtotop.removeClass('cd-is-visible cd-fade-out');
        }
      };
    })(this));
    return $backtotop.on("click", (function(_this) {
      return function(e) {
        e.preventDefault();
        return $('body,html').animate({
          scrollTop: 0
        });
      };
    })(this));
  });

}).call(this);
