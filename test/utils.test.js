var utils = require('../lib/utils.js');

test('Codify String Function', () => {
    expect(utils.codifyString('test')).toBe('`test`');
});