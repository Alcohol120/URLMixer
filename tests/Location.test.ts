import { Location } from 'URLMixer/Location';

describe('Location', function () {
    describe('url', function () {
        it('Return full url', function () {
            const a = (new Location('') as any);
            a._secure = true;
            a._domain = 'example.com';
            a._uri.replace('foo/bar');
            a._get.replace('foo=bar');
            a._anchor = '#foo';
            expect(a.url(false)).toBe('https://example.com/foo/bar?foo=bar#foo');
        });
        it('Return url without domain', function () {
            const a = (new Location('') as any);
            a._secure = true;
            a._domain = 'example.com';
            a._uri.replace('foo/bar');
            a._get.replace('foo=bar');
            a._anchor = '#foo';
            expect(a.url()).toBe('/foo/bar?foo=bar#foo');
        });
        it('Return url with undefined domain', function () {
            const a = (new Location('') as any);
            a._secure = false;
            a._domain = '';
            a._uri.replace('foo/bar');
            a._get.replace('foo=bar');
            a._anchor = '#foo';
            expect(a.url(false)).toBe('/foo/bar?foo=bar#foo');
        });
    });
    describe('replace', function () {
        it('URL with domain', function () {
            expect(new Location('').replace('http://example.com').url(false)).toBe('http://example.com/');
            expect(new Location('').replace('https://example.com').url(false)).toBe('https://example.com/');
            expect(new Location('').replace('https://example.com/').url(false)).toBe('https://example.com/');
            expect(new Location('').replace('https://example.com/foo/bar').url(false)).toBe('https://example.com/foo/bar');
            expect(new Location('').replace('https://example.com/foo/bar/').url(false)).toBe('https://example.com/foo/bar');
            expect(new Location('').replace('https://example.com/foo/bar?foo=1&bar=2').url(false)).toBe('https://example.com/foo/bar?foo=1&bar=2');
            expect(new Location('').replace('https://example.com/foo/bar?foo=1&bar=2#foo').url(false)).toBe('https://example.com/foo/bar?foo=1&bar=2#foo');
        });
        it('URL without domain', function () {
            expect(new Location('').replace('').url()).toBe('/');
            expect(new Location('').replace('/').url()).toBe('/');
            expect(new Location('').replace('foo/bar').url()).toBe('/foo/bar');
            expect(new Location('').replace('/foo/bar').url()).toBe('/foo/bar');
            expect(new Location('').replace('/foo/bar/').url()).toBe('/foo/bar');
            expect(new Location('').replace('/foo/bar?foo=1&bar=2').url()).toBe('/foo/bar?foo=1&bar=2');
            expect(new Location('').replace('/foo/bar?foo=1&bar=2#foo').url()).toBe('/foo/bar?foo=1&bar=2#foo');
        });
        it('Return itself', function () {
            const a = new Location('');
            expect(a.replace('')).toBe(a);
        });
    });
    describe('setDomain', function () {
        it('Set clean domain', function () {
            expect((new Location('') as any).setDomain('//example.com//')._domain).toBe('example.com');
            expect((new Location('') as any).setDomain(' //example.com// ')._domain).toBe('example.com');
        });
        it('Return itself', function () {
            const a = new Location('');
            expect(a.setDomain('')).toBe(a);
        });
    });
    describe('withURI', function () {
        it('Manipulate with URI', function () {
            const a = new Location('foo/bar?foo=1&bar=2');
            const r = a.withURI(uri => { uri.append('first').append('second') }).url();
            expect(r).toBe('/foo/bar/first/second?foo=1&bar=2');
        });
        it('Return itself', function () {
            const a = new Location('foo/bar');
            expect(a.withURI(uri => uri.append('foo'))).toBe(a);
        });
    });
    describe('withGET', function () {
        it('Manipulate with GET', function () {
            const a = new Location('foo/bar?foo=1&bar=2');
            const r = a.withGET(get => { get.remove('bar').set('second', '2') }).url();
            expect(r).toBe('/foo/bar?foo=1&second=2');
        });
        it('Return itself', function () {
            const a = new Location('foo/bar');
            expect(a.withGET(get => get.set('second', '2'))).toBe(a);
        });
    });
    describe('setAnchor', function () {
        it('Set anchor', function () {
            expect((new Location('') as any).setAnchor('foo')._anchor).toBe('#foo');
            expect((new Location('') as any).setAnchor('#foo')._anchor).toBe('#foo');
        });
        it('Return itself', function () {
            const a = new Location('');
            expect(a.setAnchor('')).toBe(a);
        });
    });
});