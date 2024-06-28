import {expect} from 'chai';//et non const {expect} =require ('chai)'
import request from 'supertest';
const route = "http://localhost:3000";
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUser(res){
    expect(res.statusCode).to.equal(200)
    //  console.log("🚀 ~ user:", user)
    expect(res.body).to.be.an('object');
    //  console.log("🚀 ~ .then ~ res.body:", res.body) 
    expect(res.body.name).to.be.a('string')
    expect(res.body.email).to.be.a('string')
    expect(isValidEmail(res.body.email)).to.be.true;
    expect(res.body.passWord).to.be.a('string')
}






// duplicated user
const user1 = {
    name: 111,
    email:"safwen@gmail.com",
    passWord:"aaa"

};
// new user
const user3 = {
    name: 111,
    email:"gkh78385@ilebi.com",
    passWord:"aaa"

};
// registration user
describe('Test Register User',  () => {
    it('It should return validUser',function () {
        return request(route)
            .post(`/user/register`)
            .send(user3)
            .then((res) => {
                isValidUser(res)
            });                   
    });

   
      

})
//  duplicated user
describe("duplicated user ",function(){
    it('It should return 409 status',function () {
        return request(route)
            .post(`/user/register`)
            .send(user1)
            .then((res) => {
                expect(res.statusCode).to.equal(409)
               
            });
                
                
    });
})


const activationCode1="ucw0ZQZgTewFCqVunxnlbQnxz" // coreespondant a l'email safwene.essayes@ensi-uma.tn
const activationCode2="rgrhgtht5"

// mail confirmation
describe("mail confirmation",function(){
    it('It should return 200 status',function () {
        return request(route)
            .get(`/user/confirmation/${activationCode1}`)
            //.send(user1) not data sent at GET method
            .then((res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.message).to.equal("compte activé")
               
            });
                
                
    });
    it('It should return 404 status',function () {
        return request(route)
        .get(`/user/confirmation/${activationCode2}`)
            .then((res) => {
                expect(res.statusCode).to.equal(404)
               
            });
                
                
    });

})



// login



/*isActive:false*/
const usr1 = {
    name: 111,
    email:"safwen@gmail.com",
    passWord:"aaa"

};
/*valid user*/
const usr2 = {
    name: 111,
    email:"safwene.essayes@ensi-uma.tn",
    passWord:"aaa"

};
/*mdp ou email inexistant)*/
const usr = {
    name: 111,
    email:"safwgenkk@gmail.com",
    passWord:"aaa"

};


describe("login verification",function(){
    it('It should return 404 status',function () {
        return request(route)
        .post(`/user/login`)
        .send(usr/*mdp ou email inexistant)*/)
        .then((res) => {
            console.log("🚀 ~ .then ~ res:", res.statusCode)
         expect(res.statusCode).to.equal(404)
          

        });         
         
    });

    it('It should return 401 status',function () {
        return request(route)
        .post(`/user/login`)
        .send(usr1/*isActive:false*/)
        .then((res) => {
         expect(res.statusCode).to.equal(401)
         expect(res.body.token).to.equal(null)
         


        });         
        
    });
    it('It should return 200 status',function () {
        return request(route)
        .post(`/user/login`)
        .send(usr2/*valid user*/)
        .then((res) => {
         expect(res.statusCode).to.equal(200) ;
         token= res.body.token
         console.log("🚀 ~ .then ~ res.body.token:", res.body.token)

        });         
    });
})

let adminToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhZndlbmUuZXNzYXllc0BlbnNpLXVtYS50biIsIl9pZCI6IjY2N2Q2YjVjZDUxZjVhODA1ZWZhZGE0YiIsInJvbGUiOiI2NjYzMGI5YTJlOTJlZTQ0MjBlN2I1YTciLCJpYXQiOjE3MTk1MDA3NjEsImV4cCI6MTcxOTg2MDc2MX0.1vUmQaDy_t2XeoSjg7WcWEOvJfawH0rGbjcF8ZF1DP4" //valid
const adminToken1="" //invalid
const testuser = {
    name: 111,
    email:"safweneessayess@gmail.com",
    passWord:"aaa"

};
// ajouter des users par l'admin
describe("ajouter des users par l'admin",function(){
    it('It should return 200 status',function () {
        return request(route)
        .post(`/user/adduser`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testuser/*valid user*/)
        .then((res) => {
 
         isValidUser(res)

        });         
    }); 

    it('It should return 401 status',function () {
        return request(route)
        .post(`/user/adduser`)
        .set('Authorization', `Bearer ${adminToken1}`)
        .send(testuser/*n'est pas un admin(n'a pas le droit de créer user)*/)
        .then((res) => {
         expect(res.statusCode).to.equal(401) 
         

        });         
    }); 
      
    
})




