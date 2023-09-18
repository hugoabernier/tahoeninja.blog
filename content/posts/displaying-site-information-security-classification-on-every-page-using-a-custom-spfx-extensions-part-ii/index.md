---
title: "Displaying site information security classification on every page using a custom SPFx extensions — Part II"
aliases:
  - /2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii
series: "Displaying site information security classification on every page using a custom SPFx extensions"

date: 2018-04-21T10:07:47+06:00

# post thumb
image: posts/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/featured-image.webp

# meta description
summary: "In part 1 of this article, I introduced the concept for an SPFx extension that adds a header to every page, showing the classification information for a site. We’ll actually do the coding in this article!"

# taxonomies
categories:
  - SPFx
---
In [part 1 of this article](/posts/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions), I introduced the concept for an SPFx extension that adds a header to every page, showing the classification information for a site.

We’ll actually do the coding in this article!

# Creating the SPFx extension solution

1. Using the command line, create a new project directory

```dos
md classification-extension
```

2. Change the current directory to your new project directory

```dos
cd classification-extension
```

3. Launch the Yeoman SharePoint Generator:

```dos
yo @Microsoft/sharepoint
```

4. When prompted for the **solution name**, accept the default **classification-extension**.
5. For the **baseline package** select **SharePoint Online only (latest)**.
6. When asked **Where do you want to place the files?** accept the default **Use the current folder**.
7. When asked if you want to **allow the tenant admin the choice of being able to deploy the solution to all sites immediately** respond **Yes** (unless you really want to deploy it to every single site manually).
8. When asked for the **type of client-side component to create** select **Extension**.
9. Select **Application Customizer** when asked about **Which type of client-side extension to create**.
10. Almost there. For **Application Customizer name**, use **ClassificationExtension**. Keep this name to less than 40 characters always.
11. For **Application Customizer description**, enter **Displays the site’s information security classification**.
12. What the miracle that is Yeoman creating the project for you. It’ll take a few minutes. Eventually, it’ll say **Congratulations! Solution classification-extension is created. Run gulp serve to play with it!**. We’re not quite ready, yet.

## Adding a static header

Now that the solution is created, we’ll quickly add a header to text that our extension is working. We’ll add the dynamic code later.

1. Launch Visual Studio Code and open the new project you created. From the command line, type:

```dos
code .
```

1. We could add code to directly manipulate the DOM and insert elements, but I prefer keeping my components in separate .TSX files. It keeps everything simple (because every component is responsible for only one thing), which makes my brain happy. It also keeps everything modular. From your project’s file explorer pane, navigate to **src | extensions | classificationExtension**
2. Right-click and select **New Folder**.  
    ![AddingaFolder](AddingaFolder.png)
3. Type **components** as the folder name.
4. On the newly created folder, right-click and select **New File**.
5. Name the new file **ClassificationHeader.types.ts**. This file will contain all the types that the Footer component (to be created soon) will use.
6. In the **ClassificationHeader.types.ts** file, paste the following (placeholder) code:

View the code on [Gist](https://gist.github.com/hugoabernier/35648aacf776016a6369e75422aa0fbf).

7\. Now right-click the **components** folder and select **New File**. Name your new file **ClassificationHeader.tsx**.

8\. Paste the following code in your **ClassificationHeader.tsx**.

View the code on [Gist](https://gist.github.com/hugoabernier/3f4233426a2240a2fbb3fcd3dc4501f0).

9. Finally, find the **ClassificationExtensionApplicationCustomizer.ts** file that was created by Yeoman and replace its content with the following code:

View the code on [Gist](https://gist.github.com/hugoabernier/a70e971843166dfafe002e9e2c9a269b).

What the code does:

- **ClassificationExtensionApplicationCustomizer.ts**: looks if there is a placeholder available called “Top”. If there is, it calls the **ClassificationHeader.tsx** component to render. You are never supposed to assume that a placeholder is there, so check every time.
- **ClassificationHeader.tsx:** renders a static/hard-coded Office UI Fabric MessageBar that says the site is MBI, and provides a fake link.
- **ClassificationHeader.types.ts:** defines a property and state interface for the ClassificationHeader component. Right now, both are empty but we’ll add some fields in future versions of this code.

## Testing that the extension works

Unlike SPFx web parts, you can’t text your extensions in the SPFx Workbench. I hope that it’ll be fixed in future versions of the workbench, but until then you need to test it on a real page on your Office 365 tenant.

Here is how to test your extension:

1. 1. In Visual Studio Code, find **serve.json** (located in the **config** folder).
2. Find an entry that looks like **[https://contoso.sharepoint.com/sites/mySite/SitePages/myPage.aspx](https://contoso.sharepoint.com/sites/mySite/SitePages/myPage.aspx%C2%A0)** and replace it to the url to a test page on your Office 365 tenant. For example: **[https://yourtenant.sharepoint.com/SitePages/Test-extension.aspx](https://yourtenant.sharepoint.com/SitePages/Test-extension.aspx)**. There should be two instances to replace.
3. From the **Terminal** pane (hit **CTRL-\`**) type:

    ```bash
    gulp serve
    ```

4. After a few moments, your favorite browser should launch and you should get a scary warning:![DebugScriptWarning](DebugScriptWarning.png)
5. Select **Load debug scripts** and the page should load with our fancy message bar at the top.  
        ![TestMBI](TestMBI.png)

I would consider that a success! Except, of course, that the extension is hard-coded to say that the site is classified as MBI.

But first, we need to create some test sites and classify them.

## Creating test sites

In your Office 365 tenant, create three new sites. You can use the Communication or Team site template, as long as you use a modern template.

The three sites will be:

- TestLBI
- TestMBI
- TestHBI

You can use any naming convention you’d like, just make note of the urls for each site because you’ll need them in the next step.

We’ll set the property bags on each of the three testing sites, but — unfortunately — it’ll have to be in the [next article](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iii/).
