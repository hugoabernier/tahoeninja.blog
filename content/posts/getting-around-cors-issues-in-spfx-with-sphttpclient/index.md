---
title: "Getting around CORS issues in SPFx with SPHttpClient"
aliases:
  - /2019/02/05/getting-around-cors-issues-in-spfx-with-sphttpclient

date: 2019-02-05T10:07:47+06:00

# post thumb
image: posts/getting-around-cors-issues-in-spfx-with-sphttpclient/featured-image.webp

# meta description
summary: "This article will explain what CORS is, and how to avoid issues with CORS when making HTTP requests to an external resource."

# taxonomies
categories:
  - SPFx
---
## Introduction

Ihate acronyms.

Should have thought of that before getting into IT for a living!

One of the most annoying acronyms, to me, is **CORS**. It is annoying because it shows up in an error message when you’re trying to make an HTTP request to a URL external to SharePoint.

It may be hard to diagnose if you don’t handle your HTTP request rejections, or if you don’t have your developer tools enabled in your browser, but when you do, you’ll get an error message that looks like this:

```
workbench.html:1 Access to fetch at &#039;https://somecoolexternalapi.com/api&#039; from origin 
&#039;https://localhost:4321&#039; has been blocked by CORS policy: Response to preflight request doesn&#039;t 
pass access control check: It does not have HTTP ok status.
```

This article will explain what CORS is, and how to avoid issues with CORS when making HTTP requests to an external resource.

## What is CORS?

> NOTE: I’m over-simplifying the explanation and definition of CORS. If you want the real definition, go look at [Wikipedia](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). Just don’t scream at me for being slightly inaccurate, ok? 🙂

CORS stands for **Cross-origin resource sharing**. It is a way to control how stuff from one web sites (like images, CSS, scripts, and even APIs) is shared with other web sites.

When it isn’t busy ruining your day, CORS can be useful because it allows you to prevent people from pointing to your web site to steal resources from it (while causing extra traffic). Or worse.

It usually works by looking at the domain where the request originates from (e.g.: mytenant.sharepoint.com) and comparing against the domain where the resource sites (e.g.: mycoolapi.com). If the two domains aren’t the same, it is a cross-domain request or — in CORS terms — a **cross-origin** request.

While you can do some CORS validation on the server-side (that’s another blog), it is usually enforced by your browser. In fact, the CORS standards request that any requests that potentially change data (like an API call) should be _pre-validated_ by your browser before even requesting the resource. That pre-verification is called **preflight**.

It goes a little something like this:

> **CLIENT-SIDE COMPONENT:** “Hey browser, please call this API from _[https://somecoolapi.com](https://somecoolapi.com/)_  
> **BROWSER:** “Sure thing. Lemme ask.”. “Hmm, _somecoolapi.com_ is a different domain than _mytenant.sharepoint.com_, where we are now. I should check first”; calls _somecoolapi.com_.  
> **WEBSITE:** “New domain, who dis?”  
> **BROWSER:** “Hey, someone from origin: _mytenant.sharepoint.com_ would like to get access to your API. You can find out all about it in my OPTIONS HTTP headers.”  
> **WEBSITE:** “Sure, I don’t see any reasons why you shouldn’t be allowed. Here, let me give you some _Access-Control-Allow-Origin_ headers to confirm I’m ok with it. Just make sure you only GET stuff, no POST or DELETEs, ok?”.  
> **WEBSITE:** “Awesome!”; Turns to user, “Good news! _somecoolapi.com_ said they’ll do it!”.  
> **WEBSITE:** Makes request. Gets results. Returns results to user.  
> They lived happily ever after.  
> The End.

Come to think of it, that’s exactly how I handle phone calls; If call display is blocked, or it is a number I don’t know, I let it go to voicemail. If it is my wife, I answer. She then asks me to buy more Nespresso coffee on the way home. I usually accept the request, because standing between my wife and coffee is like standing between a mother bear and her cub: dangerous.

So, CORS may be annoying, but it is useful.

The problem is that when you make requests to another domain in a SPFx web part using SPHttpClient, you’re making a request from _mytenant.sharepoint.com_. It usually triggers a CORS error.

To make things worse, when you search for the error, you usually get tons of results on how to change the server settings to prevent the issue. Nothing on how to solve it in your client-side web part.

## How to solve CORS issues with SPHttpClient

**SPHttpClient**, included in [strong>@microsoft/sp-http</strong](mailto:strong%3E@microsoft/sp-http%3C/strong), make it easy to make HTTP requests using the current web part’s context.

To access it from your component or service, you need to get the web part’s **WebPartContext** — I usually pass it into my component’s props, like this:

```typescript
import { WebPartContext } from &quot;@microsoft/sp-webpart-base&quot;;
export interface IMyCustomComponent {
   context: WebPartContext;
}
```

Once you have the **WebPartContext** you can make the Http request using **SPHttpClient**, usually something like this:

```typescript
import { SPHttpClient, SPHttpClientResponse} from &#039;@microsoft/sp-http&#039;;

…
/* When ready to make request */
return this.props.context.spHttpClient.get(yourApiUrl, SPHttpClient.configuration.v1)
.then((apiResponse: SPHttpClientResponse) =&gt; apiResponse.json()
.then(…) /* Handle the results */
```

…which is usually when you get the CORS issue.

To avoid the CORS issue, you need to make sure that your request [meets the following requirements](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS):

- No custom HTTP headers such as _‘application/xml’_ or _‘application/json’_
- Request method has to be _GET_, _HEAD_, or _POST_.
- If method is _POST_, content type should be _‘application/x-www-form-urlencoded’_, _‘multipart/form-data’_, or _‘text/plain’_

However, _SPHttpClient_ tries to be nice and sets a custom _OPTIONS_ HTTP header for you by default.

In order to override the _OPTIONS_ header in your _SPHttpClient_ request, just pass a new/clean _IHttpClientOptions_ parameter, as follows:

```typescript
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from &#039;@microsoft/sp-http&#039;;

…
/* When ready to make request */
const myOptions: ISPHttpClientOptions = {
      headers: new Headers(),
      method: &quot;GET&quot;,
      mode: &quot;cors&quot;
    };

return this.props.context.spHttpClient.get(yourApiUrl, SPHttpClient.configuration.v1, myOptions)
.then((apiResponse: SPHttpClientResponse) =&gt; apiResponse.json()
.then(…) /* Handle the results */
```

And that should be it.

## Conclusion

CORS can be scary, it can be annoying, but it is a good thing.

You can avoid CORS issues when using _SPHttpClient_ in your SPFx component by passing a _ISPHttpClientOptions_ that doesn’t set custom options.

I only covered how to make GET requests in the code above. You can use a similar approach for HEAD and POST requests.

This approach won’t always work (for example, if the API you’re calling requires custom HTTP headers), but it should solve most other CORS issues.

And if you have any more questions, post a comment, e-mail, or text. Don’t call 🙂
