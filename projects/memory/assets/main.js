var main = function() {
    var infoBox = '<b>This is a test</b>';
    $('.well').hover(
        function() {
            $('#sideBar').append(infoBox);
        },
        function() {
            $('#sideBar').html('');
        });
};

$(document).ready(main);