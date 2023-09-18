---
title: "Information Architecture in SharePoint: 3 Ways We Find Content"
series: "Information Architecture in SharePoint"
aliases:

- /2019/03/23/information-architecture-in-sharepoint-3-ways-we-find-content


date: 2019-03-23T10:07:47+06:00

# post thumb

image: "posts/information-architecture-in-sharepoint-3-ways-we-find-content/featured-image.webp"

# meta description

summary: "If you’ve ever tried to Google something when you don’t have the right keywords, you know how hard it is to find information."

# taxonomies

categories:

- "SharePoint"
tags:
- "Information Architecture"
- IA

---
## Introduction

A few years ago, my son fell in love with a song on the radio. He kept on asking us to play the song for him.

The problem is: like me, he is on the Autism Spectrum. He isn’t always good at communicating.

He’s incredibly sweet and incredibly caring, but he wasn’t a very good singer.

He didn’t know what the song was called. He couldn’t sing it for us. He just called it the "nehbie decktur" song.

When we asked what song he meant, he would just repeat the same sound over — in a sing-songy way.

"Nehbie decktur"

If you’ve ever tried to Google something when you don’t have the right keywords, you know how hard it is to find information.

![Wrong search query](image-1551983447091.png)

I searched and searched everywhere for that damned song.

I tried to get him to hum the song in one of the various tune-matching search engines. No luck.

Until one day, the song came on the radio and my son heard it.

