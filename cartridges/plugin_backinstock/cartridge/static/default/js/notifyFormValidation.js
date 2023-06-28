/**
 * @function
 * @description This function is used to submit the form to  a controller on the back-end(Twilio-Subscribe)
 * and also display/remove different notification messages for sucess and fail
 */
$(document).ready(function () {
    $('.edit-notification-form').submit(function (e) {
        var form = $(this);
        e.preventDefault();
        var url = form.attr("action");

        var successMessage = form.prevAll(
            ".js-subscribe-success-message"
        );
        var errorMessage = form.prevAll(
            ".js-subscribe-error-message"
        );

        form.spinner().start();

        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: form.serialize(),
            success: function (data) {
                form.spinner().stop();

                if (!data.success) {
                    successMessage.addClass("d-none");
                    errorMessage.html(data.message);
                    errorMessage.removeClass("d-none");
                } else {
                    errorMessage.addClass("d-none");
                    successMessage.html(data.message);
                    successMessage.removeClass("d-none");

                }
            },
            error: function (err) {
                form.spinner().stop();

                successMessage.addClass("d-none");
                errorMessage.html(err.message);
                errorMessage.removeClass("d-none");
            },
        });

        return false;
    });
})
