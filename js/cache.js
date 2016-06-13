var app= angular.module('starter.cache',['ionic'])

 

app.factory('RepService', function ($q, $http, $cacheFactory, $cordovaGeolocation) {

  // This cache will sync itself with localStorage if it exists, otherwise it won't. Every time the
  // browser loads this app, this cache will attempt to initialize itself with any data it had
  // already saved to localStorage (or sessionStorage if you used that).
  var myrepsCache = $cacheFactory('myrepsCache', {
    maxAge: 96 * 60 * 60 * 1000, // Items added to this cache expire after 4 days
    cacheFlushInterval: 48 * 60 * 60 * 1000, // This cache will clear itself every day.
    deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
    storageMode: 'localStorage' // This cache will use `localStorage`.
  });

 return{
         getDataById: function(){
      
       var start = new Date().getTime();
   

        // Now that control of inserting/removing from the cache is in our hands,
      // we can interact with the data in "dataCache" outside of this context,
      // e.g. Modify the data after it has been returned from the server and
      // save those modifications to the cache.

      

      
//getting and converting coordinates to actual address section
 var options = { maximumAge:0, enableHighAccuracy: true};
 


   $cordovaGeolocation.getCurrentPosition(options).then(function(position)
   {


    var lat   =  position.coords.latitude;
    var lng   = position.coords.longitude; 
    var latLng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable:false,
      enableHighAccuracy:true
    };
 

 var maps = new google.maps.Map(document.getElementById("map"), mapOptions);
 
    google.maps.event.addListener(maps, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: maps,
      animation: google.maps.Animation.DROP,
      position: latLng

  });      

    






     //console.log(lat,lng) + ":" 
              /*  + position.coords.latitude + ":" 
        + position.coords.longitude + ":" 
        + position.coords.accuracy)  
          $watch('selected', function () {
                
   window.setTimeout(function(){


                                                      
                    google.maps.event.trigger( $scope.map, 'resize', function(){

                        alert("I want to start")
                        $scope.map.setCenter($scope.map)

                        
              },1000);
                
      })

 }) */
    geocoder =  new google.maps.Geocoder();
     
   geocoder.geocode({ 'latLng': latLng }, function (results, status) 
    {
if (status === google.maps.GeocoderStatus.OK) 
{
   console.log(results)
    //dealing with the results returned by the geocoder
    if (results[0]) 
    {

      // $ionicLoading.show({
       //content: 'Loading',
    //animation: 'fade-in',
    //showBackdrop: true,
    //maxWidth: 200,
    //showDelay: 0
      //});
    
      //console.log(results);

         addr= results[0].formatted_address;



        var infoWindow = new google.maps.InfoWindow({
      content:addr
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

   

            
              
       
        
         var start = new Date().getTime();

       address = JSON.stringify(results[0].address_components);
             
        //console.log($scope.address)

           var link = 'LGA_finder/getlga_info.php?address='+ address
 
        $http.get(link, {address:address}).success(function (results,status)
     {
    
       var dataCache = $cacheFactory('repCache');

      console.log(results)
       console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
       dataCache.put(1,results);
       console.log(dataCache)
       
     })//http.get results  




} //end of result[0]

  else {
        console.log('Location present status is:' + status);
        firstExecution = false;
    }//error handle1

 
    
   



};//end of geocoder
});//end of scope.geocoder

})// google events listner




});







}// getdatabyid function

};// end of the return

});