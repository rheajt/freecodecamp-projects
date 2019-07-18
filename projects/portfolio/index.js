var projects = {   //build an object of the various projects that populates the page
  "personal": [
    {
      "title": "plnnr.net",
      "url": "http://plnnr.net",
      "img": "plnnr-scaled.jpg",
      "description": "A source for keeping track of my Google Script projects."
    },
    {
      "title": "whoreads.it",
      "url": "http://whoreads.it",
      "img": "whoreadsit-scaled.jpg",
      "description": "The power of positivity! We are surrounded by so much negativity in our news sources. I want to find the sources of the most positivity."
    }
  ],
  "fullStack": [
    {
      "title": "rockthevote",
      "url": "https://rockthevote.herokuapp.com",
      "img": "170.png",
      "description": "first assignment"
    },
    {
      "title": "ilikethenightlife",
      "url": "https://ilikethenightlife.herokuapp.com/",
      "img": "170.png",
      "description": "second assignment"
    },
    {
      "title": "showmethemoney",
      "url": "https://showmethemoney.herokuapp.com/",
      "img": "170.png",
      "description": "Currently under construction..."
    },
    {
      "title": "bookbarter",
      "url": "#",
      "img": "170.png",
      "description": "Currently under construction..."
    },
    {
      "title": "sinterest",
      "url": "#",
      "img": "170.png",
      "description": "Currently under construction..."
    }
  ],
  "beginner": [
    {
      "title": "plnnr.net",
      "url": "http://plnnr.net",
      "img": "plnnr-scaled.jpg",
      "description": "A source for keeping track of my Google Script projects."
    }
  ]
}

$(document).ready(function() {
  //Event Handlers
  //slide scroll the window when you navigate to different parts of the page
  $(".scroller").click(function() {
    var section = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(section).offset().top
    }, 1000);
    return false;
  });

  //drop the navbar down when you scroll down
  $(window).scroll(function() {
    if($('body').scrollTop() >= 400) {
      $('.navbar').slideDown();
    } else {
      $('.navbar').slideUp();
    }
  });

  //Fill out the projects sections
  projects.personal.forEach(function(each) {
    $('#personal-projects').append(mediaObjectLeft(each));
  });

  projects.fullStack.forEach(function(each) {
    $('#full-stack').append(mediaObjectRight(each));
  });
});

function mediaObjectLeft(data) {
  var html = '<div class="media"> \
                <div class="media-left"> \
                  <a href="' + data.url + '"> \
                    <img class="media-object" src="/portfolio-imgs/' + data.img + '" alt="..."> \
                  </a> \
                </div> \
                <div class="media-body"> \
                  <h4 class="media-heading">' + data.title + '</h4> \
                  <h4>' + data.description + '</h4> \
                </div> \
              </div>';

  return html;
}

function mediaObjectRight(data) {
  var html = '<div class="media"> \
                <div class="media-body"> \
                  <h4 class="media-heading">' + data.title + '</h4> \
                  <h4>' + data.description + '</h4> \
                </div> \
                <div class="media-right"> \
                  <a href="' + data.url + '"> \
                    <img class="media-object" src="/portfolio-imgs/' + data.img + '" alt="..."> \
                  </a> \
                </div> \
              </div>';

  return html;
}