---
title: "Popular PnP repositories and how to get started contributing"
aliases:
- /2019/08/23/popular-pnp-repositories-and-how-to-get-started
  
date: 2019-08-23T10:07:47+06:00

# post thumb

image: "posts/popular-pnp-repositories-and-how-to-get-started/people-2590997_1920.jpg"

# meta description

summary: "Here is a list of the most common SharePoint Developer community repositories and information to get started with each one."

# taxonomies

categories:

- "GitHub"
tags:
- "PnP"
---
Introduction
------------

In August of 2019, I wrote a post called [My GitHub cheat sheet for PnP contributions — an interactive cheat sheet](/2019/08/18/my-github-cheat-sheet-for-pnp-contributions-an-interactive-cheat-sheet/) which explains the GitHub commands that **I** use when I start a contribution. The post is interactive: you just tell it your GitHub username and what repository you want to contribute to, and it customizes the instructions for you.

> NOTE: I have since updated the interactive cheat sheet to a [Summary Cheat Sheet](/2020/03/31/summarized-github-cheat-sheet-for-pnp-contributions/) with all the same interactive steps, but without all the lengthy explanation.

I also wrote another post talking about how impressed I am with [David Warner II’s offer to help anyone with their first contribution](/2019/08/15/take-your-first-step-and-contribute-to-office-dev-pnp/). I have since joined the [Sharing is Caring](https://aka.ms/sharing-is-caring) initiative and proudly co-host all the session with [David Warner](https://twitter.com/DavidWarnerII?s=17)

After briefly chatting with David I realized that the biggest hurdle for people is that they just don’t know where to get started. In my post, I recommend that you read the contribution guidelines for every repo, but I found that they are often hard to find in each repository.

I also say that most repositories want you to start from the `dev` branch, but as [the Chris Kent](https://thechriskent.com/) pointed out in [the August 22nd PnP community call](https://developer.microsoft.com/en-us/sharepoint/blogs/sharepoint-dev-community-pnp-general-sp-dev-sig-recording-22nd-of-august-2019/), some repositories prefer you use the `master` (or, more and more commonly, the `main`) branch.

So, with David’s help, we compiled a list of the most common PnP repositories to help you get started. We only show the repositories that provide contribution guidelines.

The list contains the following:

* **Repo:** Name of the repository
* **What is it?:** Description of the repository
* **Getting started:** Links to the most likely resource if you want to get started contributing to that repository
* **Branch:** The branch you should target when submitting your pull requests

> **NOTE:** The information in each of the repositories can change and that you should always refer to the repository for the latest information.

Popular repositories
--------------------

Repo|What is it?|Getting started|Branch
---|---|---|---
**CLI for Microsoft 365**<br/>[PnP/CLI-Microsoft365](https://github.com/pnp/cli-microsoft365)|Manage Microsoft 365 and SharePoint Framework projects on any platform<br/>[https://aka.ms/o365cli](https://aka.ms/o365cli)<br/><br/>**NOTE:** This repository prefers "one commit per pull request"|[Contribution guidelines](https://github.com/pnp/office365-cli/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/cli-microsoft365/tree/main)
**Microsoft 365 Community Docs** [MicrosoftDocs/microsoft-365-community](https://github.com/MicrosoftDocs/microsoft-365-community)|Microsoft 365 community contributed documentation<br/>[https://docs.microsoft.com/microsoft-365/community](https://docs.microsoft.com/microsoft-365/community)|[Adding content](https://github.com/MicrosoftDocs/microsoft-365-community/wiki/Adding-Content)|[main](https://github.com/MicrosoftDocs/microsoft-365-community/tree/main)
**Microsoft Graph .NET Client Library**<br/>[MicrosoftGraph/Microsoft-SDK-DotNet](https://github.com/microsoftgraph/msgraph-sdk-dotnet)|Microsoft Graph Client Library for .NET!<br/>[https://graph.microsoft.com/](https://graph.microsoft.com/)|[Contributing to the Microsoft Graph .Net Client Library](https://github.com/microsoftgraph/msgraph-sdk-dotnet/blob/dev/CONTRIBUTING.md)|[dev](https://github.com/microsoftgraph/msgraph-sdk-dotnet/tree/dev)
**Microsoft Graph .NET Core Client Library**<br/>[MicrosoftGraph/Microsoft-SDK-DotNet-Core](https://github.com/microsoftgraph/msgraph-sdk-dotnet-core)|The core Microsoft Graph client library for .Net. (Microsoft.Graph.Core)<br/>[https://graph.microsoft.com/](https://graph.microsoft.com/)|[Contributing to the Microsoft Graph .Net Client Library](https://github.com/microsoftgraph/msgraph-sdk-dotnet-core/blob/dev/CONTRIBUTING.md)|[dev](https://github.com/microsoftgraph/msgraph-sdk-dotnet-core/tree/dev)
**Microsoft Graph documentation**<br/>[MicrosoftGraph/Microsoft-Graph-Docs](https://github.com/microsoftgraph/microsoft-graph-docs)|Documentation for the Microsoft Graph REST API, which feeds the Microsoft Graph Developer Portal.<br/>[https://docs.microsoft.com/graph](https://docs.microsoft.com/graph)|[Contribute to Microsoft Graph documentation](https://github.com/microsoftgraph/microsoft-graph-docs/blob/main/CONTRIBUTING.md)|[main](https://github.com/microsoftgraph/microsoft-graph-docs/tree/main)
**Microsoft Graph JavaScript Client Library**<br/>[MicrosoftGraph/Microsoft-SDK-JavaScript](https://github.com/microsoftgraph/msgraph-sdk-javascript)|The Microsoft Graph JavaScript client library is a lightweight wrapper around the Microsoft Graph API that can be used server-side and in the browser.<br/>[https://graph.microsoft.com/](https://graph.microsoft.com/)|[Contributing](https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/CONTRIBUTING.md)|[dev](https://github.com/microsoftgraph/msgraph-sdk-javascript/tree/dev)
**Microsoft Graph Library for PHP**<br/>[MicrosoftGraph/Microsoft-SDK-PHP](https://github.com/microsoftgraph/msgraph-sdk-php)|Microsoft Graph Library for PHP<br/>
[https://docs.microsoft.com/graph/toolkit/overview](https://docs.microsoft.com/graph/toolkit/overview)|[Contributing to the Microsoft Graph PHP SDK](https://github.com/microsoftgraph/msgraph-sdk-php/blob/dev/CONTRIBUTING.md)|Documentation changes, use [main](https://github.com/microsoftgraph/msgraph-sdk-php/tree/main)  
Otherwise, use [dev](https://github.com/microsoftgraph/msgraph-sdk-php/tree/dev)
**Microsoft Graph PowerShell SDK**<br/>[MicrosoftGraph/Microsoft-SDK-PowerShell](https://github.com/microsoftgraph/msgraph-sdk-powershell)|The Microsoft Graph PowerShell SDK is a collection of PowerShell modules that contain commands for calling Microsoft Graph service.|[Contributing](https://github.com/microsoftgraph/msgraph-sdk-powershell/blob/dev/CONTRIBUTING.md)|[dev](https://github.com/microsoftgraph/msgraph-sdk-powershell/tree/dev)
**Microsoft Graph SDK for Java**<br/>[MicrosoftGraph/Microsoft-SDK-Java](https://github.com/microsoftgraph/msgraph-sdk-java)|Get started with the Microsoft Graph SDK for Java by integrating the Microsoft Graph API into your Java application!<br/>[https://developer.microsoft.com/graph](https://developer.microsoft.com/graph)|[Contributing to the Microsoft Graph SDK for Java](https://github.com/microsoftgraph/msgraph-sdk-java/blob/dev/CONTRIBUTING.md)|[dev](https://github.com/microsoftgraph/msgraph-sdk-java/tree/dev)
**Microsoft Teams Development Community Samples**<br/>[PnP/teams-dev-samples](https://github.com/pnp/teams-dev-samples)|Contains community samples that demonstrate different usage patterns for developing on Microsoft Teams as a platform. Samples are generally not production-ready, but are intended to show developers specific patterns and use cases for use in complete applications.<br/>[http://aka.ms/teams-dev-samples](http://aka.ms/teams-dev-samples)|[Contribution guidance](https://github.com/pnp/teams-dev-samples/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/teams-dev-samples/tree/main)|**Microsoft365DSC**<br/>[Microsoft/Microsoft365DSC](https://github.com/Microsoft/Microsoft365DSC)|Manages, configures, extracts and monitors Microsoft 365 tenant configurations<br/>[https://aka.ms/M365DSC](https://aka.ms/M365DSC)|[Setting up your environment and contributing to the project](https://github.com/microsoft/Microsoft365DSC/wiki/Setting-up-your-Environment-to-Contribute-to-the-Project)|[master](https://github.com/microsoft/Microsoft365DSC/tree/master)
**Modernization Tools and Solutions**<br/>[PnP/sp-dev-modernization](https://github.com/pnp/sp-dev-modernization)|All modernization tooling and guidance<br/>[http://aka.ms/sppnp-modernize](http://aka.ms/sppnp-modernize)|[The modernization repository](https://github.com/pnp/sp-dev-modernization/blob/master/README.md)|[dev](https://github.com/pnp/sp-dev-modernization/tree/dev)
**PnP Framework**<br/>[PnP/PnPFramework](https://github.com/pnp/pnpframework)|PnP Framework is a .Net Standard library targeting Microsoft 365 containing the PnP Provisioning engine and a ton of other useful extensions||[dev](https://github.com/pnp/pnpframework/tree/dev)
**PnP Modern Search**<br/>[Microsoft-Search/PnP-Modern-Search](https://github.com/microsoft-search/pnp-modern-search)|Home of PnP Modern Search solutions, helping you move from classic to modern SharePoint and beyond||[develop](https://github.com/microsoft-search/pnp-modern-search/tree/develop)
**PnP PowerShell**<br/>[PnP/PnP-PowerShell](https://github.com/pnp/PnP-PowerShell)|SharePoint PnP PowerShell CmdLets<br/>[https://aka.ms/sppnp-powershell](https://aka.ms/sppnp-powershell)|[Contribution guidance](https://github.com/pnp/PnP-PowerShell/blob/master/CONTRIBUTING.md)|[dev](https://github.com/pnp/PnP-PowerShell/tree/dev)
**PnP Starter Kit**<br/>[PnP/sp-starter-kit](https://github.com/pnp/sp-starter-kit)|Modern SharePoint Starter Kit – End-to-end showcase solution to get started with modern experiences.||[dev](https://github.com/pnp/sp-starter-kit/tree/dev)
**PnPJs**<br/>[pnp/pnpjs](https://github.com/pnp/pnpjs)|SharePoint Patterns and Practices Reusable Client-side Libraries<br/>[https://pnp.github.io/pnpjs](https://pnp.github.io/pnpjs)|[Contribution guide](https://github.com/pnp/pnpjs/blob/version-3/CONTRIBUTING.md)|[Version 3](https://github.com/pnp/pnpjs)<br/>[Version 2](https://github.com/pnp/pnpjs/tree/version-2)<br/>[Version 1](https://github.com/pnp/pnpjs/tree/version-1)
**Power Apps Samples**<br/>[PnP/powerapps-samples](https://github.com/pnp/powerapps-samples)|Power Apps samples and design patterns provided by the PnP team and the community.<br/>[http://aka.ms/powerplatform-samples](http://aka.ms/powerplatform-samples)|[Contribution guidelines](https://github.com/pnp/powerapps-samples/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/powerapps-samples/tree/main)
**Power Automate Samples**<br/>[PnP/powerautomate-samples](https://github.com/pnp/powerautomate-samples)|Power Automate samples and design patterns provided by the PnP team and the community.<br/>[http://aka.ms/powerautomate-samples](http://aka.ms/powerautomate-samples)|[Contribution guidelines](https://github.com/pnp/powerautomate-samples/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/powerautomate-samples/tree/main)
**Power Fx Samples**<br/>[PnP/powerfx-samples](https://github.com/pnp/powerfx-samples)|Power Fx Samples – Contains samples for Power Fx low-code programming language.<br/>[Contribution guidelines](https://github.com/pnp/powerfx-samples/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/powerfx-samples/tree/main)
**Power Virtual Agents Samples**<br/>[PnP/powerva-samples](https://github.com/pnp/powerva-samples)|Power Virtual Agents samples and design patterns provided by the PnP team and the community.<br/>[http://aka.ms/powerva-samples](http://aka.ms/powerva-samples)|[Contribution guidelines](https://github.com/pnp/powerva-samples/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/powerva-samples/tree/main)
**SharePoint Developer Documentation**<br/>[SharePoint/sp-dev-docs](https://github.com/SharePoint/sp-dev-docs)|SharePoint Developer Documentation<br/>[https://docs.microsoft.com/en-us/sharepoint/dev/](https://docs.microsoft.com/en-us/sharepoint/dev/)|
[Contribute to SharePoint developer documentation](https://github.com/SharePoint/sp-dev-docs/blob/master/.github/CONTRIBUTING.md)|[main](https://github.com/SharePoint/sp-dev-docs/tree/main)
**SharePoint Framework Client-Side Web Part Samples & Tutorial Materials**<br/>[PnP/sp-dev-fx-webparts](https://github.com/pnp/sp-dev-fx-webparts)|Code samples and developer content targeted towards SharePoint Framework client-side web parts. Maintained by the _nicest guy_ 😁.<br/>[http://aka.ms/spfx-webparts](http://aka.ms/spfx-webparts)|[Contribution guidelines](https://github.com/pnp/sp-dev-fx-webparts/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/sp-dev-fx-webparts/tree/main)
**SharePoint Framework Extensions Samples & Tutorial Materials**<br/>[PnP/sp-dev-fx-extensions](https://github.com/pnp/sp-dev-fx-extensions)|Code samples and developer content targeted towards SharePoint Framework client-side extensions — maintained by yours truly.<br/>[https://aka.ms/spfx-extensions](https://aka.ms/spfx-extensions)|[Contribution guidance](https://github.com/pnp/sp-dev-fx-extensions/blob/main/CONTRIBUTING.md)|[main](https://github.com/pnp/sp-dev-fx-extensions/tree/main)
**SharePoint Framework Library Component Samples & Tutorial Materials**<br/>[PnP/sp-dev-fx-library-components](https://github.com/pnp/sp-dev-fx-library-components)|Samples that demonstrate different usage patterns for the SharePoint Framework library component.<br/>[Contribution guidance](https://github.com/pnp/sp-dev-fx-library-components/blob/master/.github/CONTRIBUTING.md)|Create from: [master](https://github.com/pnp/sp-dev-fx-library-components/tree/master)<br/>Submit to: [dev](https://github.com/pnp/sp-dev-fx-library-components/tree/dev)
**SharePoint Framework React Controls**<br/>[PnP/sp-dev-fx-controls-react](https://github.com/pnp/sp-dev-fx-controls-react)|Reusable React controls for SPFx solutions<br/>[https://pnp.github.io/sp-dev-fx-controls-react/](https://pnp.github.io/sp-dev-fx-controls-react/)|– [Contribution guidelines](https://github.com/pnp/sp-dev-fx-controls-react/blob/master/docs/guides/contributing.md)<br/>– [Submitting a PR](https://github.com/pnp/sp-dev-fx-controls-react/blob/master/docs/guides/submitting-pr.md)|[dev](https://github.com/pnp/sp-dev-fx-controls-react/tree/dev)
**SharePoint Framework React Property Controls**<br/>[PnP/sp-dev-fx-property-controls](https://github.com/pnp/sp-dev-fx-property-controls)|Reusable SPFx property pane controls – Open source initiative<br/>[https://pnp.github.io/sp-dev-fx-controls-react/](https://pnp.github.io/sp-dev-fx-controls-react/)|[Project guides](https://github.com/pnp/sp-dev-fx-property-controls/blob/master/docs/documentation/docs/guides/index.md)|[dev](https://github.com/pnp/sp-dev-fx-property-controls/tree/dev)
**SharePoint List Formatting Samples**<br/>[PnP/sp-dev-list-formatting](https://github.com/pnp/sp-dev-list-formatting)|SharePoint List Formatting Samples<br/>[https://pnp.github.io/sp-dev-list-formatting/](https://pnp.github.io/sp-dev-list-formatting/)|[Contribution guidelines](https://github.com/pnp/sp-dev-list-formatting/blob/master/.github/CONTRIBUTING.md)|[master](https://github.com/pnp/sp-dev-list-formatting/tree/master)

Conclusion
----------

Let’s keep this list up to date! If you find that we forgot a repository, or that something is wrong, let us know in the comments of via Twitter and we’ll get it updated!

Thanks to [David Warner II](https://twitter.com/DavidWarnerII?s=17) with putting together this list, and for always making yourself available to help people in this community.

This list wouldn’t be possible without the hard work of all of those who contributed (and continue to contribute) to the above repositories. Thank you for your contributions!

Photo credit
------------

Image by [StockSnap](https://pixabay.com/users/StockSnap-894430/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2590997) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2590997)

Updates
-------

* **May 24, 2021:** Added Power Apps, Power Automate, and Power Virtual Agents Samples and updated contribution guidelines for SPFx Web Parts and SPFx Extensions
* **April 24, 2021:** Added Power Fx Samples and updated contribution guidelines for SPFx Web Parts and SPFx Extensions
* **October 18, 2020:** There was so much interest around the Microsoft Graph Toolkit repo that I also added the Microsoft Graph repos. Thanks [Jeremy Thake](https://twitter.com/jthake?s=20) for giving me a list of repos.
* **October 15, 2020:** Microsoft Graph Toolkit accepts contributions now! Woo hoo!
* **October 13, 2020:** Thanks to Nanddeep Nachan for pointing out I had forgotten to list the PnP/Teams-dev-samples!
* **October 12, 2020:** The Office 365 CLI is now called the CLI for Microsoft 365. Added Microsoft365DSC as per [Dean Gross](https://dlgross.wordpress.com/)‘s suggestion.
* **July 27, 2020:** Updated repos within PnP organization.
* **April 03, 2020:** Yes, both the SPFx extensions and web parts samples repositories now ask you to submit to the `master` branch. This article was updated accordingly.
* **March 03, 2020:** This repository is getting a lot of traffic these days, so I figured I’d update it and add the super-useful [microsoft-365-community](https://github.com/MicrosoftDocs/microsoft-365-community) repo
* **November 22, 2019:** I’m incredibly proud to be part of the [Sharing is Caring](https://aka.ms/sharing-is-caring) initiative, where we walk people through the process of contributing to open-source repositories and show people how to create their first pull request! If you haven’t done so yet, [sign up](https://aka.ms/sharing-is-caring).
* **September 25, 2019:** [David Warner II](https://twitter.com/DavidWarnerII?s=20) has launched a new initiative to help anyone who wants to create their first PnP contribution. It is called [Sharing Is Caring](https://github.com/pnp/sharing-is-caring) and you can [register](https://forms.office.com/Pages/ResponsePage.aspx?id=P4W00MjlVkqb2oRWF2ZrgX11OyUhMWtHhZR7nphQCrdUNjc4NkdGUzZETElaUThNV0JZVVZXQzdOTC4u) to attend a live online hands-on session where he walks you through step-by-step instructions to create your first pull request.
* **August 25, 2019:** Thanks to [Bert Jansen](https://twitter.com/O365Bert?s=17) for providing us with details for the SharePoint/sp-dev-modernization repository.
* **August 23, 2019:** [Erwin van Hunen](https://twitter.com/erwinvanhunen) Tweeted to remind us about SharePoint/PnP-Sites-Core. It is so foundational to other components, I don’t know how we missed it. Urgh! I hate to disappoint someone I hold in such high regard! Sorry!
* **August 23, 2019:** [Waldek Mastykarz](https://twitter.com/waldekm?s=17) rightly pointed out that we forgot the PnPjs repository.
