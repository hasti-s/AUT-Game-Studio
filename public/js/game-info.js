String.prototype.toPersianDigits = function () {
    var num_dic = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
    }
    return this.replace(/[0-9]/g, function (w) {
        return num_dic[w]
    });
}

var g_game = '', t = 0;
var info = 0, rank = 0, comments = 0, related = 0, media = 0, loaded_comments = 0;
var current; var cms;

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function init() {
    t = getParameterByName('tab') || "info";
    if (!getParameterByName('game')) {
        alert("wrong page");
        return;
    }
    $.get('/api/' + getParameterByName('game') + '/game/', init_header);///in header bood
}

function init_header(data) {
    g_game = data.response.result.game;
    if (!g_game) {
        alert("wrong page");
        return;
    }
    initiate_header(g_game);
    if (t == 'media')
        game_media(g_game);
    else if (t == 'rank')
        game_rank(g_game);
    else if (t == 'comments')
        game_comments(g_game);
    else if (t == 'related')
        game_related(g_game);
    else
        game_info(g_game);
}

function game_info() {
    if (current == 'info')
        return;
    $('.active').removeClass('active');
    $($('.tab.game_info')).addClass('active');
    info = $('<div class="content"></div>');
    console.log($(g_game[0]));
    info.append($(g_game[0].info));
    $('.content').replaceWith(info);
    current = 'info';

}

function game_rank() {
    if (current == 'rank')
        return;
    $('.active').removeClass('active');
    $($('.tab.game_rank')).addClass('active');
    if (rank) {
        change_page('rank')
        return;
    }
    $.get('/api/' + getParameterByName('game') + '/leaderboards', init_rank);
}

function game_comments() {
    if (current == 'comments')
        return;
    $('.active').removeClass('active');
    $($('.tab.game_comments')).addClass('active');
    if (comments) {
        change_page('comments')
        return;
    }
    //console.log(getParameterByName('game'));
    $.get('/api/' + getParameterByName('game') + '/comments', init_comments);
}

function game_related() {
    if (current == 'related')
        return;
    $('.active').removeClass('active');
    $($('.tab.game_related')).addClass('active');
    if (related) {
        change_page('related')
        return;
    }
    console.log(getParameterByName('game'));
    $.get('/api/' + getParameterByName('game') + '/related', init_related);
}

function game_media() {
    if (current == 'media')
        return;
    $('.active').removeClass('active');
    $($('.tab.game_media')).addClass('active');
    if (media) {
        change_page('media')
        return;
    }
    $.get('http://api.ie.ce-it.ir/F95/games/' + getParameterByName('game') + '/gallery', init_media);
}


function initiate_header(game) {
    game = game[0];
    $('.container .circleToorImg .gameImg').attr('src', game.image);
    $('.container .info-cols .start .text').html(game.title);
    $('.container .info-cols .firstL').html(game.categories.join().replace(/,/, '، '));
    $('.container .info-cols .stars .star-ratings-css-top').css('width', star(game.rate));
    $('.container .info-cols .vote').html(parseFloat(game.rate).toFixed(2).toPersianDigits());
    $('.tab-container .tabs .tab').each(function (key, value) {
        $(value).click(window[$(value).attr('data-function')]);
    });
}

