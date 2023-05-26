function showSuccessMessage(containerClassName) {
    let messageClosed = false;
    $(`.${containerClassName} .alert.alert-success`).removeClass('d-none');
    setTimeout(() => {
        $('.alert.alert-success').addClass('show');
    }, 100);

    $(`.${containerClassName} .alert.alert-success .close`).one( "click", function() {
        $('.alert.alert-success').removeClass('show');
        messageClosed = true;

        setTimeout(() => {
            $('.alert.alert-success').addClass('d-none')
        }, 100);
    });

    setTimeout(() => {
        if (messageClosed) return;

        $(`.${containerClassName} .alert.alert-success`).removeClass('show');
        setTimeout(() => {
            $(`.${containerClassName} .alert.alert-success`).addClass('d-none')
        }, 100);
    }, 3000);
}

function showErrorMessage(containerClassName, errorMessage, autoClose = true) {
    let messageClosed = false;

    $(`.${containerClassName} .alert.alert-danger .errorMessage`).text(errorMessage);
    
    $(`.${containerClassName} .alert.alert-danger`).removeClass('d-none');
    
    setTimeout(() => {
        $('.alert.alert-danger').addClass('show');
    }, 100);

    $(`.${containerClassName} .alert.alert-danger .close`).one( "click", function() {
        $('.alert.alert-danger').removeClass('show');
        messageClosed = true;

        setTimeout(() => {
            $('.alert.alert-danger').addClass('d-none')
        }, 100);
    });

    if (autoClose)
        setTimeout(() => {
            if (messageClosed) return;

            $(`.${containerClassName} .alert.alert-danger`).removeClass('show');
            setTimeout(() => {
                $(`.${containerClassName} .alert.alert-danger`).addClass('d-none')
            }, 100);
        }, 3000);
}