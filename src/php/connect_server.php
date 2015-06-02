<?php
	    /* Anslut till MySql. */
        $db_user = 'gl222dh';
        $db_pass = 'ewDxY6Bd';
        $db_host = '127.0.0.1';
        $db_name = 'gl222dh';

        // Connect to server and select databse.
        $db = new mysqli($db_host, $db_user, $db_pass, $db_name);

        if($db->connect_errno > 0) {
            die('Can not connect to database');
        }
?>