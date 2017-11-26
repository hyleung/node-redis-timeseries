declare module 'hal' {
    export interface Href {
        href:string
    }
    export interface Link {
        toJSON():object
        toXML():string
    }
    export interface Resource {
        link(link:Link): Resource;
        embed(rel:string, resource:Resource, pluralize:boolean):Resource
        toJSON(indent:number):object
    }
    export function Link(rel:string, href:Href):Link
    export function Resource(object:object, uri:string):Resource
}
