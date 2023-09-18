---
title: "Displaying site information security classification on every page using a custom SPFx extensions — Part V"
aliases:
  - /2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-v
series: "Displaying site information security classification on every page using a custom SPFx extensions"

date: 2018-04-21T10:07:47+06:00

# post thumb
image: posts/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-v/featured-image.webp

# meta description
summary: "In this part, we will clean up a few things, package and deploy the extension."

# taxonomies
categories:
  - SPFx
---

In [part 1 of this article](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-i/), I introduced the concept for an SPFx extension that adds a header to every page, showing the classification information for a site.

In [part 2](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/), we created an SPFx extension that adds a header that displays a static message with the security classification of a site.

[In part 3](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iii/), we learned more about property bags and learned a few ways to set the **sc\_BusinessImpact** property (a property we made up) of our test sites to **LBI**, **MBI**, and **HBI**.

In [part 4](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iv/), we wrote the extension that reads from a site’s property bags and displays the classification in the header.

In this part, we will clean up a few things, package and deploy the extension.

# Preparing to deploy to production

The extension we wrote in parts 1-4 of this article works, but it isn’t really production ready.

First, we’ll want to change the code to only display the extension if a web can find a site’s information security classification in its property bag. That way, if you chose to deploy the extension to production, you won’t have to worry about affecting sites that do not have a security classification (although, it is recommended that every site has a classification, even if it is LBI by default).

Second, we’ll change the hard-coded hyperlink to point to a page on your tenant that provides handling instructions for each security classification.

Then we’ll remove all those hard-coded strings and replace them with localized strings.

Let’s get started!

## Conditionally display the extension

So far, [our code](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iv/) assumes that every site has a security classification — which is the right thing to do if you want to be compliant.

However, there are cases where you may want to deploy this extension in production and not display a security classification until you’ve actually applied a classification to a site.

To do this, we’ll change our code a little bit.

1. In **ClassificationHeader.types.ts**, we’ll change the default classification to be **undefined**. So, we’re changing this line:

    ```typescript
    export const DefaultClassification: string = "LBI";
    ```

    to this line:

    ```typescript
    export const DefaultClassification: string = undefined;
    ```

2. Now let’s change the **render** method in **ClassificationHeader.tsx** to handle an **undefined** value and skip rendering if there is no security classification. Change this code:

    ```typescript
    var barType: MessageBarType;
        switch (businessImpact) {
          case "MBI":
            barType = MessageBarType.warning;
            break;
          case "HBI":
            barType = MessageBarType.severeWarning;
            break;
          default:
            barType = MessageBarType.info;
        }
    ```

    to this code:

    ```typescript
        // change this switch statement to suit your security classification
        var barType: MessageBarType;
        switch (businessImpact) {
          case "MBI":
            barType = MessageBarType.warning;
            break;
          case "HBI":
            barType = MessageBarType.severeWarning;
            break;
          case "LBI":
            barType = MessageBarType.info;
            break;
            default:
            barType = undefined;
        }
    
        // if no security classification, do not display a header
        if (barType === undefined) {
          return null;
        }
    ```

When you’re done, the code should look like this:

