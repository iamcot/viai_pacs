sap.ui.define([
    "./BaseController",
    "vn/viaihealth/pacs_ui/utils/constants",
    "sap/f/library",
    "sap/ui/model/Sorter",
], function (BaseController, constants, fioriLibrary, Sorter) {
    "use strict";

    return BaseController.extend("vn.viaihealth.pacs_ui.controller.VisitsDetail", {
        onInit: function () {
            this.ownerComponent = this.getOwnerComponent();
            this.router = this.ownerComponent.getRouter();
            this.model = this.ownerComponent.getModel();

            this.router.getRoute("visits").attachPatternMatched(this.onPatientMatched, this);
            this.router.getRoute("patient").attachPatternMatched(this.onPatientMatched, this);
        },
        onPatientMatched: function(event) {
            this.patient = event.getParameter("args").patient || this.patient || null;
            this.getView().bindElement({
                path: "/patients/" + this.patient,
                model: "patients"
            });
        },
        onEditPress: function () {
            var objectPage = this.getView().byId("patientDetailPage"),
            currentShowFootterState = objectPage.getShowFooter();
            
            objectPage.setShowFooter(!currentShowFootterState);
        }
    }
    )
});