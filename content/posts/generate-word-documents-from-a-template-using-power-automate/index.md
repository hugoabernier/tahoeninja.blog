---
title: Generate Word documents from a template using Power Automate
aliases:
  - /2020/03/13/generate-word-documents-from-a-template-using-power-automate

date: 2020-03-13T10:07:47+06:00

# post thumb
image: images/post/uploads/2020/03/patrick-fore-0gkw_9fy0eQ-unsplash.jpg

# meta description
summary: With some Word template know-how and Power Automate, you can dynamically generate documents in your business processes. Find out how!

# taxonomies
categories:
  - Power Platform
keywords:
  - Power Automate
  - flow
  - Word
---
Introduction
------------

Power Automate allows you to create automated workflows that help you streamline your business processes on focus on what really matters.

You can do this by combining building blocks known as "connectors".

There are several hundred connectors to pick and choose from: you can send emails, connect to databases, call custom APIs, connect to Dynamics, SharePoint, Planner, etc.

In fact, there are so many connectors at your disposal that you may never have noticed one connector that allows you to generate Word documents by inserting dynamic data into Word templates.

In today’s post, I’ll explain how to use the Word connector in Power Automate to generate some documents. It’ll be useful any time that you have a business process that needs to send a letter, generate a contract, or produce any sorts of documentation that needs to be printed and/or signed.

Prepare your template
---------------------

The first thing you need is a Word template.

For this article, I’ll use a standard Word template, but you can follow my instructions with your own template.

Let’s get started by using the following steps:

1. From within Word, select **File** > **New**  
    ![File > New](../../images/post/uploads/2020/03/image-1584150805438.png)
2. From the list of templates that are available, search for the template you’d like. For this sample, I’m using **Blue curve letterhead** because I’m too lazy to write my own template.  
    ![blue curve letterhead](../../images/post/uploads/2020/03/image-1584150923260.png)
3. It will give you a preview of the template. Just click **Create** to create a new document from that template. If you prefer, you can use a new blank document and copy and paste your existing template. I’m not picky.  
    ![Click Create to create the template](../../images/post/uploads/2020/03/image-1584151059926.png)
4. To insert content dynamically inside your template, you’ll need to create some **Content controls**. Content controls allow you to define areas within a Word document that you want to make editable. The **Blue curve letterhead** template already has content controls, but we’ll define some custom ones as well.
5. To insert content controls, you need to use the **Developer** tab. If you already see the developer tab, skip to **step 8**.  
    ![The Developer Ribbon](../../images/post/uploads/2020/03/image-1584151379216.png).
6. If you don’t see the **Developer** tab, right-click on a blank area of your Word ribbon, and select **Customize the Ribbon…**  
    ![Customize the Ribbon](../../images/post/uploads/2020/03/image-1584151646328.png)
7. In the **Customize the Ribbon and keyboard shortcuts** dialog, find the **Developer** tab on the right side of the dialog (under **Customize the Ribbon**) and check it, the select **OK**.  
    ![Customize the Ribbon](../../images/post/uploads/2020/03/image-1584151721133.png)
8. Let’s insert a custom content control in our template. For this example, we’ll pretend that we want to specify a case number in our letter. From your Word document, find the line between the **\[Recipient Name\]**, **\[Street Address, City, ST ZIP Code\]** and **Dear Recipient** and insert a new line, then type **Case Number:**.  
    ![Case number](../../images/post/uploads/2020/03/image-1584152072246.png)
9. Position your cursor to the right of **Case Number:** and, from the **Developer** tab, select **Plain text control**.  
    ![Plain text control](../../images/post/uploads/2020/03/image-1584152167340.png)  
    You should see a new content control appear where your cursor was:  
    ![New content control](../../images/post/uploads/2020/03/image-1584152316757.png)
10. To change the prompt text for your Case Number placeholder, select **Design Mode** from the **Developer** tab  
    ![Design Mode](../../images/post/uploads/2020/03/image-1584153293339.png)
11. Word will highlight the content controls in your document. Replace **Click or tap here to enter text** with **\[Case Number\]**. You can also control the text format if you wish to do so.  
    ![Case Number content control](../../images/post/uploads/2020/03/image-1584153399613.png)
12. If you’re up to it, replace the placeholder text in the other content controls in your template. 13. To get out of the **Design Mode**, click it again in the ribbon. The placeholders should hide again.
13. Select the **\[Case Number\]** content control and select **Properties** from the **Developer** tab.![Properties](../../images/post/uploads/2020/03/image-1584152446725.png)
14. In the **Content Control Properties** dialog, change the **Title** to **Case Number** then click **OK**.  
    ![Conent Control Properties](../../images/post/uploads/2020/03/image-1584156678751.png)
15. Repeat setting the content control properties for all the content controls or they won’t appear as dynamic fields to populate in Power Automate.
16. When your template is ready, you’ll need to save it as a Template (**dotx**), and you’ll need to save it where Power Automate can find it. I like to store my templates in a SharePoint document library that I’ve pre-created (called **Templates** — I know, super original). To do so, use the Word **File** then **Save As** menu, then select your desired SharePoint site and document library then click **Save**.  
    I named mine **Case Letter Template**, if you’d like to know.  
    ![Save as...](../../images/post/uploads/2020/03/image-1584155196848.png)

Once your document is saved as a template on a SharePoint site, we’re ready to create the workflow in Power Automate.

Prepare your Flow
-----------------

Let’s create a Flow in Power Automate.

In a real-life scenario, you’d probably want a change in your systems to trigger a document generation — a new record in Dynamics 365, a record change in Common Data Services, or a new record in SharePoint for example.

