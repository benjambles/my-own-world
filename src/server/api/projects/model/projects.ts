import * as r from "ramda";

import * as queries from "../queries/projects";

const config = require("../config.json");

export async function get(uuid: string): Promise<any> {
    const project = await queries.get(uuid);
    return sanitize(project);
}

export async function getMany(limit: number = 10, offset: number = 0): Promise<any> {
    const projects = await queries.getMany(limit, offset);
    return projects.map(sanitize);
}

export async function create(data): Promise<any> {
    const project = await queries.create(data);
    return sanitize(project);
}

export async function update(uuid: string, data): Promise<any> {
    const project = await queries.update(uuid, data);
    return sanitize(project);
}

export async function remove(uuid: string): Promise<boolean> {
    return await queries.remove(uuid);
}

/**
 * Function used for ensuring that sensitive data is not returned to the API.
 * For example stripping out private properties such as passwords.
 */
const sanitize = r.curry((schema: any, data: any): any => {
    return data;
});

const sanitizeProject = sanitize(config.schemas.project);
