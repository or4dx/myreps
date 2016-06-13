// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','starter.location','ngCordova'])

/*.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
});

})
var admobid = {
  tabbarPlacement: 'bottom'
};

// select the right Ad Id according to platform

if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-4548970070963751/2058267626',
        interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-3940256099942544/6300978111',
        interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-3940256099942544/6300978111',
        interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN'
    };
}

if(window.AdMob) AdMob.createBanner( {
  adId:admobid.banner, 
  isTesting: true,
  position:AdMob.AD_POSITION.BOTTOM_CENTER, 
  autoShow:true} );



 */



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider){

 $httpProvider.defaults.cache = true;


$stateProvider

    .state('tabs', {
     url:'/tab',
     abstract: true,
     cache:true,
     templateUrl: 'pages/tabs.html'
 
   })



.state('tabs.LG(Current)', {
    url:'/LG(Current)',
    views: {
   'LG(Current)-tab': {
    templateUrl: 'pages/LG(Current).html',
     controller: 'LctnCtrl'

      }   
    
    }


 })

.state('maps', {
                url: '/maps',
                templateUrl: 'pages/maps.html',
                controller:'MapCtrl'
            })


  .state('tabs.State-Senate(Current)', {
    url:'/State-Senate(Current)',
    views: {
   'State-Senate(Current)-tab': {
    templateUrl: 'pages/State-Senate(Current).html',
     controller: 'LctnCtrl'

      }   
    
    }


 })


  .state('tabs.Ministry(Current)',{
    url:'/Ministry(Current)',
    views:   {
    'Ministry(Current)-tab' : {
     templateUrl: 'pages/Ministry(Current).html', 
      controller: 'LctnCtrl'
    }

  }

})


 .state('tabs.National-Assembly(Current)', {
    url:'/National-Assembly(Current)',
    views: {
   'National-Assembly(Current)-tab': {
    templateUrl: 'pages/National-Assembly(Current).html',
      controller: 'LctnCtrl'
      }   
    
    }


 })


 .state('tabs.Presidency(Current)', {
    url:'/Presidency(Current)',
    views: {
   'Presidency(Current)-tab': {
    templateUrl: 'pages/Presidency(Current).html',
     controller: 'LctnCtrl'
      }   
    
    }

 })


 .state('tabs.menu', {
    url:'/menu',
    views: {
   'menu-tab': {
    templateUrl: 'pages/menu.html',
    

      }   
    
    }

    })






  .state('tabs.local_lists', {
    url:'/local_lists',
    views: {
   'menu-tab': {
    templateUrl: 'pages/local_lists.html',
    

      }   

   }


 })


      .state('tabs.ministry_lists', {
    url:'/ministry_lists',
    views: {
   'menu-tab': {
    templateUrl: 'pages/ministry_lists.html',
    

      }   
    
    }


 })


       .state('tabs.senate_lists', {
    url:'/senate_lists',
    views: {
   'menu-tab': {
    templateUrl: 'pages/senate_lists.html',
    

      }   
    
    }


 })



       .state('tabs.states_list', {
    url:'/states_list',
    views: {
   'menu-tab': {
    templateUrl: 'pages/states_list.html',
    

      }   
    
    }


 })


   .state('tabs.credits', {
    url:'/credits',
    views: {
   'menu-tab': {
    templateUrl: 'pages/credits.html',
    

      }   
    
    }


 })




   .state('tabs.state_details', {
    url:'/menu/:aId',
    views: {
   'menu-tab': {
    templateUrl: 'pages/state_details.html',
    controller: 'LctnCtrl'

      }   
    
    }


 })  



  .state('tabs.ministry_details', {
    url:'/menu/ministry_lists/:Id',
    views: {
   'menu-tab': {
    templateUrl: 'pages/ministry_details.html',
    controller: 'LctnCtrl'
      }   
    
    }


 })      


 



 $urlRouterProvider.otherwise('/tab/LG(Current)') 

});








