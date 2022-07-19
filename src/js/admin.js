$(function () {
	// select box custom
	$(".select_type dt").on("click", function(e){
		e.stopPropagation();
		$(this).next("dd").toggleClass("open");
	});
	$(document).click(function(e){
		if(!$(".select_type").has(e.target).length > 0) {
			$('.select_type dd').removeClass("open");
		} 
	});

	// select box 말줄임 (최대 12글자)
	$('.select_box > option').each(function() {
		var length = 12; //표시할 글자 수 정하기
		$(this).each(function() {
			if ($(this).text().length >= length) {
				$(this).text($(this).text().substr(0, length) + '...'); //지정한 글자수 이후 표시할 텍스트 '...'
			}
		});
	});

	// 검색범위 설정
	$(".ic_filter").on("click", function(e){
		e.preventDefault();
		$(this).next(".filter_box").toggleClass("open");
	});
	$(".filter_box .close").on("click", function(e){
		e.preventDefault();
		$(this).parent().parent().removeClass("open");
	});

	// 검색 조건 박스 토글 
	$(".btn_search_toggle").on("click", function(e){
		e.preventDefault();
		$(this).toggleClass("close");
		$(this).parent().parent().next(".search_toggle_box").slideToggle(500);
			if($(this).hasClass('close')){
			$(this).parents(".search_box").css("border-radius", 0);
		} else {
			$(this).parents(".search_box").css("border-radius", "4px");
		}
		
		// fade in out 효과 줄때
		// if(!$(this).hasClass('close')){
		// 	$(this).text('닫기').parents(".search_box").css("border-radius", 0);					
		// 	$(this).addClass('close').parent().parent().siblings('.search_toggle_box').slideDown(function(){
		// 		$(this).animate({opacity:1},500);
		// 	});
		// } else {
		// 	$(this).text('열기').parents(".search_box").css("border-radius", "4px");
		// 	$(this).removeClass('close').parent().parent().siblings('.search_toggle_box').animate({opacity:0},500).slideUp();
		// }
	});

	// 	search_toggle_box 펼쳐진 상태
	$(".search_toggle_box.slidedown").slideDown();

	/* datepicker */
	var dateFormat = "yy.mm.dd",
		from = $("#from")
		.datepicker({
			defaultDate: "+1d",
			changeMonth: true,
			numberOfMonths: 1,
			dateFormat: 'yy.mm.dd'
		})
		.on("change", function () {
			to.datepicker("option", "minDate", getDate(this));
		}),
		to = $("#to").datepicker({
			defaultDate: "+1d",
			changeMonth: true,
			numberOfMonths: 1,
			dateFormat: 'yy.mm.dd'
		})
		.on("change", function () {
			from.datepicker("option", "maxDate", getDate(this));
		});

	function getDate(element) {
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}

		return date;
	};

	$(function() {
		$("#datepicker").datepicker({
			dateFormat: "yy.mm.dd"
		}).datepicker("setDate", new Date());
	});

});