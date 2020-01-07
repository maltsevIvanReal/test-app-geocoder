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
            zoom: 10,
            controls: []
        }, {suppressMapOpenBlock: true});

    suggestView = new ymaps.SuggestView(
        'suggest',
        {
            offset: [-2, 3],
            width: 300,
            results: 3
        });


    $(".formMethod").on("submit", function (e) {

        var $suggest = $("#suggest");

        var suggestVal = $suggest.val().trim();

        if (suggestVal.replace(/\s/g,'') === '') {
            $('#suggest').val('');
            alert("Вы ввели пробелы в форму отправки. Пожалуйста, введите валидный адрес.");
            e.preventDefault();
            e.stopPropagation();
            return 0;

        } else {
            $.ajax({
                type: "POST",
                url: "/addAddress",
                data: {text: suggestVal},
                success:
                    function (msg) {
                        $('#suggest').val('');
                        // console.log( "Прибыли данные: " + msg );
                    }
            });
        }

        var address = document.getElementById("suggest").value;

        $(".box").append("<div class='divAdded'>" + address + "</div>");

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