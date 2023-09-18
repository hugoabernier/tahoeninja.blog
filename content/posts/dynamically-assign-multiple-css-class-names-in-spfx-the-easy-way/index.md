---
title: "Dynamically Assign Multiple CSS Class Names in SPFx — The Easy Way"
aliases:
  - /2019/01/21/dynamically-assign-multiple-css-class-names-in-spfx-the-easy-way

date: 2019-01-21T10:07:47+06:00

# post thumb
image: posts/dynamically-assign-multiple-css-class-names-in-spfx-the-easy-way/featured-image.webp

# meta description
summary: "If you write SPFx web parts or extensions using React, you may have had to assign more than one or more CSS classes to the same element. "

# taxonomies
categories:
  - SPFx
---
## Introduction

If you write SPFx web parts or extensions using React, you may have had to assign more than one or more CSS classes to the same element. To do so, you simply list all the CSS class names inside a string, separated by spaces; Like this:

```typescript
public render(): React.ReactElement<IDemoProps> {
    return (
      <div
        className={"myClass mySelectedClass myEnabledClass"}>
    ...
    </div>);
}
```

However, if you want to dynamically assign CSS classes, the string gets a bit more complicated.

For example, if I wanted to add a CSS class only if the state of the element is selected, and also have a different CSS class for whether the object is enabled or not, you would combine a whole bunch of conditional operators inside your string.

Something like this:

```typescript
public render(): React.ReactElement<IDemoProps> {
    const {
        selected,
        enabled } = this.state;

    return (
      <div
        className={"myClass " 
            + selected ? "mySelectedClass "
            : undefined 
            + enabled ? "myEnabledClass"
            : "myDisabledClass"}>
    ...
    </div>);
}
```

Note that I had to include a space after **myClass** and **mySelectedClass** because, if they get concatenated in a string and I forget to include the space, the **className** attribute will be:

```
myClassmySelectedClassmyEnabledClass
```

instead of:

```
myClass mySelectedClass myEnabledClass
```

Which is obvious now that I write it, but when it is 3 in the morning and you’re trying to figure out why your CSS class isn’t working properly, it is a small mistake that can be very annoying.

And if your logic gets even more complicated, your CSS class name concatenation can be pretty unruly.

Luckily, the standards SPFx solution has a built-in helper.

## @uifabric/utilities/lib/css

Courtesy of our Office UI Fabric friends, there is a helper function that takes an array of CSS class names and concatenates it for you.

And the best part is: it is already included inside your SPFx solution!

To use it, start by importing the CSS utilities:

```typescript
import { css } from "@uifabric/utilities/lib/css";
```

And replace all that concatenation ugliness with a simple call to **css**, as follows:

```typescript
public render(): React.ReactElement<IDemoProps> {
    const {
        selected,
        enabled } = this.state;

    return (
      <div
        className={css("myClass", 
            selected &amp;&amp; "mySelectedClass", 
            enabled ? "myEnabledClass" : "myDisabledClass")}>
    ...
    </div>);
}
```

The class takes care of adding spaces between the classes. For example, the following code:

```typescript
className={css('a', 'b', 'c')}
```

will produce:

```typescript
className={'a b c'}
```

It also skips the "falsey" values (according to comments in their code). In other words, you can evaluate class names that result in a **null**, **undefined**, or **false** value and it will skip it.

For example the following code:

```typescript
className={css('a', null, undefined, false, 'b', 'c')}
```

Will produce:

```typescript
className={'a b c'}
```

You can even pass a dictionary of class names, each with a true/false value, and **css** will concatenate all the class names that are **true**, as follows:

```typescript
className={css('a', { b: true, z: false }, 'c')}
```

Produces:

````typescript
className={'a b c'}

<strong>But wait! If you order now, you'll also get</strong> the ability to pass serializable objects (objects that have a <strong>toString()</strong> method) -- at no extra charge!

```TypeScript
const myObject = { toString: () => 'b' };
...
className={css('a', myObject, 'c')}
````

Will result in:

```typescript
className={'a b c'}
```

## Conclusion

As a self-proclaimed **World’s Laziest Developer**, I tend to avoid extra work at any cost. The **css** helper function, which is already in your SPFx solution helps avoid writing extra CSS class name concatenation logic by provided something that is versatile, sturdy and — best of all — tested!

I know that this isn’t an earth-shattering technique or original, but I find myself constantly re-opening old SPFx solutions to remember where that **css** function is defined. This article may save me some searching in the future… and hopefully, help you as well!
