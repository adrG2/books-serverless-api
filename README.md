# Programmer library


An example of a serverless application using clean architecture. 

The example consists of a CRUD of books that every programmer should read. 
Split serverless application and business logic

## TODO
- [ ] Add DI
- [ ] Implement local infrastructure
- [ ] Add more tests using custom impl and DI

## Deploy 

The AWS SAM CLI is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the AWS SAM CLI, you need the following tools:

* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js 12](https://nodejs.org/en/), including the npm package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application: installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modified IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

### Building of additional layers and Lambda itself

To decrease size of Lambda functions, runtime dependencies are extracted into Lambda Layer.

However, many guides (including Amazon ones) like [1](https://aws.amazon.com/blogs/compute/working-with-aws-lambda-and-lambda-layers-in-aws-sam/) or [2](https://medium.com/@anjanava.biswas/nodejs-runtime-environment-with-aws-lambda-layers-f3914613e20e) propose to move `package.json` to another folder which breaks local development and testing.

To keep local workflow, building of Lambda itself and its layers was changed from default “automagic” of SAM (`sam build` automatically copies code, installs packages, and cleans up, but this process can't be customized) to explicit steps defined in `Makefile` as per [Building layers](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/building-layers.html) doc.

So, now on `sam build` command:
 1. Only `src` folder is copied into function itself (however it is renamed into `dist` and contains TypeScript transpiled to JavaScript).
 2. packages are installed into separate layer (`package-lock.json` is also copied for reference)
 3. Local project layout isn't changed at all.

`sam deploy` will update layer with dependencies only if number or versions of packages were changed.

## Use the AWS SAM CLI to build and test locally

Copy `env.json.sample` to `env.json`:

```sh
cp -n env.json{.sample,}
```

Create some DynamoDB table in AWS console at https://console.aws.amazon.com/dynamodb/home#tables: for local development and write its name into `env.json` (make sure that region in your local configuration matches with console).

**Warning:** Make sure you don't have `.aws-sam` directory (built SAM template), because if you do, `sam local invoke` will use code from it and won't see your code changes.

If you have some kind of Procfile launcher like [Overmind](https://github.com/DarthSim/overmind) (highly recommended!) you can use it to start both TypeScript compiler in watch mode and local API gateway simultaneously:

```bash
$ overmind start
```

And that's it: now you can head over to http://localhost:3000/ to hit `getAllItemsFunction`!

But, sure, you still can start components independently:

Start Typescript compiler in watch mode to recompile your code on change (_instead_ of running `sam build` command).

```bash
$ npm run watch
```

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke putItemFunction --env-vars env.json --event events/event-post-item.json
my-application$ sam local invoke getAllItemsFunction --env-vars env.json --event events/event-get-all-items.json
```

The AWS SAM CLI can also emulate your application's API. Use the `sam local start-api` command to run the API locally on port 3000.

```bash
my-application$ sam local start-api --env-vars=env.json
my-application$ curl -X POST http://localhost:3000/ -d '{"id": "curl1","name": "Created with cURL"}'
my-application$ curl http://localhost:3000/
```
## Unit tests

Tests are defined in the `__tests__` folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name books-api
```