
# UI
$ ->
	# back to top
	$backtotop = $(".cd-top")

	window.addEventListener "scroll", (e) => 
		scrollTop = $(window).scrollTop()
		offset = 600

		if scrollTop > offset
			$backtotop.addClass('cd-is-visible')
		else
			$backtotop.removeClass('cd-is-visible cd-fade-out')

	$backtotop.on "click", (e) =>
		e.preventDefault();
		$('body,html').animate
			scrollTop: 0