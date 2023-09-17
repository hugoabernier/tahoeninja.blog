---
title: "Introducing the SharePoint Framework Design Series"
aliases:

- /2019/07/06/introducing-the-sharepoint-framework-design-series

series: "SharePoint Framework Design Series"
date: 2019-07-06T10:07:47+06:00

# post thumb

image: "posts/introducing-the-sharepoint-framework-design-series/featured-image.png"

# meta description

summary: "Anyone who has worked with me on a SharePoint project knows that I firmly believe that a good custom web part must be indistinguishable from the out-of-the-box SharePoint web parts. They need to look and behave like they were written by whichever awesome team at Microsoft is responsible for writing those things."

# taxonomies

categories:

- "SharePoint"
tags:
- "SPFx"

---
## Introduction

Anyone who has worked with me on a SharePoint project knows that I firmly believe that a good custom web part must be indistinguishable from the out-of-the-box SharePoint web parts. They need to look and behave like they were written by whichever awesome team at Microsoft is responsible for writing those things.

Someone at Microsoft must feel the same way as I do because they took the take to create a nice [SharePoint Design](https://spdesign.azurewebsites.net/) web site dedicated to the SharePoint design principles; not just for web parts, but for sites and pages as well.

If you haven’t visited it yet, I encourage you to do so [now](https://spdesign.azurewebsites.net/). Go ahead, I’ll wait.

I like that Microsoft is documenting their design principles for web part look and feel, but they do not explain _how_ to achieve the awesome look they show.

That’s why I’ve created this series of posts on how to _build_ SharePoint web parts, using SPFX, that follow the Microsoft design principles. Each post is intended as a companion to their respective section in the [SharePoint Design](https://spdesign.azurewebsites.net/) site.

At the end of this series, you’ll be able to build beautiful web parts that will conform to Microsoft’s design principles and that will be indistinguishable from the out-of-the-box web parts.

In other words, the _perfect_ web part.

## Why should I follow Microsoft’s design principles for SharePoint web parts?

[Luke Wroblewski](https://www.lukew.com/ff/entry.asp?1798), a Product Director at Google once wrote:

> “Getting in the way of a speeding freight train usually doesn’t end well. It takes a lot of effort to shift the course of something with that much momentum. Rather than forcing people to divert their attention from their primary task, come to where they are.”

Every web part with custom styles, fonts, and designs that are hosted within a page competes for your user’s attention — in a bad way. You’re asking your users to learn a new user interface with every custom-layout web part you create.

Instead of focusing on your content, your users have to struggle just to make sense of your user interface.

In UX (user experience) circles, that’s a concept called **Cognitive overload**.

Cognitive overload is often caused by overstimulation. If you want a good example of overstimulation, go visit [LingsCars.com](https://www.lingscars.com/) and notice how you’ll have to struggle to take in all the information on that page.

![A good example of overstimulation](LingsCars.gif)  
[LingsCars.com](https://www.lingscars.com/)

In user experience, it is often said that:

> The best user experience is the one the user doesn’t notice

In SharePoint, your users are already familiar with the web part user interface and layout. They know where to look for the "Show all items" option, or what happens when they click on the pencil icon.

In this [awesome article on cognitive load](http://customerthink.com/cognitive-load-and-mobile-ux-design-how-to-make-a-user-less-overwhelmed/), they say that a way to reduce cognitive overload is to **Follow time-proof conventions**:

> Don’t reinvent the wheel. Users don’t wanna take another driving lesson.  
> [Dana Kachan](http://customerthink.com/cognitive-load-and-mobile-ux-design-how-to-make-a-user-less-overwhelmed/)

Following the SharePoint design principles for web parts is to follow an existing convention established in SharePoint and Office 365.

## Building trust

Many years ago, I was working with a brilliant developer. Well, _he_ did all the work while I attended meetings and demoed all his hard work, pretty much.

One day, he figured out a problem to a very difficult issue. I can’t remember what it was, but it was one that most people we talked to said that it couldn’t be solved.

When he demoed it to me, I was impressed, and I told him so. But then I pointed out that he was using the wrong font and colors, and that there was a spelling mistake on his screen.

(I’m talking _comic sans_ with italic and ugly green fonts. Yuck!!!)

He was shocked. He had just solved an impossible problem and I was complaining about a minor user interface issue?!!?

I explained to him that when we’ll demo his code to the client — who has no appreciation for how complicated the issue was and how amazing the solution was — all he will see is the ugly fonts, colors, and spelling mistakes. Instead of seeing a professional-looking solution, he’ll see something that looks _amateurish_. It will break — or at least chip away at — the trust he has in us.

A more recent example of this is when Game of Thrones was in its last season, people got really upset about a coffee cup that was visible in one of the scenes.

![Thar be mermaids!](D53FCurUEAEzEmo.jpg)

Everybody _knows_ that Game of Thrones was not _really_ filmed in a fantasy time where dragons existed, right?

So why did people get upset?

Because the coffee cup that was carelessly forgotten in a shot chipped away at people’s trust and respect for what was otherwise a beautifully produced show. It happened in the last season of the show when people were starting to criticize the writing and the rushed pace of the final episodes, and many people couldn’t overlook it.

When you design your own look and feel within SharePoint, you’re also chipping away at your user’s trust.

## Who should read this series?

If you’re a designer who’s anti-Microsoft and says "SharePoint looks like crap" and "I can do a better job myself", you’re absolutely right. You don’t need to read this series of blog posts.

If you’re a developer who is new or somewhat experienced with creating SPFx web parts, but typically doesn’t pay attention to how your web parts look — as long as they work, you may find this series of posts useful.

## Next article

Join me tomorrow for the first _real_ article in the series: [**Web Part Titles**](/2019/07/10/sharepoint-framework-design-series-web-part-titles-and-descriptions/).
