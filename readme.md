# Meteor + AngularJS generator [![Build Status](https://travis-ci.org/ndxbxrme/generator-angular-meteor.svg)](https://travis-ci.org/ndxbxrme/generator-angular-meteor)

> Yeoman generator for creating Meteor + AngularJS applications - hit the ground running.  
> Based on [angular meteor tutorial](http://angular-meteor.com/tutorial), which is well worth spending a few of hours on

## Usage

Install `generator-angular-meteor`:
```
npm install -g generator-angular-meteor
```

Run `yo angular-meteor appName`
```
yo angular-meteor appName
```

cd into the new directory to run `meteor` commands or to create subcomponents

## Prerequisites

* Meteor
    - *windows* -  Download and Install [Meteor](https://www.meteor.com/)
    - *linux/mac* - `curl https://install.meteor.com/ | sh`

## Supported Configurations

* Scripts: `JavaScript`, `CoffeeScript`
* Markup:  `HTML`, `Jade`
* Stylesheets: `CSS`, `Stylus`, `Less`, `SCSS`
* CSS frameworks: `None`, `Bootstrap`, `Angular Material`, `Ionic`
* Authentication boilerplate: `Yes`, `No`
* oAuth integrations: `Facebook` `Twitter` `Google`
* Pagination, sorting and searching support: `Yes`, `No`

## Generators

Available generators:

    - [angular-meteor](#app) (aka [angular-meteor:app](#app))
    - [angular-meteor:model](#model)
    - [angular-meteor:method](#method)
    - [angular-meteor:route](#route)
    - [angular-meteor:controller](#controller)
    - [angular-meteor:view](#view)
    - [angular-meteor:filter](#filter)
    - [angular-meteor:directive](#directive)
    - [angular-meteor:factory](#service)
    - [angular-meteor:decorator](#decorator)

### App
Sets up a new AngularJS + Meteor app, generating all the boilerplate you need to get started.

Example:
```bash
yo angular-meteor myApp
```

### Model
Generates a new database collection.


Example:
```bash
yo angular-meteor:model products
[?] Is this a protected model? Yes
```

Produces:

    model/products.model.coffee
    server/products.publish.coffee
    server/startup/products.load.coffee

### Method
Generates a new meteor method.


Example:
```bash
yo angular-meteor:method invite
```

Produces:

    methods/invite.method.coffee

### Route
Generates a new route with optional model and list/detail routes

Example:
```bash
yo angular-meteor:route products
[?] Where would you like to create this route? client/
[?] Is this a protected route? No
[?] Would you like to make List/Details routes? Yes
[?] Would you like to create a Model? Yes
```

Produces:

    client/products/products.routes.ng.coffee
    client/products/products-list.controller.ng.coffee
    client/products/products-list.view.ng.jade
    client/products/product-detail.controller.ng.coffee
    client/products/product-detail.view.ng.jade
    client/products/products.styl
    model/products.model.coffee
    server/products.publish.coffee
    server/startup/products.load.coffee


### Controller
Generates a controller.

Example:
```bash
yo angular-meteor:controller user
[?] Where would you like to create this controller? client/
```

Produces:

    client/user/user.controller.ng.coffee

### Directive
Generates a directive.

Example:
```bash
yo angular-meteor:directive myDirective
[?] Where would you like to create this directive? client/components/
[?] Does this directive need an external html file? Yes
```

Produces:

    client/components/my-directive/my-directive.directive.ng.coffee
    client/components/my-directive/my-directive.ng.jade
    client/components/my-directive/my-directive.styl

### Filter
Generates a filter.

Example:
```bash
yo angular-meteor:filter myFilter
[?] Where would you like to create this filter? client/components/
```

Produces:

    client/components/my-filter/my-filter.filter.ng.coffee

### Decorator
Generates an AngularJS service decorator.

Example:
```bash
yo angular-fullstack:decorator serviceName
[?] Where would you like to create this decorator? client/components/
```

Produces

    client/components/service-name/service-name.decorator.ng.coffee


## Meteor Components

The following packages are always installed by the [app](#app) generator:

* angular-meteor
* ui.router

These packages are installed optionally depending on your configuration:

* angular-material
* bootstrap
* angular-ui-bootstrap
* publish-counts
* pagination
* fourseven:scss
* flemay:less-autoprefixer
* mquandalle:stylus
* coffeescript
* civilframe:angular-jade

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

A `.yo-rc` file is generated for helping you copy configuration across projects, and to allow you to keep track of your settings. You can change this as you see fit.

## Testing

Still needs doing, let me know if you think you can help

## Contributing

Please see [CONTRIBUTING.md](/CONTRIBUTING.md)

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
  
heavily inspired by [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)
