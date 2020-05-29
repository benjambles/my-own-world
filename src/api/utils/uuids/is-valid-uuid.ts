/**
 * Check to see if the provided value is a valid uuid string
 * @param uuid a string to test for validity
 */
export const isValidUUID = (uuid: string): boolean => {
    const re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    return re.test(uuid);
};
