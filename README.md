# Cluster Clicking

This repository was created to ease the process of generating your own *ad-hoc* data 
in two-dimensional spaces.

Using this static client-based web application you can just click up all the datapoints
on a 2D canvas and download these as `csv` file. You can also scale the frame up producing
much denser data.

It can also be used to generate data for any other purposes like linear regression algorithms; 
the base motivation for the project was to enable testing cluster algorithms on any 2D data.

Statically hosted webpage is available [here](https://vojtechpavlu.github.io/cluster-clicking/).


## How to use

First click up your data in the canvas (inside the yellow square). If you want, you can change
the frame (size of the space) by updating the `X min`, `X max`, `Y min` and `Y max` values.
But be careful - the square won't change its dimensions.

If you are not happy with your data, you can clear those datapoint by the red clearing button.
But be careful, all datapoints will be lost!

After clicking up the data, change the filename. There is fixed extension for the file (`.csv`)
so you don't have to include it. When you specify the name you want, you can simply download the
file by clicking the greed `Download` button.

**And that's it! Happy Hacking!**