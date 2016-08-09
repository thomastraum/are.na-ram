$ ->
	nextPage()

settings = 
	channelslug : "random-access-memory"
	# channelslug : "arena-influences"
	# channelslug : "ttext"

posts = []

queryOptions = 
	page: 0
	direction: "desc"
	sort: "position"
	per: 6 

# state
loading = false

nextPage = () ->
	queryOptions.page++
	loadPosts(buildQuery())

buildQuery = () ->
	query = "https://api.are.na/v2/channels/#{settings.channelslug}/contents?#{$.param(queryOptions)}"

loadPosts =(url) ->
	$.getJSON(url, (response) -> 
		# console.log('results received', response)
		addPost post for post in response.contents
		loading = false
	)

addPost = (post) ->

	template = getTemplate "#postTemplate"
	template.attr("id", post.id)

	mediacontainer = $("#mediacontainer", template);
	switch post.class
		when "Image"
			mediacontainer.html( addImagePost post )
		when "Text"
			# $("#titel", template).html(post.generated_title)
			mediacontainer.html( addTextPost post )
		when "Media"
			mediacontainer.html( addMediaPost post )
		else
			console.log "unknown post type", post.class, post

	posts.push post
	$("#posts-container").append(template)

addImagePost = (post) ->
	imageTemplate = getTemplate "#imageTemplate"
	$("img", imageTemplate).attr("src", post.image.original.url)
	return imageTemplate

addTextPost = (post) ->
	textTemplate = getTemplate "#textTemplate"
	$("#title", textTemplate).text(post.generated_title)
	$("#content", textTemplate).html(post.content_html)
	return textTemplate

addMediaPost = (post) ->
	mediaTemplate = getTemplate "#mediaTemplate"
	$("#title", mediaTemplate).text(post.generated_title)
	$("#video", mediaTemplate).html(post.embed.html)
	return mediaTemplate

updateFooter = (page, posts_per_page) ->
	footerTemplate = getTemplate "#footer"
	if page <=2
		$('#prev').hide()
	else
		$('#prev').show()
	$('#pager').html(html)


# Helpers
getTemplate = (type) ->
	template = $(type).clone();
	template.attr("id", null);

# infinite scrolling
window.addEventListener "scroll", (e) => 

	if posts.length 
		scrollTop = $(window).scrollTop();
		docHeight = $(document).height();
		winHeight = $(window).height();
		dif = docHeight - winHeight;

		if scrollTop > dif - winHeight * 2
			unless loading
				loading = true
				nextPage()