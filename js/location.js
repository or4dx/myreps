angular.module('starter.location', ['ionic'])


.controller('LctnCtrl',function($scope, $ionicTabsDelegate,$http,$state,$cordovaGeolocation,$ionicLoading,$cacheFactory)
{




//tab swipe section 
$scope.goForward = function () {
var selected = $ionicTabsDelegate.selectedIndex();
if (selected != -1) {
$ionicTabsDelegate.select(selected + 1);
   }
 }

 $scope.goBack = function () {
var selected = $ionicTabsDelegate.selectedIndex();
if (selected != -1 && selected != 0) {
 $ionicTabsDelegate.select(selected - 1);
}
}

//getting information for the menu tab 
$http.get('js/menu_info.json').success(function(results)
{
     $scope.states = results.states;
     $scope.statename = $state.params.aId;
     $scope.ministry = results.ministry;
     $scope.minname =$state.params.Id;
      $scope.lga = results.lga;
    

}); //menu data


/*
CheckGPS.check(function win(){
    //GPS is enabled! 
 
  },
  function fail(){
    //GPS is disabled! 
 alert("Location is turned off. Turn it on and pull down to refresh")
  });
*/








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
 

 $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
    google.maps.event.addListener($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng

  });      







     //console.log(lat,lng) + ":" 
              /*  + position.coords.latitude + ":" 
        + position.coords.longitude + ":" 
        + position.coords.accuracy) */
    $scope.geocoder =  new google.maps.Geocoder();
     
    $scope.geocoder.geocode({ 'latLng': latLng }, function (results, status) 
    {
if (status === google.maps.GeocoderStatus.OK) 
{
   console.log(results)
    //dealing with the results returned by the geocoder
    if (results[0]) 
    {

       $ionicLoading.show({
       content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
      });
    
      //console.log(results);

         $scope.addr= results[0].formatted_address;



        var infoWindow = new google.maps.InfoWindow({
      content:$scope.addr
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

   

            
              
            $scope.$watch('selected', function () {
                
   window.setTimeout(function(){


                                                      
                    google.maps.event.trigger( $scope.map, 'resize', function(){

                       
                        $scope.map.setCenter($scope.map)

                        
              },1000);
                
          });

   });
       
        
         var start = new Date().getTime();

       $scope.address = JSON.stringify(results[0].address_components);
             
        //console.log($scope.address)

           var link = 'LGA_finder/getlga_info.php?address='+ $scope.address
 
        $http.get(link, {address: $scope.address}).success(function (results,status)
     {
    

    console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');

    

    $scope.results = results;
    
    console.log($scope.results);      
       /*   var arr=[]

    for(var prop in results)
    {

      arr.push(results[prop]);
    }//arr array for results

    console.log(arr);*/





            

 

          $scope.lga_name = results[0].name;
          $scope.lga_chair = results[0].lga_chair;
         $scope.lga_vice = results[0].lga_vice;
         $scope.lga_state = results[0].lga_state;
          $scope.lga_addr = results[0].lga_address;
         $scope.lga_senator = results[0].lga_senator;
          $scope.president = results[0].president;
         $scope.vice_pres = results[0].vice_president;
         $scope.ministry1 = results[0].ministry[0][0];
         $scope.ministry2 =results[0].ministry[1][0];
         $scope.ministry3 = results[0].ministry[2][0];
         $scope.ministry4 = results[0].ministry[3][0];
         $scope.ministry5 = results[0].ministry[4][0];
         $scope.ministry6 = results[0].ministry[5][0];
         $scope.ministry7 = results[0].ministry[6][0];
         $scope.ministry8 = results[0].ministry[7][0];
         $scope.ministry9 = results[0].ministry[8][0];
         $scope.ministry10 = results[0].ministry[9][0];
         $scope.ministry11 = results[0].ministry[10][0];
         $scope.ministry12 = results[0].ministry[11][0];
         $scope.ministry13 = results[0].ministry[12][0];
         $scope.ministry14 = results[0].ministry[13][0];
         $scope.ministry15 = results[0].ministry[14][0];
         $scope.ministry16 = results[0].ministry[15][0];
         $scope.ministry17 = results[0].ministry[16][0];
         $scope.ministry18 = results[0].ministry[17][0];
         $scope.ministry19 = results[0].ministry[18][0];
         $scope.ministry20 = results[0].ministry[19][0];
         $scope.ministry21 = results[0].ministry[20][0];
         $scope.ministry22 = results[0].ministry[21][0];
         $scope.ministry23 = results[0].ministry[22][0];
         $scope.ministry24 = results[0].ministry[23][0];
      
       //ministry end



         $scope.commiss1 = results[0].commissioners[0][0];
       $scope.commiss2 = results[0].commissioners[1][0];
         $scope.commiss3 = results[0].commissioners[2][0];
         $scope.commiss4 = results[0].commissioners[3][0];
         $scope.commiss5 = results[0].commissioners[4][0];
         $scope.commiss6 = results[0].commissioners[5][0];
         $scope.commiss7 = results[0].commissioners[6][0];
         $scope.commiss8 = results[0].commissioners[7][0];
         $scope.commiss9 = results[0].commissioners[8][0];
         $scope.commiss10 = results[0].commissioners[9][0];
         $scope.commiss11 = results[0].commissioners[10][0];
         $scope.commiss12 = results[0].commissioners[11][0];
         $scope.commiss13 = results[0].commissioners[12][0];
         $scope.commiss14 = results[0].commissioners[13][0];
         $scope.commiss15 = results[0].commissioners[14][0];
         $scope.commiss16 = results[0].commissioners[15][0];
         $scope.commiss17 = results[0].commissioners[16][0];
         $scope.commiss18 = results[0].commissioners[17][0];
         $scope.commiss19 = results[0].commissioners[18][0];
         $scope.commiss20 = results[0].commissioners[19][0];
         $scope.commiss21 = results[0].commissioners[20][0];
         $scope.commiss22 = results[0].commissioners[21][0];
         $scope.commiss23 = results[0].commissioners[22][0];
         $scope.commiss24 = results[0].commissioners[23][0];
         


$ionicLoading.hide();
   $scope.keys = [];
$scope.cache = $cacheFactory('myrepinfo')
$scope.put = function (key,value) {

$scope.cache.put(key,value);
$scope.keys.push(key);
};




$scope.caches = $scope.put("repcache", results)
$scope.cacheget = $scope.cache.get("repcache", results)

console.log($scope.cache.info())

console.log($scope.cache.get)


     
        // console.log($scope.lga_chair);
      
        // $ionicLoading.hide();
     })//http.get results  




} //end of result[0]

  else {
        console.log('Location present status is:' + status);
        $scope.firstExecution = false;
    }//error handle1

 
    
   



};//end of geocoder
});//end of scope.geocoder

})// google events listner




});





