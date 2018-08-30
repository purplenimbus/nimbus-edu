'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.card
 * @description
 * # card
 * Service in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
  	.service('card', function (uikit3,form,courseService,eduApi) {
  		var self = this;
    	this.type = function(type,key,$scope,edit){
    		return uikit3.card(self[type](key,$scope,edit));
    	};

    	this.person = function(key){
    		var body = '';

    		console.log('person card');

    		body += '<article class="uk-text-center">';
    		body += '<h1 class="uk-article-title uk-text-capitalize"><a class="uk-link-reset" href="">{{ '+key+'.firstname }} {{ '+key+'.lastname }}</a></h1>';
    		body += '<p class="uk-article-meta uk-text-capitalize">{{ '+key+'.meta.user_type }}</p>';
    		body += '<div uk-spinner class="uk-text-center uk-width-1-1"></div>';
    		body += '</article>';

    		return {
    			body:body
    		};
    	};

    	this.course = function(key,$scope,edit){
    		var body = '';

    		console.log('course card',key,$scope,edit);

    		body += '<article class="uk-text-center">';
    		body += '	<h3 class="uk-text-primary uk-text-capitalize"><a class="uk-link-reset" href="">{{ '+key+'.name }}</a></h3>';
    		body += '		<hr>';
    		//body += '	<p class="uk-article-meta uk-text-capitalize">{{ '+key+'.code }}</p>';
    		//body += '	<div uk-spinner class="uk-width-1-1"></div>';

    		/*if(!edit){
    			body += '	<p ng-if="'+key+'.instructor" class="uk-article-meta uk-text-capitalize">';
    			body += '	{{ '+key+'.instructor.meta.title }} {{ '+key+'.instructor.firstname }} {{ '+key+'.instructor.lastname }} {{ '+key+'.instructor.othernames }}';
	    		body += '	</p>';
	    		body += '	<div ng-if="'+key+'.registrations.length">';
	    		body += '		<p class="uk-text-meta uk-text-uppercase uk-text-primary">{{ '+key+'.grade.name }} class list</p>';
	    		//body += '		<hr>';
	    		body += '		<ul class="uk-list">';
	    		body += '		<li class="uk-text-capitalize uk-text-left" ng-repeat="student in '+key+'.registrations">';
	    		body += '        	<div class="uk-grid-small uk-flex-middle" uk-grid>';
				body += '            	<div ng-if="student.user.image" class="uk-width-auto">';
				body += '               	<img class="uk-border-circle" width="40" height="40" src="{{ student.user.image || \'\'}}">';
				body += '            	</div>';
				body += '           	<div class="uk-width-expand">';
				body += '                	{{student.user.firstname}} <span class="uk-text-small">{{student.user.lastname}} {{ student.user.othernames }}</span>';
				body += '            	</div>';
				body += '        	</div>';
	    		body += '		</li>';
	    		body += '		</ul>';
	    		body += '	</div>';
    		}*/

    		body += '</article>';

    		if(edit){
	    		//if(!$scope.createCourseInit){
					courseService.initTypeAhead($scope,[{
						name:'subjects',
						display:'name',
						endPoint:eduApi.apiEndPoint+'subjects',
                        callback : function(data){ 

                            var str =       '<li class="uk-text-capitalize">'+data.name+'</li>';

                            return str;
                        }
					},{
						name:'instructors',
						display:'firstname',
						endPoint:eduApi.apiEndPoint+$scope.user.tenant.id+'/users?user_type=teacher',
                        callback : function(data){ 

                            var str =       '<li class="uk-text-capitalize">'+data.firstname+' '+data.lastname+'</li>';

                            return str;
                        }
					}]);
				//}

	    		body += form.editCourse(key,$scope);

	    		$scope.createCourseInit = true;
    		}

            var footer = uikit3.button({
                    cls:'uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom',
                    icon:'upload',
                    label:'Save',
                    directive:'ng-click="save('+key+')"'}); 

                footer += '<div class="uk-margin" ng-if="error">{{error}}</div>';  
                
    		return {
    			body:body,
    			classes : {
    				body : 'uk-padding-remove',
    				footer : 'uk-padding-remove'
    			},
    			footer	:	edit ? 
                                footer  
                            : false
    		};
    	};
  	});
