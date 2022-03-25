const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        };
    });
};

let getProfile = () => {
    ApiConnector.current(responseProfile => {
        if (responseProfile.success) {
            ProfileWidget.showProfile(responseProfile.data);
        };
    });
}

getProfile();

const ratesBoard = new RatesBoard();
let getRates = () => {
    ApiConnector.getStocks(responseRates => {
        if (responseRates.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responseRates.data);
        };
    })
}

getRates();

setInterval(() => {
    getRates();
}, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
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
        if (response.success) {
            moneyManager.setMessage(response.success, "Валюта успешно конвертирована");
            location.reload();
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
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
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
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
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь успешно удален")
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}
