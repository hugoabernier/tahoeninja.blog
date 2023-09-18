---
title: "Getting to know SharePoint Hub sites"
aliases: 
  - /2018/03/29/getting-to-know-sharepoint-hub-sites

date: 2018-03-29T10:07:47+06:00

# post thumb
image: "posts/getting-to-know-sharepoint-hub-sites/featured-image.webp"
summary: "Unless you’re a SharePoint geek like me, you may not have been eagerly waiting for this new feature announced at Ignite 2017 in Orlando. Hub sites are a special site template that allows you to logically group team sites and communication sites under another site, with a shared navigation, theme, and logo."

# taxonomies
categories:
  - "SharePoint"

---
## Hub sites?

Unless you’re a SharePoint geek like me, you may not have been eagerly waiting for this new feature [announced at Ignite 2017](https://techcommunity.microsoft.com/t5/SharePoint-Blog/SharePoint-hub-sites-new-in-Office-365/ba-p/109547) in Orlando. _Hub sites_ are a special site template that allows you to logically group team sites and communication sites under another site, with a shared navigation, theme, and logo.

Hub sites will also aggregate news and activities from any sites associated to it, and you can search within a scope of a hub site and it’s associated sites.

The picture Microsoft used in their announcement explains it best:

![hubbahubba](hubbahubba.png)

## The Problem

The typical corporate intranet is often nothing more than a re-hash of the company’s corporate organization structure, blindly copied to a web site accessible to employees. If that intranet is done using SharePoint or Office 365, it’ll consist of a bunch of site collections with some sub-sites.

(By the way, I completely disagree with using the org chart for your intranet structure, but I’ll save it for another blog post).

What happens when your company restructures for (insert official reason here)? Let’s say that you had a whole bunch of Divisions, each with their own site (or site collection) and they completely change the divisions every quarter (like the CEO of a former client of mine liked to do).

What happens when the IT, Finance, and HR team are no longer in the same groups?

You end up having to either:  
a) Move sites around, break a lot of people’s favorite shortcuts and links; or  
b) Leave everything the way it is and give up hope

