$('.search input').on('keyup', function (e) {
    if (e.keyCode == 13) {
        window.location = '/search?q=' + $(this).val();
    }
});