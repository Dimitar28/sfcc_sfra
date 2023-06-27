const Transaction = require('dw/system/Transaction');
const CustomObjectMgr = require('dw/object/CustomObjectMgr');
const notifyService = require('~/cartridge/scripts/services/notifyService');
var ProductMgr = require('dw/catalog/ProductMgr');

/**
 * @function
 * @description This function sends SMS to all customer that are subscribed to the notidication form when a given
 * products is back in-stock and deletes all custom objects from the BM.
 */
module.exports.execute = function () {
    var notificationObjects = CustomObjectMgr.getAllCustomObjects('NotifyMeBackInStock');
    try {
        var productID = "mitsubishi-wd-60C8M";
        var product = ProductMgr.getProduct(productID);
        while (notificationObjects.hasNext()) {
            var notificationObject = notificationObjects.next();
            var associatedProduct = ProductMgr.getProduct(notificationObject.custom.productId);
            // Check if the associated product is available
            if (associatedProduct.ID === productID && associatedProduct.availabilityModel.availability === 1) {
                const customerPhoneNumbers = notificationObject.custom.phoneNumbers.split(', ');
                customerPhoneNumbers.forEach((phoneNumber) => {
                    notifyService.notifyProductInStock().call({
                        To: phoneNumber,
                        Body: `${product.name} is back in stock!`,
                    }).isOk();
                })
                Transaction.wrap(function () {
                    CustomObjectMgr.remove(notificationObject);
                });
            }
        }
    } catch (err) {

    }
};