Or, you could create a structure that doesn’t need to change with the org-chart-of-the-week by using a flat structure. Since the new _modern_ sites in Office 365, it is a lot easier to create groups, team sites and communication sites in a rather “flat” structure (every site is created in their own site collection, located under https://_yourtenant_.sharepoint.com/sites/ or https://_yourtenant_.sharepoint.com/teams/).

So, now you end up with a flat site structure that doesn’t need to change when your information architecture changes again, but there is no easy way to navigate through this flat structure.

You can hack together some sort of global navigation with custom code and/or scripts, but every time someone wants to add a new site, you need to change the code.

## The Solution

SharePoint Hub Sites allows you to continue creating a flat structure and logically group sites together in a semi-hierarchical fashion.

There are caveats:

- As of this writing, you can only have up to 50 hub sites on your tenant.
- You can add sites to hub sites, but you can’t add hub sites to hub sites. And don’t get me started about hub sites under hub sites under hub sites.
- You need to be a SharePoint admin to create hub sites, but you can control who can add sites to what hub sites.
- You’ll need to do some PowerShell.

## Demonstration

We are going to create an **Employee Matters** hub, which will be the go-to place for employees to find resources related to being an employee of \[XYZ Corp\].

It will contain the following sites:

- Benefits
- Jobs
- Training

## Before you start

Download and install the latest [SharePoint Online Management Shell](https://www.microsoft.com/en-us/download/details.aspx?id=35588).

## Create “Sub” Communication Sites

1. From your Office 365 environment, create a **Communication site** by going to the **waffle  
    ![waffle](waffle.png)  
    **| **SharePoint** | **Create site**.  
    ![createsite1](createsite1.png)
2. From the **Create site** panel, select **Communication site.** It also works with Team sites.**![create site 2](create-site-21-e1522300742287.png)**
3. Choose the **Topic** layout and name the site **Benefits**. Give it a description if you’d like. Select **Finish**.  
    ![Createsite3](createsite3.png)
4. Repeat steps 1-3 above with **Jobs** and **Training** (or anything else you’d like to do), making sure to remember the URL of every site you create (you’ll need to go back to the sites you just created later).

## Create a (future) hub site

Repeat steps 1-3 above again, but this time call the site **Employee Matters**. This will be the site that will be converted to a hub site. Make note of the site’s URL.

## Register the hub site

1. Start the **SharePoint Online Management Shell**.  
    ![SPOMS](spoms.png)
2. From the PowerShell command prompt, type:

    ```powershell
    Connect-SPOService -URL https://-admin.sharepoint.com
    ```

    where is your own SharePoint tenant. Note that we’re connecting to the **Admin** site, _not_ the regular .sharepoint.com site.

3. Once connected (you’ll be prompted to login, probably), type:

    ```powershell
    Register-SPOHubSite -site https://.sharepoint.com/sites/employeematters
    ```

    …making sure to use the URL of the **Employee Matters** you created earlier. Note that this time, we are _not_ using the _\-admin.sharepoint.com_ domain, just the regular **.sharepoint.com** domain.

4. If all goes well, you’ll get something like this:

    ```powershell
    ID : 2be153d3-0fe8-4fb8-8fa0-b41dfdd8bd3f
    Title : Employee Matters
    SiteId : 2be153d3-0fe8-4fb8-8fa0-b41dfdd8bd3f
    SiteUrl : https://.sharepoint.com/sites/EmployeeMatters
    LogoUrl :
    Description :
    Permissions :
    ```

5. Memorize the GUIDs. Just kidding! You can pretty much ignore the response — as long as it didn’t start spewing red text, you’re doing fine.

At this point, if you got an error saying **Register-SPOHubSite** is not a valid command, you probably haven’t installed the latest version of the SharePoint Online Management Shell.

If it gives you an error saying that hub sites aren’t yet supported, go have a big nap and try again tomorrow.

You can go visit your newly created hub site. It should look like this:  
![employeematters1.png](employeematters1.png)

It doesn’t look much different than any other communication site, but it has an extra navigation bit at the top:

![hubsite2](hubsite2-e1522302489671.png)

If your site hasn’t updated yet, wait a little bit. Some of the changes take up to 2 hours, but every time I have done this, it was instant.

## Optional: Set your hub site icon and description

You don’t have to do this, but it is generally a good idea to label your sites and give them a custom icon. To do so:

1. Upload an icon of your choice to a library of your choice (for this demo, I created a document library called **Site Assets** in the Employee Matters site). Make note of the URL to the icon. The icon should be **64×64** pixels.
2. From the SharePoint Online Management Shell thingy, enter the following:

    ```powershell
    Set-SPOHubSite -Identity https://.sharepoint.com/sites/employeematters -LogoUrl https://.sharepoint.com/sites/employeematters/site%20assets/employeemattersicon.png -Description "Find resources for employees"
    ```

    Making sure to replace the LogoUrl for the URL to the icon you want (and making sure that you put whatever description you want for the site hub).

3. Your site hub will eventually get updated. Go take a look.

By the way, there is a user interface to change the site hub logo, but there isn’t one to change the description. You can get to it by following these steps:

1. Using your browser, go to your site hub.
2. From the site hub home page, select the **settings gear** and select **Hub site settings**  
    ![hubsite3.png](hubsite3.png)
3. From the **Edit hub site settings** pane that appears, you can change the icon or the site hub title. Not the description.  
    ![hubsite4](hubsite4-e1522304082511.png)
4. Select **Save** and your changes will (eventually) be reflected.

## Associate “sub” sites to hub site using your browser

1. Go to the **Benefits** site you created what seems like a million years ago.
2. From the **settings** gear icon, select **Site information  
    **![sitesettings1](sitesettings1.png)
3. From **Edit site information** pane that appears, select the **Employee Matters** hub site from the **Hub site association**, then select **Save**.  
    Note tha![sitesettings2](sitesettings2.png)Note that, in real life, only users who have been granted the rights to join a site will be able to do this — but that’s another blog post. Also, note that changing the hub site will change the site theme to match the hub site and add its navigation (as is clearly indicated on the **Edit site information** pane).

You should notice that your Benefits site will now have the Employee Matters navigation added at the top. That means it worked.

## Associate “sub” site to hub site using PowerShell

1. From the SharePoint Online Management Shell, enter the following:

    ```powershell
    Add-SPOHubSiteAssociation -Site https://.sharepoint.com/sites/Jobs -HubSite https://.sharepoint.com/sites/EmployeeMatters
    ```

It will associate the Jobs site to the Employee Matters hub. Note that the **\-Site** parameter is the site you want to add to the hub site, while the **\-HubSite** parameter is the hub site.

Use either the PowerShell method or the browser method to add the Training site to the hub site.

## Add links to the hub site navigation

The sites associated to your hub site now sport the new fancy hub site navigation, showing **Employee Matters**, but you’ll notice that the navigation did not get updated to show the newly associated sites.

To fix this:

1. Go to your hub site’s home page. You can do so by clicking on **Employee Matters** from any of your associated sites.
2. From the hub navigation (top left corner of the hub site, where it says **Employee Matters**) select **Edit**.
3. From the navigation editing pane that appears, select the **+** button to add a new link.  
    ![fancyplus](fancyplus.png)
4. In the **Add a link** pop-up that appears, enter the URL to the **Jobs** site in the **Address** field, and type in **Jobs** for the **Display name**, then select **OK.**![addlink](addlink.png)
5. Repeat until you have added **Jobs**, **Benefits**, and **Training** then hit **Save**.![hubsitenav](hubsitenav.png)

Your hub navigation will contain links to each associated site.

News, activities and search results from the hub home will include results from all associated sites, provided that the current user has permissions to each site. It takes a while before the results appear, but they will!

## Conclusion

Hub sites are going to be a great addition to SharePoint in Office 365. They aren’t going to solve every navigation issues, but they are certainly a step in the right direction.

There is still a lot to cover with theming and security, but that’s probably enough for today.
