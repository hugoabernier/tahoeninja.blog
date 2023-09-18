---
title: "Displaying site information security classification on every page using a custom SPFx extensions — Part IV"
aliases:
  - /2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iv
series: "Displaying site information security classification on every page using a custom SPFx extensions"

date: 2018-04-21T10:07:47+06:00

# post thumb
image: posts/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iv/featured-image.webp

# meta description
summary: "In this part, we will finally get to add code to our extension that reads the property bag of the current site and displays the appropriate site classification label."

# taxonomies
categories:
  - SPFx
---
In [part 1 of this article](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-i/), I introduced the concept for an SPFx extension that adds a header to every page, showing the classification information for a site.

In [part 2](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/), we created an SPFx extension that adds a header that displays a static message with the security classification of a site.

[In part 3](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iii/), we learned more about property bags and learned a few ways to set the **sc\_BusinessImpact** property (a property we made up) of our test sites to **LBI**, **MBI**, and **HBI**.

In this part, we will finally get to add code to our extension that reads the property bag of the current site and displays the appropriate site classification label.

# Reading the classification from the site’s property bag

You can get the property bag of a site using a simple REST call to **[https://yourtenant.sharepoint.com/sites/yoursite/\_api/web/allProperties](https://yourtenant.sharepoint.com/sites/yoursite/_api/web/allProperties)**  but it is even easier to use the SP PnP JS library make queries like these.

## Adding the SP PnP JS library to your project

Open the Visual Studio Code solution you created in [part 2](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/) and perform the following steps:

1. Open the terminal pane (**CTRL-\`**).
2. From the terminal pane, type:

    ```bash
    npm i sp-pnp-js --save
    ```

3. We’ll need to update the **ExtensionContext** in the **IClassificationHeaderProps** interface. It will allow the **ClassificationHeader** component to access the context used to make PnP calls. We’ll also add a couple variables to the **IClassificationHeaderState** interface: one to keep the classification we’ll retrieve from the property bag, and one to keep track if we’re still loading the page.  
    The code also defines the classification property bag name (**sc\_BusinessImpact**) and the default classification (**“LBI”**) for when it doesn’t find a classification for a site. Feel free to change either of those values to what makes sense for your needs.  
    Simply copy and paste the following code to **ClassificationHeader.types.ts**:

View the code on [Gist](https://gist.github.com/hugoabernier/14941ed32f70723fec9e3ac734df0b13).

4. Now we need to pass the **ExtensionContext** to the **ClassificationHeader** component. Open the **ClassificationExtensionApplicationCustomizer.ts** file and paste the following code (line **53** is the only line that was updated):

View the code on [Gist](https://gist.github.com/hugoabernier/59ef59f51f2ef2284a8f37b8239ea118).

5. Now we just need to make the ClassificationHeader component query the property bag when component mounts, save the classification in the state variable and change the render code to display the classification. Just copy the code below to **ClassificationHeader.tsx**:

View the code on [Gist](https://gist.github.com/hugoabernier/a56e0a8e1764b3ac334a60e5186ab0fd).

That should be it, let’s try it!

1. From the **Terminal** pane in Visual Studio Code, type:

    ```bash
    gulp serve
    ```

2. It should launch the browser to the page you had set up in [part 2](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/), in **serve.json**. If prompted to run debug scripts, accept.
3. Assuming that the default page is not one of your LBI, MBI, or HBI test pages, you should get the default value classification (e.g.: LBI).
4. Change the first part of the browser’s URL to point to your HBI page (change the part before **?debugManifestsFile=…**), and it should tell you that the site is classified **HBI**.
5. Repeat step 4 with your **LBI** and **MBI** sites and make sure that you get the right messages.

If everything went well, your sites displayed the right classification, but the message bar didn’t change from the default yellow warning. Let’s change that.

## Changing the message bar type based on the site classification

1. Change the **render** method of the **ClassificationHeader.tsx** to display a message bar type “warning” for MBI, and “severeWarning” for HBI, and “info” for everything else. The **render** method should look like this:

View the code on [Gist](https://gist.github.com/hugoabernier/ff368aaa85413279f45b4c5e357104f8).

Try the **LBI**, **MBI**, and **HBI** test pages again just like you did before, except this time, you should get the following:

![TestMBI2](TestMBI2.png)

MBI Test Site

![TestHBI](TestHBI.png)

HBI Test Site

### Help! The extension stops loading when I changed pages and it stopped prompting me if I want to load the debug scripts

You most likely forgot to include the part after **?debugManifestsFile=…** in the URL**.** Try to launch the extension again (gulp serve) and copy the part of the URL with the **?** to your test pages.

(I know because I did this a few times)

## How to debug the extension

In theory, the extension should work and load _at least_ the default LBI message. But what if you want to debug the extension?

Here is a simple trick:

1. Launch your extension by using **gulp serve** as you did above.
2. Copy the everything in the URL from the ?. It should look like something like this:  
    **?debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fmanifests.js&loadSPFX=true&customActions=%7B%224017f67b-81c7-5631-b0e5-57bd266bc5c1%22%3A%7B%22location%22%3A%22ClientSideExtension.ApplicationCustomizer%22%2C%22properties%22%3A%7B%22testMessage%22%3A%22Test%20message%22%7D%7D%7D**
3. In your Visual Studio Code project, find **launch.json** under the **.vscode** folder.
4. If you don’t have such a file, you probably need to install the **Chrome Debugger Extension for Visual Studio Code**. Just go to [https://aka.ms/spfx-debugger-extensions](https://aka.ms/spfx-debugger-extensions) and follow the instructions to install it.
5. Find the **configuration** entry that starts with **“name”: “Hosted Workbench”** and paste the ugly URL you got in step 2 at the end of the URL marked **“url”**. This will add the instructions to load the extension in debug mode.
6. From the Terminal pane, type:

    ```bash
    gulp serve --nobrowser
    ```

7. This will start the local web server but won’t launch the browser.
8. Set a few breakpoints where you want to debug the code by using **F9**. For example, the **render** method of the **ClassificationHeader** component.
9. From the **Debug** menu in Visual Studio Code, select **Start Debugging** and it should launch Chrome to the page you specified in **launch.json**, prompt you to login, then prompt you to run Debug scripts. Accept and you should be able to debug through the code.

This should be all for today. [Next part](/2018/04/22/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-v/) of this article will clean up some of the code, add localized strings, and prepare the code for production and deploy it!.
