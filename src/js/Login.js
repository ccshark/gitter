/**
 * Static-class Login
 */
var Login = {

    /**
     * Global properties
     *
     * @param ajax          Reference to the Ajax-class.
     */
    ajax        : new Ajax(),

    /**
     * Constructor method.
     */
    init : function(event) {
        Login.prepareEvents();
    },

    /**
     * This method prepares all the event listeners
     * for the login page.
     */
    prepareEvents : function() {
        var sign        = document.getElementById('sign');
        var reg         = document.getElementById('reg');
        var regMail     = document.getElementById('reg-mail');

        Event.addEventListener(regMail, "keyup", Login.checkMail);
        Event.addEventListener(sign, "click", Login.signIn);
        Event.addEventListener(reg, "click", Login.registration);
    },

    /**
     * this method checks if the mail is valid and sends
     * request to Ajax with the login information.
     *
     * @param event         Mouse event.
     */
    signIn : function(event) {
        event.preventDefault();
        var mail = document.getElementById('sign-mail').value;
        var password = document.getElementById('sign-password').value;
        Validate.email(mail);

        if(Validate.validMail == true) {
            var data = ('mail=' + mail + '&password=' + password);
            var url = "src/php/rest.php?method=sign";
            Login.ajax.post(url, data, Login.signComplete);
        }
    },

    /**
     * This method to check if the user is logged in or nog.
     * Receives information from the server if the user is logged in or not.
     *
     * @param data          Value from php with 1 if the user is stored in session and 0 if not.
     */
    signComplete : function(data) {
        var key = data.response;
        if(key == 1) {
            window.location = "src/php/start.php";
        } else {
            var msg = 'Wrong email or password';
            Flash.signFlash(msg);
        }
    },

    /**
     * THis method checks if the mail, username and password is in the
     * right format and sends request to Ajax if the information is correct.
     *
     * @param event         Mouse Event.
     */
    registration : function(event) {
        event.preventDefault();
        var name = document.getElementById('reg-name').value;
        var mail = document.getElementById('reg-mail').value;
        var password = document.getElementById('reg-password').value;
        Validate.email(mail);
        Validate.password(password);

        if(Validate.validMail && Validate.validPass) {
            var data = ('name=' + name + '&mail=' + mail + '&password=' + password);
            var url = "src/php/rest.php?method=register";
            Login.ajax.post(url, data, Login.regComplete);
        }
    },

    /**
     * This method shows a message when the registration
     * is successfully returned from Ajax.
     *
     * @param data         Information from php
     */
    regComplete : function(data) {
        var msg = 'Registration successful';
        Flash.regFlash(msg);
    },

    /**
     * This method checks if the email is available in the database.
     * sends request to Ajax on key up in the mail field.
     *
     * @param event             Mouse event.
     */
    checkMail : function(event) {
        var mail = document.getElementById('reg-mail').value;
        var data = ('mail=' + mail);
        var url = "src/php/rest.php?method=checkMail";
        Login.ajax.post(url, data, Login.checkMailComplete);
    },

    /**
     * This method is a callback method from Ajax.
     *
     * displays feedback for the user if the mail exists
     * in the database or not.
     *
     * @param data              Data from php 1 or 0.
     */
    checkMailComplete : function(data) {
        data = data.response;
        if(data == 1) {
            var msg = 'Email is taken';
            Flash.regErrorFlash(msg);
        }else {
            var msg = 'Email available';
            Flash.regFlash(msg);
        }
    }

};
Event.addEventListener(window, "load", Login.init);
