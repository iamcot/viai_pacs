sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "./model/models",
	'sap/f/FlexibleColumnLayoutSemanticHelper',
	'sap/f/library'
], function (UIComponent, Device, models, FlexibleColumnLayoutSemanticHelper, fioriLibrary) {
	"use strict";

	return UIComponent.extend("vn.viaihealth.pacs_ui.Component", {
		metadata: {
			manifest: "json",
			interfaces: ["sap.ui.core.IAsyncContentCreation"]
		},
		init: function () {
			var router;
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments); // create the views based on the url/hash

			router = this.getRouter();
			router.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
			// create the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			router.initialize();
		},
		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @returns {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function () {
			if (this.contentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
					this.contentDensityClass = "";
				} else if (!Device.support.touch) {
					// apply "compact" mode if touch is not supported
					this.contentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this.contentDensityClass = "sapUiSizeCozy";
				}
			}
			return this.contentDensityClass;
		},
		getHelper: function () {
			return this.getFcl().then(function (fcl) {
				var settings = {
					defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded
				};
				return FlexibleColumnLayoutSemanticHelper.getInstanceFor(fcl, settings);
			});
		},
		getFcl: function () {
			return new Promise(function (resolve, reject) {
				var fcl = this.getRootControl().byId('pacsFlexibleColumnLayout');
				if (fcl) {
					this.getRootControl().attachAfterInit(function (event) {
						resolve(event.getSource().byId('pacsFlexibleColumnLayout'));
					}, this);
					return;
				}
				resolve(fcl);
			}.bind(this));
		},
		onBeforeRouteMatched: function (event) {
			var model = this.getModel(),
				layout = event.getParameters().arguments.layout,
				nextUIState;
			if (!layout) {
				this.getHelper().then(function (helper) {
					nextUIState = helper.getNextUIState(0);
					model.setProperty("/layout", nextUIState.layout);
				});
				return;
			}
			model.setProperty("/layout", layout);
		}
	});
});
