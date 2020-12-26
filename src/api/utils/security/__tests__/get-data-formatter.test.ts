import { some } from 'ts-option';
import { getDataFormatter } from '../get-data-formatter';

test('getDataFormatter', async () => {
    const formatNoModel = getDataFormatter('XApHrj7g9FTPqX5hYxWiJuXHYewyygGG', {});

    const noModelUUID = await formatNoModel('uuid', '235fwf-f34f43-3f4k3-f34fg-f34ggk');
    expect(noModelUUID.isEmpty).toEqual(true);

    const noModelEmail = await formatNoModel('email', 'test@test.com');
    expect(noModelEmail.isDefined).toEqual(true);

    const model = {
        encrypted: ['email'],
        salted: ['password'],
        readOnly: ['uuid'],
        hmac: ['identity'],
    };

    const format = getDataFormatter('XApHrj7g9FTPqX5hYxWiJuXHYewyygGG', model);

    const hasModelHmac = await format('identity', 'some-token-value-that-maps');
    expect(hasModelHmac).toEqual(
        some('73792f134f627ac5118f468f13c384e54b92dfcd2fff9a2def037d982cff0905'),
    );

    const hasModelEncrypt = await format('email', 'test@test.com');
    expect(hasModelEncrypt.orNull).toMatch(/aes-256-cbc:[a-f0-9]{32}:[a-f0-9]{32}/);

    const hasModelSalt = await format('password', 'a-fake-password');
    expect(hasModelSalt.orNull).toMatch(/\$2[aby]?\$\d{1,2}\$[./A-Za-z0-9]{53}/);

    const hasModelReadOnly = await format('uuid', '235fwf-f34f43-3f4k3-f34fg-f34ggk');
    expect(hasModelReadOnly.orNull).toBeNull();
});
