const File = require('dw/io/File');
const FileWriter = require('dw/io/FileWriter');
const CSVStreamWriter = require('dw/io/CSVStreamWriter');
const Transaction = require('dw/system/Transaction');
const CustomObjectMgr = require('dw/object/CustomObjectMgr');

module.exports.execute = function () {
    var newsletterObjects = CustomObjectMgr.getAllCustomObjects('NEWSLETTER_SUBSCRIPTION');

    var file = new File(File.IMPEX + '/newsletter.csv');
    var fileWriter = new FileWriter(file);
    var CVSWriter = new CSVStreamWriter(fileWriter);
    CVSWriter.writeNext(['FirstName', 'Lastname', 'Email', 'Gender']);
    try {
        while (newsletterObjects.hasNext()) {
            var newsletterObject = newsletterObjects.next();
            CVSWriter.writeNext([
                newsletterObject.custom.name,
                newsletterObject.custom.lastname,
                newsletterObject.custom.email,
                newsletterObject.custom.gender
            ]);

            Transaction.wrap(function () {
                CustomObjectMgr.remove(newsletterObject);
            });
        }
    } finally {
        csvWriter.close();
        fileWriter.close();
    }
}