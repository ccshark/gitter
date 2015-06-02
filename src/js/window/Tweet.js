var Tweet = (function() {
    var current     = this; //Internal reference of this object.

    /**
     * Declaring WindowApp as a prototype-class to Tweet
     */
    Tweet.prototype = new WindowApp();
    Tweet.prototype.constructor = Tweet;
    WindowApp.call(current);

    /**
     * Parameters for the WindowApp-class.
     *
     * @param winClass       Value of the window class name used by WindowApp.
     * @param menuClass      Value of the menu class name used by WindowApp.
     */
    this.winClass 	= "createTweet";
    this.menuClass  = "createTweet-menu";
    this.closeClass = "close";

    /**
     * Global properties.
     *
     * @param win           Reference to the Tweet window element.
     *                      Parent node for all elements in the Tweet.
     * @param textArea      Reference to the textArea parameter.
     * @param send          Reference to the send button-element.
     * @param count         Reference to the count parameter.
     */
    this.win        = current.windowBox();
    this.textArea   = null;
    this.send       = null;
    this.count      = null;

    /**
     * Declares the elements that will be used in
     * the Tweet class.
     */
    function init() {
        createElements();
    }

    /**
     * This method creates the elements that are specific for the Tweet-object.
     * initializes two event listeners.
     */
    function createElements() {
        var page = document.getElementById('page-content-wrapper');

        current.textArea    = document.createElement('textarea');
        current.textArea.setAttribute("maxlength", "140");

        current.send        = document.createElement('button');
        current.send.setAttribute("class", "send-button");
        current.send.innerHTML = "Send";

        var header          = document.createElement('h2');
        header.setAttribute("class", "tweet-header");
        header.innerHTML = "Create new tweet";

        current.count       = document.createElement('h3');
        current.count.setAttribute("class", "counter");
        current.count.innerHTML = "140";


       //Appends the element to the parent element
        current.menu.appendChild(header);
        current.win.appendChild(current.textArea);
        current.win.appendChild(current.send);
        current.win.appendChild(current.count);
        page.appendChild(current.win);

        //Event to send the data to Ajax.
        Event.addEventListener(current.send,        "click", store);
        //Event to show the amount of characters written.
        Event.addEventListener(current.textArea,    "keyup", wordCount);

        //Set exact position for the tweet window.
        var offsetHeight        = (window.innerHeight * 0.5) - (300 * 0.5);
        var offsetWidth         = (window.innerWidth * 0.5) - (600 * 0.5);
        current.win.style.top   = offsetHeight + ('px');
        current.win.style.left  = offsetWidth + ('px');

    }

    /**
     * This method shows the limited amount of characters
     * that can be written in a tweet.
     *
     * @param event             Keyboard Event
     */
    function wordCount(event) {
        var maxChars    = 140;
        var chars       = current.textArea.value.length;
        var charsLeft   = maxChars-chars;
        if(chars <= maxChars) {
            current.count.innerHTML = charsLeft;
        } else if(chars >= maxChars) {
            var msg = "You have exceeded the limited amount of characters";
            Flash.flashError(current.menu, msg);
        }
    }

    /**
     * This method sends request to Ajax with the information
     * that will be saved.
     *
     * @param event             Mouse event.
     */
    function store(event) {
        var ajax = new Ajax();
        var url = "rest.php?method=tweet";
        var data = 'data=' + current.textArea.value;
        ajax.post(url, data, loadComplete);

        //Removes the tweet window from the page.
        current.win.parentNode.removeChild(current.win);
    }

    /**
     * This method is a callback from Ajax when
     * the information is saved in the database.
     *
     * @param data              Information from php.
     */
    function loadComplete(data) {
        //console.log("done and done");
    }

    init();
});