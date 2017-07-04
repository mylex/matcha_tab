window.onload = function() {
    var interval = setInterval(function() {
        var momentNow = moment();
        document.getElementById('date-part').innerHTML = momentNow.format('dddd') + ' | ' + momentNow.format('ll');
        // $('#date-part').html();
        document.getElementById('time-part').innerHTML = momentNow.format('LTS');
        // $('#time-part').html();
    }, 100);
}

$(document).ready(function() {
    $('#kensaku_box').focus();

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
        setTimeout(function() {
            $(".most-visited-row").show(300);
        }, 700);
        setTimeout(function() {
            $(".show_hostory_tab").show(300);
        }, 900);
    } else if (settings.SHOW_MOST_VISITED) {
        setTimeout(function() {
            $(".most-visited-row").show(300);
        }, 700);
    } else if (settings.SHOW_HISTORY) {
        setTimeout(function() {
            $(".show_hostory_tab").show(300);
        }, 900);
    } else {
        setTimeout(function() {
            $(".most-visited-row").show(300);
        }, 700);
    }


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