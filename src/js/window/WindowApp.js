var WindowApp = (function() {

	var current 	= this; //Reference to the this object.
	
	/**
	* Global subclass parameters.
	* 
	* @param winClass		Parameter with the class name for the window, that is specified in the subclass.
	* @param menuClass		Parameter with the class name for the menu, that is specified in the subclass.
	* @param closeClass 	Parameter with the class name for the close-button on all windows.
    * @param id             Reference to the id for the window.
	*/

	this.winClass	= 'unknown';
	this.menuClass	= 'unknown';
	this.closeClass = 'unknown';
    this.id         = 'unknown';

	/**
	* Global properties.
	*
	* @param menu 			Reference to the menu element.
	* @param win 			Reference to the window element.
	* @param close 			Reference to the close element.
	*/
	this.menu 		= null;
	this.win 		= null;
	this.close 		= null;

    /**
     * Class references.
     *
     * @param ajax          Reference to the Ajax class.
     */
    this.ajax       = new Ajax();

    /**
     * Constructor
     */
	function init() {

	}

	this.windowBox = function() {
        current.win     = document.createElement('div');
        current.win.setAttribute("class", current.winClass);

        current.menu    = document.createElement('div');
        current.menu.setAttribute("class", current.menuClass);

        current.close   = document.createElement('div');
        current.close.setAttribute("class", current.closeClass);
        
        current.win.appendChild(current.menu);
        current.menu.appendChild(current.close);

        //Events for box movement.
        Event.addEventListener(current.menu, "mousedown", initMove);
        Event.addEventListener(current.win, "mouseup", endMove);

        //Event for window zIndex.
        Event.addEventListener(current.win, "click", index);

        //Event to close window.
        Event.addEventListener(current.close, "click", closeWindow);

        return this.win;
	};


	 /**
     * Starts when mouse is down on the window's toolbar.
     * Changes the z-index and opacity for the window.
     * Starts the Move-class and sends with the object win and the event.
     *
     * @param event
     */
    function initMove(event) {
        Move.init(current.win, event);
        current.win.style.zIndex    = Math.floor(new Date().getTime()/1000);
        current.win.style.opacity   = 0.8;
    }

    /**
     * Starts when the mouse is released from the window's toolbar.
     * Resets the opacity for the window to 1.
     */
    function endMove(event) {
        current.win.style.opacity = 1;
    }

    /**
     * Method to send the marked window to the front
     */
    function index(event) {
        current.win.style.zIndex    = Math.floor(new Date().getTime()/1000);
    }

     /**
     * This method removes the current window from the page.
     * And removes the current instance from in main.
     */
    function closeWindow(event) {
         var id = String(current.id);
         var url = "src/php/index.php?method=remove";
         current.win.parentNode.removeChild(current.win);
         //current.ajax.post(url, id, closed);

    }

    function closed(data) {
        current.win.parentNode.removeChild(current.win);
       // Main.remove(current);
    }

	init();
});