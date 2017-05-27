/**
 * Created by Administrator on 2017/5/26.
 */
app.directive("titleHeader", function () {
    return {
        restirct: "EMAC",
        replace: true,
        templateUrl: "page/header.html",
        controller: function ($scope, alldata) {
            $scope.data = alldata.fstdata;
        }
    }

});
// 删除指令;
app.directive("deldialog", function () {
    return {
        restirct: "EMAC",
        replace: true,
        templateUrl: "page/del.html"
    }

});

// 修改指令;
app.directive("alterdialog", function () {
    return {
        restirct: "EMAC",
        replace: true,
        templateUrl: "page/alter.html"
    }

});
// 修改指令;
app.directive("thiralter", function () {
    return {
        restirct: "EMAC",
        replace: true,
        templateUrl: "page/thiralter.html"
    }

});

//添加用户;
app.directive("adduser", function () {
    return {
        restirct: "EMAC",
        replace: true,
        templateUrl: "page/add.html"
    }

});

app.controller('myCtrl', function ($scope, alldata, pagechange) {

    $scope.type = ["ID", "登录名", "真实姓名", "角色", "手机", "邮箱", "状态", "创建时间", "操作"];

    $scope.roleType = ["ID", "角色", '状态', "序号", "创建时间", "操作"];
    $scope.arrlist = [
        {
            title: "功能配置",
            route: "function"
        },
        {
            title: "添加用户",
            route: "add"
        },
        {
            title: "用户管理",
            route: "user"
        }
    ]

    $scope.openlist = true;
    $scope.list = function () {
        if ($scope.openlist) {
            $scope.openlist = false;
        } else {
            $scope.openlist = true;
        }
    };

    $scope.alldata = alldata;

    $scope.fourdata = function () {
        return $scope.alldata.fourdata.map(function (i) {
            return i;
        });
    };

    $scope.thirdata = function () {
        return $scope.alldata.thirdata.map(function (i) {
            return i;
        });
    };

    $scope.value = 1;

});

