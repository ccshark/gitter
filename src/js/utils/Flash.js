/**
 * Static-class Flash
 */
var Flash = {
    /**
     * Global properties
     *
     * @param flashArray        Array that stores all flash-elements added to the stage.
     */
    flashArray  : new Array(),

    /**
     * Constructor
     */
    init : function() {

    },

    /**
     * Method to present flash-message for successful
     * registration.
     *
     * @param msg               String value with message.
     */
    regFlash : function(msg) {
        Flash.removeFlash();
        var content = document.getElementById('registration');
        var flash = document.createElement('div');
        flash.setAttribute("class", "reg-flash");
        var p = document.createElement('p');
        p.innerHTML = msg;
        flash.appendChild(p);
        content.appendChild(flash);
        Flash.flashArray.push(flash);
    },

    /**
     * Method to present flash-message for registration
     * error.
     *
     * @param msg               String value with message.
     */
    regErrorFlash : function(msg) {
        Flash.removeFlash();
        var content = document.getElementById('registration');
        var flash = document.createElement('div');
        flash.setAttribute("class", "reg-error-flash");
        var p = document.createElement('p');
        p.innerHTML = msg;

        flash.appendChild(p);
        content.appendChild(flash);
        Flash.flashArray.push(flash);
    },

    /**
     * Method to present flash-message for invalid
     * sign-in.
     *
     * @param msg               String value with message.
     */
    signFlash : function(msg) {
        Flash.removeFlash();
        var content = document.getElementById('sign-in');
        var flash = document.createElement('div');
        flash.setAttribute("class", "reg-error-flash");
        var p = document.createElement('p');
        p.innerHTML = msg;

        flash.appendChild(p);
        content.appendChild(flash);
        Flash.flashArray.push(flash);
    },

    /**
     * Method to present flash-message on the
     * web-page.
     *
     * @param content           Element that the message will be placed on.
     * @param msg               String value with message.
     */
    flash : function(content, msg) {
        Flash.removeFlash();
        var flash = document.createElement('div');
        flash.setAttribute("class", "flash");
        var message = document.createElement('p');
        message.innerHTML = msg;

        flash.appendChild(message);
        content.appendChild(flash);
        Flash.flashArray.push(flash);
    },

    /**
     * Method to present flash-message error
     * on the web-page.
     *
     * @param content           Element that the message will be placed on.
     * @param msg               String value with message.
     */
    flashError : function(content, msg) {
        Flash.removeFlash();
        var flash = document.createElement('div');
        flash.setAttribute("class", "error-flash");
        var message = document.createElement('p');
        message.innerHTML = msg;

        flash.appendChild(message);
        content.appendChild(flash);
        Flash.flashArray.push(flash);
    },

    /**
     * Method to remove all flash-elements on
     * the web-page.
     */
    removeFlash : function() {
        for(var i = 0; i < Flash.flashArray.length; i++) {
            var parent = Flash.flashArray[i].parentNode;
            var child = Flash.flashArray[i];
            if(parent != null){
                parent.removeChild(child);
            }
        }
        Flash.flashArray = [];
    }
};