# language-learning-dashboard

A web dashboard you can use to track your time spent learning foreign languages with ease! Log your learning and visually see it mount up up over time!

Built specifically with the Chinese language in mind but applicable to other languages with minor or even no tweaking.

## Image Demonstration

![](/images/whole.png)

|             Light              |               Dark                |
| :----------------------------: | :-------------------------------: |
| ![](/images/light-whole-2.png) |    ![](/images/dark-whole.png)    |
|     ![](/images/goal.png)      |    misleading image removed       |
|  ![](/images/light-track.png)  | ![](/images/dark-stats-lower.png) |

## Features:

- Detailed and customizable graphs of time spent learning
  - Supports weekly, monthly, and yearly intervals
  - Switch between two views of the graphs — one with learning types (reading, speaking, etc.) and one with specific methods (Anki, TV, Podcast, etc.)
  - See a breakdown with both a bar chart and a pie chart
- Set yourself learning goals
  - ... with deadlines, tracking, and more!
- Automate language logging with the 'Log Data from File' shortcut
  - Option to upload a `.csv` file with your language data instead of manual entry
  - A simple `.txt` file allows for stats updating
- Beautiful themes
  - Both dark mode and light mode are supported and can be toggled at will
- Detailed learning statistics
  - View total study time, vocab size, words read, a daily average, and more!


## How to use

Most everything is intuitive, though there is one shortcut to point out — the `Log Data from File` shortcut. This button allows you to automate the logging of your language data in three ways.

If you accidentally logged something, you can either log its inverse (e.g. you added 10 minutes of Reading, you can simply add -10 minutes of Reading).

### Uploading a `.csv` file with your language data.

You can also use the `Log Data from File` shortcut to save yourself from manually inputting logs.

Example file (note that it has to be named `track - track.csv`, modify source code to change).

Also note the format on the first line of the file. Dates must be in one of the following formats:
- `YYYY-MM-DD`
- `MM-DD-YY`
- `MM-DD-YYYY`

The separator can be a `/` instead of a `-`, both work.

```
,03/28/22,03/29/22,03/30/22,03/31/22
TV,51,70,68,0
Class,65,0,60,0
Pleco,42,35,37,40
Webnovel,76,75,81,112
Audiobook,28,39,67,42
Chat,10,8,7,2
```

Finally, note that you may have to refresh for changes to take effect.

![](images/track-sheets.png)

A simple Google Sheets or Excel spreadsheet does the trick quite neatly. The numbers represent minutes spent on activity per day.

_Note that if you want to add custom activities, you have to define what catgory they belong to in the `server/blueprints/log.py` file._

### Uploading your flashcard files

You can upload a `.txt` file to track the number of unique words/characters you have learned, easily modifiable for other languages. The algorithm works by counting the total number of unique lines in the file (which is what Pleco exports by default for those of you planning on using this to learn Chinese).

Example file (note _must_ be named `pleco.txt`):

```
爱	ai4
八	ba1
爸爸	ba4ba5
杯子	bei1zi5
北京	Bei3jing1
本	ben3
不	bu4
不客气	bu4//ke4qi4
菜	cai4
...
```

### Uploading manual statistics data

Currently four types of manual statistics are supported, as you can see in the statistics in the main image for this repository. You can see what they are in the file below. Filename should be `stats.txt`.

```
# episodes_watched, chapters_read, characters_read, books_read
characters_read	1518000
chapters_read	30
episodes_watched	4
```

For each manual item, type the name on one line, and then press tab, and then type in the value you want to upload. Not all of these are required, but you can't upload a value for an item that doesn't exist. Note that the first time you import this data, it will show up twice — simply refresh the page.



## Developers

This dashboard is built with the following technologies: Flask, Nuxt, TailwindCSS, SQLite, PyInstaller, and Tauri.

### Setup:
```sh
# Install deps
npm i

# Activate python env
venv\Scripts\Activate.ps1 # windows
source venv/bin/activate  # mac/linux
```

### Run:

```sh
# Run in dev mode
npm run dev

# Create distributable
npm run build

# Run server in dev mode
npm dev:PY

# Run in local, default browser
npm run dev:Web
```


---

Best of luck on your language learning journey! I hope this tool will be of use to you while you're on it.

*I wrote a short article on my experiences tracking Chinese for these three months using this tool on my personal website — check out the post [here](https://simonilincev.com/reflections/chinese/100-days-of-tracking/).*
