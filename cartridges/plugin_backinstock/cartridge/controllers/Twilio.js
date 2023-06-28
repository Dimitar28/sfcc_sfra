'use strict';

/**
 * @namespace Twilio
 */


var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

var productID = session.custom.productID;


/** 
 * Twilio-Show : The Twilio-Show endpoint will render the notifyForm isml template,
 * which is used for a subscription if the product is not currently in stock.
 * @name Base/Twilio-Show
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - consentTracking.consent
 * @param {renders} - isml
 * @param {category} - sensitive
 * @param {serverfunction} - get
*/
server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    consentTracking.consent,
    function (req, res, next) {
        var notifyModalForm = server.forms.getForm('notifyModal')
        notifyModalForm.clear();
        res.render('notificationForm/notifyForm', {
            notifyModalForm: notifyModalForm,
            productID: productID,
        })
        next();
    }
);
/**
 * Twilio-Subscribe : This endpoint is called when the notifyForm is submitted
 * @name Base/Twilio-Subscribe
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - csrf_token - a CSRF token
 * @param {category} - sensitive
 * @param {serverfunction} - post
 */
server.post(
    'Subscribe',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var Transaction = require('dw/system/Transaction');
        var notifyModalForm = server.forms.getForm('notifyModal');
        var URLUtils = require('dw/web/URLUtils');
        var NotifyMeBackInStock = 'NotifyMeBackInStock';

        // Form validation
        if (notifyModalForm.valid) {
            Transaction.wrap(function () {
                var notifyFormResult = CustomObjectMgr.getCustomObject(NotifyMeBackInStock, productID);

                if (!empty(notifyFormResult)) {
                    var phoneNumbers = notifyFormResult.custom.phoneNumbers;
                    var phoneNumber = notifyModalForm.phoneNumber.value;
                    const phoneNumbersArr = phoneNumbers.split(", ");
                    if (!phoneNumbersArr.includes(phoneNumber)) {
                        phoneNumbersArr.push(phoneNumber);
                        phoneNumbers = phoneNumbersArr.join(", ");
                        notifyFormResult.custom.phoneNumbers = phoneNumbers;

                        res.json({
                            success: false,
                        });
                    } else {
                        res.json({
                            // it gives an error if the user enters their phone more than once
                            success: false,
                        });
                    }

                } else {
                    notifyFormResult = CustomObjectMgr.createCustomObject(NotifyMeBackInStock, productID);
                    notifyFormResult.custom.phoneNumbers = notifyModalForm.phoneNumber.value;

                    res.json({
                        success: true,
                    });
                }
            });
        }
        return next();
    }
);

module.exports = server.exports();