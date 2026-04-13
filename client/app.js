function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // invalid Value
}


function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    var sqft = $("#uiSqft").val();
    var bhk = $("input[name='uiBHK']:checked").val();
    var bath = $("input[name='uiBathrooms']:checked").val();
    var location = $("#uiLocations").val();

    var url = "/predict_home_price";

    // show loader
    $("#loader").show();
    $("#priceText").hide();
    $("#uiEstimatedPrice").removeClass("show");

    $.post(url, {
        total_sqft: sqft,
        bhk: bhk,
        bath: bath,
        location: location
    }, function (data, status) {

        // hide loader
        $("#loader").hide();

        // format price in ₹
        var price = data.estimated_price;
        var formattedPrice = "₹ " + price.toLocaleString("en-IN") + " Lakh";

        // show result with animation
        $("#priceText").text(formattedPrice).show();
        $("#uiEstimatedPrice").addClass("show");

        console.log("Response:", data);
    });
}




function onPageLoad() {
    console.log("document loaded");

    var url = "/get_location_names";

    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");

        if (data) {
            var locations = data.locations;
            var uilocations = document.getElementById("uiLocations");

            $('#uiLocations').empty();

            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;