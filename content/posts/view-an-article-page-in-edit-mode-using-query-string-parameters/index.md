---
title: "View an Article Page in Edit Mode using Query String Parameters"
aliases:
- /2015/05/04/view-an-article-page-in-edit-mode-using-query-string-parameters

date: 2015-05-04T10:07:47+06:00

# post thumb

image: "posts/view-an-article-page-in-edit-mode-using-query-string-parameters/featured-image.webp"

# meta description

summary: "You may never need this tip, but I recently ran into an issue where my article page’s Edit Page button stopped working in SharePoint 2013 (probably something I messed up with the master page… I’ll fix it later). I Googled and Binged everywhere, but couldn’t find how to switch an article page to edit mode."

# taxonomies

categories:
- "SharePoint"

---
You may never need this tip, but I recently ran into an issue where my article page’s **Edit Page** button stopped working in SharePoint 2013 (probably something I messed up with the master page… I’ll fix it later). I Googled and Binged everywhere, but couldn’t find how to switch an article page to edit mode.

All you need to do is append your page URL with the following parameters:

`?DisplayMode=Design&ControlMode=Edit`

So if your page is:  
`http://mysharepointserver/pages/tdamnededitbutton.aspx`
You would write:  
`http://mysharepointserver/pages/tdamnededitbutton.aspx`**`?DisplayMode=Design&ControlMode=Edit`**

I hope it saves someone else from having to search.

Did anyone have any problems with the Edit button not working? Share below!
