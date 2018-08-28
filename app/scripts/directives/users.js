'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:users
 * @description
 * # users
 */
angular.module('nimbusEduApp')
  .directive('users', function () {
    return {
      templateUrl: 'views/templates/users.html',
      restrict: 'E',
	  scope: true,
	  controller : function($scope,graphApi,$window,apiConst,$localStorage){
		$scope.widgetTitle = 'Users';
		
		$scope.search = null;
		
		$scope.user = $localStorage.auth;
				
		$scope.init = function(){
			$scope.loading = true;
				
			graphApi.api('GET',$scope.user.tenant.id+'/users?paginate='+apiConst.widgetPagination+'&page=1').then(function(result){
				$scope.data = result.data;
				userList.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('graphApi error',error);
				$scope.loading = false;
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
			
		};
		
		var userList = new $window.Bloodhound({
			datumTokenizer: function(d) { /*console.log('bloodhound d',d);*/ return $window.Bloodhound.tokenizers.whitespace(d.fname); },
			queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
			remote:	graphApi.apiEndPoint+subdomain+'/users'
		});	
		
		userList.initialize();
				
		$scope.userDataset = {
			name	: 'users',
			display	: 'fname',
			source	: userList.ttAdapter(),
			limit	: 10,
			templates: {
				//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
				//TO DO Move strings below to its own function
				suggestion: function(data){ 
					var str = 		'<article class="uk-comment uk-card">';
						str += '		<header class="uk-comment-header uk-grid-medium uk-flex-middle uk-margin-remove-bottom uk-grid" uk-grid="">';
						//str += '			<div class="uk-width-auto uk-first-column">';
						//str += '				<img class="uk-comment-avatar" src="'+data.image_url+'" width="40" height="40" alt="">'; // jshint ignore:line
						//str += '			</div>';
						str += '			<div class="uk-width-expand">';
						str += '				<h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset ng-binding uk-text-small uk-text-capitalize" ng-href="#!/'+data.tenant_id+'/profile/'+data.id+'"> '+data.firstname+' '+data.lastname+'</a></h4>'; // jshint ignore:line
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
		
		$scope.userOptions = {
			displayKey: 'fname',
			minLength: 2,
			highlight: true,
			classNames: {
				dataset: 'uk-dropdown'
			}
		};
		
		$scope.next = function(page){
			$scope.loading = true;
			graphApi.api('GET',$scope.user.tenant.id+'/users?paginate='+apiConst.widgetPagination+'&page='+page).then(function(result){
				$scope.data = result.data;
				userList.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('graphApi error',error);
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
		};
		
		$scope.prev = function(page){
			$scope.loading = true;
			graphApi.api('GET',$scope.user.tenant.id+'/users?paginate='+apiConst.widgetPagination+'&page='+page).then(function(result){
				$scope.data = result.data;
				userList.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('graphApi error',error);
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
		};
		
		$scope.init();

		console.log('Users Directive Scope',$scope);
	  },
      link: function postLink(scope, element) {
		element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
