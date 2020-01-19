<!doctype html>

<html lang="fa">
<head>
    <meta charset="utf-8">

    <title>ثبت نام</title>
    <meta name="description" content="ثبت نام در سایت">
    <meta name="hasti" content="19231073">

    <link rel="stylesheet" href="../styles/hw2-global.css">
    <link rel="stylesheet" href="../styles/register.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome/font-awesome.css">
</head>

<body>
<ul class="navbar">
    <li><a href="default.asp"><i id="user" class="fa fa-user" aria-hidden="true"></i></a></li>
    <li><a href="news.asp">ceitgames</a></li>
</ul>
<form class="registerform" method="POST" action="{{ url('/register') }}">
    {{ csrf_field() }}
    <div class='box-title'>ثبت نام</div>
    <div class='input-a'>
        <input type="text" name="name" placeholder="نام"> <i class="fa fa-user" aria-hidden="true"></i>
        @if ($errors->has('name'))
            <span class="help-block">
                <strong>{{ $errors->first('name') }}</strong>
            </span>
        @endif
    </div>
    <div class='input-a'>
        <input type="text" name="email" placeholder="رایانامه"> <i class="fa fa-envelope" aria-hidden="true"></i>
    </div>
    <div class='input-a'>
        <input type="password" name="password" placeholder="رمز عبور"> <i class="fa fa-lock" aria-hidden="true"></i>
    </div>
    <div class='input-a'>
        <input type="password" name="password_confirmation" placeholder="تکرار رمزعبور"> <i class="fa fa-lock" aria-hidden="true"></i>
    </div>
    <div class="checkboxes"><a href="terms"> قوانین</a> را میپذیرم<input class="tik" type="checkbox" name="terms" required></div>
    <button type="submit">ثبت نام</button>
</form>
</body>

</html>