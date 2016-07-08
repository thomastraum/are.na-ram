$ ->
	loadPosts( buildQuery() )


page = 1
posts_per_page=15

buildQuery = () ->
	url = "http://api.are.na/v2/channels/arena-influences/contents?page=#{page}&per=#{posts_per_page}"

loadPosts =(url) ->
	$.getJSON(url, (response) -> 
		# console.log('results received', response)
		# parseResponse(response.contents)
		addPost post for post in response.contents
		# renderPage(postsHtml)
		renderFooter()
	)

addPost = (post) ->

	template = getTemplate "#postTemplate"
	console.log template
	template.attr("id", post.id)
	$("#titel", template).html(post.generated_title)

	mediacontainer = $("#mediacontainer", template);
	switch post.class
		when "Image"
			addImagePost post, mediacontainer
		when "Text"
			addTextPost post, mediacontainer
		when "Media"
			addMediaPost post, mediacontainer
		else
			console.log "unknown post type", post.class, post

	$("#posts-container").append(template)



addImagePost = (post, container) ->
	# console.log "image post", post.image
	imageTemplate = getTemplate "#imageTemplate"
	$("img", imageTemplate).attr("src", post.image.large.url)
	container.html(imageTemplate)

addTextPost = (post, container) ->
	textTemplate = getTemplate "#textTemplate"
	$("#content", textTemplate).html(post.content_html)
	container.html(textTemplate)

addMediaPost = (post, container) ->
	mediaTemplate = getTemplate "#mediaTemplate"
	$("#video", mediaTemplate).html(post.embed.html)
	container.html(mediaTemplate)
	# console.log "media post", post.embed
	# html = "<div id='#{post.id}' class='col-md-6 col-md-offset-3'>
		# 	#{post.embed.html}
		# </div>"


renderFooter = (page, posts_per_page) ->
	html = ""
	if page > 1
		html = "<li><a id='prev' href='#''>Previous</a></li>"
	html += "<li><a id='next' href='#''>Next</a></li>"

	$('#pager').html(html)


# Helpers

getTemplate = (type) ->
	template = $(type).clone();
	template.attr("id", null);
