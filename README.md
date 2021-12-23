# THIS IS CHEMROCKET!

## About Chemrocket

Chemrocket is a web platform that provides an ever expanding series of cheminformatic tools to help people working with information related to chemical compounds. It is specially focused on organic compounds, providing tools to draw molecules, exporting the results to different formats and sharing them to different web services. It also presents several calculated properties that are relevant to students and proffesionals. 

The application allows users to store information in the cloud. When a chemistry document is saved, the molecules contained in it will be stored as well, therefore, a personal molecules database is created, avoding the need of drawing the same molecules over and over again.

It is our goal to expand the number and quality of available aplications, in order to build a rich echosystem of cheminformatics solutions for people who work on laboratories all around the world. We want to provide easy access to a broad set of tools that today are only available on very restrictive or expensive software packages or services.

## Libraries and services
Chemrocket is built on NextJS

Other libraries and services:
<ul>
  <li>MongoDB Atlas: Database as a Service</li>
  <li>Mongoose: To handle operations with mongodb</li>
  <li>NextAuth: Session handling with OAuth</li>
  <li>Bootstrap 5: Styles and responsiveness of the GUI</li>
  <li>React-Toastify: Notification system of the GUI</li>
  <li>Nodemailer For email sending</li>
  <li>Sendgrid: Email Service</li>
  <li>RDKIT: A JS wrapper around the RDkit. A cheminformatics library to make representations, calculations and searches on organic molecules </li>
  <li>Kekule: A cheminformatics library that provides a Molecules Composer that allows to draw molecules and reactions, and work with molecules in different formats </li>
</ul>


## NEXTJS
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
