'use strict';

/**
 * @ngdoc service
 * @name nimbusEduApp.uikit3
 * @description
 * # uikit3
 * Factory in the nimbusEduApp.
 */
angular.module('nimbusEduApp')
	.factory('uikit3', function () {

		return {
			input : function(attrs){
				var str = '';
				
				str += attrs.label ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.label+'</label>' : '';
				str += '<input ';

				if(attrs.cls){
					str += 'class="';
					str += attrs.type !== 'range' ? 'uk-input' : attrs.cls;
					str += '" ';
				}

				str += attrs.type ? ' type="'+attrs.type+'" ' : ' type="text" ';
				str += attrs.model ? ' ng-model="'+attrs.model+'" ' : '';
				str += attrs.directive ? attrs.directive : '';
				str += attrs.placeholder ? ' placeholder="'+attrs.placeholder+'" ' : '';
				str += attrs.name ? 'name="'+attrs.name+'"' : '';
				
				if(attrs.type === 'range'){
					str += attrs.min ? ' min="'+attrs.min+'" ' : '';
					str += attrs.max ? ' max="'+attrs.max+'" ' : '';
					str += attrs.value ? ' value="'+attrs.value+'" ' : '';
					str += attrs.step ? ' step="'+attrs.step+'" ' : '';
				}

				str += attrs.required ? 'required' : '';
				str += '>';
				
				return str;
			},
			inputIcon : function(attrs){
				var str = '',self = this;
				
				str +=	'<div class="uk-inline uk-width-1-1">';
				str +=	'<a class="uk-form-icon uk-form-icon-flip" href=""';
				str +=  attrs.icon ? 'uk-icon="icon: '+attrs.icon+'"' : 'uk-icon="icon: "';
				str +=  '></a>';
				str += 	self.input(attrs);
				str +=	'</div>';
				
				return str;
			},
			button : function(attrs){
				var str = '';
				
				str += '<button ';
				str += attrs.cls ? 'class="uk-button '+attrs.cls+'"' : 'class="uk-button uk-button-primary"';
				str += attrs.directive ? attrs.directive : '';
				str += '">';
				str += attrs.icon ? '<span uk-icon="icon: '+attrs.icon+'"></span>'  : '';
				str += attrs.label ? attrs.label : '';
				str += '</button>';
				
				return str;
			},
			textarea : function(attrs){
				var str = '';
				
				str += attrs.label ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.label+'</label>' : '';
				str += '<textarea ';
				str += attrs.cls ? 'class="uk-textarea '+attrs.cls+'"' : 'class="uk-textarea"';
				str += attrs.placeholder ? 'placeholder="'+attrs.placeholder+'"' : '';
				str += attrs.model ? 'ng-model="'+attrs.model+'"' : '';
				str += attrs.name ? 'name="'+attrs.name+'"' : '';
				str += '">';
				str += '</textarea>';
				
				return str;
			},
			range : function(attrs){			
				return this.input(attrs);
			},
			select : function(attrs){
				var str = '';
				
				str += attrs.placeholder ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.placeholder+'</label>' : '';
				str += '<select ';
				str += attrs.cls ? 'class="uk-select '+attrs.cls+'"' : 'class="uk-select"';
				str += attrs.placeholder ? 'placeholder="'+attrs.placeholder+'"' : '';
				str += attrs.directive ? attrs.directive : '';
				str += attrs.name ? 'name="'+attrs.name+'"' : '';
				str += '"></select>';
				
				return str;
			},
			checkbox : function(attrs){
				var str = '';
				
				str += '<label><input type="checkbox" ';
				str += attrs.name ? 'name="'+attrs.name+'"' : '';
				str += attrs.cls ? 'class="uk-checkbox '+attrs.cls+' "' : '';
				str += attrs.directive ? attrs.directive : '';
				str += attrs.checked ? 'checked' : '';
				str += '>';
				str += attrs.label ? attrs.label : '';
				str += '</label>';
				
				return str;
			},
			upload : function(attrs){

				var str = '';
				str += attrs.placeholder ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.placeholder+'</label>' : '';
				str += '<div class="js-upload uk-placeholder uk-text-center">';
				str += '	<span uk-icon="icon: cloud-upload"></span>';
				str += '	<span class="uk-text-middle">Attach binaries by dropping them here or</span>';
				str += '	<div uk-form-custom>';
				str += '		<input type="file" multiple>';
				str += '		<span class="uk-link">selecting one</span>';
				str += '	</div>';
				str += '</div>';
				return str;
			},
			offcanvas : function(attrs){
		        var str = '<div id="offcanvas" uk-offcanvas="'+(attrs.flip ? 'flip:'+attrs.flip+';' : '')+'mode: push">';
		            str += '<div class="uk-offcanvas-bar">';
		            str += attrs.title ? attrs.title : '';
		            str += attrs.body ? attrs.body : '';
		            str +=    '<button class="uk-offcanvas-close" type="button" uk-close></button>';
		            str += '</div>';
		            str += '</div>';

		        return str;
		    },
			
			modal : function(attrs){
				var str = '',
					btnClass = 'uk-modal-close-default';
				
				if(attrs.type && attrs.type === 'full'){
					attrs.wrapperCls += ' uk-modal-full';
					btnClass = 'uk-modal-close-full uk-close-large';
				}
								
				str += '<div id="modal" ';
				str += attrs.wrapperCls ? 'class="'+attrs.wrapperCls+'"' : '';
				str += attrs.directive ? attrs.directive : '';				
				str += 'uk-modal>';
				str += '	<div class="uk-modal-dialog ';
				str += attrs.cls ? attrs.cls+'"' : '"';
				str += '>';
				str += '		<button class="'+btnClass+'" type="button" uk-close></button>';
				
				if(attrs.type && attrs.type === 'full'){
					str += attrs.body ? this.fullModalBody(attrs) : '';
				}else{
					str += attrs.title ?'<div class="uk-modal-header"><h2 class="uk-modal-title uk-text-capitalize">'+attrs.title+'</h2></div>' : '';
					str += attrs.body ? '		<div class="uk-modal-body uk-padding-small">'+attrs.body+'</div>' : '';
					str += attrs.footer ?'		<div class="uk-modal-footer">'+attrs.footer+'</div>' : '';
				}
				
				str += '	</div>';
				str += '</div>';
				
				return str;
			},
			
			fullModalBody : function(attrs){
				var str = '';
				
				str +=	'<div class="uk-grid-collapse ';
				str +=  attrs.image ? 'uk-child-width-1-2@s' : 'uk-child-width-1-1@s';
				str +=  ' uk-flex-middle" uk-grid>';
				str +=		attrs.image ? '<div class="uk-background-cover" ': '';
				str +=		attrs.image ? 'style="background-image: url('+attrs.image+');" ' : '';
				str +=		attrs.image ? 'uk-height-viewport></div>': '';
				str +=		'<div class="uk-padding-large">';
				str +=			attrs.title ? attrs.title : '';
				str +=			attrs.body ? attrs.body : '';
				str +=		'</div>';
				str +=	'</div>';
				
				return str;
			},
			
			table : function(data,type){
								
				var str = '',table = '';
				
				switch(type){
					case 'request' : 
					
					table += '  <thead>';
					table += '	  <tr class="uk-text-small">';
					table += '		  <th class="uk-table-shrink"><input class="uk-checkbox" type="checkbox" ng-click="selectRows(all)"></th>';
					table += '		  <th class="uk-table-expand">Description</th>';
					table += '		  <th class="uk-table-shrink">Quantity</th>';
					table += '		  <th class="uk-width-small">Cost</th>';
					table += '		  <th class="uk-width-small">Total</th>';
					table += '		  <th class="uk-width-small"><a uk-icon="icon: plus-circle" ng-click="addRow()">add</a></th>';
					table += '	  </tr>';
					table += '  </thead>';
					table += '  <tbody>';
					table += '	  <tr ng-repeat="item in newAsset.items" class="uk-text-small">';
					table += '		  <td><input class="uk-checkbox" type="checkbox" ng-model="item.selected"></td>';
					table += '		  <td><input class="uk-input uk-form-blank" type="text" ng-model="item.description"></td>';
					table += '		  <td><input class="uk-input uk-form-blank" type="number" ng-model="item.quantity"></td>';
					table += '		  <td><input class="uk-input uk-form-blank" type="number" ng-model="item.cost" step="0.5"></td>';
					table += '		  <td><input class="uk-input uk-form-blank" type="number" ng-value="item.cost * item.quantity"></td>';
					table += '		  <td>';
					table += '			 <ul class="uk-iconnav">';
					table += '			   <li><a uk-icon="icon: minus-circle" class="uk-text-danger" ng-click="removeRow($index)"></a></li>';
					table += '			</ul>';
					table += '		  </td>';
					table += '	  </tr>';
					table += '  </tbody>';
					
					break;
				}
				
				str += '<table class="uk-table uk-table-middle uk-table-divider uk-margin-remove">';
				str += 	table;
				str += '</table>';
				
				return str;
			},
			typeahead : function(attrs){
				var str = '';

					str += this.input(attrs);//'<input type="text" datasets="subjectsDataSet" options="subjectsOptions" ng-model="asset.meta.subject" sf-typeahead class="uk-input uk-search-input uk-width-1-1 typeahead uk-text-capitalize" placeholder="Subject"/>';
				
				return str;
			},
			typeaheadPreview : function(attrs){
				
				var str = '';
				
				str += '<article class="uk-comment uk-padding-small">';
				str += '	<header class="uk-comment-header uk-grid-medium uk-flex-middle uk-margin-remove" uk-grid>';
				if(attrs.image){
					str += '		<div class="uk-width-auto uk-padding-remove image">';
					str += '			<img class="uk-comment-avatar" src="'+attrs.image+'" width="30" height="30" alt="">';
					str += '		</div>';
				}
				
				if(attrs.title){
					str += '		<div class="uk-width-expand title">';
					str += 				'<h4 class="uk-comment-title uk-margin-remove uk-text-small"><a class="uk-link-reset" href="#">'+attrs.title+'</a></h4>';
					str += '		</div>';
				}
					str += '	</header>';
					
				if(attrs.description){
					str += '	<div class="uk-comment-body">';
					str += '		<p>'+attrs.description+'</p>';
					str += '	</div>';
				}
				str += '</article>';
				
				return str;
			},
			card : function(attrs){
				var str = '';

				if(!attrs.classes){
					attrs.classes = {};
				}

				str += '<div class="uk-card ';
				str += attrs.classes.card ? attrs.classes.card : '';
				str += '">';

				if(attrs.image){
					str += '<div class="uk-card-media-top">';
					str += 	'<img src="'+attrs.image.url+'"';
					str += 'alt="'+attrs.image.title ? attrs.image.title : ''+'"';
					str += '>';
					str += '</div>';
				}

				if(attrs.header){
				    str += '<div class="uk-card-header ';
				    str += attrs.classes.header ? attrs.classes.header : '';
				    str += '">';
				    str += attrs.header;
				    str += '</div>';
				}

			    str += '<div class="uk-card-body ';
			    if(attrs.classes){
			    	str += attrs.classes.body ? attrs.classes.body : '';
				}
			    str += '">';
			    str += attrs.body;
			    str += '</div>';

			    if(attrs.footer){
				    str += '<div class="uk-card-footer ';
				    if(attrs.classes){
			    		str += attrs.classes.footer ? attrs.classes.footer : '';
					}
				    str += '">';
				    str += attrs.footer;
				    str += '</div>';
				}
				str += '</div>';

				return str;
			},
			icons : function(list){
				var str = '';

				str = '<ul class="uk-iconnav">';

				list.forEach(function(v){
					//console.log('Icons',v);
					str += '<li ';
					str += v.directive ? v.directive : '';
					str += '>';
					str += '<a uk-icon="icon: ';
					str += v.icon ? v.icon : '';
					str +=	'"';
					str += v.cls ? ' class="'+v.cls+'"' : '';
					str += v.action ? ' ng-click="'+v.action+'"' : '';
					str += v.tooltip ? '': ''; //'uk-tooltip="'+v.tooltip+'"' : ''; TO DO : See whats going on here
					str += '></a>';
					str += '</li>';
				});

				str += '</ul>';

				return str;
			},
			section : function(attrs){
				var str = '';
				str += '<div class="uk-section uk-section-default" ';
				str += attrs.directive ? attrs.directive : '';
				str += '>';
				str += '    <div class="uk-container">';
				str += '        <h3>';
				str += attrs.title ? attrs.title : '';
				str += '		</h3>';
				str += '        <div>';
				str += attrs.body ? attrs.body : '';
				str += '        </div>';
				str += '    </div>';
				str += '</div>';

				return str;
			}
		};
	});
