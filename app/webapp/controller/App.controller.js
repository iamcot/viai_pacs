sap.ui.define(["./BaseController",
	"vn/viaihealth/pacs_ui/utils/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("vn.viaihealth.pacs_ui.controller.App", {
		formatter: formatter,
		onInit: function () {
			var menuModel = this.getOwnerComponent().getModel("menu_header");
			this.getView().setModel(menuModel, "menu_header");

			this._oRouter = this.getOwnerComponent().getRouter();
            this._oRouter.attachRouteMatched(this._onRouteMatched, this);

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		_onRouteMatched: function (oEvent) {
            var sRouteName = oEvent.getParameter("name");
            this.updateSelectedTab(sRouteName);
        },
		updateSelectedTab: function(sRouteName) {
            var oViewModel = this.getView().getModel("menu_header");
            if (oViewModel) {
                oViewModel.setProperty("/selectedKey", sRouteName);
            }
        },
		onChangeTab: function (oEvent) {
			var sSelectedKey = oEvent.getParameter("key");
			var oRouter = this.getRouter();
			oRouter.navTo(sSelectedKey);
		},
	});
});
