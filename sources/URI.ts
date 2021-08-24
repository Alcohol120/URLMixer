export class URI {

    private _segments : string[] = [];

    constructor(path? : string);

    constructor(segments? : string[]);

    constructor(arg : string | string[] = []) {
        this._segments = typeof arg == 'object' ? arg : URI.parse(arg);
    }

    public path(startSign : boolean = true) : string {
        return `${startSign ? '/' : ''}${this._segments.join('/')}`;
    }

    public segments() : string[] {
        return [ ...this._segments ];
    }

    public segment(number : number) : string {
        number = number > 0 ? number - 1 : 0;
        return this._segments.length > number ? this._segments[number] : '';
    }

    public insertAt(number : number, path : string) : URI;

    public insertAt(number : number, segments : string[]) : URI;

    public insertAt(number : number, arg : string | string[]) : URI {
        number = number > 0 ? number - 1 : 0;
        if(number > this._segments.length) number = this._segments.length;
        if(typeof arg == 'string') arg = URI.parse(arg);
        this._segments.splice(number, 0, ...arg);
        return this;
    }

    public replaceAt(number : number, path : string) : URI;

    public replaceAt(number : number, segments : string[]) : URI;

    public replaceAt(number : number, arg : string | string[]) : URI {
        number = number > 0 ? number - 1 : 0;
        if(number > this._segments.length) number = this._segments.length;
        if(typeof arg == 'string') arg = URI.parse(arg);
        this._segments.splice(number, arg.length, ...arg);
        return this;
    }

    public prepend(path : string) : URI;

    public prepend(segments : string[]) : URI;

    public prepend(arg : string | string[]) : URI {
        if(typeof arg == 'string') arg = URI.parse(arg);
        this._segments.unshift(...arg);
        return this;
    }

    public append(path : string) : URI;

    public append(segments : string[]) : URI;

    public append(arg : string | string[]) : URI {
        if(typeof arg == 'string') arg = URI.parse(arg);
        this._segments.push(...arg);
        return this;
    }

    public replace(path : string) : URI;

    public replace(segments : string[]) : URI;

    public replace(arg : string | string[]) : URI {
        this._segments = typeof arg == 'object' ? arg : URI.parse(arg);
        return this;
    }

    public clear() : URI {
        this._segments = [];
        return this;
    }

    public static parse(path : string) : string[] {
        path = URI.clearPath(path);
        return path ? path.split('/') : [];
    }

    private static clearPath(path : string) : string {
        return path
            .trim()
            .replace(/\/+/g, '/')
            .replace(/^\//, '')
            .replace(/\/$/, '');
    }

}