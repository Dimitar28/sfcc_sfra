'use strict';

/**
 * 
 * @param {dw.customer.Customer} customer 
 * @returns {String}
 */
function getCustomerId(customer) {
    return customer.getID();
}
function getCustomerEmail(customer) {
    return customer.profile.getEmail();
}
function getCustomerName(customer) {
    return customer.profile.getFirstName();
}
/**
 * 
 * @constructor
 * @param {*} customer 
 */
function DWScriptModel(customer) {
    this.ID = getCustomerId(customer)
    this.email = getCustomerEmail(customer)
    this.firstName = getCustomerName(customer)
}
module.exports = DWScriptModel;