View the code on [Gist](https://gist.github.com/hugoabernier/0beba86cfd7cc8df2108c1bd6b0f4579).

Test your extension again, making sure to try with an LBI, MBI, and HBI site, as well as any other site that hasn’t been classified yet (i.e.: that doesn’t have a security classification property bag value defined yet).

## Linking to handling procedures

Since the first part of this article, I have been using a fake URL instead of an actual link to handling instructions. Let’s set a default URL to display proper handling procedures.

1. Start by creating a page on your SharePoint site that explains to your users how they should properly handle information based on their security classification. You can create one page, or (ideally) create a separate set of URLs for each classification.
2. In **ClassificationHeader.types.ts**, we’ll add a new constant to store the URL to the new handling procedures page you created. If you created more than one, feel free to add more than one constant. If you don’t want to use a hyperlink, just set it as **undefined**. Add this line of code, with the URL of your choice:

    ```typescript
    export const DefaultHandlingUrl: string = "/SitePages/Handling-instructions.aspx";
    ```

    Remember that your URLs should be absolute (e.g.: [https://yourtenant.sharepoint.com/sitepages/handling-instructions.aspx](https://yourtenant.sharepoint.com/sitepages/handling-instructions.aspx)) or at least relative to the root (e.g.: /sitepages/handling-instructions.aspx), because your links will get rendered on every page in the site.

3. Now let’s change the **render** method in **ClassificationHeader.tsx** to use the handling URL in the hyperlink. Change this code:

```typescript
 public render(): React.ReactElement {
    // get the business impact from the state
    let { businessImpact } = this.state;

     // change this switch statement to suit your security classification
     var barType: MessageBarType;
     switch (businessImpact) {
       case "MBI":
         barType = MessageBarType.warning;
         break;
       case "HBI":
         barType = MessageBarType.severeWarning;
         break;
       case "LBI":
         barType = MessageBarType.info;
         break;
         default:
         barType = undefined;
     }
 
     // if no security classification, do not display a header
     if (barType === undefined) {
       return null;
     }
     
    return (
      
        This site is classified as {this.state.businessImpact}. Learn more about the proper handling procedures.
      
    );
  }
```

to this code (note that you’ll need to add an import for **DefaultHandlingUrl** at the top (not shown here):

```typescript
public render(): React.ReactElement {
    // get the business impact from the state
    let { businessImpact } = this.state;

    // ge the default handling URL
    let handlingUrl: string = DefaultHandlingUrl;

    // change this switch statement to suit your security classification
    var barType: MessageBarType;
    switch (businessImpact) {
      case "MBI":
        // if you'd like to display a different URL per classification, override the handlingUrl variable here
        // handlingUrl = "/SitePages/Handling-instructions-MBI.aspx"
        barType = MessageBarType.warning;
        break;
      case "HBI":
        barType = MessageBarType.severeWarning;
        break;
      case "LBI":
        barType = MessageBarType.info;
        break;
      default:
        barType = undefined;
    }

    // if no security classification, do not display a header
    if (barType === undefined) {
      return null;
    }

    return (
      
        This site is classified as {this.state.businessImpact}.
        {handlingUrl && handlingUrl !== undefined ?
           Learn more about the proper handling procedures.
          : null
        }
      
    );
  }
```

When you’re done, the code should look like this:

View the code on [Gist](https://gist.github.com/hugoabernier/10ebb072b69258a359ed355e0dbd2883).

## Localizing resources

There are a few places in our code where we display some text that is hard-coded in the code.

Being of French-Canadian origins, I am especially sensitive to the aspect of localization; you shouldn’t hard-code text, dates, numbers, currencies, and images in code if you can avoid it. Not only because it makes it easier to support easily support another language, but also because it makes it easy to maintain the text in your solution without wading through code.

Flashback: I remember working on a project where the geniuses in the marketing department changed the name of the product about 17 times while we were building it. Every time, the team would have to scour through the code to change the references to the product name. Once they learned the wonders of localization and string resources, they could change all references to the product name in a few seconds (they still gave the marketing department a hard time, though) 🙂

You only need to localize the code where something that is displayed could potentially change in a different _locale_. It’s not just a different language, dates, numbers and currencies are displayed differently depending on where you live, even if you speak English. You don’t need to worry about debugging code (e.g.: when you write to the console) unless you want people who speak in a different language to debug your code too.

Luckily, our code has only a few strings literals to worry about, and they’re all in the **ClassificationHeader.tsx**.

You _don’t have to_ localize your code. But you should. So follow these instructions if you want to be a better SPFx developer:

1. In the **myStrings.d.ts** file, located in the **loc** folder (**source | extensions | classificationExtension | loc**), add the following two lines to the

    **IClassificationExtensionApplicationCustomizerStrings** interface:

    ```typescript
        "ClassifactionMessage": "This site is classified as {0}. ",
        "HandlingMessage": "Learn more about the proper handling procedures."
    ```

2. In the **en-us.js** file, add two more lines below the **“Title”** line, making sure to add a comma at the end of the line that already exists:

    ```typescript
    ClassifactionMessage: string;
    HandlingMessage: string;
    ```

3. Now go to the **ClassificationHeader.tsx** file and add a reference to your localized strings at the top of the file, below all the other import statements:

    ```typescript
    import * as strings from "ClassificationExtensionApplicationCustomizerStrings";
    ```

4. Finally, replace the code in the **render** method to use the localized strings. Note that we’re replacing the placeholder in the localization string with the classification label. We could have simply concatenated the values, but every language has a different syntax structure, and doing it this way makes it easier to deal with different language syntax.

    ```typescript
    return (
            {strings.ClassifactionMessage.replace("{0}",this.state.businessImpact)}
            {handlingUrl && handlingUrl !== undefined ?
               {strings.HandlingMessage}
              : null
            }
        );
    ```

You code should look like this:

View the code on [Gist](https://gist.github.com/hugoabernier/e2796b71ac159479d202af32ec84b9ec).

## Optional: using configuration properties

The eagle-eyed reader may have noticed two things:

1. There is a **testMessage** property that is defined in the **ClassificationExtensionApplicationCustomizer.ts** that we never use.
2. The **ClassificationPropertyBag**, **DefaultClassification**, and

    **DefaultHandlingUrl** are all hard-coded. If you ever need to change any of the configuration items, you’d have to change the code, re-build, and re-deploy.

Thankfully, the SPFx team did a great job and designed SPFx extensions to support _configuration properties_. I don’t know if that’s what they’re actually called, but that’s what I call them 🙂

The **testMessage** is a sample configuration property that is created for us when we use the Yeoman generator. We can replace this property to anything that suits us. In our case, the **ClassificationPropertyBag**, **DefaultClassification**, and **DefaultHandlingUrl**.

To do this, let’s follow these steps:

1. Open **ClassificationExtensionApplicationCustomizer.ts** and replace the **IClassificationExtensionApplicationCustomizerProperties** interface code so that it looks like this:

    ```typescript
    export interface IClassificationExtensionApplicationCustomizerProperties {
      ClassificationPropertyBag: string;
      DefaultClassification: string;
      DefaultHandlingUrl: string;
    }
    ```

2. In the **ClassificationHeader.types.ts** file, add the same properties to the **IClassificationHeaderProps** interface by replacing the code to this:

    ```typescript
    export interface IClassificationHeaderProps {
        context: ExtensionContext;
        ClassificationPropertyBag: string;
        DefaultClassification: string;
        DefaultHandlingUrl: string;
    }
    ```

3. While you’re in there, make sure to remove the other definitions of **ClassificationPropertyBag**, **DefaultClassification**, and **DefaultHandlingUrl**.
4. Now back in **ClassificationExtensionApplicationCustomizer.ts** pass the properties to the **ClassificationHeader** props by replacing this code:

    ```typescript
    const elem: React.ReactElement = React.createElement(ClassificationHeader, {
            context: this.context
          });
    ```

    to this:

    ```typescript
    const elem: React.ReactElement = React.createElement(ClassificationHeader, {
            context: this.context,
            ClassificationPropertyBag: this.properties.ClassificationPropertyBag,
            DefaultClassification: this.properties.DefaultClassification,
            DefaultHandlingUrl: this.properties.DefaultHandlingUrl
          });
    ```

5. To prevent any issues from not having any configuration information, let’s add some code at the top of the **onInit** method:

    ```typescript
    if (!this.properties.ClassificationPropertyBag) {
          const e: Error = new Error("Missing required configuration parameters");
          Log.error(LOG_SOURCE, e);
          return Promise.reject(e);
        }
    ```

6. Finally, find any references to **ClassificationPropertyBag**, **DefaultClassification**, or **DefaultHandlingUrl** in **ClassificationHeader.tsx** and replace them to **this.props.\[property\]**. For example, replace **ClassificationPropertyBag** to **this.props.ClassificationPropertyBag**.

When you’re done, the code should look like this:

View the code on [Gist](https://gist.github.com/hugoabernier/e609c9e9a0c465176d0e7c57e6d34141).

This will allow you to pass configuration properties to the extension without having to change code.

To test this:

1. Find **serve.json** in the **config** folder.
2. Replace the **“properties”** attribute to pass the configuration we need, from this:

    ```json
    "properties": {
                "testMessage": "Test message"
              }
    ```

    to this:

    ```json
    "properties": {
                "ClassificationPropertyBag": "sc_x005f_BusinessImpact",
                "DefaultClassification": "",
                "DefaultHandlingUrl":"/SitePages/Handling-instructions.aspx"
              }
    ```

3. Launch the extension by using **gulp serve** and test that the extension still works.

**Note:** if you’re planning on debugging the extension, don’t forget that the URL has now changed with these new properties. Follow the instructions earlier to copy the URL to the **launch.json** file.

## Deploying to production

Assuming that everything works, we’re only a few steps away from deploying to production:

1. When you deploy the solution that includes the extension, SharePoint looks for the default configuration in the **elementx.xml** and uses whatever it found.  Since we changed the default properties, let’s go change the **elements.xml** file (you can find it in the **sharepoint** folder) to the following:

    ```xml
    <Elements xmlns="http://schemas.microsoft.com/sharepoint/">
        <CustomAction
            Title="ClassificationExtension"
            Location="ClientSideExtension.ApplicationCustomizer"
            ClientSideComponentId="4017f67b-80c7-4631-b0e5-57bd266bc5c1"
            ClientSideComponentProperties="{"ClassificationPropertyBag":"sc_x005f_BusinessImpact","DefaultClassification":"","DefaultHandlingUrl":"/SitePages/Handling-instructions.aspx"}">
        </CustomAction>
    </Elements>
    ```

2. From the **Terminal** pane type:

    ```bash
    gulp bundle --ship
    ```

3. Followed by:

    ```bash
    gulp package-solution --ship
    ```

4. Navigate to your tenant’s **App Catalog** (e.g.: **[https://yourtenant.sharepoint.com/sites/apps](https://yourtenant.sharepoint.com/sites/apps)**) site and navigate to the **Apps for SharePoint** library.
5. Find the folder where the package was created by going to Visual Studio Code and finding the **sharepoint** | **solution** folder, right-clicking and selecting **Reveal in explorer**.
6. Drag and drop the **classification-extension.sppkg** solution package to the **Apps for SharePoint** library.

You should be able to go visit your classified sites and see the extension at work. If it doesn’t work, you may have elected to not automatically deploy the solution to every site when you built the extension. If that’s the case, you’ll need to add the extension to the sites by using **Add an App**.

## Conclusion

It took 5 parts to describe how to build the extension, but we successfully created an extension that reads a site’s security classification from its property bag and displays the site’s classification in a label.

In our article, we manually set the classification by modifying the property bag, but in the real world, we’ll want to use an approach that automatically classifies sites when they are created.

The code for this application (including any modifications I may have made to it since publishing this article) can be found at[: https://github.com/hugoabernier/react-application-classification.](https://github.com/hugoabernier/react-application-classification)

If you’re interested in seeing how we might approach automatically classification, let me know in the comments and maybe I’ll create another (series of) article(s).

I hope this helps!?
