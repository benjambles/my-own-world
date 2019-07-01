import formatter from '../formatter';

test('formatter', async () => {
    const model = {
        encrypted: ['email'],
        salted: ['password'],
        readOnly: ['uuid'],
        hmac: ['identity']
    };

    const data = {
        email: 'test@test.com',
        password: 'a-fake-password',
        uuid: '235fwf-f34f43-3f4k3-f34fg-f34ggk',
        identity: 'some-token-value-that-maps'
    };

    const format = formatter(model);
    const result = await format(data);

    expect(result.identity).toEqual(
        '73792f134f627ac5118f468f13c384e54b92dfcd2fff9a2def037d982cff0905'
    );
    expect(result.email).toMatch(/aes-256-cbc:[a-f0-9]{32}:[a-f0-9]{32}/);
    expect(result.password).toMatch(/\$2[aby]?\$\d{1,2}\$[.\/A-Za-z0-9]{53}/);
    expect(result.uuid).toBeUndefined();
});
