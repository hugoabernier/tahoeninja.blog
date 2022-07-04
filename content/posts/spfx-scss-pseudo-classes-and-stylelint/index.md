---
title: "SPFx Projects, SCSS, Pseudo-classes, and Stylelint"
aliases:
- /2020/06/16/spfx-scss-pseudo-classes-and-stylelint
  
date: 2020-06-20T10:07:47+06:00

# post thumb

image: "posts/spfx-scss-pseudo-classes-and-stylelint/lost-places-2178884_1920.jpg"

# meta description

description: "In this post, I'll show you how you can use SCSS pseudo-classes in your SPFx projects and configure stylelint so that it doesn't give you any warnings."
summary: "In this post, I'll show you how you can use SCSS pseudo-classes in your SPFx projects and configure stylelint so that it doesn't give you any warnings."

# taxonomies

categories:
- "SPFx"

---

Introduction
------------

Dear blog, how I’ve missed you! How long has it been? I know, I know, I’ve been insanely busy, I wasn’t ignoring you, I swear.

As you know, I like to use this blog as a series of "Note to self" notes so that I can find the things I tend to look for more often than I’d like.

Today’s post is another "Note to self". It isn’t intended to be _the best way_ or the _only way_ to do this, it is _my way_.

If, like me, you use the [PnP Yeoman Generator](https://pnp.github.io/generator-spfx/) to create your SPFx projects, you have the ability to turn on **Stylelint** when generating your projects.

**Stylelint** is a tool that reports bad code (or smelly code) in your CSS (and SCSS) files. It helps enforcing consistent code and prevents you from making errors in your style sheets.

However, I use a few super-useful **switches** in my SCSS that always produce an error when running stylelint.

They’re perfectly valid pseudo-classes, but stylelint likes to warn you about them — probably because you shouldn’t abuse them.

In today’s post, I’ll show you how I use these pseudo-classes, and how I configure stylelint in my projects to stop these errors.

> NOTE: I simplified some explanations to keep this article short(ish). If you know the inner workings of how SCSS, CSS, CSS Modules, and Stylelint works, you’ll have to forgive my creative license. But then again, if you know how these things work, this article is probably not for you 🙂

Why bother?
-----------

I can’t tell you how many SPFx projects I’ve opened run `gulp build` on and was bombarded with errors and warning… and when I reached to the developers who created the project, they said "Oh, I just ignore all that!".

The warnings (and errors) are there to tell you that something is wrong (or potentially wrong) with your project; if you ignore them, you might let an issue slip by unnoticed.

Using linting in your projects helps you become a better developer, and it helps keep your code clean and consistent — so that if someone else has to maintain your code, they can get comfortable with your code pretty quickly (presuming that they’re also using linting tools).

In my opinion, **it is every developer’s job to constantly improve the quality of their code and to improve themselves**. I’m not smart enough to know all the best practices, so I rely on linting tools to help me become better.

Don’t ignore warnings. Fix them, or — once you’ve decided to accept the warning — change your project settings so that you can get a clean — warning free — build.

The :global switch
------------------

I’ve [already written](https://tahoeninjas.blog/2019/07/28/prevent-scss-from-changing-your-css-class-names/) about the `:global` pseudo-class before, so I’ll keep it short.

When you use `.scss` files for your style sheets in a SPFx project, the SASS pre-processor creates unique names for all your CSS classes. It does this to ensure that the CSS from your components does not interfere with the CSS from other components. This is also know as **local scope**.

But sometimes you need to define CSS class names that can’t change. For example, if you’re embedding a third-party component and you need to override their style sheet. That’s when you want your CSS classes to be **global scoped**.

And that’s exactly what `:global` is does.

For example, if I wanted to style a `.ms-DocumentCard` element inside my component, I’d use:

```SASS
:global(.ms-DocumentCard) {
    border: 2px solid red;
}
```

Be careful though: `:global` changes apply globally. If you use `:global(.ms-DocumentCard)` in your style sheet, it will affect every single `.ms-DocumentCard` on the entire page.

To override styles within your web part, use something like this:

```SASS
.yourWebPart {
    :global(.ms-DocumentCard) {
        border: 2px solid red;
    }
}
```

To define a whole area of your `.scss` that you don’t want to be renamed, use a `:global` block, like this:

```SASS
:global {
    .ms-DocumentCard {
    border: 2px solid red;

    .ms-DocumentCard--compact {
        .ms-DocumentCardPreview {
        -ms-flex-negative: 0;
        flex-shrink: 0;
        width: 144px;
        }
    }

    .ms-DocumentCardPreview-icon img {
        width: 32px;
        height: 32px;
    }
    }

    .ms-DocumentCard:not(.ms-DocumentCard--compact) {
    ...
    }
}
```

The only problem is: stylelint will yell at you at build time:

    Unexpected unknown pseudo-class selector ":global"   selector-pseudo-class-no-unknown

That’s because the `:global` is not a valid pseudo-class in CSS, it is a [**CSS module**](https://github.com/css-modules/css-modules/blob/master/README.md) switch.

As far as stylelint is concerned, `:global` has no business in CSS… and it’s probably a good thing: you should be careful when using the `:global` switch because **you could completely mess up every page your web part is on if you’re not careful**.

If you promise to be careful, though, here’s how you can tell stylelint that you’re ok with using the `:global` switch in your `.scss` and that you promise to use it for good, not evil:

1. In the root of your project, find the `.stylelintrc` file and open it. The `.stylelintrc` is where you can configure the stylelint rules.

    > **PRO TIP:** If you’re using Visual Studio Code, it most likely doesn’t know that your `.stylelintrc` file is a `.json` file. Just go in the lower-right corner of VS Code, click on **Plain text**:  
    > ![file](../../images/post/uploads/2020/06/image-1592325227356.png)  
    > In the list of files types that pop-up at the top, select **JSON with comments**  
    > ![file](../../images/post/uploads/2020/06/image-1592325294891.png)

2. Find the `"rules"` node, and insert the following JSON at the bottom — making sure to add a comma (`,`) at the end of the previous rule:

```json
"selector-pseudo-class-no-unknown": [
    true,
    {
        "ignorePseudoClasses": [
            "global"
        ]
    }
],
```

3. Save the file and rebuild.

Your `.stylelintrc` file should look something like this:

```json
{
    "extends": "stylelint-config-standard",
    "plugins": [
    "stylelint-scss"
    ],
    "rules": {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "selector-pseudo-class-no-unknown": [
        true,
        {
            "ignorePseudoClasses": [
                "global"
            ]
        }
    ],
    }
}
```

The :export pseudo-selector
---------------------------

Call me old-fashioned, but I like to keep my styles completely separate from the presentation layer and the business/data layers.

For this reason, I always try to avoid store any colors, fonts, or dimensions in my `.tsx` files, and stick them in my `.scss` files.

But sometimes I need to access some values from my `.scss` in my code. For example, if I need to dynamically change colors of elements, or if I need to know the dimensions of an element.

In this case, I would define the values in my `.scss` (because that’s where **styles** belong!), and use `:export` to make them available to my code:

```SASS
    :export {
      backgroundColor1: rgba(75,192,192,0.4);
      borderColor1: rgba(75,192,192,1);
      pointBorderColor1: rgba(75,192,192,1);
      pointBackgroundColor1:   rgba(75,192,192,1);;
      pointHoverBackgroundColor1: rgba(75,192,192,1);
      pointHoverBorderColor1: rgba(220,220,220,1);
    }
```

And:

```SASS
    :export {
      centerPadding: 50px;
    }
```

And then, in my code, import the styles like I normally would:

```TypeScript
import styles from './LineChartDemo.module.scss';
```

And call the exported values as needed in my code:

```typescript
let color: string = styles.backgroundColor1;
```


But you’ll soon find out that stylelint does not like the `:export` pseudo-selector. Again, that’s because as far as stylelint is concerned, anything that starts with `:` is a [pseudo-class](https://developer.mozilla.org/docs/Web/CSS/Pseudo-classes).

To solve this, simply add the following rule in your `.stylelintrc`:

```json
"selector-pseudo-class-no-unknown": [
        true,
        {
        "ignorePseudoClasses": [
            "export"
        ]
        }
    ],
```


How to figure out what rules to put in?
---------------------------------------

When stylelint gives you an error, it usually tells you what rule was broken.

For example:

    Unexpected unknown pseudo-class selector ":export"   selector-pseudo-class-no-unknown

…tells you that `selector-pseudo-class-no-unknown` is the rule that causes this error.

Go to the [stylelint user guide](https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown) and find the rule that is causing the issue. Then look for the [optional secondary options](https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown#optional-secondary-options) section to see if there are any configuration settings that allow you to override the settings.

In the case of `selector-pseudo-class-n-unknown`, it says that you can pass an array of class names to the `ignorePseudoClasses` setting, as follows:

```json
ignorePseudoClasses: ["/regex/", "string"]
```


So, all you need to do is to pass the values you want to ignore (in our case `export` and `global`) in a string array:

```json
"selector-pseudo-class-no-unknown": [
            true,
            {
                "ignorePseudoClasses": [
                    export",
                    global"
                ]
            }
        ],
    }
```

Conclusion
----------

I hope that using CSS module switches and stylelint configurations in your projects will help keep your projects clean and warning free.

Updates
-------

* **June 16th 2020:** Thanks to [Stefan Bauer](https://twitter.com/StfBauer) for pointing out I was incorrectly describing `:global` and `:export` as pseudo-classes, when they are really CSS module switches. That explains why I can never find any information about them when I google them.

Photo Credits
-------------

Image by [Ich bin dann mal raus hier.](https://pixabay.com/users/MichaelGaida-652234/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2178884) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2178884)
