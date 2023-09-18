---
title: "Dynamic default properties in SPFx web parts"
aliases:
  - /2019/02/13/dynamic-default-properties-in-spfx-web-parts


date: 2019-02-13T10:07:47+06:00

# post thumb
image: posts/dynamic-default-properties-in-spfx-web-parts/featured-image.webp

# meta description
summary: "SharePoint client-side web parts (SPFx) allow you to define custom properties that your users can use to customize your web parts"

# taxonomies
categories:
  - SPFx
---
## Introduction

SharePoint client-side web parts (SPFx) allow you to define custom properties that your users can use to customize your web parts.

You can set default values in your web part’s `manifest.json` file so that the web part is already pre-configured when a user adds your web part to a page.

For example, the following (fictitious) [Deflatinator](https://phineasandferb.fandom.com/wiki/The_Fast_and_the_Phineas) web part — which allows you to shoot a beam that will deflate everything within the Tri-state area has three custom properties:

- **deflateBeachBalls** (`boolean`, default `true`) controls if it will deflate beach balls
- **deflateBlimps** (`boolean`, default `true`) controls if it will deflate blimps
- **maxMirrorBounce** (`number`, default 3) controls if the beam can bounce of mirrors (and increase chances that something will go wrong)
- **curseYou** (`string`, default `Perry!` (what else?)) controls who will be cursed if your plans go wrong.

Your web part’s props will be defined as follows:

```typescript
export interface IDeflatinatorWebPartProps {
  deflateBeachBalls: boolean;
  deflateBlimps: boolean;
  maxMirrorBounce: number;
  curseYou: string;
}
```

Your `Deflatinator.manifest.json` file would include a [`preconfiguredEntries`](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries) section that looks like this:

```json
  "preconfiguredEntries": [{
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
    "group": { "default": "Other" },
    "title": { "default": "Deflatinator" },
    "officeFabricIconFontName": "Pinned",
    "description": { "default": "Deflates everything within the Tri-state area." },
    "properties": {
      "deflateBeachBalls": true,
      "deflateBlimps": true,
      "maxMirrorBounce": 3,
      "curseYou": "Perry!"
    }
  }]
```

Every time a user adds your Deflatinator web part, it will have those default values. If you [configured your custom properties](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/basics/integrate-with-property-pane), your users will be able to customize the values as they wish.

The default values defined in your `manifest.json` are **static** — that is, the default value your users will receive will always be the same unless you change your `manifest.json`.

But what if you want different pre-configurations to be available to users?

Better yet, what if you want default values that change dynamically, depending on the user’s language, permissions, or preferences? How about the SharePoint environment, current date, the content of a list, or anything else?

Luckily, SPFx supports this!

## Specifying multiple (but static) pre-configured entries

The first — and easiest — way to offer different configurations is to [define multiple pre-configured entries](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries) in your `manifest.json` file.

For example, here is my `Deflatinator.manifest.json` file with two versions of the web part: one that deflates blimps by default (`deflateBlimps` is `true`), and one that does not (`deflateBlimps` is `false`):

```json
  "preconfiguredEntries": [{
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
    "group": { "default": "Other" },
    "title": { "default": "Deflatinator" },
    "officeFabricIconFontName": "Pinned",
    "description": { "default": "Deflates everything within the Tri-state area." },
    "properties": {
      "deflateBeachBalls": true,
      "deflateBlimps": true,
      "maxMirrorBounce": 3,
      "curseYou": "Perry!"
    }
  },
  {
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
    "group": { "default": "Other" },
    "title": { "default": "Deflatinator -- No blimps" },
    "officeFabricIconFontName": "Pinned",
    "description": { "default": "Deflates everything except for blimps within the Tri-state area." },
    "properties": {
      "deflateBeachBalls": true,
      "deflateBlimps": false,
      "maxMirrorBounce": 3,
      "curseYou": "Perry!"
    }
  }]
```

When users open the web part catalog, they will see two entries: **Deflatinator** and **Deflatinator — No blimps**. Depending on which web part entry they choose, the web part will either deflate blimps by default or not.

This is a good approach if you have a web part that can be used in a lot of different ways (like a web part with different views, or an **Embed** web part that allows you to embed different types of things in a page).

It is also a good way to emphasize different functionality within your web part.

However, it can also lead to over-crowding of your web part catalog. Imagine if we needed one pre-configured **Deflatinator** web part for every possible first name in the `curseYou` property?)

## Specifying dynamic defaults

Luckily, you can define default properties when the user adds your web part to their page at run-time using the `onInit` event in your web part code.

During the `onInit` event, you can set the default properties any way you want.

The only tricky bit is that `onInit` expects a `Promise<void>` response — but don’t let that scare you!

Here is some code that sets the same default values as above:

