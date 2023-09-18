---
title: "Information Architecture in SharePoint: Data, Information, Knowledge"
series: "Information Architecture in SharePoint"
aliases:

- /2019/02/15/information-architecture-in-sharepoint-data-information-knowledgei


date: 2019-02-15T10:07:47+06:00

# post thumb

image: "posts/information-architecture-in-sharepoint-data-information-knowledgei/featured-image.svg"

# meta description

summary: "This is the first in a series of articles discussing various aspects of Information Architecture within SharePoint."

# taxonomies

categories:

- "SharePoint"
tags:
- "Information Architecture"
- IA

---
## Introduction

When I tell people that I do most of my work with SharePoint and Dynamics 365, I’ll often hear something like:

> Oh, we have _the SharePoint_ at work. **It sucks**!

To which I usually respond something like:

> Oh, I just remembered! You’re boring, and I’m leaving!

(…and then blame my autism for being so blunt).

Other times, I take the time to explain that SharePoint is actually a great product. They have seen a bad implementation of it.

But how _bad_ can an implementation of SharePoint be? How hard is it to install SharePoint? And if you use SharePoint in Office 365, what’s your excuse?

The answer is that the _installation_ of SharePoint is not wrong. It is the content inside of SharePoint that lacks proper structure.

For example, let’s look at Excel: when you launch Excel, you get a blank worksheet with empty columns and rows.

You don’t blame Excel. You don’t say "Excel sucks!".

You start putting your data in, write some formulas, and format some cells. Then you get value out of Excel.

The key is to put your data in Excel in a way that makes sense. Putting all data about an item is on the same row. Arranging the data into columns, so that you can sort, group, and filter the data in a way that you can make sense of it.

If you feel fancy, you can even format the data into tables, highlight cells, or create charts.

That’s how you get value out of using Excel; By giving it some structure.

SharePoint works the same way: it starts with a (mostly) blank canvas, and you get to add your content.

But if you don’t take the time to structure your content, you end up with a mess.

If you allow other people to create content without proper **governance**, you get a bigger mess. People can’t find content, and whatever they find is often old, wrong, or duplicated.

That’s what **Information Architecture** (IA) is all about. IA is designing a structure for your information so that users can use your site and find the content they need.

This is the first in a series of articles discussing various aspects of IA within SharePoint.

By the end of this series, I hope to prove that SharePoint doesn’t suck — maybe your IA does?

## Data, Information, Knowledge

People often confuse the terms _data_, _information_, and _knowledge_ and use them interchangeably.

![Data, Information, Knowledge](DIKW-1.png)

Information and library scientists say that we should not confuse _data_, _information_, _knowledge_. They are very different. This is something called the _DIKW Pyramid_.

To build a better IA, you need to understand the difference between those terms.

### Data

- Data are the facts of the world.
- Data has no meaning, it is a description of things.
- We perceive data with our senses

For example, if you kept track of every time I refueled my car and how much it cost, that’s all you have. But that in itself has no meaning.

### Information

When you take data and put it in _context_, it starts having _meaning_.

For example, if you look at the data you collected earlier in the context of time and dates, you may notice a pattern. You may notice that I refuel my car every Mondays and Fridays. That means that I probably commute for my work (because I empty a full tank in 5 days) and that I travel on the weekend (because I use the same amount of fuel within two days)… or maybe that I should buy a new car because that’s a lot of refueling!.

See what happened here? We took data that had no meaning in itself, added some context (time and date) and got information.

In order words:  
![Data + Context = Information](5c662ed72fc49.png)

### Knowledge

Knowledge consists of _what we know_. We start with _information_, then add our own _experience_, _beliefs_, _rules of thumbs_. It becomes our knowledge.

In other words:  
![Information + Experience = Knowledge](5c6631226e37c.png)

If I take everything I know and write it down, it becomes _information_ again. Someone else has to use their own experience to make it their _knowledge_.

Unfortunately, we can’t store knowledge in computers (yet).

## Sample scenario

If you dump stuff in a SharePoint site, without structure. you create _data_.

I know, I know, I said that documents are _information_. If people can’t make sense of the content in your site, it becomes _data_ because it has _no meaning_.

If you want your content to have meaning, you need to put it _in context_.

For example, let’s imagine the following scenario:

- You keep a list of customers in SharePoint somewhere
- You have a document library containing customer contracts, proposals, and specs.
- You have a list of customer-related projects, with status reports, deliverables, etc.
- You have an RSS feed web part somewhere that has industry news, customer news, etc.
- There are account managers in your organization who each own one or more customers.
- You have a list of which account manager has what customer
- You have a list of experts and their industry expertise
- Your customers work across many industries

You experience the following problems:

