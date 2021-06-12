(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\GITHUB\final-approach\src\main\ui\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    serverUrl: "http://localhost",
    websocketUrl: "http://localhost:80/socket"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "DXnE":
/*!**************************************!*\
  !*** ./src/app/domains/MapDesign.ts ***!
  \**************************************/
/*! exports provided: MapDesign, OsmStreet, TerritoryMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapDesign", function() { return MapDesign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OsmStreet", function() { return OsmStreet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TerritoryMap", function() { return TerritoryMap; });
class MapDesign {
    constructor() {
        this.coordinatesX = -472202;
        this.coordinatesY = 7530279;
        this.territoryMapList = [];
    }
}
class OsmStreet {
    constructor() {
        this.coordinates = [];
        this.houseNumbers = [];
        this.streetName = '';
    }
}
class TerritoryMap {
    constructor() {
        this.draft = true;
        this.territoryNumber = 0;
        this.territoryName = '';
        this.simpleFeatureData = '';
        this.simpleFeatureType = '';
        this.note = '';
        this.lastUpdate = new Date();
        this.streetList = [];
        this.url = '';
    }
}


/***/ }),

/***/ "JWzQ":
/*!***********************************************************************************!*\
  !*** ./src/app/components/territories-overview/territories-overview.component.ts ***!
  \***********************************************************************************/
/*! exports provided: TerritoriesOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TerritoriesOverviewComponent", function() { return TerritoriesOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../domains/Congregation */ "V8r4");
/* harmony import */ var _territory_detail_territory_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../territory-detail/territory-detail.component */ "YqcE");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _manage_group_member_manage_group_member_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../manage-group-member/manage-group-member.component */ "aXu4");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _services_congregation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/congregation.service */ "o9ao");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-bootstrap-icons */ "n45d");














