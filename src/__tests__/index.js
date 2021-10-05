import supertest from "supertest"
import app from "../server.js"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const request = supertest(app)

describe("Testing the testing environment", () => {
    it("should test that true is true", () => {
        expect(true).toBe(true);
    })
})

// Create another test suite
// perform some TDD

describe("Testing the server", () => {
    // make sure there is an endpoint that is a /test endpoint which will return 200 and a JSON object like the following:
    // { message: "Test success" }

    beforeAll(done => {
        mongoose.connect(process.env.MONGO_URL_TEST)
            .then(() => {
                console.log("Connected to Atlas")
                done()
            })
    })

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




})


