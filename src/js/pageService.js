/**
 * Created by Administrator on 2017/5/25.
 */
app.service("pagechange", function () {
    return function ($scope) {
        // 数据;

        $scope.pageShow = function (i) {
            var olddata = $scope.pagedata();
            $scope.allPage = Math.ceil(olddata.length / $scope.len);// 多少页;

            $scope.pageArr = [];// 存放页数;
            // 渲染页数按钮;
            for (var j = 2; j < $scope.allPage; j++) {
                $scope.pageArr.push(j);// 数字;
            };

            $scope.num = ($scope.middlePage - 1) / 2;// 当前页前后页数;

            $scope.index = i - 1;// 下标;
            $scope.numpage = i;// 数字;

            // 点点点;
            $scope.ell1 = false;
            $scope.ell2 = false;
            $scope.lastpage=true;
            $scope.pagenum=true;
            if ($scope.index < ($scope.middlePage - $scope.num)) {
                $scope.ell1 = false;
                $scope.ell2 = true;

                $scope.showArr = [];

                for (var i = 1; i <= $scope.middlePage; i++) {
                    $scope.showArr.push(i)
                }

            } else if ($scope.index >= $scope.middlePage - $scope.num && $scope.index <= $scope.allPage - ($scope.middlePage - 1) / 2 - 2) {
                $scope.ell1 = true;
                $scope.ell2 = true;

                if ($scope.index == $scope.middlePage - $scope.num) {
                    $scope.ell1 = false;
                }
                if ($scope.index == $scope.allPage - ($scope.middlePage - 1) / 2 - 2) {
                    $scope.ell2 = false;
                }

                $scope.showArr = [$scope.index + 1];
                for (var i = 0; i < $scope.num; i++) {
                    $scope.showArr.push($scope.index - i)
                }
                for (var i = 2; i <= $scope.num + 1; i++) {
                    $scope.showArr.push($scope.index + i)
                }
            } else {
                $scope.ell1 = true;
                $scope.ell2 = false;
                $scope.showArr = [];

                for (var i = 1; i < $scope.middlePage; i++) {
                    $scope.showArr.push($scope.allPage - i)
                }
            };

            if ($scope.allPage <= ($scope.middlePage+1 )) {
                if($scope.allPage <2){
                   $scope.lastpage=false;
                    if($scope.allPage <1){
                        $scope.pagenum=false;
                    }
                }
                $scope.ell1 = false;
                $scope.ell2 = false;
            }

            $scope.cutData();

        };

        $scope.cutData = function () {
            var newdata = $scope.pagedata();
            $scope.cutdata = newdata.splice($scope.index * $scope.len, $scope.len);
            return newdata;
        }

        $scope.changedata = function (i) {
            $scope.pageShow(i);
            $scope.value=i;

        };

        // 上一页,下一页;
        $scope.updown = function (i) {
            if (i == "+") {
                if (($scope.index + 1) < $scope.allPage) {
                    $scope.pageShow($scope.index + 2)
                }
            } else {
                if ($scope.index > 0) {
                    $scope.pageShow($scope.index)
                }
            }
            $scope.value=$scope.index+1;
        };

        // 第几页;
        $scope.changeInput = function () {
            var val = $('.inp').val();
            $scope.pageShow(val)

        };

        $scope.pageShow(1);

    }
});