```typescript
protected onInit(): Promise<void> {
    // create a new promise
    return new Promise<void>((resolve, _reject) => {

        // set a default if Deflate Beach Balls has not been defined
        if (this.properties.deflateBeachBalls === undefined) {
            this.properties.deflateBeachBalls = true;
        }

        // set a default if Deflate Blimps has not beed defined
        if (this.properties.deflateBlimps === undefined) {
            this.properties.deflateBlimps = true;
        }

        // set a default if Mirror Bounce has not beed defined
      if (this.properties.maxMirrorBounce === undefined) {
        this.properties.maxMirrorBounce = 3;
      }

        // set a default if Curse You name hasn't been defined
        if (this.properties.curseYou === undefined) {
            this.properties.curseYou = 'Perry!';
        }

        // resolve the promise
        resolve(undefined);
    });
}
```

Of course, make sure to update your `manifest.json` file as follows:

```json
  "preconfiguredEntries": [{
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70",
    "group": { "default": "Other" },
    "title": { "default": "Deflatinator" },
    "officeFabricIconFontName": "Pinned",
    "description": { "default": "Deflates everything within the Tri-state area." },
    "properties": {
    }
  }]
```

> **NOTE:** If you find that your changes to the `manifest.json` file don`t seem to take effect when debugging your solution, you may need to stop debugging, run`gulp bundle\`, then restart debugging.

### Using localized default values

The code above does exactly the same thing as if you defined default values in your `manifest.json`. If that’s all you need, stick to setting the default values the `manifest.json`.

Let’s try setting the default `curseYou` property to a [localized](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts) name:

```typescript
// assumes that when you created your web part it defined your localized strings
// and that you added a DefaultCurseYouName property
import * as strings from 'DeflatinatorWebPartStrings';
...
protected onInit(): Promise<void> {
    // create a new promise
    return new Promise<void>((resolve, _reject) => {

        // set a default if Deflate Beach Balls has not been defined
        if (this.properties.deflateBeachBalls === undefined) {
            this.properties.deflateBeachBalls = true;
        }

        // set a default if Deflate Blimps has not beed defined
        if (this.properties.deflateBlimps === undefined) {
            this.properties.deflateBlimps = true;
        }

        // set a default if Mirror Bounce has not beed defined
        if (this.properties.maxMirrorBounce === undefined) {
            this.properties.maxMirrorBounce = 3;
        }

        // set a default if Curse You name hasn't been defined
        if (this.properties.curseYou === undefined) {
            // BEGIN CHANGED: use the localized default name
            this.properties.curseYou = strings.DefaultCurseYouName;
            // END CHANGED
        }

        // resolve the promise
        resolve(undefined);
    });
}
```

### Using current date and time

Ok, let’s make things a bit more complicated; Let’s pretend that your web part has a countdown (to indicate when the Deflatinator will trigger, of course) and that you want to store the `triggerTime` in a web part property.

You could update your `IDeflatinatorWebPartProps` to include a `triggerTime` prop:

```typescript
export interface IDeflatinatorWebPartProps {
  deflateBeachBalls: boolean;
  deflateBlimps: boolean;
  maxMirrorBounce: number;
  curseYou: string;

  // BEGIN ADDED: Add triggerTime
  triggerTime: Date;
  // END ADDED
}
```

Now let’s pretend that you want the `triggerTime` to automatically default to one day from when the user adds the web part. You would change your `onInit` method as follows:

```typescript
  protected onInit(): Promise<void> {
    // create a new promise
      return new Promise<void>((resolve, _reject) => {

      // set a default if Deflate Beach Balls has not been defined
      if (this.properties.deflateBeachBalls === undefined) {
        this.properties.deflateBeachBalls = true;
      }

      // set a default if Deflate Blimps has not beed defined
      if (this.properties.deflateBlimps === undefined) {
        this.properties.deflateBlimps = true;
      }

      // set a default if Mirror Bounce has not beed defined
      if (this.properties.maxMirrorBounce === undefined) {
        this.properties.maxMirrorBounce = 3;
      }

      // set a default if Curse You name hasn't been defined
      if (this.properties.curseYou === undefined) {
        this.properties.curseYou = strings.DefaultCurseYouName;
      }

      // BEGIN ADDED: set a default Trigger Date
      if (this.properties.triggerTime === undefined) {
        // Get the current date
        const defaultTrigger: Date = new Date();

        // Add one day
        // I know, I know, I could use momentjs, but this is
        // the cheesy way to do it without extra libraries
        defaultTrigger.setDate(defaultTrigger.getDate() + 1);

        // Set the default date
        this.properties.triggerTime = defaultTrigger;
      }
      // END ADDED

      // resolve the promise
      resolve(undefined);
    });
  }
