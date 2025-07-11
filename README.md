# AngularTest

The goal of this project is to create a component that allows a user to perform a search on a mocked set of data. A pre-generated list of Github emojis was used for this particular project, with the search being performed on emojis' names. A reusable `search` component was created to encapsulate some basic search field functionality, while the remainder of the logic was housed in the `app` component as well as a `search.service`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Challenges

Instead of generating a data set to search on, it was decided that a pre-generated set of data would be used. Finding a well-formated set of data was more time consuming than was anticipated.

## Assumptions

It was assumed that the term "Product" could be used to describe nearly any set of data, including a list of Gihub emojis. It was also assumed that no real routing mechanism was needed for this task, as it is a single page dedicated to a single task. Some basic routing was still used to accomplish the query string requirement.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
