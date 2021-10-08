import supertest from "supertest"
import app from "../server.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import productsRouter from "../services/products/index.js"

dotenv.config() // this is to load the .env file

const request = supertest(app)// this is to test the server
//TEST 1
describe("Testing the testing environment", () => {
    it("should test that true is true", () => {
        expect(true).toBe(true);
    })
})

// Create another test suite
// perform some TDD
//TEST 2
describe("Testing the server", () => {
    // make sure there is an endpoint that is a /test endpoint which will return 200 and a JSON object like the following:
    // { message: "Test success" }

//before running test make sure we are connected to the database
    beforeAll(done => {
        mongoose.connect(process.env.MONGO_URL_TEST) //before running test make sure we are connected to the database
            .then(() => {
                console.log("Connected to Atlas")
                done()//this is to tell the test that the test is done
            })
    })
//after the test is done disconnect from the database
    afterAll(done => {
        mongoose.connection.dropDatabase().then(() => {
            console.log("Test DB dropped")

            mongoose.connection.close().then(() => {
                done()
            })
        })
    })

    // function checkResponse(body) {
    //     const expectation = {
    //         message: "Test success",
    //         name: "Name",
    //         age: 50
    //     }

    //     Object.entries(expectation).forEach(([key, value]) => {
    //         expect(body[key]).toBe(value);
    //     })
    // }

    test("should test that the /test endpoint is OK", async () => {
        const response = await request.get('/test')

        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Test success")
    })

    it("should test that a /nonexistnt endpoint is returning 404", async () => {
        const response = await request.get('/not-existing')

        expect(response.status).toBe(404)
    })

    const validProduct = {
        name: 'iPhone',
        price: 900
    }

    it("should test that a POST /products is returning us a valid product", async () => {
        const response = await request.post('/products').send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

    })

    const invalidProduct = {
        price: 900
    }

    it("should test that a POST /products is returning us an error with an invalid body", async () => {
        const response = await request.post('/products').send(invalidProduct)

        expect(response.status).toBe(400)
        expect(response.body._id).not.toBeDefined()

    })

    it("should test that a GET /products endpoint is returning a valid product", async () => {
        const response = await request.post('/products').send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

        const idResponse = await request.get('/products/' + response.body._id)
        expect(idResponse.body.name).toEqual(validProduct.name)
    })

    it("should that When retrieving the /products/:id endpoint with a non existing id it returns a 404",async () =>{
        
        const response = await request.get('/products/' + '5e9e1b8fdffdd9b9c0017e6e7f8')

        expect(response.status).toBe(404)
    })

    it("When deleting the /products/:id endpoint we should get a 204 status code",async () =>{
       
        const response = await request.delete('/products/' + '615f9dc84fede04d834ffcf7')

        expect(response.status).toBe(204)
    })

})
