export class Address{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: [number, number];

    constructor(street: string, suite: string, city: string, zipcode:string, geo: [number, number]){
        this.street = street;
        this.suite = suite;
        this.city = city;
        this.zipcode = zipcode;
        this.geo = geo;
    }
}