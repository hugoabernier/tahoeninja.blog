---
title: "Displaying site information security classification on every page using a custom SPFx extensions — Part I"
aliases:
  - /2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions
series: "Displaying site information security classification on every page using a custom SPFx extensions"

date: 2018-04-21T10:07:47+06:00

# post thumb
image: posts/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions/featured-image.webp

# meta description
summary: "That’s what I hope to do with this series of blog articles: demonstrate easy ways to introduce some level of governance using new enabling technologies — like SPFx web parts, extensions, and site scripts."

# taxonomies
categories:
  - SPFx
---
## Value proposition

As an independent consultant, I get to work with a lot of organizations in both public and private sectors. Most deal with various levels of security classification.

_Governance_ is always a hot topic with SharePoint. Most understand the importance of governance; some shrug it off as a “we’ll deal with it when it becomes a problem” — which is never a good idea, as far as I’m concerned.

But what if we could make applying governance in SharePoint a lot easier? So easy, in fact, that it would be more painful to _deal with it when it becomes a problem._

That’s what I hope to do with this series of blog articles: demonstrate easy ways to introduce some level of governance using new enabling technologies — like SPFx web parts, extensions, and site scripts.

My goal is not to duplicate the work of Microsoft and others; I may use a very simple approach in this first blog to keep the example easy to understand, but I fully intend on leveraging out-of-the-box Office 365 features like [Data Loss Prevention](https://support.office.com/en-us/article/overview-of-data-loss-prevention-policies-1966b2a7-d1e2-4d92-ab61-42efbb137f5e?ui=en-US&rs=en-US&ad=US) (DLP) features.

I hope you’ll stick with me for the journey!

## Information security classification

_Information security classification_ or _information classification_ is a step in the process of _managing_ information. There are [people who are way smarter](https://advisera.com/27001academy/blog/2014/05/12/information-classification-according-to-iso-27001/) about this topic, and there is a whole [ISO 27001 standard](https://advisera.com/27001academy/?page_id=376&icn=free-what-is-iso-27001&ici=top-iso-27001-txt) on the topic, so I’ll avoid a detailed explanation.

…But I’ll definitely throw in a gratuitous graphic. I guess my time McKinsey & Company rubbed off on me.

![](managingclassifiedinfo-831090236-1524190573964.png)

Managing classified information typically consists of 4 steps:

- **Asset inventory:** finding out what kind of information your organization has, and who is responsible for it.
- **Information classification:** identifying how sensitive the information is. How bad would it be if this information was leaked, it’s integrity compromised, etc. There is no one way to classify information — it depends on your organization size, industry, country, etc. The most frequently use examples are:
  - **Confidential:** top confidentiality level
  - **Restricted:** medium confidentiality level
  - **Internal use:** lowest level of confidentiality
  - **Public:** everyone can see the information
- **Information labelling:** you kinda need to tell your employees how the information is classified so that they can handle it properly.
- **Information handling:** where you define rules and processes around how to handle the information.

This article will focus on the **information handling** part of the process.

## Microsoft’s information classification

Microsoft [internally classifies](http://www.balestra.be/2012/04/how-microsoft-does-sharepoint-governance-for-their-internal-platform.html) their information as follows:

  - - **High Business Impact (HBI):** Authentication / authorization credentials (i.e., usernames and passwords, private cryptography keys, PIN’s, and hardware or software tokens), and highly sensitive personally identifiable information (PII) including government-provided credentials (i.e. passport, social security, or driver’s license numbers), financial data such as credit card information, credit reports, or personal income statements, and medical information such as records and biometric identifiers.
    - **Moderate Business Impact (MBI):** Includes all personally identifiable information (PII) that is not classified as HBI such as: Information that can be used to contact an individual such as name, address, e-mail address, fax number, phone number, IP address, etc.; Information regarding an individual’s race, ethnic origin, political opinions, religious beliefs, trade union membership, physical or mental health, sexual orientation, commission or alleged commission of offenses and court proceedings.
    - **Low Business Impact (LBI):** Includes all other information that does not fall into the HBI or MBI categories.

A while ago, Microsoft also released on GitHub some [cool solution](https://github.com/SharePoint/PnP/tree/master/Solutions/Governance.TimerJobs) to apply their classification on SharePoint sites.  They also have a great [case study](https://msdn.microsoft.com/library/mt668814.aspx) that shows how they approached classification on their own content.

So, since I want to keep things simple, I’ll use **HBI**, **MBI**, and **LBI** classification labels in my example. You can use your own classification if you want.

## Using SPFx extensions to add a header

If you read my [equally long post](/2018/04/18/automatically-deploy-spfx-extension-to-multiple-sites-using-powershell/) on creating SPFx extensions, you’ll know that you can use SPFx extensions to do cool things on every page of a site. To keep this example really simple, I’ll create a header that reads the site’s property bag and displays a very simple Office Fabric UI Message Bar indicating the site’s classification. It isn’t going to be particularly pretty, but we can improve on looks later.

The bar will say “This site is classified as \[LBI|MBI|HBI\]. Learn more about the proper handling procedures.”, but you can make it say whatever is appropriate for you.

Here is what the HBI header will look like:  
![HBI header](HBI-header.png)

The MBI header:  
![MBI header](MBI-header.png)

And the LBI header:  
![LBI header](LBI-header.png)

In the [next article](/2018/04/21/displaying-site-information-security-classification-on-every-page-using-a-custom-spfx-extensions-part-ii/), we’ll start writing the code.
