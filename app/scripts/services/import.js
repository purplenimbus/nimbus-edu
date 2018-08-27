'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.import
 * @description
 * # import
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  .service('importService', function (uikit3) {
    this.render = function(){
    	var str = '',body = '',header='',selection='';

        selection += '<ul class="uk-child-width-1-3@m uk-child-width-1-2@s" uk-grid>';
        selection += '<li ng-repeat="type in importTypes">';
        selection += '<a title="{{ type.name }}" class="uk-text-center uk-link-reset" ng-click="selectImportType(type)">';
        selection +=    uikit3.card({
                            body:   '<span class="uk-margin-small-right" uk-icon="icon:{{ type.icon }};ratio: 3.5"></span>'+
                                    '<h3 class="uk-card-title">Import {{ type.name }}</h3>',
                            classes : { card:'uk-card-default uk-card-hover' }
                        });
        selection += '</a>';
        selection += '</li>';
        selection += '';

        body += uikit3.section({
                    //title:'Select Import Type',
                    directive:'ng-show="!importType"',
                    body:selection,
                    cls:'uk-text-center'
                });

    	body += '<upload ng-if="!workbook.length && !loading && importType"></upload>';
    	body += '<div uk-spinner ng-if="loading" class="uk-width-1-1 uk-text-center"></div>';
    	body += '<ul class="uk-list" ng-if="!loading && workbook.length">';
    	body += '	<li ng-repeat="(worksheetIndex , worksheet) in workbook">';
    	body += '		<div class="uk-overflow-auto">';
    	body += '		<table class="uk-table uk-table-divider uk-table-small">';
    	body += '			<thead>';
        body +=	'				<tr>';
        body +=	'					<th></th>';
        body +=	'					<th ng-repeat="(key,header) in worksheet.data[0]" class="uk-link" ng-click="orderBy(key)">{{ key }}</th>';
       	body +=	'					<th></th>';
        body +=	'				</tr>';
        body += '			</thead>';
        body += '			<tbody>';
        body +=	'				<tr ng-repeat="rows in worksheet.data | orderBy:workSheetOrder | filter:search">';
        body +=	'					<td>{{ $index }}</td>';
        body +=	'					<td ng-repeat="column in rows track by $index">'+uikit3.input({model:'column' , cls:'uk-form-small uk-form-blank uk-text-capitalize' , disabled:true})+'</td>';
        body +=	'					<td>'+uikit3.icons([{icon:'close',action:'remove(worksheetIndex,$index)',tooltip:'remove row', cls:'uk-text-danger'}])+'</td>';
        body += '				</tr>';
        body += '			</tbody>';
    	body += '		</table>';
    	body += '		</div>';
		body += '	</li>';
		body += '<ul>';
        body += '</div>';

		header = '<div class="uk-clearfix" ng-if="!loading">';
		header += '<div class="uk-float-left uk-text-uppercase uk-text-small">';
        header += '<span ng-if="importType && !workbook.length"><span uk-icon="icon: {{ importType.icon }}"></span> Import {{ importType.name }}</span>';
        header += '<form class="uk-search uk-search-default" ng-if="importType && workbook.length">';
        header += '<span uk-search-icon></span>';
        header += uikit3.input({cls:'uk-search-input uk-form-small',directive:'ng-model="search"',type:'search',placeholder:'Search {{ importType.name }}'});
        header += '</form>';
        header += '</div>';
		header += '<div class="uk-float-right" ng-if="workbook.length || importType">';
		header += uikit3.icons([
                    {icon:'reply',action:'reset()',cls:'uk-text-danger',tooltip:'reset'},
                    {icon:'cloud-upload',action:'import(importType)',cls:'uk-text-primary',tooltip:'import',directive:'ng-if="workbook.length"'},
                 ]);
		header += '</div>';
		header += '</div>';

		str = uikit3.card({header:header,body:body,classes:{card:'uk-card-default',body:'uk-padding-small',header:'uk-padding-small'}});

    	return str;
    };

    this.parseWorkBook = function(workbook,type){
    	var parsed = [],
            obj = {meta:{}},
            self = this;

    	workbook.forEach(function(worksheet,worksheetKey){

    		parsed[worksheetKey] = [];

            worksheet.header = Object.keys(worksheet.data[0]);

            delete worksheet.header.$$hashKey;

    		worksheet.data.forEach(function(row){
    			
                /*  TO DO PRESEVER IN A METHOD OR SOMETHING FOR THE FUTURE
                    worksheet.header.forEach(function(header){
                    
                    if(header.includes('meta')){
                        
                        var headers = header.split(':'),
                            metaKey = headers.splice(0,1)[0];
                        
                        headers.forEach(function(metaHeader){

                            if(metaHeader.includes('.')){
                                var childKeys  = metaHeader.split('.'),
                                    parentKey = childKeys.splice(0,1)[0];

                                obj[metaKey][parentKey] = {childKeys:''};
                                console.log('subObject',obj[metaKey],parentKey,childKeys);



                            }else{
                                if(row[header].length){ obj[metaKey][metaHeader] =  row[header] };
                            }

                        });

                    }else{
                         if(row[header].length){ obj[header] = row[header] };
                    }
                });*/

                switch(type){
                    case 'user' :   obj = {meta:{address:{}}}; self.parseUsers(worksheet,row,obj); break;
                    //case 'Subjects' :   obj = {meta:{address:{}}}; self.parseUsers(worksheet,row,obj); break;
                    default :   obj = {}; worksheet.header.forEach(function(header){
                                    obj[header] = row[header];
                                }); break;
                }
                

    			parsed[worksheetKey].push(obj);

    		});
    	});

    	return parsed;
    };

    this.parseUsers = function(worksheet,row,data){
        worksheet.header.forEach(function(header){
            if(header === 'firstname' || header === 'lastname' || header === 'email'){
                data[header] = row[header];
            }else if(header === 'address' || header === 'city' || header === 'state' || header === 'zip' || header === 'country'){
                if(row[header].length){ data.meta.address[header] = row[header];}
            }else{
                if(row[header].length){ data.meta[header] = row[header]; }
            }
        });
        return data;
    };

    this.importTypes = function(){

        return [{
            id:1,
            name:'Subjects',
            value:'subject',
            icon:'list',
            description:''
        },{
            id:2,
            name:'Classes',
            value:'coursegrade',
            icon:'grid',
            description:''
        },{
            id:3,
            name:'Curriculum',
            value:'curriculum',
            icon:'thumbnails',
            description:''
        },{
            id:4,
            name:'Teachers',
            value:'user',
            icon:'user',
            description:'',
        },{
            id:5,
            name:'Students',
            value:'user',
            icon:'users',
            description:'',
        },];

    };
  });
