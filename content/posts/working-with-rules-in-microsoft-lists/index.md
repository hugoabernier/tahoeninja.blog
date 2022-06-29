---
title: "Working with rules in Microsoft Lists"
aliases: 
  - /2020/07/30/working-with-rules-in-microsoft-lists

date: 2020-07-30T10:07:47+06:00
draft: false

# post thumb
image: "posts/working-with-rules-in-microsoft-lists/featured-image.png"

# meta description
description: "Microsoft Lists will soon make it easy to create rules to react to changes in your lists. Find out what I've learned so far."
summary: "Microsoft Lists will soon make it easy to create rules to react to changes in your lists. Find out what I've learned so far."

# taxonomies
categories:
  - "Microsoft List"


# post type
featured: false
author: "Hugo Bernier"
---
## Introduction

Over the last few years, Microsoft has done an amazing job at modernizing SharePoint.

It used to be that the first question my clients would ask me when I would start a new engagement was "How can we make SharePoint not look like SharePoint?".

Now, most engagements start with "How can we make our old SharePoint sites look more like the **new** SharePoint sites?".

That’s a testament to the hard work of folks at Microsoft. They’ve changed how you edit SharePoint pages and sites to make it easier for everyone to quickly design beautiful content.

But lists in SharePoint have not changed at the same pace. Sure, they got a slightly updated look and feel (well, _some_ lists, anyway), but they were still not easily approachable for every user.

With Microsoft Lists, Microsoft seems to be doing to Lists what the SharePoint team did to pages. They are modernizing them and making them much easier to use for everyone.

They’re still lists behind the scenes, but they’re no longer relegated to being hidden in a site somewhere. They’re becoming _first-class citizens_ in Microsoft 365, crossing the boundaries of SharePoint, Groups, and Teams.

I already covered the [lists templates](../getting-to-know-microsoft-lists/), but in today’s post, I’ll explain how you can easily build **rules** to to notify someone, and how rules will continue to evolve to do a lot more.

> **NOTE:** As per my previous post on Microsoft Lists, much of this is speculation based on Microsoft marketing materials, demos, and videos. I’m like one of those people who watch trailers for Marvel Movies frame-by-frame to get as many spoilers as possible, but for Microsoft marketing videos :-). Actual functionality may be different once this feature is fully released.

## Creating a rule


Here are the steps to create a rule:

1. From within you list, go to the **Automate** menu and select **\+ Create a rule**  
    ![Create a rule menu](../../images/post/uploads/2020/07/image-1596146360143.png)
2. From the **Create a rule** pane, select the rule trigger you wish to use  
    ![Pick a rule trigger](../../images/post/uploads/2020/07/image-1596146542995.png)
3. You’ll notice that — at this time — the only options are to **Notify someone when**. The way this panel is done, it looks like they’ll be adding more rules in the future though.
4. Depending on the trigger you select, you’ll get a nice conversational interface with an easy "fill-in the blanks" sentence that makes it easy to configure your rule. Rules are very simple: they all follow a "if/then" format.
    * This is when you select **A column changes**  
        ![A column changes](../../images/post/uploads/2020/07/image-1596146776581.png)
    * This is when you select **A column value changes to something**  
        ![A column value changes to something](../../images/post/uploads/2020/07/image-1596147026703.png)
    * **A new item is created**  
        ![A new item is created](../../images/post/uploads/2020/07/image-1596147098602.png)
    * **An item is deleted**  
        ![An item is deleted](../../images/post/uploads/2020/07/image-1596147156376.png)
5. Fill the blanks with the values you want  
    ![file](../../images/post/uploads/2020/07/image-1596146935910.png)  
    The most "complicated" one seems to be **A column value changes to something**, which asks you to **Choose a column**, **Choose a condition** and a **Enter a value**. Note that when "fill-in-the-blank" sections are related, you need to fill the first part before you call fill the next one. For example, you need to **Choose a column** before you can **Choose a condition**, and the **Choose a condition** field needs to be filled before you **Enter a value**. That’s presumably to (eventually) give different condition choices when you pick different types of columns, I guess.  
    ![Filling the blanks](../../images/post/uploads/2020/07/image-1596147421006.png)
6. Email fields allow you to enter multiple values and seem to resolve the email address to people, if available. Also, you can refer to other columns on the list item. For example, if you have a column called **Speakers**, you can select **Speakers** instead of entering an email there.  
    ![Email fields](../../images/post/uploads/2020/07/image-1596147750415.png)
7. Once you’ve filled in the blanks, select **Create** to create the rule.
8. When the rule is created, it will display the **Manage Rules** pane with your new rule created.  
    ![Manage rules](../../images/post/uploads/2020/07/image-1596147845394.png)

## Editing a rule

1. From the **Manage rules** pane (**Automate** | **Manage rules** ), select the rule you wish to change.
2. In the **Edit rule** pane, you get the same _fill-in-the-blanks_ fields that you got when you created the rule, but now they contain the values you selected when you created the rule.  
    ![Editing a rule](../../images/post/uploads/2020/07/image-1596148055094.png)
3. To delete the rule, select the **Delete rule** button at the bottom of the pane.  
    ![Delete rule](../../images/post/uploads/2020/07/image-1596148179406.png)
4. Otherwise, select **Save** to update your rule and return to the **Manage rules** pane.

Note that you can also temporarily disable a rule from within the **Manage rules** pane and selecting the toggle to turn a rule off.  
![Disabling a rule](../../images/post/uploads/2020/07/image-1596148330921.png)

## Why put rules under **Automate**?


By the looks of it, the **Automate** menu will eventually become the place for other cool automation features.

For example, if you add a date field in your list, you’ll see a **Set a reminder** option show up (my list has a **Date reported** field).  
![Set a reminder](../../images/post/uploads/2020/07/image-1596149559252.png)

When you have an item selected, the list of choices under **Automate** seems to change as well:  
![Request sign-off](../../images/post/uploads/2020/07/image-1596149726514.png)

## Conclusion


The overall look and feel of rules in Microsoft Lists is a very user-friendly interface that seems to be designed to grow. Every aspect, from how the menu is constructed to how the configuration panels are configured are built to continue adding new functionality in the future without adding complexity.

In general, I like the new visual feel of Microsoft Lists and the style they’re using for configuring rules, column formatting, etc. I think that every day users will also feel more comfortable exploring the features too.

I hope that you’ll enjoy Microsoft Lists and rules when they become available. I certainly hope to find out if my frame-by-frame analysis of screenshots, demos, and videos proved to be correct.

Are rules enabled in your tenant yet? I’d love to know!

(Sigh) I really need a hobby!

## For more information

* [A first look at Microsoft Lists](https://www.youtube.com/watch?v=plshQSoe_OY&feature=youtu.be)
* [Microsoft Lists](https://resources.techcommunity.microsoft.com/microsoft-lists)
