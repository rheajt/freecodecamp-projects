var main = function() {
    var numClicks = 0;
    var guess1id, guess2id;
    var guess1cls, guess2cls;
    var totalScore = 0;
    var totalCounter = 0;
    var scoreCounter = 20;
    var boxCount = $('.box').length;

    setInterval(function() {
        if (scoreCounter > 0) {
            scoreCounter--;
        }
    }, 750);

    $('.box').click(function() {
        numClicks++;

        switch (numClicks) {
            case 1:   // handle the first user click
                guess1cls = $(this).children('p').text();
                guess1id = $(this).attr('id');
                
                $(this).children('h1').fadeIn(800);
                $(this).addClass('guess');
                break;
            case 2:   // handle the second user click
                guess2cls = $(this).children('p').text();
                guess2id = $(this).attr('id');
                
                $(this).children('h1').fadeIn(800);
                $(this).addClass('guess');

                // deal with the logic of being a correct answer or not
                if ((guess1cls === guess2cls) && (guess1id !== guess2id)) {
                    $('.guess').removeClass('unsolved').addClass('solved').removeClass('guess');
                    numClicks = 0;
                    
                    totalScore += scoreCounter;
                    scoreCounter = 20;
                    $('.scoreboard').fadeOut('fast', function() {
                        $('<div class="h1">'+totalScore+'</div>').appendTo('.scoreboard');
                        $('.scoreboard').fadeIn('fast');
                    });
                    
                    totalCounter++;
                    if(totalCounter === (boxCount / 2)) {
                        $('.gameboard').fadeOut('slow', function() {
                            $('<div class="h1 text-center">'+totalScore+'</div>').appendTo('.scoreboard');
                            $('.scoreboard').fadeIn('slow');
                        });
                    }
                } else {
                    $('.guess').children().fadeOut(800);
                    $('.guess').removeClass('guess');
                    numClicks = 0;
                }
                break;
        }
    });
};

$(document).ready(main);