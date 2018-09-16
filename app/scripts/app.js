'use strict';

/**
 * @ngdoc overview
 * @name nimbusEduApp
 * @description
 * # nimbusEduApp
 *
 * Main module of the application.
 */
angular
	.module('nimbusEduApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'siyfion.sfTypeahead',
		'satellizer',
		'chart.js',
		'ngStorage',
		'angular-linq',
		'pusher-angular',
		//'datatables'
	])
	.config(function ($routeProvider,$locationProvider,$authProvider,apiConst,$sceDelegateProvider,ChartJsProvider,dashboardConst) {
		ChartJsProvider.setOptions({
	      chartColors: dashboardConst.chart.colors
	    });

		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			// Allow loading from our assets domain. **.
			'http://edu.nimbus.com:7070/**',
		]);
  
		$authProvider.baseUrl = 'http://edu.nimbus.com:7070';
		$authProvider.loginUrl = '/api/v1/login';
		
		$routeProvider
			.when('/', {
				templateUrl: 'views/dashboard.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard'
			})
			.when('/users/students', {
				templateUrl: 'views/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'student',
				resolve:	{
					usersData : function(eduApi,$window,apiConst,$localStorage){
						var user = $localStorage.auth;
						return eduApi.api('GET',user.tenant.id+'/users?paginate='+apiConst.componentPagination+'&page=1&user_type=student').then(function(result){
							console.log('usersData result',result);
							return result.data;
						}).catch(function(error){
							console.log('usersData error',error);
							$window.UIkit.notification({
								message: 'Couldnt get usersData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
							
						});
						
					}
				}
			})
			.when('/users/teachers', {
				templateUrl: 'views/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'teacher',
				resolve:	{
					usersData : function(eduApi,$window,apiConst,$localStorage){
						var user = $localStorage.auth;
						//console.log('usersData before resolve',user);
						return eduApi.api('GET',user.tenant.id+'/users?paginate='+apiConst.componentPagination+'&page=1&user_type=teacher').then(function(result){
							console.log('usersData result',result);
							return result.data;
						}).catch(function(error){
							console.log('usersData error',error);
							$window.UIkit.notification({
								message: 'Couldnt get usersData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
							
						});
						
					}
				}
			})
			.when('/users/parents', {
				templateUrl: 'views/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'parent',
				resolve:	{
					usersData : function(eduApi,$window,apiConst,$localStorage){

						var user = $localStorage.auth;

						return eduApi.api('GET',user.tenant.id+'/users?paginate='+apiConst.componentPagination+'&page=1&user_type=parent').then(function(result){
							console.log('usersData result',result);
							return result.data;
						}).catch(function(error){
							console.log('usersData error',error);
							$window.UIkit.notification({
								message: 'Couldnt get usersData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
							
						});
						
					}
				}
			})
			.when('/users/other', {
				templateUrl: 'views/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'other',
				resolve:	{
					usersData : function(eduApi,$window,apiConst,$localStorage){

						var user = $localStorage.auth;

						return eduApi.api('GET',user.tenant.id+'/users?paginate='+apiConst.componentPagination+'&page=1&user_type=other').then(function(result){
							console.log('usersData result',result);
							return result.data;
						}).catch(function(error){
							console.log('usersData error',error);
							$window.UIkit.notification({
								message: 'Couldnt get usersData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
							
						});
						
					}
				}
			})
			.when('/profile/settings', {
				templateUrl: 'views/account.html',
				controller: 'AccountCtrl',
				controllerAs: 'account',
			})
			.when('/inventory', {
				templateUrl: 'views/inventory.html',
				controller: 'InventoryCtrl',
				controllerAs: 'inventory'
			})
			.when('/learning', {
				templateUrl: 'views/learning.html',
				controller: 'LearningCtrl',
				controllerAs: 'learning'
			})
			.when('/learning/course/:id', {
				templateUrl: 'views/course.html',
				controller: 'CourseCtrl',
				controllerAs: 'course',
				resolve:	{
					/*courseData : function(eduApi,$window,apiConst,$route,tenant){
						var params = $route.current.params;
						
						return eduApi.api('GET',tenant.id+'/registrations?course_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1&user_list=true').then(function(result){
							console.log('eduApi course result',result);
							return result.data;
						}).catch(function(){
							$window.UIkit.notification({
								message: 'Couldnt get courseData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
					}*/
				}
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'login'
			})
			.when('/learning/courses', {
				templateUrl: 'views/courses.html',
				controller: 'CoursesCtrl',
				controllerAs: 'courses'
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl',
				controllerAs: 'register',
				resolve:	{
					services : function(graphApi,$window,apiConst){
						
						return graphApi.api('GET','services?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
							//console.log('eduApi course result',result);
							return result.data;
						}).catch(function(){
							$window.UIkit.notification({
								message: 'Couldnt get services',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
					}
				}
			})
			.when('/settings', {
			  templateUrl: 'views/settings.html',
			  controller: 'SettingsCtrl',
			  controllerAs: 'settings'
			})
			.when('/tools', {
			  templateUrl: 'views/tools.html',
			  controller: 'ToolsCtrl',
			  controllerAs: 'tools'
			})
			.otherwise({
				redirectTo: '/'
			});
			
	})
	.run(function($rootScope, $location, $cookies, $http,$auth,$window,offcanvas) {
		// keep user logged in after page refresh
		
		$rootScope.globals = $cookies.get('auth') || {};
		
		if ($rootScope.globals && $auth.isAuthenticated()) {			
			$http.defaults.headers.common.Authorization = 'Bearer ' + $auth.getToken(); // jshint ignore:line
		}

		var history = [];

		$rootScope.$on('$routeChangeStart', function() { 
			offcanvas.close();
			$rootScope.showLoader = true;
		});

		$rootScope.$on('$routeChangeSuccess', function() {
			history.push($location.$$path);
			$rootScope.showLoader = false;
		});
		

		$rootScope.$on('$locationChangeStart', function () {

			//allowed pages
			var allowed = ['login','register'];
			
			var restricted = false;
			
			angular.forEach(allowed,function(value){
				restricted = $location.path() === '/'+value ? false : true;
			});
			
			//console.log('logged in restrictions',restricted,$location.path());

						
			// redirect to login page if not logged in and trying to access a restricted page
			var loggedIn = $auth.isAuthenticated();//$rootScope.globals.currentUser;
			
			if (!loggedIn && restricted) {
				//auth.clearUser();
				
				//console.log('logging you out',history,$rootScope);
				
				$location.path('/login');//.search({returnUrl: history[0]});
			}
		});
	})
	.filter('trusted', ['$sce', function ($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}]);	