import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    // Default font (body, tables, forms)
    fontFamily: "Inter, sans-serif",

    // Headings
    h1: { fontFamily: "Poppins, sans-serif", fontWeight: 800 },
    h2: { fontFamily: "Poppins, sans-serif", fontWeight: 700 },
    h3: { fontFamily: "Poppins, sans-serif", fontWeight: 700 },
    h4: { fontFamily: "Poppins, sans-serif", fontWeight: 600 },
    h5: { fontFamily: "Poppins, sans-serif", fontWeight: 600 },
    h6: { fontFamily: "Poppins, sans-serif", fontWeight: 600 },

    // Subheadings & body
    subtitle1: { fontFamily: "Inter, sans-serif" },
    subtitle2: { fontFamily: "Inter, sans-serif" },
    body1: { fontFamily: "Inter, sans-serif" },
    body2: { fontFamily: "Inter, sans-serif" },
  },
});

export default theme;
