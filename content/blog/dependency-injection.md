---
title: Summary of 'Dependency Injection Principles, Practices, and Patterns' from  Steven
  van Deursen and Mark Seemann
description: Notes from Dependency Injection Principles, Practices, and Patterns.
date: 2025-08-18
tags:
- software-design
- DI
type: blog
permalink: content/blog/dependency-injection
---

# Dependency Injection

### Overview

An important element of DI is to break up various responsibilities into separate classes. One responsibility that we take away from classes is the task of creating instances of *Dependencies*.

### Object Composition

To harvest the benefits of extensibility, testability, late binding and parallel development, you must be able to compose classes into applications.

*Object composition* is often the primary motivation for introducing DI into an application. Many refer to DI as **inversion of control** (IOC).

#### Composition Root

> Where we should compose object graphs.

**WARNING**: Using a DI container outside the composition root leads to the service locator anti-pattern.

The composition root acts as third party that connects consumers with their services. 

In an application, the composition root should be the sole place that knows about the structure of the constructed object graphs. Application code not only relinquishes control over its dependencies, it also relinquishes knowledge about its dependencies. 

**NOTE**: Only the composition root should have a reference to the DI Container and it should only be referenced from the composition root.

*Constructor injection* is the most generally applicable DI pattern available. 

**Dependencies** should hardly ever be optional.

*Null object pattern* allows a consumer's dependency to always be available, even in the absence of any real implementation.

*Method injection*. In cases where a dependency can vary with each method call, or the consumer of such a dependency can vary on each call, you can supply a dependency via a method parameter.

*Property injection* When a class has a good local default, but you still want to leave it open for extensibility, you can expose a writable property that allows a client to supply a different implementation of the class's dependency than the default.

#### DI Container

A DI Container is a software library that provides DI functionality and automates many of the tasks involved in object composition, interception and lifetime management. 

```csharp
public void Register<T>()
public T Resolve<T>(T type);
```

### Object Lifetime

A class that has surrendered control of its dependencies gives up more than the power to select particular implementations of an *Abstraction*, but also the power to control when instances are created and when they go out of scope.

### Interception

When we delegate control over dependencies to a third party, we also provide the power to modify them before we pass them on to the classes consuming them.

> = Decorator design pattern

### SOLID Principles

1. **Single Responsibility Principle**
   - SRP states that every class should have a single reason to change.
2. **Open/Closed Principle**
   - OCP prescribes an application design that prevents you from having to make sweeping changes throughout the code base.
   - A class should be open for extension but closed for modification.
3. **Liskov Substitution Principle**
   - Allows you to replace the originally intended implementation with another implementation of the same *abstraction*.
4. **Interface Segregation Principle (ISP)**
   - ISP promotes the use of fine-grained abstractions, rather than wide abstractions. 
   - Any time a consumer depends on an abstraction where some of its members are unused, the ISP is violated.
5. **Dependency Inversion Principle (DIP)**
   - The principle states that you should program against abstractions, and that the consuming layer should be in control of the shape of a consumed abstraction.

### Configuring DI

| Type                  | Description                                                                              | Advantages                                                                                                                                | Disadvantages                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Configuration files   | Mappings are specified in configuration files (typically in XML or JSON format)          | - Supports replacement without recompilation                                                                                              | - No compile-time checks<br>- Verbose and brittle                               |
| CONFIGURATION AS CODE | Code explicitly determines mappings                                                      | - Compile-time checks<br>- High degree of control                                                                                         | - No support for replacement without recompilation                              |
| AUTO-REGISTRATION     | Rules are used to locate suitable components using reflection and to build the mappings. | - Supports replacement without recompilation<br>- Less effort required<br>- Helps enforce conventions to make a code base more consistent | - No compile-time checks<br>- Less control<br>- May seem more abstract at first |

### Anti-patterns

**Definition**: An anti-pattern is a commonly occurring solution to a problem which generates decidedly negative consequences.

| Anti-pattern      | Description                                                                 |
| ------------------| ----------------------------------------------------------------------------|
| CONTROL FREAK       | As opposed to INVERSION OF CONTROL, DEPENDENCIES are controlled directly.   |
| SERVICE LOCATOR     | An implicit service can serve DEPENDENCIES to consumers, but it isn't guaranteed to do so. |
| AMBIENT CONTEXT     | Makes a single DEPENDENCY available through a static accessor.              |
| CONSTRAINED CONSTRUCTION | Constructors are assumed to have a particular signature.               |

### Dependency Lifetime

**Definition**: A Lifestyle is a formalized way of describing the intended lifetime of a dependency.

| Name        | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| SINGLETON   | A single instance is perpetually reused.                                    |
| TRANSIENT   | New instances are always served.                                            |
| SCOPED      | At most, one instance of each type is served per an implicitly or explicitly defined scope. |

#### Singleton Lifestyle

Within the scope of a single composer, there'll only be one instance of a component with the singleton lifestyle. Each and every time a consumer requests the component, the same instance is served.

The difference between this and Singleton design pattern is that the latter provides a global point of access to its instance, which is similar to the ambient context anti-pattern.

#### Transient Lifestyle

The transient lifestyle involves returning a new instance every time it's requested. 

#### Scoped Lifestyle

The scoped dependencies behave like singleton dependencies within a single, well-defined scope or request but aren't shared across scopes.

The scoped lifestyle makes sense for long-running applications that are tasked with processing operations that need to run with some degree of isolation.