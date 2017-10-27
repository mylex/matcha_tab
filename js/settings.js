// Predefined Variable
var FEED_URL = 'https://matcha-jp.com/en/feed/snsBookMark/',
    settings = { //default settings
        FEED_URL: FEED_URL,
        FEED_ITEMS_COUNT: 5,
        LANGUAGE: 'en',
        PUSH_NOTIFICATION: true,
        WALPAPER_IMAGE: '',
        SHOW_MOST_VISITED: true,
        SHOW_HISTORY: false,
    };

function _inputSettings() {
    var lang = $('#selectLanguage').val();
    var feed_url = 'https://matcha-jp.com/' + lang + '/feed/snsBookMark/';
    var feed_item = $('#feedItemsCount').val();
    var push_noti = $('#enablePushNotification').is(':checked');
    var wall_image = $('#customImageInput').val().replace(/.*(\/|\\)/, '');
    var showMostVisited = $('#showMostVisited').is(':checked');
    var showHistory = $('#showRecentHistory').is(':checked');
    var setDefaultImage = $('#defaultImage').is(':checked');
    if (wall_image === '') {
        if (settings.WALPAPER_IMAGE !== '' && !setDefaultImage) {
            wall_image = settings.WALPAPER_IMAGE;
        }
    }
    settings = {
        FEED_URL: feed_url,
        FEED_ITEMS_COUNT: feed_item,
        LANGUAGE: lang,
        PUSH_NOTIFICATION: push_noti,
        WALPAPER_IMAGE: wall_image,
        SHOW_MOST_VISITED: showMostVisited,
        SHOW_HISTORY: showHistory,
    };
    localStorage.removeItem('settings_data');
    save_to_local('settings_data', settings);
}

function save_to_local(key, value) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

function get_from_local(key) {
    var retrievedObject = null;
    if (localStorage.getItem(key)) {
        retrievedObject = localStorage.getItem(key);
    }
    return JSON.parse(retrievedObject);
}


var data = get_from_local('settings_data');
if (data !== null) {
    FEED_URL = data.FEED_URL;
    $('#selectLanguage').val(data.LANGUAGE);
    settings.LANGUAGE = data.LANGUAGE;

    $('#feedItemsCount').val(data.FEED_ITEMS_COUNT);
    settings.FEED_ITEMS_COUNT = data.FEED_ITEMS_COUNT;

    $('#enablePushNotification').prop('checked', data.PUSH_NOTIFICATION);
    settings.PUSH_NOTIFICATION = data.PUSH_NOTIFICATION;

    $('#showMostVisited').prop('checked', data.SHOW_MOST_VISITED);
    settings.SHOW_MOST_VISITED = data.SHOW_MOST_VISITED;

    $('#showRecentHistory').prop('checked', data.SHOW_HISTORY);
    settings.SHOW_HISTORY = data.SHOW_HISTORY;

    if (data.WALPAPER_IMAGE !== '') {
        settings.WALPAPER_IMAGE = data.WALPAPER_IMAGE;
        var src = 'filesystem:' + window.location.origin + '/persistent/custom_wallpaper_mas.jpg';
        var img = $('<img />').attr('src', src);
        img.attr('width', '100px');
        $('.wallpaper_image_uploader').append(img);
    } else {
        $('.body_back').css('background-image', 'url("https://source.unsplash.com/collection/1329013")');
    }
}