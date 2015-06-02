<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <!-- META DATA -->

    <meta http-equiv="Content-Type"	content="text/html; charset=utf-8" />

    <meta name="" 	content="" />
    <meta name=""	content="" />
    <meta name=""	content="" />
    <meta name=""	content="" />

    <!-- CSS -->

    <link href="src/css/style.css" rel="stylesheet" type="text/css" media="screen" title="Default" />

    <!-- JAVASCRIPT -->
    <script type="text/javascript" language="javascript" src="src/js/events/Event.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/net/Ajax.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/utils/JsOOP.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/utils/Validate.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/utils/Flash.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/Login.js"></script>


    <!-- TITLE -->
    <title>1ME205 - Assignment Three</title>

</head>

<body>

<div id="page-wrapper">
    <div id="page-content-wrapper">
        <div id="banner">
            <img src="src/img/gitter.jpg" alt="Gitter">
        </div>

        <div id="sign-in" class="content">
            <h1>Sign in</h1>
            <form method="POST" action="#" name="signIn">
                <label for="sign-mail">email</label>
                <input id="sign-mail" name="mail" type="text">
                <br>
                <label for="sign-password">password</label>
                <input id="sign-password" name="password" type="Password">
                <br>
                <input id="sign" value="Sign in" type="submit">
            </form>
        </div>
        <div id="registration" class="content">
            <h1>Register</h1>
            <form method="POST" action="src/php/rest.php?method=register">
                <label for="reg-name">full name</label>
                <input id="reg-name" name="username" type="text">
                <br>
                <label for="reg-mail">email</label>
                <input id="reg-mail" name="mail" type="text">
                <br>
                <label for="reg-password">password</label>
                <input id="reg-password" name="password" type="Password">
                <br>
                <input id="reg" value="Register" type="submit">
            </form>
        </div>
    </div>
</div>

</body>

</html>