```

When the user adds your web part, the default `triggerTime` will automatically calculate tomorrow’s date.

> **NOTE:** you’ll notice all my code above tests that the property is not `undefined` before setting the value. It handles cases where there _is_ a default value configured in the `manifest.json`. It is not necessary, but it doesn’t hurt to be extra careful, right?

### Using current user information

So far, we’ve used pretty simple tricks to set default properties to a dynamic value, but what if we wanted to do something a bit more difficult? What if we wanted to use (gasp!) _Promises_?! (Insert ominous music here)

Let us pretend that — for whatever reason — we wanted the web part\`s default property to use the name of the user who inserted the web part.

For this, we will use the awesome [PnP/PnPjs libraries](https://pnp.github.io/pnpjs/documentation/getting-started/).

First, start by installing the library to your project by using the instructions from the [PnP/PnPjs getting started page](https://pnp.github.io/pnpjs/documentation/getting-started/):

```
npm install @pnp/common @pnp/sp @pnp/logging @pnp/odata
```

> **NOTE:**  
> YOU: "Hey, everything I have seen — including the [PnP documentation](https://pnp.github.io/pnpjs/documentation/getting-started/) — says that I need to add `--save` in my `npm install` command. You did not do that! Did you forget it?"  
> ME: No, the `--save` parameter is no longer required with `npm install` (see the [documentation](https://docs.npmjs.com/cli/install.html)). It does not hurt if you have it, but it does not do anything anymore … assuming, of course, that you have a current version of `npm`.

Then add PnP libraries to your `imports` at the top of your web part code:

```typescript
import { sp } from "@pnp/sp";
import { CurrentUser } from '@pnp/sp/src/siteusers';
```

Then change your `onInit` as follows:

```typescript
protected onInit(): Promise<void> {
    // create a new promise
    return new Promise<void>((resolve, _reject) => {
      // set a default if Deflate Beach Balls has not been defined
      if (this.properties.deflateBeachBalls === undefined) {
        this.properties.deflateBeachBalls = true;
      }

      // set a default if Deflate Blimps has not beed defined
      if (this.properties.deflateBlimps === undefined) {
        this.properties.deflateBlimps = true;
      }

      //MOVED: moved the code to set the default Curse You name to the end of this function

      // Set a default Trigger Date
      if (this.properties.triggerTime === undefined) {
        // Get the current date
        const defaultTrigger: Date = new Date();

        // Add one day
        defaultTrigger.setDate(defaultTrigger.getDate() + 1);

        // Set the default date
        this.properties.triggerTime = defaultTrigger;
      }

      // set a default if Mirror Bounce has not beed defined
      if (this.properties.maxMirrorBounce === undefined) {
        this.properties.maxMirrorBounce = 3;
      }

      // BEGIN CHANGED: If there is no one to curse, get the current user
      if (this.properties.curseYou === undefined) {
        // No default value, get the current user's name
        sp.web.currentUser
          .select("Title") // don't retrieve everytyhing, we just want the display name
          .get()
          .then((r: CurrentUser) => {
            // set a default if Curse You name hasn't been defined

            // I always set a default value in case I can't get the current user's name
            let curseYouUser: string = strings.DefaultCurseYouName;

            // If we got user properties
            if (r !== undefined) {
              console.log("Yes to current user", r["Title"]);
              curseYouUser = r["Title"];
            }

            this.properties.curseYou = curseYouUser;

            // resolve the promise when done
            resolve(undefined);
          });
      } else {
        // Resolve the promise
        resolve(undefined);
      }
      // END CHANGED
    });
  }
```

You could also use the same approach to retrieve data from a SharePoint list, or from an external API.

## Bonus benefits

There is an added benefit to set default values in the `onInit` method: if you are debugging and testing your code, and want to make changes to the default values, you can just change the code in your `onInit` and your changes will be reflected next time you add the web part to a page.

If you changed your default values in your `manifest.json` instead, you would need to stop debugging, run `gulp bundle`, restart debugging, remove the web part, refresh the page, re-add the web part.

For a lazy person like me, it is much easier to change the `onInit` method. Just keep in mind that there are valid scenarios (like when you need to offer multiple versions of your web part) where it is better to use the `manifest.json` `preconfiguredEntries`.

Also, it doesn’t need to be a one-size-fits-all scenario: you can combine some entries in the `manifest.json` with some code in your `onInit`. That is why my code above always verifies that the value is `undefined` before I attempt to apply default values.

Just keep in mind the `onInit` gets called often. You want the code to be as fast and optimized as possible. For example, make sure the value you want to set as default is really empty before you call an API to get a default value.

## Conclusion

SPFx allows you to pre-configure default values for your web part custom properties that get applied when a user first adds the web part to a page.

When you want to dynamically set default values, you can override the `onInit` method to apply any logic you need.

In this article, I used a completely nonsense web part to demonstrate the concepts, but you can apply the same principles in your own (hopefully, less nonsense) web parts.

I hope this helps?

## For more information

- [Pre-configure web parts](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries) (Microsoft)
- [Configure custom properties](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/basics/integrate-with-property-pane) (Microsoft)
- [Localize web parts](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts) (Microsoft)
- [Define multiple pre-configured entries](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries) (Microsoft)
- [Get Current User information using PnP Library in SPFx](https://www.ktskumar.com/2018/11/get-current-user-using-pnp-library-spfx/) from Shantha Kumar Thambidurai.