$scope.doRefresh = function()
{



if (window.cordova) {
    cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {

      console.log(enabled)
      if (enabled==false)
      {
           alert("Location is turned off. Turn it on and pull down to refresh")
      }else 

      if(enabled==true)

      {



      }
   

    }, function(error) {
        alert("The following error occurred: " + error);
    });
}


console.log("refresh beginning")


 var options = {timeout: 1000, maximumAge:0, enableHighAccuracy: true};
 


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
 

 $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng

  });      






     //console.log(lat,lng) + ":" 
              /*  + position.coords.latitude + ":" 
        + position.coords.longitude + ":" 
        + position.coords.accuracy) */
    $scope.geocoder =  new google.maps.Geocoder();
     
    $scope.geocoder.geocode({ 'latLng': latLng }, function (results, status) 
    {
if (status === google.maps.GeocoderStatus.OK) 
{
   console.log(results)
    //dealing with the results returned by the geocoder
    if (results[0]) 
    {
   
    
      //console.log(results);

      $scope.addr= results[0].formatted_address;



        var infoWindow = new google.maps.InfoWindow({
      content:$scope.addr
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
       $scope.address = JSON.stringify(results[0].address_components);
             
        //console.log($scope.address)

           var link = 'http://myreps.tk/LGA_finder/getlga_info.php?address='+ $scope.address
 
        $http.get(link, {address: $scope.address}).success(function (results,status)
     {
    

    console.log(results);
          
       /*   var arr=[]

    for(var prop in results)
    {

      arr.push(results[prop]);
    }//arr array for results

    console.log(arr);*/

  $ionicLoading.show({
       content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
      }); 


             

 

          $scope.lga_name = results[0].name;
          $scope.lga_chair = results[0].lga_chair;
         $scope.lga_vice = results[0].lga_vice;
         $scope.lga_state = results[0].lga_state;
          $scope.lga_addr = results[0].lga_address;
         $scope.lga_senator = results[0].lga_senator;
        




     
        // console.log($scope.lga_chair);
      
      $ionicLoading.hide();   
     })//http.get results  




} //end of result[0]

  else {
        console.log('Location present status is:' + status);
        $scope.firstExecution = false;
    }//error handle1
    
   



};//end of geocoder
});//end of scope.geocoder

})// google events listner




});
   console.log('And we are out');
$scope.$broadcast('scroll.refreshComplete');



         
     };//doRfresh 





