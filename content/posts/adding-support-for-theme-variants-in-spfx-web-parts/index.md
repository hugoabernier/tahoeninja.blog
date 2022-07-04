---
title: Adding support for theme variants in SPFx web parts
aliases:
  - /2020/07/28/adding-support-for-theme-variants-in-spfx-web-parts

date: 2020-07-28T10:07:47+06:00

# post thumb
image: posts/adding-support-for-theme-variants-in-spfx-web-parts/pierre-bamin-eQ_icBB_jFk-unsplash.jpg

# meta description
summary: Like chameleons, SPFx web parts can change colors to adapt to changing
  environments and blend in. Find out how to build good-looking web parts on any
  theme.

# taxonomies
categories:
  - SPFx
keywords:
  - SPFx
  - Theme
  - SharePoint
---
Introduction
------------

Since SPFx 1.8, we have been able to make web parts aware of what section they reside in on a modern page.

Each SharePoint site theme has four variants: the main variant, a neutral variant, a soft variant, and a strong variant.

You can configure each page section’s background color with one of the four theme’s variants.

![Theme variants](../../images/post/uploads/2020/07/image-1595904360595.png)

When you place a web part on a section with a different background color, the web part has the ability to adapt to that section’s background color.

Microsoft has a great article explaining [how to add section support to your web parts](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/supporting-section-backgrounds), but it does not go into great detail explaining the theme variants.

Theme variants define a lot of different colors, like the background color, body color, button colors, etc.

Every time I write a web part that is "theme-variant-aware," I find myself looking up which theme colors I should use for each element in my web part.

If you dig enough in the SharePoint code (under `sp-component-base`) you’ll find helpful comments describing how to use each color of a theme variant.

Hoping this will help someone, I extracted the description of each color in theme variants from the comments and created this post.

Keep in mind that this information may change between versions of SPFx. I’ll do my best to keep it up-to-date between versions.

Adding support for theme variants
---------------------------------

Before we explore the various colors that are available at your disposal, let’s discuss how to make your web part aware when a section theme variant changes.

When you create a new web part using the Yeoman generator, your web part does not adapt to theme variants. If you change the background color of the section where you web part resides, it mostly stays the same color, like the sample below:

![This web part is not theme aware](../../images/post/uploads/2020/07/sectionunaware.gif)

