<?php

/**
 * Class Tweet updates the database with the new tweet.
 */
Class Tweet {
    public static function init() {
        include('connect_server.php');

        $data   = $_POST['data'];
        $id 	= $_SESSION['id'];

        //To prevent MySQL injection
        $data = stripslashes($data);
        $data = $db->real_escape_string($data);

        $sqlQuery = "INSERT INTO tweet (user_id, message, date) VALUES ('$id', '$data', NOW())";
        $sqlResult=$db->query($sqlQuery);
        mysqli_close($db);
	}
}