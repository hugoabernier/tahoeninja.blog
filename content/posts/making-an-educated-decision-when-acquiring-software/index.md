---
title: "Making an educated decision when acquiring software — Part I: Acquisition Model"
aliases:

- /2019/07/10/making-an-educated-decision-when-acquiring-software

date: 2019-07-10T10:07:47+06:00

# post thumb

image: "posts/making-an-educated-decision-when-acquiring-software/featured-image.jpg"

# meta description

summary: "This post will explain some of the tips and tricks to use when buying new software that will help you make an educated decision."
lead: A tale, inspired by a true story
# taxonomies

categories:
- "Dynamics 365"


---
## Introduction

### A tale, inspired by a true story

Once upon a time, there was an IT guy who had been tasked to buy a piece of software. He wasn’t asked to do research or to investigate whether his company had the required infrastructure (or staff) to run the software. He was told to buy it and not to ask any questions.

The boss had already made up his mind. He wanted this software because the adverts in the magazine told him it would solve all his problems. He had already talked to the salespeople over a game of golf and a lavish dinner with copious amounts of alcohol.

The salespeople — really nice and friendly folks — had assured the boss that the software would not need any configuration or installation, and it wouldn’t affect any of his systems or cause any downtime.

When the IT guy started asking questions about whether the software the boss wanted was the right choice, the boss pretty much told him that if he didn’t want to take care of it, the boss would find someone who would. From what he had seen from the marketing videos on YouTube, the boss was pretty sure that even _he_ could do it himself.

Eventually, the IT guy gave in and installed the software.

But not before discovering that the software required a whole bunch of new servers and needed to run on an operating system that no one in the IT department had any experience managing. So they hired a new IT guy that knows that particular operating system.

Meanwhile, the database administrators found out that the only database platform that was supported by this new software was not the database platform the company had standardized on. They bought more servers and hired a new DBA that was familiar with that database platform.

When it came time to customize the software to meet the company’s needs, they found out that none of the application development team had the time or the skills required to do such customization. Luckily, one of the top contractors in that programming language happened to be available and could start immediately — at a premium rate.

One day, as the exasperated IT guy was eating a sandwich and staring blankly at the lunchroom wall, the Webmaster guy — who usually works on another floor, but was in the neighborhood for a meeting — walked in.

– "Whoa, you look like you have had a rough few months!" said the webmaster. It was meant as a joke, but it was also true.

The IT guy and the webmaster had known each other for a long time. They worked together when the IT department was just a handful of guys. Back then, the webmaster was just running the company’s web site, but he had since started managing the company’s intranet and portal.

– "Agh! I just found out that we’re going to have to start a nightly export of our user data because the \[expletives deleted\] isn’t compatible with our Active Directory. Of course!", was the IT guy’s response. "And our first migration to the new system is going to take a lot longer than we expected and we’ll need to ask the accounting department to stop working for two whole weeks while we migrate the system. And they’re unhappy because it is the end of the fiscal quarter."

The webmaster asked cautiously: "And… what exactly does this new software do?"

The IT guy explained what the new software did.

– "Uh, you mean like what our current portal platform has available out of the box?" asked the webmaster. "That’s what \[redacted\]’s team has been using for about two years now. _The boss_ even sent an email congratulating the team for doing such a good job. I even demoed it to the boss!".

The rest of the tale isn’t appropriate for this blog. But there was a lot of cursing and yelling. Let’s just say that they lived miserably forever after, having to maintain that software that never truly worked the way it was intended.

Sadly, this kind of scenario happens more often than you’d think. You may have experienced this yourself where you work.

This post will explain some of the tips and tricks to use when buying new software that will help you make _an educated decision_.

## Software acquisition model

I often hear people talk about "Buy vs Build" when discussing their software acquisition model.

In reality, you should always consider **Re-use**, **Buy**, and **Build**.

```flowchart
st=>start: Start
d1=>condition: Can I re-use?
d2=>condition: Can I buy?
e1=>end: Re-use
e2=>end: Buy
e3=>end: Build
st->d1(no)->d2(no)->e3
d1(yes)->e1
d2(yes)->e2
```

### Re-use

Do you already own a piece of software that will meet your needs? It may be an unused part of something you already bought, or it may be an internal application that another department has already developed.

You should also consider open-source solutions as part of the re-use decision. Can you _re-use_ open-source software that already exists out there, for free, to meet your needs?

Is there an add-on feature available for of the software you already own that would meet your needs? Even if it would cost you a little more to enable that feature?

