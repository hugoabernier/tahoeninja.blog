---
title: "Inject Custom CSS on SharePoint Modern Pages using SPFx Extensions"
aliases:

- /2018/05/08/inject-custom-css-on-sharepoint-modern-pages-using-spfx-extensions


date: 2018-05-08T10:07:47+06:00

# post thumb

image: "posts/inject-custom-css-on-sharepoint-modern-pages-using-spfx-extensions/featured-image.webp"

# meta description

summary: "If you need to customize the look and feel of modern pages, you can use custom tenant branding, custom site designs, and modern site themes without incurring the wrath of the SharePoint gods."

# taxonomies

categories:

- "SharePoint"
tags:
- "SPFx"

---
## Why would you want to inject CSS?

Since Microsoft introduced Modern Pages to Office 365 and SharePoint, it is really easy to create beautiful sites and pages without requiring any design experience.

If you need to customize the look and feel of modern pages, you can use custom tenant branding, custom [site designs](https://docs.microsoft.com/sharepoint/dev/declarative-customization/site-design-overview), and [modern site themes](https://docs.microsoft.com/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-overview) without incurring the wrath of the SharePoint gods.

If you want to go even further, you can use [SharePoint Framework Extensions](https://docs.microsoft.com/sharepoint/dev/spfx/extensions/overview-extensions) and [page placeholders](https://docs.microsoft.com/sharepoint/dev/spfx/extensions/get-started/using-page-placeholder-with-extensions) to customize _well-known_ areas of modern pages. Right now, those well-known locations are limited to the top and bottom of the page, but I suspect that in a [few weeks](https://sharepointna.com/), we’ll find out that there are more placeholder locations coming.

But what happens when your company has a very strict branding guideline that requires very specific changes to every page? When your customization needs go beyond what’s supported in themes? When you need to tweak outside of those well-known locations?

Or, what if you’re building a student portal on Office 365 and you need to inject a [custom font](https://www.opendyslexic.org/) in a page that is specifically designed to help users with dyslexia?

That’s when I would use a custom CSS.

## Here be dragons

Before you go nuts and start customizing SharePoint pages with crazy CSS customizations, we need to set one thing straight:

> With SharePoint, you should _always color within the lines_. Don’t do anything that isn’t supported, ever. If you do, and you run into issues, you’re on your own.

![A badly coloured version of the SharePoint logo.](SharePointColorWithinTheLines.png)

With SharePoint, you should always color within the lines

Remember that Microsoft is constantly adding new features to SharePoint. The customizations you make with injecting custom CSS may stop working if the structure of pages change.

What’s worse, you could make changes to a page that prevents new features from appearing on your tenant because you’re inadvertently hiding elements that are needed for new features.

With custom CSS (and a CSS zen master), you can pretty much do anything you want. The question you should ask yourself is not whether you can do it, but whether it is the right thing to do.

## Enough warnings! How do I inject custom CSS?

It is very easy. In fact, I’m probably spending more time explaining how to do it than it took me to write the code for this. If you don’t care about how it works, feel free to [download the source](https://github.com/hugoabernier/react-application-injectcss) and install it.

Using [SharePoint Framework Extensions](https://docs.microsoft.com/sharepoint/dev/spfx/extensions/overview-extensions), you can write code that you can attach to any Site, Web, or Lists. You can control the scope by how you register your extensions in your SharePoint tenant.

With an extension, you can insert tags in the HTML Head element.

I know what you’re thinking: we can just insert a STYLE block at in the HEAD element and insert your own CSS. Sure, but what happens when you need to change your CSS? Re-build and re-deploy your extension? Nah!

Instead, how about inserting a LINK tag and point to a custom CSS that’s located in a shared location? That way, you can modify the custom CSS in one place.

You can even have more than one custom CSS and use your extension properties to specify the URL to your custom CSS. In fact, you can add more than one extension on a site to combine multiple custom CSS together to suit your needs.

## Building your custom CSS injection extension

You too can design a beautiful SharePoint site that looks like this:

![sampleresults](sampleresults.png)

I’m really a better designer than this. I just wanted a screen shot that smacks you in the face with a bright red bar and a custom round site icon. It hurts my eyes.

1. Start by creating your own custom CSS (something better than I did, please). For example, the above look was achieved with the following CSS:

    .ms-compositeHeader {
        background-color: red;
    }
    .ms-siteLogoContainerOuter {
        border-radius: 50%;
        border-width: 3px;
    }
    .ms-siteLogo-actual {
        border-radius: 50%;
    }

2. Save your custom CSS to a shared location on your SharePoint tenant. For example, you could save it in the **Styles Library** of your root site collection. You could also add it to your own [Office 365 CDN](https://support.office.com/article/Use-the-Office-365-content-delivery-network-with-SharePoint-Online-BEBB285F-1D54-4F79-90A5-94985AFC6AF8). Make note of the URL to your CSS for later. For example, if you saved your custom CSS as **contoso.css** in the **Styles Library** of your tenant **contoso.sharepoint.com**, your CSS URL will be:

<https://contoso.sharepoint.com/Style%20Library/contoso.css>

which can be simplified to:

/Style%20Library/custom.css

3. Create an SPFx extension following the instructions provided in the [Build your first SharePoint Framework Extension (Hello World part 1)](https://docs.microsoft.com/sharepoint/dev/spfx/extensions/get-started/build-a-hello-world-extension) article. (Hey, why improve what’s already perfect?).
4. Change the props interface that was created for your ApplicationCustomizer class and replace the **description** property to **cssurl**. For example, my ApplicationCustomer class is called **InjectCssApplicationCustomizer** so my props interface is going to be called **IInjectCssApplicationCustomizerProperties**. Like this:

```typescript
export interface IInjectCssApplicationCustomizerProperties {
  cssurl: string;
}
```

5. Change your **onInit** method to insert a **LINK** element pointing to your **cssurl** property.

```typescript
 @override

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    const cssUrl: string = this.properties.cssurl;
    if (cssUrl) {
        // inject the style sheet
        const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
        let customStyle: HTMLLinkElement = document.createElement("link");
        customStyle.href = cssUrl;
        customStyle.rel = "stylesheet";
        customStyle.type = "text/css";
        head.insertAdjacentElement("beforeEnd", customStyle);
    }

    return Promise.resolve();
  }
```

6. In your **serve.json** located in the **config** folder, change the **pageUrl** to connect to a page on your tenant. Also change the **cssurl** property to pass the URL to the custom CSS you created in steps 1-2, as follows:

```typescript
{
  "$schema": "https://dev.office.com/json-schemas/core-build/serve.schema.json",
  "port": 4321,
  "https": true,
  "serveConfigurations": {
    "default": {
      "pageUrl": "https://contoso.sharepoint.com/SitePages/Home.aspx",
      "customActions": {
        "fcea9230-7f22-45b7-815c-081a49474611": {
          "location": "ClientSideExtension.ApplicationCustomizer",
          "properties": {
            "cssurl": "/Style%20Library/custom.css"
          }
        }
      }
    },
    "injectCss": {
      "pageUrl": "https://contoso.sharepoint.com/SitePages/Home.aspx",
      "customActions": {
        "fcea9230-7f22-45b7-815c-081a49474611": {
          "location": "ClientSideExtension.ApplicationCustomizer",
          "properties": {
            "cssurl": "/Style%20Library/custom.css"
          }
        }
      }
    }
  }
}
```

7. 7. Test that your extension works by running **gulp serve**. When prompted to allow debug scripts, select **Load debug scripts**.

![DebugScriptWarning](http://web.archive.org/web/20211209035937im_/https://tahoeninjas.blog/wp-content/uploads/2018/04/DebugScriptWarning.png)

You can now tweak your custom CSS to suit your needs, continuing to hit refresh until you’re happy with the results.

## Deploying to your production tenant

When ready to deploy, you need to bundle your solution, upload it to the app catalog, and enable the extension on every site you want to customize.

To make things easy, you can add an **elements.xml** file in your **SharePoint** folder and pre-configure your custom CSS URL. Here’s how:

1. In your solution’s **sharepoint/assets** folder, create a new file called **elements.xml**. If you don’t have a **sharepoint** folder or **assets** sub-folder, create them.
2. Paste the code below in your **elements****.xml**:
    
    ```xml
    <?xml version="1.0" encoding="utf-8"?>

<Elements xmlns="http://schemas.microsoft.com/sharepoint/">
    <CustomAction
        Title="InjectCssApplicationCustomizer"
        Location="ClientSideExtension.ApplicationCustomizer"
        ClientSideComponentId="fcea9230-7f22-45b7-815c-081a49474611"
        ClientSideComponentProperties="{&quot;cssurl&quot;:&quot;/Style%20Library/custom.css&quot;}">
    </CustomAction>
</Elements>
    ```

3. Make sure to replace the custom action **Title**, **ClientSideComponentId** to match your own extension. You can find those values in your **InjectCssApplicationCustomizer.manifest.json**, under **id** and **alias**.
4. Change the **ClientSideComponentProperties** to point to your CSS URL. Pay attention to URL encode the values (e.g.: a space becomes **%20**).
5. Run **gulp bundle –ship** to bundle your solution/
6. Run **gulp package-solution –ship**
7. Drag and drop the **.sppkg** file that was created in your **sharepoint/solution** folder to your tenant’s app catalog.

If you selected to automatically deploy to all site collections when building the extension, you’re done. If not, you’ll need to go to every site and add the extension by using the **Site Contents** and **Add an App** links.

## Conclusion

You can easily inject custom CSS in every modern page of your SharePoint tenant by using an SPFx extension, but **be careful**. With great CSS power comes great SharePoint responsibility.

You can get the code for this extension at [https://github.com/hugoabernier/react-application-injectcss](https://github.com/hugoabernier/react-application-injectcss)

I’d love to see what you’re doing with your custom CSS. Let me know in the comments what you have done, and — if you’re interested — share the CSS.

I hope this helps?
