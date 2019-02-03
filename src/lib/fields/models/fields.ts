// import * as _ from 'lodash';
// import * as moment from 'moment';
//
// import { CharFieldComponent } from '../components/char-field/char-field.component';
// import { CharFieldParamsComponent } from '../components/char-field/char-field-params/char-field-params.component';
// import { BooleanFieldComponent } from '../components/boolean-field/boolean-field.component';
// import { TranslatableFieldComponent } from '../components/translatable-field/translatable-field.component';
// import { SelectFieldComponent } from '../components/select-field/select-field.component';
// import { ForeignKeyFieldComponent } from '../components/foreign-key-field/foreign-key-field.component';
// import { DateTimeFieldComponent } from '../components/date-time-field/date-time-field.component';
// import { JsonFieldComponent } from '../components/json-field/json-field.component';
// import { FileFieldComponent } from '../components/file-field/file-field.component';
// import { ImageFieldComponent } from '../components/image-field/image-field.component';
// import { ImageFieldParamsComponent } from '../components/image-field/image-field-params/image-field-params.component';
// import { SqlFieldComponent } from '../components/sql-field/sql-field.component';
// import { CodeFieldComponent } from '../components/code-field/code-field.component';
// import { IconFieldComponent } from '../components/icon-field/icon-field.component';
// import { ModelDescriptionFieldComponent } from '../components/model-description-field/model-description-field.component';
// import { FiltersFieldComponent } from '../components/filters-field/filters-field.component';
// import { SelectFieldParamsComponent } from '../components/select-field/select-field-params/select-field-params.component';
// import { FormField } from './form-field';
// import {
//   containsFieldLookup, endsWithFieldLookup, exactFieldLookup, gteFieldLookup, gtFieldLookup, inFieldLookup,
//   isNullFieldLookup, lteFieldLookup, ltFieldLookup, startsWithFieldLookup
// } from './lookups';
//
// export interface FieldDescription {
//   types: string[];
//   name: string;
//   label: string;
//   component: any;
//   paramsComponent?: any;
//   lookups: { type: any, field: string, fieldParams?: string[], extraParams?: Object }[];
//   fieldParams?: {};
//   defaultValue: any;
//   emptyValue?: any;
//   valueToStr?: (value: string, field: FormField, context: Object) => string; // TODO: refactor
// }
//
// export const fieldDescriptions: FieldDescription[] = [
//   {
//     types: ['BooleanField'],
//     name: 'boolean',
//     label: 'Boolean Field',
//     component: BooleanFieldComponent,
//     lookups: [
//       { type: exactFieldLookup, field: 'BooleanField' }
//     ],
//     defaultValue: false
//   },
//   {
//     types: ['TranslatableField'],
//     name: 'translatable',
//     label: 'Translatable Field',
//     component: TranslatableFieldComponent,
//     lookups: [
//       { type: containsFieldLookup, field: 'CharField' },
//       { type: exactFieldLookup, field: 'CharField' },
//       { type: startsWithFieldLookup, field: 'CharField' },
//       { type: endsWithFieldLookup, field: 'CharField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'CharField' }
//     ],
//     defaultValue: ''
//   },
//   {
//     types: ['SelectField'],
//     name: 'select',
//     label: 'Select Field',
//     component: SelectFieldComponent,
//     paramsComponent: SelectFieldParamsComponent,
//     lookups: [
//       { type: exactFieldLookup, field: 'SelectField', fieldParams: ['options'] },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'SelectField', fieldParams: ['options'] }
//     ],
//     defaultValue: undefined
//   },
//   {
//     types: ['ForeignKey'],
//     name: 'related_model',
//     label: 'Related Model',
//     component: ForeignKeyFieldComponent,
//     lookups: [
//       { type: exactFieldLookup, field: 'ForeignKey', fieldParams: ['related_model'], extraParams: { actions: false } },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'ForeignKey', fieldParams: ['related_model'], extraParams: { actions: false } }
//     ],
//     defaultValue: undefined,
//     valueToStr: (value, field, context) => {
//       if (value !== undefined && value !== null) {
//         if (context['model']) {
//           return context['model'].__str__;
//         } else {
//
//         }
//       } else {
//         return '---';
//       }
//     }
//   },
//   {
//     types: ['DateTimeField'],
//     name: 'datetime',
//     label: 'Date/Time Field',
//     component: DateTimeFieldComponent,
//     lookups: [
//       { type: gteFieldLookup, field: 'DateTimeField' },
//       { type: gtFieldLookup, field: 'DateTimeField' },
//       { type: lteFieldLookup, field: 'DateTimeField' },
//       { type: ltFieldLookup, field: 'DateTimeField' },
//       { type: exactFieldLookup, field: 'DateTimeField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'DateTimeField' }
//     ],
//     defaultValue: undefined,
//     valueToStr: (value, field) => {
//       if (!value) {
//         return;
//       }
//
//       const params = _.merge({}, { date: true, time: true }, field.params);
//       let format: string;
//
//       if (params['date'] && !params['time']) {
//         format = 'DD.MM.YYYY';
//       } else if (!params['date'] && params['time']) {
//         format = 'HH:mm:ss';
//       } else {
//         format = 'DD.MM.YYYY HH:mm:ss';
//       }
//
//       return moment(value).format(format);
//     }
//   },
//   {
//     types: ['DateField'],
//     name: 'date',
//     label: 'Date Field',
//     component: DateTimeFieldComponent,
//     lookups: [
//       { type: gteFieldLookup, field: 'DateField' },
//       { type: gtFieldLookup, field: 'DateField' },
//       { type: lteFieldLookup, field: 'DateField' },
//       { type: ltFieldLookup, field: 'DateField' },
//       { type: exactFieldLookup, field: 'DateField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'DateField' }
//     ],
//     fieldParams: {
//       date: true,
//       time: false
//     },
//     defaultValue: undefined,
//     valueToStr: (value, field) => {
//       if (!value) {
//         return;
//       }
//
//       const params = _.merge({}, { date: true, time: true }, field.params);
//       let format: string;
//
//       if (params['date'] && !params['time']) {
//         format = 'DD.MM.YYYY';
//       } else if (!params['date'] && params['time']) {
//         format = 'HH:mm:ss';
//       } else {
//         format = 'DD.MM.YYYY HH:mm:ss';
//       }
//
//       return moment(value).format(format);
//     }
//   },
//   {
//     types: ['TimeField'],
//     name: 'time',
//     label: 'Time Field',
//     component: DateTimeFieldComponent,
//     lookups: [
//       { type: gteFieldLookup, field: 'TimeField' },
//       { type: gtFieldLookup, field: 'TimeField' },
//       { type: lteFieldLookup, field: 'TimeField' },
//       { type: ltFieldLookup, field: 'TimeField' },
//       { type: exactFieldLookup, field: 'TimeField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'TimeField' }
//     ],
//     fieldParams: {
//       date: false,
//       time: true
//     },
//     defaultValue: undefined,
//     valueToStr: (value, field) => {
//       if (!value) {
//         return;
//       }
//
//       const params = _.merge({}, { date: true, time: true }, field.params);
//       let format: string;
//
//       if (params['date'] && !params['time']) {
//         format = 'DD.MM.YYYY';
//       } else if (!params['date'] && params['time']) {
//         format = 'HH:mm:ss';
//       } else {
//         format = 'DD.MM.YYYY HH:mm:ss';
//       }
//
//       return moment(value).format(format);
//     }
//   },
//   {
//     types: ['JSONField'],
//     name: 'json',
//     label: 'JSON Field',
//     component: JsonFieldComponent,
//     lookups: [
//       { type: containsFieldLookup, field: 'CharField' },
//       { type: exactFieldLookup, field: 'CharField' },
//       { type: startsWithFieldLookup, field: 'CharField' },
//       { type: endsWithFieldLookup, field: 'CharField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'CharField' }
//     ],
//     defaultValue: '{}',
//     valueToStr: (value, field) => {
//       return '[Data]';
//     }
//   },
//   {
//     types: ['FileField'],
//     name: 'file',
//     label: 'File Field',
//     component: FileFieldComponent,
//     lookups: [
//
//     ],
//     defaultValue: ''
//   },
//   {
//     types: ['ImageField'],
//     name: 'image',
//     label: 'Image Field',
//     component: ImageFieldComponent,
//     paramsComponent: ImageFieldParamsComponent,
//     lookups: [
//
//     ],
//     defaultValue: null
//   },
//   {
//     types: ['SqlField'],
//     name: 'sql',
//     label: 'Sql Field',
//     component: SqlFieldComponent,
//     lookups: [
//       { type: containsFieldLookup, field: 'CharField' },
//       { type: exactFieldLookup, field: 'CharField' },
//       { type: startsWithFieldLookup, field: 'CharField' },
//       { type: endsWithFieldLookup, field: 'CharField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'CharField' }
//     ],
//     defaultValue: ''
//   },
//   {
//     types: ['CodeField'],
//     name: 'code',
//     label: 'Code Field',
//     component: CodeFieldComponent,
//     lookups: [
//       { type: containsFieldLookup, field: 'CharField' },
//       { type: exactFieldLookup, field: 'CharField' },
//       { type: startsWithFieldLookup, field: 'CharField' },
//       { type: endsWithFieldLookup, field: 'CharField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'CharField' }
//     ],
//     defaultValue: ''
//   },
//   {
//     types: ['IconField'],
//     name: 'icon',
//     label: 'Icon Field',
//     component: IconFieldComponent,
//     lookups: [
//       { type: exactFieldLookup, field: 'CharField' },
//       { type: startsWithFieldLookup, field: 'CharField' },
//       { type: endsWithFieldLookup, field: 'CharField' },
//       { type: inFieldLookup, field: 'CharField' }
//     ],
//     defaultValue: undefined
//   },
//   {
//     types: ['ModelDescriptionField'],
//     name: 'model_description',
//     label: 'Model Description Field',
//     component: ModelDescriptionFieldComponent,
//     lookups: [
//       { type: exactFieldLookup, field: 'ModelDescriptionField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'ModelDescriptionField' }
//     ],
//     defaultValue: undefined
//   },
//   {
//     types: ['CharField', 'TextField'],
//     name: 'text',
//     label: 'Text Field',
//     component: CharFieldComponent,
//     paramsComponent: CharFieldParamsComponent,
//     lookups: [
//       { type: containsFieldLookup, field: 'CharField' },
//       { type: exactFieldLookup, field: 'CharField' },
//       { type: startsWithFieldLookup, field: 'CharField' },
//       { type: endsWithFieldLookup, field: 'CharField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'CharField' }
//     ],
//     defaultValue: '',
//     valueToStr: (value, field) => {
//       return value;
//     }
//   },
//   {
//     types: ['IntegerField', 'FloatField', 'DecimalField'],
//     name: 'number',
//     label: 'Number Field',
//     component: CharFieldComponent,
//     lookups: [
//       { type: exactFieldLookup, field: 'IntegerField' },
//       { type: gteFieldLookup, field: 'IntegerField' },
//       { type: gtFieldLookup, field: 'IntegerField' },
//       { type: lteFieldLookup, field: 'IntegerField' },
//       { type: ltFieldLookup, field: 'IntegerField' },
//       { type: isNullFieldLookup, field: 'BooleanField' },
//       { type: inFieldLookup, field: 'IntegerField' }
//     ],
//     defaultValue: '',
//     emptyValue: null,
//     valueToStr: (value, field) => {
//       return value;
//     }
//   },
//   {
//     types: ['FiltersField'],
//     name: 'filters',
//     label: 'Filters Field',
//     component: FiltersFieldComponent,
//     lookups: [
//
//     ],
//     defaultValue: []
//   },
// ];
// const defaultFieldType = 'CharField';
//
// export function getFieldDescriptionByType(type: string): FieldDescription {
//   const field = fieldDescriptions.find(item => item.types.indexOf(type) != -1);
//
//   if (!field) {
//     return getFieldDescriptionByType(defaultFieldType);
//   }
//
//   return field;
// }
