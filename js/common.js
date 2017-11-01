window.onload = function() {
    var interval = setInterval(function() {
				var momentNow = moment();
				var t_offset = new Date().getTimezoneOffset();
				momentNow.parseZone(t_offset);
        document.getElementById('date-part').innerHTML = '<span class="weekday">' + momentNow.format('dddd') + '</span><div class="date_board"><span class="day">' + momentNow.format('DD') + '</span><p class="month">'+momentNow.format('MMMM')+'</p><span class="year">'+momentNow.format('YYYY')+'</div>';
        // $('#date-part').html();
        document.getElementById('time-part').innerHTML = momentNow.format('HH:mm') + '<span>' + momentNow.format('A') + '</span>';
        // $('#time-part').html();
    }, 100);
}

$(document).ready(function() {
    $('#search_engine_selector').change(function() {
        if ($(this).prop('checked')) {
            $('.header_search_box form').attr('action', 'https://matcha-jp.com/' + settings.LANGUAGE + '/search/index');
            $('input.search_field').attr('name', 'keyword');
        } else {
            $('.header_search_box form').attr('action', 'https://google.com/search');
            $('input.search_field').attr('name', 'q');
        }
    });

    loadAndDisplayMostVisited();
    setTimeout(function() {
        $(".date_time_section").show(200);
        $(".matcha_article_sec").show(200);
    }, 500);
    if (settings.SHOW_MOST_VISITED && settings.SHOW_HISTORY) {
			$(".most_visited_button").show();
			$(".recently_browsed_button").show();
    } else if (settings.SHOW_MOST_VISITED) {
      $(".most_visited_button").show();
    } else if (settings.SHOW_HISTORY) {
      $(".recently_browsed_button").show();
    } 
		
		$('.most_visited_button').on('click touchend', function(){
			setTimeout(function() {
				$(".show_hostory_tab").hide();
				$('.most_visited_button').addClass("menu_style");
				$('.recently_browsed_button').removeClass("menu_style");
				$(".most-visited-row").toggle(300);
			}, 100);
		});

		$('.recently_browsed_button').on('click touchend', function(){
			setTimeout(function() {
				$(".most-visited-row").hide();
				$('.recently_browsed_button').addClass("menu_style");
				$('.most_visited_button').removeClass("menu_style");
				$(".show_hostory_tab").toggle(300);
			}, 100);
		});

    // For Wallpaper Image
    if (settings.WALPAPER_IMAGE !== '') {
        var src = 'custom_wallpaper_mas.jpg';
        readImage(src, function(result) {
            if (result.name != null) {
                var src = 'filesystem:' + window.location.origin + '/persistent/' + result.name;
                $('.body_back').css('background-image', 'url("' + src + '")');
            }
        });
    }

    $('#saveAndClose').on('click', function() {
        _inputSettings();
        $('#myModal').modal('hide');
        location.reload();
    });

});

var imageExisterCheck = function(e) {
    return 'exist';
};

function loadAndDisplayMostVisited() {
    // if (settings.SHOW_MOST_VISITED) {
    var html = '';
    chrome.topSites.get(function(data) {
        for (var i = 0; i < 10; i++) {
            if (data[i] != null) {
                html += '<a href="' + data[i].url + '"><li class="most-visited-site">' +
                    '<img width="15px" height="15px" src="chrome://favicon/' + data[i].url + '"> ' + data[i].title +
                    '</li></a>';
            }
        }
        $('#top_sites ul').append(html);
    });
}

// For To do List
//onkeydown="_todoinput(this)"
$('.todo_input_field').on('keydown', function(e) {
	if(event.keyCode == 13) {
		var todo_name = $('.todo_input_field').val();
		var to_do_counter = 0;
		if($('ul.to_do_list_ul li').size() > 0){
			to_do_counter = $('ul.to_do_list_ul li').length + 1;
		}else{
			to_do_counter = 1;
		}
		var html = '<li class="todo_each"><input type="checkbox" name="todo_'+to_do_counter+'" id="todo_chk">';
		html += '<label class="todo_'+to_do_counter+'" for="todo_chk">'+todo_name+'</label></li>';
		$(".to_do_list_ul").append(html);
		$('.todo_input_field').val('');
	}
});

$('#todo_button').on('click', function(){
	$('#to_do_input').focus();
});

function save_todo_list(todo_init_text) {
	

	save_to_local('matcha_article_' + i, item);
}