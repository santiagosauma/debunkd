from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np
import random

# Content Related to the wordcloud
text = """I was over at my dads house today helping with some household chores. He lives in a very rural area of a very red state. At the end of the work we went to one of the nearby country bars. It’s the kind of place that farmers, truckers, legit cowboy boot wearers and the working class go to unwind with a cold one.

Vice President Harris was on the TV and the local gun store owner said to his auto mechanic (friends since high school),

“You know what? She ain’t so bad. The economy is recovering, nobody’s rioting, and we’re standing up on the world stage again. Can’t believe I’m saying this but Ol’ Oakland Kam’s got my vote this year.”

I looked around and all I saw were heads nodding in agreement. I heard a few calls of “Yes sir” and “Damn Straight” from the men around me. Even saw the lonely ball cap wearing farmer in the corner raise his drink with a nod. """
stopwords = set(STOPWORDS)


# Define custom color function
def american_flag_color_func(word, font_size, position, orientation, random_state=None, **kwargs):
    colors = ['#FF0000', '#0000FF']  # Red, White, Blue
    return random.choice(colors)

# Appearance of the wordcloud
custom_mask = np.array(Image.open("mapusa.png"))
wc = WordCloud(
    background_color='white',
    stopwords=stopwords,
    mask=custom_mask,
    contour_width=3,
    contour_color='black',
    color_func=american_flag_color_func  # Apply custom color function
)
wc.generate(text)
wc.to_file('wordcloud.png')
# Plotting the wordcloud
plt.figure(figsize=(15, 10))  # Increase the figure size
plt.imshow(wc, interpolation='bilinear')
plt.axis('off')
plt.show()