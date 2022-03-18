const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        console.log(response);
        if (response.success === true) {
            location.reload();
        };
    });
};

let getProfile = () => {
    ApiConnector.current(responseProfile => {
        console.log(responseProfile);
        if (responseProfile.success === true) {
            ProfileWidget.showProfile(responseProfile.data);
        };
    });
}

getProfile();

const ratesBoard = new RatesBoard();
let getRates = () => {
    ApiConnector.getStocks(responseRates => {
        console.log(responseRates);
        if (responseRates.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responseRates.data);
            setInterval(() => {
                ratesBoard.clearTable();
                ratesBoard.fillTable(responseRates.data);
            }, 60000);
        };
    })
}

getRates();

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        console.log(response);
        if (response.success === true) {
            getProfile();
            moneyManager.setMessage(response.success, "Ваш счет успешно пополнен");
            location.reload();
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    }
    )
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        console.log(response);
        if (response.success === true) {
            getProfile();
            moneyManager.setMessage(response.success, "Валюта успешно конвертирована");
            location.reload();
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        console.log(response);
        if (response.success === true) {
            getProfile();
            moneyManager.setMessage(response.success, "Валюта успешно конвертирована");
            location.reload();
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    console.log(response);
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        console.log(response);
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен")
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        console.log(response);
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно удален")
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}
