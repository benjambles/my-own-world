import { cleanData, cloneData, format } from "../../../utils";
import * as Security from "../../../utils/security";
import * as db from "./identities-queries";

const model = {
    encrypted: [],
    hashed: ["identity"],
    readOnly: ["uuid"]
};
const formatIdentity = format(model);
const cleanIdentityData = cleanData(formatIdentity);

export async function getByIndentifier(identifier: string) {
    const identifierHash = await Security.encryptValue(identifier);
    const identity = await db.getOne(identifierHash);
    return respond(identity);
}

export async function getByUserId(userId: string, props: dbGet = { limit: 10, offset: 0 }) {
    const identities = await db.getByUserId(userId, props);
    return identities.map(respond);
}

export async function create(data) {
    const cleanData = cleanIdentityData(data);
    const user = await db.create(cleanData);
    return respond(user);
}

export async function update(uuid: string, data) {
    const cleanData = cleanIdentityData(data);
    const user = await db.update(uuid, cleanData);
    return respond(user);
}

export const remove = db.remove;
export const removeAll = db.removeAllByUserId;

/**
 *
 * @param data
 */
function respond(data) {
    const clonedData = cloneData(data);
    clonedData.identifier = Security.decryptValue(clonedData.identifier);

    return clonedData;
}
