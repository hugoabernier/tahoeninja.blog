---
title: "Customizing New, Edit, and Display List Forms using InfoPath"
aliases:

- /2010/08/07/customizing-new-edit-and-display-list-forms-using-infopath


date: 2010-08-07T10:07:47+06:00

# post thumb

image: "posts/customizing-new-edit-and-display-list-forms-using-infopath/featured-image.webp"

# meta description
summary: "A new feature in SharePoint 2010 is that you can customize the form that is displayed when you create a new list item by using InfoPath. That means that you can leverage the extensive capabilities of InfoPath without having to write a single line of code – and that’s a good thing, if you’re as lazy as I am and want to avoid resorting to custom code."

# taxonomies

categories:

- "InfoPath"
tags:
- SharePoint
---
A new feature in SharePoint 2010 is that you can customize the form that is displayed when you create a new list item by using InfoPath. That means that you can leverage the extensive capabilities of InfoPath without having to write a single line of code – and that’s a good thing, if you’re as lazy as I am and want to avoid resorting to custom code.

To do it, you simply go to the list you want to customize, click on **Customize Form**, and edit the InfoPath form that was thoughtfully created for you. Once you’ve published the form, you’ve got a custom form for your list. SharePoint will automatically create a read-only version of your form for displaying items. Easy!

But what if you want to have a different form when creating new items, one for editing items, and one for viewing items? In this post, I’ll show you how to create a different InfoPath view for **New**, **Edit**, and **Display** forms, as pictured below:  
![](customizing110.png?w=584)

Here are the steps:

1. Go to the list you want to customize (or create a new list). For this example, I’ll be customizing an Issues List.
2. Select the **List** ribbon and, from the **Customize List** group, click on **Customize Form**.  
    ![](customizing29.png?w=584)
3. SharePoint will open InfoPath and load the default form. You can customize it just like you would any other InfoPath form. Just make sure you stick to browser compatible settings, because the form will be loaded using InfoPath Forms Services.  
    ![](customizing31.png?w=584)
4. For this sample, I’ll add a title to every form and change the colours of each form (so that we can prove that it works). Let’s treat this form as the **New Item** form:  
    ![](customizing41.png?w=584)
5. We’ll create two more views (one for Edit, and one for Display). To make things less confusing, let’s rename the view. We do this by changing the view’s properties using the following steps: switch to the **Page Design** ribbon, and select **Properties** from the **Views** group.  
    ![](customizing51.png?w=584)
6. In the **View Properties** dialog, change the **View name** to **New item**, then click **OK**. This step is optional, but it’ll make things less confusing later – trust me.  
    ![](customizing61.png?w=584)
7. Back on the **New item** view, select the entire content of the form and copy to the clipboard. We’ll paste the form’s content in a new view.
8. From the **Page Design** gallery, click on **New View** from the **Views** group.  
    ![](customizing71.png?w=584)
9. Name the new view **Edit view**.  
    ![](customizing81.png?w=584)
10. In the newly created view, select all content and replace it with the content you copied from the previous view. Make your changes to the Edit view – in my case, I changed the title of the form to **Edit Issue** and changed the colour.  
    ![](customizing91.png?w=584)
11. Repeat steps 7 to 10, but this time name the newly create view **Display view**  
    ![](customizing101.png?w=584)
12. I’ll change the title and colour of the Display view  
    ![](customizing111.png?w=584)
13. SharePoint will automatically display the Display view in read-only mode. Since I’m a control freak, I prefer to create my own read-only view by going to every control, and converting them to **Calculated value** fields by right-clicking each control, select **Change Control** and picking **Calculated value**.  
    ![](customizing121.png?w=584)
14. The final **Display Issue** view look like this:  
    ![](customizing131.png?w=584)
15. You can add as many views as you want using the same approach, and use rules to select the appropriate view. For example, you may want to display a different view based on a user’s role. If you do, you probably don’t want users to be able to switch between views. To do so, go to the **View Properties** for each view, and de-select the **Show on the View menu when filling out this form** option.  
    ![](customizing141.png?w=584)
16. So far, all we did was setting up the different views for New, Edit, and Display. The next few steps will configure which view to use when displaying, editing, and creating a new item. Let’s start with the Display form; go to the **File** menu, then select **Info** and **Advanced form options**.  
    ![](customizing151.png?w=584)
17. In the **Form Options** dialog, select the **Web Browser** category. In the **Display View** area, select the view you want to appear when displaying an item (in our sample, it is called **Display view**).  
    ![](customizing161.png?w=584)
18. Unfortunately, to set the Edit and New views, we don’t have an easy option. We can, however, use Form Rules to change the view when the form is loaded. If the IDfield is blank, we’ll assume that the user is creating a New item. If the ID field is not blank, the user is Editing the item. To do this, switch to the **Data** ribbon, and click on **Form Load** in the **Rules** group.  
    ![](customizing171.png?w=584)
19. InfoPath will open the **Rules** pane (on the right side of the form). Click on **New** then **Action**.  
    ![](customizing181.png?w=584)
20. Name the rule **Switch to New View**. Then click on default condition (**None – Rule runs when form is loaded**) to create a new condition.  
    ![](customizing191.png?w=584)
21. From the **Condition** dialog, change **myFields** to **Select a field or group…** then pick **ID** from the dialog that pops-up. Click **OK** to return to the **Condition** dialog.  
    ![](customizing201.png?w=584)  
    ![](customizing211.png?w=584)
22. Change **is equal to** to **is blank** then click **OK**.  
    ![](customizing221.png?w=584)
23. Back at the **Rules** pane, find **Run these actions** and select **Add** then **Switch views**.  
    ![](customizing231.png?w=584)
24. From the **Rules Details** dialog, select **New item** from the **View** field and click **OK**.  
    ![](customizing241.png?w=584)
25. You may be tempted to switch the view to **Edit Item** when the **ID**is not blank, but – if you think about it – this condition would occur both when viewing an item and editing an item. It would make SharePoint switch to the **Edit item** view when you try to display an item, even if you did set up the **Display view** option step 17. Don’t do it!
26. All you need to do now is publish the form! To do so, select the **File** menu, **Info** then **Quick Publish**.  
    ![](customizing251.png?w=584)
27. Wait until InfoPath does its thing. You’ll get a message indicating that publishing was successful.  
    ![](customizing261.png?w=584)
28. Click on **Open the SharePoint list in the browser** to test your new forms. Here are the final results:  
    What gets displayed with creating a new item:  
    ![](customizing271.png?w=584)

    When displaying an item:  
    ![](customizing281.png?w=584)

    When editing an item:  
    ![](customizing291.png?w=584)

That’s it! Of course, in real life, you’d probably want to customize each form a bit more than just changing the title and colour.

Hope this helps!
