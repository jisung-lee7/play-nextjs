# play-nextjs

My personal playground for nextjs14-page-router coding and learning.

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

```typescript
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
