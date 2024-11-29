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