//pulling down to refresh code portion
$scope.doRefresh_hor = function()
{


console.log("refresh beginning")




//getting and converting coordinates to actual address section
 var options = {timeout: 1000, maximumAge:0, enableHighAccuracy: true};
 
   $cordovaGeolocation.getCurrentPosition(options).then(function(position)
   {


    var lat   =  position.coords.latitude;
    var lng   = position.coords.longitude; 
    var latLng = new google.maps.LatLng(lat, lng);

   

     //console.log(lat,lng) + ":" 
              /*  + position.coords.latitude + ":" 
        + position.coords.longitude + ":" 
        + position.coords.accuracy) */
    $scope.geocoder =  new google.maps.Geocoder();
     
    $scope.geocoder.geocode({ 'latLng': latLng }, function (results, status) 
    {
if (status === google.maps.GeocoderStatus.OK) 
{
   console.log(results)
    //dealing with the results returned by the geocoder
    if (results[0]) 

    {
       

    
      //console.log(results);

      $scope.addr= results[0].formatted_address;
      
       $scope.address = JSON.stringify(results[0].address_components);
             
        //console.log($scope.address)

           var link = 'http://myreps.tk/LGA_finder/getlga_info.php?address='+ $scope.address

        $http.get(link, {address: $scope.address}).success(function (results,status)
     {
    

  

    console.log(results);
          
       /*   var arr=[]

    for(var prop in results)
    {

      arr.push(results[prop]);
    }//arr array for results

    console.log(arr);*/
  $ionicLoading.show({
       content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
      });
 


            

 

           $scope.president = results[0].president;
         $scope.vice_pres = results[0].vice_president;




     
        // console.log($scope.lga_chair);
      
    $ionicLoading.hide(); 
         
     })//http.get results  



} //end of result[0]

  else {
        alert('Location present status is:' + status);
        $scope.firstExecution = false;
    }//error handle1
    
   



};//end of geocoder
});//end of scope.geocoder



   console.log('And we are out');
$scope.$broadcast('scroll.refreshComplete');


});
      
         
     };//doRfresh      




$scope.doRefresh_min = function()
{


console.log("refresh beginning")




//getting and converting coordinates to actual address section
 var options = {timeout: 1000, maximumAge:0, enableHighAccuracy: true};
 
   $cordovaGeolocation.getCurrentPosition(options).then(function(position)
   {


    var lat   =  position.coords.latitude;
    var lng   = position.coords.longitude; 
    var latLng = new google.maps.LatLng(lat, lng);

     //console.log(lat,lng) + ":" 
              /*  + position.coords.latitude + ":" 
        + position.coords.longitude + ":" 
        + position.coords.accuracy) */
    $scope.geocoder =  new google.maps.Geocoder();
     
    $scope.geocoder.geocode({ 'latLng': latLng }, function (results, status) 
    {
if (status === google.maps.GeocoderStatus.OK) 
{
   console.log(results)
    //dealing with the results returned by the geocoder
    if (results[0]) 
    {

     
    
      //console.log(results);

      $scope.addr= results[0].formatted_address;
       $scope.address = JSON.stringify(results[0].address_components);
             
        //console.log($scope.address)

           var link = 'http://myreps.tk/LGA_finder/getlga_info.php?address='+ $scope.address
 
        $http.get(link, {address: $scope.address}).success(function (results,status)
     {
    

    console.log(results);
          
       /*   var arr=[]

    for(var prop in results)
    {

      arr.push(results[prop]);
    }//arr array for results

    console.log(arr);*/


            $ionicLoading.show({
       content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
      });

 

          $scope.lga_name = results[0].name;
         $scope.lga_state = results[0].lga_state;
         $scope.vice_pres = results[0].vice_president;
         $scope.ministry1 = results[0].ministry[0][0];
         $scope.ministry2 =results[0].ministry[1][0];
         $scope.ministry3 = results[0].ministry[2][0];
         $scope.ministry4 = results[0].ministry[3][0];
         $scope.ministry5 = results[0].ministry[4][0];
         $scope.ministry6 = results[0].ministry[5][0];
         $scope.ministry7 = results[0].ministry[6][0];
         $scope.ministry8 = results[0].ministry[7][0];
         $scope.ministry9 = results[0].ministry[8][0];
         $scope.ministry10 = results[0].ministry[9][0];
         $scope.ministry11 = results[0].ministry[10][0];
         $scope.ministry12 = results[0].ministry[11][0];
         $scope.ministry13 = results[0].ministry[12][0];
         $scope.ministry14 = results[0].ministry[13][0];
         $scope.ministry15 = results[0].ministry[14][0];
         $scope.ministry16 = results[0].ministry[15][0];
         $scope.ministry17 = results[0].ministry[16][0];
         $scope.ministry18 = results[0].ministry[17][0];
         $scope.ministry19 = results[0].ministry[18][0];
         $scope.ministry20 = results[0].ministry[19][0];
         $scope.ministry21 = results[0].ministry[20][0];
         $scope.ministry22 = results[0].ministry[21][0];
         $scope.ministry23 = results[0].ministry[22][0];
         $scope.ministry24 = results[0].ministry[23][0];
      
       //ministry end



         $scope.commiss1 = results[0].commissioners[0][0];
       $scope.commiss2 = results[0].commissioners[1][0];
         $scope.commiss3 = results[0].commissioners[2][0];
         $scope.commiss4 = results[0].commissioners[3][0];
         $scope.commiss5 = results[0].commissioners[4][0];
         $scope.commiss6 = results[0].commissioners[5][0];
         $scope.commiss7 = results[0].commissioners[6][0];
         $scope.commiss8 = results[0].commissioners[7][0];
         $scope.commiss9 = results[0].commissioners[8][0];
         $scope.commiss10 = results[0].commissioners[9][0];
         $scope.commiss11 = results[0].commissioners[10][0];
         $scope.commiss12 = results[0].commissioners[11][0];
         $scope.commiss13 = results[0].commissioners[12][0];
         $scope.commiss14 = results[0].commissioners[13][0];
         $scope.commiss15 = results[0].commissioners[14][0];
         $scope.commiss16 = results[0].commissioners[15][0];
         $scope.commiss17 = results[0].commissioners[16][0];
         $scope.commiss18 = results[0].commissioners[17][0];
         $scope.commiss19 = results[0].commissioners[18][0];
         $scope.commiss20 = results[0].commissioners[19][0];
         $scope.commiss21 = results[0].commissioners[20][0];
         $scope.commiss22 = results[0].commissioners[21][0];
         $scope.commiss23 = results[0].commissioners[22][0];
         $scope.commiss24 = results[0].commissioners[23][0];
         




     
        // console.log($scope.lga_chair);
      

        $ionicLoading.hide(); 
     })//http.get results  




} //end of result[0]

  else {
        alert('Location present status is:' + status);
        $scope.firstExecution = false;
    }//error handle1
    
   



};//end of geocoder
});//end of scope.geocoder



   console.log('And we are out');
$scope.$broadcast('scroll.refreshComplete');


});
      
         
     };//doRfresh      





