$.get('/api/home', initialize);
var slider, comments, tutorials, new_games;

function initialize(data) {
    slider = data.response.result.homepage.slider;
    slider_init(slider);
    new_games = data.response.result.homepage.new_games;
    new_games_init();
    comments = data.response.result.homepage.comments;
    comment_init(comments);
    tutorials = data.response.result.homepage.tutorials;
    //tutorials_init(tutorials);
}

function slider_init(sl) {
    $('.owl-carousel.top-slider').remove();
    var before = $('.newGamesTitle')[0];
    var s = $('<div class="owl-carousel top-slider"></div>');
    sl.forEach(function (value, key) {
        s.append($('<div class="slideBarItem" data-index="' + key + '" ><img src="' + value.image + '"></div>'))
    })
    before.before(s[0]);
    s.owlCarousel();
    var container2 = $($('.container.top-container .upbar')[0]);
    $('#register').click(function () {
        container2.find('#register').attr('href','/register');
    });
    $('.owl-carousel.top-slider .slideBarItem').click(function () {
        show_slider_item($(this).attr('data-index'))
    });
    show_slider_item(0);
}

function comment_init(c) {
    $('.commentItem > *').remove();
    var com_items = $('.commentItem');
    c.forEach(function (value, key) {
        console.log(value.user.avatar);
        var s = $('\
            <li>\
                <div class="commentContainer">\
                <div class="circleImg listItem">\
                <img class="commenterImg" src="'+value.user.avatar+'">\
                </div>\
                <div class="commentText listItem">\
                <div class="khodeComment">'+value.text+'</div>\
            <div class="date">'+value.date+'</div></div></div></li>');
        com_items.append(s);
    })
}

function new_games_init() {
    $('.newGames').remove();
    var before = $('.CommentsGuides')[0];
    var s = $('<div class="owl-carousel"></div>');
    var new_game = $('<div class="newGames"></div>');
    new_game.append(s);
    new_games.forEach(function (value, key) {
        var item = $('\
        <div class="newGameWrapper">\
        <a href="/gameInfo?tab=video&game='+value.title+' class="wrap"></a>\
            <img class="newGameItem" src="'+value.image+'">\
            <div class="newGameName">'+value.title+'</div>\
        <div class="genre">'+value.categories.join()+'</div>\
        <div class="stars">\
            <div class="star-ratings-css">\
            <div class="star-ratings-css-top" style="width: 65%">\
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>\
        </div>\
        <div class="star-ratings-css-bottom">\
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>\
        </div> </div> </div> </div>') ;
        s.append($(item));
    })
    before.before(new_game[0]);
    s.owlCarousel();
    $('.owl-carousel.top-slider .slideBarItem').click(function () {
        show_slider_item($(this).attr('data-index'))
    });
    show_slider_item(0);
}

function tutorials_init(c) {
    $('.guidItem > *').remove();
    var com_items = $('.guidItem');
    c.forEach(function (value, key) {
        var s = $('\
            <li class="guidContainer">\
            <div class="recImg listItem">\
            <img class="guidImg" src="'+value.game.image+'">\
            </div>\
            <div class="guidText listItem">\
            <div class="khodeGuide">'+value.title+'</div>\
        <div class="date">'+value.date+'</div>\
        </div>\
        </li>');
        com_items.append(s);
    })
}
function show_slider_item(index) {
    var container = $($('.container.top-container')[0]);
    container.fadeTo('slow', 0.3, function () {
        container.css('background-image', 'url(' + slider[index].image + ')');
        container.find('.middleText > div:first-child').html(slider[index].title);
        container.find('.middleText .firstL').html( slider[index].abstract.substring(0,200));
        container.find('.trailer .game-button').attr('href','gameInfo?tab=info&game='+slider[index].title);
        container.find('.trailer .trailer-link').attr('href','gameInfo?tab=video&game='+slider[index].title);
    }).fadeTo('slow', 1);
}
