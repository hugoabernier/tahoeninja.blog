---
title: "Play SketchFlow/WPF Animation Programmatically"
aliases:

- /2010/08/20/play-sketchflowwpf-animation-programmatically


date: 2010-08-20T10:07:47+06:00

# post thumb

image: "posts/play-sketchflowwpf-animation-programmatically/featured-image.webp"

# meta description
summary: "Microsoft Expression Blend makes it easy launch animations. It is easy to launch animations with a few clicks… But sometimes, you need to launch animations from within your code – for example, to launch an animation after performing calculations. This article will show you how to play an animation from within your code."

# taxonomies

categories:

- "SketchFlow"
tags:
- WPF
---
## Introduction  

Microsoft Expression Blend makes it easy launch animations. It is easy to launch animations with a few clicks… But sometimes, you need to launch animations from within your code – for example, to launch an animation after performing calculations. This article will show you how to play an animation from within your code.

## Background  

If you’re doing a SketchFlow application, you can right-click the control you want to launch the animation, select **Play SketchFlow Animation**, and select the animation you want to trigger.  


![](082110_0402_playsketchf1.png?w=1170)

If you’re not doing a SketchFlow application, you can drag a **ControlStoryboardAnimation** from the **Assets** pane unto the control you want to trigger the animation.


![](082110_0402_playsketchf2.png?w=1170)

From the Properties pane, you can then select what **Storyboard** you want to launch, and what event (**EventName)** you want to launch the animation:


![](082110_0402_playsketchf3.png?w=1170)

But when you want to use code to launch an animation, you need to take a few more steps. Here’s how:

1. First: create your animation (d’uh!)
2. Remember the name you gave the animation. If you can’t remember it, open your XAML and look for a **Storyboard** element. The name of the animation can be found in the **x:Key** tag.  
    <UserControl.Resources>  
    <Storyboard x:Key=”**myAnimation**“>  
    …  
    </Storyboard >  
    </UserControl.Resources>  

3. Now crack open the code-behind page. We’ll write some code!
4. Make sure that you have **System.Windows.Media.Animation** in your _using_ section. If not, add it by adding the following line:  
    using System.Windows.Media.Animation;  

5. In the event handler where you want to launch your animation, declare an object of type **Storyboard** and load it from the page’s resources, using the animation name as the key, as follows:

    Storyboard myAnimationStoryboard = this.Resources\[“myAnimation”\] as Storyboard;

6. After you verified that the object you retrieved isn’t null, you can start the animation by calling the Storyboard’s **Begin** method.

    myAnimationStoryboard.Begin();  

That’s really all there is to it. I personally like to declare the Storyboard as a member variable and assign it in the constructor, then I use the Storyboard object anywhere I need it.

Once you’ve developed XAML applications, you’ll think this article is silly, but until you do, I hope that it’ll save you some searching!

## More Information  

Learn more about the Storyboard class, including how to control a storyboard at [http://msdn.microsoft.com/library/system.windows.media.animation.storyboard.aspx](http://msdn.microsoft.com/library/system.windows.media.animation.storyboard.aspx)

Learn about How to Control a Storyboard After It Starts at [http://msdn.microsoft.com/library/ms741997.aspx](http://msdn.microsoft.com/library/ms741997.aspx)
