---
title: Redirect your users to SharePoint Online with Smart 404
aliases:
  - /2019/12/16/move-your-users-to-sharepoint-online-with-smart404

date: 2019-12-16T10:07:47+06:00

# post thumb
image: posts/move-your-users-to-sharepoint-online-with-smart404/Smart404Zombie.png

# meta description
summary: "In today's post, we unearth an old SharePoint feature from 2009 and create a more contemporary version of it to help redirect users from your old on-premises SharePoint to SharePoint online."

# taxonomies
categories:
  - SharePoint
keywords:
  - migration
  - on-prem
---
## Introduction

I’ve covered this before, but I’ll repeat myself: moving to SharePoint Online isn’t just about moving your documents.

You also need to move your users.

Not physically, of course. But you need to help your users transition to the new platform, and it should be as painless as possible for them.

You should spend some time preparing your users for the upcoming changes, educating them and answering their questions. Because, for most users, change is a scary thing.

But even if you spend countless hours educating your users and holding their hands through the migration process, they may still have bookmarks to content that you moved from your on-premises SharePoint server to SharePoint Online. They may have shortcuts and favorites?

Some of the documents that you migrated may have links to your old on-premises SharePoint installation. Are you going to update every single document that contain hyperlinks to the old SharePoint site?

And how can you whether your users are still trying to go to old on-prem SharePoint links that are no longer there?

In today’s post, we’ll bring an old feature back from the dead to help make your migration to SharePoint Online a lot easier for you and your users.

It only works in situations where you keep your old SharePoint on-premises (2013, 2016, and 2019) server up and running while you migrate the content from it to your SharePoint Online instance.

Best of all, you won’t need to install any Dlls, Sandbox solutions, or Add-ons on your servers.

## The original sharepointsmart404

