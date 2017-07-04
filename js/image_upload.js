// Pre-Defined Variable and Fucntions 
var fileName;

var createTempName = function() {
    return 'custom_wallpaper_mas.jpg';
};

var errorFct = function(e) {
    console.error(e);
};

var addToSyncQueue = function(filename) {
    // adding to sync queue
    console.log('Adding to queue', filename);
};

$(document).on('change', '#customImageInput', function(event) {
    var file = event.target.files[0];
    fileName = createTempName(file);

    writeImage(fileName, file);
});


function writeImage(fileName, file) {
    getFileSystem(function(fileSystem) {
        fileSystem.root.getFile(fileName, { create: true }, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = writeSuccessFull;
                fileWriter.onerror = errorFct;
                fileWriter.write(file);
            }, errorFct);
        });
    });
}

var SIZE = 200 * 1024 * 1024; // 100 MB
var getFileSystem = function(successFct) {
    navigator.webkitPersistentStorage.requestQuota(SIZE, function() {
        window.webkitRequestFileSystem(window.PERSISTENT, SIZE, successFct, errorFct);
    }, errorFct);
};


var showImage = function(fileName) {
    var src = 'filesystem:' + window.location.origin + '/persistent/' + fileName;
    set_wallpaperImage(src);
    var img = $('<img />').attr('src', src);
    img.attr('width', '100px');
    $('.wallpaper_image_uploader').append(img);
};

var writeSuccessFull = function() {
    addToSyncQueue(fileName);
    showImage(fileName);
};


var readImage = function(fileName, successFct) {
    getFileSystem(function(fileSystem) {
        fileSystem.root.getFile(fileName, {}, function(fileEntry) {

            fileEntry.file(successFct, errorFct);

        }, errorFct);
    });
};


function set_wallpaperImage(src) {
    $('.body_back').css('background-image', 'url("' + src + '")');
    _inputSettings();
    location.reload();
}