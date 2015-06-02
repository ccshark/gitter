<?php
/**
 * Checks if the user exists in session.
 */
session_start();
if(isset($_SESSION['mail']) && isset($_SESSION['password'])) {
} else {
    header("location:../../index.php");
}
?>

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
    <link href="../../src/css/style.css" rel="stylesheet" type="text/css" media="screen" title="Default" />
    <link href="../../src/css/styleLoggedIn.css" rel="stylesheet" type="text/css" media="screen" title="Default" />

    <!-- JAVASCRIPT -->
    <script type="text/javascript" language="javascript" src="../../src/js/utils/Move.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/utils/Utils.js"></script>

    <script type="text/javascript" language="javascript" src="../../src/js/utils/Flash.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/window/Settings.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/window/User.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/window/SetTweet.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/window/WindowApp.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/window/Tweet.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/events/Event.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/net/Ajax.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/utils/JsOOP.js"></script>
    <script type="text/javascript" language="javascript" src="../../src/js/Main.js"></script>


    <!-- TITLE -->
    <title>1ME205 - Assignment Three</title>

</head>

<body>

<div id="page-wrapper">
    <div id="page-content-wrapper">
        <div id="banner">
            <ul class="menu">
                <li id="start"></li>
                <li id="profile">
                    <ul class="profile-menu">
                        <li id="user-profile">Profile</li>
                        <li id="user-following">Following</li>
                        <li id="user-followers">Followers</li>
                        <li id="sign-out">Sign out</li>
                    </ul>
                </li>
                <li id="settings"></li>
                <li id="users"></li>
                <li id="tweet"></li>
            </ul>
        </div>
    </div>
</div>

</body>

</html>