However, to keep this example simple, I’ll use a simple manual trigger that we can call at any time.

To do so, follow these steps:

1. Go to [https://make.powerapps.com/](https://make.powerapps.com/)
2. In the left navigation, selec **Flows**
3. From the **\+ New** menu, select **Instant — from blank**. Again, you can choose the best trigger for your own specific needs.  
    ![Instant -- from blank](../../images/post/uploads/2020/03/image-1584154258713.png)
4. From the **Build an instant flow** dialog, specify a name (e.g.: **Generate Case Letter**) and select **Manually trigger a flow** under **Choose how to trigger this flow**, then click **Create**.  
    ![Build an instant flow](../../images/post/uploads/2020/03/image-1584154373215.png)
5. In your new flow, select **\+ New step**.  
    ![+New step](../../images/post/uploads/2020/03/image-1584154543802.png)
6. In the **Choose an action** box, type **Word** and select **Word Online (Business)**  
    ![Word Online](../../images/post/uploads/2020/03/image-1584154650754.png)
7. From the list of actions that appear, select **Populate a Microsoft Word template**  
    ![Populate a Word template](../../images/post/uploads/2020/03/image-1584154704447.png)
8. In the new **Populate a Microsoft Word Template** action, select the SharePoint site (or Group) where you saved your document, the **Document Library** where you stored the template, and pick the template from the file picker.  
    ![Populate a Microsoft Word Template](../../images/post/uploads/2020/03/image-1584155326006.png)  
    If you can’t find the document you’ve saved, make sure it isn’t still open in Word and try changing the site or the Document Library.
9. When you pick the proper template, the action dialog will change to display the various content controls. Note that it displays a dynamic value for each content placeholder you created.  
    ![Populate Microsoft Word Template](../../images/post/uploads/2020/03/image-1584157135330.png)
10. In a real production system, you’d probably want to retrieve your template data from your existing systems — like Dynamics 365, Common Data Services, or a database. for this article, we’ll just prompt for it when we launch the workflow. To do so, select the **Manually trigger a workflow** box to expand it  
    ![Manually trigger a workflow](../../images/post/uploads/2020/03/image-1584156051318.png)
11. From the **Manually trigger a workflow box**, select **\+ Add an input** and select **Text** when prompted to **Choose the type of user input**  
    ![Choose the type of user input](../../images/post/uploads/2020/03/image-1584156140907.png)
12. In the new **Input** field that is created, type **Address**.
13. Repeat adding new inputs for **Recipient Name**, **Case Number**, **Sender Name** and **Sender Title**  
    ![Inputs for the trigger](../../images/post/uploads/2020/03/image-1584157302746.png)  
    Note that I’m trying to keep this sample as simple as possible. In real life, I’d probably want to pick the name of the sender from the current context, and I’d get the title from the user’s properties. I’d probably also use a separate field for address 1, city, state, zip.
14. Now go back to the **Populate a Microsoft Word template** and, for each placeholder, insert the matching dynamic values from the trigger inputs.  
    ![Populating template with dynamic values](../../images/post/uploads/2020/03/image-1584157544996.png)

We’re almost done! In our next step, we’ll store the newly generated document in a SharePoint library.

Saving the generated document
-----------------------------

The **Populate a Microsoft Word template** action generates the document, but it doesn’t do anything with it. It’s up to you to save it somewhere, convert it to PDF, or email it.

For our sample, we’ll use the SharePoint **Create file** action by following these steps:

1. Below the **Populate a Microsoft Word template** action, select **\+ New step**
2. In the **Choose an action** dialog, type **SharePoint** and select **Create file** from the list of possible actions.  
    ![SharePoint create a file](../../images/post/uploads/2020/03/image-1584158035926.png)
3. In the newly created action called **Create file**, select the **Site Address** where you want to store the document, and the **Folder path** for the document library where the newly generated documents will go.
4. For the **File Name**, use the **Case Number** dynamic value from the trigger.
5. For the **File Content**, use the **Microsoft Word Document** from the **Populate a Microsoft Word Template** action.  
    ![Document template](../../images/post/uploads/2020/03/image-1584158448878.png)

That’s it! Now we just need to test the Flow by selecting **Save** and **Test**. When prompted to enter values, go ahead and enter some text values and click **Run flow**  
![Test your flow](../../images/post/uploads/2020/03/image-1584158769423.png)

Once the flow is finished running, you’ll find a document with a matching case number in your destination library. It should look like this:  
![Generated document](../../images/post/uploads/2020/03/image-1584158715289.png)

But what about conditional sections?
------------------------------------

That’s really all there is to it… but a common question I get is "How do I change content of the template based on some conditional values?".

The easiest answer is: just use more than one template and create conditional logic in your flow to populate the appropriate template based on whatever rules you want.

![Conditional logic](../../images/post/uploads/2020/03/image-1584158991988.png)

Help, my content controls don’t show up in the Populate a Microsoft Word Template
---------------------------------------------------------------------------------

If you find that your content controls don’t show up after you save your template, I have found that adding a **Title** to the property control seems to help.

If that doesn’t work, make sure you used a **Plain text** content control and try removing the formatting.

If the template doesn’t seem to refresh, try saving your flow, leaving the flow, then editing it again. It will reload the template and should refresh the list of content controls.

Conclusion
----------

As you may have noticed, it probably takes longer to create a proper Word template than it does to dynamically populate a document in Power Automate.

I encourage you to explore the capabilities of the **Word Online (Business)** connector.

I hope this helps?

Photo Credits
-------------

Photo by [Patrick Fore](https://unsplash.com/@patrickian4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/typewriter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