app.config(function (alldata, $stateProvider, $urlRouterProvider) {
    alldata.fstdata.forEach(function (i) {
        $stateProvider
            .state(i.route, {
                url: "/" + i.route,
                templateUrl: "./page/aside.html",
                controller: function ($scope, $stateParams, alldata) {
                    var newdata = alldata.secdata.filter(function (i) {
                        return i.parentid == $stateParams.id.id;
                    });
                    $scope.data = newdata;
                    $scope.parentName = $stateParams.id.name;
                    $scope.showlist = true;
                    $scope.showFn = function () {
                        $scope.showlist = !$scope.showlist;
                    }
                },
                params: {
                    id: i
                }
            });
    });

    alldata.secdata.forEach(function (i) {
        $stateProvider
            .state(i.route, {
                url: i.routeUrl,
                templateUrl: "./page/" + i.enName + ".html",
                controller: function ($scope, $stateParams, alldata, $filter, pagechange) {
                    $scope.delSH = false;
                    $scope.alterSH = false;

                    $scope.logincolor = false;
                    $scope.namecolor = false;
                    $scope.telcolor = false;
                    $scope.emailcolor = false;

                    $scope.addlogincolor = false;
                    $scope.addnamecolor = false;
                    $scope.addtelcolor = false;
                    $scope.addemailcolor = false;

                    $scope.nameSH = false;
                    $scope.loginSH = false;
                    $scope.telSH = false;
                    $scope.emailSH = false;

                    var loginreg = /^[a-zA-Z]+$/;
                    var namereg = /^[\u4e00-\u9fa5]+$/;
                    var emailreg = /^([a-zA-Z0-9])+@([a-zA-Z])+(.[a-zA-Z])+/;
                    var telreg = /^1[3584]{1}[0-9]{9}$/;

                    switch (i.id) {
                        case 22:
                        {
                            fourCutDataFn();
                        }
                            break;
                        case 23:
                        {
                            thirCutDataFn();
                        }
                            break;
                    }
                    ;

                    function fourCutDataFn() {
                        $scope.data = alldata.fourdata;
                        $scope.datalen = $scope.data.length;
                        $scope.pagedata = function () {
                            return $filter("filter")($scope.data, {
                                role: $scope.roles,
                                state: $scope.states
                            });
                        };

                        $scope.middlePage = 5;
                        $scope.len = 1;
                        pagechange($scope, $scope.pagedata());
                        $scope.pageShow(1);
                        $scope.searchFn = function () {
                            $scope.pageShow(1);
                        };

                        $scope.delFn = function (item) {
                            $scope.delSH = true;
                            $scope.okFn = function () {
                                var indexPage;
                                $scope.pagedata().forEach(function (i, index) {
                                    switch (i.ID) {
                                        case item.ID:
                                        {
                                            indexPage = Math.ceil((index + 1) / $scope.len);
                                        }
                                    }

                                });
                                $scope.data.forEach(function (i, index) {
                                    switch (i.ID) {
                                        case item.ID:
                                        {
                                            $scope.data.splice(index, 1);
                                        }
                                    }
                                });
                                $scope.pageShow(indexPage);
                                $scope.delSH = false;
                            };
                            $scope.noFn = function () {
                                $scope.delSH = false;
                            };
                        };

                        $scope.alterFn = function (item) {
                            $scope.start = "启用";
                            $scope.stop = "禁用";
                            $scope.fourState = item.state;
                            $scope.alterSH = true;
                            $scope.alterData = {};
                            for (var i in item) {
                                $scope.alterData[i] = item[i];
                            }
                            $scope.okFn = function () {
                                $scope.alterSH = false;

                                $scope.data.forEach(function (i, index) {
                                    switch (i.ID) {
                                        case $scope.alterData.ID:
                                        {
                                            for (var j in $scope.alterData) {
                                                $scope.data[index][j] = $scope.alterData[j];
                                            }
                                            $scope.data[index].state = $scope.fourState;
                                        }
                                            break;
                                    }

                                })

                            };
                            $scope.noFn = function () {
                                $scope.alterSH = false;

                            };
                            $scope.changeStateFn = function (i) {
                                $scope.fourState = i;
                            };
                        };
                    };
                    function thirCutDataFn() {
                        $scope.data = alldata.thirdata;
                        $scope.datalen = $scope.data.length;

                        $scope.pagedata = function () {
                            return $filter("filter")($scope.data, {
                                role: $scope.troles,
                                state: $scope.tstates,
                                loginname: $scope.tlogin
                            });
                        };

                        $scope.middlePage = 5;
                        $scope.len = 1;

                        pagechange($scope);

                        $scope.pageShow(1);

                        $scope.searchFn = function () {
                            $scope.pageShow(1);
                        };

                        $scope.delFn = function (item) {
                            $scope.delSH = true;
                            $scope.okFn = function () {
                                var indexPage;
                                $scope.pagedata().forEach(function (i, index) {
                                    switch (i.ID) {
                                        case item.ID:
                                        {
                                            indexPage = Math.ceil((index + 1) / $scope.len);
                                        }
                                    }

                                });
                                $scope.data.forEach(function (i, index) {
                                    switch (i.ID) {
                                        case item.ID:
                                        {
                                            $scope.data.splice(index, 1);
                                        }
                                    }
                                });
                                $scope.pageShow(indexPage);
                                $scope.delSH = false;
                            };
                            $scope.noFn = function () {
                                $scope.delSH = false;
                            };
                        };

                        $scope.alterFn = function (item) {
                            $scope.start = "启用";
                            $scope.stop = "禁用";
                            $scope.fourState = item.state;
                            $scope.alterSH = true;
                            $scope.alterData = {};
                            for (var i in item) {
                                $scope.alterData[i] = item[i];
                            }
                            $scope.okFn = function () {
                                //

                                if (!loginreg.test($scope.alterData.loginname)) {
                                    $scope.logincolor = true;
                                } else {
                                    $scope.logincolor = false;
                                }
                                ;
                                if (!namereg.test($scope.alterData.name)) {
                                    $scope.namecolor = true;
                                } else {
                                    $scope.namecolor = false;
                                }
                                ;
                                if (!telreg.test($scope.alterData.telephone)) {
                                    $scope.telcolor = true;
                                } else {
                                    $scope.telcolor = false;
                                }
                                ;
                                if (!emailreg.test($scope.alterData.email)) {
                                    $scope.emailcolor = true;
                                } else {
                                    $scope.emailcolor = false;
                                }
                                ;
                                if (loginreg.test($scope.alterData.loginname) &&
                                    namereg.test($scope.alterData.name) &&
                                    telreg.test($scope.alterData.telephone) &&
                                    emailreg.test($scope.alterData.email)

                                ) {
                                    $scope.data.forEach(function (i, index) {
                                        switch (i.ID) {
                                            case $scope.alterData.ID:
                                            {
                                                for (var j in $scope.alterData) {
                                                    $scope.data[index][j] = $scope.alterData[j];
                                                }
                                                $scope.data[index].state = $scope.fourState;
                                            }
                                                break;
                                        }

                                    });
                                    $scope.alterSH = false;
                                }
                                ;


                            };
                            $scope.noFn = function () {
                                $scope.alterSH = false;

                            };
                            $scope.changeStateFn = function (i) {
                                $scope.fourState = i;
                            };
                        };
                        $scope.addstart = "启用";
                        $scope.addstop = "禁用";
                        $scope.addchangeStateFn = function (i) {
                            $scope.addfourState = i;
                        };
                        $scope.numlen=$scope.datalen;
                        var num = 9;
                        // 添加确定;
                        $scope.addokFn = function () {

                            if (!loginreg.test($scope.addData.loginname) || $scope.addData.loginname == '') {
                                $scope.addlogincolor = true;
                                $scope.loginnameSH = true;
                            } else {
                                $scope.addlogincolor = false;
                                $scope.loginnameSH = false;
                            }
                            ;
                            if (!namereg.test($scope.addData.name) || $scope.addData.name == '') {
                                $scope.addnamecolor = true;
                                $scope.nameSH = true;
                            } else {
                                $scope.addnamecolor = false;
                                $scope.nameSH = false;
                            }
                            ;
                            if (!telreg.test($scope.addData.telephone) || $scope.addData.telephone == '') {
                                $scope.addtelcolor = true;
                                $scope.telSH = true;
                            } else {
                                $scope.addtelcolor = false;
                                $scope.telSH = false;
                            }
                            ;
                            if (!emailreg.test($scope.addData.email) || $scope.addData.email == '') {
                                $scope.addemailcolor = true;
                                $scope.emailSH = true;
                            } else {
                                $scope.addemailcolor = false;
                                $scope.emailSH = false;
                            }
                            ;

                            if (loginreg.test($scope.addData.loginname) &&
                                namereg.test($scope.addData.name) &&
                                telreg.test($scope.addData.telephone) &&
                                emailreg.test($scope.addData.email)
                            ) {

                                ++$scope.numlen;
                                console.log($scope.numlen)
                                $scope.addData.parentid = 23;
                                $scope.addData.state = $scope.addfourState;
                                $scope.addData.ID = num++;
                                $scope.addData.creattime = new Date().toLocaleString();                            console.log($scope.addData.ID);
                                $scope.data.push($scope.addData);

                                $scope.pageShow(1);
                            }
                            ;

                        }

                        // 添加取消;
                        $scope.addnoFn = function () {
                            $scope.addData.name = '';
                            $scope.addData.loginname = '';
                            $scope.addData.telephone = '';
                            $scope.addData.addfourState = '';
                            $scope.addData.email = '';

                            $scope.addlogincolor = false;
                            $scope.addnamecolor = false;
                            $scope.addtelcolor = false;
                            $scope.addemailcolor = false;

                            $scope.nameSH = false;
                            $scope.loginSH = false;
                            $scope.telSH = false;
                            $scope.emailSH = false;
                        };

                    };


                },
                params: {
                    id: ""
                }
            });
    });

});