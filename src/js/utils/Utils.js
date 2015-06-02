/**
 * Static class with utility functions.
 */
var Utils = {

    init : function() {

    },

    /**
     * Generates a random number from 0-5.
     *
     * @returns {number}
     */
    getRandom : function() {
    return Math.floor(Math.random() * 6);

    },

    /**
     * Used to calculate the offset for the target object.
     *
     * @param value         The objects style.top or style.left.
     * @returns {number}
     */
    asNumber : function(value) {
        var n = parseInt(value);
        return n == null || isNaN(n) ? 0 : n;
    }
};