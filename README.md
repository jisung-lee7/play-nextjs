# play-nextjs

My personal playground for nextjs coding and learning.
- nextjs14: page-router
- nextjs15: app-router

## :pushpin: Summary
### Table of contents
- [Next.js](#label-nextjs)
- [CSR(Client Side Rendering)](#label-csrclient-side-rendering)
- [Pre Rendering](#label-pre-rendering)
   - [Pre Fetching](#pre-fetching)
- [Page Router](#label-page-router)
   - [Catch-all Segments](#catch-all-segments)
   - [Optional Catch-all Segments](#optional-catch-all-segments)
   - [Data Fetching](#data-fetching)
      - [Server Side Rendering(SSR)](#server-side-renderingssr)
      - [Static Site Generation(SSG)](#static-site-generationssg)
      - [Incremental Static Regeneration(ISR)](#incremental-static-regenerationisr)
- [App Router](#label-app-router)
   - [Catch-all-segments & Optional Catch-all segments(App router)](#catch-all-segments--optional-catch-all-segmentsapp-router)
   - [Route groups](#route-groups)
   - [React Server Component](#react-server-component)
   - [Pre Rendering(App router)](#pre-renderingapp-router)
      - [Pre Fetching(App router)](#pre-fetchingapp-router)
   - [Data Fetching(App router)](#data-fetchingapp-router)
   - [Data Cache](#data-cache)
      - [fetch](#fetch)
   - [Request Memoization](#request-memoization)
   - [Full Route Cache](#full-route-cache)
      - [generateStaticParams](#generateStaticParams)
   - [Route Segment Config](#route-segment-config)
      - [dynamic](#dynamic)
   - [Client-side Router Cache](#client-side-router-cache)
   - [Streaming](#streaming)
   - [Error Handling](#error-handling)
<br><br>

## :label: Next.js
- Next.js is a React framework for building full-stack web applications. 
- You use React Components to build user interfaces, and Next.js for additional features and optimizations.
   - Built-in Optimizations
   - Dynamic HTML Streaming
   - React Server Components
   - Data Fetching
   - Client and Server Rendering
   - Route Handlers
<br><br>

## :label: CSR(Client Side Rendering)
- Basic rendering mechanism of a React.js app.
- A method where the client(browser) directly renders the UI.
- This means the browser performs the rendering task.
- It means the client loads the JavaScript, and then the JavaScript builds the UI.
![image](https://github.com/user-attachments/assets/cae32d4d-5afb-4db4-9c59-7ee781c94472)
   - Pros: Extremely fast page navigation/transition.
   - Cons: Slow FCP(First Contentful Paint); Initial load time.
<br><br>

## :label: Pre Rendering
- Fast FCP(Resolve the cons of a React App).
- Fast page navigation/transition.
![image](https://github.com/user-attachments/assets/85f6a8aa-9cc6-487d-8e37-8d211a1e47ab)
<br><br>

### Pre Fetching
- Programmatic navigation(router.push, router.replace, router.back, etc.) does not trigger pre-fetching. 
- In this case, you can use useEffect to manually call router.prefetch.
- If you want disable prefetch, you can set `<Link href={'~/../..'} prefetch={false}>`
<br><br>

## :label: Page Router
- The Pages Router has a file-system based router built on the concept of pages.
- Pros
   - Provides simple page routing based on the file system.
   - Offers multiple methods of pre-rendering.
- Cons
   - Setting layouts for each page is cumbersome.
   - Data fetching is concentrated solely within the page components.
   - Unnecessary components (components that do not require interaction) are also included in the JS bundle.
<br><br>

- Routing based on the file names in the pages folder structure. 
![image](https://github.com/user-attachments/assets/77f49bc7-e6b0-4dd8-a596-afb120467aaa)
<br><br>

- Routing based on the folder names in the pages folder structure. 
![image](https://github.com/user-attachments/assets/00da7787-3afc-448a-99c8-e650c20ff9a9)
<br><br>

### Catch-all Segments
- Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets [...segmentName].
- For example, pages/shop/[...slug].js will match /shop/clothes, but also /shop/clothes/tops, /shop/clothes/tops/t-shirts, and so on.
<br><br>

### Optional Catch-all Segments
- Catch-all Segments can be made optional by including the parameter in double square brackets: [[...segmentName]].
- For example, pages/shop/[[...slug]].js will also match /shop, in addition to /shop/clothes, /shop/clothes/tops, /shop/clothes/tops/t-shirts.
- The difference between catch-all and optional catch-all segments is that with optional, the route without the parameter is also matched (/shop in the example above).
<br><br>

### Data Fetching
- React
![image](https://github.com/user-attachments/assets/abfbdc1c-5f3a-48ef-af86-0c9934c846e4)
   - Cons: Since fetch data is called at the point when the component is mounted, it takes a long time from the initial connection request to data loading.
<br><br>

- Next.js
#### Server Side Rendering(SSR)
- To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. This function will be called by the server on every request.
![image](https://github.com/user-attachments/assets/c5a06495-169b-4b99-8c2b-204fed360fef)
   - Pros: The data within the page can always be kept up-to-date.
   - Cons: If the data request is delayed, everything else gets delayed as well.
<br><br>

#### Static Site Generation(SSG)
- If a page uses Static Generation, the page HTML is generated at build time.
- Pros: Even pages that take a long time for pre-rendering can respond to user requests very quickly(Resolve the cons of SSR).
- Cons: It always responds with the same page, not the latest data.
- Your page content depends on external data
   - Use getStaticProps.
- Your page paths depend on external data(Next.js allows you to create pages with dynamic routes.)
   - Use getStaticPaths (usually in addition to getStaticProps).
   - fallback(optional)
      - false: Other routes should 404(Not Found).
         ![image](https://github.com/user-attachments/assets/0656f357-6e53-4385-b602-1a6c1536e227)
         <br><br>
      - blocking: Generate immediately.
         ![image](https://github.com/user-attachments/assets/b7e82ef4-38e7-49ae-b82d-6343ae1d17eb)
         <br><br>
      - true: Generate immediately and return only the page in advance.(No props)
         ![image](https://github.com/user-attachments/assets/0cdbc07a-a370-441d-a5a0-a600d4086662)
         <br><br>
<br><br>

#### Incremental Static Regeneration(ISR)
- Incremental Static Regeneration (ISR) enables you to:
   - Update static content without rebuilding the entire site
   - Reduce server load by serving prerendered, static pages for most requests
   - Ensure proper cache-control headers are automatically added to pages
   - Handle large amounts of content pages without long next build times
 
  ![image](https://github.com/user-attachments/assets/8d3f72bb-28f2-4a72-9b28-574e8a28c102)
<br><br>

```typescriptreact
  return {
    props: { post },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    revalidate: 60,
  }
```
<br>

- Pros
   - Even pages that take a long time for pre-rendering can respond to user requests very quickly.
   - The data within the page can always be kept up-to-date. 
- Cons: It is not suitable for pages where data updates based on user events.

- On-demand validation with `res.revalidate()`
   - For a more precise method of revalidation, use res.revalidate to generate a new page on-demand from an API Router.
<br><br>

## :label: App Router
- Next.js uses a file-system based router where folders are used to define routes.
- Each folder represents a route segment that maps to a URL segment. 
- To create a nested route, you can nest folders inside each other.
- A special page.js file is used to make route segments publicly accessible.
![image](https://github.com/user-attachments/assets/4e4bebce-47d9-460a-8857-960017fbb263)
<br><br>

### Catch-all-segments & Optional Catch-all segments(App router)
- App router’s catch-all segments and optional catch-all segments behave in the same way.
   - [Catch-all Segments](#catch-all-segments)
   - [Optional Catch-all Segments](#optional-catch-all-segments)
<br><br>

### Route groups
- In the app directory, nested folders are normally mapped to URL paths. 
- However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.
- This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.
- Route groups are useful for:
   - Organizing routes into groups e.g. by site section, intent, or team.
   - Enabling nested layouts in the same route segment level:
      - Creating multiple nested layouts in the same segment, including multiple root layouts
      - Adding a layout to a subset of routes in a common segment
   - Adding a loading skeleton to specific route in a common segment
- A route group can be created by wrapping a folder's name in parenthesis: `(folderName)`
<br><br>

### React Server Component
- Released in React v18.
- Components that execute only on the server side(Components that require interaction only).
- It is recommended to compose most of the page with server components. 
- Use client components only when absolutely necessary.
- Caveats
   - Server components must not include code that will execute in the browser as follows:
      - React hooks, Event handler, Library that contain functionalities executed in the browser.
   - Client components are not executed exclusively on the client.
      - Client components are executed twice: once on the server and once on the client.
   - The following pattern is not supported. You cannot import a Server Component into a Client Component:
      - In this case, to avoid run-time errors, Next.js automatically converts server component to client component.
         ```typescriptreact
         'use client'
          
         // You cannot import a Server Component into a Client Component.
         import ServerComponent from './Server-Component'
          
         export default function ClientComponent({
           children,
         }: {
           children: React.ReactNode
         }) {
           return (
             <>
               <ServerComponent />
             </>
           )
         }      
         ```
         <br>
      - If you want the following pattern is supported. You can pass Server Components as a prop to a Client Component. 
         ```typescriptreact
         'use client'
          
         import { useState } from 'react'
          
         export default function ClientComponent({
           children,
         }: {
           children: React.ReactNode
         }) {
           return (
             <>
               {children}
             </>
           )
         }
         ```
         <br>
   - Props that cannot be serialized(like functions) in Server Components cannot be passed to Client Components.
      - Serialization
         - The process of converting complex data structures such as objects, arrays, and classes into a simple format (such as a string or byte) for transmission over a network is called serialization.
      - Detail of pre-rendering:
         ![image](https://github.com/user-attachments/assets/25658cdb-2e7b-4c4f-952a-7035276e04fb)
         - RSC Payload: The RSC Payload is a compact binary representation of the rendered React Server Components tree. 
         - The RSC Payload contains:
            - The rendered result of Server Components
            - Placeholders for where Client Components should be rendered and references to their JavaScript files
            - Any props passed from a Server Component to a Client Component
            <br><br>

### Pre Rendering(App router)
![image](https://github.com/user-attachments/assets/2fb142fc-eef3-44d5-ba7f-b53da9fb7450)
<br><br>

#### Pre Fetching(App router)
- If you want to test it, you can check the Network tab in 'Production(npm run start after npm run build)' mode(Pre-fetching does not work in 'Development(npm run dev)' mode).
- All pages in the app router are divided into the following two categories:
   - Static page: Static pages pre-generated at build time(like SSG). Both the RSC payload and the JS Bundle are pre fetched.
   - Dynamic page: Pages generated on each browser request(like SSR). Only the RSC payload is pre fetched.
<br><br>

### Data Fetching(App router)
- Data fetching in Page Router:
   1. There was no concept of Server components.
   2. Therefore, during the pre-rendering process, special functions (such as getServerSideProps, getStaticProps, getStaticPaths) had to be used to ensure data fetching occurs exclusively on the server side.
   3. The fetched data had to be explicitly passed as props to the Page component.
   <br><br>

- Data fetching in App Router:
   1. "Fetching data where it's needed"
   2. Introduction of Server components.
   3. Server components and async/await can be used for fetching data. 
      (In the Page Router, all components were Client components, so the async keyword couldn’t be used. 
      Why? It could cause issues when running in the browser, so it was discouraged.)
   <br><br>

### Data Cache
- Next.js improves your application's performance and reduces costs by caching rendering work and data requests. 
- A feature that stores data fetched using the fetch method on the Next.js server.

#### fetch
- Next.js extends the Web fetch() API to allow each request on the server to set its own persistent caching and revalidation semantics.
- It is used to persistently store data fetched from the backend server.
- The data remains stored as long as the server is running.
<br>

- fetch(url, options): It is only available for use within the fetch method.
   - `{ cache: "no-store" }`
      ![image](https://github.com/user-attachments/assets/34789108-e249-4545-a641-ab0ba92b6b94)
      - Next.js fetches the resource from the remote server on every request, even if Dynamic APIs are not detected on the route.
      - It does not store the result of data fetching. 
      - It is an option to disable caching entirely.
      - The default caching behavior of fetch (e.g., when the cache option is not specified) is equal to setting the cache option to no-store(Next.js v 15~).
   <br>

   - `{ cache: "force-cache" }`
      ![image](https://github.com/user-attachments/assets/bc7dc142-f9ef-4d28-8642-3be699d5d693)
      - Next.js looks for a matching request in its Data Cache.
         - If there is a match and it is fresh, it will be returned from the cache.
         - If there is no match or a stale match, Next.js will fetch the resource from the remote server and update the cache with the downloaded resource.
      - It caches the result of the request unconditionally. 
      - Once called, it will not be called again.
   <br>

   - `{ next: { revalidate: 3 } }`
      ![image](https://github.com/user-attachments/assets/4090e067-6d7b-4683-a0cf-a8f130ee41a2)
      - Updates the cache periodically at specified intervals.
      -  Similar to the ISR approach in the Page Router.
      - Set the cache lifetime of a resource (in seconds).
         - false : Cache the resource indefinitely. Semantically equivalent to revalidate: Infinity. The HTTP cache may evict older resources over time.
         - 0 : Prevent the resource from being cached.
         - number : (in seconds) Specify the resource should have a cache lifetime of at most n seconds.
   <br>

   - `{ next: { tags: ['a'] } }`
      - Update data when a request is received.
      - On-Demand Revalidate(Similar to the On-Demand ISR approach in the Page Router)
   <br>

### Request Memoization
![image](https://github.com/user-attachments/assets/c1984f5d-eaec-4715-a51e-4b78ca61266f)
   - React extends the fetch API to automatically memoize requests that have the same URL and options. 
   - This means you can call a fetch function for the same data in multiple places in a React component tree while only executing it once.
   ![image](https://github.com/user-attachments/assets/186bad2f-aa0b-484c-abbe-6e897ac22fc4)
   - Request memoization emerged as a result of the pattern changes in data fetching introduced by the adoption of server components.
   - It is solely intended to cache duplicate API requests during the rendering of a single page. 
      - Therefore, all caches are immediately discarded once the rendering is complete.
      ![image](https://github.com/user-attachments/assets/582615a4-eafe-44b5-b423-38c2ab83f9f0)
<br>

### Full Route Cache(only static pages)
- This is page caching.
- Next.js automatically renders and caches routes at build time.
- This is an optimization that allows you to serve the cached route instead of rendering on the server for every request, resulting in faster page loads.
![image](https://github.com/user-attachments/assets/7f11c38c-fd73-4ce4-965f-1d5b272cc281)
<br>

- All pages in Next.js are automatically categorized as Static Pages or Dynamic Pages depending on the features they utilize(Only server components, client components do not affect the type of page).
   - Static Page: Default, If it’s not a dynamic page, it becomes a static page.
   - Dynamic Page: When a specific page changes or its data updates with every access request.
      1. When non-cached data fetching is used.
         - `fetch('...')` or `fetch('...', { cache: 'no-store' })`
      2. When a component uses dynamic functions(cookies, headers, query strings).
   - | Dynamic function | Data Cache | Page         |
     | :--------------: | :--------: | :--:                          |
     | YES              | NO         | Dynamic Page                  |
     | YES              | YES        | Dynamic Page                  |
     | NO               | NO         | Dynamic Page                  |
     | NO               | YES        | Static Page(Full Route Cache) |
     
     <br><br>

- `fetch('...', { next: { revalidate: 3 } })`: Similar to the ISR approach in the Page Router.
![image](https://github.com/user-attachments/assets/f01d3cd9-4e50-4dd3-ae9d-b5e125cd5486)
<br>

- This doesn’t mean that Dynamic pages are inherently an anti-pattern. 
- Even though full route cache cannot be used, Request Memoization and Data Cache can still be utilized as follows.
![image](https://github.com/user-attachments/assets/6e24b2c0-e013-4583-b6aa-a6745c76da37)
<br>

#### generateStaticParams
- The generateStaticParams function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.
- Pages not predefined (e.g., id: 1, id: 2, id: 3) are generated as static pages in real-time upon request.
- It’s similar to getStaticPaths in the Page Router.
```typescriptreact
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

// Even if there is a fetch without Data caching configured, the page is forcibly set as a Static page through generateStaticParams.
export default async function Page() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  )
}
```
<br>

##### dynamicParams
- Control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
```typescriptreact
export const dynamicParams = true // true | false
```
- true (default): Dynamic segments not included in generateStaticParams are generated on demand.
- false: Dynamic segments not included in generateStaticParams will return a 404.
<br>

### Route Segment Config
#### dynamic
- Change the dynamic behavior of a layout or page to fully static or fully dynamic.
- `'auto'` (default): The default option to cache as much as possible without preventing any components from opting into dynamic behavior.
- `'force-dynamic'`: Force dynamic rendering, which will result in routes being rendered for each user at request time. This option is equivalent to:
   - `getServerSideProps()` in the pages directory.
   - Setting the option of every `fetch()` request in a layout or page to `{ cache: 'no-store', next: { revalidate: 0 } }`.
   - Setting the segment config to `export const fetchCache = 'force-no-store'`
- `'force-static'`: Force static rendering and cache the data of a layout or page by forcing `cookies`, `headers()` and `useSearchParams()` to return empty values.
- `'error'`: Force static rendering and cache the data of a layout or page by causing an error if any components use Dynamic APIs or uncached data. This option is equivalent to:
   - getStaticProps() in the pages directory.
   - Setting the option of every `fetch()` request in a layout or page to `{ cache: 'force-cache' }`.
   - Setting the segment config to `fetchCache = 'only-cache', dynamicParams = false`.
   - `dynamic = 'error'` changes the default of `dynamicParams` from `true` to `false`. You can opt back into dynamically rendering pages for dynamic params not generated by `generateStaticParams` by manually setting `dynamicParams = true`.
<br>

### Client-side Router Cache
- Next.js has an in-memory client-side router cache that stores the RSC payload of route segments, split by layouts, loading states, and pages.
- When a user navigates between routes, Next.js caches the visited route segments and prefetches the routes the user is likely to navigate to. 
- This results in instant back/forward navigation, no full-page reload between navigations, and preservation of React state and browser state.
- With the Router Cache:
   - Layouts are cached and reused on navigation (partial rendering).
   - Loading states are cached and reused on navigation for instant navigation.
   - Pages are not cached by default, but are reused during browser backward and forward navigation. You can enable caching for page segments by using the experimental `staleTimes` config option.
<br>

### Streaming
- A technique used to split large or delayed data into smaller chunks and send them one by one from the server to the client.
- Next.js supports streaming.
- Streaming is mainly used in dynamic pages.
- With the `loading.js file`(streaming of page component)
   - Create a loading.tsx file in the same location as the page component.
   - Caveats
      - All page components under the specified path will be streamed.
      - Streaming is only provided for page components that work asynchronously(async).
      - Streaming is applied only to page components (excluding layouts and other components).
      - It is not triggered when the query string changes in the browser.
- With React's `<Suspense> component`(streaming of just component)
   - Any content wrapped in a `<Suspense>` boundary will be streamed.
      ```typescriptreact
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
      ```
      <br>
   - React’s `<Suspense>` component switches to the loading state whenever the key value changes.
      ```typescriptreact
      <Suspense key={q} fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
      ```
      <br>

### Error Handling

