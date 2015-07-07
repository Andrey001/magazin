genStore.controller('storeController', ['$scope', '$http','$location', function ($scope,$http,$location) {
    //$http({url: 'http://localhost:8080/api/produse/', method: 'GET'})
    //    .success(function (data) {
    //        $scope.products = data;
    //    });

    // lista de produse
    $scope.products = [
        {
            denumire: 'produs 1',
            amanunte: 'descriere produs 1',
            cumparat: false,
            editare: true
        }
    ];

    //
    $scope.custom = true;

    $scope.toggleCustom = function () {
        $scope.custom = $scope.custom === false;
    };

    // adaugare produse
    $scope.addProducts = function (den, aman) {
        this.products.push(
            {denumire: den,
            amanunte: aman,
            editare: true}
        );
        this.denumire="";
        this.amanunte="";
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
        prod.editare = false;
    };

    // salvare editare
    $scope.salvareEditare = function (prod, denNew, amanNew) {
        prod.editare = true;
        prod.denumire = denNew;
        prod.amanunte = amanNew;
    };

    // stergere produse cumparate
    $scope.delProducts = function () {
        for (var i=0; i < $scope.products.length; i++) {
            if ($scope.products[i].cumparat) {
                this.products.splice(i, 1);
                i--;
            }
        }
    };

    // tentativa de filtrare ...
    $('#cautProdus').keyup(function() {
        var textCautat = $(this).val().toLowerCase();
        $('.listaProd>td').each(function() {
            var campCautare = $(this).text().toLowerCase();
            (campCautare.indexOf(textCautat) === 0) ? $(this).show() : $(this).hide();
        });
    });
}]);