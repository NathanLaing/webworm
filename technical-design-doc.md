# Technical Design Document

## Context and Scope
This document covers the design of a static web app that maintains a list of bookmarks.
This app is intended to showcase technical skills as a demo and is not intended for production.

# Goals and non-goals
- The user is able to add/edit/delete any link in the list
- The links should be valid and exist
- There should be pagination with 20 links  per page
- The links should persist on reload
- Only frontend technologies should be used (i.e. no database) 
- Adding a link should take the user to a success page with a link back to the main page

# Design
## Pages
### Overview
The overview component is responsible for the `overview/:page` which uses the `:/page` segment to determine which page is shown.

On this page there is:
- The form + validation for adding a new bookmark
- The list of 20 bookmark components based on the page
- The pagination controls

#### Considerations
The form logic could be extracted out of this page and into it's own component.
There should be a route guard against accessing pages that don't exist.

### Results
The results component is responsible for the `bookmark/:id` which uses the `:/id` segment to determine which bookmark is shown.

On this page there is:
- A 'Thank You' message for the submission
- The link submitted
- A link back to the overview page

#### Considerations
There should be a route guard on this page - either protecting it from being accessed if the `id` doesn't exist or only allowing the user to see it directly after they add the entry.

## Components
### App
The app is made of a shell component which contains the `<app-header>` and `<router-outlet>`.
### Header
The `app-header` component which contains the title "Webworm" and a picture of a book worm.
### Bookmark
The `app-bookmark` component which is responsible for rendering an editable, deletable bookmark with URL validation.
#### Considerations
If the form logic from the `overview` page was split out, the edit logic here could potentially re-use some of it.

## Services
### Book Keeper
This is the core service used to create, read, update and delete bookmarks.
It uses the browser local storage as it's underlying form of "database".
It uses the `Date.now()` timestamp as an id/key.
It maintains a readonly list of bookmarks in the form of a `signal()`.
This allows components to use the bookmarks and automatically get changes when the `bookmarks` list changes.

#### Considerations
The service has two sources of truth: the `bookmarks` signal and the `localStorage` object.
The `localStorage` is the actual source of truth, however the `bookmarks` list allows us to avoid re-reading and re-parsing a potentially large list of items from disk repeatedly.
An improvement could be made to add a `get` method which first checked for the existence of the item in the `bookmarks` list and then tried local storage.
This would mean all CRUD operations would have a public method and `getFromStorage` and `getAllFromStorage` could be made `private`.

When the service is initialised _all_ keys are read from `localStorage` and attempted to be parsed into a `Bookmark` object.
There is a concern as if other data was present in local storage then it would also be parsed.
To fix this the bookmark keys could be prefixed `bookmark:` i.e. `bookmark:1`.
This would help to isolate the data.
