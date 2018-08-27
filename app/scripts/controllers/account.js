'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('AccountCtrl', function ($scope,$window,eduApi,$route,apiConst,user,sweetAlert,userService,$localStorage) {
	
	$scope.init = function(){
		//console.log('profile init',$localStorage.auth);
		$scope.profileData = JSON.parse($localStorage.auth); //to get the latest data?
	};
	
	$scope.save = function(data){
		$scope.loading = true;
		console.log('sending data',data);

		userService.saveUser(data)
			.then(function(result){
				//console.log('profile save result',result);
				
				$scope.loading = false;
				
				sweetAlert.alert({
				   	title: 'Profile Saved',
				   	text : result.data.message,
				   	icon: 'success',
				   	buttons:{
						confirm: sweetAlert.button({text:'ok'})
					}
				}).then(function(){
					userService.updateLocalUser(result.data);
					$route.reload();
				});
			})
			.catch(function(error){
				//do something
				$scope.loading = false;

				sweetAlert.alert({
				   	title: 'Something\'s Wrong', // jshint ignore:line
				   	text : error.data.message,
				   	icon: 'error',
				   	buttons:{
						confirm: sweetAlert.button({text:'ok'})
					}
				});
			});
	};
	
    var serviceList = new $window.Bloodhound({
		datumTokenizer: function(d) { /*console.log('bloodhound d',d);*/ return $window.Bloodhound.tokenizers.whitespace(d.fname); },
		queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
		remote:	'http://graph.nimbus.com:8000/v1/services'
	});	
	
	$scope.search = null;
	
	serviceList.initialize();
			
	$scope.serviceDataset = {
		name	: 'services',
		display	: 'name',
		source	: serviceList.ttAdapter(),
		limit	: 10,
		templates: {
			//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
			//TO DO Move strings below to its own function
			suggestion: function(data){ 
				var str = '<article class="uk-comment uk-card">';
					str += '		<header class="uk-comment-header uk-grid-medium uk-flex-middle uk-margin-remove-bottom uk-grid" uk-grid="">';
					//str += '			<div class="uk-width-auto uk-first-column">';
					//str += '				<img class="uk-comment-avatar" src="'+data.image_url+'" width="40" height="40" alt="">';
					//str += '			</div>';
					str += '			<div class="uk-width-expand">';
					str += '				<h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset ng-binding uk-text-small uk-text-capitalize" ng-href="#!/'+data.tenant_id+'/profile/'+data.id+'"> '+data.fname+' '+data.lname+'</a></h4>'; // jshint ignore:line
					str += '				<ul class="uk-padding-remove uk-margin-remove uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top uk-text-mute">';
					str += '				</ul>';
					str += '			</div>';
					str += '		</header>';
					str += '		<div class="uk-comment-footer"></div>';
					str += '	</article>';
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
	
	$scope.serviceOptions = {
		displayKey: 'name',
		minLength: 2,
		highlight: true,
		classNames: {
			dataset: 'uk-dropdown'
		}
	};
	
	$scope.init();
	
  });
