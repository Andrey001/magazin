/**
 * Created by Florin.Alexandru on 7/7/2015.
 */
genStore.filter('numeFiltru', function(){

    return function(data, caut) {
        var filtered = [];
        if(caut==null) return data;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (angular.equals(caut,item.denumire.substring(0, caut.length))) {
                filtered.push(item);
            }
        }
        return filtered;
    };

});