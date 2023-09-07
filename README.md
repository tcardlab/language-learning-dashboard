# Demo of Distributing Binaries (python) Alongside Various WebView Solutions

In this exploration I took a [minimal flask app](https://github.com/Destaq/language-learning-dashboard), prepped it for client-side use (swapped to embedded DB & turned flask app into standalone executable) and initialized the server upon startup as required by each distributable WebView solution. 

While having a local server to host your app is certainly a valid architecture, Flask was not designed wih the intent for client-side use. As such, it would not be my first choice for such an app. However, I chose this as it enabled me to explore using a separate server process, distributable python, flask, and bundling all with the ease of python.

A notable and intentional oversight is the migration issue. There is zero consideration toward managing client-side db migrations. Because flask is rarely used on the client, theres also little documentation for this (official or otherwise).

With that said, I chose 3 distributable WebView solutions:
- Electron (most popular)
- Tauri (fastest growing)
- flaskwebgui (just convenient)

My main interest here was Electron (which i have experience with) vs Tauri (which i have limited experience with), particularly in how Tauri's side-car system worked. Ultimately, the differences felt largely superficial. they both require config to include the executable and boilerplate code to trigger it at runtime. Tauri had a bit more book keeping, but not too bad. In both cases, they had trouble fully closing the child-processes. I had to create a quick python script to detect if the parent was terminated. This could be a side effect of pyinstaller, though I'm no certain.

I dont have much to say about flaskwebgui, it doesn't have an official installer and has no official auto-upgrade solution like Tauri and Electron. Its good to know about for small projects, but i wouldn't consider it for anything major (unless i was already too deep in Flask for some reason).

## Branch links

You can find their distributables in the releases.

<h3><a href="https://github.com/tcardlab/language-learning-dashboard/tree/Feat/client-electron">Electron</a></h3>

<h3><a href="https://github.com/tcardlab/language-learning-dashboard/tree/Feat/client-tauri">Tauri</a></h3>

<h3><a href="https://github.com/tcardlab/language-learning-dashboard/tree/Feat/client-flaskwebgui">FlaskWebGUI</a></h3>

If you look at the git history and diffs, you'll notice that I tried to branch them off a shared, intermediate state. This is so you have a clearer idea of whats involved in setting each one up independent of other factors.

## Dev Notes

You can initialize each branch by running `npm i` and test it with `npm run dev` after activating python.
However, if you are switching between branches, I recommend using `npm i --ignore-scripts` and `python -m venv ./venv`, this is because the the postinstall script doesn't check if venv already exists and breaks (I'm too lazy to fix it atm).
Just another reminder to activate the python environment, its very easy to forget (you can set up VS Code to auto-activate venv with a config file btw).

## Depiction of functioning app:

![](/images/whole.png)
*If you see this, it's probably working as expected*