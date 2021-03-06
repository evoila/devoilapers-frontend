/**
 * Operator Automation Backend API
 * Operator Automation Backend API overview.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { DtosHTTPErrorDto } from '../model/dtosHTTPErrorDto';
import { DtosServiceStoreItemFormDto } from '../model/dtosServiceStoreItemFormDto';
import { DtosServiceStoreItemYamlDto } from '../model/dtosServiceStoreItemYamlDto';
import { DtosServiceStoreOverviewDto } from '../model/dtosServiceStoreOverviewDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ServicestoreService {

    protected basePath = 'https://127.0.0.1:8080/api/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get the json form for a service-template
     * Get the default yaml file for a service-template
     * @param servicetype Type of service
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public servicestoreFormServicetypeGet(servicetype: string, observe?: 'body', reportProgress?: boolean): Observable<DtosServiceStoreItemFormDto>;
    public servicestoreFormServicetypeGet(servicetype: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DtosServiceStoreItemFormDto>>;
    public servicestoreFormServicetypeGet(servicetype: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DtosServiceStoreItemFormDto>>;
    public servicestoreFormServicetypeGet(servicetype: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (servicetype === null || servicetype === undefined) {
            throw new Error('Required parameter servicetype was null or undefined when calling servicestoreFormServicetypeGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<DtosServiceStoreItemFormDto>(`${this.basePath}/servicestore/form/${encodeURIComponent(String(servicetype))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Lists all possible deployable services
     * Lists all possible deployable services
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public servicestoreInfoGet(observe?: 'body', reportProgress?: boolean): Observable<DtosServiceStoreOverviewDto>;
    public servicestoreInfoGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DtosServiceStoreOverviewDto>>;
    public servicestoreInfoGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DtosServiceStoreOverviewDto>>;
    public servicestoreInfoGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<DtosServiceStoreOverviewDto>(`${this.basePath}/servicestore/info`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get the yaml for a service
     * Get the yaml for a service based on the filled form and the user data
     * @param formresult Form-Result
     * @param servicetype Type of service
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public servicestoreYamlServicetypePost(formresult: string, servicetype: string, observe?: 'body', reportProgress?: boolean): Observable<DtosServiceStoreItemYamlDto>;
    public servicestoreYamlServicetypePost(formresult: string, servicetype: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DtosServiceStoreItemYamlDto>>;
    public servicestoreYamlServicetypePost(formresult: string, servicetype: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DtosServiceStoreItemYamlDto>>;
    public servicestoreYamlServicetypePost(formresult: string, servicetype: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (formresult === null || formresult === undefined) {
            throw new Error('Required parameter formresult was null or undefined when calling servicestoreYamlServicetypePost.');
        }

        if (servicetype === null || servicetype === undefined) {
            throw new Error('Required parameter servicetype was null or undefined when calling servicestoreYamlServicetypePost.');
        }

        let headers = this.defaultHeaders;

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<DtosServiceStoreItemYamlDto>(`${this.basePath}/servicestore/yaml/${encodeURIComponent(String(servicetype))}`,
            formresult,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
