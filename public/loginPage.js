'use strict';

const form = new UserForm();

form.loginFormCallback = function loginFormCallback(data) {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(response.error);
        }
    });
}

form.registerFormCallback = function registerFormCallback(data) {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(response.error);
        }
    });
}
