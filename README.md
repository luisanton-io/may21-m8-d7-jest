# may21-m8-d7-jest

M8 D2 HOMEWORK
Using a TDD approach, create a simple service that allows you to build your custom store.

Start from today’s project: fork the repo and create a develop branch
Create a Continuous Delivery pipeline on Heroku for this project
deploy the current master in production
Activate automatic builds for the development app from the develop branch
Don’t forget to add all TEST, REVIEW, STAGING and PRODUCTION environment vars.
When the pipeline is correctly setup, start writing these tests and their implementation:
When retrieving the /products/:id endpoint with a non existing id:
expect requests to be 404
When deleting the /products/:id endpoint:
expect successful 204 response code
When updating a /product/:id endpoint with new data:
expect requests to be accepted.
Expect the response.body.name to be changed
Expect the typeof name in response.body to be “string”
Remember to keep three separate apps:

Review automatically deployed from develop branch.
Staging automatically deployed from master branch.
Production deployed when promoted from staging.
We’ll promote your staging app to production together during debrief.

Good luck! :D
