"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else if (response.error) {
            userForm.setLoginErrorMessage(response.error);
        }
    });
}

userForm.registerFormCallback = (data) => {
    console.log(data);
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else if (response.error) {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
}