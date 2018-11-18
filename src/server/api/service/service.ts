import { cleanData, cloneData, format } from '../../utils';
import * as db from './queries';

export async function getVersionData(): Promise<any> {
    const version = await db.getVersion();
    return cloneData(version);
}
