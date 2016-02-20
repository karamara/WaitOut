  	waitOutModule.controller('mapController',['$interval','mapFactory', function($interval,mapFactory){
  		console.log("loading controller")
      this.result= {result : "grey"}
      this.newDirections = {
        start: "seattle",
        end: 'lynnwood',
        target: 10,
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
  		this.getDirection = function(){
  			console.log(_this.newDirections)
  			mapFactory.getDirection(_this.newDirections, function(data){
          _this.cDuration = mapFactory.cDuration;
          console.log("data from the factory", data)
          _this.result = data
  				console.log("from the controller", mapFactory.cDuration,data)
          if (data.result == true){
            console.log(data.result, data)
            _this.result.result = "green"
            alert("traffic went down!!!!!")
            console.log("greeen")
            _this.stopInterval();
          }
          else{
            _this.result.result = "red"
          }
  			})
  		}
      function test() {
        console.log('test')
      }
      var stop;
      this.setsLoop = function(){

        stop = $interval(this.getDirection,2000 ,2);
        stop = $interval(this.getDirection,10000,4);
        stop = $interval(this.getDirection,36000000);
      }
      this.stopInterval = function(){
        console.log("cancelling interval")
        if(angular.isDefined(stop)){
          $interval.cancel(stop)
        }
      }
      this.getPostition = function(data){
        console.log(data)
      }
  	}])