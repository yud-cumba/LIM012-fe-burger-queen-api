/* eslint-disable no-console */
// Importar sinon
const sinon = require('sinon');
// Mockear MySQL con sinon
const mockMysql = sinon.mock(require('mysql'));
// Crear stub para connect
const connectStub = sinon.stub().callsFake((cb) => {
  // eslint-disable-next-line no-console
  console.log('connected');
  cb();
});
// Crear stub para query
const queryStub = sinon.stub();
// Crear stub para end
const endStub = sinon.stub();
// Cuando se cree la conexión, reemplazar resultado con stubs
mockMysql.expects('createConnection').returns({
  connect: connectStub,
  query: queryStub,
  end: endStub,
});
// Invocar nuestra libreria/metodos a probar
const db = require('../../db-data/sql_functions');

describe('mySQL', () => {
  /* it('should create a db', (done) => {
    // En cada test podemos reemplazar la funcion a ser llamada
    // usando callsFake
    expect.hasAssertions();
    queryStub.callsFake((query, cb) => {
      expect(query).toBe('CREATE DATABASE mydb');
      // Este callback es el que se espera sea llamado en cada query
      // aqui podemos retornar cualquier información que deseamos
      cb();
      done();
    });
    db.createDb();
  }); */

  /* it('should create a table', (done) => {
    expect.hasAssertions();
    queryStub.callsFake((query, cb) => {
      expect(query).toBe('CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))');
      cb();
      done();
    });
    db.createTable();
  }); */
  it('should insert into a table', (done) => {
    expect.hasAssertions();
    queryStub.callsFake((query, cb) => {
      console.log(query);
      expect(query).toBe("INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')");
      cb();
      done();
    });
    db.postData('users', { email: 'test@cucaracha.test', password: '123456', rolesAdmin: false });
  });
  it('should select from a table', (done) => {
    expect.hasAssertions();
    queryStub.callsFake((query, cb) => {
      expect(query).toBe('SELECT * FROM customers');
      cb(null, 'test result');
      done();
    });
    db.selectFromTable();
  });
  it('should close the connection', (done) => {
    expect.hasAssertions();
    endStub.callsFake(() => {
      expect(endStub.called).toBe(true);
      console.log('connection closed');
      done();
    });
    db.closeConnection();
  });
});
