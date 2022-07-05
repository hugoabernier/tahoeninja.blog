---
title: Solving the “Failed to execute ‘removeChild’ on ‘Node'” error on modern SharePoint pages
aliases:
- /2020/06/29/data-interception
  
date: 2020-06-29T10:07:47+06:00

# post thumb
image: "images/post/uploads/2020/06/agence-olloweb-d9ILr-dbEdg-unsplash.jpg"

# meta description
summary: "If you're getting errors in modern SharePoint pages when trying to open a link in a new tab, read this."
lead: (Or "SharePoint ignores target attributes on hyperlinks")

# taxonomies
categories:
- "SPFx"

---


Introduction
------------

I was recently working on a custom meganav SPFx solution for a client who reported that one of the links in the navigation would always produce the following error:

    NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
    in t in div in div in t in CustomizedPageLayoutScrollRegion in div in article in t in t in o in t in t in t in t in t in section in div in div in t in Styledt in t in o in t in t in t

I immediately assumed that one of the many application extensions on the page were causing the issue.

Since the target of that link was a modern page, I assumed that there was something different on that page that would cause the issue.

But after removing all custom extensions on the site collection where that page resided, removing all custom web parts, and even starting with a blank modern page, I still got the error.

I eventually solved the issue, but it was a frustrating process.

In this post, I’ll explain how I solved the issue.

I hope it will save you from having to search like I did.

data-interception="off"
-----------------------

When you navigate between SharePoint modern pages, there is usually a _lot_ of stuff that is repeated on each page; stuff like navigation, suite bar, headers, footers, etc.

In fact, for most pages, the only thing that changes is the content area. It does not make sense for SharePoint to re-load everything on the page — that’s just a waste of valuable bandwidth.

So SharePoint uses a page router to efficiently refresh only the parts of the page that change when you navigate between pages.

In most cases, that’s a good thing.

Except when you try to do navigate between pages from a custom SPFx solution. Especially if you open your links to a new browser tab or a new browser window.

The page router will cause SharePoint to ignore `target` attributes on your hyperlinks and produce weird errors like the one I got.

And the problem is: your error may be completely different from mine, making it practically impossible to find a solution to this problem.

As it turns out, [there is an article about this on the SharePoint development documentation](https://docs.microsoft.com/sharepoint/dev/spfx/hyperlinking).

All you need to do is to add `data-interception='off'` to your anchor tag to tell SharePoint _not_ to intercept your page navigation and to bypass the page router.

So, instead of this:

    <a href="https://yoursite.sharepoint.com/sites/hr/SitePages/benefits.aspx" target="_blank">Benefits</a>

Use this:

    <a href="https://yoursite.sharepoint.com/sites/hr/SitePages/benefits.aspx" target="_blank" data-interception='off'>Benefits</a>

Of course, once you figure out to use `data-interception`, you’ll find that the amazing [Julie Turner](https://julieturner.net/2018/08/spfx-anchor-tags-hitting-the-target/), [Elio Struyf](https://www.eliostruyf.com/navigating-to-other-pages-in-sharepoint-framework-from-code/), and [Corey Roth](https://coreyroth.com/2019/08/21/spfx-basics-opening-a-link-in-a-new-tab/) all blogged about this before.

Conclusion
----------

In summary: SharePoint ignores your anchor tags’ `target` attributes because it uses a page router to make things more efficient, which causes the issue. Adding `data-interception='off'` will tell SharePoint not to mess with how to navigate to your pages.

I have never experienced this issue because I always convince my clients [not to open hyperlinks in new tabs](https://www.nngroup.com/articles/the-top-ten-web-design-mistakes-of-1999), unless the links point to non-web documents — in which case [you should use new tabs](https://www.nngroup.com/articles/open-new-windows-for-pdfs/). Read [this article](https://medium.com/the-metric/links-should-open-in-the-same-window-447da3ae59ba) if you want to know why.

I have learned over the years that ultimately, it is up to the client to decide what they want to do… even if it is the wrong thing to do. My job is to give them the relevant information they need to make an educated decision — even if I don’t agree with their decision.

I also learned that any time I have a problem, I should always check [Julie Turner’s blog](https://julieturner.net/) first because she often has the answers I’m looking for.

I hope this helps?

Photo Credit
------------

Photo by [Agence Olloweb](https://unsplash.com/@olloweb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](/web/20210518064557//s/photos/magnifying-glass?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
