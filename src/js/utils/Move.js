/**
 * Static class to enable drag-n-drop functionality
 * to the diceApp window.
 */

var Move = {
    //---------------------------------------------------
    //  Public static properties
    //---------------------------------------------------

    /**
     * Reference to the element that will be draggable.
     */
    win     : null,

    /**
     * Properties for the start point of the object.
     *
     * @param startX        Start point for x coordinates.
     * @param startY        Start point for y coordinates.
     */
    startX  : 0,
    startY  : 0,

    /**
     * Properties for the offset between the mouse and the element's zero point.
     *
     * @param offsetX       Offset point for x coordinates.
     * @param offsetY       Offset point for y coordinates.
     */
    offsetX : 0,
    offsetY : 0,

    /**
     * Method for drag and drop.
     * Updates the x and y coordinates for startX and startY.
     * Updates the offset for x and y for offsetX and offsetY.
     * Starts event listeners for mouse move and mouse up.
     * Updates the css class for the HTML-element.
     *
     * @param win       Element that will be draggable.
     * @param event     Mouse event that occurs when the box is clicked.
     */
    init : function(win, event) {
        Event.stopEvent(event);

        Move.win    = win;
        Move.startX = event.clientX;
        Move.startY = event.clientY;

        Move.offsetX = Utils.asNumber(win.style.left);
        Move.offsetY = Utils.asNumber(win.style.top);
    
        Event.addEventListener(document, "mousemove", Move.startMove);
        Event.addEventListener(document, "mouseup", Move.endMove);

    },

    /**
     * Assigns the value of the mouse x and y position on the page to mouseX and mouseY.
     * Updates the css-positioning of the box.
     *
     * @param event     Mouse event that occurs when the box is moved.
     */
    startMove : function(event) {
        Event.stopEvent(event);

        var mouseX = event.pageX;
        var mouseY = event.pageY;

        Move.win.style.left = ((Move.offsetX + mouseX) - Move.startX) + 'px';
        Move.win.style.top  = ((Move.offsetY + mouseY) - Move.startY) + 'px';
    },

    /**
     * Removes the event listeners for mouse move and mouse up.
     * Resets the element to null.
     *
     * @param event     Mouse event that occurs when the mouse is released.
     */
    endMove : function(event) {
        Event.stopEvent(event);

        Event.removeEventListener(document, "mousemove", Move.startMove);
        Event.removeEventListener(document, "mouseup", Move.endMove);
        Move.win = null;
    }

};
