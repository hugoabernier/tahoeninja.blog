---
title: "Why I ♥ the Office 365 Dev Community"
aliases:
- /2019/04/25/why-i-heart-officedevpnp/

date: 2019-04-25T10:07:47+06:00

# post thumb

image: "posts/why-i-heart-officedevpnp/featured-image.webp"

# meta description

summary: "This blog post explains why I think the Office 365 Dev Community is awesome and why you should consider becoming part of it."

# taxonomies

categories:
- "Community"

---
## Introduction

I love the Office 365 Dev Community.

My career has been dedicated to the IT industry, and I have always been passionate about technology. I’ve spent a great deal of time sharing that passion with others through my consulting work practice, mentoring, blogging, and various speaking engagements.

Recently, I received a very kind message from someone I worked with many years ago, thanking me for sharing my thoughts and experiences through my blog posts.

When we first met, he was just getting started in IT. He didn’t know a lot about programming, but he was **smart**, **driven** and **humble**, and he used those gifts to drive himself to always find a solution. He was tenacious in his pursuits, he had the hallmarks of success.

While we no longer work together, I have continued to check in on him from time to time. I very pleased to see that he is a very successful SharePoint guru who works with some of the most brilliant people I have ever met.

He deserves all the praise for his success and I am happy to have played a small role in that by giving him an opportunity to be **engaged**, **empowered**, and to **expand** his skills.

He did the rest.

The Office 365 Dev Community is one of those online communities that also engages and empowers their members, and gives them the opportunity to expand their skills.

I have already written about the SharePoint Developer Community in my post titled [Open Source Contributors are People Too!](/2019/02/21/open-source-contributors-are-people-too/) and talked about how people tend to take the great work the Office 365 Dev Community does for granted.

This blog post explains why I think the Office 365 Dev Community is awesome and why you should consider becoming part of it.

## My SharePoint Journey

This blog post isn’t about me.

But in order to explain the impact the Office 365 Dev Community has, I need to start with my experience with SharePoint.

## Site Server

Many years ago, I had just finished an e-commerce implementation for one of the largest telecommunications providers in Canada using Microsoft Site Server.

During the project, the team and I had to install (and re-install) MS Site Server many times. It was back when installing a server product required us to perform ritual sacrifices to appease the installation Gods or nothing would work.

Site Server came with a sample site called the **Knowledge Management** site that seemed more appropriate for intranet implementations.

At the same time, Microsoft had a **Web Part** framework that really consisted of XML, XSLT, and VBScript. It was just a framework on its own that didn’t connect with anything else.

By the end of the project, we successfully implemented a cool Knowledge Management instance of Site Server and used web parts in our solution. It was really cool.

## Tahoe

My next opportunity came with McKinsey & Company, as a Senior Associate. I was hired in the e-Business Building practice with the mandate of helping the Firm advise their clients about e-commerce technologies, best practices, and their ongoing e-commerce initiatives.

McKinsey was famous (and still is) for their _PDNet_ — a Lotus Notes-based knowledge-management platform that allows some of their greatest minds to share their research with other consultants within the Firm.

As part of an internal initiative, my team and I were tasked to research Knowledge Management (KM) best practices to see what new technologies, if any, could be used to help improve KM within the Firm.

It was an audacious goal. We had 6 weeks, a small team, and an office in Singapore to prepare a _presentation_ on our findings.

Since we were all e-Business Builders, we thought that we should build a prototype instead of a boring presentation. After all, I had just built a cool KM solution using Site Server.

When we started building the solution, we found out that Microsoft was separating the "Knowledge Management" template from Site Server into a new product called **Tahoe**; The "Commerce" component of Site Server would become **Commerce Server**, at least that’s how our Microsoft rep had explained it to us.

We received access to an early preview of the product and engaged with two talented MS Consulting (MCS) developers, associates from the Singapore office to get started.

Here we were, two Toronto guys, a few Singapore team members, a Californian (who still thinks that SharePoint is a fad), and a genius webmaster from Helsinki who worked insane hours to build a working prototype of something that would change our lives and our careers immeasurably.

## If you don’t know the limits of something, there are no limits

Tahoe Server was awesome. It was also the first Microsoft product that came with (almost) the entire library of source code — because it was all built using VBScript and ASP pages.

I read the entire source code, because I could. And I’m a geek.

We quickly found the limitations of Tahoe Server and since we had access to the source code, we could overcome these challenges and make it do what we wanted it to do.

So, we added the ability for **self-service site creation**. We indexed Active Directory users to create **user profiles** with skills matrices (to make it easy to find experts on a given topic). While many of those features became available in SharePoint 2003, we had the opportunity to build our own in Tahoe.

