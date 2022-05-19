# Colour-Gradient

A client had a system on there website where a table would display numbers from 0 to 10 and assign a colour to the background (gradient being gold/white/blue) with 10 if statements. Problem was that the numbers were to 1 decimal place, so numbers in the same whole number (i.e 7 and 7.9) would use the same colour, and if you wanted to add more colours, you'd have to make 100 if statements. I decided to rewrite the whole system to do the following:

- convert the two hexcodes to rgb 
- create a list which would hold
  - 50 generated colours between the first colour and white
  - 50 generated colours between white and the second colour
 - convert the colours back to hexcodes to be selected by the number * 10 (e.g if the number is 7.9 it would select the 79th colour) and return the hexcode

This project is a HTML Colour Tester, where the user selects the desired colours and program outputs a gradient of divs using the above system.

![image](https://user-images.githubusercontent.com/79047247/169323948-a62ec2d8-12fd-4ba6-952b-d81c1013130a.png)

![image](https://user-images.githubusercontent.com/79047247/169324438-7c3067cb-cb7d-4ee7-92fc-9c93f2b93ca1.png)
