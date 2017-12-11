# How to Start

1. Run `npm install`
2. Run `npm start`
3. Point browser to `http://localhost:9000`

* MongoDB version: 3.4.10
* Node version: 8.6.0

# GSTV Full Stack Coding Exercise

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

* [Exercise Overview](#exercise-overview)
* [Functionality](#functionality) -
  [List of Site Flags for an Individual Site](#list-of-site-flags-for-an-individual-site) -
  [Ability to Add or Edit Site Flags for an Individual Site](#ability-to-add-or-edit-site-flags-for-an-individual-site)
* [What We Are Looking For](#what-we-are-looking-for)
* [Technical Details](#technical-details) -
  [Required Technology](#required-technology) -
  [Version Control](#version-control) -
  [GitFlow and GithubFlow](#gitflow-and-githubflow) -
  [Submitting Your Work](#submitting-your-work) - [JavaScript](#javascript) -
  [Unit Testing](#unit-testing)

<!-- /TOC -->

## Exercise Overview

The site - an individual gas station - is the most atomic piece of the GSTV
business model - it is at the core of everything we do. Our hardware is
installed at the site, advertisers purchase impressions at a site level, and
schedules are generated on a per-site basis. Thus, keeping accurate information
about a site is essential successful business operations.

We are asking you to build out the client and server-side functionality to
create, edit and view flags for multiple sites. GSTV uses flags as a way to
identify sites of particular importance - we may be doing research at the site,
it may be near a key advertisers' offices, or our CEO may be taking clients for
a site visit. Knowing which sites are flagged helps us focus and prioritize if
something has gone wrong.

**Some things to keep in mind**

* A site may have multiple flags
* A site flag may have a start date but not an end date
* A site flag may have an end date, but not a start date
* A site flag may have both an end date and a start date

**You do not need to worry about**

* Authorization or authentication
* Deployment

## Functionality

### List of Site Flags for an Individual Site

* **What the user will see**
  * If the site has valid site flags
    * For each flag
      * Flag Type
      * Start Date
      * Edit Date
      * Edit Button
      * Remove Button
      * Rules
        * Only display site flags in the list if they are
          * Permanent - there is not an end date
          * Current - the startdate is in the past and the end date is in the
            future
          * Future - the startdate and enddate are in the future
    * Add Flag Button
    * Close Button
  * If the site does not have valid site flags
    * Message
      * There are no site flags.
    * Add Flag Button
    * Close Button
* **How things should work**
  * Edit Button
    * Allows the user to edit the information for an individual site flag
  * Remove Button
    * Removes selected site flag
    * Prompts user with modal
      * Message
        * Do you want to remove {item}?
      * Continue Button
        * Check for
          * Malformed Data Validation
            * If any required items are not formatted as expected
              * Submit fails
                * Message displayed to the user
                  * Unable to Create/Update: {itemName} {itemValue} does not
                    match the expected format.
          - If server-side validation passes
            * Update data
            * Modal is removed and the view will reflect changes from the
              action.
      * Cancel Button
        * Modal is removed
  * Add Flag Button
    * Allows a user to add a new site flag
  * Close Button
    * The user is returned to where they were when they started and the view
      does not reflect any changes

### Ability to Add or Edit Site Flags for an Individual Site

* **What the user will see**
  * Flag Type
    * **Required to submit**
    * Select
      * Possible Values
        * Advertiser - Location Priority
        * Retailer - Location Priority
        * Retailer - Showcase
        * GSTV - Site Visit
        * GSTV - Showcase
        * GSTV - Nielsen Survey
        * GSTV - Research Survey
        * GSTV - Unsellable
  * Start Date
    * Datepicker
      * Is not required to submit
      * If end date is provided
        * The start date must be before end date
  * End Date
    * Datepicker
      * Is not required to submit
      * If start date is provided
        * The end date must be after start date
        * The end date must be today or in the future
  * Close Button
  * Submit Button
* **How things should work**
  * Close Button
    * User is returned to the spot where they started and the view does not
      reflect any changes
  * Submit Button
    * Validation
      * Start Date/End Date Validation
        * If the start date falls after the end date
          * Message
            * Unable to Create/Update: The start date must be before the end
              date
        * If the end date falls before the start date
          * Message
            * Unable to Create/Update: The start date must be before the date
              time
        * If the start date falls on the same date as the end date
          * Message
            * Unable to Create/Update: The start date may not be the same date
              as the end date
      * Null Validation
        * If any required items are null
          * Submit fails
            * Message displayed to the user
              * Unable to Create/Update: {itemName} is required.
      * Malformed Data Validation
        * If any required items are not formatted as expected
          * Submit fails
            * Message displayed to the user
              * Unable to Create/Update: {itemName} {itemValue} does not match
                the expected format.
      - If validation passes
        * Update data
        * User is returned to the list of site flags which now reflects
          new/updated data

## What We Are Looking For

We will be examining your Git repository prior to your interview. We will be
looking at code quality, cleaniless, organization as well as how you implement
the packaging of the application. Please do not use an automated app creator.

We will ask for you to demonstrate the functionality during the interview.

Please include the version of Node and MongoDB that you used in your pull
request.

## Technical Details

### Required Technology

You must use

* ES2015 funtionality
* React
* Redux
* Node.js
* MongoDB

### Version Control

#### GitFlow and GithubFlow

We use
[GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/)
on a daily basis - this allows us to build quality control into our development,
QA and deployment process.

We are asking that you use a modified
[Github Flow](https://guides.github.com/introduction/flow/) - sometimes referred
to as a
[feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) -
methodology instead of GitFlow. Conceptually, GitFlow and Github flow are
similar.

#### Submitting Your Work

Please fork our repository and use a feature branch workflow while developing
your functionality. When you are ready to submit your work make a
[pull request against our repository](https://help.github.com/articles/using-pull-requests/).

### JavaScript

#### Unit Testing

Please feel free to create unit tests - we use
[Mocha](https://github.com/mochajs/mocha).
