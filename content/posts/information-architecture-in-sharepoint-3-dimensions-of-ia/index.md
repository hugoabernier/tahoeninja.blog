---
title: "Information Architecture in SharePoint: 3 Dimensions of IA"
series: "Information Architecture in SharePoint"
aliases:

- /2019/02/15/information-architecture-in-sharepoint-3-dimensions-of-ia


date: 2019-02-15T10:07:47+06:00

# post thumb

image: "posts/information-architecture-in-sharepoint-3-dimensions-of-ia/featured-image.webp"

# meta description

summary: "In my previous post on Information Architecture (IA), I explained how using your organization’s Org Chart leads to bad IA. Unfortunately, creating an IA that caters to every user in your organization, then trying to fit it all in a single navigation structure would be difficult to achieve."

# taxonomies

categories:

- "SharePoint"
tags:
- "Information Architecture"
- IA

---
## Introduction

In my [previous post on Information Architecture](/2019/02/18/information-architecture-in-sharepoint-one-size-does-not-fit-all/) (IA), I explained how using your organization’s Org Chart leads to bad IA.

> The best IA is one that allows every user, regardless of their job title, to find the information they need fast.

Unfortunately, creating an IA that caters to every user in your organization, then trying to fit it all in a single navigation structure would be difficult to achieve.

As a result, organizations usually end up adopting a single, one-size-fits-all IA, hoping that it will meet the needs of most people.

What you get is usually the lowest common denominator IA. An IA that meets the bare minimum for everyone.

In case I’m not making myself clear: lowest common denominator is bad.

Luckily, there is a solution.

The answer is simple. Don’t try to fit it all in a one-dimensional IA.

Create an IA that has 3 dimensions:

- Physical
- Logical
- Metadata

![Physical, Logical, Metadata](three-dimensions.png)

## Physical

The Physical dimension of information represents how you store your information physically. Your folder structure, document libraries, sites, and site collections are the physical dimension.

Except that the physical dimension isn’t for everyone. It is for authors, the creators of content. Those who will maintain the information in SharePoint.

Go to each department and look at their files. Look at their file shares, their folder structure.

That’ll be the start for your physical IA.

When people start creating their folders (because they need to do their jobs), they don’t stop and think "What is the most efficient way to store my files".

No. They create folders that make sense to them.

It won’t be perfect. People tend to do silly things sometimes.

But it is a good start. It helps you understand the needs of authors.

You need to apply a bit of finesse and break things down into sites, document libraries, and folders.

But how do you decide when you should create a site, a document library, or a folder?

Consider the following:

### Security

Look at who should have access to edit files, and who should have access to view files.

Try to group documents into "containers" so that those with the same permissions stay together. I say "containers" because, at this point, we don’t know exactly if we need sites, document libraries, folders, or subfolders.

Avoid the temptation to build a structure that requires individual permissions on every document.

For example, instead of assigning individual permissions on documents, try creating document libraries. Assign permissions to those document libraries. When people place documents in those document libraries, the documents will inherit permissions.

Magic!

If you need to change permissions, you can do so at the document library-level, instead of trying to manage individual document permissions.

Some SharePoint experts who are way smarter than I will tell you to avoid folders and sub-folders. According to them, folders make things more difficult to find.

I’m ok with folders, as long as you don’t abuse them. If you need to create folders instead of document libraries, do so.

Try to keep it to less than 3 folders deep, otherwise, people will never find the information they need.

### Metadata

If you need to store documents with custom metadata, you should.

Create content types, if you want. You should.

Keep one thing in mind: avoid putting documents with different custom properties in the same containers. By containers, I mean documents libraries or folders.

Make it easy for authors to know what metadata you’ll expect them to enter by keeping documents with the same (or similar) metadata in the same document libraries. Documents with mandatory fields "Client Name", "Project Name", and "Project Code" shouldn’t go with documents with "Department" and "Policy".

Otherwise, when users drop new documents in a library, they won’t know what metadata they’re expected to enter.

Sure, you can add many content types in that library, but make sure they need similar metadata.

Users that spent a few hours writing a document don’t want to filter through 72 custom properties to see what they need to enter.

They’ll either pick the wrong content type, or they’ll enter bad metadata just to get things over with.

I should make something clear: I’m not saying that you can’t do it. I’m saying that you shouldn’t.

The success of your IA depends on how well people use it. If authors get confused when creating new content, you’ll get a mess.

Garbage in. Garbage out.

### Workflows

Put documents with similar workflows together.

By workflows, I mean whatever business process gets triggered when someone creates or updates a document. It could be whether documents need approval, or it could be a Microsoft Flow process.

Imagine if you have a document library that has super-important documents. Everyone in the company should see them as soon as possible.

But some documents in that library need publishing approval before everyone can see them. Some other documents don’t need approval.

Someone is bound to make a mistake. They’ll create a super-important document and upload it to the document library, expecting it to be visible right away. But the document doesn’t get approved and sits there, invisible to everyone who needs it.

Or the other extreme: someone drops a draft copy of a document in that same document library. They think the document will need approval before it shows up for everyone. But it doesn’t and becomes visible to everyone.

Keep it consistent: keep documents with similar workflows together. That way, content authors will know what behavior to expect when they create new content.

## Conclusion

The best SharePoint Information Architecture doesn’t try to fit everything into a single navigation structure.

It relies on 3 dimensions.

In this article, we discussed how the Physical dimension targets the authors.

Let’s be bold:

> When building the physical dimension of your IA, your primary goal is to make life easy for authors.

If authors are happy, chances are your content will be better.

We’ll take care of readers in the [next article](/2019/02/22/information-architecture-in-sharepoint-the-logical-dimension/).
