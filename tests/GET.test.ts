import { GET } from 'URLMixer/GET';

describe('GET', function () {
    describe('constructor', function () {
        it('Create props from string', function () {
            expect(new GET('foo=1&bar=2').query()).toBe('foo=1&bar=2');
            expect(new GET('foo=1&bar=').query()).toBe('foo=1&bar=');
            expect(new GET('foo=1&bar').query()).toBe('foo=1&bar=');
        });
        it('Create props from object', function () {
            expect(new GET({ foo: '1', bar: '2' }).query()).toBe('foo=1&bar=2');
            expect(new GET({ foo: '1', bar: '' }).query()).toBe('foo=1&bar=');
        });
    });
    describe('query', function () {
        it('Return a query string', function () {
            expect(new GET('foo=1&bar=2').query()).toBe('foo=1&bar=2');
        });
        it('Return a query string with start question sign', function () {
            expect(new GET('foo=1&bar=2').query(true)).toBe('?foo=1&bar=2');
        });
    });
    describe('key', function () {
        it('Return specific value', function () {
            expect(new GET('foo=1&bar=2').key('bar')).toBe('2');
        });
        it('Return empty string for undefined key', function () {
            expect(new GET('foo=1&bar=2').key('miss')).toBe('');
            expect(new GET('foo=&bar=2').key('foo')).toBe('');
            expect(new GET('foo&bar=2').key('foo')).toBe('');
        });
    });
    describe('set', function () {
        it('Set/replace keys from object', function () {
            expect(new GET('foo=1&bar=2').set({ foo: '3', second: '4' }).query()).toBe('foo=3&bar=2&second=4');
            expect(new GET('foo=1&bar=2').set({ foo: '3', second: '' }).query()).toBe('foo=3&bar=2&second=');
        });
        it('Set/replace keys from string', function () {
            expect(new GET('foo=1&bar=2').set('foo=3&second=4').query()).toBe('foo=3&bar=2&second=4');
            expect(new GET('foo=1&bar=2').set('foo=3&second=').query()).toBe('foo=3&bar=2&second=');
            expect(new GET('foo=1&bar=2').set('foo=3&second').query()).toBe('foo=3&bar=2&second=');
        });
        it('Add single key', function () {
            expect(new GET('foo=1&bar=2').set('second', '3').query()).toBe('foo=1&bar=2&second=3');
            expect(new GET('foo=1&bar=2').set('second', '').query()).toBe('foo=1&bar=2&second=');
        });
        it('Replace single key', function () {
            expect(new GET('foo=1&bar=2').set('foo', '3').query()).toBe('foo=3&bar=2');
            expect(new GET('foo=1&bar=2').set('foo', '').query()).toBe('foo=&bar=2');
        });
        it('Return itself', function () {
            const a = new GET('foo=1&bar=2');
            expect(a.set('foo', '3')).toBe(a);
        });
    });
    describe('replace', function () {
        it('Replace all keys from object', function () {
            expect(new GET('foo=1&bar=2').replace({ second: '1' }).query()).toBe('second=1');
            expect(new GET('foo=1&bar=2').replace({ second: '' }).query()).toBe('second=');
        });
        it('Replace all keys from string', function () {
            expect(new GET('foo=1&bar=2').replace('second=1').query()).toBe('second=1');
            expect(new GET('foo=1&bar=2').replace('second=').query()).toBe('second=');
            expect(new GET('foo=1&bar=2').replace('second').query()).toBe('second=');
        });
        it('Return itself', function () {
            const a = new GET('foo=1&bar=2');
            expect(a.set('second=1')).toBe(a);
        });
    });
    describe('remove', function () {
        it('Remove a specific key', function () {
            expect(new GET('foo=1&bar=2').remove('foo').query()).toBe('bar=2');
        });
        it('Return itself', function () {
            const a = new GET('foo=1&bar=2');
            expect(a.remove('foo')).toBe(a);
        });
    });
    describe('parse', function () {
        it('Parse string and return object', function () {
            expect(GET.parse('foo=1&bar=2')).toEqual({ foo: '1', bar: '2' });
            expect(GET.parse('foo=1&bar=')).toEqual({ foo: '1', bar: '' });
            expect(GET.parse('foo=1&bar')).toEqual({ foo: '1', bar: '' });
        });
        it('Parse equals sign in value', function () {
            expect(GET.parse('foo=some=text&bar=2')).toEqual({ foo: 'some=text', bar: '2' });
        });
        it('Return empty object from empty string', function () {
            expect(Object.keys(GET.parse('')).length).toBe(0);
        });
    });
    describe('clearQuery', function () {
        it('Clear query string', function () {
            expect((GET as any).clearQuery('?foo=1'));
            expect((GET as any).clearQuery(' ?foo=1 '));
            expect((GET as any).clearQuery(' ??&&foo=1&&bar=1 '));
            expect((GET as any).clearQuery(' ??&&foo=1&&bar=1&& '));
        });
    });
});