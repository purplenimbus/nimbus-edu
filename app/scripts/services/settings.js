'use strict';
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
/**
 * @ngdoc service
 * @name nimbusEduApp.settings
 * @description
 * # settings
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  .service('settings', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
	this.settings = {
		dashboard : {
			tasks : {
				display:false,
				disabled:true
			},
			reports : {
				display:false,
				disabled:false
			},
			activities : {
				display:false,
				disabled:true
			},
			employees : {
				display:true,
				disabled:false
			},
			requests : {
				display:false,
				disabled:true
			},
			myCourses : {
				display:true,
				disabled:false
			},
		},
		learningDashboard : {
			myCourses : {
				display:true,
				disabled:false
			},
			activities : {
				display:false,
				disabled:true
			}
		},
		nav : {
			dashboard : {
				display:true,
				disabled:false,
				icon: 'home',
				url:'',
				access_level : 1,
			},
			/*users : {
				display:true,
				disabled:false,
				icon: 'users',
				url:'users',
			},
			/*inventory : {
				display:true,
				disabled:false,
				icon: 'list',
				url:'inventory',
			},*/
			learning : {
				display:true,
				disabled:false,
				icon: 'laptop',
				url:'learning',
				access_level : 3, // jshint ignore:line
				children:{
					courses:{
						display:true,
						disabled:false,
						icon: 'thumbnails',
						url:'learning/courses',
						access_level : 3, // jshint ignore:line
					},
					/*students : {
						display:true,
						disabled:false,
						icon: 'users',
						url:'users/students',
						access_level : 3, // jshint ignore:line
					},
					teachers : {
						display:true,
						disabled:false,
						icon: 'user',
						url:'users/teachers',
						access_level : 3, // jshint ignore:line
					},
					parents : {
						display:true,
						disabled:false,
						icon: 'happy',
						url:'users/parents',
						access_level : 3, // jshint ignore:line
					},
					other : {
						display:true,
						disabled:false,
						icon: 'hashtag',
						url:'users/other',
						access_level : 3, // jshint ignore:line
					}*/
				}
			}
		}
	};
	
	this.getSettings = function(type){
		return this.settings[type];
	};
	
  });
