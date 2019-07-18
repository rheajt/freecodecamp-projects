var main = function() {

$('#title').hover(
    function() {
        // mouseenter
        var title_instr = '<h1>Type your name here.</h1>
                           <h3>You always want to put your name on your work.</h3>';

        $(title_instr).appendTo('#instructions');
    }, 
    function() {
        // mouseleave
    });
};

$(document).ready(main);
