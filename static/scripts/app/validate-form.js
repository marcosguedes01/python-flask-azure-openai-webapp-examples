function validateFormData(event, formDataName, fnCallback) {
    const form = document.getElementById(formDataName);

    if (form.checkValidity() === false) {
        event.stopPropagation();
    } else {
        if (fnCallback) fnCallback();
    }
    form.classList.add('was-validated');
}