'use strict';

/**
 * @ngdoc directive
 * @name nimbusEduApp.directive:tasks
 * @description
 * # tasks
 */
angular.module('nimbusEduApp')
  .directive('tasks', function (modal,form,tasks,tasksConst,uikit3,$window,graphApi) {
	
    return {
		templateUrl: 'views/templates/tasks.html',
		restrict: 'E',
		scope: true,
		controller: function($scope,apiConst){
			$scope.widgetTitle = 'Tasks';
			$scope.tasks =  [];
			var moment = $window.moment;
			var currentDateTime = moment();

			$scope.search = '';
						
			var taskList = false;
			$scope.init = function(){
				$scope.loading = true;
				graphApi.api('GET',apiConst.defaultTenantId+'/users/1/tasks?paginate='+apiConst.widgetPagination+'&page=1').then(function(result){
					console.log('result',result);
					$scope.data = result.data;
					$scope.loading = false;
					
				}).catch(function(error){
					console.log('error',error);
					//TO DO Do Something
					$window.UIkit.notification({
						message: 'Couldnt get tasks',
						status: 'danger',
						pos: 'top-right',
						timeout: 5000
					});
					
					$scope.loading = false;
				});
				
				$scope.newAsset = {
					deadline:{
						date :	new Date(currentDateTime.format()),
					}
				};
				
				$scope.newAsset.time = $scope.newAsset.deadline.date;
				
				console.log('Scope newAsset',currentDateTime.get('time'));
			
				taskList = new $window.Bloodhound({
					datumTokenizer: function(d) { return $window.Bloodhound.tokenizers.whitespace(d.name); },
					queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
					remote:	'http://ems.nimbus.com:8000/1/users/1/tasks'
				});	
				
				taskList.initialize();
				
				console.log('init',taskList.ttAdapter());
				
				$scope.tasksDataset = {
					displayKey: 'name',
					source: taskList.ttAdapter(),
					templates: {
					  empty: [
						'',
						'No results were found ...',
						''
					  ].join('\n'),
					}
				};	
				
			};
			
			$scope.tasksOptions = {
				displayKey: 'name',
				minLength: 2,
				highlight: true,
				classNames: {
					dataset: 'uk-dropdown'
				}
			};
			
			$scope.showAddTask = function(task){
				
				//if(task){
					$scope.newAsset = task || {};
				//}
				
				
				var obj,
					title,
					footer,
					label,
					icon,
					directive;
				
				title = task ? 'Edit Task' : 'Add Task';
				
				label = task ? 'Edit' : 'Add';
				
				icon = task ? 'pencil' : 'plus';
				
				directive = task ? 'ng-click="saveTask(newAsset)"' : 'ng-click="addTask(newAsset)"';
				
				footer = '	<div class="uk-margin">';
				footer += 			uikit3.button({cls:'uk-width-1-1 uk-margin-small-bottom uk-button-primary',icon:icon,label:label,directive:directive});
				footer += '	</div>';
				
				obj = {
					title:title,
					body:form.addTask(true),
					footer:footer
				};
				
				modal.modal(obj,$scope).then(function(result){
					$scope.modal = result;
				});
				
			};
			
			
			$scope.addTask = function(task){
				console.log('addTask',moment(task.deadline.date,'YYYY-MM-DD'),moment(task.deadline.time,'hh:mm:ss'));
				//parsed deadline
				//show spinner
				
				//send to database
				
				//save task to scope
				$scope.tasks.push(task);
				
				//Reset newAsset
				$scope.newAsset = {};
				
				//close modal
				$scope.modal.hide();
				
				$scope.resetTypeAhead();
				
				$scope.reset();
			};
			
			$scope.removeTask = function(index){
				console.log('removeTask',$scope.tasks[index]);
				//send to database
				
				//remove from scope
				$scope.tasks.splice(index, 1);
			};
			
			$scope.completeTask = function(index){
				console.log('completeTask',$scope.tasks[index]);
				//send to database
				
				$scope.tasks[index].completed = true;
			};
			
			$scope.saveTask = function(task){
				console.log('saveTask',task);
				//send to database
				//close modal
				$scope.modal.hide();
				
				$scope.reset();
			};
			
			$scope.resetTypeAhead = function(){
				taskList = new $window.Bloodhound({
					datumTokenizer: function(d) { console.log('bloodhound d',d); return $window.Bloodhound.tokenizers.whitespace(d.name); },
					queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
					local:  $scope.tasks
				});
				
				taskList.initialize();
			};
			
			$scope.reset = function(){
				console.log('Scope Reset');
				$scope.newAsset = {};
				
				console.log('init',taskList);
				//$scope.$apply();
			};
			
			$scope.statusTypes = tasksConst().statusTypes;
						
			console.log('Tasks $scope' , $scope);
			
			$scope.selectAll = function(tasks,event){
				tasks.map(function(value){
					value.selected = angular.element(event.target).get(0).checked;
				});
			};
			
			$scope.next = function(page){
				console.log('get page',page,$scope.data);
				$scope.loading = true;
				graphApi.api('GET',apiConst.defaultTenantId+'/users/1/tasks?paginate='+apiConst.widgetPagination+'&page='+page).then(function(result){
					$scope.data = result.data;
					taskList.initialize(true);
					$scope.loading = false;
				}).catch(function(error){
					console.log('graphApi error',error);
				});
			};
			
			$scope.prev = function(page){
				console.log('get page',page,$scope.data);
				$scope.loading = true;
				graphApi.api('GET',apiConst.defaultTenantId+'/users/1/tasks?paginate='+apiConst.widgetPagination+'&page='+page).then(function(result){
					$scope.data = result.data;
					taskList.initialize(true);
					$scope.loading = false;
				}).catch(function(error){
					console.log('graphApi error',error);
				});
			};
		
			$scope.init();
		},
		link: function(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
	};
  });
