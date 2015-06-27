# API Tests

API tests verify conformity to the protocol required for the frontend
application to perform correctly. The JSON schema files that the API is
being tested against are located in the `spec/schemas` directory.

## Running

In order to start the tests the following commands should be issued:

    $ bundle install
    $ bundle exec rake spec

You can override the API key that is used during testing by providing it
via environment:

    FDA_API_KEY=abc123 bundle exec rake spec
