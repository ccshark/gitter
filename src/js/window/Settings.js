/**
 * Dynamic-class Settings
 */
var Settings = (function() {
    var current     = this; //Internal reference of this object.

    /**
     * Declaring WindowApp as a prototype-class to Settings
     */
    Settings.prototype = new WindowApp();
    Settings.prototype.constructor = Settings;
    WindowApp.call(current);

    /**
     * Parameters for the WindowApp-class.
     *
     * @param winClass       Value of the window class name used by WindowApp.
     * @param menuClass      Value of the menu class name used by WindowApp.
     */
    this.winClass 	= "settings";
    this.menuClass  = "settings-menu";

    /**
     * Global properties.
     *
     * @param win           Reference to the Settings window element.
     *                      Parent node for all elements in the Settings-tab.
     * @param save          Reference to the form submit button.
     * @param brows         Reference to the file-brows button.
     * @param form          Reference to the form.
     * @param username      Reference to the username-field in the form.
     * @param name          Reference to the name-field in the form.
     */
    this.win        = current.windowBox();
    this.save       = null;
    this.brows      = null;
    this.form       = null;
    this.username   = null;
    this.name       = null;


    /**
     * Constructor
     */
    function init() {
        createElements();
    }

    /**
     * This method creates the elements that are specific
     * for the Settings window.
     */
    function createElements() {
        var page = document.getElementById('page-content-wrapper');

        var formDiv         = document.createElement('div');
        formDiv.setAttribute("class", "settingsBox");

        current.form        = document.createElement('form');
        current.form.setAttribute("method", "POST");
        current.form.setAttribute("enctype", "multipart/form-data");
        current.form.setAttribute("action", "rest.php?method=saveImg");

        var header          = document.createElement('h2');
        header.setAttribute("class", "settings-header");
        header.innerHTML = "Settings";

        current.name        = document.createElement('input');
        current.name.setAttribute("type", "text");
        current.name.setAttribute("id", "name");

        var nameValue   = document.createElement('label');
        nameValue.setAttribute("for", "name");
        nameValue.innerHTML = "namn";

        current.username    = document.createElement('input');
        current.username .setAttribute("type", "text");
        current.username .setAttribute("id", "username");

        var usernameValue   = document.createElement('label');
        usernameValue.setAttribute("for", "name");
        usernameValue.innerHTML = "username";

        current.brows       = document.createElement('input');
        current.brows .setAttribute("type", "file");
        current.brows .setAttribute("id", "brows");
        current.brows.setAttribute("name", "image");

        var browsValue  =  document.createElement('label');
        browsValue.setAttribute("for", "brows");
        browsValue.innerHTML = "change picture";

        current.save        = document.createElement('input');
        current.save.setAttribute("type", "submit");
        current.save.setAttribute("class", "save");
        current.save.setAttribute("value", "Save");

        //Appends elements.
        current.menu.appendChild(header);
        current.form.appendChild(nameValue);
        current.form.appendChild(current.name);
        current.form.appendChild(usernameValue);
        current.form.appendChild(current.username );
        current.form.appendChild(browsValue);
        current.form.appendChild(current.brows );
        current.form.appendChild(current.save);
        formDiv.appendChild(current.form);
        current.win.appendChild(formDiv);
        page.appendChild(current.win);

        //Event for save.
        Event.addEventListener(current.save, "click", initSave);
    }

    /**
     * Method to check if any field is selected and send
     * request with the filled in information in the fields.
     *
     * @param event             Mouse event.
     */
    function initSave(event) {
        event.preventDefault();
        var ajax = new Ajax();
        var data;
        var url;
        if(current.name.value) {
            url = "../../src/php/rest.php?method=saveName";
            data = "name=" + current.name.value;
            ajax.post(url, data, loadComplete);
        }
        if(current.username.value) {
            url = "../../src/php/rest.php?method=saveUsername";
            data = "username=" + current.username.value;
            ajax.post(url, data, loadComplete);
        }
        if(current.brows.files[0]) {
            saveImg();
        }
        else {
            var message = "No field selected";
            Flash.flashError(current.menu, message);
        }
    }

    /**
     * This method checks if the file uploaded meets the
     * parameters for a file, and submits the form.
     */
    function saveImg() {
        var file = current.brows.files[0];
        var type = file.type;
        var size = file.size;

        if(!type.match('image.*')) {
            var message = "File is not an image";
            Flash.flashError(current.menu, message);
        } else if(size > 10000000) {
            var message = "file is over 100mb";
            Flash.flashError(current.menu, message);
        } else {
            current.form.submit();
            var message = "Picture uploaded successfuly";
            Flash.flash(current.menu, message);
        }
    }

    /**
     * This method updates a flash-message when the Ajax
     * response is returned.
     *
     * @param data          value from php, 0, 1 or 2.
     */
    function loadComplete(data) {
        data = data.response;
        var message;
        if(data == 1) {
            message = "Username is taken by another user";
            Flash.flashError(current.menu, message);
        } else if(data == 0) {
            message = "Username updated successfully";
            Flash.flash(current.menu, message);
        } else if(data == 2) {
            message = "Name is updated";
            Flash.flash(current.menu, message);
        }
    }

    init();
});