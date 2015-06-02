/**
 * Static-class Main
 */
var Main = {
    /**
     * Global parameters
     *
     * @param ajax          Reference to the ajax object.
     * @param objectArray   Array that stores all active objects.
     */
    ajax : new Ajax(),
    objectArray : new Array(),

    /**
     * Constructor method.
     */
    init : function(event) {
        Main.prepareEvent();
        Main.loadFeed();
    },

    /**
     * This method activates all the event listeners for the menu.
     */
    prepareEvent : function() {
        var start       = document.getElementById('start');
        var profile     = document.getElementById('user-profile');
        var following   = document.getElementById('user-following');
        var followers   = document.getElementById('user-followers');
        var signout     = document.getElementById('sign-out');
        var tweet       = document.getElementById('tweet');
        var users       = document.getElementById('users');
        var settings    = document.getElementById('settings');

        Event.addEventListener(settings,    "click", Main.initSettings);
        Event.addEventListener(tweet,       "click", Main.initTweet);
        Event.addEventListener(users,       "click", Main.initUsers);
        Event.addEventListener(start,       "click", Main.loadFeed);
        Event.addEventListener(profile,     "click", Main.loadProfile);
        Event.addEventListener(following,   "click", Main.loadFollowing);
        Event.addEventListener(followers,   "click", Main.loadFollowers);
        Event.addEventListener(signout,     "click", Main.signOut);
    },

    /**
     * This method sends request to Ajax to load all tweets
     * that the active user is following.
     *
     * @param event             Mouse event.
     */
    loadFeed : function(event) {
        Main.removeWindows();
        var url = "../../src/php/rest.php?method=loadFeed";
        Main.ajax.get(url, Main.feedComplete);
    },

    /**
     * This method sends request to Ajax to load all users.
     *
     * @param event             Mouse event
     */
    initUsers : function(event) {
        Main.removeWindows();
        var url = "../../src/php/rest.php?method=loadUsers";
        Main.ajax.get(url, Main.usersComplete);
    },

    /**
     * This method receives an multidimensional array from Ajax
     * and starts a new instance of the SetTweet-class for each array
     * and sends with the parameters.
     *
     * All the instances created are stored in the objectArray.
     *
     * @param data              Multidimensional array from php.
     */
    feedComplete : function(data) {
        var array = JSON.parse(data.responseText);
         for (var i in array) {
               var message  = array[i].message;
               var date     = array[i].date;
               var picture  = array[i].picture;
               var name     = array[i].fullname;
               var id       = array[i].user_id;
               var loggedId = array[i][0];
               var tweetId  = array[i].id;
               var username = array[i].username;
               if(i < 50) {
                   var setTweet = new SetTweet();
                   setTweet.init(message, date, picture, name, id, loggedId, tweetId, username);
                   Main.objectArray.push(setTweet);
               }
           }
    },

    /**
     * This method receives an multidimensional array from Ajax
     * and starts a new instance of the User-class for each array
     * and sends with the parameters.
     *
     * All the instances created are stored in the objectArray.
     *
     * @param data              Multidimensional array from php.
     */
    usersComplete : function(data) {
        var array = JSON.parse(data.responseText);
        for (var i in array) {
            var name        = array[i].fullname;
            var picture     = array[i].picture;
            var id          = array[i].user_id;
            var followid    = array[i].follow_id;
            var username    = array[i].username;
            var user = new User();
            user.init(name, picture, id, followid, username);
            Main.objectArray.push(user);
        }
    },

    /**
     * This method starts a new instance of the
     * Tweet-class.
     *
     * @param event             Mouse event.
     */
    initTweet : function(event) {
        var tweet = new Tweet();
        Main.objectArray.push(tweet);
    },

    /**
     * This method starts a new instance of the settings-class.
     *
     * @param event             Mouse event.
     */
    initSettings : function(event) {
        Main.removeWindows();
        var settings = new Settings();
        Main.objectArray.push(settings);
    },

    /**
     * This method sends a request to Ajax to get the active
     * users tweets.
     *
     * @param event             Mouse event.
     */
    loadProfile : function(event) {
        Main.removeWindows();
        var url = "../../src/php/rest.php?method=loadProfile";
        Main.ajax.get(url, Main.feedComplete);
    },

    /**
     * This method sends request to Ajax to get all the users
     * the active user are following.
     *
     * @param event             Mouse event.
     */
    loadFollowing : function(event) {
        Main.removeWindows();
        var url = "../../src/php/rest.php?method=loadFollowing";
        Main.ajax.get(url, Main.usersComplete);
    },

    /**
     * This method sends request to Ajax to get all the users
     * that are following the active user.
     *
     * @param event             Mouse event.
     */
    loadFollowers : function(event) {
        Main.removeWindows();
        var url = "../../src/php/rest.php?method=loadFollowers";
        Main.ajax.get(url, Main.usersComplete);
    },

    /**
     * This method sends request to Ajax to sign out the
     * active user.
     *
     * @param event             Mouse event.
     */
    signOut : function(event) {
        var url = "../../src/php/rest.php?method=signOut";
        Main.ajax.get(url, Main.signoutComplete);
    },

    /**
     * This method sends the user to the sign-in page
     * when the active session has been destroyed and
     * the user is signed out.
     *
     * @param data          Value from php, 1 if session is removed.
     */
    signoutComplete : function(data) {
        data = data.response;
        if(data == 1) {
            window.location = "../../index.php";
        } else {
            var banner = document.getElementById("banner");
            var msg = "The active session can not be signed out";
            Flash.flashError(banner, msg);
        }
    },

    /**
     * This method removes all objects in the objectArray from the
     * stage, sets the instance to undefined and emptys the array.
     */
    removeWindows : function() {
        for(var i = 0; i < Main.objectArray.length; i++) {
            var parent = Main.objectArray[i].win.parentNode;
            var child = Main.objectArray[i].win;
            if(parent != null){
                parent.removeChild(child);
                Main.objectArray[i] = "undefined";
            }
        }
        Main.objectArray = [];
    },

    /**
     * This method sends request to ajax with the # or @
     * to load the page with the current information.
     *
     * @param tag               data from Tweet, #info or @info.
     */
    loadTag : function(tag) {
        Main.removeWindows();
        var data;
        var url;
        if(tag[0]=="#") {
            data = ('hashtag=' + tag);
            url = "../../src/php/rest.php?method=loadHash";
            Main.ajax.post(url, data, Main.feedComplete);
        } else if(tag[0] == "@") {
            tag = tag.substring(1);
            console.log(tag);
            data = ('attag=' + tag);
            url = "../../src/php/rest.php?method=loadAt";
            Main.ajax.post(url, data, Main.feedComplete);
        }

    }

};
Event.addEventListener(window, "load", Main.init);