<?php

/**
 * Class Register updates the database with the new users information.
 */
Class Register {
    public static function init() {
       Register::validateInput();
    }

    /**
     * Method to validate the input information.
     * Starts the sign in process if the information is
     * a valid email.
     */
    public static function validateInput() {
        $mail       = $_POST['mail'];

        if(filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            Register::registerInfo();
        } else {
            header("location:../../index.php");
        }
    }

    /**
     * Method to add the registration information to the database
     */
    public static function registerInfo() {
        include('connect_server.php');

        $name       = $_POST['name'];
        $mail       = $_POST['mail'];
        $password   = $_POST['password'];
        $usernameSplit   = explode(' ', trim($name));
        $username = $usernameSplit[0];

        $encrypt    = md5($password);
        $picture    = "default_profile.png";

        // To protect MySQL injection (more detail about MySQL injection)
        $name = stripslashes($name);
        $mail = stripslashes($mail);
        $password = stripslashes($password);
        $name = $db->real_escape_string($name);
        $mail = $db->real_escape_string($mail);
        $password = $db->real_escape_string($password);

        $check = $db->query("SELECT email FROM user WHERE email='$mail'");
        $count = $check->num_rows;

        if($count == 1) {
            //mail is taken.
        } else {
            $userQuery = ("INSERT INTO user (email, password) VALUES ('$mail', '$encrypt')");
            $userResult=$db->query($userQuery);
            $id = $db->insert_id;

            $idQuery = ("INSERT INTO userdetails (user_id, fullname, username, picture) VALUES ('$id','$name', '$username', '$picture')");
            $idResult=$db->query($idQuery);

            $followQuery = ("INSERT INTO userfollowing (follow_id, user_id) VALUES ('$id', '$id')");
            $followResult = $db->query($followQuery);
        }
        mysqli_close($db);
    }
}