Back in 2009 a brilliant person by the name of Josh Carlisle created a cool solution called [**sharepointsmart404**](ttps://archive.codeplex.com/?p=sharepointsmart404). It enhanced the out-of-the-box SharePoint "Page Not Found" error (also known as a **404 error**) to provide support for *vanity URLs*.

A **vanity URL**, in case you’re wondering, is a unique URL branded for marketing purposes. Instead of using long and ugly URLs, you can use shorter, easier to remember URLs.

With smart 404, when people looked for a page or document that was no longer there, SharePoint would redirect them to the new location of that page/document as long as it found a matching vanity URL.

> **NOTE:** If you are the author of the original sharepointsmart404, or know the original author, I would like to link to their profile and give them credit. Please contact me, and I’ll make sure to update this post.

Here is how the feature worked:

* When someone asks for a SharePoint URL which does not exist, SharePoint redirects to the 404 error page
* The feature intercepts the 404 error and looks for the requested URL against a list of vanity URLs. Each vanity URL entry consists of a **requestURL** (the URL that caused the page not found error), and a **redirectURL** (the URL where users should be redirected).
* If there is a matching vanity URL, redirect users to the **redirectURL** and don’t display the "Page Not Found" message
* If there isn’t a matching vanity URL, display the "Page Not Found" message

This is the process there is a matching vanity URL:

<pre class="mermaid" style="text-align: center; background: none;" data-processed="true"><div id="dmermaid-1624481814769" style="font-family: &quot;trebuchet ms&quot;, verdana, arial, sans-serif;"><svg id="mermaid-1624481814769" width="400" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="768 0 512 512"><style>#mermaid-1624481814769{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}#mermaid-1624481814769 .error-icon{fill:#552222;}#mermaid-1624481814769 .error-text{fill:#552222;stroke:#552222;}#mermaid-1624481814769 .edge-thickness-normal{stroke-width:2px;}#mermaid-1624481814769 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1624481814769 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1624481814769 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1624481814769 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1624481814769 .marker{fill:#333333;}#mermaid-1624481814769 .marker.cross{stroke:#333333;}#mermaid-1624481814769 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-1624481814769 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#mermaid-1624481814769 .label text{fill:#333;}#mermaid-1624481814769 .node rect,#mermaid-1624481814769 .node circle,#mermaid-1624481814769 .node ellipse,#mermaid-1624481814769 .node polygon,#mermaid-1624481814769 .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#mermaid-1624481814769 .node .label{text-align:center;}#mermaid-1624481814769 .node.clickable{cursor:pointer;}#mermaid-1624481814769 .arrowheadPath{fill:#333333;}#mermaid-1624481814769 .edgePath .path{stroke:#333333;stroke-width:1.5px;}#mermaid-1624481814769 .flowchart-link{stroke:#333333;fill:none;}#mermaid-1624481814769 .edgeLabel{background-color:#e8e8e8;text-align:center;}#mermaid-1624481814769 .edgeLabel rect{opacity:0.5;background-color:#e8e8e8;fill:#e8e8e8;}#mermaid-1624481814769 .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#mermaid-1624481814769 .cluster text{fill:#333;}#mermaid-1624481814769 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80,100%,96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-1624481814769:root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}#mermaid-1624481814769 flowchart{fill:apa;}</style><g></g><g><path class="error-icon" d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"></path><path class="error-icon" d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"></path><path class="error-icon" d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"></path><path class="error-icon" d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"></path><path class="error-icon" d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"></path><path class="error-icon" d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"></path><text class="error-text" x="1240" y="250" font-size="150px" style="text-anchor: middle;">Syntax error in graph</text><text class="error-text" x="1050" y="400" font-size="100px" style="text-anchor: middle;">mermaid version 8.8.4</text></g></svg></div></pre>

This is the process when there are no matching vanity URLs:

<pre class="mermaid" style="text-align: center; background: none;" data-processed="true"><div id="dmermaid-1624481814769" style="font-family: &quot;trebuchet ms&quot;, verdana, arial, sans-serif;"><svg id="mermaid-1624481814769" width="400" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="768 0 512 512"><style>#mermaid-1624481814769{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}#mermaid-1624481814769 .error-icon{fill:#552222;}#mermaid-1624481814769 .error-text{fill:#552222;stroke:#552222;}#mermaid-1624481814769 .edge-thickness-normal{stroke-width:2px;}#mermaid-1624481814769 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1624481814769 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1624481814769 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1624481814769 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1624481814769 .marker{fill:#333333;}#mermaid-1624481814769 .marker.cross{stroke:#333333;}#mermaid-1624481814769 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-1624481814769 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#mermaid-1624481814769 .label text{fill:#333;}#mermaid-1624481814769 .node rect,#mermaid-1624481814769 .node circle,#mermaid-1624481814769 .node ellipse,#mermaid-1624481814769 .node polygon,#mermaid-1624481814769 .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#mermaid-1624481814769 .node .label{text-align:center;}#mermaid-1624481814769 .node.clickable{cursor:pointer;}#mermaid-1624481814769 .arrowheadPath{fill:#333333;}#mermaid-1624481814769 .edgePath .path{stroke:#333333;stroke-width:1.5px;}#mermaid-1624481814769 .flowchart-link{stroke:#333333;fill:none;}#mermaid-1624481814769 .edgeLabel{background-color:#e8e8e8;text-align:center;}#mermaid-1624481814769 .edgeLabel rect{opacity:0.5;background-color:#e8e8e8;fill:#e8e8e8;}#mermaid-1624481814769 .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#mermaid-1624481814769 .cluster text{fill:#333;}#mermaid-1624481814769 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80,100%,96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-1624481814769:root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}#mermaid-1624481814769 flowchart{fill:apa;}</style><g></g><g><path class="error-icon" d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"></path><path class="error-icon" d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"></path><path class="error-icon" d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"></path><path class="error-icon" d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"></path><path class="error-icon" d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"></path><path class="error-icon" d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"></path><text class="error-text" x="1240" y="250" font-size="150px" style="text-anchor: middle;">Syntax error in graph</text><text class="error-text" x="1050" y="400" font-size="100px" style="text-anchor: middle;">mermaid version 8.8.4</text></g></svg></div></pre>

Unfortunately, the original smart 404 is no longer maintained and does not work on SharePoint 2013 or newer.

But the idea was brilliant. So much so that nearly 10 years later, I haven’t forgotten about it.

## Bringing Smart 404 back from the dead

I set out to re-create the smart 404 to help anyone who wants to migrate from SharePoint 2013, 2016, or 2019 to SharePoint Online.

The original version used an ASP.NET HttpModule to intercept the request and required deploying DLLs to the server; I wanted to re-create it without using any custom DLLs, Add-ins, or anything of the sort.

To make the solution easier to deploy on any version of SharePoint 2013 or later, I’ll provide the steps to create the required lists and deploy the feature using out-of-the-box features of SharePoint. The instructions should work for 2013, 2016, or 2019, but I was only able to test it in 2013 and 2019. Let me know if you find any issues.

You can also download the web part and list templates from [my repo](ttps://github.com/hugoabernier/Smart404) if you’d like.

## Leveraging PageNotFoundError.aspx

Since SharePoint 2013, all 404 errors result in SharePoint displaying the `PageNotFoundError.aspx`, located in the `Pages` library of the root SharePoint site.

When SharePoint redirects a request to the `PageNotFoundError.aspx` page, it adds a query string parameter called `requestUrl`, which contains the request URL (and caused a 404 error).

So if you requested a page called `WheresMyStuff` on your `sharepoint.contoso.com` server which resulted in a 404 error, SharePoint would redirect you to:

    https://sharepoint.consoso.com/Pages/PageNotFoundError.aspx?requestUrl=https://sharepoint.contoso.com/WheresMyStuff

But here is the secret: the `PageNotFoundError.aspx` is a standard SharePoint web part page!

And our Smart 404 is just a regular good ol’ web part on that page!

## The new Smart 404 solution

There are three elements to the Smart 404 solution:

* **The `VanityURLs` list:** A list which maps a `redirectUrl` for each `requestUrl`.
* **The `RedirectLog` list:** A list which records when the Smart 404 Web Part displays, the requested URL , who requested it, and what the outcome was.
* **The Smart 404 Web Part:** A Content Editor Web Part that points to an HTML page with Javascript, which redirects the user or displays a "Page Not Found" message.

Let’s explore each component in details.

### The Smart 404 Web Part

The Smart 404 Web Part uses the Content Editor Web Part to embed some HTML in the `PageNotFoundError.aspx` page.

The HTML has some JavaScript which performs the following steps:

* When the page loads, it looks to see if there is a `requestUrl` parameter in the query string.
* If there is a `requestUrl`, it looks for a matching entry in the `SmartRedirects` list.
* If it finds a matching `requestURL`, it redirects the user to the matching `redirectURL` on SharePoint Online. It also creates an entry in the `RedirectLogs` list so that we can keep track of where we’re redirecting users.
* If it does not find a matching `requestURL`, it displays the "Page Not Found" error message (or, optionally, it redirects to the SharePoint Online search page). It also creates a record in the `RedirectLogs` list to record any potentially missing vanity URLs.

The updated sequence diagram looks as follows:

<pre class="mermaid" style="text-align: center; background: none;" data-processed="true"><div id="dmermaid-1624481814769" style="font-family: &quot;trebuchet ms&quot;, verdana, arial, sans-serif;"><svg id="mermaid-1624481814769" width="400" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="768 0 512 512"><style>#mermaid-1624481814769{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}#mermaid-1624481814769 .error-icon{fill:#552222;}#mermaid-1624481814769 .error-text{fill:#552222;stroke:#552222;}#mermaid-1624481814769 .edge-thickness-normal{stroke-width:2px;}#mermaid-1624481814769 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1624481814769 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1624481814769 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1624481814769 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1624481814769 .marker{fill:#333333;}#mermaid-1624481814769 .marker.cross{stroke:#333333;}#mermaid-1624481814769 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-1624481814769 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#mermaid-1624481814769 .label text{fill:#333;}#mermaid-1624481814769 .node rect,#mermaid-1624481814769 .node circle,#mermaid-1624481814769 .node ellipse,#mermaid-1624481814769 .node polygon,#mermaid-1624481814769 .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#mermaid-1624481814769 .node .label{text-align:center;}#mermaid-1624481814769 .node.clickable{cursor:pointer;}#mermaid-1624481814769 .arrowheadPath{fill:#333333;}#mermaid-1624481814769 .edgePath .path{stroke:#333333;stroke-width:1.5px;}#mermaid-1624481814769 .flowchart-link{stroke:#333333;fill:none;}#mermaid-1624481814769 .edgeLabel{background-color:#e8e8e8;text-align:center;}#mermaid-1624481814769 .edgeLabel rect{opacity:0.5;background-color:#e8e8e8;fill:#e8e8e8;}#mermaid-1624481814769 .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#mermaid-1624481814769 .cluster text{fill:#333;}#mermaid-1624481814769 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80,100%,96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-1624481814769:root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}#mermaid-1624481814769 flowchart{fill:apa;}</style><g></g><g><path class="error-icon" d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"></path><path class="error-icon" d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"></path><path class="error-icon" d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"></path><path class="error-icon" d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"></path><path class="error-icon" d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"></path><path class="error-icon" d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"></path><text class="error-text" x="1240" y="250" font-size="150px" style="text-anchor: middle;">Syntax error in graph</text><text class="error-text" x="1050" y="400" font-size="100px" style="text-anchor: middle;">mermaid version 8.8.4</text></g></svg></div></pre>

When looking for a match, the Smart 404 uses the following logic:

<pre class="mermaid" style="text-align: center; background: none;" data-processed="true"><div id="dmermaid-1624481814769" style="font-family: &quot;trebuchet ms&quot;, verdana, arial, sans-serif;"><svg id="mermaid-1624481814769" width="400" xmlns="http://www.w3.org/2000/svg" height="100" viewBox="768 0 512 512"><style>#mermaid-1624481814769{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}#mermaid-1624481814769 .error-icon{fill:#552222;}#mermaid-1624481814769 .error-text{fill:#552222;stroke:#552222;}#mermaid-1624481814769 .edge-thickness-normal{stroke-width:2px;}#mermaid-1624481814769 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-1624481814769 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-1624481814769 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-1624481814769 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-1624481814769 .marker{fill:#333333;}#mermaid-1624481814769 .marker.cross{stroke:#333333;}#mermaid-1624481814769 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-1624481814769 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#mermaid-1624481814769 .label text{fill:#333;}#mermaid-1624481814769 .node rect,#mermaid-1624481814769 .node circle,#mermaid-1624481814769 .node ellipse,#mermaid-1624481814769 .node polygon,#mermaid-1624481814769 .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#mermaid-1624481814769 .node .label{text-align:center;}#mermaid-1624481814769 .node.clickable{cursor:pointer;}#mermaid-1624481814769 .arrowheadPath{fill:#333333;}#mermaid-1624481814769 .edgePath .path{stroke:#333333;stroke-width:1.5px;}#mermaid-1624481814769 .flowchart-link{stroke:#333333;fill:none;}#mermaid-1624481814769 .edgeLabel{background-color:#e8e8e8;text-align:center;}#mermaid-1624481814769 .edgeLabel rect{opacity:0.5;background-color:#e8e8e8;fill:#e8e8e8;}#mermaid-1624481814769 .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#mermaid-1624481814769 .cluster text{fill:#333;}#mermaid-1624481814769 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80,100%,96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-1624481814769:root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}#mermaid-1624481814769 flowchart{fill:apa;}</style><g></g><g><path class="error-icon" d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"></path><path class="error-icon" d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"></path><path class="error-icon" d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"></path><path class="error-icon" d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"></path><path class="error-icon" d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"></path><path class="error-icon" d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"></path><text class="error-text" x="1240" y="250" font-size="150px" style="text-anchor: middle;">Syntax error in graph</text><text class="error-text" x="1050" y="400" font-size="100px" style="text-anchor: middle;">mermaid version 8.8.4</text></g></svg></div></pre>

### The VanityURLs List

The `VanityURLs` list is a very simple list. It contains the following fields:

* **Title**: A friendly title for your redirect. Not used by the web part, but helps make your list of Vanity URLs manageable.
* **RequestURL:** A text field containing the original URL of a resource.
* **RedirectURL:** The URL where you wish to redirect users when there is a matching `RequestURL`
* **RedirectType:** A choice field describing what type of redirect to use. The valid choices are either `Exact Match`, `Begins With` or `Regular Expression`
* **RegExp:** The regular expression to be used for `Regular Expression` matches
* **Order:** The priority for this vanity URL when more than one vanity URL matches the current URL

### The RedirectLog List

The `RedirectLog` list contains the following fields:

* **Title:** A simple text description of the outcome.
* **RequestURL:** The URL that was requested.
* **Referrer:** The HTTP Referrer (in case we were directed from somewhere else)
* **RedirectedTo:** The URL where we sent the user.
* **Outcome:**: Keeps track of whether users were redirected due to an exact match, a partial match, or if they were redirected to the search page because there weren’t any matching Vanity URLs.

The list also contains the standard **Created**, **CreatedBy**, **Modified**, **ModifiedBy** fields, which are used to record who and when the redirection occurred.

Once you deploy the Smart 404 Web Part, you can monitor the logs and look for the following patterns:

* **Large numbers of `No Match` outcomes:** Means that users are still trying to go to your old on-premises SharePoint server without a matching `RedirectURL`. You should consider finding where the content matching the `RequestURL` was relocated and create a new `SmartRedirects` item to redirect them to the right place.
* **Many entries to the same `RequestURL` from multiple users:** This means that somewhere out there, there is an old shortcut pointing to the on-premises SharePoint server that hasn’t been updated. It could be an existing system, a link in a document, etc. Look at the `Referrer` to see if they came from the same place.
* **Many entries from the same user:** This means that someone is being stubborn and has not updated their shortcuts to point to the new SharePoint Online tenant. They may simply need your help with updating their records.
* **A decline in the frequency of records/no more records:** This means that fewer people are trying to go to the old on-premises SharePoint server and that you should consider retiring your server without impacting your users.

## To deploy the Smart 404 solution

As promised earlier, the Smart 404 solution does not require deploying any DLLs or add-ins to your servers. You simply need to create the required lists, add the Content Editor Web Part to your `PageNotFoundError.aspx` page, and start adding some entries in your **SmartRedirects** list.

The detailed instructions, along with the code for the Smart 404 Web Part, can be found on [my Smart 404 repository](ttps://github.com/hugoabernier/Smart404), but he’s the summary:

* Make changes to the `Smart404.html` page as necessary to meet your own needs. For example, you can change the look and feel of the "Page Not Found" content template, or the "Your File Has Moved" template.
* Upload the modified `Smart404.html` page to your root site’s **Site Assets** folder
* Create the `VanityURLs` and `RedirectLog` lists (manually or using the list templates from the [repo](ttps://github.com/hugoabernier/Smart404))
* Add a content viewer web part that points to your `/SiteAssets/Smart404.html` page to your `PageNotFoundError.aspx`

## Conclusion

The process of migrating your SharePoint content from on-premises to SharePoint Online can take a while. During that time, your users may have shortcuts that point them to the old SharePoint instance.

The Smart 404 is a simple solution you can deploy on your on-premises SharePoint server that will replace the standard "Page Not Found" behavior of your SharePoint on-premises server to redirect users to the SharePoint Online equivalent of the content they were looking for.

## Thanks

* Thanks to [**Gary Rong**](ttps://garyrong.blogspot.com/) for helping build the code, and [**Rodney Hayden**](ttps://encounternewfoundland.com/newfinese-101-words-and-phrases-youre-likely-to-hear-on-the-rock/) for being ~~a test subject~~ volunteer participant,
* Credit goes to **Josh Carlisle** for the original **sharepointsmart404**.

## Updates

* December 16, 2019: [**Gary Rong**](ttps://garyrong.blogspot.com/) added logic to handle Regular Expressions and helped identify issues with the code in Internet Explorer, because — apparently — people still use IE?!?!.