- Your site users complain that they can’t find the documents they need.
- Account managers send the wrong versions of proposals
- You find many copies of the same document, with file names containing _\_finalversion_, _\_final\_final_, and _\_thisisreallythefinalversioniswear_
- Users don’t know about the RSS feed web part, or they don’t use it.
- People find it difficult to find the right experts for a given industry.

One of the ways that you could re-arrange the information would be to put it in the context of _customers_.

For example, imagine if you had a place for every customer. For now, let’s call it a _site_, but that’s not the point of this exercise.

Every site would have the same information:

- Customer information
- Customer documents
- Links to customer projects
- An RSS feed that shows news about the customer, the customer’s competitors, and their industry.
- A contact card for the account manager
- Contact cards for experts in the customer’s industry

Somewhere else, you would have a list of all customers with a link to their individual sites.

Finally, every account manager would see a **My Customers** web part. The web part would show them their list of customers and links to their customer sites.

Here is a potential usage scenario:

> Andrew is an account manager. He logs in to _the SharePoint_ first thing in the morning.
>
> Andrew is about to visit his customer and wants to see what’s going on. He clicks on the customer’s name in the **My Customers** web part to get the customer’s site.
>
> On the customer’s site, he can review the status of the latest proposal and project status.
>
> As he’s getting to leave, Andrew looks at the RSS news. He notices that the customer’s competitor is in the news for declaring bankruptcy. It may impact the proposal Andrew prepared.  
> Andrew wants to make sure is not affected.
>
> Andrew looks at the list of experts and sees that Edward is an expert in the customer’s industry. He sees that Edward is currently online and available. He chats with Edward to understand the impact of the competitor’s news. Edward explains how Andrew should change the proposal.
>
> Andrew makes the changes to the proposal. When he leaves for his customer meeting, he does so knowing he is well prepared.

This scenario is actually derived from an implementation I built many years ago. It uses the same _data_ that already existed, but by putting it in the context of a customer, it has meaning for its users.

By putting the customer list in the context of each user, it helps account managers. They can get to their customer information with fewer clicks.

Adding a list of industry experts makes it possible to get in touch with the people with _knowledge_.

## What it means

### Add context

The secret to creating content that has meaning (_information_) is to give it _context_. Otherwise, it is _data_.

To avoid data overload — and useless SharePoint content — make sure that you put data in context.

### Add links to people

You can’t store people’s knowledge in SharePoint. But if you provide links to people — who have the knowledge, you will make it easier for your users to reach experts.

### Personalize

_Personalization_ is not adding the person’s name on the top of the page and say _Hello, \[user\]_. That’s useless — I know my own name (except, maybe on Mondays)!

Think of _personalization_ as putting data in the context of a user. What does the user care about? What information do they need to do their jobs?

For example, one of my clients had offices across the world, with head offices in Toronto. Every day, users would log in to _the SharePoint_ and would see announcements like this:

- "IMPORTANT: Parking structure will closing this weekend"
- "Pastries in the lunchroom"
- "Cafeteria menu for today is chili!"
- "CEO to announce new deal today"

You think that people in Honduras cared about the parking lot closures or the pastries in the lunchroom? No! They do care about the CEO announcing the new deal, though.

People in the head office got value out of the announcements (chili day was always popular). Everybody else in the company — those who made money for the company — felt as if they were less important. They felt the news didn’t matter to them.

As a result, most people outside of the Toronto offices didn’t read the news. To them, the news became _data_, not _information_.

The fix was simple: create _corporate news_ for everyone, and _office news_ for each office, then roll them up as **News**. Combine corporate news with news related to the user’s office. That way, every user could see all the news that matter to them.

If someone wanted to see news for other offices, they could visit the site for that office. The default behavior was to show people the news in the context of their office.

## Conclusion

People often confuse _data_, _information_, and _knowledge_. Content without context has no value. It becomes _data_ — _noise_ that they have to filter through to get to what matters to them.

Information architecture strives to take all _data_ and create context. It makes it _information_ and gives it meaning.

You will find that by adding a little context to your content.

What if dictionaries contained all the words in the English language, but in random order? They would be useless.

Searching for a word would need you to scan the entire dictionary before you could find it.

It would be _frustrating_.

If you met me and I told you that I write dictionaries for a living, you would probably say:

> Oh, we have dictionaries at work. **They suck!**

In our next articles, we’ll discuss specific ways to create an information architecture. We’ll focus on creating an information architecture that makes sense for users.

We’ll also discuss how you can use SharePoint to create targeted content. You know, stuff that matters to users.

I hope this helps?

## For more information

[The DIKW Pyramid](https://en.wikipedia.org/wiki/DIKW_pyramid), Wikipedia
