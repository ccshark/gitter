<?php
	/**
	* REST class to handle all requests from ajax. Starts the correct function
	* depending on the input line in the URL.
	*/


	/**
	* Imports all the php classes that will be used.
	*/
	session_start();
	require_once('Register.php');
	require_once('Sign.php');
	require_once('Tweet.php');
	require_once('Load.php');
    require_once('Save.php');
    require_once('SignOut.php');

	//Propertie to hold the current input line in the URL.
	$information = $_GET["method"];


		/**
		* Switch to start the correct function depending on the value
		* of the information property.
		*/
		switch ($information) {
			case 'sign':
                Sign::init();
				break;
			case 'register':
                Register::init();
				break;
			case 'loadFeed':
                Load::loadFeed();
				break;
			case 'tweet':
                Tweet::init();
				break;
            case 'loadUsers':
                Load::loadUsers();
                break;
            case 'follow':
                Load::follow();
                break;
            case 'checkFollow':
                Load::checkFollow();
                break;
            case 'unfollow':
                Load::unfollow();
                break;
            case 'loadProfile':
                Load::loadProfile();
                break;
            case 'saveImg':
                Save::img();
                break;
            case 'saveUsername':
                Save::username();
                break;
            case 'saveName':
                Save::name();
                break;
            case 'loadFollowing':
                Load::following();
                break;
            case 'loadFollowers':
                Load::followers();
                break;
            case 'removeTweet':
                Load::removeTweet();
                break;
            case 'signOut':
                SignOut::init();
                break;
            case 'loadHash':
                Load::loadHash();
                break;
            case 'loadAt':
                Load::loadAt();
                break;
            case 'checkMail':
                Load::checkMail();
                break;
			//Return error if the input value does not match a valid attribute.
			default:
                echo("Error not a valid request!");
				break;
		}
