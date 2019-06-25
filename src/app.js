var self = this,
    $ctrl,
    app = new (function () {
        self.__routing = [];
        self.$ = function (text) {
            var result = document.querySelectorAll(text);
            if (result.length == 1) {
                return result[0];
            }
            return result;
        }

        self.modules = function (mod) {
            self.__routing = self.__routing.concat(mod);
        };

        self.start = function () {
            window.onhashchange = self.changeRoute;
            self.changeRoute();
        }
        self.changeRoute = function () {
            var route = document.location.hash.split('#');
            if (route.length > 1) {
                route = route[1];
            } else {
                route = '/'
            }
            var mod = self.__routing.find(function (item) { return item.link === route });
            if (mod) {
                $ctrl = new mod.ctrl();
                app.getFile({ method: 'GET', url: mod.html })
                    .then(function (result) {
                        app.$('app-routing').innerHTML =result.outerHTML;
                    }, console.log);
            } else {
                $ctrl = undefined;
                app.$('app-routing').innerHTML = '';
            }
        }

        self.getFile = function (opt) {
            return new Promise(function (resolve, reject) {
                var xmlhttp;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                }
                else {// code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onload = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        resolve(xmlhttp.responseXML.documentElement);
                    }
                    reject();
                }
                xmlhttp.onerror = function () {
                    reject();
                }

                xmlhttp.open(opt.method, opt.url, true);
                xmlhttp.responseType = "document";
                xmlhttp.send();
            });
        }
        return self;
    })();