/**
 * Dynamic-class User
 */
var User = (function() {
    var current     = this; //Internal reference of this object.

    /**
     * Declaring WindowApp as a prototype-class to User
     */
    User.prototype = new WindowApp();
    User.prototype.constructor = User;
    WindowApp.call(current);


    this.ajax = new Ajax();
    /**
     * Parameters for the WindowApp-class.
     *
     * @param winClass       Value of the window class name used by WindowApp.
     * @param menuClass      Value of the menu class name used by WindowApp.
     */
    this.winClass 	= "user";
    this.menuClass  = "user-menu";

    /**
     * Global properties.
     *
     * @param win           Reference to the User window element.
     *                      Parent node for all elements in the User.
     * @param name          Reference to the name parameter sent from the database.
     * @param pic           Reference to the picture parameter sent from the database.
     * @param id            Reference to the id of the object.
     * @param follow        Reference to the follow parameter sent from the database.
     * @param followid      Reference to the logged in user.
     * @param username      Reference to the username parameter sent from the database.
     * @param followCount   Reference to the followCount parameter sent from php.
     */
    this.win        = current.windowBox();
    this.name       = null;
    this.pic        = null;
    this.id         = null;
    this.follow     = null;
    this.followid   = null;
    this.username   = null;

    this.follCount  = null;

    /**
     * Constructor
     */
    this.init = function(name, picture, id, followid, username) {
        current.name = name;
        current.pic = picture;
        current.id  = id;
        current.followid = followid;
        current.username = username;
        checkFollow();
        createElements();

    };

    /**
     * This method creates the elements that are
     * specific for the User-object.
     */
    function createElements() {
            var page = document.getElementById('page-content-wrapper');

            var img = document.createElement('img');
            img.setAttribute("class", "picture");
            img.setAttribute("src", "../img/profile/" + current.pic);

            var name = document.createElement('h2');
            name.setAttribute("class", "user-name");
            name.innerHTML = current.name;

            var username = document.createElement('h3');
            username.setAttribute("class", "username-tag");
            username.innerHTML = current.username;


            //Appends the element to the parent element
            current.win.appendChild(name);
            current.win.appendChild(username);
            current.win.appendChild(img);
            page.appendChild(current.win);
    }

    /**
     * This method sends request to Ajax to check if the
     * active user is following this user.
     */
    function checkFollow() {
        var data = ('userId=' + current.id);
        var url  = "../../src/php/rest.php?method=checkFollow";
        current.ajax.post(url, data, checkComplete);
    }

    /**
     * This method is a callback function from Ajax.
     * Receives information if the active user is following
     * this user.
     *
     * @param data              Value from php with 1 or 0.
     */
    function checkComplete(data) {
        data = data.response;
            if(data == 1) {
                current.follow = document.createElement('button');
                current.follow.setAttribute("class", "unfollow-button");
                current.follow.innerHTML = "Unfollow";
                current.win.appendChild(current.follow);
                current.follCount = true;

            } else {
                current.follow = document.createElement('button');
                current.follow.setAttribute("class", "follow-button");
                current.follow.innerHTML = "Follow";
                current.win.appendChild(current.follow);
                current.follCount = false;
            }
        Event.addEventListener(current.follow, "click", initFollow);
    }

    /**
     * This method sends request to Ajax to update the database
     * that the active user is following this user.
     *
     * @param event                 Mouse Event.
     */
    function initFollow(event) {
        var data;
        var url;
        if(current.follCount == true) {
            current.follCount = false;
            data    = ('userId=' + current.id);
            url     = "../../src/php/rest.php?method=unfollow";
            current.ajax.post(url, data, endFollowComplete);


        } else if(current.follCount == false) {
            current.follCount = true;
            data    = ('userId=' + current.id);
            url     = "../../src/php/rest.php?method=follow";
            current.ajax.post(url, data, followComplete);

        }

    }

    /**
     * This method is a callback from Ajax when the information
     * for unfollow has been registerd in the database.
     *
     * @param data                  Data from php.
     */
    function endFollowComplete(data) {
        current.follow.setAttribute("class", "follow-button");
        current.follow.innerHTML = "Follow";
    }

    /**
     * This method is a callback from Ajax when the information
     * for follow has been registerd in the database.
     *
     * @param data                  Data from php.
     */
    function followComplete(data) {
        current.follow.setAttribute("class", "unfollow-button");
        current.follow.innerHTML = "Unfollow";
    }
});