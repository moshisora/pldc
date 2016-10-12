$(document).ready(function() {
    setupDOM();

    var $overlay = $('#pldc-overlay');
    var isLoaded = false;

    $('#pldc-input').change(function() {
        var file   = $(this).prop('files')[0];
        var reader = new FileReader();

        if (!file.type.match('image.*')) return;

        reader.onload = function() {
            isLoaded = true;
            $overlay.attr('src', reader.result);
            $overlay.show();
        }
        reader.readAsDataURL(file);
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
        if (request.message === 'toggleOverlay') {
            if (!isLoaded) return;
            $overlay.toggle();
        }

        sendResponse();
    });

    function setupDOM () {
        var formText   = "<form enctype=\"multipart/form-data\" method=\"post\" " +
                         "style=\"position: absolute; top: 0px; right: 0px; background-color: white; z-index: 9999;\">" +
                         "</form>";
        var inputText  = "<input id=\"pldc-input\" type=\"file\" name=\"userfile\" accept=\"image\/\*\">";

        var $form   = $(formText);
        var $input  = $(inputText);

        var contentHeight = Math.max.apply(null, [
            document.body.clientHeight,
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.documentElement.clientHeight
        ]);

        var $overlay = $('<img id=\"pldc-overlay\">');
        $overlay.css({
            'display': 'none',
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'width': '100%',
            'height': contentHeight,
            'background-position': 'top',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'mix-blend-mode': 'difference'
        });

        $form.append($input);
        $('body').append($form);
        $('body').append($overlay);
    }
});
