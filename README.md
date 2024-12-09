# NodeJS Backend Engineer Code Challenge

Use the included Database and mock API to create a basic microservice that exposes a simple REST API. For this exercise, the goal is to demonstrate your ability to write clean production quality code. Assume that this microservice will support a high volume of calls. You will be evaluated on how easy your code would be to maintain in an enterprise production setting.

For questions and clarifications please email **disco-interview-aaaanlpvobzxmxyxb4hivwphna@dat-solutions.slack.com**

We want to be mindful of your time and appreciate you taking the DAT NodeJS assessment! You will not "lose points" if you cannot scale this to production quality, but we hope that in your technical interview you will at least be able to speak to what changes you might want to add if this were to be scaled for an enterprise production environment.

## Setup

This project has been set up to use [npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) for dependency management.

The application is running Node Version `18.15.0`.

The following dependencies have been included:

- [axios](https://www.npmjs.com/package/axios)
- [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter#readme)
- [LokiJs](https://github.com/techfort/LokiJS)
- [Jest](https://www.npmjs.com/package/jest)

Additionally, express and typescript have also been included.

The JEST unit test framework has added with a minimal example test. Feel free to add whatever tests you might want to include. Also feel free to organize the files in project in any manner you see fit.

## Requirements

Your task is to create the *Company Postings API*. The *Company Postings API* will map/filter fields and data to/from the existing *Posting API*, enriching the returned postings on a new API endpoint with information from the associated Company DB. Essentially -- you will be creating a new API that will take the data from the Postings API, filter and enrich it with information from the Company DB.

The Postings API (`posting-api/posting-api-mock-server.ts`) already exists and contains a large list of records pertaining to freight postings on the platform. 

**Be sure demonstrate how you contribute production code to support long term maintenance of the product.**

### 1) Create a new REST endpoint on the *Company Postings API* to query the *Posting API* and filter postings based on the equipmentType and/or fullPartial properties. Take those results and then convert the companyId field to a company name using the DB. For the API endpoint, use the supplied call. The following data should be returned:

- postings.companyName
- postings.freight.weightPounds
- postings.freight.equipmentType
- postings.freight.fullPartial
- postings.freight.lengthFeet

### 2) Create an endpoint to create a new posting record with the following. The only required fields are:

- postings.companyName
- postings.freight.weightPounds
- postings.freight.equipmentType
- postings.freight.fullPartial
- postings.freight.lengthFeet

Please upload your result to HackerRank and ensure that the project runs.

***Be prepared to discuss your work in your upcoming Technical Interview, and Good Luck!***
