export class GET {

    private _keys : Record<string, string> = {};

    constructor(query? : string);

    constructor(keys? : Record<string, string>);

    constructor(arg : string | Record<string, string> = {}) {
        this._keys = typeof arg == 'object' ? arg : GET.parse(arg);
    }

    public query(startSign : boolean = false) : string {
        const props = [];
        for(let name in this._keys) props.push(`${name}=${this._keys[name]}`);
        return `${startSign && props.length > 0 ? '?' : ''}${props.join('&')}`;
    }

    public keys() : Record<string, string> {
        return { ...this._keys };
    }

    public key(name : string) : string {
        return this._keys[name] || '';
    }

    public set(keys : Record<string, string>) : GET;

    public set(name : string, value : string) : GET;

    public set(query : string) : GET;

    public set(keys : string | Record<string, string>, value? : string) : GET {
        if(typeof keys == 'object') {
            for(let name in keys) this._keys[name] = keys[name] || '';
        } else if(value) {
            this._keys[keys] = value || '';
        } else this.set(GET.parse(keys));
        return this;
    }

    public replace(query : string) : GET;

    public replace(keys : Record<string, string>) : GET;

    public replace(arg : string | Record<string, string>) : GET {
        this._keys = typeof arg == 'object' ? arg : GET.parse(arg);
        return this;
    }

    public clear() : GET {
        this._keys = {};
        return this;
    }

    public remove(name : string) : GET {
        if(this._keys.hasOwnProperty(name)) delete this._keys[name];
        return this;
    }

    public static parse(query : string) : Record<string, string> {
        query = GET.clearQuery(query);
        const keys = {};
        const props = query.split('&');
        for(let i = 0; i < props.length; i++) {
            if(!props[i]) continue;
            const temp = props[i].split('=');
            keys[temp[0]] = temp.length > 2 ? temp.splice(1).join('=') : temp[1] || '';
        }
        return keys;
    }

    private static clearQuery(query : string) : string {
        return (query || '')
            .trim()
            .replace(/^[&?]+/g, '')
            .replace(/&+/g, '&')
            .replace(/&+$/g, '');
    }

}