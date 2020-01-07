var myMap;
var suggestView;
var placeMark;

$(document).ready(function () {
    $(document).on("click", ".divAdded", function () {

        $("#suggest").val($(this).html());

    })
});

ymaps.ready(init);

function init() {
    myMap = new ymaps.Map(
        'map', {
            center: [55.030199, 82.920430],
            zoom: 10
        }, {});

    suggestView = new ymaps.SuggestView(
        'suggest',
        {
            offset: [-2, 3],
            width: 300,
            results: 5
        });

    $(".formMethod").on("submit", function (e) {

        $.ajax({
            type: "POST",
            url: "/addAddress",
            data: {text: $("#suggest").val()},
            success: function (msg) {
                // alert( "Прибыли данные: " + msg );
            }
        });

        var address = document.getElementById("suggest").value;

        $(".box").append("<div style='cursor: pointer; border: 1px solid black; margin: 7px 0 7px 0' class='divAdded'>" + address + "</div>");

        var geocoder = ymaps.geocode(address);

        ymaps.geocode(address).then(function (res) {
            myMap.setBounds(res.geoObjects.get(0).properties.get('boundedBy'));
        });


        geocoder.then(
            function (res) {
                myMap.geoObjects.removeAll();
                var coordinates = res.geoObjects.get(0).geometry.getCoordinates();

                placeMark = new ymaps.Placemark(
                    coordinates, {
                        preset: "islands#yellowStretchyIcon"
                    });

                myMap.geoObjects.add(placeMark);

            });

        e.preventDefault();
        e.stopPropagation();
    });
}