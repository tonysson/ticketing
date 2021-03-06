import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup' , async() => {
    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)
})

it('return  a 400 with an invalid email ' ,async() => {
     return request(app).post('/api/users/signup').send({
        email: 'invalide.email',
        password: 'password'
    }).expect(400)
})

it('return  a 400 with an invalid password ' ,async() => {
     return request(app).post('/api/users/signup').send({
        email: 'invalid',
        password: 'p'
    }).expect(400)
})

it('return  a 400 with no email and password ' ,async() => {
     return request(app).post('/api/users/signup').send({}).expect(400)
})

it('desallows duplicate emails' , async() => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)

    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(400)
})

it('sets a cookie after successful signup', async() => {
   const response =  await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})

