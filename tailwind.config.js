module.exports = {
    // mode: "jit",
    important: true,
    purge: ["./web/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            transitionProperty: {
                display:'display'
             },
        },
    },
    variants: {
        extend: {
          
        },
    },
    plugins: [],
};
