# The Books Context

Book domain modelling using clean architecture

## Layers

### Application layer

The scope of this layer is for use cases or application services. 

In this practical example, it has been decided that it is not necessary to implement any use cases because it is not worthwhile for simplification.

### Domain

* Domain objects
* Value Objects
* Repository(ports)

### Infrastructure

In this layer, infrastructure solutions will be implemented.

* DynamoDB
* SQS