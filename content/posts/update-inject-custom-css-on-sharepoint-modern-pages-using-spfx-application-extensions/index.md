---
title: "UPDATE: Inject Custom CSS on SharePoint Modern Pages using SPFx Application Extensions"
aliases:
- /2018/10/29/update-inject-custom-css-on-sharepoint-modern-pages-using-spfx-application-extensions

date: 2018-10-29T10:07:47+06:00

# post thumb

image: "posts/update-inject-custom-css-on-sharepoint-modern-pages-using-spfx-application-extensions/featured-image.webp"

# meta description


summary: "A while ago, I wrote an article describing how you can inject a custom CSS stylesheet on SharePoint modern pages using an SPFx application extension. The code sample is now part of the SharePoint SP-Dev-Fx-Extensions repository on GitHub. Since the article, I have been getting tons of e-mails asking all sorts of questions about the solution. Since SPFx 1.6 was released, I took the opportunity to upgrade the solution to the latest and greatest version of the toolset. You can find the latest code on GitHub, or download the latest SharePoint package. In this post, I’ll (hopefully) answer some questions about how to use it."

# taxonomies

categories:

- "SPFx"
tags:
- "React"
- "SPFx"

---
## Introduction

A while ago, I [wrote an article](/2018/05/08/inject-custom-css-on-sharepoint-modern-pages-using-spfx-extensions) describing how you can inject a custom CSS stylesheet on SharePoint modern pages using an SPFx application extension. The code sample is now part of the SharePoint [SP-Dev-Fx-Extensions repository](https://github.com/pnp/sp-dev-fx-extensions/tree/master/samples/react-application-injectcss) on GitHub.

Since the article, I have been getting tons of e-mails asking all sorts of questions about the solution.

Since SPFx 1.6 was released, I took the opportunity to upgrade the solution to the latest and greatest version of the toolset. You can find the latest code on [GitHub](https://github.com/hugoabernier/react-application-injectcss), or [download](https://github.com/hugoabernier/react-application-injectcss/raw/master/assets/react-application-injectcss.sppkg) the latest SharePoint package.

In this post, I’ll (hopefully) answer some questions about how to use it.

## Be smart

You should _really_ use the out-of-the-box customizations features before you resort to injecting custom CSS.

There are a few reasons why you shouldn’t inject your own CSS:

- Microsoft can change the HTML layout, element ids, or CSS classes at any time — thus breaking your custom CSS.
- Your customizations may hide or otherwise disable (or interfere with) new features Microsoft may introduce in the future.
- Your customizations will be unsupported by Microsoft. Don’t try to open support tickets (unless you’re willing to pay for them, I guess).
- Although the solution uses SPFx application extensions, the SharePoint/SPFx team will not be able to support your customizations.

That being said, there are valid reasons why you may need to inject custom CSS. [Vesa](https://twitter.com/vesajuvonen) and his team had to give careful consideration before accepting my solution as a code sample.

Here are some sample valid reasons for injecting your own CSS:

- To meet your corporate branding guidelines (but consider using a [custom theme](https://docs.microsoft.com/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-overview) first).
- To solve unique accessibility requirements (such as importing a [custom font](https://www.opendyslexic.org/) to help with cognitive disabilities, such as dyslexia).
- To solve an showstopping issue (you know, to shut up one of those bosses/clients that say distasteful stuff like: “we’ll only use SharePoint Online/Office 365 \*\*if\*\* Microsoft fixes the ugly look and feel and \[insert bad idea here\]”.
- For limited-time customizations (like fixing an issue while you’re waiting for Microsoft to fix it, or [making it snow](http://premiumcoding.com/CSSTricks/fallingSnow/) on Christmas Eve).

Ok, maybe the last one isn’t such a valid reason.

## Steps to inject your own CSS

1. [Download the code](https://github.com/hugoabernier/react-application-injectcss) and build the solution, or download the [pre-built solution](https://github.com/hugoabernier/react-application-injectcss/raw/master/assets/react-application-injectcss.sppkg).
2. Go to your tenant’s app catalog (usually at **[https://\[yourtenant\].sharepoint.com//sites/Apps/AppCatalog/Forms/AllItems.aspx](https://yourtenant//sites/Apps/AppCatalog/Forms/AllItems.aspx)**)
3. Drag and drop the **sppkg** file from step 1 onto the library (or click **Upload** and select the file).
4. When it prompts you **Do you trust react-application-injectcss-client-side-solution?** select **Deploy** (provided, of course, that you trust the solution!). If you want the extension to be available on all sites. check **Make this solution available to all sites in the organization** before you select **Deploy**. You may have to **check-in** the file if it is checked-out.
5. It may take a while for the application extension to show up (I once had to wait overnight for the magical SharePoint elves to deploy the extension).
6. Meanwhile, create your own CSS file to include your customizations. Name it **custom.css** (don’t worry, I’ll show you how to change that default name later).
7. Upload your **custom.css** to your root style library (located at **[https://\[yourtenant\].sharepoint.com/Style%20Library/Forms/AllItems.aspx](https://yourtenant/Style%20Library/Forms/AllItems.aspx)**). If you have versioning enabled on that library, you may have to **check-in** the file so that other people can see your custom css. Again, don’t worry, I’ll show you how to use a different location later.
8. Your custom CSS should show up!

> The most important part of this is that the **custom.css** is NOT part of the SPFx solution! It is a separate file stored in a publicly-accessible location.

## Frequently Asked Questions

### It doesn’t work

- Start by using the default **custom.css** name, with the default location of **[https://\[yourtenant\].sharepoint.com/Style%20Library/Forms/AllItems.aspx](https://yourtenant/Style%20Library/Forms/AllItems.aspx)**. Once it works, we can move/rename the CSS.
- Use a really obvious CSS to see that the style sheet is getting loaded. Something like:

.ms-compositeHeader-topWrapper {
    margin-top: 5px !Important;
    background-color: green;
}

if the above CSS works (by adding an ugly green bar at the top of the page), it means that the extension works and is able to load the custom CSS. Verify your CSS.

- Using your browser’s developer extensions, check to see if you’re getting any kind of HTTP 404 (Not Found) message. If you’re getting a 404, your CSS is named wrong or in the wrong place.

### It works, but only for me (and other administrators)

- You probably didn’t check-in and publish your CSS.

## The CSS doesn’t get packaged in my solution

- It isn’t supposed to be! By default, the CSS is uploaded in the **root style library** (which can be found at **[https://\[yourtenant\].sharepoint.com/Style%20Library/Forms/AllItems.aspx](https://yourtenant/Style%20Library/Forms/AllItems.aspx)**.

### Why doesn’t the CSS get packaged in the solution?

- I wanted to avoid having to re-deploy the solution every time I wanted to change the CSS.
- I wanted non-developers to be able to use the application extension.

### How do I change the name of the CSS?

1. Rename your CSS to whatever you want
2. Upload it to your root style library
3. Go to your **Tenant Wide Extensions** (located at: **[https://\[yourtenant\].sharepoint.com/sites/Apps/Lists/TenantWideExtensions/AllItems.aspx](https://yourtenant/sites/Apps/Lists/TenantWideExtensions/AllItems.aspx)**
4. Select the **InjectCssApplicationCustomizer** from the list.
5. Select **Edit Item** from the ribbon.
6. In the edit form, change the value in **Component Properties** to use your new CSS name and hit **Save**. For example, if you renamed your CSS to **contoso.css**, you’d change the entry to be:

```json
{
    "cssurl":"/Style%20Library/<strong>contoso</strong>.css"
}
```

### How do I place the CSS somewhere else than the root style library?

1. Place your CSS in a publicly accessible library
2. Go to your **Tenant Wide Extensions** (located at: **[https://\[yourtenant\].sharepoint.com/sites/Apps/Lists/TenantWideExtensions/AllItems.aspx](https://yourtenant/sites/Apps/Lists/TenantWideExtensions/AllItems.aspx)**
3. Select the **InjectCssApplicationCustomizer** from the list.
4. Select **Edit Item** from the ribbon.
5. In the edit form, change the value in **Component Properties** to use your new CSS name and hit **Save**. For example, if you created a new style library called **InjectCss** in the root site, you’d change the entry to be:

```json
{
    "cssurl":"/<strong>InjectCSS</strong>/custom.css"
}
```

### How do I place the CSS in a CDN?

- I didn’t test it. but in theory, you could follow the instructions above, but change the **cssurl** value to include the full path to your CDN.

## How do I do \[insert your own customization\] by injecting CSS?

I’m not a CSS expert, but here’s how I usually do my customizations:

1. Using your browser, surf to a modern page.
2. Launch your browser’s developer toolbar (CTRL-Shift-I for Chrome, F12 for Edge)
3. Use the element selector (CTRL-Shift-C for Chrome, Ctrl-B for Edge) select the element you want to customize.
4. From the **Styles** pane in the developer tools, select **\+** (**New Style Rule**) and enter the styles you want to change. Both Chrome and Edge has autocomplete capabilities, so feel free to explore. Don’t worry, it only changes your current page, and does not gets saved if you refresh the page or load a new page.
5. If you find that your styles are getting overwritten as soon as you apply them, try adding an **!important** instruction at the end of your style. (CSS experts are cringing as they read this).
6. Once your element looks the way you want it, copy the rule to your custom CSS and upload the CSS wherever your placed it in your tenant.

## Did I forget anything?

If there is anything I forgot, please let me know in the comments. I’ll try to answer every question… eventually.
