import { URI } from 'URLMixer/URI';

describe('URI', function () {
    describe('constructor', function () {
        it('Create segments from string', function () {
            expect(new URI('foo/bar').path()).toBe('/foo/bar');
        });
        it('Create segments from array', function () {
            expect(new URI(['foo', 'bar']).path()).toBe('/foo/bar');
        });
    });
    describe('path', function () {
        it('Return URI path string', function () {
            expect(new URI('foo/bar').path()).toBe('/foo/bar');
        });
        it('Return URI path string without start slash', function () {
            expect(new URI('foo/bar').path(false)).toBe('foo/bar');
        });
    });
    describe('segment', function () {
        it('Return specific segment', function () {
            expect(new URI('foo/bar').segment(1)).toBe('foo');
            expect(new URI('foo/bar').segment(2)).toBe('bar');
        });
    });
    describe('insertAt', function () {
        it('Insert segments from string', function () {
            expect(new URI('foo/bar').insertAt(0, 'f/b').path()).toBe('/f/b/foo/bar');
            expect(new URI('foo/bar').insertAt(1, 'f/b').path()).toBe('/f/b/foo/bar');
            expect(new URI('foo/bar').insertAt(2, 'f/b').path()).toBe('/foo/f/b/bar');
            expect(new URI('foo/bar').insertAt(5, 'f/b').path()).toBe('/foo/bar/f/b');
        });
        it('Insert segments from array', function () {
            expect(new URI('foo/bar').insertAt(0, ['f', 'b']).path()).toBe('/f/b/foo/bar');
            expect(new URI('foo/bar').insertAt(1, ['f', 'b']).path()).toBe('/f/b/foo/bar');
            expect(new URI('foo/bar').insertAt(2, ['f', 'b']).path()).toBe('/foo/f/b/bar');
            expect(new URI('foo/bar').insertAt(5, ['f', 'b']).path()).toBe('/foo/bar/f/b');
        });
        it('Return itself', function () {
            const a = new URI('foo/bar');
            expect(a.insertAt(1, 'b')).toBe(a);
        });
    });
    describe('replaceAt', function () {
        it('Replace segments from string', function () {
            expect(new URI('foo/bar').replaceAt(0, 'f/b').path()).toBe('/f/b');
            expect(new URI('foo/bar').replaceAt(1, 'f/b').path()).toBe('/f/b');
            expect(new URI('foo/bar').replaceAt(2, 'f/b').path()).toBe('/foo/f/b');
            expect(new URI('foo/bar').replaceAt(3, 'f/b').path()).toBe('/foo/bar/f/b');
            expect(new URI('foo/bar/foo1/bar1').replaceAt(2, 'f/b').path()).toBe('/foo/f/b/bar1');
        });
        it('Replace segments from array', function () {
            expect(new URI('foo/bar').replaceAt(0, ['f', 'b']).path()).toBe('/f/b');
            expect(new URI('foo/bar').replaceAt(1, ['f', 'b']).path()).toBe('/f/b');
            expect(new URI('foo/bar').replaceAt(2, ['f', 'b']).path()).toBe('/foo/f/b');
            expect(new URI('foo/bar').replaceAt(3, ['f', 'b']).path()).toBe('/foo/bar/f/b');
            expect(new URI('foo/bar/foo1/bar1').replaceAt(2, ['f', 'b']).path()).toBe('/foo/f/b/bar1');
        });
        it('Return itself', function () {
            const a = new URI('foo/bar');
            expect(a.replaceAt(1, 'b')).toBe(a);
        });
    });
    describe('prepend', function () {
        it('Prepend segments from string', function () {
            expect(new URI('foo/bar').prepend('f/b').path()).toBe('/f/b/foo/bar');
        });
        it('Prepend segments from array', function () {
            expect(new URI('foo/bar').prepend(['f', 'b']).path()).toBe('/f/b/foo/bar');
        });
        it('Return itself', function () {
            const a = new URI('foo/bar');
            expect(a.prepend('f/b')).toBe(a);
        });
    });
    describe('append', function () {
        it('Prepend segments from string', function () {
            expect(new URI('foo/bar').append('f/b').path()).toBe('/foo/bar/f/b');
        });
        it('Prepend segments from array', function () {
            expect(new URI('foo/bar').append(['f', 'b']).path()).toBe('/foo/bar/f/b');
        });
        it('Return itself', function () {
            const a = new URI('foo/bar');
            expect(a.append('f/b')).toBe(a);
        });
    });
    describe('replace', function () {
        it('Replace all segments from string', function () {
            expect(new URI('foo/bar').replace('f/b').path()).toBe('/f/b');
        });
        it('Replace all segments from array', function () {
            expect(new URI('foo/bar').replace(['f', 'b']).path()).toBe('/f/b');
        });
        it('Return itself', function () {
            const a = new URI('foo/bar');
            expect(a.replace('f/b')).toBe(a);
        });
    });
    describe('parse', function () {
        it('Return segments from string', function () {
            expect(URI.parse('foo/bar')).toEqual([ 'foo', 'bar' ]);
        });
    });
    describe('clearPath', function () {
        it('Return segments from string', function () {
            expect((URI as any).clearPath('/foo/bar')).toBe('foo/bar');
            expect((URI as any).clearPath('//foo///bar//')).toBe('foo/bar');
            expect((URI as any).clearPath(' //foo///bar// ')).toBe('foo/bar');
        });
    });
});