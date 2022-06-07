# Colour-Gradient

[Try it Here](https://adam-sharp2003.github.io/Colour-Gradient/)

A client had a system on there website where a table would display numbers from 0 to 10 and assign a colour to the background (gradient being gold/white/blue) with 10 if statements. Problem was that the numbers were to 1 decimal place, so numbers in the same whole number (i.e 7 and 7.9) would use the same colour, and if you wanted to add more colours, you'd have to make 100 if statements. I decided to rewrite the whole system to do the following:

- convert the two hexcodes to rgb 
- create a list which would hold
  - 50 generated colours between the first colour and white
  - 50 generated colours between white and the second colour
 - convert the colours back to hexcodes to be selected by the number * 10 (e.g if the number is 7.9 it would select the 79th colour) and return the hexcode

This project is a HTML Colour Tester, where the user selects the desired colours and program outputs a gradient of divs using the above system.

## Update 07/06/22

Content should fit on screen fully.

## Update 24/05/22

You can now adjust position of the middle colour and adjust the max number in the gradient.

## Update 19/05/22

Now allows control of all three colours

## Gallery

![image](https://user-images.githubusercontent.com/79047247/170518542-cfac30a9-e655-4e9c-9834-867e38bdffac.png)

![image](https://user-images.githubusercontent.com/79047247/170518769-63d24163-0dc5-4a96-a20e-c3d85bbaa219.png)