That song was **[Rude](https://www.youtube.com/watch?v=PIh2xe4jnpk)** by Magic!.

The part where they sing **"Marry that girl"**, in his mind, sounded like **"Nehbie decktur"**.

To this day, we still call that song _Nehbie decktur_.

### The Problem

When we design Information Architecture (IA), we often assume that people find content in one way.

If they know exactly what they’re looking for, they’ll _search_ for content.

But if a user doesn’t know what keywords to use in their search query, it can be very difficult to find the content they need.

In this article, we’ll describe how we find content in different ways and how to design your Information Architecture to accommodate the various ways users find content.

## 3 Ways We Find Content

When looking for content, we use one of 3 approaches:

- Browsing
- Searching
- Subscribing

We’ll describe each approach below.

### Browsing

**Browsing** allows users to find content through _discovery_.

Let’s use an example: _Nancy the New Employee_ recently started at Contoso Inc.

She isn’t familiar with the organization structure, the department names, or even the company’s lingo. She can’t _search_ because she doesn’t know what keywords to use.

Browsing isn’t only for new employees. It allows users to find content in an area of expertise that they aren’t familiar with.

For example, your company may reimburse eligible daycare expenses for employees. Your Human Resource professionals, who are subject of matter experts on all things HR, may call this **Childcare support plan**.

However, your employees probably look terms like **daycare**, **babysitting**, or **pre-school**. Unless your HR folks used those keywords in their content, your users won’t find what they need.

But if you have a SharePoint site that lists all benefits in one place (maybe grouped by **life events**, like getting married, having children, retiring, etc.), it will allow your employees to find the content they need without being experts in Human Resources.

To support browsing, make sure that users can access **every piece of content** by following links.

There shouldn’t be any secret stash of content anywhere that can only be accessed through search.

#### How to design for browsing

- Read up on [navigation fundamentals](https://docs.microsoft.com/sharepoint/plan-navigation-modern-experience) for SharePoint.
- Consider using [megamenu navigation](https://techcommunity.microsoft.com/t5/Microsoft-SharePoint-Blog/Organize-your-SharePoint-sites-with-megamenu-navigation-and-new/ba-p/328068). ![Megamenu Navigation](image-1552011892481.png)
- Use [hub sites](https://docs.microsoft.com/sharepoint/planning-hub-sites) to logically group sites together.
- Use [news](https://support.office.com/article/Use-the-News-web-part-on-a-SharePoint-page-C2DCEE50-F5D7-434B-8CB9-A7FEEFD9F165) to highlight recently added content. ![News web part](image-1552011676496.png)
- Use the [hero web part](https://support.office.com/article/Use-the-Hero-web-part-D57F449B-19A0-4B0D-8CE3-BE5866430645) to highlight important content. ![Hero web part](image-1552011832059.png)
- [Avoid creating navigation that mimics your company’s org chart](/2019/02/18/information-architecture-in-sharepoint-one-size-does-not-fit-all/), but consider creating a site (or a page) that lists your organization’s divisions and departments.
- Consider creating a glossary site (or page) that shows your company-specific and industry-specific terms.

### Searching

When users know exactly what they’re looking for, they use **search**. It is the fastest and most direct way to get to the content they need.

Microsoft’s own [Overview of search in SharePoint Online](https://docs.microsoft.com/sharepoint/overview-of-search) is a good place to get started with search best practices, including:

- [Make sure content can be found](https://docs.microsoft.com/sharepoint/make-sure-content-can-be-found)
- [Make sure results look great](https://docs.microsoft.com/sharepoint/make-search-results-look-great)
- [Show relevant search results](https://docs.microsoft.com/sharepoint/show-relevant-search-results)

There are a few other things to consider:

#### Content consumers don’t always share the same domain of expertise as creators

In our previous example our consumer, _Nancy the New Employee_, isn’t a Human Resource professional. She doesn’t know that the proper keyword should be **childcare**.

Unfortunately, the HR professionals (i.e.: the creators of content) use the proper terms in their documentation.

We can’t expect the content creators to start tagging every single document with every single keyword that users might be thinking of.

One way to design for **Search** that satisfies the needs of both consumers and creators of content is to use **managed metadata**, particularly **synonyms**.

For example, to create synonyms for **childcare**, you would follow these steps:

1. Go to your SharePoint tenant admin site (i.e.: [https://\*\*yourtenantname\*\*-admin.sharepoint.com](https://**yourtenantname**-admin.sharepoint.com/))
2. From the **SharePoint Admin Center**, find **term store** in the left navigation.
3. You can [create your own term set](https://docs.microsoft.com/sharepoint/create-and-manage-terms) (I created one called **Human Resources**) or use an existing one. Select the term set you wish to use and select **Create term** from the context menu.  
    ![Create term](image-1553398776642.png)
4. The new term will be created in the navigation tree, just type the keyword your content creators will use. For example: **childcare**.  
    ![New keyword](image-1553398950014.png)
5. In the right pane, while your new term is selected, find the **Other labels** field in the **General** tab and enter all the terms your consumers will use. You can type more than one keyword, just use the **Enter** key to create a new line. In our example, I typed **daycare** and **babysitting**.  
    ![Other labels](image-1553399160446.png)
6. Hit **Save** to save your changes.

When users look for **childcare** or **babysitting**, they will find documents that also contain the word **daycare**.

Sometimes your consumers will use newer terms than your creators used. During the first H1N1 flu outbreak started making the news. My client’s SharePoint servers started getting queries for **H1N1** with no results found. However, the company already had detailed documentation on **flu prevention** and **preventing outbreaks**.

By monitoring search queries (the **No Result Queries by Day** and **No Result Queries by Month**, in your Admin center’s **Search** > **Search Reports** are a good place to start), we were able to notice the increased number of searches for **H1N1**. After a bit of research, we found that all we had to do was to create synonyms for **flu**, **influenza**, "orthomyxovirus **and** H1N1**. Just like that, users were able to find existing content for** H1N1\*\* they could not find the day before.

#### Consider search in your custom SPFx web parts

If you create custom SPFx web parts that use custom properties to store displayable content, your users may want to find the page containing your web part.

For example, I created a [web part sample](https://github.com/hugoabernier/react-diagram-webparts) that allows users to create sequence diagrams and flowcharts using simple text. One of the web part sample, the [**Sequence**](https://github.com/hugoabernier/react-diagram-webparts/blob/7ee446a9f8aaa207fa2c512fb4140365a5c3b3c2/src/webparts/sequence/SequenceWebPart.ts) diagram, exposes the text of the diagram as searchable by SharePoint.

![Sequence Diagram in Action](https://github.com/hugoabernier/react-diagram-webparts/raw/master/assets/SequenceWebPart.gif)

In order to make the content of the web part searchable, I exposed the `accessibleTitle` and the `accessibleText` properties as `isSearchablePlainText`. (My web part creates an accessible equivalent of the diagram for users who use screen readers).

To do so, simply add a `get propertiesMetadata` method in your web part class which returns a list of property names and `isSearchablePlainText: true`.

```typescript
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'accessibleText': { isSearchablePlainText: true },
      'accessibleTitle': { isSearchablePlainText: true }
    };
  }
```

If your property contains HTML text, you can also use `isHtmlString: true` in the same fashion.

### Subscribing

The last way people find content is when the system finds content that the user has indicated they are interested in — either explicitly or implicitly — and returns that content.

This can be done explicitly by users creating **Alerts** or by **Following** a site.

But it can also be done by SharePoint recommending content on the **SharePoint Home**, SharePoint **News** showing aggregated news posts from sites the user belongs to or even **Delve** analyzing the user’s interests via emails, tasks, etc.

The important point here is that if you design your information to be "subscribable", your users will find that information when they need it.

For example, if your company has offices in **Toronto**, **Helsinki** and **Melbourne**, you _could_ create a single **News** site and post office news from all three offices on that site. But when someone posts news about the Helsinki office that is really intended for folks from the Helsinki office ("Freshly baked korvapuusti at reception!"), do we really want everyone in the company to get that news post?

Note: that’s probably not a good use of SharePoint news, but korvapuusti (a yummy cinnamon-bun-type-thing with pearl sugar on top) and coffee is worth broadcasting!

Until **audience targeting** is available in News (which was [announced recently](https://techcommunity.microsoft.com/t5/Microsoft-SharePoint-Blog/SharePoint-News-Enhancements-March-2019/ba-p/366585), but then went missing from the announcement), you could create 3 sites (one for each office), and post news in each respective site.

Only users who follow the Helsinki office will see the news about the cinnamon "ear buns" promoted to them, while the other two offices will be blissfully ignorant.

> Heikki, if you’re reading this, I could use some _korvapuusti_ right about now. Oh and some _ruispala_, _kiitos_.

Another way to create "subscribable" content is to break it into smaller elements.

For example, maybe I want to have a list of items listed somewhere that people would want to know right away if something new is added.

You could simply use the rich-text editing feature on a modern page and list all the items, but it will require users to actively subscribe to the page in order to get notified. If the page has other content on it, they’ll get notified every single time any part of the page changes.

The other option is to create that list of items in a **Custom list**. Your page can use the **List web part** to embed the list. Now your users can subscribe to that list to get notified.  
![List web part](image-1553403035565.png)

## Conclusion

I have barely scratched the surface of how to design your Information Architecture for **browsing**, **searching**, and **subscribing**, but I hope that I managed to convey that people don’t all find content the same way, and that taking some extra time to consider _how_ people find content will help you design a better SharePoint.

As for me, I suddenly have a craving for cinnamon buns. I have to go make a batch for tomorrow morning! (Sugar-free, of course)

I hope this helps?
