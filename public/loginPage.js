"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = (data) => { 
    console.log(data);
    ApiConnector.login(data, response => {
        console.log(response);
        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
}

userForm.registerFormCallback = (data) => { 
    console.log(data);
    ApiConnector.register(data, response => {
        console.log(response);
        if (response.error) {
            userForm.setRegisterErrorMessage(response.error);
        } else if (response.success) {
            location.reload();
        }
    });
}