---
title: "Converting SPFx Web Part from JavaScript to React"
aliases:

- /2019/04/19/converting-spfx-from-javascript-to-react


date: 2019-04-19T10:07:47+06:00

# post thumb

image: "posts/converting-spfx-from-javascript-to-react/featured-image.webp"

# meta description
summary: "This article is written as if you’re following along and converting the application yourself. Feel free to skip to the end to get the code and compare Eric’s JavaScript-only SPFx web part with my React version of the same web part."

# taxonomies

categories:

- "SPFx"
tags:
- JavaScript
---
This article was written in collaboration with [Eric Skaggs](http://www.ericskaggs.net/)

## Introduction

In today’s SharePoint Dev Ecosystem (PnP) Bi-Weekly Call, [Eric Skaggs](http://www.ericskaggs.net/) asked a question I’ve heard many times before:

> Do you have an example that shows how to go from a JavaScript SPFx web part to a SPFx React web part?

(I’m paraphrasing)

I had been looking for an opportunity to write such as article, so I told Eric to DM me on Twitter to see if he had an example of a web part he’d like to convert.

As it turns out, Eric has such a web part: his [GitHub Badge WebPart](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/js-gitHubBadge) is a great example of a JavaScript-only SPFx web part.

![Eric's JavaScript Only SPFx Web Part](image-1555700184440.png)

Eric’s SPFx web part works great, and there is really no need to convert it to React. We’ll convert it to React simply to demonstrate the process and to highlight some of the design differences between a JavaScript only web part and a React web part.

It is also important to point out that every developer has their own coding styles and preferred approaches that do not affect the final product. In this article, I’ll try to point out where I applied my own coding style.

This article is written as if you’re following along and converting the application yourself. Feel free to skip to the end to get the code and compare Eric’s JavaScript-only SPFx web part with my React version of the same web part.

## Starting from scratch

The SPFx framework is constantly improving. In fact, the framework went [from 1.8 to 1.8.1](https://github.com/SharePoint/sp-dev-docs/wiki/SharePoint-Framework-v1.8.1-release-notes) two days ago!

Because of this, I like to make sure that I create a new solution every time I start converting a web part (I do this a lot, as it turns out).

Start by making sure that your environment is configured to create SPFx solutions. If you haven’t done so yet, [follow these steps](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) to get you started.

If you were already set up, make sure to update your version of the Yeoman generator to the latest. To do so, use the following command from your **Node.js command prompt**:

```PowerShell
npm install -g @microsoft/generator-sharepoint
```

Once this is completed, I followed the instructions from the [SharePoint Framework documentation](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part) except, you know, with **React GitHub Badge** as the solution name:

1. Create a new project directory in your favorite location.

    ```PowerShell
    md react-github-badge
    ```

    Your web part solution does not need to start with `react-`. I just named it that way because it is the naming convention in the [SP-Dev-Fx-WebParts repository](https://github.com/pnp/sp-dev-fx-webparts)

2. Go to the new folder you created:

    ```PowerShell
    md react-github-badge
    ```

3. Create the React GitHub Badge web part by running the Yeoman SharePoint Generator.

    ```PowerShell
    yo @microsoft/sharepoint
    ```

4. When prompted:

    - Accept the default **react-github-badge** as your **solution name**, and then select <kbd>ENTER</kbd>.
    - Select **SharePoint Online only (latest)**, and select <kbd>ENTER</kbd>.
    - Select **Use the current folder** for **where to place the files**.
    - Select **N** to **allow the solution to be deployed to all sites immediately**.
    - Select **N** on the question **if solution contains unique permissions**.
    - Select **WebPart** as the **client-side component type to be created**.
5. The next set of prompts ask for specific information about your web part:

    - Enter **GitHub Badge** as your **web part name**, and then select <kbd>ENTER</kbd>.
    - Enter **Displays information from GitHub for a specified user** as your **web part description**, and then select <kbd>ENTER</kbd>.
    - For **framework you would like to use**, select **React**, and then select <kbd>ENTER</kbd>.

![The Yeoman generator in action](image-1555635587399.png)

You’ll know it has completed when you see the following message:

![Success](image-1555635685616.png)

Once it has completed, run:

```PowerShell
gulp serve
```

to test your web part. (It _should_ work). You should see something like this:  
![I created an SPFx solution and all I got was this lousy web part](image-1555635768809.png)

It isn’t pretty, but it’s a start.

## Fixing potential vulnerabilities

If you paid attention as the Yeoman generator created the solution, you may have noticed a nasty message like this one:

```PowerShell
added 1759 packages from 1071 contributors and audited 565045 packages in 63.66s
found 1957 vulnerabilities (1806 low, 36 moderate, 115 high)
  run npm audit fix to fix them, or npm audit for details
```

Unfortunately, that's the nature of building solutions with open-source components.

I don't like it, so I typically run the following command to fix as many issues as possible:

```PowerShell
npm audit fix
```

Once completed, you should see less scary exploits:  
![After npm audit fix](image-1555636063847.png)

Run your web part again and make sure it still works:

```PowerShell
gulp serve
```

## Separating Web Part and Component

Eric’s no-framework web part has all the code for retrieving a user’s GitHub profile, managing web part properties, and rendering in the `GitHubBadgeWebPart.ts`. That’s how it is done with "no-framework" web parts.

In SPFx React solutions, the web part will be broken into smaller components:

- **GitHubBadgeWebPart.ts**: The Web Part, which is responsible for storing and retrieving web part properties, displaying the property pane, and calling components to render the web part.
- **GitHubBadge.tsx:** The main component, which renders the content of the web part.

We’re going to take Eric’s code and move the **content** to `GitHubBadge.tsx`, and leave the web part code in `GitHubBadgeWebPart.ts`.

## Adding a web part property to store the GitHub user name

1. Using your favorite code editor, open `GitHubBadgeWebPart.ts` (located under **src\\webparts\\gitHubBadge** and find the following code that was generated by Yeoman:

    ```typescript
    export interface IGitHubBadgeWebPartProps {
    description: string;
    }
    ```

2. Since we don’t need a `description` property for our web part, let’s rename it to `gitHubUserName`. The code should look like this:

    ```typescript
    export interface IGitHubBadgeWebPartProps {
    gitHubUserName: string;
    }
    ```

    If you use Visual Studio Code, simply place your cursor over `description` and hit `F2`. Type in `gitHubUserName` and hit <kbd>ENTER</kbd>  
    ![Using F2 to rename variables](image-1555637313269.png)

3. If you do not use Visual Studio Code, you should look for a line that says:

    ```typescript
    description: this.properties.description
    ```

    and replace it for:

    ```typescript
    description: this.properties.gitHubUserName
    ```

4. Find the code inside the `getPropertyPaneConfiguration` function that looks like this:

    ```typescript
    groupFields: [
     PropertyPaneTextField('description', {
         label: strings.DescriptionFieldLabel
     })
    ]
    ```

    and rename the `description` property to `gitHubUserName`. The code should look as follows:

    ```typescript
    groupFields: [
    PropertyPaneTextField('gitHubUserName', {
        label: strings.DescriptionFieldLabel
    })
    ]
    ```

5. Finally, let’s rename the localized label for the `DescriptionFieldLabel` to `GitHubUserNameFieldLabel` by using the `F2` method. Doing so will also rename the localized variable in `src\webparts\gitHubBadge\loc\mystrings.d.ts`. If you don’t use Visual Studio Code, make sure to rename the `DescriptionFieldLabel` to `GitHubUserNameFieldLabel`.  
    As a general rule, I always name the localized variable for all my properties as `[PropertyName]FieldLabel`. So, `GitHubUserName` becomes `GitHubUserNameFieldLabel`. Feel free to use your own naming convention.

6. We’ll also need to change the localized text! Go to `src\webparts\gitHubBadge\loc\en-us.js` and find the line that looks like this:

    ```json
    "DescriptionFieldLabel": "Description Field"
    ```

    And change it to:

    ```json
    "GitHubUserNameFieldLabel": "GitHub user name"
    ```


As always, run `gulp serve` to test your changes and make sure your web part didn’t self-destruct.

If you click on your web part’s edit button, you should see the following:  
![Web part property](image-1555638392662.png)

So far, so good.

Your web part’s manifest contains a section for pre-configured properties in case you want to provide default properties when users add the new web part to their page. Let’s go make Eric’s username the default GitHub username:

1. Open `src\webparts\gitHubBadge\GitHubBadgeWebPart.manifest.json` and find the `properties` in the `preconfiguredEntries` section. Replace the following line:

    ```json
    "description": "GitHub Badge"
    ```

    to this:

    ```json
    "description": "skaggej"
    ```

2. JSON files don’t support comments, and Visual Studio Code will kindly remind you of that by showing the file in red. For bonus points, find all the comments (starting with `\\`) in that file and remove them. Visual Studio Code will reward you with a nice green file name instead.

When you change the manifest, you won’t notice the difference until you stop and restart `gulp serve`, remove then re-add the web part to your page. I wasted a lot of time trying to debug this issue before I learned this the hard way.

## Disabling reactive property changes

By default, SPFx web parts apply property changes as soon as you make them.

In this example, we don’t want the web part to retrieve the GitHub user’s profile until we’re done entering the name.

We can do this by adding an **Apply** button to the property pane. To do so, open the Web Part’s code at `src\webparts\gitHubBadge\GitHubBadgeWebPart.ts` and add the following code just above the `getPropertyPaneConfiguration()` function:

```typescript
protected get disableReactivePropertyChanges(): boolean {
    return true;
}
```

When you refresh your web part, you’ll get a nice **Apply** button at the bottom of your property pane.

## Adding GitHubUserName property to the GitHubBadge props

Now that we’ve renamed the web part’s **Description** property to **GitHubUserName**, we need to do the same to the property that gets passed into the **GitHubPage** component.

Typically, your React component will define a `I[ComponentName]Props` to store properties, and a `I[ComponentName]State` to store the component’s state.

By default, the Yeoman generator will have created the `IGitHubBadgeProps` interface for you, which should be placed in the `src\webparts\gitHubBadge\components\IGitHubBadgeProps.ts` file.

Because I learned React from reading the [Office UI Fabric code](https://github.com/OfficeDev/office-ui-fabric-react), and they already have awesome [Coding Style](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Coding-Style), [React](https://github.com/OfficeDev/office-ui-fabric-react/wiki/React-Guidelines) and [TypeScript](https://github.com/OfficeDev/office-ui-fabric-react/wiki/TypeScript-Guidelines) guidelines, I tend to follow their standards.

In Office UI Fabric, they often group all types related to a component in a file called `[ComponentName].types.ts`.

You don’t have to do this, but I prefer to do the same by storing both my `I[ComponentName]Props` and `I[ComponentName]State` interfaces in the same file called `[ComponentName].types.ts`.

In this case, I’ll just rename the `IGitHubBadgeProps.ts` to `GitHubBadge.types.ts` by selecting the file in the Visual Studio Code explorer pane and hitting `F2` then typing `GitHubBadge.types.ts` followed by <kbd>ENTER</kbd>.

We’ll add the `IGitHubBadgetState` interface later.

For now, though, let’s open the newly renamed `GitHubBadge.types.ts` file and find the following line in the `IGitHubBadgeProps` interface:

```typescript
  description: string;
```

and rename the `description` property to `gitHubUserName` by using the trusty `F2` rename shortcut.

If all goes well, you’ll notice that both `src\webparts\gitHubBadge\GitHubBadgeWebPart.ts` and `src\webparts\gitHubBadge\components\GitHubBadge.tsx` will update where they refer to the `description` property to point to the new `gitHubUserName` property.

## Rendering static HTML

So far, I haven’t used any of Eric’s code.

That’s about to change.

1. Open:
2. Find the following code in the `render` function and select it:

    ```typescript
    <div className={ styles.container }>
    <div className={ styles.row }>
        <div className={ styles.column }>
            <span className={ styles.title }>Welcome to SharePoint!</span>
            <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
            <p className={ styles.description }>{escape(this.props.gitHubUserName)}</p>
            <a href="https://aka.ms/spfx" className={ styles.button }>
            <span className={ styles.label }>Learn more</span>
            </a>
        </div>
    </div>
    </div>
    ```

3. Notice that the line that looks like:

    ```typescript
    <div className={ styles.gitHubBadge }>
    ```

    and the last `</div>` isn’t included in the selected code.

4. Copy the following code from Eric’s sample over the selected code:

    ```typescript
    <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <div id="gitHubUserProfilePic"></div>
              <div id="gitHubUserName" class="${ styles.title }">${this.properties.gitHubUserName}</div>
              <div id="login" class="${ styles.label }"></div>
              <div id="id" class="${ styles.label }"></div>
              <div id="node_id" class="${ styles.label }"></div>
              <div id="avatar_url" class="${ styles.label }"></div>
              <div id="gravatar_id" class="${ styles.label }"></div>
              <div id="url" class="${ styles.label }"></div>
              <div id="html_url" class="${ styles.label }"></div>
              <div id="followers_url" class="${ styles.label }"></div>
              <div id="following_url" class="${ styles.label }"></div>
              <div id="gists_url" class="${ styles.label }"></div>
              <div id="starred_url" class="${ styles.label }"></div>
              <div id="subscriptions_url" class="${ styles.label }"></div>
              <div id="organizations_url" class="${ styles.label }"></div>
              <div id="repos_url" class="${ styles.label }"></div>
              <div id="events_url" class="${ styles.label }"></div>
              <div id="received_events_url" class="${ styles.label }"></div>
              <div id="type" class="${ styles.label }"></div>
              <div id="site_admin" class="${ styles.label }"></div>
              <div id="name" class="${ styles.label }"></div>
              <div id="company" class="${ styles.label }"></div>
              <div id="blog" class="${ styles.label }"></div>
              <div id="location" class="${ styles.label }"></div>
              <div id="email" class="${ styles.label }"></div>
              <div id="hireable" class="${ styles.label }"></div>
              <div id="bio" class="${ styles.label }"></div>
              <div id="public_repos" class="${ styles.label }"></div>
              <div id="public_gists" class="${ styles.label }"></div>
              <div id="followers" class="${ styles.label }"></div>
              <div id="following" class="${ styles.label }"></div>
              <div id="created_at" class="${ styles.label }"></div>
              <div id="updated_at" class="${ styles.label }"></div>
              <div id="notfound" class="${styles.label}"></div>
            </div>
          </div>
        </div>
    ```

    You will get some errors. Don’t panic.

5. React doesn’t like it when you use the word `class` to define the CSS class name. It is a reserved word. Instead, you must use `className`. Luckily, you can replace all instances of the word `class` by using a trick I’ve described in [my multi-cursor editing in Visual Studio Code article](https://tahoeninjas.blog/2019/03/30/multi-cursor-editing-in-visual-studio-code/). Select the first instance of the word `class=` (including the `=` sign) and hit `CTRL-SHIFT-L`, then type `className=` instead, followed by the `ESC` key to stop multi-cursor editing. This should replace all instances of `class` to `className`.
6. The keyword `properties` is also unique to the WebPart-derived classes. In React, the properties for a component are called `props`. Find the line that looks like this:

    ```typescript
    <div id="gitHubUserName" className="${ styles.title }">${this.properties.gitHubUserName}</div>
    ```

    and replace it for this:

    ```typescript
    <div id="gitHubUserName" className="${ styles.title }">{this.props.gitHubUserName}</div>
    ```


In Eric’s code, he defines an ID for all the elements he wants to populate with data and dynamically inserts the text once he has retrieved it by calling every element by ID. It is a really efficient way to dynamically update web part content.

Although you technical _can_ refer to HTML elements by IDs in React, it is rarely encouraged. One of the reasons for this is that if you add the web part twice on the same page, you’ll get conflicts.

Instead, we’ll later bind each element to the component’s state, then populate the state when we receive the data from GitHub.

For now, let’s just get rid of all those ID on every element.

Thankfully, you can do this by using multi-cursor editing!

1. From the code, select the first instance of `id="`. Make sure to include the `=` and the double quotes `"`.
2. Just like you did before hit `CTRL-SHIFT-L` to select all instances of the currently selected text. You should see that all instances of `id="` got selected.
3. Now hold `SHIFT` and `CTRL` and press the `RIGHT` arrow key. It should automatically select the word to the right of `id="`. (`SHIFT` means to extend the selection, while `CTRL-RIGHT` selects the next word).
4. Hold `SHIFT` again (you can let go of `CTRL`) and hit the `RIGHT` arrow again. That should select the last double-quotes (`"`) to the right of the text you’ve already selected.
5. Hit `BACKSPACE` to delete the text you have selected. If you want, hit `BACKSPACE` once more to remove the extra space that is left after every `<div`.

Isn’t multi-cursor editing cool?

`TSX` files in React TypeScript projects make it easy to combine HTML with React. To insert dynamic text as an HTML attribute, you just need to use `{ }`. You don’t even need the quotes around the attribute. This means that every instance of `className="${` in Eric’s former JavaScript code can be simply replaced by `className={`.

You can do so by using multi-cursor editing again:

1. In the code, find the first instance of `"${` and select it.
2. Hit `CTRL-SHIFT-L` to select all instances.
3. Hit `DEL` to delete the selected text.
4. Type `{` instead and hit `ESC` to stop multi-cursor editing.
5. Go to the end of the className attribute, and select `}"`
6. Hit `CTRL-SHIFT-L` to select all instances of `}"`.
7. Hit `DEL` and type `}` instead, followed by `ESC`.

The final `render` function should look like this:

```typescript
    public render(): React.ReactElement<IGitHubBadgeProps> {
    return (
      <div className={ styles.gitHubBadge }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <div></div>
              <div className={ styles.title }>{this.props.gitHubUserName}</div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={ styles.label }></div>
              <div className={styles.label}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
```

Finally, open replace the content of the `src\webparts\gitHubBadge\components\GitHubBadge.module.scss` with Eric’s original SCSS:

```SCSS
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss';

.gitHubBadge {
  .container {
    max-width: 700px;
    margin: 0px auto;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }

  .row {
    @include ms-Grid-row;
    @include ms-fontColor-white;
    background-color: $ms-color-themeDark;
    padding: 20px;
  }

  .column {
    @include ms-Grid-col;
    @include ms-lg10;
    @include ms-xl8;
    @include ms-xlPush2;
    @include ms-lgPush1;
  }

  .title {
    @include ms-font-xl;
    @include ms-fontColor-white;
  }

  .subTitle {
    @include ms-font-l;
    @include ms-fontColor-white;
  }

  .description {
    @include ms-font-l;
    @include ms-fontColor-white;
  }

  .button {
    // Our button
    text-decoration: none;
    height: 32px;

    // Primary Button
    min-width: 80px;
    background-color: $ms-color-themePrimary;
    border-color: $ms-color-themePrimary;
    color: $ms-color-white;

    // Basic Button
    outline: transparent;
    position: relative;
    font-family: "Segoe UI WestEuropean","Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: $ms-font-size-m;
    font-weight: $ms-font-weight-regular;
    border-width: 0;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    padding: 0 16px;

    .label {
      font-weight: $ms-font-weight-semibold;
      font-size: $ms-font-size-m;
      height: 32px;
      line-height: 32px;
      margin: 0 4px;
      vertical-align: top;
      display: inline-block;
    }
  }
}
```

You deserve a reward! Run `gulp serve` again from your **Node.js command prompt** and refresh your web part. You should see something that looks like this:  
![Static HTML Preview](image-1555645107005.png)

We’re getting there!

Let’s retrieve the data next!

## Creating an IGitHubServices interface

Eric’s example keeps things simple by putting the code to retrieve the user’s GitHub profile in the web part class.

However, React solutions benefit from breaking things into smaller components with a clear division of responsibilities.

For example, the code that calls the GitHub API to retrieve the GitHub user’s profile can be separated from the code that is responsible for _rendering_ the profile information.

This is done because React makes it easy to create individualized components that do specific things. By keeping the code that retrieves the data separate from the code that renders the data, we could re-use the GitHub profile component in different ways.

It also makes it easier to create unit tests and mock services without having to change your GitHub profile component.

It doesn’t make the React code _better_ than the no-framework code. It’s just a different approach.

Since the purpose of this example is to demonstrate converting a no-framework web part to a React web part, I’ll show you the extra steps of creating a separate IGitHubService interface, with a mock service and a real service.

1. First, let’s create a new folder called `services` under the `src` folder. It should be at the same level as the `webparts` folder.

> You may find other examples that place their `services` under the web part folder for the web part that calls it, but I like to design my services so that they can be used by more than one web part — hence placing it at the same level as the `webparts` folder. Feel free to place it where you prefer.

2. Under the `src\services` folder, create another folder called `GitHubServices`.
    
3. In the `src\services\GitHubServices` folder, create a new file called `GitHubServices.types.ts`
    
4. Let’s create an interface that represents the returned data from GitHub APIs. From your browser, visit `[https://api.github.com/users/skaggej](https://api.github.com/users/skaggej)`. It will return the JSON for Eric’s profile.
    
5. Copy the content of the JSON. It should look like this:
    
    ```json
    {
    "login": "skaggej",
    "id": 1846656,
    "node_id": "MDQ6VXNlcjE4NDY2NTY=",
    "avatar_url": "https://avatars1.githubusercontent.com/u/1846656?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/skaggej",
    "html_url": "https://github.com/skaggej",
    "followers_url": "https://api.github.com/users/skaggej/followers",
    "following_url": "https://api.github.com/users/skaggej/following{/other_user}",
    "gists_url": "https://api.github.com/users/skaggej/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/skaggej/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/skaggej/subscriptions",
    "organizations_url": "https://api.github.com/users/skaggej/orgs",
    "repos_url": "https://api.github.com/users/skaggej/repos",
    "events_url": "https://api.github.com/users/skaggej/events{/privacy}",
    "received_events_url": "https://api.github.com/users/skaggej/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Eric Skaggs",
    "company": "http://www.catapultsystems.com",
    "blog": "http://www.ericskaggs.net",
    "location": "Phoenix, AZ",
    "email": null,
    "hireable": null,
    "bio": "Fuse Solution Architect at Catapult Systems",
    "public_repos": 29,
    "public_gists": 3,
    "followers": 8,
    "following": 33,
    "created_at": "2012-06-13T14:01:52Z",
    "updated_at": "2019-04-09T00:18:35Z"
    }
    ```
    
    (don’t worry too much if there are minor differences)
    
6. If you don’t have the awesome **JSON to TS** extension for Visual Studio, [go install it now](https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts). It will allow us to convert the JSON you just copied into a TypeScript interface. (Did I mention I’m the world’s laziest developer?)
    
7. Place your cursor in the `GitHubServices.types.ts` file. We’re about to insert some code in there.
    
8. With **JSON to TS** installed, hit `F1` to launch the Visual Studio Code command line and start typing `JSON to TS`. You should see \*\*JSON to TS: Convert from clipboard`. Select it and be patient. The extension will insert a TypeScript Interface called` RootObject\` that contains a property for every attribute returned by the GitHub API. The code should look like this:
    
    ```typescript
    interface RootObject {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email?: any;
    hireable?: any;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    }
    ```
    
9. Rename the `RootObject` to `IGitHubUserProfile` and export the interface so that it can be accessed in other files. The code should look like this:
    
    ```typescript
    export interface IGitHubUserProfile {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email?: any;
    hireable?: any;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    }
    ```
    
    > We use the convention `I[Something]` to indicate that this is an _interface_, not a _class_. That way, we can take any TypeScript object that implements the properties defined in the interface (`login`, `id`, `node_id`, `avatar_url`, etc.) — regardless of how it was created. That way, we’ll be able to convert the JSON we retrieved from the GitHub API to the `IGitHubUserProfile` interface and pass it around.
    
10. We’ll add an `IGitHubService` interface to the same file. The interface will implement one method called `getUserProfile` that receives an `alias` string and returns an asynchronous promise of an `IGitHubUserProfile`. Just paste the following code below the `IGitHubUserProfile`:
    
    ```typescript
    export interface IGitHubService {
    getUserProfile(alias: string): Promise<IGitHubUserProfile>;
    }
    ```
    
    > Again, we use an interface so that we can later have a `MockGitHubService` and a (real) `GitHubService` that both implement the `IGitHubService`. Our component won’t care whether it is using a real service or a mock service, because it will expect an object that implements `IGitHubService`.
    

For your reference, the entire content of `GitHubServices.types.ts` should look like this:

```typescript
export interface IGitHubUserProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email?: any;
  hireable?: any;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface IGitHubService {
  getUserProfile(alias: string): Promise<IGitHubUserProfile>;
}
```

Now let’s create the mock service!

## Creating MockGitHubService

We’ll use a _mock_ service to return test data so that we don’t have to worry about getting blocked by GitHub for calling the API too many times when we’re testing the look and feel of the web part. The mock service will be interchangeable with the real service at a later time.

1. In the `src\services\GitHubServices` folder, create a new file called `MockGitHubService`
2. In the now empty file, paste the following code:
    
    ```typescript
    import { IGitHubService, IGitHubUserProfile } from "./GitHubServices.types";
    export class MockGitHubService implements IGitHubService {
    public getUserProfile(alias: string): Promise<IGitHubUserProfile> {
    // This space for rent
    }
    }
    ```
    

The `import { IGitHubService, IGitHubUserProfile } from "./GitHubServices.types";` line tells the TypeScript transpiler that those two interfaces are located in another file in the same folder.

The `export class MockGitHubService implements IGitHubService` says that this class (`MockGitHubService`) will do (or `implements`) everything the `IGitHubService` interface does, and that it should be available outside of this file by other files (or `export`ed).

Let’s add some code to return sample data after simulating some delays.

3. In the code, replace the line that says `// This space for rent` with the following code:
    
    ```typescript
    return new Promise<IGitHubUserProfile>((resolve) => {
      // pretend we're getting the data from the GitHub API by adding a delay
      setTimeout(() => {
        const fakeProfile: IGitHubUserProfile = {
          login: "skaggej",
          id: 1846656,
          node_id: "MDQ6VXNlcjE4NDY2NTY=",
          avatar_url: "https://avatars1.githubusercontent.com/u/1846656?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/skaggej",
          html_url: "https://github.com/skaggej",
          followers_url: "https://api.github.com/users/skaggej/followers",
          following_url: "https://api.github.com/users/skaggej/following{/other_user}",
          gists_url: "https://api.github.com/users/skaggej/gists{/gist_id}",
          starred_url: "https://api.github.com/users/skaggej/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/skaggej/subscriptions",
          organizations_url: "https://api.github.com/users/skaggej/orgs",
          repos_url: "https://api.github.com/users/skaggej/repos",
          events_url: "https://api.github.com/users/skaggej/events{/privacy}",
          received_events_url: "https://api.github.com/users/skaggej/received_events",
          type: "User",
          site_admin: false,
          name: "Eric Skaggs",
          company: "http://www.catapultsystems.com",
          blog: "http://www.ericskaggs.net",
          location: "Phoenix, AZ",
          email: null,
          hireable: null,
          bio: "Fuse Solution Architect at Catapult Systems",
          public_repos: 29,
          public_gists: 3,
          followers: 8,
          following: 33,
          created_at: "2012-06-13T14:01:52Z",
          updated_at: "2019-04-09T00:18:35Z"
        };
        resolve(fakeProfile);
      }, 500);
    });
    ```
    

The entire content of the `MockGitHubService.ts` file should be as follows:

```typescript
import { IGitHubService, IGitHubUserProfile } from "./GitHubServices.types";

export class MockGitHubService implements IGitHubService {
  public getUserProfile(alias: string): Promise<IGitHubUserProfile> {

    return new Promise<IGitHubUserProfile>((resolve) => {
      // pretend we're getting the data from the GitHub API by adding a delay
      setTimeout(() => {
        const fakeProfile: IGitHubUserProfile = {
          login: "skaggej",
          id: 1846656,
          node_id: "MDQ6VXNlcjE4NDY2NTY=",
          avatar_url: "https://avatars1.githubusercontent.com/u/1846656?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/skaggej",
          html_url: "https://github.com/skaggej",
          followers_url: "https://api.github.com/users/skaggej/followers",
          following_url: "https://api.github.com/users/skaggej/following{/other_user}",
          gists_url: "https://api.github.com/users/skaggej/gists{/gist_id}",
          starred_url: "https://api.github.com/users/skaggej/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/skaggej/subscriptions",
          organizations_url: "https://api.github.com/users/skaggej/orgs",
          repos_url: "https://api.github.com/users/skaggej/repos",
          events_url: "https://api.github.com/users/skaggej/events{/privacy}",
          received_events_url: "https://api.github.com/users/skaggej/received_events",
          type: "User",
          site_admin: false,
          name: "Eric Skaggs",
          company: "http://www.catapultsystems.com",
          blog: "http://www.ericskaggs.net",
          location: "Phoenix, AZ",
          email: null,
          hireable: null,
          bio: "Fuse Solution Architect at Catapult Systems",
          public_repos: 29,
          public_gists: 3,
          followers: 8,
          following: 33,
          created_at: "2012-06-13T14:01:52Z",
          updated_at: "2019-04-09T00:18:35Z"
        };
        resolve(fakeProfile);
      }, 500);
    });
  }
}
```

## Adding an index.ts file to GitHubServices

Now that we’ve defined some `export`s in our `GitHubServices`, we’ll want to make it easy for the component to use them.

The problem is that if we want to import our `IGitHubService`, `IGitHubUserProfile` and `MockGitHubService` in our `GitHubBadge` component, we’ll have to import each item from the files that contain them, like this:

```typescript
import { IGitHubService, IGitHubUserProfile } from '../../../services/GitHubServices/GitHubServices.types';
import { MockGitHubService } from '../../../services/GitHubServices/MockGitHubService';
```

However, if we ever decide to move the various elements of the `GitHubServices` to different files, we’ll have to update all the `import` statements in all the components that use the services.

But why should the components know about the internal structure of the `GitHubServices`? Wouldn’t it be better to abstract all that stuff from the components?

Luckily, we can use `index.ts` to do just that!

1. In the `src\services\GitHubServices` folder, add a new file called `index.ts`.
2. In the `index.ts` file, export all the things that you want the components to have access to, as follows:
    
    ```typescript
    export * from './GitHubServices.types';
    export * from './MockGitHubService';
    ```
    

Now we can just add the following line in our `src\webparts\gitHubBadge\components\GitHubBadge.tsx` file to import everything we need:

```typescript
import { IGitHubService, IGitHubUserProfile, MockGitHubService } from '../../../services/GitHubServices';
```

## Adding some state to GitHubBadge

**State** is a funny concept in React.

It allows us to temporarily capture the information we need to support the different "ways" we want our component can be in (I’m really trying hard not to use the word _state_ here).

For example, our `GitHubBadge` component potentially has 5 states:

- **Not configured**
- **Loading**
- **Loaded** with data
- Error because the user was **Not found**
- **Error** while calling GitHub API (network, throttling, etc.)

This is something that’s represented as follows:

```sequence
Title: GitHubBadge States
Not configured->Loading: When user sets web part properties
Loading->Loaded: Normal scenario
Loading-->Not found: Invalid user name
Loading-->Error: Exception with GitHub API
```

I promised Eric I’d keep this simple, so I’ll ignore the **Not configured** and we’ll combine the **Not found** and **Error** states for now. (I can’t promise I won’t come back to this in a later article though).

To represent these states in out `GitHubBadge` component, we’ll use the following variables:

- `isLoading`: a `boolean` that will be set to `true` when the web part loads.
- `userProfile`: a `IGitHubUserProfile` variable that can be set to `undefined` (if there is no data to show)
- `errorMessage`: a `string` containing an error message that can also be set to `undefined` if nothing went wrong.

If `isLoading` is false, it will mean that the service call is complete. If `errorMessage` contains a message, it means there was an error. Otherwise, if `userProfile` contains data, it means that we received our data and that we want to show it.

Let’s start implementing this by creating an `IGitHubBadgeState` interface in our `src\webparts\gitHubBadge\components\GitHubBadge.types.ts` file:

1. Open the `GitHubBadge.types.ts` file
2. Add the following code below the `IGitHubBadgeProps` interface:
    
    ```typescript
    export interface IGitHubBadgeState {
    isLoading: boolean;
    userProfile?: IGitHubUserProfile;
    errorMessage?: string;
    }
    ```
    
3. Make sure to add the following line at the top of the file:
    
    ```typescript
    import { IGitHubUserProfile } from "../../../services/GitHubServices";
    ```
    

The `?` at the end of the variable names means that the variables can be nullable.

Now let’s use the state in our component!

## Adding state to the GitHubBadge component

Now we’re finally getting somewhere!

Let’s start by telling the `GitHubBadge` that is has a state:

1. Open the `src\webparts\gitHubBadge\components\GitHubBadge.tsx` file
    
2. At the top of the file, replace the following line:
    
    ```typescript
    import { IGitHubBadgeProps } from './GitHubBadge.types';
    ```
    
    for this:
    
    ```typescript
    import { IGitHubBadgeProps, IGitHubBadgeState } from './GitHubBadge.types';
    ```
    
3. Replace the following line:

    ```typescript
    export default class GitHubBadge extends React.Component<IGitHubBadgeProps, {}> {
    ```

    with this:

    ```typescript
    export default class GitHubBadge extends React.Component<IGitHubBadgeProps, IGitHubBadgeState> {
    ```

    This tells the `GitHubBadge` class that it should use `IGitHubBadgeProps` for its properties, and `IGitHubBadgeState` for its state.

4. Add a constructor to define a default state by adding the following code _below_ the code you just changed, and _above_ the `public render()` method:

    ```typescript
    constructor(props:IGitHubBadgeProps) {
    super(props);
    
    this.state = {
      isLoading: true
    };
    }
    ```

    Note that the constructor is the only time you can change the state directly by using `this.state =` . Everywhere else, you’ll only be able to use `this.setState()`.

5. For now, let’s some conditional rendering logic in the `render` method so that when the web part is loading (i.e.: `isLoading` equals `true`), we’ll write **"Loading…"** in the top of the web part. Replace the following line (just below `<div className={ styles.column }>`:


```typescript
<div></div>
```

with this:

```typescript
<div>{ this.state.isLoading && "Loading..." }</div>
```

If you try to use `gulp serve` now, you’ll notice that the web part always displays **"Loading…"** because the `isLoading` state variable is set to `true` at in the constructor and we never change that.

![Loading](image-1555653697876.png)

But we’ll fix that right now…

## Loading and displaying mock data

React applications typically try to be responsive (as in "fast") by avoiding any delays in rendering the components.

It is better to render a "Loading…" web part and immediately change it to show the data that’s you just retrieved than not rendering anything until the data has returned.

To achieve this, we’ll call the `getUserProfile` method from the `MockGitHubService` _after_ the `GitHubBadge` is _mounted_. Once the `MockGitHubService` returns data, we’ll call `this.setState()` and set `isLoading` to `false` and populate the `userProfile` state variable with whatever data we received.

Calling `this.setState` will automatically trigger any elements that are bound to state variables on the component to re-render.

To the code!

1. In `src\webparts\gitHubBadge\components\GitHubBadge.tsx`, add a method called `componentDidMount` above the `render` method, as follows:

    ```typescript
    public componentDidMount(): void {
    
    }
    ```

    (It will still work if you put the code after the `render` method, I suggest where to put it in the code so that your code looks like mine once completed).

2. Add the following code inside the `componentDidMount` function:

    ```typescript
    // Create an instance of the GitHub service
    const service: IGitHubService = new MockGitHubService();
    
    // Call the GitHub service
    // In real-life, we would only call it when we're sure that there is a username
    service.getUserProfile(this.props.gitHubUserName).then((results: IGitHubUserProfile)=>{
      // Set the userProfile with the results we got and isLoading to false, because we're done
      // loading. It'll make things redraw magically.
      this.setState({
        userProfile: results,
        isLoading: false
      });
    });
    ```

3. Replace the entire `render` function with the following code. Don’t worry, I’ll explain shortly:

    ```typescript
    public render(): React.ReactElement<IGitHubBadgeProps> {
    const { userProfile, isLoading, errorMessage } = this.state;
    
    return (
      <div className={ styles.gitHubBadge }>
        <div className={ styles.container }>
          <div className={ styles.row }>
          { isLoading &&
            <div className={ styles.column }>
              <div>Loading...</div>
            </div>
          }
          { !isLoading && userProfile &&
            <div className={ styles.column }>
              <div><img src={userProfile.avatar_url} alt="GitHub User Profile Picture" /></div>
              <div className={ styles.title }>{this.props.gitHubUserName}</div>
              <div className={ styles.label }>{ userProfile.login}</div>
              <div className={ styles.label }>{userProfile.id}</div>
              <div className={ styles.label }>{userProfile.node_id}</div>
              <div className={ styles.label }>{userProfile.avatar_url}</div>
              <div className={ styles.label }>{userProfile.gravatar_id}</div>
              <div className={ styles.label }>{userProfile.url}</div>
              <div className={ styles.label }>{userProfile.html_url}</div>
              <div className={ styles.label }>{userProfile.followers_url}</div>
              <div className={ styles.label }>{userProfile.following_url}</div>
              <div className={ styles.label }>{userProfile.gists_url}</div>
              <div className={ styles.label }>{userProfile.starred_url}</div>
              <div className={ styles.label }>{userProfile.subscriptions_url}</div>
              <div className={ styles.label }>{userProfile.organizations_url}</div>
              <div className={ styles.label }>{userProfile.repos_url}</div>
              <div className={ styles.label }>{userProfile.events_url}</div>
              <div className={ styles.label }>{userProfile.received_events_url}</div>
              <div className={ styles.label }>{userProfile.type}</div>
              <div className={ styles.label }>{userProfile.site_admin}</div>
              <div className={ styles.label }>{userProfile.name}</div>
              <div className={ styles.label }>{userProfile.name}</div>
              <div className={ styles.label }>{userProfile.company}</div>
              <div className={ styles.label }>{userProfile.location}</div>
              <div className={ styles.label }>{userProfile.email}</div>
              <div className={ styles.label }>{userProfile.hireable}</div>
              <div className={ styles.label }>{userProfile.bio}</div>
              <div className={ styles.label }>{userProfile.public_repos}</div>
              <div className={ styles.label }>{userProfile.public_gists}</div>
              <div className={ styles.label }>{userProfile.followers}</div>
              <div className={ styles.label }>{userProfile.following}</div>
              <div className={ styles.label }>{userProfile.created_at}</div>
              <div className={ styles.label }>{userProfile.updated_at}</div>
            </div>
          }
          { !isLoading && errorMessage &&
            <div className={ styles.column }>
    <div className={styles.label}>WARNING - error when calling URL https://api.github.com/users/{this.props.gitHubUserName}. Error = {errorMessage}</div>
            </div>
          }
          </div>
        </div>
      </div>
    );
    }
    ```


Now save your code and treat yourself to a `gulp serve`. Refresh your web part and you should see the web part say **Loading…** for half a second, then load Eric’s profile.

"But that was a lot of weird code you just introduced!", you’ll say. I know! Let me walk you through it.

The first line in the `render` function:

```typescript
const { userProfile, isLoading, errorMessage } = this.state;
```

defines a "shortcut" to the state variables `isLoading`, `userProfile`, and `errorMessage`. That way, in the rest of the code, we don’t have to say `this.state.userProfile`, we can simply use `userProfile`.

The first section:

```typescript
{ isLoading &&
            <div className={ styles.column }>
              <div>Loading...</div>
            </div>
          }
```

says: "if `isLoading` is `true`, render the HTML between `{` and `}`".

Similarly, this line:

```typescript
{ !isLoading && userProfile &&
```

says "If `isLoading` is _not_ `true`, and there is a `userProfile` render the HTML between the `{}`.

Guess what:

```typescript
{ !isLoading && errorMessage &&
```

does? It only renders the HTML between the `{}` if the web part is done loading and there is an error message.

Everywhere else in that function uses `{}` to bind to a state or prop. For example:

```typescript
<div><img src={userProfile.avatar_url} alt="GitHub User Profile Picture" /></div>
```

Renders an image that binds the `src` attribute to the `avatar_url` attribute of the `userProfile` state variable, while:

```typescript
<div className={ styles.label }>{userProfile.login}</div>
```

Insert the value of the `login` attribute of the `userProfile` state variable inside the `<div/>` element.

Everywhere else in the `render` function works the same way.

We’re almost done! We just need to retrieve the _real_ data by passing the HTTP context and implementing the `GitHubService` to use it to call the real GitHub API.

## Passing HTTP Context

In order to make HTTP requests, the component needs to use the `HttpClient` object exposed by the web part.

That means that the `GitHubBadge` component needs to add an `HttpClient` variable to its `IGitHubBadgeProps` interface.

Let’s do this:

1. Open `src\webparts\gitHubBadge\components\GitHubBadge.types.ts`
2. At the top, import `HttpClient` from ‘@microsoft/sp-http’, as follows:
    
    ```typescript
    import { HttpClient } from '@microsoft/sp-http';
    ```
    
3. Add a prop variable that will store the `HttpClient` to the `IGitHubBadgeProps`. The `GitHubBadge.types.ts` file will look as follows:
    
    ```typescript
    
    import { IGitHubUserProfile } from "../../../services/GitHubServices";
    import { HttpClient } from '@microsoft/sp-http';
    ```
        
        ```typescript
export interface IGitHubBadgeProps {  
gitHubUserName: string;  
httpClient: HttpClient;  
}

export interface IGitHubBadgeState {  
isLoading: boolean;  
userProfile?: IGitHubUserProfile;  
errorMessage?: string;  
}
```
4. In the `src\webparts\gitHubBadge\GitHubBadgeWebPart.ts` web part, pass the new prop to the GitHubBadge component by changing the render as follows:

```typescript
public render(): void {
    const element: React.ReactElement<IGitHubBadgeProps> = React.createElement(
      GitHubBadge,
      {
        gitHubUserName: this.properties.gitHubUserName,
        httpClient: this.context.httpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }</code></pre>
<blockquote>
<p>You may have seen some samples that pass the entire web part context to  the components (including some of my samples).  Waldek has a <a href="https://blog.mastykarz.nl/dont-pass-web-part-context-react-components/">great article</a> that explains why you shouldn't. In this example, we choose to pass the <code>HttpClient</code> object from the web part's <code>context</code> instead of passing the entire <code>context</code>.
As a general rule, always listen to Waldek :-)</p>
</blockquote>
<h2>Creating the GitHubService</h2>
<p>The moment of truth!</p>
<ol>
<li>Go to the <code>src\services\GitHubServices</code> folder and add a file called <code>GitHubService.ts</code></li>
<li>At the top of the file, add the following imports:
<pre><code class="language-TypeScript">import { IGitHubService, IGitHubUserProfile } from "./GitHubServices.types";
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';</code></pre></li>
<li>Create the <code>GitHubService</code> class that implements the <code>IGitHubService</code> interface:
<pre><code class="language-TypeScript">
export class GitHubService implements IGitHubService {</code></pre></li>
</ol>
<p>}</p>
<pre><code>4. Add a <code>private</code> variable of type <code>HttpClient</code> that will be used to store the HTTP client object passed into the GitHubService:
```typescript
export class GitHubService implements IGitHubService {
  private _httpClient: HttpClient;

}
````

5. Add a `constructor` that receives the `HttpClient` object and stores it to the `private` variable:

    ```typescript
    constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
    }
    ```

6. Finally, implement the `getUserProfile` method that calls the GitHub API using the `HttpClient`

    ```typescript
    public getUserProfile(alias: string): Promise<IGitHubUserProfile> {
    const gitHubUrl: string = "https://api.github.com/users/"+alias;
    
    // call the GitHub API
    return this._httpClient.get(gitHubUrl,
      HttpClient.configurations.v1, {}).then((response: HttpClientResponse) => response.json())
      .then((profile: IGitHubUserProfile) => {
        return profile;
      });
    }
    ```

    The code almost seems magical: it calls the API and converts the received JSON to an `IGitHubUserProfile` interface automatically.


The final `GitHubService` code looks like this:

```typescript
import { IGitHubService, IGitHubUserProfile } from "./GitHubServices.types";
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export class GitHubService implements IGitHubService {
  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getUserProfile(alias: string): Promise<IGitHubUserProfile> {
    const gitHubUrl: string = "https://api.github.com/users/"+alias;

    // call the GitHub API
    return this._httpClient.get(gitHubUrl,
      HttpClient.configurations.v1, {}).then((response: HttpClientResponse) => response.json())
      .then((profile: IGitHubUserProfile) => {
        return profile;
      });
  }
}
```

To allow the `GitHubBadge` component to access the `GitHubService`, we need to add `GitHubService` to the `src\services\GitHubServices\index.ts`, making the entire `index.ts` as follows:

```typescript
export * from './GitHubServices.types';
export * from './MockGitHubService';
export * from './GitHubService';
```

Note that unlike the `MockGitHubService`, the `GitHubService` needs the `HttpClient` to work. Because the `getUserProfile` function is defined in the `IGitHubService` interface, we can’t change the function to pass the `HttpClient` when we need it.

However, we can change the `constructor` of the `GitHubService` to accept the `HttpClient` object we need.

## Calling the GitHubService

To change the code in the `GitHubBadge` component to use the `GitHubService`, we simply need to change the `componentDidMount` by following these steps:

1. Open the `src\webparts\gitHubBadge\components\GitHubBadge.tsx` file
2. Change the `import` statement at the top to include `GitHubService`:

    ```typescript
    import { IGitHubService, IGitHubUserProfile, MockGitHubService, GitHubService } from '../../../services/GitHubServices';
    ```

3. In the `componentDidMount` function, comment out this line:

    ```typescript
    const service: IGitHubService = new MockGitHubService();
    ```

    and add the following line just below:

    ```typescript
    const service: IGitHubService = new GitHubService(this.props.httpClient);
    ```


Nothing else needs to change.

Run `gulp serve` and try the web part. The data will be really coming from GitHub.

However, if you try to change the user name property and click **Apply**, you won’t see any changes unless you refresh the page.

We can fix that.

## Responding to changing props

While React is happy to automatically redraw the components when their state changes, our component only changes the state once it receives the data from the `GitHubService`.

And the `GitHubService` is only called once after the component is mounted.

To call the `GitHubService` when the component is mounted _and_ when the `gitHubUserName` prop changes, we need to move some code around.

To do so:

1. In the `src\webparts\gitHubBadge\components\GitHubBadge.tsx` file, add a private function called `getUserProfile` that calls the web service:

    ```typescript
    private getUserProfile()  {
    // Create an instance of the GitHub service
    //const service: IGitHubService = new MockGitHubService();
    const service: IGitHubService = new GitHubService(this.props.httpClient);
    
    // Call the GitHub service
    // In real-life, we would only call it when we're sure that there is a username
    service.getUserProfile(this.props.gitHubUserName).then((results: IGitHubUserProfile)=>{
      // Set the userProfile with the results we got and isLoading to false, because we're done
      // loading. It'll make things redraw magically.
      this.setState({
        userProfile: results,
        isLoading: false
      });
    });
    }
    ```

2. Change the `componentDidMount` function to call the `getUserProfile` private function:

    ```typescript
    public componentDidMount(): void {
    this.getUserProfile();
    }
    ```

3. Add a `componentDidUpdate` that will compare if the previous props are different than the current props and will call the private `getUserProfile` function if it is different:

    ```typescript
    public componentDidUpdate(prevProps: IGitHubBadgeProps, prevState: IGitHubBadgeState): void {
    if (prevProps.gitHubUserName !== this.props.gitHubUserName) {
      this.getUserProfile();
    }
    }
    ```


`componentDidUpdate` gets triggered any time the component’s `state` or `props` change. In this case, we use it to compare `gitHubUserName` and react accordingly.

Try your changes now using `gulp serve` and see it all work when you update the GitHub user name.

The final result looks like this:  
![file](image-1555661068219.png)

## Conclusion

In this article, we took the [GitHub Badge WebPart](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/js-gitHubBadge) that [Eric Skaggs](http://www.ericskaggs.net/) wrote using only JavaScript (no framework!) and converted it to a React web part that does the same thing.

We took a few detours on the way to convey some different concepts in React, but the result is _mostly_ the same.

There are still a few things the sample web part should do:

- Add error handler
- Add a "Loading…" spinner
- Add a placeholder when the web part isn’t configured
- Cache the results to avoid getting throttled by GitHub for making too many calls.  
    …but this article is already long enough.

You can find the entire solution on my [GitHub repo](https://github.com/hugoabernier/react-github-badge).

Thanks again to Eric for writing such an awesome sample web part. I hope that I did your sample justice with the React version.