function init_rank(data) {
    console.log(data);
    var lb = data.response.result.leaderboard;
    if (lb.length < 3) {
        current = 'rank';
        rank = $('<div class="content"><div class="no-result">فردی وجود ندارد</div></div>');
        $('.content').replaceWith(rank);
        return;
    }
    save_current();
    var content = $('<div class="content">\
        <div class="box">\
            <div class="title">برترین ها</div>\
                <div class="vertical">\
                    <div class="firsts">\
                        <div class="number2">۲</div>\
                            <div class="circle-2nd-pic"><img class="second-pic" src="' + lb[1].user.avatar + '" alt="ax"></div>\
                            <div class="name-small">' + lb[1].user.name + '</div>\
                            <div class="score">' + ((lb[1].score + '').toPersianDigits()) + '</div>\
                            <div class="stars1">\
                                <i class="fa fa-star" aria-hidden="true"></i>\
                                <i class="fa fa-star" aria-hidden="true"></i>\
                                <i class="fa fa-star" aria-hidden="true"></i>\
                                <i class="fa fa-star" aria-hidden="true"></i>\
                                <i id="last-star" class="fa fa-star" aria-hidden="true	"></i>\
                            </div>\
                    </div>\
                    <div class="firsts">\
                        <div class="number1">۱</div>\
                            <div class="circle-1st-pic"><img class="first-pic" src="' + lb[0].user.avatar + '" alt="ax"></div>\
                                <div class="name-big">' + lb[0].user.name + '</div>\
                                <div class="score">' + ((lb[0].score + '').toPersianDigits()) + '</div>\
                                <div class="stars1">\
                                    <i class="fa fa-star" aria-hidden="true"></i>\
                                    <i class="fa fa-star" aria-hidden="true"></i>\
                                    <i class="fa fa-star" aria-hidden="true"></i>\
                                    <i class="fa fa-star" aria-hidden="true"></i>\
                                    <i class="fa fa-star" aria-hidden="true"></i>\
                                </div>\
                            </div>\
                    <div class="firsts">\
                        <div class="number2">۳</div>\
                            <div class="circle-3rd-pic"><img class="third-pic" src="' + lb[2].user.avatar + '" alt="ax"></div>\
                            <div class="name-small">' + lb[2].user.name + '</div>\
                            <div class="score">' + ((lb[2].score + '').toPersianDigits()) + '</div>\
                            <div class="stars1">\
                                <i class="fa fa-star" aria-hidden="true"></i>\
                                <i class="fa fa-star" aria-hidden="true"></i>\
                                <i class="fa fa-star" aria-hidden="true"></i>\
                                <i id="last-star" class="fa fa-star" aria-hidden="true"></i>\
                                <i id="last-star" class="fa fa-star" aria-hidden="true	"></i>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="list-rank">\
        <div class="rank-row first">\
        <div class="rank-col">رتبه</div>\
        <div class="rank-col user">بازیکن</div>\
        <div class="rank-col">سطح</div>\
        <div class="rank-col">تغییر رتبه</div>\
    <div class="rank-col">امتیاز</div>\
        </div>\
        </div>\
                </div>\
            </div>');
    $.each(lb, function (key, value) {
        var person = $('\
        <div class="rank-row">\
            <div class="rank-col">' + (key + 1 + '').toPersianDigits() + '</div>\
            <div class="rank-col user">\
                <div class="image-container"><img src="' + value.user.avatar + '" alt=""></div>\
                <div class="user-name">' + value.user.name + '</div>\
            </div>\
            <div class="rank-col">' + (value.level + '').toPersianDigits() + '</div>\
            <div class="rank-col">' + (value.displacement + '').toPersianDigits() + '</div>\
            <div class="rank-col">' + (value.score + '').toPersianDigits() + '</div>\
        </div>');
        content.find('.list-rank').append(person);
    });
    $('.content').replaceWith(content);
    current = 'rank';
    rank = content;
}

function init_comments(data) {
    cms = data.response.result.comments;
    //console.log(cms);
    var ii = 0;
    loaded_comments = cms.length;
    save_current();
    var content = $('\
    <div class="content">\
        <div class="comments-box">\
            <div class="comments-header">\
                <div class="c-title">نظرات کاربران</div>\
                <div class="c-button">نظر دهید</div>\
            </div>\
            <div class="list-comments">\
            </div>\
            <div class="more-button">بارگذاری بیشتر نظرات</div>\
        </div>\
    </div>');
    $.each(cms, function (key, value) {
        if(ii > 2)
            return;
        var com = $('\
        <div class="list-item-c">\
            <div class="image-container"><img src="' + value.player.avatar + '" alt=""></div>\
            <div class="info">\
                <div class="star-date">\
                    <div class="date">' + value.date + '</div>\
                    <div class="star">\
                    </div>\
                </div>\
                <div class="cm-content">' + value.player.name + ': ' + value.text + '</div>\
            </div>\
        </div>')
        var i = value.rate;
        for (var j = 0; j < i; j++)
            com.find('.star').append($('<i class="star-active fa fa-star">'));
        for (var j = i; j < 5; j++)
            com.find('.star').append($('<i class="fa fa-star">'));
        content.find('.list-comments').append(com);
        ii++;
    })
    $('.content').replaceWith(content);
    current = 'comments';
    comments = content;
    // $('.c-button').on("click" , function () {
    //     var form = '<form method="post" action="{{url('+'/games/subComment'+')}}" class="commentForm">\
    //     <input type="text"  contenteditable="false" name="commentDate" class="h3" value="' + getParameterByName('game') + '">\
    //     <input type="text" name="commentText" class="forminput" placeholder="نظر">\
    //     <input type="text" name="commentrate" class="forminput" placeholder="درجه">\
    //     <br>\
    //     <input form="commentForm" type="submit" value="ارسال نظر">\
    //     </form>';
    //     $('.content').replaceWith(form);
    //    // $('.content .commentForm').css("justify" , "center");
    // });
    //save_comment;
    content.find('.more-button').click( more_comments);
}



