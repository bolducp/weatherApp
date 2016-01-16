"use strict";

$(document).ready(init);

var zipcode, cityState, feelsLike, weather, humidity, dateTime, currentIcon;


function init(){
  getLocalWeather();
  $("#weatherSearch").click(getForecastDetails);
}


function getLocalWeather(callback){
  $.ajax({
    url: "http://api.wunderground.com/api/d8483e016960a875/geolookup/q/autoip.json",
    type: "GET",
    success: function(data){
      insertZipcode(data);
      getForecastDetails(data);
    },
    error: function(err){
      alert(err);
    }
  })

}

function insertZipcode(data){
  zipcode = data.location.zip;
  $("#location").val(zipcode);
}


function getForecastDetails(data){
  zipcode = $("#location").val();
  $.ajax({
    url: "http://api.wunderground.com/api/d8483e016960a875/conditions/q/" + zipcode + ".json",
    //url: "http://api.wunderground.com/api/d8483e016960a875/hourly10day/q/CA/San_Francisco.json",
    type: "GET",
    success: function(data){
      parseWeatherData(data);
    },
    error: function(err){
      alert(err);
    }
  })

  $.ajax({
    url: "http://api.wunderground.com/api/d8483e016960a875/forecast/q/" + zipcode + ".json",
    //url: "http://api.wunderground.com/api/d8483e016960a875/hourly10day/q/CA/San_Francisco.json",
    type: "GET",
    success: function(data){
      parseForecastData(data);
    },
    error: function(err){
      alert(err);
    }
  })
}

function parseForecastData(data){
  oneDayForecast(data, 1);
  oneDayForecast(data, 2);
  oneDayForecast(data, 3);
  // console.log("HEEYYYYdata!!!", data);
  // dateTime = moment(data.current_observation.local_time_rfc822).format('MMMM Do YYYY,   h:mma');
  // cityState = data.current_observation.display_location.full;
  // feelsLike = data.current_observation.feelslike_string;
  // weather = data.current_observation.weather;
  // currentIcon = data.current_observation.icon_url;
  // humidity = data.current_observation.relative_humidity;
  //
  // $('#currentWeather h2').text("Current Weather in " + cityState);
  // $('h3').text(dateTime);
  // $('#weather p').text(weather);
  // $('img').attr('src', currentIcon);
  // $('#temp').text(feelsLike);
  // $("#humidity").text(humidity);
}

function oneDayForecast(data, day){
  var dayOfWeek = data.forecast.simpleforecast.forecastday[day].date.weekday;
  var weather = data.forecast.simpleforecast.forecastday[day].conditions;
  var highF = data.forecast.simpleforecast.forecastday[day].high.fahrenheit;
  var highC = data.forecast.simpleforecast.forecastday[day].high.celsius;
  var lowF = data.forecast.simpleforecast.forecastday[day].low.fahrenheit;
  var lowC = data.forecast.simpleforecast.forecastday[day].low.celsius;
  var icon = data.forecast.simpleforecast.forecastday[day].icon_url;

  $("#day" + day).prepend($("<p>").text(weather));
  $("#day" + day).prepend($("<p>").text(dayOfWeek).addClass("dayOfWeek"));
  var $day = $("#day" + day);
  $('#day' + day + ' img').attr("src", icon);

  var $high = $("<p>").text("High: " + highF + "F/ " + highC +"C").addClass("temps");
  var $low = $("<p>").text("Low: " + lowF + "F/ " + lowC + "C").addClass("temps");
  $("#day" + day).append($high);
  $("#day" + day).append($low);





}







function parseWeatherData(data){
  console.log("data!!!", data);
  dateTime = moment(data.current_observation.local_time_rfc822).format('MMMM Do YYYY,   h:mma');
  cityState = data.current_observation.display_location.full;
  feelsLike = data.current_observation.feelslike_string;
  weather = data.current_observation.weather;
  currentIcon = data.current_observation.icon_url;
  humidity = data.current_observation.relative_humidity;

  $('#currentWeather h2').text("Current Weather in " + cityState);
  $('h3').text(dateTime);
  $('#weather p').text(weather);
  $('#weather img').attr('src', currentIcon);
  $('#temp').text(feelsLike);
  $("#humidity").text(humidity);
}













//
// $.ajax({
//   url: "http://api.wunderground.com/api/d8483e016960a875/conditions/q/CA/San_Francisco.json",
//   type: "GET",
//   success: function(data){
//     parseResults(data);
//   },
//   error: function(err){
//     alert(err);
//   }
// })
//   function parseResults(data){
//     console.log(data);
//     // var $weather = $('<div>').text();
//     // $("#weather").append($poke);
//     }
//
// }





///http://api.wunderground.com/api/d8483e016960a875/
