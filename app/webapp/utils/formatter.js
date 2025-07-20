sap.ui.define([

], function () {
    "use strict";

    return {
        translateText: function (textKey) {
            var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            return oResourceBundle.getText(textKey);
        }
    };
});