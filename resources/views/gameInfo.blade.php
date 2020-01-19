<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <title>اطلاعات بازی</title>

    <link rel="stylesheet" href="/styles/global.css">
    <link rel="stylesheet" href="/styles/gameInfo.css">
    <link rel="stylesheet" href="/styles/leaderboard.css">
    <link rel="stylesheet" href="/styles/comments.css">
    <link rel="stylesheet" href="/styles/related.css">
    <link rel="stylesheet" href="/styles/media.css">
    <link rel="stylesheet" href="/assets/fonts/fontawesome/font-awesome.css">

    <link rel="stylesheet" href="/styles/owl-carousel/owl.carousel.css">
    <link rel="stylesheet" href="/styles/owl-carousel/owl.theme.css">

</head>

<body>

<div class="upbar">
    <a href="/" class="brand">
        <span class="amirkabir">امیرکبیر  </span>
        <span class="studio">استودیو</span>
        <i class="gamePad fa fa-gamepad" aria-hidden="true"></i>
    </a>

    <div class="login-and-search">
        <div class="login">
            <i id="user" class="fa fa-user" aria-hidden="true"></i>
            @if (Auth::guest())
               <span class="login"><a href="/login">ورود</a></span>
            @else
                <span class="login"></span>
            @endif
        </div>
        <div class="search">
            <input placeholder="... جست و جو">
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>
    </div>

</div>
<div class="container">
    <div class="over-lay"></div>
    <div class="header-info">
        <div class="info-cols">
            <div class="start">
                <button class="startGame"><a href="/minesweeper">شروع بازی</a></button>
                <div class="text">Battlefield 4: Dragon's Teeth</div>
            </div>
            <div class="firstL">اکشن، اول شخص، مولتی پلیر</div>
            <div class="stars">
                <div class="star-ratings-css">
                    <div class="star-ratings-css-top" style="width: 12%">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div class="star-ratings-css-bottom">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                </div>
            </div>
            <span class="vote">۴.۳ (رای ۸۶)</span>
        </div>
        <div class="circleToorImg">
            <img class="gameImg" src="../assets/images/thmub.jpg">
        </div>
    </div>
</div>
<div class="tab-container">
    <div class="tabs">
        <div class="tab game_info active" data-function="game_info">اطلاعات بازی</div>
        <div class="tab game_rank" data-function="game_rank">رتبه بندی و امتیازات</div>
        <div class="tab game_comments" data-function="game_comments">نظرات کاربران</div>
        <div class="tab game_related" data-function="game_related">بازی های مشابه</div>
        <div class="tab game_media" data-function="game_media">عکس ها و ویدئو ها</div>
    </div>
</div>

<!-- main content -->
<div class="content">
</div>

<!-- main content -->
<div class="bottom-bar">
    <div class="links">
        <a href="/" class="b-l-item">صفحه اصلی</a>
        <div class="b-l-item">درباره ما</div>
        <div class="b-l-item">ارتباط با سازندگان</div>
        <div class="b-l-item">سوالات متداول</div>
        <div class="b-l-item">حریم خصوصی</div>
        <a href="/" class="b-l-item break">
            <span class="studioB amirkabirB">امیرکبیر  </span>
            <span class="studio studioB">استودیو</span>
            <i class="fa fa-gamepad studioB" aria-hidden="true"></i>
        </a>
    </div>
    <div class="shareIcons">
        <i class="fa fa-instagram" aria-hidden="true"></i>
        <i class="fa fa-twitter" aria-hidden="true"></i>
        <i class="fa fa-facebook" aria-hidden="true"></i>
    </div>
</div>
<div class="rights">تمامی حقوق محفوظ و متعلق به دانشگاه امیرکبیر است</div>

<!-- scripts -->
<script src="/js/jquery-3.1.1.js"></script>
<script src="/js/game-info.js"></script>
<script src="/styles/owl-carousel/owl.carousel.js"></script>
<script src="/js/global.js"></script>
</body>

</html>