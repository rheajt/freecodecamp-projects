$(document).ready(function() {

  //variables from localstorage
  var dates = getLocalStorage();

  //set the flickr background image
  var url = 'https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=a0c5283fcc7f85428635119bc088fa87&group_id=94834891%40N00&format=json&nojsoncallback=1';
  $.getJSON(url, setBackground);

  // Fill the todayClock div
  $('#todayClock').countdown(dates.todayEnd, todayCountdown)
      .on('finish.countdown', function() {
          $(this).html("<p>Done for today!</p>");
      });

  // Fill the clock div
  $('#yearClock').countdown(dates.yearEnd, yearCountdown);

  // Fill in the motivation
  $('.motivate').html(getQuote());

  //jquery-ui datepicker
  $('#yearEnd').datepicker();

  $('#view-switch').click(toggleView);

  $('#save-dates').submit(settings);

  //FUNCTIONS
  function getLocalStorage() {
    var today = new Date;
    var saveData = JSON.parse(localStorage.getItem('_countdown_data'));
    return {
      'today': new Date,
      'todayEnd': today.setHours(16, 00),
      'yearEnd': saveData.year_end || new Date(2017, 05, 19, 13)
    };
  }

  function setBackground(response) {
    var randomPhoto = Math.ceil(Math.random() * 100);
    var photo = response.photos.photo[randomPhoto];

    var bkgdSrc = [
      'https://farm',
      photo.farm,
      '.staticflickr.com/',
      photo.server,
      '/',
      photo.id + '_' + photo.secret + '_h.jpg'
    ];

    $('body').css('background-image', 'url(' + bkgdSrc.join('') + ')')
      .css('background-repeat', 'no-repeat')
      .css('background-attachment', 'fixed')
      .css('background-position', 'center center')
      .css('background-size', 'cover');
  };

  function todayCountdown(event) {
    var totalHours = event.offset.totalDays * 24 + event.offset.hours;
    var html = '<p>Today is over in ' + event.strftime(totalHours + ' hr %M min %S sec');
    $(this).html(html);
  }

  function yearCountdown(event) {
    $(this).html(event.strftime('%D days %H hours %M minutes %S seconds...'));
  }

  function getQuote() {
    var motivational = [
        'You\'re going to kill it today!',
        'Think outside of the box!',
        'This is your moment!',
        'The issue you are facing is not insurmountable!',
        'You are surrounded by a smart team to help you achieve great success!',
        'Dig hard, and you will find the right answer!',
        'You are the only person with your exact blend of talents and skills!',
        'Even if you fail today, you will learn!',
        'Each day is an opportunity!',
        'The sky is the limit!'
    ];
    var randomQuote = Math.floor(Math.random() * motivational.length);

    return motivational[randomQuote];
  }

  function toggleView() {
    var current = ($('.row:visible').hasClass('countdown')) ? '.countdown.row' : '.setup.row';
    var other = (current === '.countdown.row') ? '.setup.row' : '.countdown.row';

    $(current).fadeOut('fast', function() {
      $(other).fadeIn('fast');
    });
  }

  function settings(e) {
    e.preventDefault();
    var data = {
      day_end: $('#todayEnd').val(),
      year_end: $('#yearEnd').val()
    };

    localStorage.setItem('_countdown_data', JSON.stringify(data));

    return false;
  }
});