function TerritoriesOverviewComponent_div_1_li_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const result_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](result_r9);
} }
function TerritoriesOverviewComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TerritoriesOverviewComponent_div_1_li_2_Template, 2, 1, "li", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.searchResult);
} }
function TerritoriesOverviewComponent_span_5_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("/ ", ctx_r10.territoriesWithoutContacts, "");
} }
function TerritoriesOverviewComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TerritoriesOverviewComponent_span_5_span_2_Template, 2, 1, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " )");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("(", ctx_r1.lastRegistryEntries.length, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.territoriesWithoutContacts > 0);
} }
function TerritoriesOverviewComponent_div_7_div_2_button_1_i_bs_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i-bs", 21);
} }
function TerritoriesOverviewComponent_div_7_div_2_button_1_i_bs_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i-bs", 22);
} }
function TerritoriesOverviewComponent_div_7_div_2_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_7_div_2_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20); const registryEntry_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r18.openTerritory(registryEntry_r12.territory); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TerritoriesOverviewComponent_div_7_div_2_button_1_i_bs_3_Template, 1, 0, "i-bs", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TerritoriesOverviewComponent_div_7_div_2_button_1_i_bs_4_Template, 1, 0, "i-bs", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const registryEntry_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx_r14.cssAccordingRegistryEntry(registryEntry_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"]("", registryEntry_r12.territoryNumber, " ", registryEntry_r12.territoryName, " ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 8, registryEntry_r12.assignDate, "dd-MM-yy"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", registryEntry_r12.territory.noContacts);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", registryEntry_r12.territory.notes.length > 0);
} }
function TerritoriesOverviewComponent_div_7_div_2_button_2_i_bs_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i-bs", 21);
} }
function TerritoriesOverviewComponent_div_7_div_2_button_2_i_bs_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i-bs", 22);
} }
function TerritoriesOverviewComponent_div_7_div_2_button_2_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const registryEntry_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](registryEntry_r12.preacher.name);
} }
function TerritoriesOverviewComponent_div_7_div_2_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_7_div_2_button_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28); const registryEntry_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r26.openTerritory(registryEntry_r12.territory); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TerritoriesOverviewComponent_div_7_div_2_button_2_i_bs_3_Template, 1, 0, "i-bs", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TerritoriesOverviewComponent_div_7_div_2_button_2_i_bs_4_Template, 1, 0, "i-bs", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TerritoriesOverviewComponent_div_7_div_2_button_2_span_5_Template, 3, 1, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const registryEntry_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate2"]("", ctx_r15.cssAccordingRegistryEntry(registryEntry_r12), " ", ctx_r15.cssAccordingDate(registryEntry_r12.assignDate), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"]("", registryEntry_r12.territoryNumber, " ", registryEntry_r12.territoryName, " ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 10, registryEntry_r12.assignDate, "dd-MM-yy"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", registryEntry_r12.territory.noContacts);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", registryEntry_r12.territory.notes.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r15.showNamesInTerritoryButton);
} }
function TerritoriesOverviewComponent_div_7_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TerritoriesOverviewComponent_div_7_div_2_button_1_Template, 5, 11, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TerritoriesOverviewComponent_div_7_div_2_button_2_Template, 6, 13, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const registryEntry_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", registryEntry_r12.preacher.name == "Congregazione");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", registryEntry_r12.preacher.name != "Congregazione");
} }
function TerritoriesOverviewComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TerritoriesOverviewComponent_div_7_div_2_Template, 3, 2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_7_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r30.toggleNamesForTerritoryButtons(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Show Names");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.lastRegistryEntries);
} }
function TerritoriesOverviewComponent_span_11_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" / ", ctx_r32.preacherWithoutTerritories, "");
} }
function TerritoriesOverviewComponent_span_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TerritoriesOverviewComponent_span_11_span_2_Template, 2, 1, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " )");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("(", ctx_r3.congregation.preacherList.length, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.preacherWithoutTerritories > 0);
} }
function TerritoriesOverviewComponent_div_21_div_2_div_3_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_21_div_2_div_3_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41); const territoryNumber_r39 = ctx.$implicit; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4); return ctx_r40.openTerritoryByNumber(territoryNumber_r39); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const territoryNumber_r39 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", territoryNumber_r39, " ");
} }
function TerritoriesOverviewComponent_div_21_div_2_div_3_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_21_div_2_div_3_button_12_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r44); const preacher_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r42.harddeletePreacher(preacher_r34); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Delete for real!!! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function TerritoriesOverviewComponent_div_21_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TerritoriesOverviewComponent_div_21_div_2_div_3_button_4_Template, 2, 1, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_21_div_2_div_3_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47); const preacher_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r45.getWhatsAppMessage(preacher_r34); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Copy WhatsAppMessage");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_21_div_2_div_3_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47); const preacher_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r48.addGroupMember(preacher_r34); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Add Group Member");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_21_div_2_div_3_Template_button_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47); const preacher_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r50.deletePreacher(preacher_r34); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, TerritoriesOverviewComponent_div_21_div_2_div_3_button_12_Template, 2, 0, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const preacher_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("href", "", ctx_r36.imageUrlBase, "", preacher_r34.name, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("target", preacher_r34.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate3"]("src", "", ctx_r36.imageUrlBase, "", preacher_r34.name, "?", ctx_r36.getCurrentTimeStamp(), "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", preacher_r34.territoryListNumbers);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", preacher_r34.softdelete);
} }
function TerritoriesOverviewComponent_div_21_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_21_div_2_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r54); const preacher_r34 = ctx.$implicit; const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r53.openPreacher(preacher_r34); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TerritoriesOverviewComponent_div_21_div_2_div_3_Template, 13, 8, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const preacher_r34 = ctx.$implicit;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx_r33.cssAccordingPreacher(preacher_r34));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", preacher_r34.name, " (", preacher_r34.territoryListNumbers.length, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", preacher_r34.showPreacherActions);
} }
function TerritoriesOverviewComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TerritoriesOverviewComponent_div_21_div_2_Template, 4, 6, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.congregation.preacherList);
} }
function TerritoriesOverviewComponent_span_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("(", ctx_r5.archivedTerritories.length, ")");
} }
function TerritoriesOverviewComponent_div_27_div_2_i_bs_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i-bs", 21);
} }
function TerritoriesOverviewComponent_div_27_div_2_i_bs_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "i-bs", 22);
} }
function TerritoriesOverviewComponent_div_27_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_div_27_div_2_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r61); const territory_r56 = ctx.$implicit; const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r60.openTerritory(territory_r56); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TerritoriesOverviewComponent_div_27_div_2_i_bs_3_Template, 1, 0, "i-bs", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TerritoriesOverviewComponent_div_27_div_2_i_bs_4_Template, 1, 0, "i-bs", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const territory_r56 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", territory_r56.number, " ", territory_r56.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", territory_r56.noContacts);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", territory_r56.notes.length > 0);
} }
function TerritoriesOverviewComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TerritoriesOverviewComponent_div_27_div_2_Template, 5, 4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r6.archivedTerritories);
} }
function TerritoriesOverviewComponent_div_31_div_1_li_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const note_r65 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](note_r65);
} }
function TerritoriesOverviewComponent_div_31_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TerritoriesOverviewComponent_div_31_div_1_li_3_Template, 2, 1, "li", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const territory_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", territory_r62.number, " ", territory_r62.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", territory_r62.notes);
} }
function TerritoriesOverviewComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TerritoriesOverviewComponent_div_31_div_1_Template, 4, 3, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const territory_r62 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", territory_r62.notes.length > 0);
} }
class TerritoriesOverviewComponent {
    constructor(congregationService, modalService, toastr) {
        this.congregationService = congregationService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.imageUrlBase = `${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].serverUrl}/congregation/image/`;
        this.congregation = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__["Congregation"]();
        this.lastRegistryEntries = [];
        this.archivedTerritories = [];
        this.territoriesWithoutContacts = 0;
        this.preacherWithoutTerritories = 0;
        this.fourMonths = new Date();
        this.eightMonths = new Date();
        this.twelveMonths = new Date();
        this.datepipe = new _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"]('en-US');
        this.newPreacherName = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('');
        this.showNamesInTerritoryButton = false;
        this.searchText = '';
        this.searchResult = [];
    }
    ngOnInit() {
        this.fourMonths.setMonth(this.fourMonths.getMonth() - 4);
        this.eightMonths.setMonth(this.eightMonths.getMonth() - 8);
        this.twelveMonths.setMonth(this.twelveMonths.getMonth() - 12);
        this.loadCongregationData();
    }
    loadCongregationData() {
        this.congregationService.getCongregation().subscribe(c => {
            this.congregation = c;
            this.collectLastRegistryEntries();
        });
    }
    collectLastRegistryEntries() {
        this.lastRegistryEntries = [];
        this.archivedTerritories = [];
        this.preacherWithoutTerritories = this.congregation.preacherList.length;
        this.congregation.preacherList.forEach(p => {
            if (p.territoryListNumbers.length == 0)
                this.preacherWithoutTerritories -= 1;
        });
        this.congregation.territoryList.forEach(t => {
            if (t.archive) {
                this.archivedTerritories.push(t);
                return;
            }
            if (t.registryEntryList == null || t.registryEntryList.length == 0)
                return;
            let registryEntry = t.registryEntryList[t.registryEntryList.length - 1];
            registryEntry.territoryName = t.name;
            registryEntry.territory = t; // just a reference, this will not be persisted
            this.lastRegistryEntries.push(registryEntry);
            if (registryEntry.territory.noContacts)
                this.territoriesWithoutContacts += 1;
        });
        this.lastRegistryEntries.sort((a, b) => {
            if (a.assignDate < b.assignDate)
                return -1;
            if (a.assignDate > b.assignDate)
                return 1;
            return 0;
        });
        console.log(this.lastRegistryEntries);
    }
    openTerritoryByNumber(territoryNumber) {
        this.congregation.territoryList.forEach(territory => {
            if (territory.number == territoryNumber) {
                this.openTerritory(territory);
                return;
            }
        });
    }
    openTerritory(territory) {
        const modalRef = this.modalService.open(_territory_detail_territory_detail_component__WEBPACK_IMPORTED_MODULE_2__["TerritoryDetailComponent"]);
        modalRef.componentInstance.territory = territory;
        modalRef.componentInstance.preacherList = this.congregation.preacherList;
        modalRef.componentInstance.noContacts.setValue(territory.noContacts);
        modalRef.componentInstance.intoArchive.setValue(territory.archive);
        modalRef.componentInstance.url.setValue(territory.url);
        modalRef.closed.subscribe(e => {
            if (e != 'Close click')
                return;
            // SAVE TERRITORY
            territory.noContacts = modalRef.componentInstance.noContacts.value;
            territory.archive = modalRef.componentInstance.intoArchive.value;
            this.congregationService.saveCongregation(this.congregation).subscribe(c => {
                this.congregation = c;
                this.collectLastRegistryEntries();
                if (modalRef.componentInstance.territory.newPreacherAssigned) {
                    this.congregationService.exportTerritoryData(territory.number).subscribe(e => {
                        this.toastr.success("Territory online map exported!", "Export Service");
                        this.loadCongregationData();
                    });
                }
            });
        });
    }
    openPreacher(preacher) {
        preacher.showPreacherActions = !preacher.showPreacherActions;
    }
    deletePreacher(preacher) {
        if (!preacher.harddelete) {
            preacher.softdelete = !preacher.softdelete;
        }
        preacher.showPreacherActions = false;
        let i = 0;
        this.congregation.preacherList.forEach(p => {
            if (p.name == preacher.name) {
                this.congregation.preacherList[i] = preacher;
                console.log('update done');
            }
            i++;
        });
        console.log(this.congregation.preacherList);
        this.congregationService.saveCongregation(this.congregation).subscribe(c => this.congregation = c);
    }
    harddeletePreacher(preacher) {
        preacher.harddelete = true;
        this.deletePreacher(preacher);
    }
    cssAccordingDate(assignDate) {
        let checkDate = new Date(assignDate);
        let css = '';
        if (checkDate < this.fourMonths) {
            css = 'olderFourMonths';
        }
        if (checkDate < this.eightMonths) {
            css = 'olderEightMonths';
        }
        if (checkDate < this.twelveMonths) {
            css = 'olderTwelveMonths';
        }
        return css;
    }
    addGroupMember(preacher) {
        const modalRef = this.modalService.open(_manage_group_member_manage_group_member_component__WEBPACK_IMPORTED_MODULE_4__["ManageGroupMemberComponent"]);
        modalRef.componentInstance.preacher = preacher;
        modalRef.componentInstance.preacherList = this.congregation.preacherList;
        modalRef.closed.subscribe(e => {
            console.log(e);
            if (e != 'Close click')
                return;
            this.congregationService.saveCongregation(this.congregation).subscribe(c => {
                this.congregation = c;
                this.collectLastRegistryEntries();
            });
        });
    }
    addNewPreacher() {
        if (this.newPreacherName.value == null || this.newPreacherName.value.length == 0)
            return;
        let newPreacher = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__["Preacher"]();
        newPreacher.name = this.newPreacherName.value;
        this.congregation.preacherList.push(newPreacher);
        this.congregationService.saveCongregation(this.congregation).subscribe(c => {
            this.congregation = c;
            this.collectLastRegistryEntries();
        });
    }
    cssAccordingPreacher(preacher) {
        let css = 'btn btn-primary btn-sm buttonPreacher ';
        if (preacher.group.length > 0) {
            css += 'buttonPreacherGroupLeader';
        }
        else if (preacher.territoryListNumbers.length > 0 && !preacher.softdelete) {
            css += 'buttonPreacherWithTerritories';
        }
        if (preacher.softdelete)
            css += 'buttonPreacherDeleted';
        return css;
    }
    cssAccordingRegistryEntry(registryEntry) {
        let css = 'btn btn-primary btn-sm buttonTerritory';
        if (registryEntry.preacher.name == 'Congregazione' && registryEntry.territory.noContacts) {
            css += ' inCongregationEmpty';
        }
        else if (registryEntry.preacher.name == 'Congregazione' && !registryEntry.territory.noContacts) {
            css += ' inCongregation';
        }
        else if (registryEntry.territory.noContacts) {
            css += ' buttonTerritoryEmpty';
        }
        return css;
    }
    getCurrentTimeStamp() {
        return Math.floor(Date.now() / 1000);
    }
    copyMessage(val) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
    getWhatsAppMessage(preacher) {
        let message = '=============================\n'
            + preacher.name
            + ' ( ' + this.datepipe.transform(new Date(), 'dd.MM.yyyy')
            + ' ),\nuna lista dei tuoi territori online:\n\n';
        preacher.territoryListNumbers.forEach(territoryNumber => {
            let territory = this.getTerritoryByNumber(territoryNumber);
            if (territory != undefined && territory.uuid != undefined) {
                let assignDate = this.getAssignDateFromTerritory(territory);
                let formattedDate = this.datepipe.transform(assignDate, 'dd.MM.yyyy');
                message += territory.number + ' - ' + territory.name + ' (' + formattedDate + ')\n';
                if (territory.number >= 1000) {
                    // FIXME read HOST value from settings
                    message += 'https://HOST?id=' + territory.uuid + '\n';
                }
                if (territory.notes.length > 0) {
                    message += 'NOTE:\n';
                }
                territory.notes.forEach(note => {
                    message += note + '\n';
                });
                message += '\n';
            }
        });
        message += '\n=============================';
        this.copyMessage(message);
    }
    getAssignDateFromTerritory(territory) {
        if (territory.registryEntryList.length == 0)
            return undefined;
        return territory.registryEntryList[territory.registryEntryList.length - 1].assignDate;
    }
    getTerritoryByNumber(number) {
        let territory = undefined;
        this.congregation.territoryList.forEach(t => {
            if (t.number == number)
                territory = t;
        });
        return territory;
    }
    toggleNamesForTerritoryButtons() {
        this.showNamesInTerritoryButton = !this.showNamesInTerritoryButton;
    }
    searchTextChanged($event) {
        let searchText = $event.originalTarget.value;
        if ($event.key.length == 1) {
            searchText = searchText + $event.key;
        }
        searchText = searchText.toLowerCase();
        if (searchText.length < 3) {
            this.searchResult = [];
            return;
        }
        this.congregationService.search(searchText).subscribe(result => {
            console.log(result);
            this.searchResult = result;
        });
    }
}
TerritoriesOverviewComponent.ɵfac = function TerritoriesOverviewComponent_Factory(t) { return new (t || TerritoriesOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_congregation_service__WEBPACK_IMPORTED_MODULE_7__["CongregationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_9__["ToastrService"])); };
TerritoriesOverviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TerritoriesOverviewComponent, selectors: [["app-territories-overview"]], decls: 32, vars: 9, consts: [["id", "exampleDataList", "placeholder", "Type to search...", 1, "form-control", 3, "keydown"], [4, "ngIf"], [1, "parent-container"], ["class", "container-fluid", 4, "ngIf"], [1, "form-inline"], [1, "form-group", "mb-2"], ["for", "UserName", 1, "sr-only"], ["type", "text", "id", "UserName", "placeholder", "UserName", 1, "form-control", 3, "formControl"], ["type", "submit", 1, "btn", "btn-success", "mb-2", 2, "margin-left", "0.2rem", 3, "click"], [4, "ngFor", "ngForOf"], ["style", "color:#ff0000;", 4, "ngIf"], [2, "color", "#ff0000"], [1, "container-fluid"], [1, "row"], ["class", "col-3", 4, "ngFor", "ngForOf"], [1, "col-3"], [1, "btn", "btn-sm", "btn-primary", 3, "click"], [3, "class", "click", 4, "ngIf"], [3, "click"], ["name", "droplet", 4, "ngIf"], ["name", "info-circle", "style", "color: red", 4, "ngIf"], ["name", "droplet"], ["name", "info-circle", 2, "color", "red"], ["style", "color: #960202", 4, "ngIf"], [2, "color", "#960202"], ["class", "preacherActions", 4, "ngIf"], [1, "preacherActions"], [3, "href", "target"], ["height", "200px", 3, "src"], ["class", "btn btn-sm btn-primary", "style", "margin: 0.1rem", 3, "click", 4, "ngFor", "ngForOf"], ["value", "click to copy", 1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "btn", "btn-success", "btn-sm", 2, "margin-left", "0.1rem", 3, "click"], [1, "btn", "btn-danger", "btn-sm", 2, "margin-left", "0.1rem", 3, "click"], ["class", "btn btn-danger btn-sm", "style", "margin-left: 0.1rem", 3, "click", 4, "ngIf"], [1, "btn", "btn-sm", "btn-primary", 2, "margin", "0.1rem", 3, "click"], [1, "btn", "btn-secondary", "btn-sm", "buttonTerritory", 3, "click"], ["style", "color: darkred", 4, "ngFor", "ngForOf"], [2, "color", "darkred"]], template: function TerritoriesOverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keydown", function TerritoriesOverviewComponent_Template_input_keydown_0_listener($event) { return ctx.searchTextChanged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TerritoriesOverviewComponent_div_1_Template, 3, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Territories ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TerritoriesOverviewComponent_span_5_Template, 4, 2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, TerritoriesOverviewComponent_div_7_Template, 8, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Preacher ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, TerritoriesOverviewComponent_span_11_Template, 4, 2, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Preacher Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoriesOverviewComponent_Template_button_click_17_listener() { return ctx.addNewPreacher(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Add new preacher");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, TerritoriesOverviewComponent_div_21_Template, 3, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Archive ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, TerritoriesOverviewComponent_span_25_Template, 2, 1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, TerritoriesOverviewComponent_div_27_Template, 3, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Notes in archived Territories");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, TerritoriesOverviewComponent_div_31_Template, 2, 1, "div", 9);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.searchResult.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.lastRegistryEntries);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.lastRegistryEntries);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.congregation.preacherList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.newPreacherName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.congregation);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.archivedTerritories);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.archivedTerritories);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.archivedTerritories);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControlDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_10__["NgxBootstrapIconsLibComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"]], styles: [".parent-container[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.buttonTerritory[_ngcontent-%COMP%] {\n  white-space: nowrap !important;\n  background-color: #b0d0ee;\n  color: #002857;\n  font-weight: bolder;\n  margin-bottom: 0.1rem;\n}\n\n.buttonTerritoryEmpty[_ngcontent-%COMP%] {\n  background-color: #617282;\n  color: #dddddd;\n}\n\n.buttonPreacher[_ngcontent-%COMP%] {\n  white-space: nowrap !important;\n  background-color: #baffc6;\n  color: #002857;\n  font-weight: bolder;\n  margin-bottom: 0.1rem;\n}\n\n.buttonPreacherWithTerritories[_ngcontent-%COMP%] {\n  background-color: #fffcba;\n}\n\n.buttonPreacherGroupLeader[_ngcontent-%COMP%] {\n  background-color: #005ab3;\n  color: #ffffff;\n}\n\n.buttonPreacherDeleted[_ngcontent-%COMP%] {\n  background-color: #ffe8e2;\n  color: #b6b5b5;\n}\n\n.preacherActions[_ngcontent-%COMP%] {\n  background-color: #eeeeee;\n}\n\n.inCongregation[_ngcontent-%COMP%] {\n  background-color: #baffc6;\n  color: #002857;\n}\n\n.inCongregationEmpty[_ngcontent-%COMP%] {\n  background-color: #85b38d;\n  color: #ffffff;\n}\n\n.olderFourMonths[_ngcontent-%COMP%] {\n  background-color: #ffe100;\n  color: #000a1c;\n}\n\n.olderEightMonths[_ngcontent-%COMP%] {\n  background-color: #ff9900;\n  color: #000a1c;\n}\n\n.olderTwelveMonths[_ngcontent-%COMP%] {\n  background-color: #ff0000;\n  color: #000a1c;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFx0ZXJyaXRvcmllcy1vdmVydmlldy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLDhCQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSw4QkFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBQ0YiLCJmaWxlIjoidGVycml0b3JpZXMtb3ZlcnZpZXcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFyZW50LWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLmJ1dHRvblRlcnJpdG9yeSB7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNiMGQwZWU7XHJcbiAgY29sb3I6ICMwMDI4NTc7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XHJcbn1cclxuXHJcbi5idXR0b25UZXJyaXRvcnlFbXB0eSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzYxNzI4MjtcclxuICBjb2xvcjogI2RkZGRkZDtcclxufVxyXG5cclxuLmJ1dHRvblByZWFjaGVyIHtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JhZmZjNjtcclxuICBjb2xvcjogIzAwMjg1NztcclxuICBmb250LXdlaWdodDogYm9sZGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcclxufVxyXG5cclxuLmJ1dHRvblByZWFjaGVyV2l0aFRlcnJpdG9yaWVzIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmY2JhO1xyXG59XHJcblxyXG4uYnV0dG9uUHJlYWNoZXJHcm91cExlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNWFiMztcclxuICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLmJ1dHRvblByZWFjaGVyRGVsZXRlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZThlMjtcclxuICBjb2xvcjogI2I2YjViNTtcclxufVxyXG5cclxuLnByZWFjaGVyQWN0aW9ucyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWVlZTtcclxufVxyXG5cclxuLmluQ29uZ3JlZ2F0aW9uIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmFmZmM2O1xyXG4gIGNvbG9yOiAjMDAyODU3O1xyXG59XHJcblxyXG4uaW5Db25ncmVnYXRpb25FbXB0eSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzg1YjM4ZDtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLm9sZGVyRm91ck1vbnRocyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZTEwMDtcclxuICBjb2xvcjogIzAwMGExYztcclxufVxyXG5cclxuLm9sZGVyRWlnaHRNb250aHMge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjk5MDA7XHJcbiAgY29sb3I6ICMwMDBhMWM7XHJcbn1cclxuXHJcbi5vbGRlclR3ZWx2ZU1vbnRocyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDAwMDtcclxuICBjb2xvcjogIzAwMGExYztcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TerritoriesOverviewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-territories-overview',
                templateUrl: './territories-overview.component.html',
                styleUrls: ['./territories-overview.component.scss']
            }]
    }], function () { return [{ type: _services_congregation_service__WEBPACK_IMPORTED_MODULE_7__["CongregationService"] }, { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__["NgbModal"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_9__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "NUr+":
/*!***********************************************************!*\
  !*** ./src/app/components/designer/designer.component.ts ***!
  \***********************************************************/
/*! exports provided: DesignerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignerComponent", function() { return DesignerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/Map */ "Xu5n");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Tile */ "SAzV");
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/View */ "oscj");
/* harmony import */ var ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/source/OSM.js */ "0OmE");
/* harmony import */ var ol_source_XYZ__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/XYZ */ "LvFn");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/proj */ "JW8z");
/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/interaction */ "Ojm/");
/* harmony import */ var ol_geom_GeometryType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/GeometryType */ "9iPr");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/source/Vector */ "WDFe");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/Vector */ "Pmt0");
/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style */ "FeBf");
/* harmony import */ var _domains_MapDesign__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../domains/MapDesign */ "DXnE");
/* harmony import */ var _domains_Congregation__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../domains/Congregation */ "V8r4");
/* harmony import */ var ol_format__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/format */ "J8cP");
/* harmony import */ var _services_congregation_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../services/congregation.service */ "o9ao");
/* harmony import */ var _services_map_design_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../services/map-design.service */ "e08C");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ "ofXK");
























