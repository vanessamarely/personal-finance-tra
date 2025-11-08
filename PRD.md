# Planning Guide

A personal finance tracker that empowers users to take control of their spending by logging expenses, setting category budgets, and visualizing spending patterns over time.

**Experience Qualities**: 
1. **Clarity** - Financial data should be immediately understandable with clear visualizations and straightforward categorization
2. **Trustworthy** - The interface should feel secure and professional, inspiring confidence in financial data management
3. **Actionable** - Every view should guide users toward better financial decisions with insights and progress indicators

**Complexity Level**: Light Application (multiple features with basic state)
  - The app manages expenses, budgets, and categories with persistent state, but doesn't require accounts or complex integrations

## Essential Features

### Expense Logging
- **Functionality**: Users can add expenses with amount, category, description, and date
- **Purpose**: Creates a comprehensive record of spending for analysis and budgeting
- **Trigger**: Click "Add Expense" button or quick-add action
- **Progression**: Click Add → Select category → Enter amount & description → Pick date → Save → See expense in list with visual confirmation
- **Success criteria**: Expense appears immediately in the list and affects budget calculations and charts in real-time

### Budget Management
- **Functionality**: Set monthly budget limits for spending categories (Food, Transport, Entertainment, Shopping, Bills, Health, Other)
- **Purpose**: Provides spending guardrails and makes overspending visible before it becomes a problem
- **Trigger**: Navigate to budgets view or set budget for category
- **Progression**: Open budgets → Select category → Enter monthly limit → Save → See progress bars showing spending vs. budget
- **Success criteria**: Budget progress updates instantly as expenses are added, with visual warnings when approaching or exceeding limits

### Expense List & Management
- **Functionality**: View all expenses in a sortable, filterable list with ability to edit or delete
- **Purpose**: Provides detailed transaction history and expense management
- **Trigger**: Default view when opening the app
- **Progression**: View list → Filter by category/date → Click expense to edit → Modify details → Save or delete
- **Success criteria**: List updates immediately, filters work instantly, edits persist across sessions

### Spending Trends Visualization
- **Functionality**: Visual charts showing spending by category and over time
- **Trigger**: Navigate to trends/overview tab
- **Progression**: Open trends → View pie chart of category breakdown → View bar chart of weekly/monthly spending → Identify patterns
- **Success criteria**: Charts accurately reflect current data and update dynamically as expenses are added

## Edge Case Handling
- **Empty States**: Show friendly prompts to add first expense or set budgets when no data exists
- **Zero/Negative Amounts**: Prevent invalid expense amounts with input validation
- **Future Dates**: Allow but flag expenses with future dates for visibility
- **Budget Overflow**: Clearly indicate over-budget categories with red/warning styling
- **Data Persistence**: All data saves automatically to ensure no loss between sessions
- **Long Descriptions**: Truncate with ellipsis and show full text on hover/expand

## Design Direction
The design should feel professional and trustworthy like a banking app, with clean lines and precise data visualization, while remaining approachable and not intimidating - balancing serious financial management with user-friendly simplicity through a minimal interface that prioritizes data clarity.

## Color Selection
Analogous color scheme with blue-green hues to evoke trust, growth, and financial stability

- **Primary Color**: Deep Blue (oklch(0.45 0.15 250)) - Communicates trust, professionalism, and financial security
- **Secondary Colors**: Slate grays (oklch(0.55 0.02 250)) for supporting UI elements and subtle backgrounds
- **Accent Color**: Teal (oklch(0.60 0.15 190)) - Represents growth and positive financial action for CTAs
- **Foreground/Background Pairings**:
  - Background (White oklch(0.98 0 0)): Dark slate text (oklch(0.25 0.02 250)) - Ratio 10.5:1 ✓
  - Card (Light gray oklch(0.99 0 0)): Dark slate text (oklch(0.25 0.02 250)) - Ratio 11.2:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(0.98 0 0)) - Ratio 7.8:1 ✓
  - Secondary (Slate oklch(0.55 0.02 250)): White text (oklch(0.98 0 0)) - Ratio 5.2:1 ✓
  - Accent (Teal oklch(0.60 0.15 190)): White text (oklch(0.98 0 0)) - Ratio 4.8:1 ✓
  - Muted (Light slate oklch(0.94 0.01 250)): Medium slate (oklch(0.45 0.02 250)) - Ratio 6.1:1 ✓
  - Destructive (Warning red oklch(0.55 0.22 25)): White text (oklch(0.98 0 0)) - Ratio 5.5:1 ✓

