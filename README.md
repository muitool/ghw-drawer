
## ghw-drawer

Github Worlds drawer is a visualization toolkit that provides
**Views** into JSON data that comes from the
[Github GraphQL API](https://developer.github.com/v4/).
It is called Github Worlds **drawer** because there is also a
**[Github Worlds menu](https://muitool.github.io/ghw-menu/)** which displays the same data and views
but with the
**[Menu](https://material-ui.com/demos/menus/)**
being the primary navigation element instead of the
**[Drawer](https://material-ui.com/demos/drawers/)**

This demo is an extension of
[mui-drawer](https://stormasm.github.io/mui-drawer/) and it is assumed that you have already reviewed the concepts and
documentation associated with that repo.

# Github Worlds

Github Worlds is a set of repositories located inside this tutorial that shows simple visualization techniques using Material-UI
**[cards](https://material-ui.com/demos/cards/)**.  The idea behind the set of demos is that data is retrieved from the
**[Github Graphql API](https://developer.github.com/v4/)** and stored in static JSON files which are then retrieved from some cloud server and displayed inside a data visualization of Github API endpoints.  Eventually, (in the future) this data might come live from the Graphql API but for now (in order to reduce complexity of the demo) we decided to use a simpler approach of static JSON files.

## A Data Visualization Framework

We are in the process of developing a simple generic data visualization
framework in the context of a
**[Material-UI Tutorial](https://stormasm.github.io/mui-tutorial/)**
with the main goal of
using this framework as a test bed for elucidating different aspects of
Material-UI.  So the tutorial and the framework will develop over time
in parallel.  As more interesting aspects of the framework get developed,
the associated documentation teaching the Material-UI concepts will follow.

## The Overall Architecture of the Framework

The concept is simple.  The framework supports views and JSON data.  

The views are any React component that can be accepted inside
[withStyles](https://material-ui.com/customization/css-in-js/#api).
The first example of this is a
[Grid List](https://material-ui.com/demos/grid-list/) with
[Cards](https://material-ui.com/demos/cards/) inside them.

The JSON data comes from any API call or endpoint that returns JSON data.  The API call can be GraphQL, REST, or static JSON data sources such as JSON files sitting on your local disk, your cloud server or inside your Github repo.

## Github World Views

The tutorial repository for *ghw* is called **ghw-drawer** and is
[located here on Github](https://github.com/muitool/ghw-drawer)
or simply click on the Github icon in the upper right hand corner
of the
[AppBar](https://material-ui.com/demos/app-bar/).

Github Worlds (ghw) is a set of views coming from the [Github GraphQL API](https://developer.github.com/v4/).
Using this data visualization framework one can develop new views of data for repositories, users, statistics and anything else that can be derived from this data possibly in concert with other data sets.

The data sets for *ghw* are abstracted away from the underlying visualization so that the only thing needed to display the data is a JSON data file.  Eventually, we might provide a live view of the data coming from the Github API; but for now with simplicity being urgent we decided to only require JSON data sets.  The generation of the JSON data sets is described in another section of the tutorial.  For now, we are providing a test set of JSON data files to better understand the structure of the data along with the program which interprets the data and a sample set of views.

Users are welcome to generate out their own custom views along with the data sets to their liking.

### One repo many views

In the current incarnation of the demo there are four views.

 * view1: vertical scrollable gridlist of cards
 * view2: horizontal single line scrollable gridlist of cards
 * view3: table view with [react-autosuggest](https://github.com/moroshko/react-autosuggest)
 * view4: vertical scrollable gridlist of cards with no avatars

### One view many repos

Each view in the system is accessible via the Views menu.  The repo dropdown
allows one to switch between different Github repositories while staying on the same view.  If you select a different repo the same view will be persistent.

### High level data flow outline

In all Create-React-App (CRA) applications things kickoff inside **index.js**.  From there you wire up the
[Redux](https://redux.js.org/introduction)
state through a Provider interface inside **Root**.  Next up is the **MenuAppBar** which houses the Icons and Menus along with the
[React-Router](https://reacttraining.com/react-router/core/guides/philosophy)
Route definitions.  Finally, when you select a view inside the menu Views.

**ShowTheLocation** will select the proper **DataViewWrapper** given the repo name and view name as
[props](https://reactjs.org/docs/components-and-props.html#props-are-read-only).

### DataViewWrapper

This component has two important variables defined inside it.

```js
const repoMap = {
  repo1: "material-ui.json",
  repo2: "graphql-js.json",
  repo3: "html5-node-diagram.json",
  repo4: "nodejs-sandboxed-fs.json",
  repo5: "ivy.json"
};
```

The **repoMap** allows one to define their own repositories of
data that they are interested in observing, showing to others,
or using for your open source web site.  Say you have an open
source project on Github, and you want to show the world all of the committers
on the project.  Or provided you don't have too many stars, all of the
developers who starred or forked your repo.  This is the type of view
that might be interesting to you but with your own repositories data
instead of these sample data sets.

```js
const template =
  "https://raw.githubusercontent.com/stormasm/ghdata/master/data1/";
```

The **template** is the location of where your JSON data files live.
You can put them anywhere you want, provided you define the template variable.

#### Fetching Data

Now that you have things defined, its time to go out and
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
the data.  For now we are fetching static JSON files from a specific
Github repo defined in the template above, but we could have just as easily fetched the data from the
[Github Api](https://developer.github.com/v4/).  
Or if you have other custom data views defined, your own GraphQL or
REST endpoint.

### DataView

DataView is a switch or set of if statements to grab the selected View from the View Menu in the AppBar.

The actual views themselves are styled any way you like them with
Material-UI's [styling solution](https://material-ui.com/customization/css-in-js/#material-ui-39-s-styling-solution).  

The **View** is the core of the application in that this is where you do your creative work.  Its your canvas so to speak, to create your data visualization. The rest of the framework is there for your use, you just have to be inventive
and come up with interesting views of your data.

The View takes in the prop **tileData** which is the data that was fetched from the API in the DataViewWrapper.  Then the tileData is mapped onto each component that you define in your View.

Any custom view that you define will take in tileData as a prop and then its up to you to build out your own styled component View.

### DataView Examples

#### AppBar

At the top of the hierarchy are ways to organize information or
websites.  All websites need to have an
[AppBar](https://material-ui.com/demos/app-bar/).  A nice example
of an AppBar in action is the
[Material-UI Home Page](https://material-ui.com/).
There you will
see the Icon button for drawer open and close.  In the repos
in this tutorial you
will see the same functionality.

#### Gridlists

The Gridlist is used to display a collection of Cards in both
a single horizontal line and with three cards per row.

#### Cards

The cards in this demo contain different data types about
each user that commits to a Github
repository including:
  * the user's name
  * the user's location
  * the user's username
  * a link to the avatar of the user

One can also grab data surrounding stars and forks as well.
