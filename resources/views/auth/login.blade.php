<!doctype html>

<html lang="fa">
<head>
    <meta charset="utf-8">

    <title>ورود</title>
    <meta name="description" content="ورود به سایت">
    <meta name="hasti" content="9231073">

    <link rel="stylesheet" href="../styles/hw2-global.css">
    <link rel="stylesheet" href="../styles/login.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome/font-awesome.css">
</head>

<body>
<ul class='navbar'>
    <li><a href="default.asp"><i id= "user" class="fa fa-user" aria-hidden="true"></i></a></li>
    <li><a href="news.asp">ceitgames</a></li>
</ul>

<form class="loginform" action="{{ url('/login') }}" method="post">
    {{ csrf_field() }}
    <div class="box-title">ورود</div>
    <div class='input-a'>
        <input type="text" name="email" placeholder="ایمیل یا شماره تلفن"> <i class="fa fa-envelope" aria-hidden="true"></i>
    </div>
    <div class='input-a'>
        <input type="password" name="password" placeholder="رمز عبور"> <i class="fa fa-lock" aria-hidden="true"></i>
    </div>
    <div>
        <button type="submit">ورود</button>
    </div>
    <div class="checkbox rememberMe">
        <label>
            <input type="checkbox" name="remember"> مرا بخاطرت بسپار
        </label>
    </div>
    <div><a class="forgotten" href="/password/reset">رمزمو یادم رفته</a></div>

</form>
<div class="footer"> حساب کاربری ندارید؟  <a href="register"> ثبت نام کنید</a> </div>
</body>

</html>