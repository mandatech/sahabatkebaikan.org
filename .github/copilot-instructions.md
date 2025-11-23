# GitHub Copilot Instructions for SahabatKebaikan.org

## Project Overview

SahabatKebaikan.org is an open-source live crowdfunding platform. The name "SahabatKebaikan" means "good friend in good things" in English. This platform enables people to create and support campaigns for various causes.

## Technology Stack

- **Framework**: Next.js 11+ (React 17+)
- **UI Library**: Material-UI v4
- **State Management**: React Context API
- **Forms**: Formik with Material-UI integration
- **Backend Integration**: Axios for API calls
- **Authentication**: Firebase Authentication
- **Database**: Firebase
- **Date Handling**: date-fns, moment, moment-timezone
- **Styling**: Material-UI makeStyles, CSS
- **Build Tool**: Next.js built-in webpack
- **Package Manager**: Yarn

## Code Style & Formatting

### ESLint Configuration
- Follow the project's ESLint rules defined in `.eslintrc.js`
- Use ESLint recommended rules with React, JSX a11y, and Prettier plugins
- React imports are not required in JSX files (Next.js auto-imports React)
- Run `yarn lint` to check and auto-fix linting issues

### Prettier Configuration
- Use single quotes for strings
- 2 spaces for indentation
- Include semicolons
- ES5 trailing commas
- Run `yarn format` to format all files

### File Naming Conventions
- Use kebab-case for directories: `lupa-password`, `reset-password`
- Use PascalCase for React components: `CampaignBox.js`, `Layout.js`
- Use camelCase for utility files and services: `formatCurrency.js`, `campaign.service.js`
- Use lowercase for Next.js page files when they represent routes: `login.js`, `register.js`

## Code Structure

### Project Structure
```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable React components
├── config/          # Configuration files (axios, etc.)
├── context/         # React Context providers
├── libs/            # Library wrappers and custom hooks
├── modules/         # Feature-specific modules
├── pages/           # Next.js pages (file-based routing)
├── services/        # API service layer
├── styles/          # Global styles and CSS
└── utils/           # Utility functions
```

### Component Patterns

#### Functional Components with Hooks
Always use functional components with React Hooks:

```javascript
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    // styles
  },
}));

const ComponentName = ({ prop1, prop2 }) => {
  const classes = useStyles();
  
  // Component logic
  
  return (
    // JSX
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string,
  prop2: PropTypes.number,
};

export default ComponentName;
```

#### Material-UI Styling
- Use `makeStyles` hook for component-specific styles
- Access theme properties through the theme parameter
- Define styles as objects within `makeStyles`

#### PropTypes
- Always define PropTypes for all components
- Place PropTypes definition after the component, before export

### Service Layer

Services should use custom hooks from `libs/hooks`:

```javascript
import { useGetList } from 'libs/hooks/useGetList';
import { useGetOne } from 'libs/hooks/useGetOne';
import { axiosInstance } from 'config/axios';

export function getResourceList(params) {
  const { data, isFetching, error } = useGetList('/endpoint', params);
  return { data, isFetching, error };
}

export function getResourceDetail(id) {
  const { data, isFetching, error } = useGetOne(`/endpoint/${id}`);
  return { data, isFetching, error };
}
```

### Page Components

Next.js pages should:
- Be placed in the `src/pages/` directory
- Use file-based routing
- Import and use the `Layout` component for consistent structure
- Use `Head` from `next/head` for SEO metadata

```javascript
import Layout from 'components/Layout';
import Head from 'next/head';

export default function PageName() {
  return (
    <Layout title="Page Title" withBottomNav={true} menu={1}>
      {/* Page content */}
    </Layout>
  );
}
```

## Best Practices

### React/Next.js
1. Use functional components with Hooks instead of class components
2. Leverage Next.js features like `Head` for SEO, `Link` for navigation
3. Use the custom `Link` component from `components/Link.js` instead of Material-UI Link
4. Implement proper error handling in components
5. Use React Context for state management across components

