import { buildUrl } from '../fetch.js';

test('buildUrl', function () {
    const rootUrl = 'https://www.fakesite.com';
    const prefix = '/v1';

    expect(buildUrl({ path: '/path-plain', rootUrl, urlParams: {}, prefix: '' })).toEqual(
        new URL('https://www.fakesite.com/path-plain'),
    );

    expect(buildUrl({ path: '/with-prefix', rootUrl, urlParams: {}, prefix })).toEqual(
        new URL('https://www.fakesite.com/v1/with-prefix'),
    );

    expect(
        buildUrl({
            path: '/path-plain',
            rootUrl,
            urlParams: { query: { one: 1, two: 'two', three: ['one', 'two', 'three'] } },
            prefix,
        }),
    ).toEqual(
        new URL(
            'https://www.fakesite.com/v1/path-plain?one=1&two=two&three=one,two,three',
        ),
    );

    expect(
        buildUrl({
            path: '/users/:userId/pages/:pageId',
            rootUrl,
            urlParams: {
                params: { userId: 'uuid-1', pageId: 'pageid-1', notused: 'fake' },
            },
            prefix,
        }),
    ).toEqual(new URL('https://www.fakesite.com/v1/users/uuid-1/pages/pageid-1'));

    expect(
        buildUrl({
            path: '/users/:userId/pages/:pageId',
            rootUrl,
            urlParams: {
                params: { userId: 'uuid-1', pageId: 'pageid-1', notused: 'fake' },
                query: { sort: 'reverse' },
            },
            prefix,
        }),
    ).toEqual(
        new URL('https://www.fakesite.com/v1/users/uuid-1/pages/pageid-1?sort=reverse'),
    );
});
