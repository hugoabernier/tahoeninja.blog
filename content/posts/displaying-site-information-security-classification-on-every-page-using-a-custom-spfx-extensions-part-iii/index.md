---
title: "Displaying site information security classification on every page using a custom SPFx extensions — Part III"
aliases:
  - /2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iii
series: "Displaying site information security classification on every page using a custom SPFx extensions"

date: 2018-04-21T10:07:47+06:00

# post thumb
image: posts/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iii/featured-image.webp

# meta description
summary: "In this article, we’ll discuss how we use property bags to store the security classification."

# taxonomies
categories:
  - SPFx
---
In [part 1 of this article](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-i/), I introduced the concept for an SPFx extension that adds a header to every page, showing the classification information for a site. In [part 2](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/), we created an SPFx extension that adds a header that displays a static message with the security classification of a site.

Yes, _static._ As in _hard-coded_. I try to write these articles for people who don’t have as much experience with developing SPFx extensions, so I included the step-by-step instructions.

In this article, we’ll discuss how we use property bags to store the security classification.

# What are property bags anyway?

_Property bags_ is a term used when describing a serialized list of properties. It isn’t unique to SharePoint — I remember using them in the good old C days, but SharePoint has been using them for a long time. Remember this screen from SharePoint Designer?

![AncientBag](AncientBag.jpg)

Property bags are a convenient way to store a whole bunch of properties of things. In SharePoint, a property bag can be applied to the **File**, **Folder**, **List** or **Web**\-level in SharePoint. When set at the **Web** level, it can be for a **Site Collection** or **Site** — at least that’s what [MSDN said about SharePoint 2013](https://msdn.microsoft.com/library/gg491706.aspx).

The great thing about property bags in SharePoint is that they are attributes of their parent, which means they are protected the same way their parents are.

In theory, you could use a custom SharePoint list, add it to every site, manage the permissions, and add one row per property you want to store about each site, but that would be painful.

You could also store an XML or JSON file in every site that does the same, but then you’d have to write the code to create and store the file, protect it, and read it.

…or you could use the _out-of-the-box_ mechanism to store metadata about a site, and let SharePoint create it and protect it. Also, you could use the countless ways to access the property bags (SharePoint designer, PowerShell, CSOM, PnP JS, Office 365 CLI, etc.).

So, for our Classification extension, we’ll store and read from the site’s property bag.  To pay a homage to Microsoft’s own solution to [Implement a SharePoint site classification solution](https://docs.microsoft.com/sharepoint/dev/solution-guidance/implement-a-sharepoint-site-classification-solution), we’ll use **sc\_BusinessImpact** for the property name. You could name it anything you want, but you probably want to keep it somewhat unique.

Here is what the property bag looks like in SharePoint Designer 2013:

![PropertyBagSharePoint](PropertyBagSharePoint.png)

# Storing custom properties in site property bags

In the [previous article](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/), I asked you to create test sites for LBI, MBI, and HBI tests. Now we’ll store the values **LBI**, **MBI**, and **HBI** in the **sc\_BusinessImpact** property in each respective site’s property bags.

There are a few ways to do this, but since this is just for testing purposes, I’ll offer two ways to cheat.

## Setting a custom property using SharePoint Design 2013

Yes, SharePoint Designer 2013 is still around. and it works with Office 365! What’s more, you can use it to easily set custom property bag values using it!

1. Using SharePoint Designer 2013, go to **File** | **Open SharePoint Site** and type the URL to your LBI site you created in the previous article in the **Site name** field.
2. Once connected, select **Site Options** from the toolbar.![SiteOptions](SiteOptions.png)
3. On the **Parameters** tab in the **Site Options** dialog, you’ll see the list of properties in the property bag. Don’t mess with them.  
    ![SiteOptionsNoPrp](SiteOptionsNoPrp.png)
4. Select **Add…** to add a new property.
5. In the **Add Name and Value** dialog box, type **sc\_BusinessImpact** in the **Name** field, and **LBI** in the **Value** field. Select **OK**.  
    ![SiteOptionsAdd](SiteOptionsAdd.png)
6. Back on the **Site Options** dialog, you should see the new property you created. Select **OK** to dismiss the **Site Options** dialog.
7. Repeat steps 1-6 with your MBI and HBI site, making sure to use MBI and HBI, respectively, in the **Value** field for step 5.

## Storing custom properties using the Chrome SharePoint Editor Extension

If you haven’t installed it yet, the [Chrome SharePoint Editor Extension](https://github.com/tavikukko/Chrome-SP-Editor) is a wonderful Chrome Extension that makes it easy to manage property bags. This is how to use it.

1. Using Chrome, browse to your LBI site.
2. Hit **F12** or **CTRL-SHIFT-I** to open the **Developer Tools**.
3. Find the **SharePoint** tab (should be one of the last ones, after **Audit**).
4. From the **Chrome SharePoint Editor** navigation, select **Web properties**.
5. In the **New Property Name** field, type **sc\_BusinessImpact**
6. In the **New Property Value** field, type **LBI**
7. Select **Add Property** to submit your changes.![PropertyBagusingspeditor.png](PropertyBagusingspeditor.png)
8. You should see a toast notification at the bottom right of the screen indicating it worked.
9. Repeat steps 1-8 with your MBI and HBI site.

## What to do if you get errors setting the property bag values

It is possible that you run into an issue where SharePoint actively refuses to set the property bag. To resolve this issue, you need to temporarily set **DenyAddAndCustomizePages** to **0** on each site. To do so:

1. Launch the **SharePoint Online Management Shell**.
2. From the command-line, type:

    ```powershell
    Connect-SPOService
    ```

3. When prompted for it, enter the URL to your admin site (e.g.: **[https://mytenant-admin.sharepoint.com](https://mytenant-admin.sharepoint.com/)**) and hit Enter.
4. You’ll most likely be prompted to log-in. Enter your credentials.
5. Once connected, type the following, making sure to enter the URL to your LBI site:

    ```powershell
    Set-SPOSite https://yourtenant.sharepoint.com/sites/testlbi -DenyAddAndCustomizePage 0
    ```

6. Repeat the previous step with your MBI and HBI site URLs, then try again one of the two methods to set your site property bags.

If you wish to do so, you can re-run the above commands setting **DenyAddAndCustomizePages** to **1** after you’re done setting your property bag values. Thanks to [Asish Padhy](https://blog.kloud.com.au/2018/02/08/how-to-set-property-bag-values-in-sharepoint-modern-sites-using-sharepoint-online-net-csom/) for the inspiration to set **DenyAddAndCustomizePages**.

You may think “Bah, I can just go to the SharePoint Admin site, and go to the settings, and enable this”, but as [My SharePoint Log](https://hangconsult.com/2015/10/21/sharepoint-online-denyaddandcustomizepages/) pointed out, you’ll have to wait up to 24 hours for this to take effect.

## Part III Conclusion

There are plenty of other methods to set property bag values, but the ones I listed above seemed the easiest.

I didn’t spend too much time on how to set up the values because, in a real-world scenario, you shouldn’t be setting the security classification property bag value by hand. It should be automatically configured when the site is created.

That’s something we’ll get to that much later. For now, we’ll focus on changing our _hard-coded_ message bar and make it display the actual site classification.

In the [next part](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-iv/) of this article, we’ll finally return to code and retrieve the site classification from the property bags and display the appropriate message.
