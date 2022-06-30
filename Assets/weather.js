
    
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

                    $("#citytitle").addClass("bg-warning")
                    $("#dayweather").addClass("bg-warning")

                    var temp = response.current.temp;
                    console.log(temp);
                    var humidity = response.current.humidity;
                    var windspeed = response.current.wind_speed;
                    var uvindex = response.current.uvi;

                    var CityTitle = $("#citytitle");
                    var date = moment().format("MM/DD/YYYY");
                    CityTitle.text(cityname+" "+date);

                    var daytemperature = $("#daytemperature");
                    var dayhumidity = $("#dayhumidity");
                    var daywindspeed = $("#daywindspeed");
                    var dayuvindex = $("#dayuvindex");

                    daytemperature.text(" Temperature: "+temp);
                    dayhumidity.text(" Humidity: "+humidity);
                    daywindspeed.text(" Windspeed: "+windspeed);
                    dayuvindex.text(" UV Index: "+uvindex);



                    //var fdate = moment().add(1, "day").format("MM/DD/YYYY");
                    //var ftemp = response.daily[1].temp.day;
                    //var fwind = response.daily[1].wind_speed;
                    //var fhumid = response.daily[1].humidity;

                    //var f1date = $("#futuredate1");
                    //var f1temp = $("#futuretemp1");
                    //var f1wind = $("#futurewind1");
                    //var f1humid = $("#futurehumidity1");

                    //f1date.text(fdate);
                    //f1temp.text(ftemp);
                    //f1wind.text(fwind);
                    //f1humid.text(fhumid);


                    //var fdate = moment().add(2, "day").format("MM/DD/YYYY");
                    //var ftemp = response.daily[2].temp.day;
                    //var fwind = response.daily[2].wind_speed;
                    //var fhumid = response.daily[2].humidity;

                    //var f2date = $("#futuredate2");
                    //var f2temp = $("#futuretemp2");
                    //var f2wind = $("#futurewind2");
                    //var f2humid = $("#futurehumidity2");

                    //f2date.text(fdate);
                    //f2temp.text(ftemp);
                    //f2wind.text(fwind);
                    //f2humid.text(fhumid);

                    for (let i = 1; i < 6; i++) {
                        
                        var fdate = moment().add(i, "day").format("MM/DD/YYYY");
                        var ftemp = response.daily[i].temp.day;
                        var fwind = response.daily[i].wind_speed;
                        var fhumid = response.daily[i].humidity;

                        var f1date = $("#futuredate"+i);
                        var f1temp = $("#futuretemp"+i);
                        var f1wind = $("#futurewind"+i);
                        var f1humid = $("#futurehumidity"+i);

                        f1date.text(fdate);
                        f1temp.text("Temp: "+ftemp);
                        f1wind.text("Wind: "+fwind);
                        f1humid.text("Humidity: "+fhumid);
                        
                    }


                });



        })
}
    