### Material-UI
1. Use Material-UI components consistently throughout the application
2. Access theme values through `makeStyles` theme parameter
3. Prefer Material-UI Box component for layout containers
4. Use Material-UI Grid for responsive layouts

### Forms
1. Use Formik for form state management
2. Integrate with `formik-material-ui` for Material-UI form components
3. Implement proper form validation
4. Handle form submission errors gracefully

### API Integration
1. Use the service layer for all API calls
2. Leverage custom hooks (`useGetList`, `useGetOne`) for data fetching
3. Use `axiosInstance` from `config/axios` for HTTP requests
4. Handle loading states with `isFetching`
5. Display appropriate error messages

### Firebase Integration
1. Use Firebase for authentication
2. Follow Firebase best practices for security rules
3. Use environment variables for Firebase configuration (prefixed with `NEXT_PUBLIC_`)

### Performance
1. Use Next.js image optimization features when available
2. Implement code splitting for large components
3. Use React.memo for components that render frequently with same props
4. Lazy load components when appropriate

### Accessibility
1. Follow JSX a11y rules enforced by ESLint
2. Use semantic HTML elements
3. Provide alt text for images
4. Ensure proper heading hierarchy
5. Use Material-UI's built-in accessibility features

### Security
1. Never commit sensitive data or credentials
2. Use environment variables for all configuration
3. Sanitize user inputs
4. Follow OWASP guidelines for web security

## Environment Variables

All environment variables should be prefixed with `NEXT_PUBLIC_` for client-side access:
- `NEXT_PUBLIC_BASE_URL`: API base URL
- `NEXT_PUBLIC_WEB_URL`: Website URL
- `NEXT_PUBLIC_FIREBASE_*`: Firebase configuration
- See `.env.example` for complete list

## Git Workflow

### Commit Messages
- Use commitizen for standardized commit messages: `yarn commit`
- Follow conventional commits format
- Write clear, descriptive commit messages

### Pre-commit Hooks
- Husky is configured to run lint-staged before commits
- ESLint will auto-fix issues on staged files
- Ensure all linting passes before committing

## Testing & Building

### Commands
- **Development**: `yarn dev` (runs on port 8001)
- **Build**: `yarn build`
- **Production**: `yarn start` (runs on port 8000)
- **Linting**: `yarn lint`
- **Formatting**: `yarn format`

### Before Committing
1. Run `yarn lint` to ensure code style compliance
2. Run `yarn build` to ensure the project builds successfully
3. Test functionality manually in development mode
4. Check that no new console errors are introduced

## Code Review Guidelines

When reviewing or generating code:
1. Ensure code follows the established patterns in the codebase
2. Check that PropTypes are defined for all components
3. Verify that Material-UI components are used correctly
4. Ensure proper error handling is implemented
5. Check that accessibility requirements are met
6. Verify that no sensitive data is hardcoded
7. Ensure code is properly formatted (Prettier) and linted (ESLint)

## Common Patterns to Follow

### Import Order
Imports should generally be organized as:
1. External libraries (React, Next.js, Material-UI)
2. Internal components
3. Services and utilities
4. Styles

### Handling Loading States
```javascript
const { data, isFetching, error } = useGetList('/endpoint', params);

if (isFetching) return <Loading />;
if (error) return <ErrorComponent message={error.message} />;
if (!data) return <DataNotFound />;
```

### Toast Notifications
Use the ToastProvider context for user notifications:
```javascript
import { useToast } from 'libs/toast';

const Component = () => {
  const toast = useToast();
  
  const handleAction = () => {
    toast.success('Action completed successfully');
  };
};
```

## Additional Notes

- The project is bilingual (English code, Indonesian user-facing content)
- Maintain mobile-first responsive design (max-width: 446px for main container)
- Use NProgress for route change loading indicators
- Follow the existing code organization and patterns
- When in doubt, look for similar examples in the existing codebase

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI v4 Documentation](https://v4.mui.com/)
- [Formik Documentation](https://formik.org/docs/overview)
- [Firebase Documentation](https://firebase.google.com/docs)
