---
title: "Creating SPFx web part property panes with an Apply button"
aliases:

- /2018/04/09/creating-spfx-web-part-property-panes-with-an-apply-button


date: 2018-04-09T10:07:47+06:00

# post thumb

image: "posts/creating-spfx-web-part-property-panes-with-an-apply-button/featured-image.webp"

# meta description

summary: "When you create an SPFx web part, the default Property Pane automatically submits changes to the web part. There is no “Apply” button. But sometimes you don’t want changes to the property pane fields to automatically apply. All you have to do is to add this method in your web part class..."

# taxonomies

categories:

- "SharePoint"
tags:
- "SPFx"

---
This is an easy one, but I keep Googling it.

When you create an SPFx web part, the default Property Pane automatically submits changes to the web part. There is no “Apply” button.

![Property Pane without Apply](PropertyPaneWithoutApply.png)

Default property pane — no Apply button

But sometimes you don’t want changes to the property pane fields to automatically apply.

All you have to do is to add this method in your web part class (just before

getPropertyPaneConfiguration is where I like to place it):

```typescript
protected get disableReactivePropertyChanges(): boolean {
 return true;
}
```

When you refresh the web part, your property pane will sport a fancy Apply button!

![PropertyPaneWithApply.png](PropertyPaneWithApply.png)

Property pane with an Apply button

Property changes in the property pane will only get applied when users hit **Apply**.

That’s it!
