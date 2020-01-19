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
function search(data) {
    var games = data.response.result.games;
    console.log(games);
    $.each(games, function (key, value) {
        //console.log(value.title);
        var com = $('\
        <div class="list-item-c">\
            <div class="game-box">\
                <a class="wrap" href="/gameInfo?tab=info&game='+value.title+'"></a>\
                <div class="image-container"><img src="' + value.image + '" alt=""></div>\
                <div class="info">\
                    <div class="g-title">' + value.title + '</div>\
                    <div class="g-category">' + value.categories.join('،') + '</div>\
                    <div class="g-star">\
                    </div>\
                </div>\
            </div>\
        </div>')
        var i = parseInt(value.rate);
        for (var j = 0; j < i; j++)
            com.find('.g-star').append($('<i class="fa fa-star gs-active">'));
        for (var j = i; j < 5; j++)
            com.find('.g-star').append($('<i class="fa fa-star">'));
        $('.games .g-wrapper').append(com);
    })
}
function init() {

    var q = getParameterByName('q');
    $.get('/api/' + q + '/gameList', search);
    $('.title:nth-child(2)').innerHTML = q;
}
init();