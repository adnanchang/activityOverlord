$(document).ready(function () {

    $('#signupForm').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                minlength: 5,
                required: true
            }
        },
        success: function (element) {
            element.text('OK').addClass('valid')
        }
    })
});