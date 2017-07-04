// Standard Google Universal Analytics code
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'); // Note: https protocol here

ga('create', 'UA-85162609-4', 'auto');
ga('set', 'checkProtocolTask', function() {}); // Removes failing protocol check. 
ga('require', 'displayfeatures');
ga('send', 'pageview', '/extension');


(function($) {
    $(function() {

        $(".content-widget-sidebar ul").on('click', 'li', function() {
            var url = $(this).find('a').attr('href');
            ga('send', 'event', 'article', url, 'widget_side');
        });
        $('#search_engine_selector').on('click', function() {
            if ($('#search_engine_selector').prop('checked', true)) {
                ga('send', 'event', 'search', 'matcha', 'search_box');
            } else {
                ga('send', 'event', 'search', 'google', 'search_box');
            }
        });
        $('#top_sites ul').on('click', 'a', function() {
            var url = $(this).attr('href');
            ga('send', 'event', 'most_visted', url, 'user_top_sites');
        });
        $('#typedUrl_div ul').on('click', 'li', function() {
            var url = $(this).find('a').attr('href');
            ga('send', 'event', 'recent_browsed', url, 'user_browse_history');
        });
        $('.width-mobile .column').on('click', 'a', function() {
            var url = $(this).attr('href');
            ga('send', 'event', 'bookmark', url, 'docker_link');
        });
        $("form").submit(function() {
            var keyword = $('#kensaku_box').val();
            var url = $(this).attr('action');
            url = url + '?keyword=' + keyword;
            ga('send', 'event', 'searched', url, 'search_box');
        });
        $('select#selectLanguage').on('change', function() {
            var lang = $(this).val();
            ga('send', 'event', 'language_switching', lang, 'language');
        });
        $('select#feedItemsCount').on('change', function() {
            var lang = $(this).val();
            ga('send', 'event', 'article_item', lang, 'feed_article');
        });
        $('#showMostVisited').on('click', function() {
            if ($('#search_engine_selector').prop('checked', true)) {
                ga('send', 'event', 'most_visted_set', 'enable', 'most_visted');
            } else {
                ga('send', 'event', 'most_visted_set', 'disable', 'most_visted');
            }
        });
        $('#showRecentHistory').on('click', function() {
            if ($('#search_engine_selector').prop('checked', true)) {
                ga('send', 'event', 'recent_history_set', 'enable', 'recent_history');
            } else {
                ga('send', 'event', 'recent_history_set', 'disable', 'recent_history');
            }
        });
        $('#enablePushNotification').on('click', function() {
            if ($('#search_engine_selector').prop('checked', true)) {
                ga('send', 'event', 'push_notification', 'enable', 'push_notification');
            } else {
                ga('send', 'event', 'push_notification', 'disable', 'push_notification');
            }
        });

    });
})(jQuery);