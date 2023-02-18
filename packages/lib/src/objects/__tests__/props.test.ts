import * as props from '../props.js';
import { test, expect } from '@jest/globals';

test('eqProps', function () {
    expect(props.eqProps('name', { name: 'ben' }, { name: 'ben' })).toEqual(true);
    expect(props.eqProps('name', { name: 'ben' }, { name: 'david' })).toEqual(true);
    expect(props.eqProps('name', { name: 'ben' }, { firstName: 'david' })).toEqual(false);
});

test('getProp', function () {
    expect(props.getProp('name', { name: 'ben' })).toEqual('ben');
});

test('setProp', function () {
    expect(props.setProp('name', 'david', { name: 'ben' })).toEqual({ name: 'david' });
    expect(props.setProp('age', '16', { name: 'ben' })).toEqual({ name: 'david' });
});
