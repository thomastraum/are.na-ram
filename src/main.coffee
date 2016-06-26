$ ->
	url = "http://api.are.na/v2/channels/arena-influences/contents?page=1&per=20"
	
	$.getJSON(url, (response) -> 
		console.log('results received', response)
		parseResponse(response.contents)
		renderPage(postsHtml)
	)

postsHtml = ""

parseResponse = (response) ->
	renderPostType post for post in response

renderPostType = (post) ->
	switch post.class
		when "Image"
			postsHtml += renderImagePost post
		when "Text"
			postsHtml += renderTextPost post
		when "Media"
			postsHtml += renderMediaPost post
		else
			console.log "unknown post type", post.class, post		

renderImagePost = (post) ->
	# console.log "image post", post.image
	html = "<div id='#{post.id}' class='post imagepost col-md-12'>
				<img src='#{post.image.large.url}' class='img-responsive' />
			</div>"

renderTextPost = (post) ->
	# console.log "text post", post
	html = "<div id='#{post.id}' class='post textpost col-md-10 col-md-offset-1'>
			<h1>#{post.generated_title}</h1>
			#{post.content_html}
		</div>"

renderMediaPost = (post) ->	
	# console.log "media post", post.embed
	html = "<div id='#{post.id}' class='col-md-6 col-md-offset-3'>
			#{post.embed.html}
		</div>"

renderPage = (html)->
	$('#posts-container').append(html)