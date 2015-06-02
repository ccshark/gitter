<?php

/**
 * Class Sign evaluates the sign in information and
 * logs in the user if the information matches the information
 * in the database.
 */
Class Sign {

    public static function init() {
        Sign::validateInput();
    }

    /**
     * Method to validate the input information.
     * Starts the sign in process if the information is
     * a valid email.
     */
    public static function validateInput() {
        $mail       = $_POST['mail'];

        if(filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            Sign::getInformation();
        } else {
            header("location:../../index.php");
        }
    }

    /**
     * Method to check the user input with the information in
     * the database. If the information is correct the users mail,
     * password and id is stored in session.
     */
    public static function getInformation() {
        include('connect_server.php');

        $mail       = $_POST['mail'];
        $password   = $_POST['password'];

        $encrypt    = md5($password);


        // To protect MySQL injection
        $mail = stripslashes($mail);
        $password = stripslashes($password);
        $mail = $db->real_escape_string($mail);
        $password = $db->real_escape_string($password);

        $query = "SELECT * FROM user WHERE email='$mail' AND password='$encrypt'";
        $result= $db->query($query);

        // Mysql_num_row is counting table row
        $count= $result->num_rows;

        if($count==1){
            $idQuery = "SELECT id FROM user WHERE email='$mail'";
            $idResult = $db->query($idQuery);
            $row = mysqli_fetch_array($idResult);
            $id = $row['id'];

            $_SESSION['mail'] = $mail;
            $_SESSION['password'] = $encrypt;
            $_SESSION['id'] = $id;

            //Returns 1 if user is signed in.
            echo($count);

        }
        else {
            //Returns 0 if user is not signed in.
            echo($count);
        }
        mysqli_close($db);

    }
}