To make it support theme variants, you need to follow these steps (this code is extracted from [Microsoft’s article](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/supporting-section-backgrounds):

1. In your web part’s `.manifest.json`, add the following (I usually add it above the `preconfiguredEntries`):

    "supportsThemeVariants": true,

2. At the top of your web part’s code (`YourWebPartNameWebPart.ts`, add the following imports:

    ```typescript
    import {
      ThemeProvider,
      ThemeChangedEventArgs,
      IReadonlyTheme,
      ISemanticColors
    } from '@microsoft/sp-component-base';
    ```

3. In your web part class (just below `export default class YourWebPartNameWebPart`, add these two variables:

    ```typescript
    private _themeProvider: ThemeProvider;
    private_themeVariant: IReadonlyTheme | undefined;
    ```

The `_themeProvider` variable will store the web part’s instance of the _theme provider_, which notifies the web part of the currently selected theme. The `_themeVariant` variable will store the currently selected theme variant.

4. Add an event handler in your web part to react to changing theme variants:

    ```typescript
    private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
      this._themeVariant = args.theme;
      this.render();
    }
    ```

5. In your web part code, add an `onInit` method to initialize the theme provider, get the initial theme variant, and associate the event handler:

    ```typescript
    protected onInit(): Promise<void> {
      // Consume the new ThemeProvider service
      this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

      // If it exists, get the theme variant
      this._themeVariant = this._themeProvider.tryGetTheme();

      // Register a handler to be notified if the theme variant changes
      this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

      return super.onInit();
    }
    ```

6. In your web part’s `render` method, you’ll need to add code to pass the theme variant to your component:

    ```typescript
    public render(): void {
      const element: React.ReactElement<IYourWebPartNameProps > = React.createElement(
        YourWebPartName,
        {
          themeVariant: this._themeVariant,
          // whatever other props you want to pass
        }
      );

      ReactDom.render(element, this.domElement);
    }
    ```

7. In your web part’s component’s props (`IYourWebPartNameProps`), add a prop for the theme variant:

    ```typescript
    import { IReadonlyTheme } from '@microsoft/sp-component-base';

    export interface IYourWebPartNameProps {
      themeVariant: IReadonlyTheme | undefined;
    }
    ```

8. Finally, in your web part’s component’s `tsx` file, you can use the `themeVariant` prop to retrieve variant colors:

    ```typescript
    public render(): React.ReactElement<IYouWebPartNameProps> {

      const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

      return (
        <div style={{backgroundColor: semanticColors.bodyBackground, color: semanticColors.bodyText}}>
          <span className={ styles.title }>Welcome to SharePoint!</span>
          <p className={ styles.subTitle }>This web part is theme variant aware.</p>
        </div>
      );
    }
    ```

9. Once your rebuild your web part (`gulp build`) and add your web part to a page (remember: if you changed the manifest since you added the web part to a page, you need to re-add the web part), your web part will now be aware of section background colors:

![A section theme aware web part](../../images/post/uploads/2020/07/sectionaware.gif)

You’ll notice that we use the `bodyBackground` and `bodyText` colors from the `themeVariant`. But theme variants define a lot more colors.

Theme variant colors
--------------------

In a theme variant, you can find the **palette** colors (e.g.: `themeDark`, `themePrimary`, `themeSecondary`, etc.) and the **semantic** colors.

Your first instinct might be to try to use the palette colors, but that would require you to know exactly which color is applied to what element. For example, do you know which palette color is used for a button’s background color when a user mouses over it?

Me neither.

The semantic colors, however, describe how you would use each palette color _semantically_. For example, it tells you that the background color of a hover button should be `buttonBackgroundHovered`.

Here is the full list of semantic colors available within a theme variant. The list is extracted from Microsoft’s code.

### Base colors

| Color | Description |
| --- | --- |
| `bodyBackground` | The default color for backgrounds. |
| `bodyStandoutBackground` | The standout color for highlighted content backgrounds. For highlighted content when there is no emphasis, use the neutral variant instead. This should be a shade darker than `bodyBackground` in light themes, and a shade lighter in inverted themes. |
| `bodyFrameBackground` | The color for chrome adjacent to an area with `bodyBackground`. This can be used to provide visual separation of zones when using stronger colors, when using a divider line is not desired. In most themes, this should match the color of `bodyBackground`. |
| `bodyFrameDivider` | Used as the border between a zone with `bodyFrameBackground` and a zone with `bodyBackground`. If `bodyBackground` and `bodyFrameBackground` are different, this should be the same color as `bodyFrameBackground` in order to visually disappear. |
| `bodyDivider` | Divider lines; e.g. lines that separate sections in a menu, an `<HR>` element. |
| `disabledBackground` | The color of the outline around focused controls that don’t already have a border; e.g. menu items |
| `variantBorder` | The color of the border that provides contrast between an element, such as a card, and an emphasized background. |
| `variantBorderHovered` | Hover color of border that provides contrast between an element, such as a card, and an emphasized background. |
| `defaultStateBackground` | Background color for default/empty state graphical elements; e.g. default icons, empty section that needs user to fill in content, placeholder graphics, empty seats, etc. |
| `errorBackground` | The background for errors, if necessary, or highlighting the section of the page where the error is present. |
| `blockingBackground` | Background for blocking issues, which is more severe than a warning, but not as bad as an error. |
| `warningBackground` | Background for warning messages. |
| `warningHighlight` | Foreground color for warning highlights |
| `successBackground` | Background for success |
| `inputBorder` | The border of a large input control in its resting, state; e.g. the box of a dropdown. |
| `smallInputBorder` | The border of a small input control in its resting unchecked state; e.g. the box of an unchecked checkbox. |
| `inputBorderHovered` | The border color of a large hovered input control, such as textbox. |
| `inputBackground` | The background color of an input, e.g. textbox background. |
| `inputBackgroundChecked` | The background of a checked control; e.g. checked radio button’s dot, checked toggle’s background. |
| `inputBackgroundCheckedHovered` | The background of a checked and hovered control; e.g. checked checkbox’s background color on hover. |
| `inputForegroundChecked` | The foreground of a checked control; e.g. checked checkbox’s checkmark color, checked toggle’s thumb color, radio button’s background color around the dot. |
| `inputFocusBorderAlt` | The alternate focus border color for elements that already have a border; e.g. text field borders on focus. |
| `buttonBackground` | Background of a standard button |
| `buttonBackgroundChecked` | Background of a checked standard button; e.g. bold/italicize/underline text button in toolbar |
| `buttonBackgroundHovered` | Background of a hovered standard button |
| `buttonBackgroundCheckedHovered` | Background of a checked and hovered standard button; e.g. bold/italicize/underline text button in toolbar |
| `buttonBackgroundDisabled` | Background of a disabled standard button |
| `buttonBackgroundPressed` | Background of a pressed standard button; i.e. currently being clicked by mouse |
| `buttonBorder` | Border of a standard button |
| `buttonBorderDisabled` | Border of a disabled standard button |
| `primaryButtonBackground` | Background of a primary button |
| `primaryButtonBackgroundHovered` | Background of a hovered primary button |
| `primaryButtonBackgroundPressed` | Background of a pressed primary button; i.e. currently being clicked by mouse |
| `primaryButtonBackgroundDisabled` | Background of a disabled primary button |
| `primaryButtonBorder` | Border of a primary button |
| `accentButtonBackground` | Background of an accent button (kicker) |
| `menuBackground` | The background of a menu. |
| `menuDivider` | The divider between menu items. |
| `menuIcon` | The default colors of icons in menus. |
| `menuHeader` | The headers in menus that denote title of a section. |
| `menuItemBackgroundHovered` | The background of a hovered menu item. |
| `menuItemBackgroundPressed` | The background of a pressed menu item. |
| `menuItemText` | The text color of a menu item. |
| `menuItemTextHovered` | The text color of a hovered menu item. |
| `listBackground` | The background color for the entire list. |
| `listText` | The default text color for list item titles and text in column fields. |
| `listItemBackgroundHovered` | The background color of a hovered list item. |
| `listItemBackgroundChecked` | The background color of a checked list item. |
| `listItemBackgroundCheckedHovered` | The background color of a checked and hovered list item. |
| `listHeaderBackgroundHovered` | The background color for a hovered list header. |
| `listHeaderBackgroundPressed` | The background color for a pressed list header. |

### Text colors

| Color | Description |
| --- | --- |
| `bodyText` | The default color for text. |
| `bodyTextChecked` | Checked text color, e.g. selected menu item text. |
| `bodySubtext` | De-emphasized text; e.g. metadata, captions, placeholder text. |
| `actionLink` | Neutral colored links and links for action buttons. |
| `actionLinkHovered` | Hover state for neutral colored links and links for action buttons. |
| `link` | The color of a link. |
| `linkHovered` | The color of a hovered link. Also used when the link is active. |
| `disabledText` | The default color for disabled text on top of `disabledBackground`; e.g. text in a disabled text field, disabled button text. |
| `disabledBodyText` | The default color for disabled text on the default background (`bodyBackground`). |
| `disabledSubtext` | Disabled de-emphasized text, for use on `disabledBackground` |
| `disabledBodySubtext` | Disabled de-emphasized text, for use on the default background (`bodyBackground`). |
| `errorText` | The default color of error text, used on `bodyBackground`. |
| `warningText` | The color of text on `errorBackground`, `warningBackground`, `blockingBackground`, or `successBackground`. |
| `inputText` | The color of input text. |
| `inputTextHovered` | The color of input text on hover. |
| `inputPlaceholderText` | The color of placeholder text. |
| `buttonText` | Color of text in a standard button |
| `buttonTextHovered` | Color of text in a hovered standard button |
| `buttonTextChecked` | Color of text in a checked standard button |
| `buttonTextCheckedHovered` | Color of text in a checked and hovered standard button |
| `buttonTextPressed` | Color of text in a pressed standard button; i.e. currently being clicked by mouse |
| `buttonTextDisabled` | Color of text in a disabled standard button |
| `primaryButtonText` | Color of text in a primary button |
| `primaryButtonTextHovered` | Color of text in a hovered primary button |
| `primaryButtonTextPressed` | Color of text in a pressed primary button; i.e. currently being clicked by mouse |
| `primaryButtonTextDisabled` | Color of text in a disabled primary button |
| `accentButtonText` | Color of text for accent button (kicker) |
| `listText` | The default text color for list item titles and text in column fields. |

Conclusion
----------

Like chameleons, SPFx web parts can change colors to adapt to changing environments and blend in.

With a few lines of code and some knowledge of which semantic colors you can use, you can built awesome web parts that will look good no matter what theme (or theme variant) your site uses.

I hope this helps?

Photo Credits
-------------

Photo by [Pierre Bamin](https://unsplash.com/@bamin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/chameleon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
