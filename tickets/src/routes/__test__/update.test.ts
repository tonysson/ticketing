import  request  from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose'

it('returns  400 if the provided id is not exist', async() => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`).set('Cookie', global.signin()).send({
        title:'valid_title',
        price: 20
    }).expect(400)
})

it('returns  401 if the user is not authenticated', async() => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`).send({
        title:'valid_title',
        price: 20
    }).expect(401)
})

it('returns  401 if the user does not own the ticket', async() => {
   const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({title: 'valid_title', price: 20})

   await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', global.signin()).send({title: 'valid_title', price: 100}).expect(401)
}) 

it('returns  401 if the user provides an ivalid title or price', async() => {
    const cookie =  global.signin()
    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({title: 'valid_title', price: 20})

    await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: '', 
        price: 20
    }).expect(400)

     await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: 'valid_title', 
        price: -10
    }).expect(400)
})

it('it updated the ticket provided valid inputs', async() => {
    const cookie =  global.signin()
    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({title: 'valid_title', price: 20})

     await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: 'another_valid_title', 
        price: 100
    }).expect(200)

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send()

    expect(ticketResponse.body.title).toEqual('another_valid_title')
    expect(ticketResponse.body.price).toEqual(100)
})



