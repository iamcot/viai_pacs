sap.ui.define(["./BaseController",
	"vn/viaihealth/pacs_ui/utils/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("vn.viaihealth.pacs_ui.controller.App", {
		formatter: formatter,
		onInit: function () {
			var menuModel = this.getOwnerComponent().getModel("menu_header");
			this.getView().setModel(menuModel, "menu_header");

			this.ownerComponent = this.getOwnerComponent();
			this.router = this.ownerComponent.getRouter();
			this.router.attachRouteMatched(this.onRouteMatched, this);

			// apply content density mode to root view
			this.getView().addStyleClass(this.ownerComponent.getContentDensityClass());
		},
		onRouteMatched: function (event) {
			var routeName = event.getParameter("name"),
				args = event.getParameter("arguments");

			this.updateSelectedTab(routeName);
			this.currentRoute = routeName;
			this.currentPatient = args.patient || null;
		},
		updateSelectedTab: function (routeName) {
			var viewModel = this.getView().getModel("menu_header");
			if (viewModel) {
				viewModel.setProperty("/selectedKey", routeName);
			}
		},
		onChangeTab: function (event) {
			var sSelectedKey = event.getParameter("key");
			var router = this.getRouter();
			router.navTo(sSelectedKey);
		},
		onStateChange: function (event) {
			var isNavArrow = event.getParameter("isNavigationArrow");
			var layout = event.getParameter("layout");

			this.updateUIElements();

			if (isNavArrow) {
				this.router.navTo(this.currentRoute, {
					layout: layout,
					patient: this.currentPatient
				}, true);
			}
		},
		updateUIElements: function () {
			var model = this.ownerComponent.getModel(), uiState;
			this.ownerComponent.getHelper().then(function (helper) {
				uiState = helper.getCurrentUIState();
				model.setData(uiState);
			});
		},
		onExit: function () {
			this.router.detachRouteMatched(this.onRouteMatched, this);
			this.router.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		}

	});
});
