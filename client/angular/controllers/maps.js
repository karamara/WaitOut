  	waitOutModule.controller('mapController',['$interval','mapFactory', function($interval,mapFactory){
  		console.log("loading controller")
      this.result= {result : "grey"}
      this.newDirections = {
        start: "bellevue, WA",
        end: 'lynnwood, WA',
        target: 35,
      }
  		var _this = this;
      this.current_location = function(){
        var location = ""
        mapFactory.getLocation(function(data){
          location += data.coords.latitude+","+data.coords.longitude
          console.log(location)
          _this.newDirections.start = location
        })
      }
      this.stop = function(){
        _this.stopInterval();
        _this.stop3 = undefined;
      }
  		this.getDirection = function(){
        mapFactory.increaseCounter();
  			console.log(_this.newDirections)
  			mapFactory.getDirection(_this.newDirections, function(data){
          _this.cDuration = mapFactory.cDuration;
          console.log("data from the factory", data)
          _this.result = data
  				console.log("from the controller", mapFactory.cDuration,data)
          if (data.result == true){
            console.log(data.result, data)
            _this.result.result = "green"
            alert("Estimated duration reached target time. Good to go")
            console.log("greeen")
            _this.stopInterval();
          }
          else{
            _this.result.result = "red"
          }
  			})
  		}
      var stop;
      this.setsLoop = function(){
        if (!this.stop3){
          stop = $interval(function(){
            console.log("every 2sec")
            _this.getDirection()},2000 ,2);
          stop2 = $interval(function(){
              console.log("every 10sec")
              _this.getDirection()},10000,4);
          this.stop3 = $interval(function(){
            _this.getDirection()},36000000);
        }

      };
      this.stopInterval = function(){
        if(angular.isDefined(stop)){
          console.log(
            "stop")
          $interval.cancel(stop)
          $interval.cancel(stop2)
          $interval.cancel(this.stop3)
          this.stop3 = false
        }
      }
      this.getPostition = function(data){
        console.log(data)
      }
      this.countersObject = {};
      this.showCounter = function(){
        mapFactory.showCounter(function(data){
          _this.countersObject = data;
        })
      }
  	}])