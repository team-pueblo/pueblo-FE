// src/theme/theme.ts
export const theme = {
    colors: {
      primary: "#111827",
      onPrimary: "#ffffff",
      background: "#f5f7fb",
      surface: "#ffffff",
      inputBg: "#ffffff",
      textPrimary: "#111827",
      textSecondary: "#4b5563",
      border: "#d1d5db",
      danger: "#ef4444",
      focus: "#111827",
      hover: "#f3f4f6",
      // Backward-compat nested structure used by older styled components
      text: {
        primary: "#111827",
        secondary: "#4b5563",
      },
    },
    focusRing: "rgba(17, 24, 39, 0.15)",
    spacing: {
      xs: "0.375rem",
      sm: "0.65rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      xxl: "3rem",
      // Index-style alias for compatibility
      get ["2xl"]() { return this.xxl },
    },
    radii: {
      md: "8px",
      lg: "10px",
      xl: "16px",
    },
    shadows: {
      sm: "0 2px 8px rgba(0, 0, 0, 0.06)",
      lg: "0 8px 28px rgba(0, 0, 0, 0.06)",
    },
    fontSizes: {
      sm: "0.9rem",
      md: "0.95rem",
      xl: "1.5rem",
    },
    // Backward-compat fields expected by some components
    fontSize: {
      xs: "0.8rem",
      sm: "0.9rem",
      md: "0.95rem",
      lg: "1.125rem",
      xl: "1.5rem",
      "2xl": "1.75rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    // Additional backward-compat aliases appended at the bottom
    borderRadius: {
      md: "8px",
      lg: "10px",
      xl: "16px",
    },
    colorsStatusAlias: undefined,
  } as const;

  (theme as any).colors.status = { error: theme.colors.danger };
  
  export type AppTheme = typeof theme;
