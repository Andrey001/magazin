genStore.controller('storeController', ['$scope', '$http','$location', function ($scope,$http,$location) {


    //// lista de produse
    //$scope.products = [
    //    {
    //        denumire: 'produs 1',
    //        amanunte: 'descriere produs 1',
    //        cumparat: false,
    //        editare: false
    //    }
    //];

    $scope.reincarcare = function() {
        $http({url: 'http://localhost:8080/api/prods/', method: 'GET'})
            .success(function (data) {
                $scope.products = data;
            });
    };

    $scope.reincarcare();

    //
    $scope.custom = true;

    $scope.toggleCustom = function () {
        $scope.custom = $scope.custom === false;
    };

    // adaugare produse
    $scope.addProducts = function (den, aman) {
        //    this.products.push(
        //        {denumire: den,
        //        amanunte: aman,
        //        editare: false}
        //    );
        //    this.denumire="";
        //    this.amanunte="";
        //};

        $http({url: 'http://localhost:8080/api/prods/', method: 'POST', data: {denumire: den, amanunte: aman, editare: false}})
            .success(function (data) {
                $scope.products=data;
                $scope.reincarcare();
            });

    };
    //$scope.checkProd = function(produs,check) {
    //    if(check === true) {
    //        $(".checky").css({"text-decoration": "line-through"});
    //    }
    //    else {
    //        $(".checky").css({"text-decoration": "none"});
    //    }
    //};

    // setare produs cumparat/necumparat
    $scope.buyProducts = function(prod) {
        var i = $scope.products.indexOf(prod);
        $scope.products[i].cumparat = !$scope.products[i].cumparat;
    };

    // setare produs editare
    $scope.editareShow = function (prod) {
        prod.editare = true;
    };

    // salvare editare
    $scope.salvareEditare = function (prod, denNew, amanNew) {
        //prod.editare = false;
        //prod.denumire = denNew;
        //prod.amanunte = amanNew;

        $http({url: 'http://localhost:8080/api/prods/' + prod._id, method: 'PUT', data: {denumire: denNew, amanunte: amanNew, editare: false}})
            .success(function (data) {
                $scope.products=data;
                $scope.reincarcare();
            });
    };

    // stergere produse cumparate
    $scope.delProducts = function () {
        for (var i=0; i < $scope.products.length; i++) {
            if ($scope.products[i].cumparat) {
                //this.products.splice(i, 1);
                //i--;
                $http({url: 'http://localhost:8080/api/prods/' + $scope.products[i]._id, method: 'DELETE'})
                    .success(function (data) {
                        $scope.products=data;
                        $scope.reincarcare();
                    });
            }
        }
    };

    //// tentativa de filtrare ...
    //$('#cautProdus').keyup(function() {
    //    var textCautat = $(this).val().toLowerCase();
    //    $('.listaProd>td').each(function() {
    //        var campCautare = $(this).text().toLowerCase();
    //        (campCautare.indexOf(textCautat) === 0) ? $(this).show() : $(this).hide();
    //    });
    //});
}]);