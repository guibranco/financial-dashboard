# Financial Dashboard UI Kit Documentation

## Overview

This UI Kit provides a comprehensive set of reusable components and design tokens for the Financial Dashboard application. It's built on top of Tailwind CSS v4 and follows modern design principles with full dark mode support.

## Design System

### Colors

#### Primary Colors
- **Primary 50**: `#eff6ff` - Lightest blue
- **Primary 500**: `#3b82f6` - Main brand color
- **Primary 600**: `#2563eb` - Primary button hover
- **Primary 700**: `#1d4ed8` - Primary button active

#### Gray Scale
- **Gray 50**: `#f9fafb` - Background light
- **Gray 100**: `#f3f4f6` - Card backgrounds
- **Gray 500**: `#6b7280` - Text secondary
- **Gray 900**: `#111827` - Text primary

### Typography

The UI Kit uses **Inter** as the primary font family with the following scale:
- **Text XS**: 12px (0.75rem)
- **Text SM**: 14px (0.875rem)
- **Text Base**: 16px (1rem)
- **Text LG**: 18px (1.125rem)
- **Text XL**: 20px (1.25rem)

### Spacing

Following Tailwind's 4px base unit system:
- **1**: 4px
- **2**: 8px
- **4**: 16px
- **6**: 24px
- **8**: 32px

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/ui';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With loading state
<Button loading>Loading...</Button>

// With icons
<Button leftIcon={<Plus />}>Add Item</Button>
<Button rightIcon={<ArrowRight />}>Continue</Button>
```

### Card

Container component for grouping related content.

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/ui';

<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Variants
<Card variant="outlined">Outlined card</Card>
<Card variant="elevated">Elevated card</Card>
```

### Input

Form input component with label, error states, and icons.

```tsx
import { Input } from '@/ui';
import { Search, Mail } from 'lucide-react';

<Input 
  label="Email"
  placeholder="Enter your email"
  type="email"
/>

// With icons
<Input 
  leftIcon={<Search />}
  placeholder="Search..."
/>

// With error state
<Input 
  label="Password"
  error="Password is required"
  type="password"
/>
```

### Badge

Small status indicators and labels.

```tsx
import { Badge } from '@/ui';

<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
```

### Avatar

User profile pictures with fallback support.

```tsx
import { Avatar } from '@/ui';

<Avatar src="/user.jpg" alt="User" />
<Avatar fallback="JD" />
<Avatar size="lg" />
```

### Dropdown

Contextual menus and dropdowns.

```tsx
import { Dropdown, DropdownItem, DropdownSeparator } from '@/ui';
import { Settings, User, LogOut } from 'lucide-react';

<Dropdown 
  trigger={<Button>Menu</Button>}
  align="right"
>
  <DropdownItem icon={<User />}>Profile</DropdownItem>
  <DropdownItem icon={<Settings />}>Settings</DropdownItem>
  <DropdownSeparator />
  <DropdownItem icon={<LogOut />} destructive>Logout</DropdownItem>
</Dropdown>
```

### Modal

Dialog overlays for important actions.

```tsx
import { Modal } from '@/ui';

<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

### Tabs

Navigation between related content.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
  <TabsContent value="analytics">
    Analytics content
  </TabsContent>
</Tabs>
```

### Alert

Important messages and notifications.

```tsx
import { Alert } from '@/ui';

<Alert variant="success" title="Success">
  Your changes have been saved.
</Alert>

<Alert variant="danger" dismissible onDismiss={() => {}}>
  Something went wrong.
</Alert>
```

## Dark Mode Support

All components support dark mode automatically through Tailwind's dark mode classes. The theme can be toggled using the existing `DarkModeContext`.

## Accessibility

- All interactive components support keyboard navigation
- Proper ARIA labels and roles are implemented
- Color contrast meets WCAG AA standards
- Focus indicators are clearly visible

## Best Practices

1. **Consistency**: Use the design tokens (colors, spacing, typography) consistently across the application
2. **Responsive Design**: All components are mobile-first and responsive
3. **Performance**: Components are optimized for performance with proper React patterns
4. **Accessibility**: Always include proper labels and ARIA attributes
5. **Testing**: Components are designed to be easily testable

## Migration Guide

To migrate existing components to use the new UI Kit:

1. Replace custom styled components with UI Kit components
2. Update color classes to use the new primary color palette
3. Ensure proper spacing using the design system tokens
4. Test dark mode functionality
5. Verify accessibility compliance