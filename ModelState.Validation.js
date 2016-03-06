(function ($) {

    $.fn.validateForm = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            data: "",
            errorElement: ".validation-summary-valid ul",
            errorClass: "error",
            errorFadeInTime: 0,
            onSuccess: function () { },
            onFail: function () { },
            onFieldValidate: function (model) { }
        }, options);

        return this.each(function () {

            var $form = $(this);

            var $errorMessages = $("<ul></ul>");

            var success = true;

            var $errorElement = $(settings.errorElement);

            $errorElement.empty();

            if (settings.data.ModelState) {

                $.each(settings.data.ModelState, function (k, model) {

                    var $field = $form.find("[name='" + k + "']");

                    settings.onFieldValidate.call(this, { key: k, value: model, field: $field });

                    $field.parent("div").removeClass("error");

                    if (model.length > 0) {

                        $field.parent("div").addClass("error");

                        $.each(model, function (l, modelError) {
                            $errorMessages.append("<li>" + model[l] + "</li>");
                            success = false;
                        });
                    }
                });
            }

            if (settings.data.Errors) {

                $.each(settings.data.Errors, function (k, model) {
                    $errorMessages.append("<li>" + model + "</li>");
                    success = false;
                });
            }

            if (!success) {
                $errorElement.replaceWith($errorMessages).fadeIn(300);
            }

            settings.success = success;

            if (settings.success) {
                settings.onSuccess.call();
            } else {
                settings.onFail.call();
            }


        });

    };

}(jQuery));
