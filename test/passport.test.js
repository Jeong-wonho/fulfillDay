//chai, chai-http require
const chai       = require('chai'),
      nock       = require('nock'),
      chaiHttp   = require('chai-http');

//chai에 chaiHttp 전달
const expect = chai.expect;
chai.use(chaiHttp);

const Users = [
  {
    email : "test@gmail.com",
    password : "1234",
    profile : { name : "happykoo", age : 28 }
  }
];

describe("google login test", () => {
  before("http://google.co.kr/login request mocking", () => {
    nock('http://google.co.kr')
      .post('/login')
      .reply(200, (uri, req, cb) => {
        let user = Users.filter( u => u.email === req.email && u.password === req.password) [0],
            profile = user ? user.profile : null;
        cb(null, profile);
      });
  });

  //chai-http를 이용해 요청 후 테스트
  it("login test", done => {
    chai.request('http://google.co.kr')
        .post('/login')
        .send({ email : Users[0].email, password : Users[0].password })
        .then( res => {
          expect(res.body).to.deep.equal(Users[0].profile);
          done();
        })
        .catch( err => {
          console.error(err);
          done(err);
        })
  });

  //nock 초기화
  after("clean", () => {
    nock.cleanAll();
  })
});