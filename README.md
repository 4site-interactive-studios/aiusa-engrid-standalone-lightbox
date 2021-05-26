# AI USA Lightbox

This project adds lightbox to page

## Setup

```html
<script>
  const options = {
    logoURL: "http://www.website.com/logo.jpg",
    imageURL: "http://www.website.com/image.jpg",
    title: "Join the movement!", 
    paragraph: "We're a global movement of 10 million activists and growing -- and together, we can build a world where human rights are enjoyed by all. Add your name to hear about opportunities to act when it matters most.", 
    button: "Act now", 
    info: "You'll receive updates and urgent action alerts from Amnesty USA. You can unsubscribe at any time.",
    blacklist: [], // ["^/"]
    whitelist: [], // ["^/"]
    dates: [], // ["05/20/2021", "06/28/2021"]
    cookie_name: "hideSignUpForm",
    trigger: 1000 // Trigger Lightbox after 1000 (1 second)
  };
</script>
<script type="text/javascript" src="main.js"></script>
```

## Development

1. `npm install`

## Deploy

1. `npm run build`

It's going to create a `dist` folder, where you can get the `main.js` file.