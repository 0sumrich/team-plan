# Team Plan - Full Stack Web App
## Corporate Imagery
Team Plan visualised with d3, with actions saved on a sqlite database. NextJS

### Tech
* [React] 
* [Node]
* [Next JS]
* [Sqlite3]
* [d3]
* [save-svg-as-png]

Circular Team Plan

The goal was to create a circular team plan for Barnet Libraries. The service objectives needed to go in the middle ring, with each individual team and their respective targets linked to these objectives in the following rings.

I also needed to be able to export the D3 svg to png for printing - another goal was to print and display in staff areas, so I used [saveAsPng.js](https://github.com/exupero/saveSvgAsPng)

Originally you would just edit it from a csv file and then reupload it manually. A couple of re-writes in to this project now. Now utilising React Materilised UI components for sleek data entry.

The result 
![alt text](planisphere-demo.png "Circular Team Plan")

# [Live Version on Glitch](https://team-plan.glitch.me/ "Team Plan")