$scope.doRefresh_pres = function()
{


console.log("refresh beginning")




//getting and converting coordinates to actual address section
 var options = {timeout: 1000, maximumAge:0, enableHighAccuracy: true};
 
   $cordovaGeolocation.getCurrentPosition(options).then(function(position)
   {


    var lat   =  position.coords.latitude;
    var lng   = position.coords.longitude; 
    var latLng = new google.maps.LatLng(lat, lng);

     //console.log(lat,lng) + ":" 
              /*  + position.coords.latitude + ":" 
        + position.coords.longitude + ":" 
        + position.coords.accuracy) */
    $scope.geocoder =  new google.maps.Geocoder();
     
    $scope.geocoder.geocode({ 'latLng': latLng }, function (results, status) 
    {
if (status === google.maps.GeocoderStatus.OK) 
{

   console.log(results)
    //dealing with the results returned by the geocoder
    if (results[0]) 
    {

     
    
      //console.log(results);

      $scope.addr= results[0].formatted_address;
       $scope.address = JSON.stringify(results[0].address_components);
             
        //console.log($scope.address)
 

           var link = 'http://myreps.tk/LGA_finder/getlga_info.php?address='+ $scope.address

        $http.get(link, {address: $scope.address}).success(function (results,status)
     {
    

   $ionicLoading.show({
       content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
      });

    console.log(results);
          
       /*   var arr=[]

    for(var prop in results)
    {

      arr.push(results[prop]);
    }//arr array for results

    console.log(arr);*/



            

 

          $scope.lga_name = results[0].name;
         $scope.lga_state = results[0].lga_state;
         $scope.lga_senator = results[0].lga_senator;
        



 

     
        // console.log($scope.lga_chair);
        
         $ionicLoading.hide();
     })//http.get results  



 


} //end of result[0]

  else {
        alert('Location present status is:' + status);
        $scope.firstExecution = false;
    }//error handle1
    
   



};//end of geocoder
});//end of scope.geocoder



   console.log('And we are out');
$scope.$broadcast('scroll.refreshComplete');


});
      
         
     };//doRfresh      













/*
$ionicModal.fromTemplateUrl('pages/menu_details.html', {
             scope: $scope,
             animation: 'slide-in-up'
         }).then(function(modal){
            $scope.modal = modal;
         });
         $scope.openModal = function(){

            $scope.modal.show();
         }
         $scope.closemodal = function(){
         $scope.modal.hide();
         }

*/

});//end of controller


