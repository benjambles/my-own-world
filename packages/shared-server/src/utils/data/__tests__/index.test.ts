import { formatData, getDataFormatter } from '../index.js';

test('formatData', async () => {
    const model = {
        encrypted: ['email'],
        salted: ['password'],
        readOnly: ['_id'],
        hmac: ['identity'],
    };

    const data = {
        email: 'test@test.com',
        password: 'a-fake-password',
        _id: '235fwf-f34f43-3f4k3-f34fg-f34ggk',
        identity: 'some-token-value-that-maps',
    };
    const ENC_SECRET = 'XApHrj7g9FTPqX5hYxWiJuXHYewyygGG';
    const format = formatData(getDataFormatter(ENC_SECRET, model));
    const result = await format(data);

    expect(result.identity).toEqual(
        '73792f134f627ac5118f468f13c384e54b92dfcd2fff9a2def037d982cff0905',
    );
    expect(result.email).toMatch(/aes-256-cbc:[a-f0-9]{32}:[a-f0-9]{32}/);
    expect(result.password).toMatch(/\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}/);
    expect(result._id).toBeUndefined();
});

test('getDataFormatter', async () => {
    const formatNoModel = getDataFormatter('XApHrj7g9FTPqX5hYxWiJuXHYewyygGG');

    const noModelUUID = await formatNoModel('_id', '235fwf-f34f43-3f4k3-f34fg-f34ggk');
    expect(noModelUUID).toEqual(null);

    const noModelEmail = await formatNoModel('email', 'test@test.com');
    expect(noModelEmail).toEqual('test@test.com');

    const model = {
        encrypted: ['email'],
        salted: ['password'],
        readOnly: ['_id'],
        hmac: ['identity'],
    };

    const format = getDataFormatter('XApHrj7g9FTPqX5hYxWiJuXHYewyygGG', model);

    const hasModelHmac = await format('identity', 'some-token-value-that-maps');
    expect(hasModelHmac).toEqual(
        '73792f134f627ac5118f468f13c384e54b92dfcd2fff9a2def037d982cff0905',
    );

    const hasModelEncrypt = await format('email', 'test@test.com');
    expect(hasModelEncrypt).toMatch(/aes-256-cbc:[a-f0-9]{32}:[a-f0-9]{32}/);

    const hasModelSalt = await format('password', 'a-fake-password');
    expect(hasModelSalt).toMatch(/\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}/);

    const hasModelReadOnly = await format('_id', '235fwf-f34f43-3f4k3-f34fg-f34ggk');
    expect(hasModelReadOnly).toBeNull();
});
