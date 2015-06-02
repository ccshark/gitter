<?php

/**
 * Class Load handles all user updates and loading
 * of information from the database.
 *
 */
Class Load {
    /**
     * Method to collect all tweets from the database.
     */
     public static function loadFeed() {
   		$id = $_SESSION['id'];
   		$query = "SELECT
                      tweet.date, tweet.message, tweet.user_id, userdetails.picture, userdetails.fullname, tweet.id, userdetails.username
                  FROM
                      tweet, userfollowing, userdetails
                  WHERE
                      userfollowing.user_id ='$id'
                  AND
                      tweet.user_id = userfollowing.follow_id
                  AND
                      tweet.user_id = userdetails.user_id
                  ORDER BY
                      tweet.date
                  DESC
                  LIMIT 50";
        Load::getInformation($query);
	}

    /**
     * Method to collect all users from the database.
     */
     public static function loadUsers() {
        $id = $_SESSION['id'];
        $query = "SELECT
                      userdetails.fullname, userdetails.user_id, userdetails.picture, userdetails.username
                  FROM
                      userdetails
                  WHERE
                      userdetails.user_id!='$id'
                  ORDER BY
                      userdetails.fullname";

        Load::getInformation($query);
    }

    /**
     * Method to check if a user is followed by the active user.
     * Returns values 1 or 0.
     */
    public static function checkFollow() {
        include('connect_server.php');
        $id = $_SESSION['id'];
        $followId = $_POST['userId'];
        $followQuery = ("SELECT
                              userfollowing.user_id
                          FROM
                              userfollowing
                          WHERE
                              userfollowing.user_id ='$id'
                          AND
                              userfollowing.follow_id='$followId'");

        $followResult = $db->query($followQuery);
        $count = $followResult->num_rows;

        if($count == 1) {
            echo($count);
        } else {
            echo($count);
        }
        mysqli_close($db);
    }

    /**
     * Method to update the database that the active user
     * is following a user.
     */
    public static function follow() {
        include('connect_server.php');
        $id = $_SESSION['id'];
        $followId = $_POST['userId'];
        $followQuery = ("SELECT
                              userfollowing.user_id
                          FROM
                              userfollowing
                          WHERE
                              userfollowing.user_id ='$id'
                          AND
                              userfollowing.follow_id='$followId'");
        $followResult = $db->query($followQuery);
        $count = $followResult->num_rows;

        if($count == 1) {
            //do nothing if match to prevent spam
        } else {
            $follow = $db->query("INSERT INTO
                                      userfollowing (follow_id, user_id)
                                  VALUES
                                      ('$followId', '$id')");
        }
        mysqli_close($db);
    }

    /**
     * Method to update the database that the active user
     * is not following the specific user anymore.
     */
    public static function unfollow() {
        include('connect_server.php');
        $id = $_SESSION['id'];
        $followId = $_POST['userId'];
        $followResult = $db->query("DELETE FROM
                                        userfollowing
                                    WHERE
                                        user_id='$id'
                                    AND
                                        follow_id='$followId'");
        mysqli_close($db);
    }

    /**
     * Method to load the active users tweets.
     */
    public static function loadProfile() {
        $id = $_SESSION['id'];
        $query = "SELECT
                      tweet.date, tweet.message, tweet.user_id, userdetails.picture, userdetails.fullname, tweet.id, userdetails.username
                  FROM
                      tweet, userdetails
                  WHERE
                      userdetails.user_id='$id'
                  AND
                      tweet.user_id='$id'
                  ORDER BY tweet.date DESC
                  LIMIT 50";

        Load::getInformation($query);
    }

    /**
     * Method to load the users that the active user is following.
     */
    public static function following() {
        $id = $_SESSION['id'];
        $query = "SELECT
                      userdetails.fullname, userdetails.username, userdetails.user_id, userdetails.picture, userdetails.username
                  FROM
                      userdetails, userfollowing
                  WHERE
                      userdetails.user_id!='$id'
                  AND
                      userfollowing.user_id='$id'
                  AND
                      userfollowing.follow_id=userdetails.user_id
                  ORDER BY
                      userdetails.fullname";

        Load::getInformation($query);
    }

    /**
     * Method to load the active users followers.
     */
    public static function followers() {
        $id = $_SESSION['id'];
        $query = "SELECT
                      userdetails.fullname, userdetails.username, userdetails.user_id, userdetails.picture, userdetails.username
                  FROM
                      userdetails, userfollowing
                  WHERE
                      userdetails.user_id!='$id'
                  AND
                      userfollowing.follow_id='$id'
                  AND
                      userfollowing.user_id=userdetails.user_id
                  ORDER BY
                      userdetails.fullname";

        Load::getInformation($query);
    }

    /**
     * Method to remove the active users tweets.
     */
    public static function removeTweet() {
        include('connect_server.php');
        $id = $_SESSION['id'];
        $tweetId = $_POST['tweetId'];

        $tweetResult = $db->query("DELETE FROM
                                        tweet
                                    WHERE
                                        user_id='$id'
                                    AND id='$tweetId'");

        mysqli_close($db);
    }

    /**
     * Method to get all the tweets with the
     * specific # from the database.
     */
    public static function loadHash() {
        include('connect_server.php');
        $tag = $_POST['hashtag'];
        $id = $_SESSION['id'];

        $query = "SELECT
                        tweet.date, tweet.message, tweet.user_id, userdetails.picture, userdetails.fullname, tweet.id, userdetails.username
                    FROM
                        tweet
                    JOIN
                        userdetails
                    ON
                        userdetails.user_id=tweet.user_id
                    WHERE
                        tweet.message
                    LIKE
                        '%".$tag."%'
                    ORDER BY
                        tweet.date DESC
                    LIMIT 50";

       Load::getInformation($query);
    }

    /**
     * Method to get all the users with the
     * specific username from the database.
     */
    public static function loadAt() {
        include('connect_server.php');
        $tag = $_POST['attag'];
        $id = $_SESSION['id'];

        $query = "SELECT
                    tweet.date, tweet.message, tweet.user_id, userdetails.picture, userdetails.fullname, tweet.id, userdetails.username
                FROM
                    tweet
                JOIN
                    userdetails
                ON
                    userdetails.user_id=tweet.user_id
                WHERE
                    userdetails.username='$tag'
                ORDER BY
                    tweet.date DESC
                LIMIT 50";

        Load::getInformation($query);
    }

    /**
     * Method to check if the mail is available in the database
     * during registration.
     */
    public static function checkMail() {
        include('connect_server.php');
        $mail = $_POST['mail'];
        $mailResult = $db->query("SELECT
                                      email
                                  FROM user
                                  WHERE
                                      email='$mail'");
        $count = $mailResult->num_rows;

        echo($count);
        mysqli_close($db);
    }

    /**
     * Method to make servercall. Recives query from methods in
     * the Load-class and returns multidimensional array.
     *
     * @param $query       SQL-query.
     */
    public static function getInformation($query) {
        /* Anslut till MySql. */
        include('connect_server.php');
        $id = $_SESSION['id'];
        $result = $db->query($query);
        $array = array();
        while($row = mysqli_fetch_assoc($result)) {
            array_push($row, $id);
            array_push($array, $row);
        }
        echo json_encode($array);
        mysqli_close($db);
    }
}