'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.form
 * @description
 * # form
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
	.service('form', function (uikit3) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		this.build = function(data,form){
			var str = '';

			str += form ? '<form action="javascript:void(0)">' : '';
			
			data.forEach(function(value){

				switch(typeof value){
					case 'object' : if(value.type){
										str += uikit3[value.type](value.attrs ? value.attrs : {});
									}
					
									break;
					default : str += value;
				}
				
			});
			
			str += form ?  '</form>' : '';
			
			//console.log('formService form',str);
			
			return str;
		};

		this.login = function(){
			var str = '';
			
			str += '<form class="uk-form-stacked">';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'email',icon:'user',type:'text',placeholder:'email',required:true});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'password',icon:'lock',type:'password',placeholder:'password',required:true});		
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.button({cls:'uk-width-1-1 uk-margin-small-bottom uk-button-primary',icon:'sign-in',label:'login',directive:'ng-click="login({ email:this.email , password: this.password },$event)"'});
			str += '	</div>';
			str += '</form>';

			return str;
		};
		
		this.addMedia = function(){
			var str = '';
			
			str += '<form class="uk-form-stacked">';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'Title',icon:'user',type:'text',placeholder:'Title'});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.select({directive:'ng-model="type"' , options : ''});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.upload();
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.textarea({directive:'ng-model="description"',placeholder:'description'});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.button({cls:'uk-width-1-1 uk-margin-small-bottom uk-button-primary',icon:'sign-in',label:'Add',directive:'ng-click="uploadData()"'});
			str += '	</div>';
			str += '</form>';
			return str;
		};
		
		this.addTask = function(edit){
			
			var str = '';
			
			if(edit){
				
			}
			
			str += '<form class="uk-form-stacked">';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'newAsset.name',icon:'user',type:'text',placeholder:'Name',required:true});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.textarea({directive:'ng-model="description"',placeholder:'Description',model:'newAsset.description'});
			str += '	</div>';
			str += '	<div class="uk-margin uk-grid-small uk-child-width-1-2" uk-grid>';
			str += '		<div class="">';
			str += 				uikit3.input({model:'newAsset.deadline.date',type:'date',icon:'calendar',placeholder:'Deadline Date'});
			str += '		</div>';
			str += '		<div class="">';
			str += 				uikit3.input({model:'newAsset.deadline.time',type:'time',icon:'clock',placeholder:'Deadline Time'});
			str += '		</div>';
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.select({options : 'statusTypes',directive:'ng-model="newAsset.status"'});
			str += '	</div>';
			str += '</form>';
			return str;
		};
	  
		this.addRequest = function(data){
			var str = '';
			
			str += uikit3.table(data,'request');
			
			return str;
		};
		
		this.editCourse = function(key,$scope){
			var str = '';
			
			str += '<form>';
			str += '	<div class="uk-margin uk-grid-small" uk-grid>';
			str += '		<div class="uk-width-1-1">';
			str += uikit3.inputIcon({model:key+'.name',icon:'user',type:'text',required:true,placeholder:'Course Title' , cls:'uk-text-capitalize'});
			str += '		</div>';
			str += '	</div>';
			str += '	<div class="uk-margin uk-grid-small" uk-grid>';
			str += '		<div class="uk-width-1-2@m uk-width-1-2@xs">';
			str += uikit3.typeahead({
						directive:'datasets="subjectsDataSet" options="subjectsOptions" ng-model="'+key+'.meta.subject" sf-typeahead',
						type:'text',
						required:true,
						cls:'uk-input uk-search-input uk-width-1-1 typeahead uk-text-capitalize',
						placeholder:'Subject'
					});
			str += '	</div>';
			str += '		<div class="uk-width-1-2@m uk-width-1-2@xs">';
			str += '			<select class="uk-select" ng-model="'+key+'.grade" ng-options="class.id as class.name for class in classes"></select>';
			str += '		</div>';
			str += '	</div>';

			str += '	<div class="uk-margin typeahead">';
			str += uikit3.typeahead({
						directive:'datasets="instructorsDataSet" options="instructorsOptions" ng-model="'+key+'.instructor" sf-typeahead',
						type:'text',
						required:true,
						cls:'uk-input uk-search-input uk-width-1-1 typeahead uk-text-capitalize',
						placeholder:'Instructor'
					});
			str += '	</div>';

			str += '	<div class="uk-margin typeahead">';
			str += '	<label class="uk-form-label uk-text-muted uk-text-uppercase uk-margin-bottom">instructor</label>';
			str += '		<user-pill name="true" user="'+key+'.instructor" ng-if="'+key+'.instructor"></user-pill>';						
			str += '	</div>';
			
			//TO DO : Move this somewhere else , perhaps on the course edit page? its badly slowing down the modal load

			str += '	<p class="uk-text-small uk-heading-line uk-text-center uk-text-uppercase uk-text-small" ng-click="showAdvanced = !showAdvanced"><span>';
			str += '		Course Breakdown  ';
			str += '		<span ng-if="!showAdvanced">[expand]</span>';
			str += '		<span ng-if="showAdvanced">[hide]</span>';
			str += '	</span></p>';

			str += '	<div ng-if="showAdvanced">';
			str += '		<div class="uk-margin">';
			str += '			<ul uk-grid>';
			str += '				<li ng-repeat="schema in getSchema">'+uikit3.checkbox({label:' {{ schema | uppercase }}',directive:'ng-model="'+key+'.meta.course_schema[schema]"',checked:true})+'</li>';
			str += '			</ul>';
			str += '		</div>';

			str += '		<div class="uk-margin">';
			str += '			<ul uk-grid>';	
			str += '			<li class="uk-width-1-1" ng-repeat="schema in getSchema" ng-if="'+key+'meta.course_schema[schema]">';
			str +=				uikit3.range({
									directive:'ng-model="'+key+'.meta.course_schema[schema]"',
									type:'range',
									cls:'uk-range',
									label:'{{schema | uppercase }} {{ '+key+'.meta.course_schema[schema] }}',
									min:0,
									max:100,
									step:5
								});
			str += '			</li>';
			str += '			</ul>';
			str += '		</div>';
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.textarea({model:key+'.meta.comments',placeholder:'Comments',label:false});
			str += '	</div>';
			

			str += '</form>';
			
			return str;
		};
	});