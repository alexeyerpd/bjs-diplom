// Выход из личного кабинета
const loginBtn = new LogoutButton();
loginBtn.action = function logout() {
    ApiConnector.logout(({ success }) => {
        if (success) {
            location.reload();
        }
    });
};

// Получение информации о пользователе
function getProfile() {
    ApiConnector.current(({ success, data }) => {
        if (success) {
            ProfileWidget.showProfile(data);
        }
    });
}
getProfile();

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
function getRates() {
    ApiConnector.getStocks(({ success, data }) => {
        if (success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data);
        }
    });
}
getRates();
setInterval(getRates, 60 * 1000);

// Операции с деньгами
const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, ({ success, error, data }) => {
        if (success) {
            ProfileWidget.showProfile(data);
            this.setMessage(success, "Вы успешно пополнили баланс");
        } else {
            this.setMessage(success, error);
        }
    });
};

// Конвертирование валюты
moneyManager.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, ({ success, error, data }) => {
        if (success) {
            ProfileWidget.showProfile(data);
            this.setMessage(success, "Вы успешно переконвертировали валюту");
        } else {
            this.setMessage(success, error);
        }
    });
};

// Перевод валюты
moneyManager.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, ({ success, error, data }) => {
        if (success) {
            ProfileWidget.showProfile(data);
            this.setMessage(success, "Вы успешно перевели средства");
        } else {
            this.setMessage(success, error);
        }
    });
};

// Работа с избранным
const favorites = new FavoritesWidget();

// Получение начального списка избранного
function getFavorites() {
    ApiConnector.getFavorites(({ success, error, data }) => {
        if (success) {
            favorites.clearTable();
            favorites.fillTable(data);
            moneyManager.updateUsersList(data);
        } else {
            favorites.setMessage(success, error);
        }
    });
}
getFavorites();

// Добавления пользователя в список избранных
favorites.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, ({ success, error, data }) => {
        if (success) {
            this.clearTable();
            this.fillTable(data);
            moneyManager.updateUsersList(data);
            this.setMessage(
                success,
                "Вы успешно добавили пользователя в список избранного"
            );
        } else {
            this.setMessage(success, error);
        }
    });
};

// Удаление пользователя из избранного
favorites.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, ({ success, error, data }) => {
        if (success) {
            this.clearTable();
            this.fillTable(data);
            moneyManager.updateUsersList(data);
            this.setMessage(
                success,
                "Вы успешно удалили пользователя из списка избранного"
            );
        } else {
            this.setMessage(success, error);
        }
    });
};