We created our own **replication engine** to replicate our Tahoe servers between the United States, Australia and Germany, thus making sure that every user would have a fast experience using our portal regardless of where they were in the world.

We even got a little cheeky and added the ability to access the portal with a mobile phone using SMS and/or WAP. Because we could.

When we demoed the prototype in Budapest in front of the entire e-Business Building community, they didn’t believe that it was a fully working product. They thought we had people behind the curtains helping us create a fake demo.

Given the success of the demo, we received approval to implement the solution on a larger scale.

Over the next few years, we built more and more functionality for our portal. Tahoe was released as Sharepoint Portal Server 2001. Microsoft flew people from Redmond to Singapore _twice_ to see what we were building. We moved the team to Helsinki, then Munich where our focus was operationalizing our portal.

> The first time I went to demo our portal to the team in Munich, I took the first flight out from Helsinki so that I would get there in time for an early morning meeting.
>
> When I got in my taxi at the Flughafen München, I gave the address to the Munich office in my broken German. I had the wrong address and the wrong phone number.
>
> I tried calling people from the Helsinki office to get the proper address, but it was too early and the office hadn’t opened yet.
>
> Then, I remembered that I was coming to demo the portal and we had implemented functionality that would allow us to use text messages to query SharePoint using simple messages like "WHO _person’s name_", "WHAT _document name_", and "WHERE _office name_". So, with taxi driver waiting and growing impatient, I nervously texted "Where Munich" to our mobile portal.
>
> The response came back within seconds with the right address for the Munich office. I triumphantly gave the address to the driver who immediately said:
>
> "Ah! McKinsey!"

## Moving on

Once we were done, the team parted ways. One of the MCS guys moved to MS Corp to build their own version of the portal (eKM/ICE). I moved back to Toronto to build a similar portal for Microsoft Canada.

I continued to build SharePoint portals for three of the top management consulting firms globally and had the opportunity to travel all over the world to do what I loved.

My next challenge was to help architect and implement a large SharePoint service offering for a provincial government — with over 75,000 users and had the opportunity to implement some of the first and largest Office 365 implementations in Canada.

Shortly thereafter, Microsoft approached me to become a Microsoft Virtual Technology Specialist for SharePoint. In this role, Microsoft would introduce me to their clients as a _pretend_ Microsoft employee to conduct workshops with their clients, where we would build a solution to their problems within less than a day _live_, and without safety nets.

None of that work would really give me the satisfaction that I really wanted, which was to contribute to the greater SharePoint community.

Until SPFx came about.

## SPFx and the Office 365 Dev Community

I was working on a large Office 365/SharePoint project implementing a student portal for a large college. We had specific needs mobile, responsive, and accessibility, that weren’t available to us when we started. We chose to integrate the Office UI Fabric by hand into our web parts to give the site a consistent look and feel.

As we built the portal, we discovered that a SharePoint page loaded with dozens of custom provider-hosted SharePoint web parts was insanely slow.

When I found out about this new upcoming SharePoint Framework _thingy_, it had the promise to resolve many of our challenges and requirements.

Faster web parts, responsive, mobile, accessible, and with built-in support for Office UI Fabric?!?!

Everything I wanted!

Hungry to know more about the upcoming SPFx, my team and I started attending the SharePoint Development Community calls as often as we could.

I was always a Microsoft/.NET guy. I had always dismissed React, Node.js and GitHub as _not as good_ because Microsoft wasn’t doing it. Now Microsoft was telling me that the new way to build SharePoint web parts would be to use React, Node.js and Typescript? And in order to find out more about SPFx, I had to use GitHub?!

What the heck, Microsoft?

I had a lot of learning to do.

Fortunately, every Office 365 Dev Community call started with 15-20 minute from Vesa and/or Patrick telling us that we could submit issues and questions in GitHub. Everyone was invited to demo cool stuff they had done. Most calls ended with Q&As that gave us the opportunity to ask questions.

When we asked questions, our questions were given the consideration they deserved. No one was ever ridiculed for their questions. Not from the people hosting the calls, not from the guest presenters, and not from the other attendees.

There were even some calls where we, the attendees, were asked about _our opinion_!

It was the first time in over 20 years of working closely with Microsoft that I felt that Microsoft was actually listening.

## Demoing my first SPFx web part

When SPFx was officially released and supported on SharePoint Online, our portal team had been learning SPFx and eagerly anticipated the opportunity to rebuild most of our web parts to SPFx.

Our project was Agile/SCRUM and we delivered our code in two-week sprints. We dedicated entire sprints to converting our web parts to SPFx, forcing everyone to jump in the deep end.

We quickly found what worked and what didn’t. Some SPFx web parts never saw the light of the day, and some others were easily converted. We even rebuilt one web part that took a few months to build over a weekend!

