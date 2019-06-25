app.modules({
    ctrl: function () {
        this.signIn = function () {
            var email = app.$('#email-login').value,
                password = app.$('#password-login').value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(console.log, console.log);
        };

        this.onSubmit = function (e) {
            e.preventDefault();
            this.signIn();
        } 

        return this;
    },
    bind: 'login-page',
    html: 'modules/login/login.index.html',
    link: '/login'
});