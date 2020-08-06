/* eslint-disable max-len */
// const { getAllData, getDataByKeyword, postData } = require('../../db-data/sql_functions');
/* describe('Delete data', () => {
  it('deberia eliminar ', async () => {
    expect(
      await db.query(sql`SELECT id, name FROM users WHERE name=${'Joe'}`),
    ).toEqual(
      [{ id: expect.any(Number), name: 'Joe' }],
    );
  });
}); */

/* describe('Quering Sql Functions', () => {
  it('Should return all data from a table ', (done) => getAllData('users')
    .then((result) => {
      expect(Array.isArray(result)).toBe(true);
      done();
    }));
 // eslint-disable-next-line max-len
 it('Should return data when a specific condition is true ', (done) => getDataByKeyword('users', 'email', 'admin@host.host')
    .then((result) => {
      expect(Array.isArray(result)).toBe(true);
      //   expect(result).toBe([{ id: expect.any(Number), email: 'admin@host.host' }]);
      done();
    }));
  it('Should add a record to a table', (done) => postData('users', { email: 'newUser@host.host' })
    .then((result) => {
      expect(typeof result.insertId).toBe('number');
      done();
    }));
}); */