When we demoed what we had done to our Microsoft reps, they asked us to do the same demo to other colleges and universities.

Armed with demoable web parts, I accepted to take Vesa and Patrick’s invitation to contribute to the SPDev calls seriously. I sent an insanely long email to them (I wasn’t actively using Twitter) and offered to demo some of the web parts we had done.

That was one year ago today.

I didn’t expect to hear back from them. And I didn’t, for about two weeks. It turns out that cool people don’t use email.

Eventually Vesa sent me a response and I was scheduled for an upcoming call. My demo went okay, however the response from the attendees was amazing! I had people reaching out to me to find out how I had done this or that. Some people wanted me to share my code.

What value could I add to the community, except for some cool web parts? I thought that I didn’t have anything worth blogging or tweeting about.

## Contributing to the community

When I said that to a friend of mine, someone who I respect immensely (except, maybe, for the fact that he insists on sprinkling Salt & Vinegar seasoning on his popcorn), he explained that while I may not _feel_ like I have anything of value to share with others, there are others who are just starting with SharePoint and SPFx who may benefit from my sharing what I have learned thus far, with them.

With this in mind, I wrote an SPFx sample to help others with some of the problems I had experienced when I started learning SPFx, and submitted it to the Samples repo. It was nothing amazing or earth-shattering, it was just a simple example of how to solve a small problem.

My sample got accepted.

Then I demoed it on a call.

And I found that, as my friend with the nasty pop-corn habit had predicted, other people did benefit from my contribution.

I built more samples based on solutions to challenges I had encountered when I started with SPFx and submitted them. They were always graciously accepted. Every time I demoed one of them, the community was always insanely supportive and kind.

Gaining confidence in the community, I wrote some PnP reusable controls that I wished were available, fixed some mistakes in the documentation, and added a very small command to the Office365-CLI. (In fact, my RichText control was just released today!)

No matter how small my contributions were, they were always welcome.

Any time I wasn’t sure how to contribute, there was someone who was willing to help. If I made a mistake, nobody made me feel small or insignificant.

Everyone was always gracious and supportive.

Most of my career now has been spent being passionate about SharePoint, and I had finally found a place where other people who are just as passionate congregate and help each other.

## Engage, Empower and Expand

That "kid" I hired over ten years ago became an expert because of his hard work. He took the opportunity to get engaged in our company and did great. He was empowered to make a difference and he did, beyond expectations. He was able to expand his skills and responsibilities beyond what (I suspect) he even believed he could, to become the best version of himself.

The Office 365 Development Community gives each of us the ability to do the same.

The various bi-weekly and monthly calls, videos and presentations _engage_ us.

We are all _empowered_ to do demos, create samples, contribute to the many repos out there. You don’t have to be an MVP, to know someone at Microsoft, or to be an employee of a big company to participate.

We can all _expand_ the capabilities of SharePoint/O365, and supporting tools by submitting feedback, creating new components, command-lines, tools, web parts, and more.

We have the opportunity to make SharePoint the best platform by collaborating together!

## Welcome to the Office 365 Dev Community

If you would like to find out more what’s new in the SharePoint development space, you should visit the [SharePoint Developer Community (SharePoint PnP) resources](https://docs.microsoft.com/sharepoint/dev/community/community). You’ll find videos, blog posts, and social media resources that will help.

If you’d like to meet other people who are passionate about SharePoint development, consider attending one of the various [community calls](https://docs.microsoft.com/sharepoint/dev/community/community#community-calls).

If you want to see what other people in the community have done, or if you want to contribute, visit the [list of open-source projects](https://docs.microsoft.com/sharepoint/dev/community/open-source-projects).

Every single one of us in the Office 365 Dev Community started as a newbie at some point. As long as you do the same, everyone will treat you kindly and with respect.

Every one of us has _something_ important to say for someone else. We all have different backgrounds, experiences, and industries that make us unique. As long as you don’t act like you know better than everyone else, and you don’t try to sell anything, people will listen.

As long as you genuinely want to share with the rest of the community, not for the purpose of self-promoting, people will appreciate your contributions.

We’ve all had project deadlines and demanding customers, and we understand the pressures that you’re under when you ask for help. We’re also under the same pressure, but someone will surely try to help you if you need help.

Welcome to the Office 365 Dev Community. I think you’ll like it here.

## Conclusion

My SharePoint journey has been a long one. At times, I felt more like a crazy person on a soap-box telling those who didn’t want to listen to how awesome SharePoint is.

Maybe I am such a crazy person, but the Office 365 Dev Community is filled with other crazy people who feel the same way.

To all of you in the Office 365 Dev Community, thank you for being awesome and supportive.

I’m proud to be one of you.
