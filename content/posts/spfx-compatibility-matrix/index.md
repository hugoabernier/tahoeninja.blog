
---
title: "SPFx Compatibility Matrix"
aliases:

- /2019/12/30/spfx-compatibility-matrix
- /2019/12/30/spfx-compatibility-matrix
date: 2019-12-30T10:07:47+06:00
draft: false

# post thumb

image: "posts/spfx-compatibility-matrix/featured-image.jpg"

# meta description

description: "Here is a handy compatibility matrix telling you which version of SharePoint and SPFx work together."
summary: "Here is a handy compatibility matrix telling you which version of SharePoint and SPFx work together."

# taxonomies

categories:
- "SPFx"
tags:
- "React"
- "SPFx"

# post type

featured: true
author: "Hugo Bernier"
---

> **NOTE**: This matrix can now be found in the [SharePoint Framework Developer documentation](https://docs.microsoft.com/sharepoint/dev/spfx/compatibility) where I hope that the community will continue to help me maintain it.

## Introduction


A while ago, I was looking for an official list of which version of SPFx is compatible with each SharePoint version, but I couldn’t find what I wanted.

I kinda forgot about it until today, when someone reached out to me and asked me if I had a SPFX/SharePoint compatibility matrix handy.

As I turns out, I had created such a matrix when I wrote my [SPFX timeline](/2019/07/24/spfx-timeline/).

So, as I am the world’s laziest developer, I figured it would be very little effort to put such a matrix together by leveraging work I had already done.

The list in this post is not an official list; it is based on my interpretation of the SPFx release notes. If you find an error in it, please let me know and I’ll fix it.

## SPFx Version Compatibility


SharePoint Version|Supported SPFx version|Notes
---|---|---
SharePoint Online|All versions|
SharePoint Server 2019|v1.4.1 or lower|
SharePoint Server 2016|v1.1|Requires Feature Pack 2

## SPFx Development Environment Compatibility


**PRO TIP:** If you need to download a previous of Node.js, use the [previous releases page](https://nodejs.org/en/download/releases/) from their download section. You can also use links in the table below to download the versions of Node.js directly.

SPFx|Node.js|NPM|TypeScript|React
---|---|---|---|---
[1.15](https://docs.microsoft.com//sharepoint/dev/spfx/release-1.15)         | v12,  v14,  v16 | v5, v6, v7, v8                            | v4.5           | v16.13.1    |
[1.14](https://docs.microsoft.com//sharepoint/dev/spfx/release-1.14)|[v14.x](https://nodejs.org/dist/latest-v14.x/), [v12.x](https://nodejs.org/dist/latest-v10.x/)|v5, v6|v3.9|v16.13.1
[1.13.1](https://docs.microsoft.com//sharepoint/dev/spfx/release-1.13.1)|[v14.x](https://nodejs.org/dist/latest-v14.x/), [v12.x](https://nodejs.org/dist/latest-v10.x/)|v5, v6|v3.9|v16.13.1
[1.13.0](https://github.com/SharePoint/sp-dev-docs/blob/master/docs/spfx/release-1.13.md)|[v14.x](https://nodejs.org/dist/latest-v14.x/), [v12.x](https://nodejs.org/dist/latest-v10.x/)|v5, v6|v3.9|v16.13.1
[1.12.1](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.12.1)|[v14.x](https://nodejs.org/dist/latest-v14.x/), [v12.x](https://nodejs.org/dist/latest-v12.x/), [v10.x](https://nodejs.org/dist/latest-v10.x/)|v5, v6|v3.7|v16.9.0
[~~1.12.0~~](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.12.0)|[v12.x](https://nodejs.org/dist/latest-v12.x/), [v10.x](https://nodejs.org/dist/latest-v10.x/)| v5, v6                                | v3.7       | v16.9.0 |
[1.11.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.11.0)|[v10.x](https://nodejs.org/dist/latest-v10.x/)|v5, v6|v3.3|v16.8.5
[1.10.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.10.0)|[v10.x](https://nodejs.org/dist/latest-v10.x/), [v8.x](https://nodejs.org/dist/latest-v8.x/)|v5, v6|v3.3|v16.8.5
[1.9.1](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.9.1)|[v10.x](https://nodejs.org/dist/latest-v10.x/), [v8.x](https://nodejs.org/dist/latest-v8.x/)|v5, v6|v2.9|v16.8.5
[1.8.2](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.8.2)|[v8.x](https://nodejs.org/dist/latest-v8.x/), [v10.x](https://nodejs.org/dist/latest-v10.x/)|v5, v6|v2.9|v16.7.0
[1.8.1](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.8.1)|[v8.x](https://nodejs.org/dist/latest-v8.x/)|v5, v6|v2.7, v2.9, v3.x|v16.7.0
[1.8.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.8.0)|[v8.x](https://nodejs.org/dist/latest-v8.x/)|v5, v6|v2.7, v2.9, v3.x|v16.7.0
[1.7.1](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.7.1)|[v8.x](https://nodejs.org/dist/latest-v8.x/)|v5, v6|v2.4|v16.3.2
[1.7.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.7)|[v8.x](https://nodejs.org/dist/latest-v8.x/)|v5, v6|v2.4|v16.3.2
[1.6.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.6)|[v6.x](https://nodejs.org/dist/latest-v6.x/), [v8.x](https://nodejs.org/dist/latest-v8.x/)|v3 (w/ Node.js 6.x), v5 (w/ Node.js 8.x)| v2.4|15
[1.5.1](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.5.1)|[v6.x](https://nodejs.org/dist/latest-v6.x/), [v8.x](https://nodejs.org/dist/latest-v8.x/)|v3 (w/ Node.js 6.x), v5 (w/ Node.js 8.x)| v2.4|v15
[1.5.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.5)|[v6.x](https://nodejs.org/dist/latest-v6.x/), [v8.x](https://nodejs.org/dist/latest-v8.x/)|v3 (w/ Node.js 6.x), v5 (w/ Node.js 8.x)| v2.4|v15
[1.4.1](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.4.1)|[v6.x](https://nodejs.org/dist/latest-v6.x/), [v8.x](https://nodejs.org/dist/latest-v8.x/)|v3, v4|v2.4|v15
[1.4.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.4)|[v6.x](https://nodejs.org/dist/latest-v6.x/)|v3, v4|v2.4|v15
[1.3.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.3)|[v6.x](https://nodejs.org/dist/latest-v6.x/)|v3, v4|v2.4|v15
[1.1.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.1)|[v6.x](https://nodejs.org/dist/latest-v6.x/)|v3, v4|v2.4|v15
[1.0.0](https://docs.microsoft.com/sharepoint/dev/spfx/release-1.0.0)|[v6.x](https://nodejs.org/dist/latest-v6.x/)|v3|v2.4|v15

## Conclusion


If I made any mistakes in the list above, please do not hesitate to write in the comments. I’ll gladly update my matrix.

I still think that there should be an official compatibility list something in the SharePoint Documentation.

Maybe I should just submit a PR to the [SP Dev Docs repo](https://github.com/SharePoint/sp-dev-docs) and hope the community will help me keep my compatibility matrix accurate?

## Thanks

* Thanks to [David Warner II](https://twitter.com/DavidWarnerII) for the inspiration for this post and for helping fix my mistakes
* While doing my research for this post, I found [Andrew Connell](https://twitter.com/andrewconnell) has also written a [handy article](https://www.andrewconnell.com/blog/spfx-which-version-of-spfx-generator-to-install/).

## Updates

* June 27, 2022: SPFx 1.15 and updated my blog.
* Feb 19th, 2022: SPFx 1.14 is here!
* June 25, 2021: Totally forgot about SPFx 1.12.1
* March 15, 2021: Added SPFx 1.12
* October 5, 2020: Added links to download versions of Node.js directly.
* September 11, 2020: Thanks to [Don Kirkham](https://twitter.com/DonKirkham) for suggesting that we add the link to Node.js previous versions page.
* March 20, 2020: Moved this article to the [SharePoint Framework Developer documentation](https://docs.microsoft.com//sharepoint/dev/spfx/compatibility) where I hope that the community will continue to help me maintain it.
* January 12, 2020: I love it when people take the time to write in comments to help me keep content up-to-date! Thank you **Ronald Borman** for the many corrections to my matrix. Keep ’em coming!
* January 2, 2020: Thanks to [David Warner II](https://twitter.com/DavidWarnerII?s=20) for pointing out that [Andrew Connell](https://twitter.com/andrewconnell?s=20) has an awesome article on [how to use NVM as a better Node package manager](https://www.andrewconnell.com/blog/better-node-js-install-management-with-node-version-manager). It is a great solution if you need to run multiple versions of Node.js on the same environment.