If the answer is yes (or mostly yes), you should explore the possibility of re-using what’s already available before buying.

Don’t compromise, but don’t miss what’s already right in front of you either.

I recently went through this process with a client that uses Office 365 — with SharePoint, Flow, and PowerApps at their disposal. They wanted to buy a piece of software because it called a third-party API and made it possible to trigger data workflows from the results of the API… which is something that they could already do with **Flow**.

They just _didn’t know_ that feature was available.

Before considering to buy a new piece of software, it is a good idea to take an inventory of what you already have.

### Buy

If you can’t re-use — or doing so would deliver a less-than-optimal solution — by all means **buy** something!

However, before you pull out your credit card, make sure to do a proper **gap analysis**. Compare what your existing software (if any) actually offers against what you really need it to do. Then use that same gap analysis criteria to compare with the software you want to purchase.

When considering buying, keep in mind the **Total Cost of Ownership** of that comes with every piece of software.

Don’t know what **Total Cost of Ownership** means? Check this blog for an upcoming post on the subject.

After considering your gap analysis and total cost of ownership, if you can’t find software that meets your needs (within the budget you’ve been given), consider **building** something.

Whatever you do, resist the urge to skip the **buying** option and go straight to **building**.

## Build

Don’t listen to developers (like me) who’ll tell you "Oh, that’ll take me a couple of weeks to build". Because it never does.

This may sound weird coming from someone who considers himself a developer at heart, but it is true.

They’re not lying to you on purpose to protect their jobs. And it isn’t a reflection of their skills. They really do mean well.

But most organizations suck at building software projects.

Don’t take my word for it: [The Standish Group](https://www.standishgroup.com/) is an organization that publishes a yearly **Chaos Report**. The report describes the state of the software development industry and seeks to identify the scope of software project failures, the major factors that cause software projects to fail, and the key ingredients that can reduce project failure. I highly recommend that you [buy your own copy](https://www.standishgroup.com/store/services/10-chaos-report-decision-latency-theory-2018-package.html) — it is worth it. And I am _not_ affiliated with The Standish Group in any way.

Last time I bought the report, a staggering **31.1%** of software projects will be cancelled before they ever get completed. **52.7%** of projects will cost **189%** of their original estimates.

Back in 1995, the Standish Group estimated that American companies and government agencies spent **$81 billion** for _cancelled_ software projects. They paid an additional **$59 billion** for software projects that were being completed but exceeded their original time estimates.

The average number of software projects that are completed **on-time** and **on-budget** is only **16.2%** — a number that goes a low as **9%** in larger companies.

And once completed, those "successful" projects will only deliver approximately **%42** of the originally-proposed features and functions.

## It doesn’t need to be an all-or-nothing situation

Nowadays, software is so much more open and versatile than it was many years ago. Yet, we still deal with software acquisitions as a giant monolith that cannot integrate with anything.

The ideal solution for your needs may very well be a hybrid solution: using the software you already own (**re-use**), adding a component or an app that meets most of your needs (**buy**), and making minor customizations to meet your exact needs.

Although this post isn’t about Office 365, I often see organizations running Office 365, SharePoint Online and Dynamics 365, but they fail to fully recognize the capabilities available at their disposal.

Take a look at the various [Office add-ins](https://appsource.microsoft.com/en-us/marketplace/apps?product=office&page=1&src=office&corrid=f4088121-49e0-4e3b-88ae-e9056e17e3d2&omexanonuid=2b49586f-d212-4dfc-9fe8-2fcb970e6d0d&referralurl=https%3a%2f%2fwww.bing.com%2f) and [Dynamics 365 AppSource](https://appsource.microsoft.com/en-US/) for solutions that you can buy that will handle most of your needs. And, with Flow and PowerApps, you can easily configure your solutions to do exactly what you want. There are countless [connectors available](https://flow.microsoft.com/en-us/connectors) that may allow you to build a **low-code** or **no-code** solution that can adapt as your company’s needs evolve.

The same applies to other products — not just Office 365. Understand what you have so that you can fully leverage it before you look at buying or building something new.

## Conclusion

Impulse buying is something that may be suitable for a pack of gum while you’re waiting to pack at the grocery store, but it should never be an option when it comes to enterprise applications.

Make an educated decision, and follow an acquisition model that will help you find the ideal solution for your organization’s needs.

I hope this helps?

## Sources

* The Chaos Report. [The Standish Group](https://www.standishgroup.com/), 2014.

## Image Credit

Image by [Arek Socha](https://pixabay.com/users/qimono-1962238/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1767563) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1767563)
