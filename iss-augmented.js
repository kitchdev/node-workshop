 Number.prototype.toRadians = function() {
      return this * Math.PI / 180;
  }

  var prompt = require('prompt');
  var request = require('request');

  prompt.get("which city", function(err, userInput) {

      if (err) {
          console.log('An error has occured');
      } else {
          request('https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput['which city'], function(err, result) {
              if (err) {
                  console.log('An error has occured');
              } else {
                  var actualLocation = JSON.parse(result.body);
                  actualLocation = actualLocation.results[0].geometry['location']
                  var cityLat = actualLocation.lat;
                  var cityLong = actualLocation.lng;
                var latLon = cityLat, cityLong;

                  request('http://api.open-notify.org/iss-now.json', function(err, input) {
                      if (err) {
                          console.log(err);
                      } else {
                          var issLocation = JSON.parse(input.body);
                          var issLong = issLocation.longitude;
                          var issLat = issLocation.latitude;
    
                       var p1 = new LatLon(cityLat,cityLong);
                       var p2 = new LatLon(issLat, issLong);
                       var distance = p1.distanceTo(p2);
                       
                       console.log(distance);
                        
                         
                      }

                  })
              }
          })
      }
  })
  
 function LatLon(lat, lon) {
    // allow instantiation without 'new'
    if (!(this instanceof LatLon)) return new LatLon(lat, lon);

    this.lat = Number(lat);
    this.lon = Number(lon);
} 
  
LatLon.prototype.distanceTo = function(point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    var R = radius;
    var φ1 = this.lat.toRadians(),  λ1 = this.lon.toRadians();
    var φ2 = point.lat.toRadians(), λ2 = point.lon.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2)
          + Math.cos(φ1) * Math.cos(φ2)
          * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
};