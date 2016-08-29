
# UI
$ ->
	# show hide elements
	$backtotop = $(".cd-top")
	$brand = $("#brand")

	window.addEventListener "scroll", (e) =>

		scrollTop = $(window).scrollTop()
		offset = 600

		if scrollTop > offset
			$backtotop.addClass('cd-is-visible')

			$brand.removeClass "visible"
				.addClass "not-visible"
		else

			$brand.removeClass "not-visible"
					.addClass "is-visible"

			$backtotop.removeClass('cd-is-visible cd-fade-out')

	$backtotop.on "click", (e) =>
		e.preventDefault();
		$('body,html').animate
			scrollTop: 0