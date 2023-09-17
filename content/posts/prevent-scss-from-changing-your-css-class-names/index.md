---
title: "Prevent SCSS from changing your CSS class names"
aliases:

- /2019/07/28/prevent-scss-from-changing-your-css-class-names

date: 2019-07-28T10:07:47+06:00

# post thumb

image: "posts/prevent-scss-from-changing-your-css-class-names/featured-image.jpg"

# meta description

summary: "Sometimes, when working on a SPFx project, I just want to define a CSS class in my .scss file but I don’t want the SASS pre-processor to append random strings to my class names."

# taxonomies

categories:

- "SharePoint"
tags:
- "SPFx"
---
## Introduction

Sometimes, when working on a SPFx project, I just want to define a CSS class in my `.scss` file but I don’t want the SASS pre-processor to append random strings to my class names.

For example, let’s say I wanted to customize the `DocumentCard` elements within my SPFx web part to add a border. If I write my SCSS like this:

```css
.myWebPart .ms-DocumentCard {
    border: 2px solid red;
}
```

It won’t work.

That’s because when building my solution, the SASS pre-processor will append random strings to my class names. So, my `.myWebPart` and `.ms-DocumentCard` CSS classes might become `.myWebPart-223` and `.ms-DocumentCard-242`.

The problem is, I don’t want my CSS classes to change from `.ms-DocumentCard` to `.ms-DocumentCard-242` because the `.ms-DocumentCard` CSS class comes from another component (in this case, Microsoft’s Fabric UI `DocumentCard`).

Luckily, there’s a way around it. Every time I need to remember how to do it though, I find myself having to re-open old projects.

## Using the `:global` pseudo selector

To prevent the SASS pre-processor from appending random strings to my CSS class name, just use the `:global` pseudo selector.

For example:

```scss
:global(.ms-DocumentCard) {
    border: 2px solid red;
}
```

You should be careful, though: global CSS changes apply, well, _globally_. This means that if you use `global(.ms-DocumentCard)` in your CSS, every single element with a CSS class of `.ms-DocumentCard` on the entire page will be affected — not just the ones in your web part.

If you want to override styles within your web part, use a CSS selector that is a bit more restrictive; something like this:

```scss
.yourWebPart {
    :global(.ms-DocumentCard) {
        border: 2px solid red;
    }
}
```

If you need to define a whole bunch of CSS classes that you don’t want to be renamed, you can define a `global` block, as follows:

```scss
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

## More information

When you create a SPFx solution, the Yeoman generator creates a `[YourWebPartName].module.scss` file automatically for you.

You may have asked yourself why the file isn’t just called `[YourWebPartName].scss` instead of `[YourWebPartName].module.scss`. Well, as it turns out, the `.module` part of the file name is what instructs the pre-processor to make every CSS class names unique.

If you changed your `.scss` file to `[YourWebPartName].scss`, the pre-processor would stop renaming the CSS class names, but you’d risk getting more issues; instead of being scoped to your web part, the CSS classes would be globally applied to the page.

Instead, it is better to continue using `[YourWebPartName].module.scss` and use the `:global` pseudo selector.

By the way, if you want to define a _local_ CSS class name within a global block, simply use the `:local` pseudo selector. It works exactly the opposite of the `:global` pseudo selector.

For example:

```scss
:global {
  .ms-DocumentCard {
    border: 2px solid red;

        :local(.myDocument) {
            border: 2px solid green;
        }
    }
}
```

## Conclusion

SCSS rocks, but sometimes it can be annoying how the CSS class names are automatically renamed to make them unique.

To prevent renaming a class name, use `:global()` or `:global { }` in your SCSS.

Whatever you do, resist the urge to make all your CSS classes global.

I hope it helps?

## Photo Credit

Image by [Christoph Meinersmann](https://pixabay.com/users/ChristophMeinersmann-1576342/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1439713) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1439713)
