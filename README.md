# Over Style JS 

### Nick Freese, Copyright 2018

----------------------------

Over Style is a basic JS tool for dealing with stylesheets in JS.  The goal of Over Style is to make editing large amounts of style from JS into a simple task.

#### Create style sheet.
```
var styleSheet = {
    "body": {
    	"padding": "0px",
    	"margin": "0px",
    	"background": "#e3e3e3"
    },
    ".myClass" : {
    	"padding": "12px",
    	"background": "#ffffff"
    },
    "@media only screen and (max-width: 600px)": {
        ".myClass" : {
            "background": "#000000",
        }
    }
};

// pass the JS object, and a name for your stylesheet so you can reference it later
overStyle.create(styleSheet, "test");

```


### Change and overwrite that spreadsheet
```
    styleSheet[".myClass"]["padding"] = "20px";
    styleSheet[".myClass"]["font-family"] = "arial";
    styleSheet[".myClass"]["color"] = "#ef5c5c";

    overStyle.overwrite(styleSheet, "test");
```