function DesignerComponent_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_button_22_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.editFeature(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "EDIT");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DesignerComponent_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_button_25_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.saveMap(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "SAVE MODIFICATION!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DesignerComponent_option_40_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function DesignerComponent_option_40_Template_option_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12); const territoryMap_r10 = ctx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.navigateToTerritoryMap(territoryMap_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const territoryMap_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", territoryMap_r10.territoryNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", territoryMap_r10.territoryNumber, " ", territoryMap_r10.territoryName, "");
} }
function DesignerComponent_a_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "GoogleMaps");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate3"]("href", "https://www.google.com/maps/@", ctx_r4.getCoordinates(ctx_r4.map.getView().getCenter()).toString().split(",")[1], ",", ctx_r4.getCoordinates(ctx_r4.map.getView().getCenter()).toString().split(",")[0], ",", ctx_r4.map.getView().getZoom(), "z", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function DesignerComponent_div_42_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_div_42_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r14.setActive(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Set Active");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function DesignerComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_div_42_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.saveMap(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Save Map for Territory");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, DesignerComponent_div_42_button_8_Template, 2, 0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r5.territoryCustomNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r5.territoryCustomName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx_r5.note);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r5.lastSelectedTerritoryMap == null ? null : ctx_r5.lastSelectedTerritoryMap.draft) == true);
} }
class DesignerComponent {
    constructor(congregationService, mapDesignService, modalService, toastr) {
        this.congregationService = congregationService;
        this.mapDesignService = mapDesignService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.map = null;
        this.view = new ol_View__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.coordinateX = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](48.6974947);
        this.coordinateY = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"](9.1506559);
        this.source = new ol_source_Vector__WEBPACK_IMPORTED_MODULE_10__["default"]();
        this.interaction = null;
        this.lastSelectedFeature = undefined;
        this.lastSelectedTerritoryMap = undefined;
        this.lastSavedTerritoryName = '';
        this.styleRedOutline = new ol_style__WEBPACK_IMPORTED_MODULE_12__["Style"]({
            fill: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Fill"]({
                color: [0, 0, 0, 0.1]
            }),
            stroke: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Stroke"]({
                color: [255, 0, 0, 0.5],
                width: 5
            }),
            text: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Text"]({
                text: '',
                font: '12px Calibri,sans-serif',
                overflow: true,
                fill: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Fill"]({
                    color: '#000',
                }),
                stroke: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Stroke"]({
                    color: '#fff',
                    width: 3,
                }),
            })
        });
        this.styleRedOutlineActive = new ol_style__WEBPACK_IMPORTED_MODULE_12__["Style"]({
            fill: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Fill"]({
                color: [0, 255, 0, 0.1]
            }),
            stroke: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Stroke"]({
                color: [0, 100, 0, 0.5],
                width: 5
            }),
            text: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Text"]({
                text: '',
                font: '12px Calibri,sans-serif',
                overflow: true,
                fill: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Fill"]({
                    color: '#007700',
                }),
                stroke: new ol_style__WEBPACK_IMPORTED_MODULE_12__["Stroke"]({
                    color: '#fff',
                    width: 2,
                }),
            })
        });
        this.mapDesign = new _domains_MapDesign__WEBPACK_IMPORTED_MODULE_13__["MapDesign"]();
        this.congregation = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_14__["Congregation"]();
        this.note = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.territoryNumber = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.territoryCustomNumber = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.territoryCustomName = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('');
        this.selectInteraction = new ol_interaction__WEBPACK_IMPORTED_MODULE_8__["Select"]();
        this.wktFormat = new ol_format__WEBPACK_IMPORTED_MODULE_15__["WKT"]();
        this.featureModified = false;
        this.modeSelected = '';
    }
    ngOnInit() {
        this.congregationService.getCongregation().subscribe(c => this.congregation = c);
        const osmLayer = new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__["default"]({
            source: new ol_source_OSM_js__WEBPACK_IMPORTED_MODULE_4__["default"](),
        });
        osmLayer.getSource().setAttributions([]);
        let that = this;
        const vectorLayer = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__["default"]({
            source: this.source,
            style: function (feature) {
                let style = that.styleRedOutline;
                if (feature.get('draft') == false) {
                    style = that.styleRedOutlineActive;
                }
                // @ts-ignore
                if (that.map.getView().getZoom() > 14) {
                    style.getText().setText(feature.get('name'));
                }
                else {
                    style.getText().setText('');
                }
                return style;
            }
        });
        const xyzLayer = new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__["default"]({
            source: new ol_source_XYZ__WEBPACK_IMPORTED_MODULE_5__["default"]({
                url: 'http://tile.osm.org/{z}/{x}/{y}.png'
            })
        });
        this.view = new ol_View__WEBPACK_IMPORTED_MODULE_3__["default"]({
            center: [-472202, 7530279],
            zoom: 12
        });
        this.map = new ol_Map__WEBPACK_IMPORTED_MODULE_1__["default"]({
            layers: [
                osmLayer,
                vectorLayer
            ],
            view: this.view,
            controls: []
        });
    }
    ngAfterViewInit() {
        var _a, _b;
        (_a = this.map) === null || _a === void 0 ? void 0 : _a.setTarget('map');
        (_b = this.map) === null || _b === void 0 ? void 0 : _b.addInteraction(this.selectInteraction);
        this.selectInteraction.on('select', e => {
            if (e.deselected) {
                this.lastSelectedFeature = undefined;
                //return;
            }
            this.lastSelectedFeature = e.selected[0];
            this.territoryCustomNumber.setValue(this.lastSelectedFeature.get('territoryNumber'));
            this.territoryCustomName.setValue(this.lastSelectedFeature.get('territoryName'));
            this.mapDesign.territoryMapList.forEach(t => {
                if (t.territoryNumber == this.territoryCustomNumber.value) {
                    this.lastSelectedTerritoryMap = t;
                }
            });
        });
        this.loadMap(true);
    }
    loadMap(centerView) {
        this.source.clear();
        this.mapDesignService.getMapDesign().subscribe(mapDesign => {
            var _a;
            this.mapDesign = mapDesign;
            console.log(mapDesign);
            let format = new ol_format__WEBPACK_IMPORTED_MODULE_15__["WKT"]();
            mapDesign.territoryMapList.forEach(territoryMap => {
                let feature = format.readFeature(territoryMap.simpleFeatureData, {
                    dataProjection: 'EPSG:3857',
                    featureProjection: 'EPSG:3857'
                });
                feature.set('territoryNumber', territoryMap.territoryNumber);
                feature.set('territoryName', territoryMap.territoryName);
                feature.set('name', '' + territoryMap.territoryNumber);
                feature.set('draft', territoryMap.draft);
                feature.setId(territoryMap.territoryNumber);
                this.source.addFeature(feature);
            });
            if (centerView)
                (_a = this.map) === null || _a === void 0 ? void 0 : _a.getView().setCenter([this.mapDesign.coordinatesX, this.mapDesign.coordinatesY]);
            this.featureModified = false;
            this.modeSelected = '';
        });
    }
    saveMap() {
        var _a, _b;
        if (this.territoryNumber.value.length == 0) {
            this.territoryNumber.setValue(this.territoryCustomNumber.value);
        }
        if (this.lastSelectedFeature != undefined) {
            (_a = this.lastSelectedFeature) === null || _a === void 0 ? void 0 : _a.setProperties([{ 'territoryNumber': this.territoryNumber.value }]);
            let territoryMap = new _domains_MapDesign__WEBPACK_IMPORTED_MODULE_13__["TerritoryMap"]();
            territoryMap.draft = true;
            territoryMap.lastUpdate = new Date();
            territoryMap.territoryNumber = this.territoryNumber.value;
            territoryMap.territoryName = this.territoryCustomName.value;
            this.lastSavedTerritoryName = territoryMap.territoryNumber + ' ' + territoryMap.territoryName;
            let data = this.wktFormat.writeGeometry((_b = this.lastSelectedFeature) === null || _b === void 0 ? void 0 : _b.getGeometry());
            if (data == null || data == undefined) {
                data = '';
            }
            territoryMap.simpleFeatureData = data;
            this.mapDesign.territoryMapList.push(territoryMap);
            console.log(this.mapDesign);
            this.lastSelectedFeature = undefined;
        }
        this.mapDesignService.saveMapDesign(this.mapDesign).subscribe(m => {
            this.territoryNumber.setValue('');
            this.loadMap();
        });
    }
    setCoordinates() {
        var _a;
        let webMercatorCoordinates = Object(ol_proj__WEBPACK_IMPORTED_MODULE_7__["fromLonLat"])([this.coordinateY.value, this.coordinateX.value]);
        (_a = this.map) === null || _a === void 0 ? void 0 : _a.getView().setCenter(webMercatorCoordinates);
    }
    getCoordinates(coordinates) {
        if (coordinates == undefined)
            return [0, 0];
        return Object(ol_proj__WEBPACK_IMPORTED_MODULE_7__["toLonLat"])(coordinates);
    }
    drawPolygon() {
        this.territoryNumber.setValue('');
        this.addInteraction(ol_geom_GeometryType__WEBPACK_IMPORTED_MODULE_9__["default"].POLYGON);
        this.modeSelected = 'polygon';
    }
    drawLine() {
        this.territoryNumber.setValue('');
        this.addInteraction(ol_geom_GeometryType__WEBPACK_IMPORTED_MODULE_9__["default"].LINE_STRING);
        this.modeSelected = 'line';
    }
    drawPoint() {
        this.territoryNumber.setValue('');
        this.addInteraction(ol_geom_GeometryType__WEBPACK_IMPORTED_MODULE_9__["default"].POINT);
        this.modeSelected = 'point';
    }
    editFeature() {
        var _a;
        if (this.interaction != null) {
            this.removeInteraction();
        }
        this.interaction = new ol_interaction__WEBPACK_IMPORTED_MODULE_8__["Modify"]({
            source: this.source
        });
        let modify = this.interaction;
        modify.on('modifyend', evt => {
            let modifiedFeature = evt.features.getArray()[0];
            this.territoryCustomNumber.setValue(modifiedFeature.get('territoryNumber'));
            this.territoryCustomName.setValue(modifiedFeature.get('territoryName'));
            this.lastSavedTerritoryName = this.territoryCustomNumber.value + ' ' + this.territoryCustomName.value;
            this.mapDesign.territoryMapList.forEach(t => {
                if (t.territoryNumber == this.territoryCustomNumber.value) {
                    let data = this.wktFormat.writeGeometry(modifiedFeature.getGeometry());
                    t.simpleFeatureData = data;
                    t.draft = true; // it remains a "draft" until you activate it
                    t.lastUpdate = new Date();
                    this.featureModified = true;
                }
            });
        });
        (_a = this.map) === null || _a === void 0 ? void 0 : _a.addInteraction(this.interaction);
        this.modeSelected = 'edit';
    }
    setNavigateMode() {
        this.territoryNumber.setValue('');
        this.removeInteraction();
    }
    addInteraction(type) {
        var _a;
        this.removeInteraction();
        this.interaction = new ol_interaction__WEBPACK_IMPORTED_MODULE_8__["Draw"]({
            type: type,
            source: this.source
        });
        let draw = this.interaction;
        draw.on('drawend', evt => {
            console.log('draw ended');
            this.lastSelectedFeature = evt.feature;
        });
        (_a = this.map) === null || _a === void 0 ? void 0 : _a.addInteraction(this.interaction);
        this.modeSelected = 'navigate';
    }
    removeInteraction() {
        var _a;
        (_a = this.map) === null || _a === void 0 ? void 0 : _a.removeInteraction(this.interaction);
        this.interaction = null;
    }
    setHomeCoordinates() {
        var _a;
        // @ts-ignore
        let center = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getView().getCenter();
        if (center != undefined) {
            this.mapDesign.coordinatesX = center[0];
            this.mapDesign.coordinatesY = center[1];
            this.mapDesignService.saveMapDesign(this.mapDesign).subscribe(m => {
                this.loadMap();
                this.toastr.info("New center was set!", "Map Service");
            });
        }
    }
    deleteMap() {
        var _a, _b;
        console.log((_a = this.lastSelectedFeature) === null || _a === void 0 ? void 0 : _a.get('number'));
        let territoryNumber = (_b = this.lastSelectedFeature) === null || _b === void 0 ? void 0 : _b.get('number');
        this.mapDesignService.deleteTerritoryMap(territoryNumber).subscribe(data => { });
        this.loadMap();
    }
    setMapData(territory) {
        this.territoryCustomNumber.setValue(territory.number);
        this.territoryCustomName.setValue(territory.name);
    }
    exportKml() {
        this.mapDesignService.exportKml().subscribe(v => {
            this.toastr.info("KML(s) exported!", "Map Service");
        });
    }
    importKml() {
        console.log('import.kml');
    }
    importStreetNames() {
        this.mapDesignService.importStreetNames().subscribe(v => {
            this.toastr.info("Street data imported from OSM", "Map Service");
        });
    }
    setActive() {
        if (this.lastSelectedTerritoryMap != undefined) {
            console.log(this.lastSelectedTerritoryMap);
            this.mapDesign.territoryMapList.forEach(t => {
                var _a;
                if (t.territoryNumber == ((_a = this.lastSelectedTerritoryMap) === null || _a === void 0 ? void 0 : _a.territoryNumber)) {
                    t.draft = false;
                    this.mapDesignService.saveMapDesign(this.mapDesign).subscribe(m => {
                        this.territoryNumber.setValue('');
                        this.loadMap();
                    });
                }
            });
            let territoryNumber = this.lastSelectedTerritoryMap.territoryNumber;
            let territoryName = this.lastSelectedTerritoryMap.territoryName;
            this.mapDesignService.setActiveTerritory(territoryNumber, territoryName).subscribe(e => {
                this.toastr.success(territoryNumber + ' ' + territoryName + ' is now active!', 'Map Service');
                this.loadMap();
            });
            this.lastSelectedFeature = undefined;
            this.lastSelectedTerritoryMap = undefined;
        }
    }
    navigateToTerritoryMap(number) {
        var _a;
        let feature = this.source.getFeatureById(number);
        if (feature != undefined && feature.getGeometry() != undefined) {
            // @ts-ignore
            let extent = feature.getGeometry().getExtent();
            (_a = this.map) === null || _a === void 0 ? void 0 : _a.getView().fit(extent);
        }
    }
}
DesignerComponent.ɵfac = function DesignerComponent_Factory(t) { return new (t || DesignerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_congregation_service__WEBPACK_IMPORTED_MODULE_16__["CongregationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_map_design_service__WEBPACK_IMPORTED_MODULE_17__["MapDesignService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__["NgbModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_19__["ToastrService"])); };
DesignerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DesignerComponent, selectors: [["app-designer"]], decls: 43, vars: 7, consts: [["id", "map", 2, "top", "0px", "left", "0px", "width", "100%", "height", "100%", "position", "fixed", "background-color", "#125699"], [1, "btn-group-vertical", 2, "position", "fixed", "background-color", "#95ff1b", "top", "10px", "left", "10px"], ["routerLink", "home", 1, "btn", "btn-sm", "btn-primary", "toolbar-button"], [1, "btn", "btn-sm", "btn-info", "toolbar-button", 3, "click"], [1, "btn", "btn-sm", "btn-success", "toolbar-button", 3, "click"], [1, "btn", "btn-sm", "btn-primary", "toolbar-button", 3, "click"], ["class", "btn btn-sm btn-warning toolbar-button", 3, "click", 4, "ngIf"], [1, "btn", "btn-sm", "btn-danger", "toolbar-button", 3, "click"], [1, "btn-group-vertical", 2, "position", "fixed", "background-color", "white", "top", "10px", "right", "20px", "margin", "10px"], ["aria-label", "Default select example", 1, "form-select", "form-select-sm", 3, "change"], ["t", ""], ["selected", ""], [3, "value", "change", 4, "ngFor", "ngForOf"], ["target", "googleMaps", 3, "href", 4, "ngIf"], ["style", "position: fixed; background-color: #bbbec0; bottom: 10px; left: 20px;", 4, "ngIf"], [1, "btn", "btn-sm", "btn-warning", "toolbar-button", 3, "click"], [3, "value", "change"], ["target", "googleMaps", 3, "href"], [2, "position", "fixed", "background-color", "#bbbec0", "bottom", "10px", "left", "20px"], [1, "input-group", "mb-3"], ["type", "text", "placeholder", "number", 1, "form-control", "form-control-sm", 3, "formControl"], ["type", "text", "placeholder", "territory name", 1, "form-control", "form-control-sm", 3, "formControl"], ["type", "text", "placeholder", "note", 1, "form-control", "form-control-sm", 3, "formControl"], [1, "input-group-append"], [1, "btn", "btn-primary", "btn-sm", 2, "margin-left", "0.2rem", 3, "click"], ["style", "margin-left: 0.2rem", "class", "btn btn-success btn-sm", 3, "click", 4, "ngIf"], [1, "btn", "btn-success", "btn-sm", 2, "margin-left", "0.2rem", 3, "click"]], template: function DesignerComponent_Template(rf, ctx) { if (rf & 1) {
        const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "HOME");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "-------");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_6_listener() { return ctx.setHomeCoordinates(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "SET HOME XY");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_8_listener() { return ctx.exportKml(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "EXPORT KML");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_10_listener() { return ctx.importStreetNames(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "IMPORT STREET NAMES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_12_listener() { return ctx.importKml(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "IMPORT KML");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "-------");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_16_listener() { return ctx.drawPolygon(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "POLYGON");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_18_listener() { return ctx.drawLine(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "LINE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_20_listener() { return ctx.drawPoint(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "POINT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, DesignerComponent_button_22_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_23_listener() { return ctx.setNavigateMode(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "NAVIGATE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, DesignerComponent_button_25_Template, 2, 0, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "-------");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DesignerComponent_Template_button_click_28_listener() { return ctx.deleteMap(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "DELETE MAP");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " Last saved territory:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "select", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function DesignerComponent_Template_select_change_36_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](37); return ctx.navigateToTerritoryMap(_r2.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Navigate to ...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](40, DesignerComponent_option_40_Template, 2, 3, "option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, DesignerComponent_a_41_Template, 2, 3, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](42, DesignerComponent_div_42_Template, 9, 4, "div", 14);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.modeSelected != "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.featureModified);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.lastSavedTerritoryName, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Territories: ", ctx.mapDesign.territoryMapList.length, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.mapDesign.territoryMapList);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.map);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.lastSelectedFeature != undefined);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_20__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_21__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_x"], _angular_common__WEBPACK_IMPORTED_MODULE_21__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControlDirective"]], styles: [".toolbar-button[_ngcontent-%COMP%] {\n  margin-inline: 5px;\n  margin: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxkZXNpZ25lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtBQUNGIiwiZmlsZSI6ImRlc2lnbmVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvb2xiYXItYnV0dG9uIHtcclxuICBtYXJnaW4taW5saW5lOiA1cHg7XHJcbiAgbWFyZ2luOiA1cHg7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DesignerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-designer',
                templateUrl: './designer.component.html',
                styleUrls: ['./designer.component.scss']
            }]
    }], function () { return [{ type: _services_congregation_service__WEBPACK_IMPORTED_MODULE_16__["CongregationService"] }, { type: _services_map_design_service__WEBPACK_IMPORTED_MODULE_17__["MapDesignService"] }, { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_18__["NgbModal"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_19__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "V8r4":
/*!*****************************************!*\
  !*** ./src/app/domains/Congregation.ts ***!
  \*****************************************/
/*! exports provided: Congregation, Preacher, Territory, RegistryEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Congregation", function() { return Congregation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Preacher", function() { return Preacher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Territory", function() { return Territory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistryEntry", function() { return RegistryEntry; });
class Congregation {
    constructor() {
        this.lastUpdate = new Date();
        this.territoryList = [];
        this.preacherList = [];
    }
}
class Preacher {
    constructor() {
        this.name = '';
        this.territoryListNumbers = [];
        this.group = [];
        this.softdelete = false;
        this.harddelete = false;
        this.showPreacherActions = false;
        this.css = "";
    }
}
class Territory {
    constructor() {
        this.number = 0;
        this.name = '';
        this.date = new Date();
        this.registryEntryList = [];
        this.notes = [];
        this.noContacts = false;
        this.archive = false;
        this.url = '';
        this.newPreacherAssigned = false;
    }
}
class RegistryEntry {
    constructor() {
        this.territoryNumber = 0;
        this.territoryName = "";
        this.preacher = new Preacher();
        this.assignDate = new Date();
        this.returnDate = new Date();
        this.territory = new Territory();
    }
}


/***/ }),

/***/ "WfQD":
/*!*************************************************!*\
  !*** ./src/app/components/app/app.component.ts ***!
  \*************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_congregation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/congregation.service */ "o9ao");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");






class AppComponent {
    constructor(congregationService, toastr) {
        this.congregationService = congregationService;
        this.toastr = toastr;
        this.title = 'ui';
        this.printingInProgress = '';
        this.exportInProgress = '';
    }
    exportPDF() {
        this.printingInProgress = ' ... in progress ...';
        this.congregationService.printCongregation().subscribe(v => {
            this.printingInProgress = '';
            this.toastr.info("Congregation PDF generated!", "Print Service");
        });
    }
    exportDatabase() {
        this.exportInProgress = ' ... in progress ...';
        this.congregationService.exportDatabase().subscribe(v => {
            this.exportInProgress = '';
            this.toastr.info("Congregation data exported!", "Export Service");
        });
    }
    exportTerritoryData() {
        this.congregationService.exportTerritoryData().subscribe(v => {
            this.toastr.info("Territory data exported!", "Export Service");
        });
    }
    repairMaps() {
        this.congregationService.repairExports().subscribe(e => {
            this.toastr.info("Territory Maps repaired!", "Export Service");
        });
    }
    exportAllTerritoryData() {
        this.congregationService.exportAllTerritoryData().subscribe(v => {
            this.toastr.info("All territory data exported!", "Export Service");
        });
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_congregation_service__WEBPACK_IMPORTED_MODULE_1__["CongregationService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 21, vars: 1, consts: [["role", "banner", 1, "toolbar"], ["href", "#"], ["width", "40", "alt", "Map Designer", "src", "assets/Map-03.png", "title", "Map Designer"], [1, "navbar", "navbar-expand-lg"], [1, "container-fluid"], ["type", "button", "routerLink", "home", 1, "btn", "btn-primary", 2, "color", "white"], ["type", "button", "routerLink", "maps", 1, "btn", "btn-success", 2, "color", "white"], ["type", "button", "routerLink", "designer", 1, "btn", "btn-success", 2, "color", "white"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-success", 3, "click"], [1, "spacer"], ["role", "main", 1, "content"], ["id", "clouds", "alt", "Gray Clouds Background", "xmlns", "http://www.w3.org/2000/svg", "width", "2611.084", "height", "485.677", "viewBox", "0 0 2611.084 485.677"], ["id", "Path_39", "data-name", "Path 39", "d", "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z", "transform", "translate(142.69 -634.312)", "fill", "#eee"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Overview");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Maps");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Designer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_11_listener() { return ctx.exportPDF(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_13_listener() { return ctx.exportAllTerritoryData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Export All Territory Data");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "svg", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Export PDF ", ctx.printingInProgress, "");
    } }, directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbNavbar"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"]], styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 14px;\n  color: #333;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\nh1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n  margin: 8px 0;\n}\np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.btn[_ngcontent-%COMP%] {\n  margin-left: 1rem;\n}\n.spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.toolbar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  background-color: #002141;\n  color: white;\n  font-weight: 600;\n}\n.toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin: 0 16px;\n}\n.toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n  height: 40px;\n  margin: 0 16px;\n}\n.toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.content[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 82px auto 32px;\n  padding: 0 16px;\n  max-width: 960px;\n  flex-direction: column;\n  align-items: center;\n}\nsvg.material-icons[_ngcontent-%COMP%] {\n  height: 24px;\n  width: auto;\n}\nsvg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 8px;\n}\n.card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: #888;\n}\n.card-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-top: 16px;\n}\n.card[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  border: 1px solid #eee;\n  background-color: #fafafa;\n  height: 40px;\n  width: 200px;\n  margin: 0 8px 16px;\n  padding: 16px;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  transition: all 0.2s ease-in-out;\n  line-height: 24px;\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n  margin-right: 0;\n}\n.card.card-small[_ngcontent-%COMP%] {\n  height: 16px;\n  width: 168px;\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n  cursor: pointer;\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n  transform: translateY(-3px);\n  box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n}\n.card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n  fill: #696767;\n}\n.card.highlight-card[_ngcontent-%COMP%] {\n  background-color: #1976d2;\n  color: white;\n  font-weight: 600;\n  border: none;\n  width: auto;\n  min-width: 30%;\n  position: relative;\n}\n.card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 60px;\n}\nsvg#rocket[_ngcontent-%COMP%] {\n  width: 80px;\n  position: absolute;\n  left: -10px;\n  top: -24px;\n}\nsvg#rocket-smoke[_ngcontent-%COMP%] {\n  height: calc(100vh - 95px);\n  position: absolute;\n  top: 10px;\n  right: 180px;\n  z-index: -10;\n}\na[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n  color: #1976d2;\n  text-decoration: none;\n}\na[_ngcontent-%COMP%]:hover {\n  color: #125699;\n}\n.terminal[_ngcontent-%COMP%] {\n  position: relative;\n  width: 80%;\n  max-width: 600px;\n  border-radius: 6px;\n  padding-top: 45px;\n  margin-top: 8px;\n  overflow: hidden;\n  background-color: #0f0f10;\n}\n.terminal[_ngcontent-%COMP%]::before {\n  content: \"\u2022\u2022\u2022\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 4px;\n  background: #3a3a3a;\n  color: #c2c3c4;\n  width: 100%;\n  font-size: 2rem;\n  line-height: 0;\n  padding: 14px 0;\n  text-indent: 4px;\n}\n.terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;\n  color: white;\n  padding: 0 1rem 1rem;\n  margin: 0;\n}\n.circle-link[_ngcontent-%COMP%] {\n  height: 40px;\n  width: 40px;\n  border-radius: 40px;\n  margin: 8px;\n  background-color: white;\n  border: 1px solid #eeeeee;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n  transition: 1s ease-out;\n}\n.circle-link[_ngcontent-%COMP%]:hover {\n  transform: translateY(-0.25rem);\n  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n}\nfooter[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  display: flex;\n  align-items: center;\n  line-height: 20px;\n}\nfooter[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.github-star-badge[_ngcontent-%COMP%] {\n  color: #24292e;\n  display: flex;\n  align-items: center;\n  font-size: 12px;\n  padding: 3px 10px;\n  border: 1px solid rgba(27, 31, 35, 0.2);\n  border-radius: 3px;\n  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);\n  margin-left: 4px;\n  font-weight: 600;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n}\n.github-star-badge[_ngcontent-%COMP%]:hover {\n  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);\n  border-color: rgba(27, 31, 35, 0.35);\n  background-position: -0.5em;\n}\n.github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n  height: 16px;\n  width: 16px;\n  margin-right: 4px;\n}\nsvg#clouds[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: -160px;\n  left: -230px;\n  z-index: -10;\n  width: 1920px;\n}\n\n@media screen and (max-width: 767px) {\n  .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    height: 16px;\n    margin: 8px 0;\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 72px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    right: 120px;\n    transform: rotate(-5deg);\n  }\n}\n@media screen and (max-width: 575px) {\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    display: none;\n    visibility: hidden;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxhcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0UsMEpBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0VBQ0EsbUNBQUE7RUFDQSxrQ0FBQTtBQUVGO0FBQ0E7Ozs7OztFQU1FLGFBQUE7QUFFRjtBQUNBO0VBQ0UsU0FBQTtBQUVGO0FBQ0E7RUFDRSxpQkFBQTtBQUVGO0FBQ0E7RUFDRSxPQUFBO0FBRUY7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBRUY7QUFDQTtFQUNFLGNBQUE7QUFFRjtBQUNBO0VBQ0UsWUFBQTtFQUNBLGNBQUE7QUFFRjtBQUNBO0VBQ0UsWUFBQTtBQUVGO0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBRUY7QUFDQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBRUY7QUFDQTtFQUNFLGlCQUFBO0FBRUY7QUFDQTtFQUNFLFVBQUE7QUFFRjtBQUNBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0FBRUY7QUFDQTtFQUNFLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7QUFFRjtBQUNBO0VBQ0UsZUFBQTtBQUVGO0FBQ0E7RUFDRSxZQUFBO0VBQ0EsWUFBQTtBQUVGO0FBQ0E7RUFDRSxlQUFBO0FBRUY7QUFDQTtFQUNFLDJCQUFBO0VBQ0EsMENBQUE7QUFFRjtBQUNBO0VBQ0UsYUFBQTtBQUVGO0FBQ0E7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBRUY7QUFDQTtFQUNFLGlCQUFBO0FBRUY7QUFDQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBRUY7QUFDQTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUFFRjtBQUNBOzs7RUFHRSxjQUFBO0VBQ0EscUJBQUE7QUFFRjtBQUNBO0VBQ0UsY0FBQTtBQUVGO0FBQ0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQUVGO0FBQ0E7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFFRjtBQUNBO0VBQ0Usd0VBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxTQUFBO0FBRUY7QUFDQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHdFQUFBO0VBQ0EsdUJBQUE7QUFFRjtBQUNBO0VBQ0UsK0JBQUE7RUFDQSwyQ0FBQTtBQUVGO0FBQ0E7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUFFRjtBQUNBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBRUY7QUFDQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0VBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMElBQUE7QUFFRjtBQUNBO0VBQ0UsZ0VBQUE7RUFDQSxvQ0FBQTtFQUNBLDJCQUFBO0FBRUY7QUFDQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUFFRjtBQUNBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUFFRjtBQUVBLHNCQUFBO0FBQ0E7RUFFRTs7SUFFRSxXQUFBO0VBQUY7O0VBR0E7SUFDRSxZQUFBO0lBQ0EsYUFBQTtFQUFGOztFQUdBO0lBQ0UsaUJBQUE7RUFBRjs7RUFHQTtJQUNFLFlBQUE7SUFDQSx3QkFBQTtFQUFGO0FBQ0Y7QUFHQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLGtCQUFBO0VBREY7QUFDRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG46aG9zdCB7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzMzMztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG59XG5cbmgxLFxuaDIsXG5oMyxcbmg0LFxuaDUsXG5oNiB7XG4gIG1hcmdpbjogOHB4IDA7XG59XG5cbnAge1xuICBtYXJnaW46IDA7XG59XG5cbi5idG4ge1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cblxuLnNwYWNlciB7XG4gIGZsZXg6IDE7XG59XG5cbi50b29sYmFyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBoZWlnaHQ6IDYwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDIxNDE7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLnRvb2xiYXIgaW1nIHtcbiAgbWFyZ2luOiAwIDE2cHg7XG59XG5cbi50b29sYmFyICN0d2l0dGVyLWxvZ28ge1xuICBoZWlnaHQ6IDQwcHg7XG4gIG1hcmdpbjogMCAxNnB4O1xufVxuXG4udG9vbGJhciAjdHdpdHRlci1sb2dvOmhvdmVyIHtcbiAgb3BhY2l0eTogMC44O1xufVxuXG4uY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1hcmdpbjogODJweCBhdXRvIDMycHg7XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgbWF4LXdpZHRoOiA5NjBweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuc3ZnLm1hdGVyaWFsLWljb25zIHtcbiAgaGVpZ2h0OiAyNHB4O1xuICB3aWR0aDogYXV0bztcbn1cblxuc3ZnLm1hdGVyaWFsLWljb25zOm5vdCg6bGFzdC1jaGlsZCkge1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbn1cblxuLmNhcmQgc3ZnLm1hdGVyaWFsLWljb25zIHBhdGgge1xuICBmaWxsOiAjODg4O1xufVxuXG4uY2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuXG4uY2FyZCB7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcbiAgaGVpZ2h0OiA0MHB4O1xuICB3aWR0aDogMjAwcHg7XG4gIG1hcmdpbjogMCA4cHggMTZweDtcbiAgcGFkZGluZzogMTZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xuICBsaW5lLWhlaWdodDogMjRweDtcbn1cblxuLmNhcmQtY29udGFpbmVyIC5jYXJkOm5vdCg6bGFzdC1jaGlsZCkge1xuICBtYXJnaW4tcmlnaHQ6IDA7XG59XG5cbi5jYXJkLmNhcmQtc21hbGwge1xuICBoZWlnaHQ6IDE2cHg7XG4gIHdpZHRoOiAxNjhweDtcbn1cblxuLmNhcmQtY29udGFpbmVyIC5jYXJkOm5vdCguaGlnaGxpZ2h0LWNhcmQpIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY2FyZC1jb250YWluZXIgLmNhcmQ6bm90KC5oaWdobGlnaHQtY2FyZCk6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE3cHggcmdiYSgwLCAwLCAwLCAwLjM1KTtcbn1cblxuLmNhcmQtY29udGFpbmVyIC5jYXJkOm5vdCguaGlnaGxpZ2h0LWNhcmQpOmhvdmVyIC5tYXRlcmlhbC1pY29ucyBwYXRoIHtcbiAgZmlsbDogIzY5Njc2Nztcbn1cblxuLmNhcmQuaGlnaGxpZ2h0LWNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk3NmQyO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgd2lkdGg6IGF1dG87XG4gIG1pbi13aWR0aDogMzAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5jYXJkLmNhcmQuaGlnaGxpZ2h0LWNhcmQgc3BhbiB7XG4gIG1hcmdpbi1sZWZ0OiA2MHB4O1xufVxuXG5zdmcjcm9ja2V0IHtcbiAgd2lkdGg6IDgwcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogLTEwcHg7XG4gIHRvcDogLTI0cHg7XG59XG5cbnN2ZyNyb2NrZXQtc21va2Uge1xuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA5NXB4KTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwcHg7XG4gIHJpZ2h0OiAxODBweDtcbiAgei1pbmRleDogLTEwO1xufVxuXG5hLFxuYTp2aXNpdGVkLFxuYTpob3ZlciB7XG4gIGNvbG9yOiAjMTk3NmQyO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbmE6aG92ZXIge1xuICBjb2xvcjogIzEyNTY5OTtcbn1cblxuLnRlcm1pbmFsIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogODAlO1xuICBtYXgtd2lkdGg6IDYwMHB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmctdG9wOiA0NXB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQtY29sb3I6ICMwZjBmMTA7XG59XG5cbi50ZXJtaW5hbDo6YmVmb3JlIHtcbiAgY29udGVudDogXCLigKLigKLigKJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogNHB4O1xuICBiYWNrZ3JvdW5kOiAjM2EzYTNhO1xuICBjb2xvcjogI2MyYzNjNDtcbiAgd2lkdGg6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIHBhZGRpbmc6IDE0cHggMDtcbiAgdGV4dC1pbmRlbnQ6IDRweDtcbn1cblxuLnRlcm1pbmFsIHByZSB7XG4gIGZvbnQtZmFtaWx5OiBTRk1vbm8tUmVndWxhciwgQ29uc29sYXMsIExpYmVyYXRpb24gTW9ubywgTWVubG8sIG1vbm9zcGFjZTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAwIDFyZW0gMXJlbTtcbiAgbWFyZ2luOiAwO1xufVxuXG4uY2lyY2xlLWxpbmsge1xuICBoZWlnaHQ6IDQwcHg7XG4gIHdpZHRoOiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiA0MHB4O1xuICBtYXJnaW46IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWVlZWU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjI0KTtcbiAgdHJhbnNpdGlvbjogMXMgZWFzZS1vdXQ7XG59XG5cbi5jaXJjbGUtbGluazpob3ZlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC4yNXJlbSk7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG5cbmZvb3RlciB7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG59XG5cbmZvb3RlciBhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmdpdGh1Yi1zdGFyLWJhZGdlIHtcbiAgY29sb3I6ICMyNDI5MmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgcGFkZGluZzogM3B4IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjcsIDMxLCAzNSwgMC4yKTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgI2ZhZmJmYywgI2VmZjNmNiA5MCUpO1xuICBtYXJnaW4tbGVmdDogNHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgQXBwbGUgQ29sb3IgRW1vamksIFNlZ29lIFVJIEVtb2ppLCBTZWdvZSBVSSBTeW1ib2w7XG59XG5cbi5naXRodWItc3Rhci1iYWRnZTpob3ZlciB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjZjBmM2Y2LCAjZTZlYmYxIDkwJSk7XG4gIGJvcmRlci1jb2xvcjogcmdiYSgyNywgMzEsIDM1LCAwLjM1KTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTAuNWVtO1xufVxuXG4uZ2l0aHViLXN0YXItYmFkZ2UgLm1hdGVyaWFsLWljb25zIHtcbiAgaGVpZ2h0OiAxNnB4O1xuICB3aWR0aDogMTZweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XG59XG5cbnN2ZyNjbG91ZHMge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGJvdHRvbTogLTE2MHB4O1xuICBsZWZ0OiAtMjMwcHg7XG4gIHotaW5kZXg6IC0xMDtcbiAgd2lkdGg6IDE5MjBweDtcbn1cblxuLyogUmVzcG9uc2l2ZSBTdHlsZXMgKi9cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gIC5jYXJkLWNvbnRhaW5lciA+ICo6bm90KC5jaXJjbGUtbGluayksXG4udGVybWluYWwge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLmNhcmQ6bm90KC5oaWdobGlnaHQtY2FyZCkge1xuICAgIGhlaWdodDogMTZweDtcbiAgICBtYXJnaW46IDhweCAwO1xuICB9XG5cbiAgLmNhcmQuaGlnaGxpZ2h0LWNhcmQgc3BhbiB7XG4gICAgbWFyZ2luLWxlZnQ6IDcycHg7XG4gIH1cblxuICBzdmcjcm9ja2V0LXNtb2tlIHtcbiAgICByaWdodDogMTIwcHg7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTVkZWcpO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA1NzVweCkge1xuICBzdmcjcm9ja2V0LXNtb2tlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _services_congregation_service__WEBPACK_IMPORTED_MODULE_1__["CongregationService"] }, { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] }]; }, null); })();


/***/ }),