function init_related(data) {
    var games = data.response.result.games;
    console.log(data);
    save_current();
    var content = $('\
    <div class="content">\
        <div class="related-box">\
            <div class="related-header">\
                <div class="h-title">بازی های مشابه</div>\
            </div>\
            <div class="list-games">\
            </div>\
        </div>\
    </div>');
    $.each(games, function (key, value) {
        var com = $('\
        <div class="list-item-c">\
            <div class="game-box">\
                <a class="wrap" href="gameInfo.html?tab=info&game=' + value.game.title + '"></a>\
                <div class="image-container"><img src="' + value.game.image + '" alt=""></div>\
                <div class="info">\
                    <div class="g-title">' + value.game.title + '</div>\
                    <div class="g-category">' + value.game.categories.join('،') + '</div>\
                    <div class="g-star">\
                    </div>\
                </div>\
            </div>\
        </div>')
        var i = parseInt(value.game.rate);
        for (var j = 0; j < i; j++)
            com.find('.g-star').append($('<i class="fa fa-star gs-active">'));
        for (var j = i; j < 5; j++)
            com.find('.g-star').append($('<i class="fa fa-star">'));
        content.find('.list-games').append(com);
    })
    $('.content').replaceWith(content);
    current = 'related';
    related = content;
}

function init_media(data) {
    var media = data.response.result.gallery;
    save_current();
    var content = $('\
        <div class="content media">\
            <div class="image-container">\
                <img src="../assets/images/ax.jpg" alt="">\
            </div>\
            <div class="owl-carousel media-slider">\
            </div>\
        </div>');
    $.each(media.images, function (key, value) {
        var com = $('<div class="media-item image"><div class="image-container"><img src="' + value.url + '"></div><div class="m-title">' + value.title + '</div></div>');
        com.click(function () {
            $('.content.media > .image-container').html('<img src="' + value.url + '">');
        })
        content.find('>.image-container').html('<img src="' + value.url + '">');
        content.find('.media-slider').append(com);
    })
    $.each(media.videos, function (key, value) {
        var com = $('<div class="media-item image"><div class="image-container"><img src="' + g_game.image + '"></div><div class="m-title">' + value.title + '</div></div>');
        com.click(function () {
            $('.content.media > .image-container').html('' +
                '<iframe src="' + value.url + '">' +
                '</iframe>');
        })
        content.find('.media-slider').append(com);
    })
    $('.content').replaceWith(content);
    $(".content.media .owl-carousel").owlCarousel();
    current = 'media';
    media = content;
}

function star(number) {
    number = 5 - number;
    number *= 100;
    number /= 5;
    return number + '%';
}

function more_comments() {
    loaded_comments += cms.length;
    var sliced = cms.slice(3, cms.length);
    $.each(sliced, function (key, value) {
        var com = $('\
        <div class="list-item-c">\
            <div class="image-container"><img src="' + value.player.avatar + '" alt=""></div>\
            <div class="info">\
                <div class="star-date">\
                    <div class="date">' + value.date + '</div>\
                    <div class="star">\
                    </div>\
                </div>\
                <div class="cm-content">' + value.player.name + ': ' + value.text + '</div>\
            </div>\
        </div>')
        var i = value.rate;
        for (var j = 0; j < i; j++)
            com.find('.star').append($('<i class="star-active fa fa-star">'));
        for (var j = i; j < 5; j++)
            com.find('.star').append($('<i class="fa fa-star">'));
        $('.content .list-comments').append(com);
    })
    cms = [];
    current = 'comments';
    comments = $($('.content')[0]);
}

init();

function save_current() {
    if (current == 'info')
        info = $('.content')[0];
    if (current == 'rank')
        rank = $('.content')[0];
    if (current == 'comments')
        comments = $('.content')[0];
    if (current == 'related')
        related = $('.content')[0];
    if (current == 'media')
        media = $('.content')[0];
}
function change_page(s) {
    save_current();
    if (s == 'info') {
        $('.content').replaceWith(info);
        current = 'info';
    }
    if (s == 'rank') {
        $('.content').replaceWith(rank);
        current = 'rank';
    }
    if (s == 'comments') {
        $('.content').replaceWith(comments);
        current = 'comments';
    }
    if (s == 'related') {
        $('.content').replaceWith(related);
        current = 'related';
    }
    if (s == 'media') {
        $('.content').replaceWith(media);
        current = 'media';
    }
}
