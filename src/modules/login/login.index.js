app.modules.login = function () {

    this.signIn = function () {
        var email = app.$('#email-login').value,
            password = app.$('#password-login').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(app.log, app.log);
    };
}