/***/ "YqcE":
/*!***************************************************************************!*\
  !*** ./src/app/components/territory-detail/territory-detail.component.ts ***!
  \***************************************************************************/
/*! exports provided: TerritoryDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TerritoryDetailComponent", function() { return TerritoryDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../domains/Congregation */ "V8r4");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _services_congregation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/congregation.service */ "o9ao");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-ng-autocomplete */ "bH2/");









function TerritoryDetailComponent_table_7_tr_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const registryEntry_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](registryEntry_r7.preacher.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](5, 3, registryEntry_r7.assignDate, "dd-MM-yy"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](8, 6, registryEntry_r7.returnDate, "dd-MM-yy"));
} }
function TerritoryDetailComponent_table_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "thead");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "tr", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Assigned");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Returned");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, TerritoryDetailComponent_table_7_tr_10_Template, 9, 9, "tr", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.territory.registryEntryList);
} }
function TerritoryDetailComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "pre", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoryDetailComponent_div_9_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const note_r9 = ctx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.removeNote(note_r9); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const note_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](note_r9);
} }
function TerritoryDetailComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "a", 33);
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", item_r12.name, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function TerritoryDetailComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 33);
} if (rf & 2) {
    const notFound_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", notFound_r13, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
class TerritoryDetailComponent {
    constructor(activeModal, congregationService) {
        this.activeModal = activeModal;
        this.congregationService = congregationService;
        this.territory = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__["Territory"]();
        this.preacherList = [];
        this.noContacts = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false);
        this.intoArchive = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](false);
        this.url = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('');
        this.selectedPreacher = null;
        this.keyword = "name";
        this.note = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('');
    }
    ngOnInit() {
    }
    selectEvent(selectedPreacher) {
        if (this.territory == null) {
            console.error('territory object is null');
            return;
        }
        if (this.territory.registryEntryList.length > 0) {
            let lastEntry = this.territory.registryEntryList[this.territory.registryEntryList.length - 1];
            lastEntry.returnDate = new Date();
        }
        let copyOfPreacher = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__["Preacher"]();
        copyOfPreacher.name = selectedPreacher.name;
        let registryEntry = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__["RegistryEntry"]();
        registryEntry.territoryName = this.territory.name;
        registryEntry.territoryNumber = this.territory.number;
        registryEntry.preacher = copyOfPreacher;
        registryEntry.returnDate = null;
        this.territory.registryEntryList.push(registryEntry);
        this.territory.newPreacherAssigned = true;
    }
    onChangeSearch($event) {
    }
    onFocused($event) {
    }
    addNote() {
        this.territory.notes.push(this.note.value);
        this.note.setValue('');
    }
    removeNote(note) {
        let newNotes = [];
        this.territory.notes.forEach(n => {
            if (n != note)
                newNotes.push(n);
        });
        this.territory.notes = newNotes;
    }
    setUrl() {
        this.territory.url = this.url.value;
    }
    exportTerritoryMap(territory) {
        this.congregationService.exportTerritoryData(territory.number).subscribe(e => {
        });
    }
}
TerritoryDetailComponent.ɵfac = function TerritoryDetailComponent_Factory(t) { return new (t || TerritoryDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbActiveModal"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_congregation_service__WEBPACK_IMPORTED_MODULE_4__["CongregationService"])); };
TerritoryDetailComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TerritoryDetailComponent, selectors: [["app-territory-detail"]], inputs: { territory: "territory", preacherList: "preacherList", noContacts: "noContacts", intoArchive: "intoArchive", url: "url" }, decls: 40, vars: 12, consts: [[1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], ["class", "table table-bordered table-sm table-striped", 4, "ngIf"], [1, "modal-footer"], ["style", "width: 100%;  display: flex;  flex-direction: row;  justify-content: center;", 4, "ngFor", "ngForOf"], [1, "form-check"], ["type", "checkbox", "value", "", "id", "intoArchive", 1, "form-check-input", 3, "formControl"], ["for", "intoArchive", 1, "form-check-label", "text-danger"], ["type", "checkbox", "value", "", "id", "flexCheckDefault", 1, "form-check-input", 3, "formControl"], ["for", "flexCheckDefault", 1, "form-check-label"], [1, "input-group", "mb-3"], ["type", "text", "placeholder", "note", 1, "form-control", 3, "formControl"], [1, "input-group-append"], [1, "btn", "btn-outline-secondary", 2, "margin-left", "0.2rem", 3, "click"], ["type", "text", "placeholder", "url", 1, "form-control", 3, "formControl"], [1, "btn", "btn-success", 2, "margin-left", "0.2rem", 3, "click"], [1, "ng-autocomplete"], ["placeHolder", "Enter the Preacher Name", 3, "data", "searchKeyword", "itemTemplate", "notFoundTemplate", "selected", "inputChanged", "inputFocused"], ["itemTemplate", ""], ["notFoundTemplate", ""], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["type", "button", 1, "btn", "btn-outline-warning", 3, "click"], ["type", "button", 1, "btn", "btn-outline-success", 3, "click"], [1, "table", "table-bordered", "table-sm", "table-striped"], [1, "bg-primary"], ["class", "col-auto", 4, "ngFor", "ngForOf"], [1, "col-auto"], [2, "width", "100%", "display", "flex", "flex-direction", "row", "justify-content", "center"], [2, "color", "#aa0000"], [1, "btn", "btn-danger", "btn-xs", 2, "margin-left", "0.3rem", 3, "click"], [3, "innerHTML"]], template: function TerritoryDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoryDetailComponent_Template_button_click_3_listener() { return ctx.activeModal.dismiss("Cross click"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, TerritoryDetailComponent_table_7_Template, 11, 1, "table", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, TerritoryDetailComponent_div_9_Template, 5, 1, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " into archive ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " no contacts in this territory ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoryDetailComponent_Template_button_click_21_listener() { return ctx.addNote(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Add note");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoryDetailComponent_Template_button_click_26_listener() { return ctx.setUrl(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Set url");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "ng-autocomplete", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selected", function TerritoryDetailComponent_Template_ng_autocomplete_selected_29_listener($event) { return ctx.selectEvent($event); })("inputChanged", function TerritoryDetailComponent_Template_ng_autocomplete_inputChanged_29_listener($event) { return ctx.onChangeSearch($event); })("inputFocused", function TerritoryDetailComponent_Template_ng_autocomplete_inputFocused_29_listener($event) { return ctx.onFocused($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](30, TerritoryDetailComponent_ng_template_30_Template, 1, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, TerritoryDetailComponent_ng_template_32_Template, 1, 1, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "button", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoryDetailComponent_Template_button_click_34_listener() { return ctx.exportTerritoryMap(ctx.territory); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Export Territory Map");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoryDetailComponent_Template_button_click_36_listener() { return ctx.activeModal.close("Cancel click"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TerritoryDetailComponent_Template_button_click_38_listener() { return ctx.activeModal.close("Close click"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](31);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.territory.number, " ", ctx.territory.name, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.territory);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.territory.notes);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.intoArchive);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.noContacts);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.note);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.url);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx.preacherList)("searchKeyword", ctx.keyword)("itemTemplate", _r2)("notFoundTemplate", _r4);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_6__["AutocompleteComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"]], styles: ["tr[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.ng-autocomplete[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 600px;\n  display: table;\n  margin: 0 auto;\n}\n\n.btn-xs[_ngcontent-%COMP%] {\n  padding: 0rem 0.25rem 0rem 0.25rem !important;\n  font-size: 0.875rem !important;\n  line-height: 0.5 !important;\n  border-radius: 0.2rem !important;\n  height: 1.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFx0ZXJyaXRvcnktZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLDZDQUFBO0VBQ0EsOEJBQUE7RUFDQSwyQkFBQTtFQUNBLGdDQUFBO0VBQ0EsY0FBQTtBQUNGIiwiZmlsZSI6InRlcnJpdG9yeS1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0ciB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ubmctYXV0b2NvbXBsZXRlIHtcclxuICB3aWR0aDoxMDAlO1xyXG4gIG1heC13aWR0aDogNjAwcHg7XHJcbiAgZGlzcGxheTogdGFibGU7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi5idG4teHMge1xyXG4gIHBhZGRpbmc6IDAuMHJlbSAuMjVyZW0gMC4wcmVtIC4yNXJlbSAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogLjg3NXJlbSAhaW1wb3J0YW50O1xyXG4gIGxpbmUtaGVpZ2h0OiAuNSAhaW1wb3J0YW50O1xyXG4gIGJvcmRlci1yYWRpdXM6IC4ycmVtICFpbXBvcnRhbnQ7XHJcbiAgaGVpZ2h0OiAxLjVyZW1cclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TerritoryDetailComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-territory-detail',
                templateUrl: './territory-detail.component.html',
                styleUrls: ['./territory-detail.component.scss']
            }]
    }], function () { return [{ type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbActiveModal"] }, { type: _services_congregation_service__WEBPACK_IMPORTED_MODULE_4__["CongregationService"] }]; }, { territory: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], preacherList: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], noContacts: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], intoArchive: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], url: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _components_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/app/app.component */ "WfQD");
/* harmony import */ var _components_territories_overview_territories_overview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/territories-overview/territories-overview.component */ "JWzQ");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _components_territory_detail_territory_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/territory-detail/territory-detail.component */ "YqcE");
/* harmony import */ var angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-ng-autocomplete */ "bH2/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _components_manage_group_member_manage_group_member_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/manage-group-member/manage-group-member.component */ "aXu4");
/* harmony import */ var _components_maps_collection_maps_collection_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/maps-collection/maps-collection.component */ "u5Tr");
/* harmony import */ var ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-bootstrap-icons */ "n45d");
/* harmony import */ var _components_designer_designer_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/designer/designer.component */ "NUr+");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");



















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"],
            angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_8__["AutocompleteLibModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
            ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_12__["NgxBootstrapIconsModule"].pick(ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_12__["allIcons"]),
            ngx_toastr__WEBPACK_IMPORTED_MODULE_14__["ToastrModule"].forRoot(),
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _components_territories_overview_territories_overview_component__WEBPACK_IMPORTED_MODULE_4__["TerritoriesOverviewComponent"],
        _components_territory_detail_territory_detail_component__WEBPACK_IMPORTED_MODULE_7__["TerritoryDetailComponent"],
        _components_manage_group_member_manage_group_member_component__WEBPACK_IMPORTED_MODULE_10__["ManageGroupMemberComponent"],
        _components_maps_collection_maps_collection_component__WEBPACK_IMPORTED_MODULE_11__["MapsCollectionComponent"],
        _components_designer_designer_component__WEBPACK_IMPORTED_MODULE_13__["DesignerComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"],
        angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_8__["AutocompleteLibModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"], ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_12__["NgxBootstrapIconsModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_14__["ToastrModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _components_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _components_territories_overview_territories_overview_component__WEBPACK_IMPORTED_MODULE_4__["TerritoriesOverviewComponent"],
                    _components_territory_detail_territory_detail_component__WEBPACK_IMPORTED_MODULE_7__["TerritoryDetailComponent"],
                    _components_manage_group_member_manage_group_member_component__WEBPACK_IMPORTED_MODULE_10__["ManageGroupMemberComponent"],
                    _components_maps_collection_maps_collection_component__WEBPACK_IMPORTED_MODULE_11__["MapsCollectionComponent"],
                    _components_designer_designer_component__WEBPACK_IMPORTED_MODULE_13__["DesignerComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__["NgbModule"],
                    angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_8__["AutocompleteLibModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                    ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_12__["NgxBootstrapIconsModule"].pick(ngx_bootstrap_icons__WEBPACK_IMPORTED_MODULE_12__["allIcons"]),
                    ngx_toastr__WEBPACK_IMPORTED_MODULE_14__["ToastrModule"].forRoot(),
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"]
                ],
                providers: [],
                bootstrap: [_components_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "aXu4":
/*!*********************************************************************************!*\
  !*** ./src/app/components/manage-group-member/manage-group-member.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ManageGroupMemberComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageGroupMemberComponent", function() { return ManageGroupMemberComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../domains/Congregation */ "V8r4");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-ng-autocomplete */ "bH2/");






function ManageGroupMemberComponent_div_7_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "a", 17);
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", item_r6.name, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function ManageGroupMemberComponent_div_7_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 17);
} if (rf & 2) {
    const notFound_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", notFound_r7, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function ManageGroupMemberComponent_div_7_button_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const member_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", member_r8, " ");
} }
function ManageGroupMemberComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "ng-autocomplete", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selected", function ManageGroupMemberComponent_div_7_Template_ng_autocomplete_selected_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.selectEvent($event); })("inputChanged", function ManageGroupMemberComponent_div_7_Template_ng_autocomplete_inputChanged_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.onChangeSearch($event); })("inputFocused", function ManageGroupMemberComponent_div_7_Template_ng_autocomplete_inputFocused_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.onFocused($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ManageGroupMemberComponent_div_7_ng_template_4_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ManageGroupMemberComponent_div_7_ng_template_6_Template, 1, 1, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, ManageGroupMemberComponent_div_7_button_10_Template, 2, 1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("data", ctx_r0.preacherList)("searchKeyword", ctx_r0.keyword)("itemTemplate", _r1)("notFoundTemplate", _r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.preacher.group);
} }
class ManageGroupMemberComponent {
    constructor(activeModal) {
        this.activeModal = activeModal;
        this.preacherList = [];
        this.selectedPreacher = null;
        this.keyword = "name";
        this.preacher = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__["Preacher"]();
    }
    ngOnInit() {
    }
    selectEvent(selectedPreacher) {
        this.selectedPreacher = selectedPreacher;
    }
    onChangeSearch($event) {
    }
    onFocused($event) {
    }
    addPreacher() {
        if (this.selectedPreacher == null)
            return;
        this.preacher.group.push(this.selectedPreacher.name);
    }
}
ManageGroupMemberComponent.ɵfac = function ManageGroupMemberComponent_Factory(t) { return new (t || ManageGroupMemberComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbActiveModal"])); };
ManageGroupMemberComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ManageGroupMemberComponent, selectors: [["app-manage-group-member"]], inputs: { preacherList: "preacherList" }, decls: 15, vars: 2, consts: [[1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], ["class", "container-fluid", 4, "ngIf"], [1, "modal-footer"], [1, "btn", "btn-success", 3, "click"], ["type", "button", 1, "btn", "btn-outline-warning", 3, "click"], ["type", "button", 1, "btn", "btn-outline-success", 3, "click"], [1, "container-fluid"], [1, "row"], [1, "ng-autocomplete"], ["placeHolder", "Enter the Preacher Name", 3, "data", "searchKeyword", "itemTemplate", "notFoundTemplate", "selected", "inputChanged", "inputFocused"], ["itemTemplate", ""], ["notFoundTemplate", ""], ["class", "btn btn-primary", "style", "margin-right: 0.2rem; margin-bottom: 0.2rem", 4, "ngFor", "ngForOf"], [3, "innerHTML"], [1, "btn", "btn-primary", 2, "margin-right", "0.2rem", "margin-bottom", "0.2rem"]], template: function ManageGroupMemberComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ManageGroupMemberComponent_Template_button_click_3_listener() { return ctx.activeModal.dismiss("Cross click"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ManageGroupMemberComponent_div_7_Template, 11, 5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ManageGroupMemberComponent_Template_button_click_9_listener() { return ctx.addPreacher(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "ADD PREACHER TO GROUP");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ManageGroupMemberComponent_Template_button_click_11_listener() { return ctx.activeModal.close("Cancel click"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ManageGroupMemberComponent_Template_button_click_13_listener() { return ctx.activeModal.close("Close click"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Save");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.preacher.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.preacher);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], angular_ng_autocomplete__WEBPACK_IMPORTED_MODULE_4__["AutocompleteComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYW5hZ2UtZ3JvdXAtbWVtYmVyLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ManageGroupMemberComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-manage-group-member',
                templateUrl: './manage-group-member.component.html',
                styleUrls: ['./manage-group-member.component.scss']
            }]
    }], function () { return [{ type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbActiveModal"] }]; }, { preacherList: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "e08C":
/*!************************************************!*\
  !*** ./src/app/services/map-design.service.ts ***!
  \************************************************/
/*! exports provided: MapDesignService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapDesignService", function() { return MapDesignService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class MapDesignService {
    constructor(http) {
        this.http = http;
    }
    getMapDesign() {
        return this.http.get(`${MapDesignService.url}`);
    }
    saveMapDesign(mapDesign) {
        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return;
                    }
                    seen.add(value);
                }
                return value;
            };
        };
        let stringMapDesign = JSON.stringify(mapDesign, getCircularReplacer());
        let uncycledMapDesign = JSON.parse(stringMapDesign);
        return this.http.put(`${MapDesignService.url}`, uncycledMapDesign);
    }
    deleteTerritoryMap(territoryNumber) {
        return this.http.delete(`${MapDesignService.url}territoryMap/${territoryNumber}`);
    }
    exportKml() {
        return this.http.get(`${MapDesignService.url}exportKml`);
    }
    importStreetNames() {
        return this.http.get(`${MapDesignService.url}importStreetNames`);
    }
    setActiveTerritory(territoryNumber, name) {
        return this.http.get(`${MapDesignService.url}setActiveTerritory/${territoryNumber}/${name}`);
    }
}
MapDesignService.url = `${_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].serverUrl}/map/`;
MapDesignService.ɵfac = function MapDesignService_Factory(t) { return new (t || MapDesignService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
MapDesignService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MapDesignService, factory: MapDesignService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MapDesignService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "o9ao":
/*!**************************************************!*\
  !*** ./src/app/services/congregation.service.ts ***!
  \**************************************************/
/*! exports provided: CongregationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CongregationService", function() { return CongregationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class CongregationService {
    constructor(http) {
        this.http = http;
    }
    getCongregation() {
        return this.http.get(`${CongregationService.url}`);
    }
    search(text) {
        return this.http.get(`${CongregationService.url}search/${text}`);
    }
    printCongregation() {
        return this.http.get(`${CongregationService.url}printPDF`);
    }
    exportDatabase() {
        return this.http.post(`${CongregationService.url}exportDatabase`, null);
    }
    exportTerritoryData(territoryNumber) {
        if (territoryNumber != undefined) {
            return this.http.post(`${CongregationService.url}exportTerritoryData/${territoryNumber}`, null);
        }
        return this.http.post(`${CongregationService.url}exportTerritoryData`, null);
    }
    exportAllTerritoryData() {
        return this.http.post(`${CongregationService.url}exportAllTerritoryData`, null);
    }
    repairExports() {
        return this.http.post(`${CongregationService.url}repairExports`, null);
    }
    saveCongregation(congregation) {
        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
                if (typeof value === "object" && value !== null) {
                    if (seen.has(value)) {
                        return;
                    }
                    seen.add(value);
                }
                return value;
            };
        };
        let stringCongregation = JSON.stringify(congregation, getCircularReplacer());
        let uncycledCongregation = JSON.parse(stringCongregation);
        return this.http.put(`${CongregationService.url}`, uncycledCongregation);
    }
}
CongregationService.url = `${_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].serverUrl}/congregation/`;
CongregationService.ɵfac = function CongregationService_Factory(t) { return new (t || CongregationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
CongregationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CongregationService, factory: CongregationService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CongregationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "u5Tr":
/*!*************************************************************************!*\
  !*** ./src/app/components/maps-collection/maps-collection.component.ts ***!
  \*************************************************************************/
/*! exports provided: MapsCollectionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsCollectionComponent", function() { return MapsCollectionComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../domains/Congregation */ "V8r4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");
/* harmony import */ var _services_congregation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/congregation.service */ "o9ao");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






function MapsCollectionComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const territory_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("href", "", ctx_r0.imageUrlBase, "", territory_r1.number, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("target", territory_r1.number);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate2"]("src", "", ctx_r0.imageUrlBase, "", territory_r1.number, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", territory_r1.number, " - ", territory_r1.name, "\n");
} }
class MapsCollectionComponent {
    constructor(congregationService) {
        this.congregationService = congregationService;
        this.imageUrlBase = `${_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].serverUrl}/congregation/territoryImage/`;
        this.congregation = new _domains_Congregation__WEBPACK_IMPORTED_MODULE_1__["Congregation"]();
    }
    ngOnInit() {
        this.congregationService.getCongregation().subscribe(c => {
            this.congregation = c;
        });
    }
}
MapsCollectionComponent.ɵfac = function MapsCollectionComponent_Factory(t) { return new (t || MapsCollectionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_congregation_service__WEBPACK_IMPORTED_MODULE_3__["CongregationService"])); };
MapsCollectionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MapsCollectionComponent, selectors: [["app-maps-collection"]], decls: 1, vars: 1, consts: [["class", "btn btn-light btn-sm", "style", "margin: 0.2rem", 3, "href", "target", 4, "ngFor", "ngForOf"], [1, "btn", "btn-light", "btn-sm", 2, "margin", "0.2rem", 3, "href", "target"], ["width", "100", 1, "img-thumbnail", 3, "src"]], template: function MapsCollectionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MapsCollectionComponent_a_0_Template, 4, 7, "a", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.congregation.territoryList);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXBzLWNvbGxlY3Rpb24uY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MapsCollectionComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-maps-collection',
                templateUrl: './maps-collection.component.html',
                styleUrls: ['./maps-collection.component.scss']
            }]
    }], function () { return [{ type: _services_congregation_service__WEBPACK_IMPORTED_MODULE_3__["CongregationService"] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_territories_overview_territories_overview_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/territories-overview/territories-overview.component */ "JWzQ");
/* harmony import */ var _components_maps_collection_maps_collection_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/maps-collection/maps-collection.component */ "u5Tr");
/* harmony import */ var _components_designer_designer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/designer/designer.component */ "NUr+");







const routes = [
    { path: 'home', component: _components_territories_overview_territories_overview_component__WEBPACK_IMPORTED_MODULE_2__["TerritoriesOverviewComponent"] },
    { path: 'maps', component: _components_maps_collection_maps_collection_component__WEBPACK_IMPORTED_MODULE_3__["MapsCollectionComponent"] },
    { path: 'designer', component: _components_designer_designer_component__WEBPACK_IMPORTED_MODULE_4__["DesignerComponent"] },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
