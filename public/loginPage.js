"use strict";

const form = new UserForm();

// Логин
form.loginFormCallback = function loginFormCallback(data) {
    ApiConnector.login(data, ({ success, error }) => {
        if (success) {
            location.reload();
        } else {
            this.setLoginErrorMessage(error);
        }
    });
};

// Регистрация
form.registerFormCallback = function registerFormCallback(data) {
    ApiConnector.register(data, ({ success, error }) => {
        if (success) {
            location.reload();
        } else {
            this.setRegisterErrorMessage(error);
        }
    });
};
