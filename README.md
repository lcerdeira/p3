## Project 3 Overview

This app allows you create an organic food Shopping Cart


* MYSQL with an ORM(sequelize) on an Expressjs server using Nodejs with the MVC model. 
* This application performes all CRUD operations into a MYSQL database. 


# View Demo  

To view demo click on this link: https://p2idea.herokuapp.com/

# Getting Started Locally 

To get the Node server running locally:

- Clone this repo ([GIT](https://github.com/lcerdeira/p2idea))
- Install Nodejs on your Mac ([Download](https://github.com/lcerdeira/p2idea))
- `npm install` to install all required dependencies
- Check credentials the .sql file locally and make sure the credentials match up. 
- `node server.js` to start the node application.


# Code Overview

## Dependencies
- [body-parser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework (for servers) for node.
- [path](https://www.npmjs.com/package/path) - This is an exact copy of the NodeJS ’path’ module published to the NPM registry.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env file
- [handlebars](https://www.npmjs.com/package/handlebars) - andlebars provides the power necessary to let you build semantic templates effectively with no frustration
- [mysql](https://www.npmjs.com/package/mysql) - A node.js driver for mysql. It is written in JavaScript

## Dev Dependencies

- [nodmon](https://www.npmjs.com/package/nodemon) - nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

## Application MVC Structure

- `server.js` - The entry point to our application for the customer user type.
- `routes.js` - Entry point for the applications routes.
- `/views` - Applications template files using handlebars.
- `/routes` - The routes of this application.
- `/public` - All public facing assets are in this directory.
- `/models` - The application models for use with ORM.
- `/db` - Starter database files.
- `/controllers` - Most of the application's logic for requests and responses are done in this directory. 
- `/config` - Database configuration. 
- 
ThyphiNET

![Code Count](https://img.shields.io/github/languages/count/kelwyres/Kleborate_viz)
![Main Code Base](https://img.shields.io/github/languages/top/kelwyres/Kleborate_viz)
![License](https://img.shields.io/badge/License-GPL%20v3-blue)
![Version](https://img.shields.io/badge/version-1.0-red)
![Last Commit](https://img.shields.io/github/last-commit/kelwyres/Kleborate_viz)
![Open Issues](https://img.shields.io/github/issues-raw/kelwyres/Kleborate_viz)
![Repo Size](https://img.shields.io/github/repo-size/kelwyres/Kleborate_viz)

## Table of Contents

  * [Description](#Description)
  * [Demonstration](#Demonstration)
  * [Installation](#Installation)
  * [License](#License)
  * [Version](#Version)
  * [Questions](#Questions)


## Description 

......

## Installation

## Demonstration

![TyphiNET usage demo](assets/videos/video.gif)


## Contact

TyphiNET is under active development

Please get in touch via the GitHub issues tracker if you have any issues, questions or ideas.

For more on our lab, including other software, see [Holtlab](https://holtlab.net/).