genStore.controller('storeController', ['$scope', '$http','$location', function ($scope,$http,$location) {

    $scope.msg = false;

    $scope.reincarcare = function() {
        $http({url: 'http://localhost:8080/api/prods/', method: 'GET'})
            .success(function (data) {
                $scope.products = data;
                $scope.msg = true;
                $scope.status = "S-au incarcat produsele";
            })
            .error(function (err) {
                console.log(err);
                $scope.msg = true;
                $scope.status = "Nu s-a putut incarca produsele!";
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

        $http({url: 'http://localhost:8080/api/prods/', method: 'POST', data: {denumire: den, amanunte: aman, cumparat: false, editare: false}})
            .success(function (data) {
                $scope.products=data;
                $scope.reincarcare();
                $scope.msg = true;
                $scope.mesaj = "S-a adaugat produsul!";
            })
            .error(function (err) {
                console.log(err);
                $scope.msg = true;
                $scope.mesaj = "Nu s-a putut adauga produsul!";
            });

    };

    // setare produs cumparat/necumparat
    $scope.buyProducts = function(prod) {
        $http({url: 'http://localhost:8080/api/prods/' + prod._id, method: 'PUT', data: {denumire: prod.denumire, amanunte: prod.amanunte, editare: prod.editare, cumparat: !prod.cumparat}})
            .success(function (data) {
                $scope.products=data;
                $scope.reincarcare();
                $scope.msg = true;
                $scope.mesaj = "S-a schimbat starea cumparat/necumparat";
            })
            .error(function (err) {
                console.log(err);
                $scope.msg = true;
                $scope.mesaj = "Nu s-a putut schimba starea!";
            });
    };

    // setare produs editare
    $scope.editareShow = function (prod) {
        $http({url: 'http://localhost:8080/api/prods/' + prod._id, method: 'PUT', data: {denumire: prod.denumire, amanunte: prod.amanunte, editare: true, cumparat: prod.cumparat}})
            .success(function (data) {
                $scope.products=data;
                $scope.reincarcare();
                $scope.msg = true;
                $scope.mesaj = "Produsul a devenit editabil";
            })
            .error(function (err) {
                console.log(err);
                $scope.msg = true;
                $scope.mesaj = "Produsul nu a putut deveni editabil!";
            });
    };

    // salvare editare
    $scope.salvareEditare = function (prod, denNew, amanNew) {

        $http({url: 'http://localhost:8080/api/prods/' + prod._id, method: 'PUT', data: {denumire: denNew, amanunte: amanNew, editare: false, cumparat: prod.cumparat}})
            .success(function (data) {
                $scope.products=data;
                $scope.reincarcare();
                $scope.msg = true;
                $scope.mesaj = "Produsul a fost actualizat";
            })
            .error(function (err) {
                console.log(err);
                $scope.msg = true;
                $scope.mesaj = "Produsul nu a putut fi actualizat!";
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
                        $scope.msg = true;
                        $scope.mesaj = "Produsele au fost sterse";
                    })
                    .error(function (err) {
                        console.log(err);
                        $scope.msg = true;
                        $scope.mesaj = "Produsele nu au putut fi sterse";
                    });
            }
        }
    };
}]);