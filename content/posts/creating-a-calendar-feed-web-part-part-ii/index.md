---
title: "Creating a calendar feed web part – Part II"
series: "Creating a calendar feed web part"
aliases:

- /2018/06/05/creating-a-calendar-feed-web-part-part-ii


date: 2018-06-05T10:07:47+06:00

# post thumb

image: "posts/creating-a-calendar-feed-web-part-part-ii/featured-image.png"

# meta description

summary: "In this article, we’ll: create a web part solution, add a mock service to return test events, and we’ll display a simple list of events"

# taxonomies

categories:

- "SharePoint"
tags:
- "SPFx"

---
## Introduction

In [Part 1](/2018/05/18/creating-a-calendar-feed-web-part/) of this article, I walked through the various components that we’ll need to build to create a responsive calendar feed web part that mimics the out-of-the-box SharePoint events web part.

In this article, we’ll:

- Create a web part solution
- Add a mock service to return test events, and
- We’ll display a simple list of events

The final product will look like this:

![CalendarFeedPart1](CalendarFeedPart1.png)

## Creating a web part solution

If you haven’t done so yet, set up your SharePoint Framework development environment following Microsoft’s [awesome instructions](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment).

We’ll create a solution called **react-calendar-feed-1**. In future articles, we’ll take what we built in this article as the foundation for **react-calendar-feed-2**, and so on until we’re done with the solution, which we’ll call **react-calendar-feed**. Of course, you can skip all the steps and [get the code](https://github.com/hugoabernier/react-calendar-feed) for the final solution, if you’d like.

When you’re ready to create the solution, use the following steps:

- Using the command line, create a new project directory

```sh
md react-calendar-feed-1
```

- Change the current directory to your new project directory

```sh
cd react-calendar-feed-1
```

- Launch the Yeoman SharePoint Generator:

```sh
yo @microsoft/sharepoint
```

- When prompted for the **solution name**, accept the default **react-calendar-feed-1**.
- For the **baseline package** select **SharePoint Online only (latest)**.
- When asked **Where do you want to place the files?** accept the default **Use the current folder**.
- When asked if you want to **allow the tenant admin the choice of being able to deploy the solution to all sites immediately** respond **No**.
- When asked for the **type of client-side component to create** select **WebPart**.
- For **Web part name**, use **CalendarFeedSummary**. Later, we’re planning on adding other web parts for searching events (but that’s another blog post).
- For **Web part description**, enter **Displays events from an external feed**.
- When asked for a **framework** select **React**.
- What Yeoman is done creating the project for you, it’ll say **Congratulations! Solution react-calendar-feed-1 is created. Run gulp serve to play with it!**.
- Since we’re not quite ready to play with the web part yet, let’s launch Visual Studio Code by typing:

    ```sh
    code .
    ```
    
- Once Visual Studio Code is launched, we’re ready to code!

## Cleaning up the generated web part code

If you open the **CalendarFeedWebPart.ts** file, you’ll notice that there are multiple **export**s : one for **ICalendarFeedSummaryWebPartProps** and one for **CalendarFeedSummaryWebPart**.

One practice that I’ve learned by reading the [Office UI Fabric code](https://github.com/OfficeDev/office-ui-fabric-react) is they keep the component code separate from the Prop and State interfaces in separate files, making each component file simpler and easier to read. This is a practice I tend to follow as well, so let’s create a separate file for the web part’s types:

- In the **src | webparts | calendarFeedSummary** folder, create a new file called **CalendarFeedSummaryWebPart.types.ts**.
- Back in the **CalendarFeedSummaryWebPart.ts**, find the **export interface ICalendarFeedSummaryWebPartProps** block and cut it.
- Go back to **CalendarFeedSummaryWebPart.types.ts** and paste the code you just cut. The file should look as follows:

View the code on [Gist](https://gist.github.com/hugoabernier/3176a226eaf30b439d915825abbafcee).

- Back in **CalendarFeedSummaryWebPart.ts**, you’ll want to add an import to the interface we just moved out. At the top of the file, just below the last **import** line, type the following:
    
    ```typescript
    import { ICalendarFeedSummaryWebPartProps } from './CalendarFeedSummaryWebPart.types';
    ```
    

## Create the folder structure

When the final solution will be completed, our web part will consume calendar feeds from various services. Those services will also be re-usable by other web parts.

We’ll start by create a single _mock_ service that will return events in the format that we need. In future posts, we’ll add more types of services.

- In the **src** folder, create a new folder called **shared**. This is where all shared components will reside.
- In the newly created **shared** folder, create a new folder called **services**. This is where all services will go. Even if we’ll only have one type of service. it is a good idea to adopt a consistent folder structure.
- In the **services** folder, create a folder called **CalendarService**.

## Create an ICalendarEvent interface

Our calendar service providers will return a bunch of events that will all have the same properties:

- **Title:** the title of the event
- **Start:** the start date and time of the event
- **End:** the end date and time
- **URL:** the URL for the event, if applicable
- **AllDay:** a boolean (true or false) value indicating if the event is an all-day event (i.e.: with no start and end time).
- **Category:** a classification for the event, if applicable.
- **Description:** a short text summary of the event, if available.
- **Location:** a physical location for the event, if applicable.

Why “if applicable”? Not all event providers are capable of returning all properties for events.

To make it easier to work with, we’ll create an ICalendarEvent that will expose all the above properties. Why an _interface_ and not a _class_? Well, in Typescript, an _interface_ is the easiest way to describe a type of thing without actually saying what the thing does or how it does things.

If our events needed to do things, like calculate their own duration (end date minus start date) or something of the sort, we’d need a _class_ to implement the method; our ICalendarEvent interface is really a convenient way to describe that all events have a title, a start date, end date, etc.

To create the ICalendarEvent interface:

- In the **src | shared | services | CalendarService** folder, create a new file called **ICalendarEvent.ts**
- Copy the code below and paste it in the new file you created:

View the code on [Gist](https://gist.github.com/hugoabernier/a3c729698331f279c4f37c4474faeb38).

Some may argue that the ICalendarEvent is really a _model_ and it should really reside in a different folder where all models go, but I like the simplicity of the CalendarService folder holding everything it needs to deliver a calendar feed. If I ever wanted to move it out to its own module, I could do it very simply.

## Create a service interface

We’ll first create an _interface_ that all calendar service providers will implement. Again, the _interface_ will describe _what_ the calendar service providers will look like. Later, we’ll create a calendar service provider _class_ that will implement the _interface_.

But for now, let’s create the interface:

- In the **src | shared | services | CalendarService** folder, create a new file called **ICalendarService.ts**.
- Create another file called **index.ts** in the **CalendarService** folder.
- Paste the following code in each respective file

View the code on [Gist](https://gist.github.com/hugoabernier/6db7405255d17c2fc9e4d7e77df0350f).

As you’ll see, the _ICalendarService_ interface says that all calendar service providers will need to implement a _getEvents_ method that will return a promise of an array of _ICalendarEvent_. We return a promise because we’ll (usually) be retrieving events from calendar service providers asynchronously, and promises make it easier to do that.

Don’t worry, we’ll explain this better when we implement our first real calendar service provider.

You’ll notice that we create a _index.ts_ in the root of the _CalendarService_ folder and exported both the _ICalendarService_ and the _ICalendarEvent_ interfaces. Why? Just like _index.html_ used to be the default web page for a site, _index.ts_ is the default file for a folder in Typescript. If you don’t specify a file when using an import, it automatically looks for the default file.

But why would I create an _index.ts_ file? Isn’t just an extra file that I’ll need to maintain? Yes, but it makes it easier to hide the complexities of the _CalendarService_ to the rest of the application — they just need to know that they need an _ICalendarService_ and an _ICalendarEvent_ interface from the _CalendarService_ folder, without needing to know where (in which specific file) the interfaces are implemented. When we start adding new service providers, or when we move stuff around, we won’t have to change our imports because we’ll always point to the default _index.ts_ for the _CalendarService._

Don’t worry, it’ll make sense very soon.

## Creating the mock service provider

Now that we have an _ICalendarEvent_ interface to represent events, and an _ICalendarService_ to represent a service provider, let’s combine the two and return some sample events.

Instead of created events with hard-coded dates that will become obsolete as time goes by, we’ll create events with dates that are dynamically generated when the web part is displayed. To make our lives easier, we’ll use **[Moment.js](https://momentjs.com/)** to manipulate dates throughout this project. Moment.js makes it easy to manipulate dates and format them into human-readable formats.

- From Visual Studio Code’s **Integrated Terminal** (CTRL-\`) type
 
    ```sh
    npm install moment
    ```
    
- In the **src** | **shared** | **services** folder, create a new folder called **MockCalendarService**.
- In the new folder, create a new file called **MockCalendarService.ts**, then create another file called **index.ts**.
- Copy and paste the content from the files below into the respective files below.

    ```typescript
    export * from './MockCalendarService';
    ```

    ```typescript

import* as moment from 'moment';
import { ICalendarEvent } from '../ICalendarEvent';
import { ICalendarService } from '../ICalendarService';

const today: Date = new Date();
const sampleEvents: ICalendarEvent[] = [
    {
        "title": "This event will be tomorrow",
        "start": moment().add(1, "d").toDate(),
        "end": moment().add(1, "d").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/1/",
        "allDay": true,
        "category": "Meeting",
        "location": "Barrie, ON",
        "description": "This is a description"
    },
    {
        "title": "This event will be in one week",
        "start": moment().add(1, "w").toDate(),
        "end": moment().add(1, "w").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/2/",
        "allDay": true,
        "category": "Meeting",
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will last two days",
        "start": moment().add(1, "w").toDate(),
        "end": moment().add(1, "w").add(2, "d").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/2/",
        "allDay": true,
        "category": "Meeting",
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in two weeks",
        "start": moment().add(2, "w").toDate(),
        "end": moment().add(2, "w").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/3/",
        "allDay": true,
        "category": "Meeting",
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in one month",
        "start": moment().add(1, "M").toDate(),
        "end": moment().add(1, "M").add(2, "d").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/4/",
        "allDay": true,
        "category": "Meeting",
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in two months",
        "start": moment().add(2, "M").toDate(),
        "end": moment().add(2, "M").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/5/",
        "allDay": true,
        "category": "Meeting",
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in 1 quarter",
        "start": moment().add(1, "Q").toDate(),
        "end": moment().add(1, "Q").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/6/",
        "allDay": true,
        "category": undefined,
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in 4 months",
        "start": moment().add(4, "M").toDate(),
        "end": moment().add(4, "M").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/7/",
        "allDay": true,
        "category": undefined,
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in 5 months",
        "start": moment().add(5, "M").toDate(),
        "end": moment().add(5, "M").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/8/",
        "allDay": true,
        "category": undefined,
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in 6 months",
        "start": moment().add(6, "M").toDate(),
        "end": moment().add(6, "M").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/9/",
        "allDay": true,
        "category": undefined,
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in 9 months",
        "start": moment().add(9, "M").toDate(),
        "end": moment().add(9, "M").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/10/",
        "allDay": true,
        "category": undefined,
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in 1 year",
        "start": moment().add(1, "y").toDate(),
        "end": moment().add(1, "y").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/11/",
        "allDay": true,
        "category": "Partayyyy!",
        "location": undefined,
        "description": undefined
    },
    {
        "title": "This event will be in 18 months",
        "start": moment().add(18, "M").toDate(),
        "end": moment().add(18, "M").toDate(),
        "url": "http://web.archive.org/web/20230917181131/https://www.contoso.com/news-events/events/12/",
        "allDay": true,
        "category": "Meeting",
        "location": undefined,
        "description": undefined
    }
];

export class MockCalendarService implements ICalendarService {

    public getEvents = (): Promise<ICalendarEvent[]> => {
        return new Promise<ICalendarEvent[]>((resolve: any) => {
            setTimeout(() => {
                resolve(sampleEvents);
            }, 1000);
        });
    }
}
    ```

- MockExtensionService
- This provider will NOT be listed in the list of available providers when this solution is packaged with --ship.
- Don't freak out, it didn't just disappear.


The **MockCalendarService** creates a series of events that range from tomorrow to 18 months from now. Some are only 1 day long, but some events last a few days.

The **getEvents** method in **MockCalendarService** simulates the delay of getting the events through an HTTP request and returns the list of pre-generated events. In a later article, we’ll actually get real events, but — for now — this should do to test our rendering.

## Rendering events

Although our goal is to render calendar events that look exactly like what SharePoint does, we’ll begin by rendering a list of events as bullet points. This is to ensure that our code works, and to allow us to finish this article with something that works before we explore rendering.

- Find the **CalendarFeedSummary.tsx** file (located under **src** | **webparts** | **components |** **calendarFeedSummary** )
- Above the **render** function, add a new public function called **componentDidMount** which calls **this.\_loadEvents()** (we’ll create the \_loadEvents function shortly). The code should look as follows:

```typescript
public componentDidMount(): void {
```

- Below the **render** function (I like to keep my public functions separate from my private functions), add a private function called **\_loadEvents()**. The code will look as follows:

```typescript
private _loadEvents(): void {
```

- You’ll notice that we’re referring to **isLoading** and **events** state variables, but we haven’t defined them. Let’s fix that by going to **CalendarFeedSummaryProps.ts** and adding a new interface called **ICalendarFeedSummaryState** , as follows:

```typescript
export interface ICalendarFeedSummaryState {
```

- And, at the top of the same file, add a reference to **ICalendarEvent** as follows:

```typescript
import { ICalendarEvent } from "../../../shared/services/CalendarService";
```

- Since the file no longer contain only the **CalendarFeedSummaryProps**, rename the file from **CalendarFeedSummaryProps.ts** to **CalendarFeedSummary.types.ts**.
- Back in **CalendarFeedSummary**, find the following line:

```typescript
export default class CalendarFeedSummary extends React.Component<ICalendarFeedSummaryProps, {}> {
```

- And replace it with:

```typescript
export default class CalendarFeedSummary extends React.Component<ICalendarFeedSummaryProps, ICalendarFeedSummaryState> {
```

- Essentially telling the **CalendarFeedSummary** component to use the **ICalendarFeedSummaryProps** interface for its properties, and **ICalendarFeedSummaryState** interface for its state.
- Make sure to update the existing reference to **ICalendarFeedSummaryProps** and to include a reference to **ICalendarFeedSummaryState** by changing the following import statement at the top of the file:

```typescript
import { ICalendarFeedSummaryProps } from './ICalendarFeedSummaryProps';
```

with:

```typescript
import { ICalendarFeedSummaryProps, ICalendarFeedSummaryState } from './CalendarFeedSummary.types';
```

- Since we no longer use an empty state, we need to initialize it with a constructor. At the top of the **CalendarFeedSummary.tsx** file, just above the **componentDidMount** function, add the following code:

```typescript
constructor(props: ICalendarFeedSummaryProps) {
```

- In the **render** method, remove the with a className **styles.container** and all of its content. You’ll be left with something that looks like this:

```typescript
public render(): React.ReactElement<ICalendarFeedSummaryProps> {
); }
```

- Inside the blank **div** in the **render** function, add some code that will render the events as a bulleted list, by adding the following code:

{ this.state.events.map(e=>{ return

- {e.title}&lt/li>; })}

The final code should look as follows:

View the code on [Gist](https://gist.github.com/hugoabernier/6bbfd87cb788e5862228d859ce5546c3).

When you’re ready to test the web part, type:

gulp serve

and add the web part we created to the page. The events will render as a list:

![CalendarFeedPart1](CalendarFeedPart1.png)

# Conclusion

Although it isn’t very exciting (yet), the web part we created creates a bunch of events, simulates retrieving them from an HTTP request and renders them in a list.

In our next article, we’ll render the events so that they look like SharePoint events.