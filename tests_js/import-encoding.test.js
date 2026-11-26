/**
 * Real-world CSVs exported from Excel are often UTF-16, which the backend
 * rejects with a Chinese 400. The browser now normalises them to UTF-8.
 */
const test = require('node:test');
const assert = require('node:assert');
const { SRC } = require('./_extract');

function loadNormalizer() {
    const start = SRC.indexOf('async function _normalizeCsvFile');
    assert.notEqual(start, -1);
    const stop = SRC.indexOf('\nasync function ', start + 10);
    const code = SRC.slice(start, stop);

    class FakeDecoder {
        constructor(enc) { this.enc = enc; }
        decode(bytes) {
            let out = '';
            const le = this.enc === 'utf-16le';
            for (let i = 2; i + 1 < bytes.length; i += 2) {
                out += String.fromCharCode(le ? bytes[i] : bytes[i + 1] * 256 + bytes[i]);
            }
            return out;
        }
    }
    class FakeEncoder {
        encode(text) {
            return new Uint8Array(Array.from(text).map(c => c.charCodeAt(0) & 0xff));
        }
    }
    class FakeBlob {
        constructor(parts) {
            this.text = parts.map(p => typeof p === 'string' ? p
                : Array.from(p).map(b => String.fromCharCode(b)).join('')).join('');
        }
    }
    return new Function('TextDecoder', 'TextEncoder', 'Blob',
        code + '\nreturn _normalizeCsvFile;')(FakeDecoder, FakeEncoder, FakeBlob);
}

function utf16File(header) {
    const bytes = [0xFF, 0xFE];
    for (const c of header) bytes.push(c.charCodeAt(0), 0);
    return { name: 'excel.csv', arrayBuffer: async () => new Uint8Array(bytes).buffer };
}

test('UTF-16 CSV with BOM is converted to UTF-8 before upload', async () => {
    const normalize = loadNormalizer();
    const out = await normalize(utf16File('name,country\nProbe,Germany\n'));
    assert.notEqual(out.name, 'excel.csv', 'a Blob is returned for UTF-16');
    assert.match(out.text, /^name,country/);
    assert.doesNotMatch(out.text, /[\uFFFE]/);
});

test('ordinary UTF-8 CSV is passed through untouched', async () => {
    const normalize = loadNormalizer();
    const file = { name: 'plain.csv', arrayBuffer: async () => new TextEncoder().encode('name\nX').buffer };
    const out = await normalize(file);
    assert.equal(out, file);
});
