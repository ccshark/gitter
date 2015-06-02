<?php

/**
 * Class Save updates the database with the information set in
 * the settings tab on the web-page.
 */
class Save {
    /**
     * Method to check if the uploaded file is an image.
     */
    public static function img() {
        if(!isset($_FILES['image']))
        {
            //echo "Select a file";
        } else {
            Save::uploadCheck();
        }
    }

    /**
     * Method to upload the image to the server and make sure
     * that the file-size does not exceeds 100mb
     */
    public static function uploadCheck() {
        $imgName = $_FILES['image']['name'];
        $img     = $_FILES['image']['tmp_name'];
        $size    = $_FILES['image']['size'];
        $sizeLimit = 100000000;

        if($size < $sizeLimit && $size > 1) {
            $image = file_get_contents($img);
            $dir = '../img/profile/'.$imgName;
            file_put_contents($dir, $image);
            Save::uploadSql();
        } else if($size > $sizeLimit){
            //the file is to large
        } else {
           //empty
           header("location:start.php");
        }
    }

    /**
     * Method to upload the the image name to the database.
     */
    public static function uploadSql() {
        include('connect_server.php');
        $id = $_SESSION['id'];
        $picture = $_FILES['image']['name'];

        $imageQuery = $db->query("UPDATE
                                      userdetails
                                  SET
                                      picture='$picture'
                                  WHERE
                                      user_id='$id'");
        mysqli_close($db);
        header("location:start.php");
    }

    /**
     * Method to change the username in the database.
     */
    public static function username() {
        include('connect_server.php');
        $username = $_POST['username'];
        $id = $_SESSION['id'];

        $usernameResult = $db->query("SELECT
                                          username
                                      FROM
                                          userdetails
                                      WHERE
                                          username='$username'");
        $count = $usernameResult->num_rows;

        if($count == 1) {
            echo($count);
        } else {
            $usernameUpdate = $db->query("UPDATE
                                              userdetails
                                          SET
                                              username='$username'
                                          WHERE
                                              user_id='$id'");
            echo($count);
        }
        mysqli_close($db);
    }

    /**
     * Method to change the users fullname in the database.
     */
    public static function name() {
        include('connect_server.php');
        $name = $_POST['name'];
        $id = $_SESSION['id'];

        $nameResult = $db->query("UPDATE
                                      userdetails
                                  SET
                                      fullname='$name'
                                  WHERE
                                      user_id='$id'");
        $count = 2;

        echo($count);
        mysqli_close($db);
    }
}
