'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.courseService
 * @description
 * # courseService
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
	.service('courseService', function (modal,form,uikit3,$window,eduApi,$localStorage,apiConst,queryString) {
		//this.newAsset = {};

		this.initTypeAhead = function($scope,fields){
			fields.forEach(function(field){
				//console.log('field',field);

				var listName = field.name+'List',
					dataSetName = field.name+'DataSet',
					optionsName = field.name+'Options';

				$scope[listName] = new $window.Bloodhound({
					datumTokenizer: function(d) { return $window.Bloodhound.tokenizers.whitespace(d[field.display]); },
					queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
					remote:	field.endPoint
				});	
				
				$scope[listName].initialize(true);
						
				$scope[dataSetName] = {
					name	: field.name || '',
					display	: field.display || '',
					source	: $scope[listName].ttAdapter() || false,
					limit	: field.limit || 2,
					templates: {
						//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
						//TO DO Move strings below to its own function
						suggestion: function(data){ 
							var str = 		'<li class="uk-text-capitalize">'+data[field.display]+'</li>';

							return str;
						},
						empty: [
							'',
							'No results were found ...',
							''
						].join('\n'),
					},
					async	:	true
				};
				
				$scope[optionsName] = {
					displayKey: field.display || '',
					minLength: field.minLength || 2,
					highlight: true,
					hint: true,
					classNames: {
						dataset: 'uk-list uk-list-divider uk-dropdown uk-padding-small'
					}
				};
			
			});
		};

		this.saveCourse = function(data){
			console.log('saveCourse',data);			
			/*eduApi.api('POST','courses',data).then(function(result){
				console.log('result',result);
			}).catch(function(error){
				console.log('save',error);
			});*/
		};
		
		this.initCourse = function(user,$scope,params){
			//var self = this;
			
			$scope.loadingHome = true;

			//console.log('courseService initCourse',params,queryString.objectToQuerystring(params));
						
			return eduApi.api('GET',user.tenant.id+'/registrations'+queryString.objectToQuerystring(params));
		};

		this.getClasses = function(){
			return 	[
				{ id:1,name:'primary 1'},
				{ id:2,name:'primary 2'},
				{ id:3,name:'primary 3'},
				{ id:4,name:'primary 4'},
				{ id:5,name:'primary 5'},
				{ id:6,name:'primary 6'},
				{ id:7,name:'JS 1'},
				{ id:8,name:'JS 2'},
				{ id:9,name:'JS 3'},
				{ id:10,name:'SS 1'},
				{ id:11,name:'SS 2'},
				{ id:12,name:'SS 3'},
				{ id:13,name:'a level'}
			];
		};

		this.getCourses = function(user,params){

			if(typeof params === 'object'){
				params.paginate = apiConst.widgetPagination;
			}
			
			return eduApi.api('GET',user.tenant.id+'/courses'+queryString.objectToQuerystring(params));
		};
	});
