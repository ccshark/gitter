/**
 * Dynamic-class SetTweet.
 */
var SetTweet = (function() {
    var current     = this; //Internal reference of this object.

    /**
     * Declaring WindowApp as a prototype-class to SetTweet
     */
    SetTweet.prototype = new WindowApp();
    SetTweet.prototype.constructor = SetTweet;
    WindowApp.call(current);

    /**
     * Parameters for the WindowApp-class.
     *
     * @param winClass       Value of the window class name used by WindowApp.
     * @param menuClass      Value of the menu class name used by WindowApp.
     * @param closeClass     Value of the close class name used by WindowApp.
     */
    this.winClass 	= "tweet";
    this.menuClass  = "createTweet-menu";
    this.closeClass = "undefined";

    /**
     * Global properties.
     *
     * @param win           Reference to the Note application window element.
     *                      Parent node for all elements in the NoteApp.
     *
     * @param message       Reference to the message parameter sent from the database.
     * @param date          Reference to the date parameter sent from the database.
     * @param pic           Reference to the picture parameter sent from the database.
     * @param name          Reference to the name parameter sent from the database.
     * @param loggedId      Reference to the active users id.
     * @param id            Reference to this users id sent from the database.
     * @param tweetId       Reference to the this tweets id, sent from the database.
     * @param usernname     Reference to the username parameter sent from the database.
     *
     * @param ajax          Reference to the Ajax class.
     */
    this.win        = current.windowBox();

    this.message    = null;
    this.date       = null;
    this.pic        = null;
    this.name       = null;
    this.loggedId   = null;
    this.id         = null;
    this.tweetId    = null;
    this.username   = null;

    this.ajax = new Ajax();

    /**
     * Constructor
     *
     * This method receives all the elements from the
     * database.
     */
    this.init = function(message, date, picture, name, id, loggedId, tweetId, username) {
        current.message     = message;
        current.date        = date;
        current.pic         = picture;
        current.name        = name;
        current.id          = id;
        current.loggedId    = loggedId;
        current.tweetId     = tweetId;
        current.username    = username;

        var atExp   = new RegExp(/(@\w+)/g);
        var hashExp   = new RegExp(/(#\w+)/g);
        checkTag(hashExp);
        checkTag(atExp);
        createElements();
        checkID();
    };

    /**
     * This method creates the elements that are
     * specific for the SetTweet-object.
     */
    function createElements() {
        var page = document.getElementById('page-content-wrapper');

        var text = document.createElement('p');
        text.setAttribute("class", "text");
        text.innerHTML = current.message;

        var name = document.createElement('h2');
        name.setAttribute("class", "user-name");
        name.innerHTML = current.name;

        var username = document.createElement('h3');
        username.setAttribute("class", "username-tag");
        username.innerHTML = current.username;

        var img = document.createElement('img');
        img.setAttribute("class", "picture");
        img.setAttribute("src", "../img/profile/" + current.pic);

        var time = document.createElement('p');
        time.setAttribute("class", "time");
        time.innerHTML = current.date;

        //Appends elements.
        current.win.appendChild(time);
        current.win.appendChild(name);
        current.win.appendChild(username);
        current.win.appendChild(text);
        current.win.appendChild(img);
        page.appendChild(current.win);
    }

    /**
     * This method checks if the message parameter
     * contains # or @.
     *
     * @param regExp
     */
    function checkTag(regExp) {
        var tags = current.message.match(regExp);
        if(tags)
        {
            for(var i=0;i<tags.length;i++)
            {
                var hyperlink  = "<a href=javascript:Main.loadTag('"+tags[i]+"');>" + tags[i] + "</a>";
                current.message = current.message.replace(tags[i], hyperlink);
            }
        }
    }

    /**
     * This method checks if this tweet is posted by the
     * active user. Adds button to remove tweet if true.
     */
    function checkID() {
        if(current.loggedId == current.id) {
            current.close.setAttribute("class", "profileClose");
            Event.addEventListener(current.close, "click", removeTweet);
        }
    }

    /**
     * This method sends request to Ajax to remove this tweet.
     *
     * @param event                 Mouse event.
     */
    function removeTweet(event) {
        var data = ('tweetId=' + current.tweetId);
        var url = "../../src/php/rest.php?method=removeTweet";
        current.ajax.post(url, data, removeComplete);
    }

    /**
     * This method is a callback from Ajax when the tweet is removed.
     *
     */
    function removeComplete(data) {

    }
});