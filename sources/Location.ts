import { URI } from 'URLMixer/URI';
import { GET } from 'URLMixer/GET';

export class Location {

    private _secure : boolean;
    private _domain : string;
    private _uri : URI;
    private _get : GET;
    private _anchor : string;

    public get secure() : boolean {
        return this._secure;
    }

    public get domain() : string {
        return this._domain;
    }

    public get uri() : URI {
        return this._uri;
    }

    public get get() : GET {
        return this._get;
    }

    public get anchor() : string {
        return this._anchor;
    }

    constructor(url : string) {
        this.replace(url);
    }

    public url(local : boolean = true) : string {
        const addr = `${!local && this._domain ? `http${this._secure ? 's' : ''}://${this._domain}` : ''}`;
        return `${addr}${this._uri.path()}${this._get.query(true)}${this._anchor}`;
    }

    public replace(url : string) : Location {
        const parts = url.match(/^(http(s)?:\/{2}(.*?)(\/|$))?(.*?)(\?.*?)?(#.*?)?$/) || [];
        this._secure = !!parts[2];
        this._domain = parts[3] || '';
        this._uri = new URI(parts[5] || '');
        this._get = new GET(parts[6] || '');
        this._anchor = parts[7] || '';
        return this;
    }

    public setSecure(secure : boolean) : Location {
        this._secure = secure;
        return this;
    }

    public setDomain(domain : string) : Location {
        this._domain = domain
            .trim()
            .replace(/^\/+/, '')
            .replace(/\/+$/, '');
        return this;
    }

    public withURI(callback : Function) : Location {
        callback(this._uri);
        return this;
    }

    public withGET(callback : Function) : Location {
        callback(this._get);
        return this;
    }

    public setAnchor(anchor : string) : Location {
        if(anchor && anchor.charAt(0) !== '#') anchor = `#${anchor}`;
        this._anchor = anchor;
        return this;
    }

}