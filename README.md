🍽️ Food Harmony: Diet-Configured Local Food Finder
===================================================

> **Find the foods you like and avoid those you don't, no matter where you are.**

!([Food-Harmony-trailer.gif](https://github.com/KeonJukes/Food-Harmony/blob/main/trailer-food-harmony.gif)

**Food Harmony** is a vibe code hackathon project designed to solve the common challenge of finding suitable dining options that respect complex or restrictive dietary needs. By allowing users to create a detailed **Personal Food Profile**, the application intelligently filters and displays nearby restaurants, cafes, and bakeries whose menu items (foods, drinks, and desserts) align with their exact requirements.

 The original project is available at https://www.figma.com/design/KluA1YwfObA7jcc3cjvrdr/Personal-Food-Profile-App.

✨ Features
----------

Food Harmony focuses on personalization and location-based filtering to ensure a seamless dining experience:

*   **Customizable Food Profile:** Users can configure multiple exclusion lists, including:
    
    *   Specific **Allergens** (e.g., peanuts, shellfish).
        
    *   Defined **Diets** (e.g., Keto, Vegan, Gluten-Free).
        
    *   Individual **Ingredient Exclusions** (e.g., no refined sugar, no specific spice).
        
*   **Geolocation Search:** Automatically detects the user's current location to provide highly relevant nearby results.
    
*   **Intelligent Filtering & Ranking:** Prioritizes food establishments based on the confidence that they can accommodate the user's detailed profile.
    
*   **Item-Level Compliance:** Displays specific menu items confirmed (or algorithmically matched) to be compliant with the user's Food Profile.
    
*   **Intuitive Interface:** A clean, responsive UI built with **React** for a fast and friendly user experience on both mobile and desktop.
    

🛠️ Technology Stack
--------------------

This project is primarily a **frontend application** focused on the user experience and configuration logic.

**Category**

**Technology**

**Purpose**

**Framework**

**React** with **TypeScript**

Building component-based, type-safe user interfaces.

**Build Tool**

**Vite**

Fast development server and optimized bundle compilation.

**Styling**

**CSS** (and assumed utility-first frameworks)

Modern, responsive, and aesthetic styling.

**APIs (Conceptual)**

**Google Maps Places API**

For location search and fetching local business data.

**APIs (Conceptual)**

**Menu/Food Data APIs**

For matching user preferences to menu item ingredients.

### 📂 Project Structure Focus

The repository is structured as a standard modern React application:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   food-harmony/  ├── src/                  # All core application components and logic (React/TSX)  │   ├── components/       # Reusable UI elements (e.g., buttons, cards)  │   ├── pages/            # Main views (e.g., Profile Setup, Map View, Results)  │   └── api/              # Functions for communicating with external food/location APIs  ├── index.html            # Entry point of the application  ├── package.json          # Dependency and script definitions  └── vite.config.ts        # Vite configuration   `

🚀 Getting Started
------------------

Follow these steps to set up and run the Food Harmony application on your local machine.

### Prerequisites

You need the following installed:

*   **Node.js** (LTS version)
    
*   **npm** or **yarn**
    
*   A browser capable of running modern web applications.
    

### Installation and Running

1.  git clone \[https://github.com/KeonJukes/Food-Harmony\](https://github.com/KeonJukes/Food-Harmony)cd Food-Harmony
    
2.  npm install# oryarn install
    
3.  npm run dev# oryarn dev
    

The application should now be running and accessible at the local URL displayed in your console (usually http://localhost:5173).

👥 Team & Contribution
----------------------

This project was built as a proof-of-concept for the Vibe Code Hackathon.

Feel free to open issues or submit pull requests if you want to contribute to expanding the profile configuration or refining the filtering logic!
