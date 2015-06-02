/**
 * Static-class Validate
 */
var Validate = {

    /**
     * Global properties.
     *
     * @param validMail             Boolean to check if mail is valid.
     * @param validPass             Boolean to check if pass is valid.
     */
    validMail   : false,
    validPass   : false,

    /**
     * Constructor
     */
    init : function() {

    },

    /**
     * Method to check if the information in the mail field
     * is in a valid format.
     *
     * @param mail              Input from mail field.
     */
    email : function(mail) {
        var mailReg = new RegExp("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$");
        Validate.validMail = false;
        if(mail.match(mailReg)) {
            Validate.validMail = true;
        } else {
            var msg = 'not a valid mail';
            Flash.regErrorFlash(msg);
        }
    },

    /**
     * Method to check if the information in the password field
     * is in a valid format.
     *
     * @param password              Input from password field.
     */
    password : function(password) {
         var pwReg = new RegExp("(?=.{6,}).*", "g");
         Validate.validPass = false;
         if(password.match(pwReg)) {
            Validate.validPass = true;
         }  else {
             var msg = 'not a valid password';
             Flash.regErrorFlash(msg);
         }
    }
};
