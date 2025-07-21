sap.ui.define([
	"./BaseController",
	"vn/viaihealth/pacs_ui/utils/constants",
	"sap/f/library",
	"sap/ui/model/Sorter",
], function (BaseController, constants, fioriLibrary, Sorter) {
	"use strict";

	return BaseController.extend("vn.viaihealth.pacs_ui.controller.Visits", {
		onInit: function () {
			this.oView = this.getView();

			var patients = this.getOwnerComponent().getModel("patients");
			this.oView.setModel(patients, "patients");
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("patientsTable");
		},
		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("name", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		onItemPress: function (oEvent) {
			var patientPath = oEvent.getSource().getBindingContext("patients").getPath(),
				patient = patientPath.split("/").slice(-1).pop(),
				nextUIState;
			this.getOwnerComponent().getHelper().then(function (helper) {
				nextUIState = helper.getNextUIState(1);
				this.getRouter().navTo("patient", {
					layout: nextUIState.layout,
					patient: patient
				});
			}.bind(this));

		}
	});
});
