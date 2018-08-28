'use strict';

/**
 * @ngdoc function
 * @name nimbusEduApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the nimbusEduApp
 */
angular.module('nimbusEduApp')
	.controller('UsersCtrl', function ($scope,$window,usersData,eduApi,user,$route) {
		$scope.defaultPagination = 5;
		
		$scope.usersData = usersData;

		var userType = $route.current.$$route.controllerAs || false;

		console.log('data',usersData,$route,userType);
		
		$scope.usersList = usersData.data;
				
		var list = new $window.Bloodhound({
			datumTokenizer: function(d) { console.log('bloodhound d',d); return $window.Bloodhound.tokenizers.whitespace(d.fname); },
			queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
			remote:	'http://edu.nimbus.com:7070/'+user.tenant.id+'/users'
		});	
		
		list.initialize();
				
		$scope.userDataset = {
			name	: 'users',
			display	: 'firsname',
			source	: list.ttAdapter(),
			//limit	: 10,
			templates: {
				//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
				suggestion: function(data){ 
					var str = '<article class="uk-comment uk-card">';
						str += '		<header class="uk-comment-header uk-grid-medium uk-flex-middle uk-margin-remove-bottom uk-grid" uk-grid="">';
						//str += '			<div class="uk-width-auto uk-first-column">';
						//str += '				<img class="uk-comment-avatar" src="'+data.image_url+'" width="40" height="40" alt="">';
						//str += '			</div>';
						str += '			<div class="uk-width-expand">';
						str += '				<h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset ng-binding uk-text-small" href="#"> '+data.fname+' '+data.lname+'</a></h4>';
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
			eduApi.api('GET',user.tenant.id+'/users?paginate='+$scope.defaultPagination+'&page='+page+(userType ? '&user_type='+userType : '')).then(function(result){
				
				console.log('next page:'+page,result.data.data);
				
				$scope.usersData = result.data;
				
				var newArray = $scope.usersList.concat(result.data.data);
				
				$scope.usersList = newArray;
				
				list.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('eduApi error',error);
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
		};
		
		$scope.edit = function(user){
			console.log('edit',user);
		};

		$scope.view = function(user){
			console.log('view',user);
		};

		console.log('UsersCtrl',$scope);

  });
