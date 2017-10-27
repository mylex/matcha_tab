$.getFeed({
    url: FEED_URL,
    success: function(feed) {
        //console.log(feed);
        for (var i = 0; i < feed.items.length && i < settings.FEED_ITEMS_COUNT; i++) {
            var item = feed.items[i];
            var html = '<li class="recent-post">';
            html += '<a href="' + item.link + '"><div class="post-img">';
            html += '<img src="' + item.media + '" class="img-responsive"></div></a>';
            html += '<a href="' + item.link + '"><p>' + item.title + '</p></a></li>';
            $("#matcha_article").append(html);
            save_to_local('matcha_article_' + i, item);
        }
    },
    error: function(jqXHR) {
        for (var i = 0; i < settings.FEED_ITEMS_COUNT; i++) {
            var item = get_from_local('matcha_article_' + i);
            if (item != null) {
                var html = '<li class="recent-post">';
                html += '<a href="' + item.link + '"><div class="post-img">';
                html += '<img src="' + item.media + '" class="img-responsive"></div></a>';
                html += '<a href="' + item.link + '"><p>' + item.title + '</p></a></li>';
                $("#matcha_article").append(html);
            }
        }
    }
});

clearLocalStorage();

function clearLocalStorage() {
    var d = new Date();
		var current_time_stamp = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		console.log(current_time_stamp);
    //console.log(current_time_stamp);
    if (current_time_stamp === '00:00:00') {
        localStorage.clear();
    }
}