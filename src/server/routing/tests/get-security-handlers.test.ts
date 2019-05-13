// import getSecurityHandlers from '../get-security-handlers';
// import { length } from 'ramda';

// test('getSecurityHandlers', () => {
//     const tests = [[[{ jwt: ['role:admin', 'role:owner'] }], 1], [[], 0]];

//     tests.forEach(([securityMap, result]) => {
//         const map = getSecurityHandlers(securityMap);
//         expect(map.length).toEqual(result);

//         // returns a function matching middlewares signature
//         expect(map.every(middleware => length(middleware) === 2)).toEqual(true);
//     });
// });
