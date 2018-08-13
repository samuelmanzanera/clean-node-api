
# clean-node-api

NodeJS web api using the clean architecture with DDD

## Architecture

The application follows the Uncle Bob "[Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)" principles and project structure or [Hexagonal](http://alistair.cockburn.us/Hexagonal+architecture) or [Onion](https://www.infoq.com/news/2014/10/ddd-onion-architecture) architecture

The following can be used to structure microservices or to have clean startup for REST web api.

### Project structure
```
|app.js => Entry of point of the application
|--core => Business layer
|----domain => Domain model objects such as Entities, Aggregates, Value Objects, Business Events, etc.
|----useCases => Application business rules 
|----exceptions => Application exceptions
|--adapters => Adapters and formatters for use cases and entities to external agency such as Database or the Web
|----controllers => Express controllers
|----middlewares => Express middlewares
|----repositories => Repository implementations
|----security => Security tools implementation (by example JsonWebToken)
|----serializers => Object converters
|--infrastructure
|----database => Database connection, ORM, Query builder, Schema
|----logger => Application looger
|----server => Express server definition
```

## Licence

MIT