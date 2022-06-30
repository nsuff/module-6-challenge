
    
///function apicall() {
///    fetch('https://api.openweathermap.org/data/2.5/weather?q=london&APPID=ede08bcde83c2fa795daf3201714e151')
///    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&exclude=minutely,hourly,alerts&units=imperial&appid=ede08bcde83c2fa795daf3201714e151')
///    .then(response => response.json())
///    .then(data => console.log(data));
///
///
///
///}

///apicall();
var cityname;

$("#searchform").on('submit', function(e) {

    //not sure why this works but this guy says it does: https://stackoverflow.com/questions/22742194/form-validation-text-error-text-disappears  
    e.preventDefault();

    var city = $("#searchedcity").val();
    console.log(city);

    if (city === "" || city === null) {
    } else {
        city = city.toLowerCase();
        console.log(city);
        dayforecast(city);
        //futureforecast(city);
    }

})

function dayforecast(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=ede08bcde83c2fa795daf3201714e151')
        .then(response => response.json())
        .then(function(response) {
            var lon = response.coord.lon;
            var lat = response.coord.lat;
            cityname = response.name;
            console.log(lon);
            console.log(lat);

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly,alerts&units=imperial&appid=ede08bcde83c2fa795daf3201714e151')
                .then(response => response.json())
                .then(function(response) {

                    var temp = response.current.temp;
                    console.log(temp);
                    var humidity = response.current.humidity;
                    var windspeed = response.current.wind_speed;
                    var uvindex = response.current.uvi;

                    var CityTitle = $("#citytitle");
                    var date = moment().format("M/D/YYYY");
                    CityTitle.text(cityname+" "+date);

                    var daytemperature = $("#daytemperature");
                    var dayhumidity = $("#dayhumidity");
                    var daywindspeed = $("#daywindspeed");
                    var dayuvindex = $("#dayuvindex");

                    daytemperature.text(temp+" and");
                    dayhumidity.text(humidity+" ");
                    daywindspeed.text(windspeed+" ");
                    dayuvindex.text(uvindex);



                });



        })
}
    









