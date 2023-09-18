---
title: "SharePoint Framework Design Series: Layout Patterns — Part IV"
aliases:
  - /2019/08/31/sharepoint-framework-design-series-layout-patterns-part-iv
series: "SharePoint Framework Design Series"
date: 2019-08-31T10:07:47+06:00

# post thumb
image: posts/sharepoint-framework-design-series-layout-patterns-part-iv/layouts_animation_compact.gif

# meta description
summary: In today’s post in the web part layout series, we discuss the compact layout.

# taxonomies
categories:
  - SPFx
keywords:
  - SPFx Design Series
---
## Introduction

Microsoft has an awesome web site called [SharePoint Design](https://spdesign.azurewebsites.net/). It provides design guidance on beautiful and fast sites, pages, and web parts with SharePoint in Office 365.

However, it does not tell you how to create those beautiful web parts.

This blog series is intended as a companion to the SharePoint Design site. It provides code samples and detailed how-to information for every design topic.

It should help you create web parts that look exactly like the ones on the SharePoint Design site.

So far, we have discussed the following topics:

* [Web Part Titles and Descriptions](/2019/07/10/sharepoint-framework-design-series-web-part-titles-and-descriptions/)
* [Property Panes, Part I](/2019/07/12/sharepoint-framework-design-series-property-panes-part-1/)
* [Property Panes, Part II](/2019/07/15/sharepoint-framework-design-series-property-panes-part-ii/)
* [Property Panes, Part III](/2019/07/17/sharepoint-framework-design-series-property-panes-part-iii/)
* [Layout Patterns, Part I: The Grid layout](/2019/07/28/sharepoint-framework-design-series-layout-patterns-i/)
* [Layout Patterns, Part II: The Filmstrip layout](/2019/07/31/sharepoint-framework-design-series-layout-patterns-part-ii/)
* [Layout Patterns, Part III: The Carousel layout](/2019/08/07/sharepoint-framework-design-series-layout-patterns-part-iii/)

In today’s post, we’ll continue our discussion about the web part layout patterns and discuss the **compact layout**.

## What is the Compact layout?

![Compact layout](../../images/post/uploads/2019/08/layouts_animation_compact.gif)

According to the [SharePoint Design site](https://docs.microsoft.com/sharepoint/dev/design/layout-patterns):

> The compact layout is designed to show content in a smaller format and works the best in a one-third column. This layout can support a small image or icon and a few rows of text for a title, description, and/or metadata.

However, it seems that the compact layout is not only used in 1/3 columns. The [SharePoint look book](https://sharepointlookbook.azurewebsites.net/) and the [SharePoint Online Provisioning Service](https://provisioning.sharepointpnp.com/home/contentPage?contentPageId=ServiceDescriptionLong) both make use of the compact layout with the **Quick Links** web part.

## When to use the compact layout

Use the compact layout when the items in your web part have very little information. A title and an icon or a small thumbnail is pretty much all you’ll be able to fit it.

## How is it made?

The compact layout is simply a **Grid** layout, but where the individual items use a compact document card layout instead of the full document card.

To create your own, you would use an Office UI Fabric [List control](https://developer.microsoft.com/fabric#/controls/web/list) and render each item inside the list with a [DocumentCard control](https://developer.microsoft.com/fabric#/controls/web/documentcard) where the `type` of the `DocumentCard` control would be set to `DocumentCardType.compact`.

Or, you can simply use the component I built to make my life easier.

## How to create a web part with the compact layout

**Note:** The source code for this sample can be found in the [WebPartLayouts sample](https://github.com/hugoabernier/WebPartDesignSeries/tree/master/WebPartLayouts) on my [repo](https://github.com/hugoabernier/WebPartDesignSeries).

1. Create your own web part solution. For this sample, we’ll assume that your web part is called `CompactWebPart` and that the component which renders the content of the web part is called `Compact`.

2. Copy the content of the `src\components\compactLayout` from [my sample code](https://github.com/hugoabernier/WebPartDesignSeries/tree/master/WebPartLayouts/src/components/compactLayout) to your own solution. You may need to create a `components` and `compactLayout` folder under `src` to do so.

3. In your web part, load the items you wish to display. For this example, we’ll set them in your web part’s state and _hard-code_ them in your web part’s constructor, but feel free to load any data you want to use. We’ll want to have at least a `title` attribute and a `thumbnail` attribute, but — as you’ll see later — you can really display any information you want when you render each item.

    ```typescript
    constructor(props: ICompactProps) {
    super(props);
    
    // Sample data generated at https://mockaroo.com/
    this.state = {
      items: [{
        thumbnail: "https://robohash.org/nostrumquiiure.png?size=48x48&set=set1",
        title: "Aerified"
      }, {
        thumbnail: "https://robohash.org/minimafugitenim.png?size=48x48&set=set1",
        title: "Viva"
      }, {
        thumbnail: "https://robohash.org/nihilbeataeculpa.png?size=48x48&set=set1",
        title: "Overhold"
      }, {
        thumbnail: "https://robohash.org/essequiquo.png?size=48x48&set=set1",
        title: "Latlux"
      }, {
        thumbnail: "https://robohash.org/inipsumtotam.png?size=48x48&set=set1",
        title: "Biodex"
      }, {
        thumbnail: "https://robohash.org/utmodiet.png?size=48x48&set=set1",
        title: "Bitchip"
      }, {
        thumbnail: "https://robohash.org/undeenimvel.png?size=48x48&set=set1",
        title: "Rank"
      }, {
        thumbnail: "https://robohash.org/pariaturoditdolore.png?size=48x48&set=set1",
        title: "Opela"
      }, {
        thumbnail: "https://robohash.org/nullaullamincidunt.png?size=48x48&set=set1",
        title: "Rank"
      }, {
        thumbnail: "https://robohash.org/accusantiumnonvoluptatibus.png?size=48x48&set=set1",
        title: "Bitchip"
      }, {
        thumbnail: "https://robohash.org/culpaeossapiente.png?size=48x48&set=set1",
        title: "Sonsing"
      }, {
        thumbnail: "https://robohash.org/harumnihilvelit.png?size=48x48&set=set1",
        title: "Duobam"
      }, {
        thumbnail: "https://robohash.org/quianesciuntet.png?size=48x48&set=set1",
        title: "Prodder"
      }, {
        thumbnail: "https://robohash.org/aliquidipsamrem.png?size=48x48&set=set1",
        title: "Keylex"
      }, {
        thumbnail: "https://robohash.org/dignissimoseosaccusamus.png?size=48x48&set=set1",
        title: "Span"
      }, {
        thumbnail: "https://robohash.org/exomnisexcepturi.png?size=48x48&set=set1",
        title: "Stringtough"
      }, {
        thumbnail: "https://robohash.org/occaecatimolestiaererum.png?size=48x48&set=set1",
        title: "Prodder"
      }, {
        thumbnail: "https://robohash.org/consequaturinquis.png?size=48x48&set=set1",
        title: "Alpha"
      }, {
        thumbnail: "https://robohash.org/sapienteofficiisest.png?size=48x48&set=set1",
        title: "Job"
      }, {
        thumbnail: "https://robohash.org/similiquesuntiusto.png?size=48x48&set=set1",
        title: "Cookley"
      }, {
        thumbnail: "https://robohash.org/sitnequequi.png?size=48x48&set=set1",
        title: "Stronghold"
      }]
    };
    }
    ```

4. In your web part’s component, add an import for the `compactLayout`. You’ll also need an import for the UI Fabric `DocumentCard` component:

    ```typescript
    // Used to render document cards
    import {
    DocumentCard,
    DocumentCardPreview,
    DocumentCardDetails,
    DocumentCardTitle,
    IDocumentCardPreviewProps,
    DocumentCardType
    } from 'office-ui-fabric-react/lib/DocumentCard';
    import { ImageFit } from 'office-ui-fabric-react/lib/Image';
    import CompactLayout from '../../../components/compactLayout/CompactLayout';
    ```

5. Add a `_onRenderGridItem` method:

    ```typescript
    private _onRenderGridItem = (item: any, _index: number): JSX.Element => {
    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          previewImageSrc: item.thumbnail,
          imageFit: ImageFit.centerCover,
          height: 48,
          width: 48
        }
      ]
    };
    
    return <div
      data-is-focusable={true}
      data-is-focus-item={true}
      role="listitem"
      aria-label={item.title}
    >
      <DocumentCard
        type={DocumentCardType.compact}
        onClick={(ev: React.SyntheticEvent<HTMLElement>) => alert(ev)}
      >
        <DocumentCardPreview {...previewProps} />
        <DocumentCardDetails>
          <DocumentCardTitle
            title={item.title}
            shouldTruncate={true}
          />
        </DocumentCardDetails>
      </DocumentCard>
    </div>;
    }
    }
    ```

6. Update your component’s `render` method to render the compact layout as follows:

    ```typescript
    public render(): React.ReactElement<ICompactProps> {
    return (
      <div className={styles.compact}>
        <CompactLayout
          items={this.state.items}
          onRenderGridItem={(item: any, index: number) => this._onRenderGridItem(item, index)}
        />
      </div>
    );
    }
    ```

That’s really all there is to it! You web part will render something like this:  
![The compact layout](../../images/post/uploads/2019/08/compactLayout.png)

The great thing is that it is entirely up to you how you want to render each item. I chose to use the `DocumentCard` control, but you can replace any part of your `_onRenderGridItem` method to suit your needs.

For example, if you wanted to render a date instead of an thumbnail, you could use something like the [DateBox component](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/react-calendar-feed/src/shared/components/DateBox) that I wrote for [the React Calendar Feed sample](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/react-calendar-feed).

![The Datebox control](../../images/post/uploads/2019/08/image-1567306747447.png)

## Adding pagination

When I first built the [React Calendar Feed sample](https://github.com/pnp/sp-dev-fx-webparts/tree/master/samples/react-calendar-feed), the Events web part showed little **Previous** and **Next** buttons at the bottom of the web part when displaying in the compact mode.

It seems that the pagination has since been removed from the standard web part design. Nevertheless, I have included a sample control to show how you can add pagination to your compact web part.

Use it at your discretion.

To add pagination to your web part, follow these steps:

1. Copy the content of the `src\components\paging` from [my sample code](https://github.com/hugoabernier/WebPartDesignSeries/tree/master/WebPartLayouts/src/components/paging) to your own solution. You may need to create a `paging` folder under `src\components` to do so.
2. Add a variable to store the current page number in your component’s state, as follows:

    ```typescript
    export interface ICompactState {
    items: any[];
    currentPage: number;
    }
    ```

3. In your component’s constructor, set the current page to `1`, as follows:

    ```typescript
    constructor(props: ICompactProps) {
    super(props);
    
    // Sample data generated at https://mockaroo.com/
    this.state = {
      currentPage: 1,
      items: [{
        thumbnail: "https://robohash.org/nostrumquiiure.png?size=48x48&set=set1",
        title: "Aerified"
      }, {
        thumbnail: "https://robohash.org/minimafugitenim.png?size=48x48&set=set1",
        title: "Viva"
      }, {
        thumbnail: "https://robohash.org/nihilbeataeculpa.png?size=48x48&set=set1",
        title: "Overhold"
      }, {
        thumbnail: "https://robohash.org/essequiquo.png?size=48x48&set=set1",
        title: "Latlux"
      }, {
        thumbnail: "https://robohash.org/inipsumtotam.png?size=48x48&set=set1",
        title: "Biodex"
      }, {
        thumbnail: "https://robohash.org/utmodiet.png?size=48x48&set=set1",
        title: "Bitchip"
      }, {
        thumbnail: "https://robohash.org/undeenimvel.png?size=48x48&set=set1",
        title: "Rank"
      }, {
        thumbnail: "https://robohash.org/pariaturoditdolore.png?size=48x48&set=set1",
        title: "Opela"
      }, {
        thumbnail: "https://robohash.org/nullaullamincidunt.png?size=48x48&set=set1",
        title: "Rank"
      }, {
        thumbnail: "https://robohash.org/accusantiumnonvoluptatibus.png?size=48x48&set=set1",
        title: "Bitchip"
      }, {
        thumbnail: "https://robohash.org/culpaeossapiente.png?size=48x48&set=set1",
        title: "Sonsing"
      }, {
        thumbnail: "https://robohash.org/harumnihilvelit.png?size=48x48&set=set1",
        title: "Duobam"
      }, {
        thumbnail: "https://robohash.org/quianesciuntet.png?size=48x48&set=set1",
        title: "Prodder"
      }, {
        thumbnail: "https://robohash.org/aliquidipsamrem.png?size=48x48&set=set1",
        title: "Keylex"
      }, {
        thumbnail: "https://robohash.org/dignissimoseosaccusamus.png?size=48x48&set=set1",
        title: "Span"
      }, {
        thumbnail: "https://robohash.org/exomnisexcepturi.png?size=48x48&set=set1",
        title: "Stringtough"
      }, {
        thumbnail: "https://robohash.org/occaecatimolestiaererum.png?size=48x48&set=set1",
        title: "Prodder"
      }, {
        thumbnail: "https://robohash.org/consequaturinquis.png?size=48x48&set=set1",
        title: "Alpha"
      }, {
        thumbnail: "https://robohash.org/sapienteofficiisest.png?size=48x48&set=set1",
        title: "Job"
      }, {
        thumbnail: "https://robohash.org/similiquesuntiusto.png?size=48x48&set=set1",
        title: "Cookley"
      }, {
        thumbnail: "https://robohash.org/sitnequequi.png?size=48x48&set=set1",
        title: "Stronghold"
      }]
    };
    }
    ```

4. Add an import for the paging component at the top of your file:

    ```typescript
    import { Paging } from '../../../components/paging';
    ```

5. Change your `render` method to get a subset of items to show, as follows:

    ```typescript
    public render(): React.ReactElement<ICompactProps> {
    let pagedItems: any[] = this.state.items;
    const totalItems: number = pagedItems.length;
    let showPages: boolean = false;
    const maxEvents: number = 5; // Use any page size you want
    const { currentPage } = this.state;
    
    if (true && totalItems > 0 && totalItems > maxEvents) {
      // calculate the page size
      const pageStartAt: number = maxEvents * (currentPage - 1);
      const pageEndAt: number = (maxEvents * currentPage);
    
      pagedItems = pagedItems.slice(pageStartAt, pageEndAt);
      showPages = true;
    }
    
    return (
      <div className={styles.compact}>
        <CompactLayout
          items={pagedItems}
          onRenderGridItem={(item: any, index: number) => this._onRenderGridItem(item, index)} />
    
        {showPages &&
          <Paging
            showPageNumber={true}
            currentPage={currentPage}
            itemsCountPerPage={maxEvents}
            totalItems={totalItems}
            onPageUpdate={this._onPageUpdate}
            nextButtonLabel={strings.NextLabel}
            previousButtonLabel={strings.PreviousLabel}
          />
        }
      </div>
    );
    }
    ```

6. Finally, add a method to store the current page number in your state every time the page changes, as follows:

    ```typescript
    private _onPageUpdate = (pageNumber: number): void => {
    this.setState({
      currentPage: pageNumber
    });
    }
    ```

Test your web part. You should now get a next and previous buttons at bottom of your web part.

![Compact pagination](../../images/post/uploads/2019/08/CompactPagination.gif)

## Conclusion

The compact layout is simply a grid control which renders compact document cards.

In our next post, we’ll discuss the **list** layout!