## Font Selection
Typography should convey clarity and precision with a modern, professional appearance - using Inter for its excellent readability at all sizes and technical-yet-friendly character.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Inter Bold/32px/tight letter spacing/-0.02em
  - H2 (Section Headers): Inter Semibold/24px/tight leading
  - H3 (Card Titles): Inter Semibold/18px/normal leading
  - Body (Regular Text): Inter Regular/15px/relaxed leading/1.6 line height
  - Small (Labels, Meta): Inter Medium/13px/normal leading/tracking-wide
  - Currency (Amounts): Inter Semibold/16px/tabular numbers for alignment

## Animations
Animations should be subtle and purposeful, reinforcing financial actions without distracting - smooth transitions between views and satisfying micro-interactions when adding expenses or reaching budget milestones create a sense of precision and control.

- **Purposeful Meaning**: Smooth slide-ins for modals, gentle fades for data updates, and celebratory micro-animations when staying under budget
- **Hierarchy of Movement**: Budget progress bars animate on load, expense additions slide in from the side, chart updates morph smoothly rather than redrawing

## Component Selection
- **Components**: 
  - Dialog for add/edit expense forms with proper focus management
  - Card for expense list items, budget category cards, and stat displays
  - Tabs for switching between Expenses, Budgets, and Trends views
  - Progress bars for budget tracking with color-coded states
  - Select dropdowns for category selection
  - Input fields with validation for amounts (number only, 2 decimal places)
  - Calendar (date-picker) for expense dates
  - Badge for category tags and budget status indicators
  - Button variants (primary for add, ghost for secondary actions, destructive for delete)
  - ScrollArea for long expense lists
  - Alert for budget warnings
  
- **Customizations**: 
  - Custom CategoryIcon component mapping categories to Phosphor icons
  - Recharts integration for pie chart (category breakdown) and bar chart (spending trends)
  - Custom progress bar with color transitions (green → yellow → red based on budget usage)
  
- **States**: 
  - Buttons: Default, hover (slight lift), active (pressed down), disabled (grayed out)
  - Inputs: Default, focused (accent border), error (red border with message), filled
  - Cards: Default, hover (subtle elevation), selected (accent border)
  - Progress: Safe (green <70%), Warning (yellow 70-99%), Danger (red ≥100%)
  
- **Icon Selection**: 
  - Plus (add expense/budget)
  - Wallet (expenses view)
  - ChartPie (trends/overview)
  - Target (budgets)
  - TrendUp/TrendDown (spending indicators)
  - ShoppingCart (Shopping category)
  - ForkKnife (Food category)
  - Car (Transport category)
  - FilmSlate (Entertainment)
  - Lightning (Bills)
  - Heart (Health)
  - DotsThree (Other/More options)
  
- **Spacing**: Consistent 4px base unit - cards p-6, sections gap-6, form fields gap-4, list items gap-2, generous whitespace between major sections (mt-8)

- **Mobile**: 
  - Stack tabs vertically on mobile, horizontal on desktop
  - Full-width cards on mobile, grid layout on tablet+
  - Bottom sheet for add expense form on mobile, dialog on desktop
  - Simplified chart views on mobile (single metric focus)
  - Sticky header with tab navigation
  - Larger touch targets (min 44px) for all interactive elements
