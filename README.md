# News Management System

This is a News Management System built with Astro.js. It allows users to manage news articles with full CRUD (Create, Read, Update, Delete) functionality. The system integrates with Supabase for backend services and uses pnpm for package management.

## Features

- Create, read, update, and delete news articles
- User authentication and management
- Search and filter articles
- Responsive design
- Role-based access control
- Media management
- Article scheduling
- Article analytics
- Comments section

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/) (version 16 or later)
- [pnpm](https://pnpm.io/installation)
- [Supabase](https://supabase.io/) account and project setup

## Getting Started

### 1. Clone the Repository

```sh
[git clone https://github.com/your-username/news-management-system.git](https://github.com/noonsen/astro-news-crud.git)
cd astro-news-crud
```

### 2. Install Dependencies

```sh
pnpm install or npm install
```

### 3. Set Up Supabase

1. **Create a new project** in [Supabase](https://app.supabase.io/).

2. **Set up the database schema** by executing the following SQL scripts in the Supabase SQL Editor:

    ```sql
    -- Table for news articles
    CREATE TABLE news (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        title text NOT NULL,
        description text,
        date_published timestamp with time zone DEFAULT now(),
        body text,
        images text[]
    );

    -- Table for users
    CREATE TABLE users (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        email text NOT NULL,
        role text NOT NULL DEFAULT 'viewer'
    );

    -- Table for comments
    CREATE TABLE comments (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        article_id uuid REFERENCES news(id),
        user_id uuid REFERENCES users(id),
        comment text NOT NULL,
        date_posted timestamp with time zone DEFAULT now()
    );

    -- Table for user roles and permissions
    CREATE TABLE roles (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        role_name text NOT NULL,
        permissions text[]
    );

    -- Additional tables and relationships as needed
    ```

3. **Create API keys** and get your Supabase project URL and anon key from the Supabase dashboard.

### 4. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your Supabase project URL and anon key:

```sh
PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Run the Application

```sh
pnpm or npm dev
```

This will start the development server at `http://localhost:3000`.

### 6. Deploy the Application

To deploy the application, follow the deployment instructions for your hosting provider. For example, to deploy on [Netlify](https://www.netlify.com/):

1. Create a new site on Netlify and connect it to your GitHub repository.
2. Set up the environment variables in the Netlify dashboard (same as in the `.env` file).
3. Deploy the site.

## Folder Structure

```
src/
  components/
    BaseHead.astro
    Footer.astro
    Header.astro
    HeaderLink.astro
    CreateButton.astro
    DeleteButton.tsx
    UpdateButton.tsx
  content/
    blog/
      first-post.md
      markdown-style-guide.md
      second-post.md
      third-post.md
      using-mdx.mdx
    config.ts
  layouts/
    BlogPost.astro
  pages/
    blog/
      [slug].astro
      index.astro
    about.astro
    index.astro
    rss.xml.js
  styles/
    global.css
    consts.ts
    env.d.ts
  .gitignore
  astro.config.mjs
  package.json
  pnpm-lock.yaml
  README.md
  tsconfig.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License.

