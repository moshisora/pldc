$(document).ready(function() {
    $('#button').on('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: "toggleOverlay"}, function(response) {
                console.log('sent message: toggle overlay');
            });
        });
    });
});
